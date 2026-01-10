class IconSetEditor {
    constructor() {
        this.canvas = document.getElementById('mainCanvas');
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.importCanvas = document.getElementById('importCanvas');
        this.importCtx = this.importCanvas.getContext('2d', { willReadFrequently: true });

        // Mode settings
        this.mode = 'iconset'; // 'iconset' or 'tileset'
        this.ICON_SIZE = 32;
        this.COLUMNS = 16;
        this.ROWS = 16;
        this.CANVAS_SIZE = 512;
        
        // Import canvas tile size (can differ from main document)
        this.IMPORT_ICON_WIDTH = 32;
        this.IMPORT_ICON_HEIGHT = 32;

        this.iconGrid = [];
        this.importedImage = null;
        this.importedImageData = null;
        this.draggedIcons = []; // Array for multiple selections
        this.selectedImportIcons = new Set(); // Set to track selected icons on import canvas
        
        // Canvas scaling
        this.mainCanvasScale = 1;
        this.importCanvasScale = 1;
        
        // Drag preview
        this.dragPreviewActive = false;
        this.canvasBackup = null;
        
        // Selection and clipboard
        this.selectedSpace = null; // { row, col }
        this.copiedIcon = null; // dataURL of copied icon
        this.iconOffsets = {}; // Track pixel offsets for each icon: "row,col" -> {x, y}
        this.imageCache = {}; // Cache loaded Image objects: "row,col" -> Image
        
        // Import canvas mouse tracking
        this.importCanvasMouseDownSpace = null; // Track which space was clicked on mouse down

        this.initializeGrid();
        this.setupEventListeners();
        this.render();
    }

    initializeGrid() {
        this.iconGrid = [];
        this.imageCache = {}; // Clear image cache when grid is reset
        for (let row = 0; row < this.ROWS; row++) {
            this.iconGrid[row] = [];
            for (let col = 0; col < this.COLUMNS; col++) {
                this.iconGrid[row][col] = null;
            }
        }
        this.updateGridInfo();
    }

    setupEventListeners() {
        // File upload
        document.getElementById('uploadImageInput').addEventListener('change', (e) => this.handleImageUpload(e));
        document.getElementById('uploadBtn').addEventListener('click', () => {
            document.getElementById('uploadImageInput').click();
        });

        // New document with mode selection
        document.getElementById('newDocBtn').addEventListener('click', () => this.showModeModal());
        document.getElementById('iconSetModeBtn').addEventListener('click', () => this.createNewDocument('iconset'));
        document.getElementById('tileSetModeBtn').addEventListener('click', () => this.createNewDocument('tileset'));
        document.getElementById('smallItemsModeBtn').addEventListener('click', () => this.createNewDocument('smallitems'));
        document.getElementById('tallItemsModeBtn').addEventListener('click', () => this.createNewDocument('tallitems'));
        document.getElementById('bigItemsModeBtn').addEventListener('click', () => this.createNewDocument('bigitems'));
        document.getElementById('cancelModeBtn').addEventListener('click', () => this.hideModeModal());

        // Import icon set
        document.getElementById('importImageInput').addEventListener('change', (e) => this.handleImportImage(e));
        document.getElementById('importSetBtn').addEventListener('click', () => {
            document.getElementById('importImageInput').click();
        });

        // Add rows
        document.getElementById('addRowsBtn').addEventListener('click', () => this.showRowsModal());
        document.getElementById('confirmRowsBtn').addEventListener('click', () => this.addRows());
        document.getElementById('cancelRowsBtn').addEventListener('click', () => this.hideRowsModal());

        // ReParse button
        document.getElementById('reparseBtn').addEventListener('click', () => this.reparseSelectedIcon());

        // Save
        document.getElementById('saveBtn').addEventListener('click', () => this.save());

        // Canvas interactions
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e, this.canvas, this.ctx));
        this.canvas.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.canvas.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.canvas.addEventListener('drop', (e) => this.handleDrop(e));

        // Keyboard interactions
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Import canvas interactions - multiple selection and drag
        this.importCanvas.addEventListener('mousedown', (e) => this.handleImportCanvasMouseDown(e));
        this.importCanvas.addEventListener('mouseup', (e) => this.handleImportCanvasMouseUp(e));
        this.importCanvas.addEventListener('dragstart', (e) => this.startDragIcon(e));
        this.importCanvas.draggable = true;
        
        // Window resize to update canvas scaling
        window.addEventListener('resize', () => this.updateCanvasScaling());
    }

    showModeModal() {
        document.getElementById('modeModal').classList.remove('hidden');
    }

    hideModeModal() {
        document.getElementById('modeModal').classList.add('hidden');
    }

    handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                // Auto-detect mode based on image dimensions
                let detectedMode = 'iconset'; // default
                if (img.width === 768 && img.height === 768) {
                    detectedMode = 'tileset';
                } else if (img.width === 512 && img.height === 512) {
                    detectedMode = 'iconset';
                } else if (img.width === 144 && img.height === 192) {
                    detectedMode = 'smallitems';
                } else if (img.width === 144 && img.height === 384) {
                    detectedMode = 'tallitems';
                } else if (img.width === 288 && img.height === 384) {
                    detectedMode = 'bigitems';
                }

                // Switch mode if needed
                if (this.mode !== detectedMode) {
                    this.createNewDocument(detectedMode);
                }

                // Clear the current document first
                this.selectedImportIcons.clear();
                this.iconOffsets = {};
                this.initializeGrid();

                // Create a canvas with the same dimensions as the upload
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = img.width;
                tempCanvas.height = img.height;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(img, 0, 0);

                // Parse the image and populate the grid
                this.parseImageToGrid(tempCanvas);
                this.updateGridInfo();
                this.render();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);

        // Reset input
        document.getElementById('uploadImageInput').value = '';
    }

    parseImageToGrid(sourceCanvas) {
        const iconSize = this.ICON_SIZE;
        const tileHeight = this.TILE_HEIGHT || this.ICON_SIZE;
        
        const maxRows = Math.ceil(sourceCanvas.height / tileHeight);
        const maxCols = Math.ceil(sourceCanvas.width / iconSize);

        // Icon Set mode: always keep 16 columns, expand rows as needed
        if (this.mode === 'iconset') {
            // Expand rows if needed
            if (maxRows > this.ROWS) {
                this.ROWS = maxRows;
                this.CANVAS_HEIGHT = this.ROWS * iconSize;
                this.canvas.height = this.CANVAS_HEIGHT;
                this.initializeGrid();
            }
            
            // Always use 16 columns, process up to that many
            const colsToProcess = Math.min(maxCols, this.COLUMNS);
            
            // Parse icons
            const sourceCtx = sourceCanvas.getContext('2d', { willReadFrequently: true });
            for (let row = 0; row < Math.min(maxRows, this.ROWS); row++) {
                for (let col = 0; col < colsToProcess; col++) {
                    const x = col * iconSize;
                    const y = row * iconSize;

                    const iconCanvas = document.createElement('canvas');
                    iconCanvas.width = iconSize;
                    iconCanvas.height = iconSize;
                    const iconCtx = iconCanvas.getContext('2d');

                    iconCtx.drawImage(sourceCanvas, x, y, iconSize, iconSize, 0, 0, iconSize, iconSize);
                    const imageData = iconCtx.getImageData(0, 0, iconSize, iconSize);

                    // Check if icon is not empty
                    if (!this.isIconEmpty(imageData)) {
                        this.iconGrid[row][col] = iconCanvas.toDataURL('image/png');
                    }
                }
            }
        } else {
            // All other modes: keep fixed dimensions and parse based on tile size
            const sourceCtx = sourceCanvas.getContext('2d', { willReadFrequently: true });
            for (let row = 0; row < Math.min(maxRows, this.ROWS); row++) {
                for (let col = 0; col < Math.min(maxCols, this.COLUMNS); col++) {
                    const x = col * iconSize;
                    const y = row * tileHeight;

                    const iconCanvas = document.createElement('canvas');
                    iconCanvas.width = iconSize;
                    iconCanvas.height = tileHeight;
                    const iconCtx = iconCanvas.getContext('2d');

                    iconCtx.drawImage(sourceCanvas, x, y, iconSize, tileHeight, 0, 0, iconSize, tileHeight);
                    const imageData = iconCtx.getImageData(0, 0, iconSize, tileHeight);

                    // Check if icon is not empty
                    if (!this.isIconEmpty(imageData)) {
                        this.iconGrid[row][col] = iconCanvas.toDataURL('image/png');
                    }
                }
            }
        }
    }

    isIconEmpty(imageData) {
        const data = imageData.data;
        for (let i = 3; i < data.length; i += 4) {
            if (data[i] > 0) return false;
        }
        return true;
    }

    handleImportImage(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                this.importedImage = img;
                this.importedImageData = img;

                // Show import preview
                const preview = document.getElementById('importPreview');
                preview.classList.remove('hidden');

                // Calculate how to display the import image
                const maxWidth = this.importCanvas.width;
                const maxHeight = this.importCanvas.height;
                const scale = Math.min(maxWidth / img.width, maxHeight / img.height);

                this.importCtx.clearRect(0, 0, this.importCanvas.width, this.importCanvas.height);
                const displayWidth = img.width * scale;
                const displayHeight = img.height * scale;
                const offsetX = (this.importCanvas.width - displayWidth) / 2;
                const offsetY = (this.importCanvas.height - displayHeight) / 2;

                this.importCtx.drawImage(img, offsetX, offsetY, displayWidth, displayHeight);
                
                // Store the offset for interaction calculations
                this.importImageOffset = { x: offsetX, y: offsetY, scale: scale };
                
                // Update canvas scaling to fit both comfortably
                this.updateCanvasScaling();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);

        document.getElementById('importImageInput').value = '';
    }

    handleImportCanvasMouseDown(e) {
        if (!this.importedImage) return;
        
        // Don't select if we're dragging
        if (e.buttons === 1 && this.draggedIcons.length > 0) return;

        const rect = this.importCanvas.getBoundingClientRect();
        const scaledX = (e.clientX - rect.left) / this.importCanvasScale;
        const scaledY = (e.clientY - rect.top) / this.importCanvasScale;

        const offset = this.importImageOffset || { x: 0, y: 0, scale: 1 };
        const imageX = (scaledX - offset.x) / offset.scale;
        const imageY = (scaledY - offset.y) / offset.scale;

        const col = Math.floor(imageX / this.IMPORT_ICON_WIDTH);
        const row = Math.floor(imageY / this.IMPORT_ICON_HEIGHT);

        if (row >= 0 && col >= 0 && row * this.IMPORT_ICON_HEIGHT < this.importedImage.height && col * this.IMPORT_ICON_WIDTH < this.importedImage.width) {
            this.importCanvasMouseDownSpace = { row, col };
        } else {
            this.importCanvasMouseDownSpace = null;
        }
    }

    handleImportCanvasMouseUp(e) {
        if (!this.importedImage || !this.importCanvasMouseDownSpace) return;
        
        const rect = this.importCanvas.getBoundingClientRect();
        const scaledX = (e.clientX - rect.left) / this.importCanvasScale;
        const scaledY = (e.clientY - rect.top) / this.importCanvasScale;

        const offset = this.importImageOffset || { x: 0, y: 0, scale: 1 };
        const imageX = (scaledX - offset.x) / offset.scale;
        const imageY = (scaledY - offset.y) / offset.scale;

        const col = Math.floor(imageX / this.IMPORT_ICON_WIDTH);
        const row = Math.floor(imageY / this.IMPORT_ICON_HEIGHT);

        // Only toggle selection if mouse up is over the same space as mouse down
        if (row === this.importCanvasMouseDownSpace.row && col === this.importCanvasMouseDownSpace.col) {
            const iconKey = `${row},${col}`;
            if (this.selectedImportIcons.has(iconKey)) {
                this.selectedImportIcons.delete(iconKey);
            } else {
                if (!e.ctrlKey && !e.metaKey) {
                    this.selectedImportIcons.clear();
                }
                this.selectedImportIcons.add(iconKey);
                
                // Auto-select additional tiles based on mode
                if (this.mode === 'tallitems') {
                    // Also select the tile below
                    const belowKey = `${row + 1},${col}`;
                    if (row + 1 < 1000) { // Basic bounds check
                        this.selectedImportIcons.add(belowKey);
                    }
                } else if (this.mode === 'bigitems') {
                    // Select 4 tiles forming a square: current, right, below, and diagonal
                    const rightKey = `${row},${col + 1}`;
                    const belowKey = `${row + 1},${col}`;
                    const diagonalKey = `${row + 1},${col + 1}`;
                    this.selectedImportIcons.add(rightKey);
                    this.selectedImportIcons.add(belowKey);
                    this.selectedImportIcons.add(diagonalKey);
                }
            }
            console.log('Selected icons:', Array.from(this.selectedImportIcons));
            this.renderImportCanvas();
        }
        
        this.importCanvasMouseDownSpace = null;
    }

    handleImportCanvasClick(e) {
        if (!this.importedImage) return;
        
        // Don't select if we're dragging
        if (e.buttons === 1 && this.draggedIcons.length > 0) return;

        const rect = this.importCanvas.getBoundingClientRect();
        const scaledX = (e.clientX - rect.left) / this.importCanvasScale;
        const scaledY = (e.clientY - rect.top) / this.importCanvasScale;

        const offset = this.importImageOffset || { x: 0, y: 0, scale: 1 };
        const imageX = (scaledX - offset.x) / offset.scale;
        const imageY = (scaledY - offset.y) / offset.scale;

        const col = Math.floor(imageX / this.IMPORT_ICON_WIDTH);
        const row = Math.floor(imageY / this.IMPORT_ICON_HEIGHT);

        if (row >= 0 && col >= 0 && row * this.IMPORT_ICON_HEIGHT < this.importedImage.height && col * this.IMPORT_ICON_WIDTH < this.importedImage.width) {
            const iconKey = `${row},${col}`;
            if (this.selectedImportIcons.has(iconKey)) {
                this.selectedImportIcons.delete(iconKey);
            } else {
                if (!e.ctrlKey && !e.metaKey) {
                    this.selectedImportIcons.clear();
                }
                this.selectedImportIcons.add(iconKey);
                
                // Auto-select additional tiles based on mode
                if (this.mode === 'tallitems') {
                    // Also select the tile below
                    const belowKey = `${row + 1},${col}`;
                    this.selectedImportIcons.add(belowKey);
                } else if (this.mode === 'bigitems') {
                    // Select 4 tiles forming a square: current, right, below, and diagonal
                    const rightKey = `${row},${col + 1}`;
                    const belowKey = `${row + 1},${col}`;
                    const diagonalKey = `${row + 1},${col + 1}`;
                    this.selectedImportIcons.add(rightKey);
                    this.selectedImportIcons.add(belowKey);
                    this.selectedImportIcons.add(diagonalKey);
                }
            }
            console.log('Selected icons:', Array.from(this.selectedImportIcons));
            this.renderImportCanvas();
        }
    }

    startDragIcon(e) {
        console.log('dragstart event fired, selectedIcons:', this.selectedImportIcons.size);
        
        if (this.selectedImportIcons.size === 0) {
            console.log('No icons selected, preventing drag');
            e.preventDefault();
            return false;
        }

        // Convert selected icon keys to array for dragging
        this.draggedIcons = Array.from(this.selectedImportIcons).map(key => {
            const [row, col] = key.split(',').map(Number);
            return { row, col };
        });
        
        console.log('Dragging icons:', this.draggedIcons);
        
        // Create drag image showing the selected icons
        const dragImage = this.createDragImage(this.draggedIcons);
        
        // Store data in dataTransfer
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', 'icons');
        e.dataTransfer.setDragImage(dragImage, 0, 0);
        
        return false;
    }

    createDragImage(icons) {
        if (icons.length === 0 || !this.importedImage) {
            const emptyCanvas = document.createElement('canvas');
            emptyCanvas.width = 1;
            emptyCanvas.height = 1;
            return emptyCanvas;
        }

        // Calculate bounding box of all selected icons
        let minRow = Infinity, maxRow = -Infinity;
        let minCol = Infinity, maxCol = -Infinity;

        icons.forEach(icon => {
            minRow = Math.min(minRow, icon.row);
            maxRow = Math.max(maxRow, icon.row);
            minCol = Math.min(minCol, icon.col);
            maxCol = Math.max(maxCol, icon.col);
        });

        const width = (maxCol - minCol + 1) * this.IMPORT_ICON_WIDTH;
        const height = (maxRow - minRow + 1) * this.IMPORT_ICON_HEIGHT;

        // Create canvas for drag image
        const dragCanvas = document.createElement('canvas');
        dragCanvas.width = width;
        dragCanvas.height = height;
        const dragCtx = dragCanvas.getContext('2d');

        // Draw semi-transparent background
        dragCtx.fillStyle = 'rgba(102, 126, 234, 0.3)';
        dragCtx.fillRect(0, 0, width, height);

        // Draw border
        dragCtx.strokeStyle = '#667eea';
        dragCtx.lineWidth = 3;
        dragCtx.strokeRect(0, 0, width, height);

        // Draw each selected icon FROM THE IMPORTED IMAGE synchronously
        icons.forEach(icon => {
            const x = (icon.col - minCol) * this.IMPORT_ICON_WIDTH;
            const y = (icon.row - minRow) * this.IMPORT_ICON_HEIGHT;

            // Draw from the imported image directly
            const sourceX = icon.col * this.IMPORT_ICON_WIDTH;
            const sourceY = icon.row * this.IMPORT_ICON_HEIGHT;
            
            try {
                dragCtx.drawImage(
                    this.importedImage,
                    sourceX, sourceY, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
                    x, y, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT
                );
            } catch (e) {
                console.log('Error drawing icon:', e);
            }
        });

        return dragCanvas;
    }

    renderImportCanvas() {
        if (!this.importedImage) return;

        this.importCtx.clearRect(0, 0, this.importCanvas.width, this.importCanvas.height);

        const offset = this.importImageOffset || { x: 0, y: 0, scale: 1 };
        const displayWidth = this.importedImage.width * offset.scale;
        const displayHeight = this.importedImage.height * offset.scale;

        this.importCtx.drawImage(this.importedImage, offset.x, offset.y, displayWidth, displayHeight);

        // Draw selection rectangles
        this.importCtx.strokeStyle = '#667eea';
        this.importCtx.lineWidth = 2;
        this.importCtx.setLineDash([4, 4]);

        this.selectedImportIcons.forEach(key => {
            const [row, col] = key.split(',').map(Number);
            const x = offset.x + col * this.IMPORT_ICON_WIDTH * offset.scale;
            const y = offset.y + row * this.IMPORT_ICON_HEIGHT * offset.scale;
            const width = this.IMPORT_ICON_WIDTH * offset.scale;
            const height = this.IMPORT_ICON_HEIGHT * offset.scale;

            this.importCtx.strokeRect(x, y, width, height);
        });

        this.importCtx.setLineDash([]);
    }

    handleCanvasClick(e, canvas, ctx) {
        const rect = canvas.getBoundingClientRect();
        const scaledX = (e.clientX - rect.left) / this.mainCanvasScale;
        const scaledY = (e.clientY - rect.top) / this.mainCanvasScale;

        const tileHeight = this.TILE_HEIGHT || this.ICON_SIZE;
        const col = Math.floor(scaledX / this.ICON_SIZE);
        const row = Math.floor(scaledY / tileHeight);

        if (row < this.ROWS && col < this.COLUMNS) {
            // Select the space instead of deleting
            this.selectedSpace = { row, col };
            this.render();
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        this.canvas.classList.add('drag-over');
        
        // Show preview of where icons will be placed
        if (this.draggedIcons.length === 0) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const scaledX = (e.clientX - rect.left) / this.mainCanvasScale;
        const scaledY = (e.clientY - rect.top) / this.mainCanvasScale;

        const tileHeight = this.TILE_HEIGHT || this.ICON_SIZE;
        const targetCol = Math.floor(scaledX / this.ICON_SIZE);
        const targetRow = Math.floor(scaledY / tileHeight);

        // Backup canvas on first drag over
        if (!this.dragPreviewActive) {
            this.canvasBackup = document.createElement('canvas');
            this.canvasBackup.width = this.canvas.width;
            this.canvasBackup.height = this.canvas.height;
            this.canvasBackup.getContext('2d').drawImage(this.canvas, 0, 0);
            this.dragPreviewActive = true;
        }

        // Restore from backup and draw preview
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.canvasBackup, 0, 0);

        // Draw preview of dragged icons in semi-transparent
        this.ctx.globalAlpha = 0.5;
        this.ctx.strokeStyle = '#667eea';
        this.ctx.lineWidth = 2;

        // For Tall Items, combine the two tiles into one preview
        if (this.mode === 'tallitems' && this.draggedIcons.length === 2) {
            const tile1 = this.draggedIcons[0];
            const tile2 = this.draggedIcons[1];
            
            if (tile1.col === tile2.col && tile2.row === tile1.row + 1) {
                // Show single preview rectangle for the combined 48x96 tile
                this.ctx.strokeRect(
                    targetCol * this.ICON_SIZE,
                    targetRow * tileHeight,
                    this.ICON_SIZE,
                    tileHeight
                );

                // Draw the combined preview - top tile
                const sourceX1 = tile1.col * this.IMPORT_ICON_WIDTH;
                const sourceY1 = tile1.row * this.IMPORT_ICON_HEIGHT;
                this.ctx.drawImage(
                    this.importedImage,
                    sourceX1, sourceY1, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
                    targetCol * this.ICON_SIZE, targetRow * tileHeight, this.ICON_SIZE, this.IMPORT_ICON_HEIGHT
                );

                // Draw the combined preview - bottom tile
                const sourceX2 = tile2.col * this.IMPORT_ICON_WIDTH;
                const sourceY2 = tile2.row * this.IMPORT_ICON_HEIGHT;
                this.ctx.drawImage(
                    this.importedImage,
                    sourceX2, sourceY2, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
                    targetCol * this.ICON_SIZE, targetRow * tileHeight + this.IMPORT_ICON_HEIGHT, this.ICON_SIZE, this.IMPORT_ICON_HEIGHT
                );
            } else {
                // Fallback for non-vertically-stacked tiles
                let minRow = Infinity, minCol = Infinity;
                this.draggedIcons.forEach(icon => {
                    minRow = Math.min(minRow, icon.row);
                    minCol = Math.min(minCol, icon.col);
                });

                this.draggedIcons.forEach(icon => {
                    const rowOffset = icon.row - minRow;
                    const colOffset = icon.col - minCol;
                    const newRow = targetRow + rowOffset;
                    const newCol = targetCol + colOffset;

                    if (newRow >= 0 && newRow < this.ROWS && newCol >= 0 && newCol < this.COLUMNS) {
                        this.ctx.strokeRect(
                            newCol * this.ICON_SIZE,
                            newRow * tileHeight,
                            this.ICON_SIZE,
                            tileHeight
                        );

                        const sourceX = icon.col * this.IMPORT_ICON_WIDTH;
                        const sourceY = icon.row * this.IMPORT_ICON_HEIGHT;
                        this.ctx.drawImage(
                            this.importedImage,
                            sourceX, sourceY, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
                            newCol * this.ICON_SIZE, newRow * tileHeight, this.ICON_SIZE, tileHeight
                        );
                    }
                });
            }
        } else if (this.mode === 'bigitems' && this.draggedIcons.length === 4) {
            // For Big Items with 4 tiles, combine into one preview
            const tiles = this.draggedIcons.sort((a, b) => {
                if (a.row !== b.row) return a.row - b.row;
                return a.col - b.col;
            });
            
            const topLeft = tiles[0];
            const topRight = tiles[1];
            const bottomLeft = tiles[2];
            const bottomRight = tiles[3];
            
            // Verify they form a proper 2x2 grid
            if (topLeft.row + 1 === bottomLeft.row && 
                topLeft.col + 1 === topRight.col &&
                topRight.row + 1 === bottomRight.row &&
                bottomLeft.col + 1 === bottomRight.col) {
                
                // Show single preview rectangle for the combined 96x96 tile
                this.ctx.strokeRect(
                    targetCol * this.ICON_SIZE,
                    targetRow * tileHeight,
                    this.ICON_SIZE,
                    tileHeight
                );

                // Draw the combined preview - all 4 tiles
                // Top-left
                const sourceX1 = topLeft.col * this.IMPORT_ICON_WIDTH;
                const sourceY1 = topLeft.row * this.IMPORT_ICON_HEIGHT;
                this.ctx.drawImage(
                    this.importedImage,
                    sourceX1, sourceY1, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
                    targetCol * this.ICON_SIZE, targetRow * tileHeight, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT
                );

                // Top-right
                const sourceX2 = topRight.col * this.IMPORT_ICON_WIDTH;
                const sourceY2 = topRight.row * this.IMPORT_ICON_HEIGHT;
                this.ctx.drawImage(
                    this.importedImage,
                    sourceX2, sourceY2, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
                    targetCol * this.ICON_SIZE + this.IMPORT_ICON_WIDTH, targetRow * tileHeight, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT
                );

                // Bottom-left
                const sourceX3 = bottomLeft.col * this.IMPORT_ICON_WIDTH;
                const sourceY3 = bottomLeft.row * this.IMPORT_ICON_HEIGHT;
                this.ctx.drawImage(
                    this.importedImage,
                    sourceX3, sourceY3, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
                    targetCol * this.ICON_SIZE, targetRow * tileHeight + this.IMPORT_ICON_HEIGHT, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT
                );

                // Bottom-right
                const sourceX4 = bottomRight.col * this.IMPORT_ICON_WIDTH;
                const sourceY4 = bottomRight.row * this.IMPORT_ICON_HEIGHT;
                this.ctx.drawImage(
                    this.importedImage,
                    sourceX4, sourceY4, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
                    targetCol * this.ICON_SIZE + this.IMPORT_ICON_WIDTH, targetRow * tileHeight + this.IMPORT_ICON_HEIGHT, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT
                );
            } else {
                // Fallback for non-2x2 grid tiles
                let minRow = Infinity, minCol = Infinity;
                this.draggedIcons.forEach(icon => {
                    minRow = Math.min(minRow, icon.row);
                    minCol = Math.min(minCol, icon.col);
                });

                this.draggedIcons.forEach(icon => {
                    const rowOffset = icon.row - minRow;
                    const colOffset = icon.col - minCol;
                    const newRow = targetRow + rowOffset;
                    const newCol = targetCol + colOffset;

                    if (newRow >= 0 && newRow < this.ROWS && newCol >= 0 && newCol < this.COLUMNS) {
                        this.ctx.strokeRect(
                            newCol * this.ICON_SIZE,
                            newRow * tileHeight,
                            this.ICON_SIZE,
                            tileHeight
                        );

                        const sourceX = icon.col * this.IMPORT_ICON_WIDTH;
                        const sourceY = icon.row * this.IMPORT_ICON_HEIGHT;
                        this.ctx.drawImage(
                            this.importedImage,
                            sourceX, sourceY, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
                            newCol * this.ICON_SIZE, newRow * tileHeight, this.ICON_SIZE, tileHeight
                        );
                    }
                });
            }
        } else if (this.mode === 'bigitems') {
            // For Big Items with non-4 tiles, treat as a single unit
            let minRow = Infinity, minCol = Infinity;
            this.draggedIcons.forEach(icon => {
                minRow = Math.min(minRow, icon.row);
                minCol = Math.min(minCol, icon.col);
            });

            this.draggedIcons.forEach(icon => {
                const rowOffset = icon.row - minRow;
                const colOffset = icon.col - minCol;
                const newRow = targetRow + rowOffset;
                const newCol = targetCol + colOffset;

                if (newRow >= 0 && newRow < this.ROWS && newCol >= 0 && newCol < this.COLUMNS) {
                    this.ctx.strokeRect(
                        newCol * this.ICON_SIZE,
                        newRow * tileHeight,
                        this.ICON_SIZE,
                        tileHeight
                    );

                    const sourceX = icon.col * this.IMPORT_ICON_WIDTH;
                    const sourceY = icon.row * this.IMPORT_ICON_HEIGHT;
                    this.ctx.drawImage(
                        this.importedImage,
                        sourceX, sourceY, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
                        newCol * this.ICON_SIZE, newRow * tileHeight, this.ICON_SIZE, tileHeight
                    );
                }
            });
        } else {
            // For other modes, use original relative positioning
            const firstIcon = this.draggedIcons[0];
            const rowOffset = targetRow - firstIcon.row;
            const colOffset = targetCol - firstIcon.col;

            this.draggedIcons.forEach(icon => {
                const newRow = icon.row + rowOffset;
                const newCol = icon.col + colOffset;

                if (newRow >= 0 && newRow < this.ROWS && newCol >= 0 && newCol < this.COLUMNS) {
                    this.ctx.strokeRect(
                        newCol * this.ICON_SIZE,
                        newRow * tileHeight,
                        this.ICON_SIZE,
                        tileHeight
                    );

                    const sourceX = icon.col * this.IMPORT_ICON_WIDTH;
                    const sourceY = icon.row * this.IMPORT_ICON_HEIGHT;
                    this.ctx.drawImage(
                        this.importedImage,
                        sourceX, sourceY, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
                        newCol * this.ICON_SIZE, newRow * tileHeight, this.ICON_SIZE, tileHeight
                    );
                }
            });
        }

        this.ctx.globalAlpha = 1.0;
    }

    handleDragLeave(e) {
        // Only reset if we're actually leaving the canvas
        if (e.target === this.canvas) {
            this.canvas.classList.remove('drag-over');
            if (this.dragPreviewActive && this.canvasBackup) {
                this.ctx.drawImage(this.canvasBackup, 0, 0);
                this.dragPreviewActive = false;
            }
        }
    }

    handleKeyDown(e) {
        // Only process keyboard shortcuts if not typing in an input
        if (e.target.tagName === 'INPUT' && e.target.type !== 'number') return;

        if (e.key === 'Delete') {
            // Delete selected space
            if (this.selectedSpace) {
                this.iconGrid[this.selectedSpace.row][this.selectedSpace.col] = null;
                // Clear offset when deleting
                const key = `${this.selectedSpace.row},${this.selectedSpace.col}`;
                delete this.iconOffsets[key];
                this.render();
            }
        } else if (e.ctrlKey && e.key === 'c') {
            // Copy selected space
            e.preventDefault();
            if (this.selectedSpace) {
                const icon = this.iconGrid[this.selectedSpace.row][this.selectedSpace.col];
                if (icon) {
                    this.copiedIcon = icon;
                    console.log('Icon copied');
                }
            }
        } else if (e.ctrlKey && e.key === 'v') {
            // Paste to selected space
            e.preventDefault();
            if (this.selectedSpace && this.copiedIcon) {
                // Clear the current image and cache entry in that space
                const key = `${this.selectedSpace.row},${this.selectedSpace.col}`;
                delete this.imageCache[key];
                delete this.iconOffsets[key];
                
                // Paste the new icon
                this.iconGrid[this.selectedSpace.row][this.selectedSpace.col] = this.copiedIcon;
                this.render();
                console.log('Icon pasted');
            }
        } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            // Move selected icon by one pixel
            e.preventDefault();
            if (this.selectedSpace && this.iconGrid[this.selectedSpace.row][this.selectedSpace.col]) {
                const key = `${this.selectedSpace.row},${this.selectedSpace.col}`;
                if (!this.iconOffsets[key]) {
                    this.iconOffsets[key] = { x: 0, y: 0 };
                }
                
                switch(e.key) {
                    case 'ArrowUp':
                        this.iconOffsets[key].y -= 1;
                        break;
                    case 'ArrowDown':
                        this.iconOffsets[key].y += 1;
                        break;
                    case 'ArrowLeft':
                        this.iconOffsets[key].x -= 1;
                        break;
                    case 'ArrowRight':
                        this.iconOffsets[key].x += 1;
                        break;
                }
                this.render();
            }
        }
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.canvas.classList.remove('drag-over');
        
        // Clear the drag preview state
        this.dragPreviewActive = false;
        this.canvasBackup = null;

        if (this.draggedIcons.length === 0) {
            // Handle file drop
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = new Image();
                        img.onload = () => {
                            this.parseImageToGrid(img);
                            this.updateGridInfo();
                            this.render();
                        };
                        img.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            }
            return;
        }

        const rect = this.canvas.getBoundingClientRect();
        const scaledX = (e.clientX - rect.left) / this.mainCanvasScale;
        const scaledY = (e.clientY - rect.top) / this.mainCanvasScale;

        const tileHeight = this.TILE_HEIGHT || this.ICON_SIZE;
        const targetCol = Math.floor(scaledX / this.ICON_SIZE);
        const targetRow = Math.floor(scaledY / tileHeight);

        console.log('Drop event - draggedIcons:', this.draggedIcons, 'targetRow:', targetRow, 'targetCol:', targetCol);

        // Copy all dragged icons
        if (this.draggedIcons.length > 0) {
            // For Tall Items, combine the two selected tiles into one
            if (this.mode === 'tallitems' && this.draggedIcons.length === 2) {
                // The two tiles should be vertically stacked in the import (same col, adjacent rows)
                const tile1 = this.draggedIcons[0];
                const tile2 = this.draggedIcons[1];
                
                if (tile1.col === tile2.col && tile2.row === tile1.row + 1) {
                    // Combine them into a single tile at the target location
                    this.copyIconFromImportTall(tile1.row, tile1.col, tile2.row, tile2.col, targetRow, targetCol);
                } else {
                    // Fallback to normal behavior if not vertically stacked
                    let minRow = Infinity, minCol = Infinity;
                    this.draggedIcons.forEach(icon => {
                        minRow = Math.min(minRow, icon.row);
                        minCol = Math.min(minCol, icon.col);
                    });

                    this.draggedIcons.forEach(icon => {
                        const rowOffset = icon.row - minRow;
                        const colOffset = icon.col - minCol;
                        const newRow = targetRow + rowOffset;
                        const newCol = targetCol + colOffset;

                        if (newRow >= 0 && newRow < this.ROWS && newCol >= 0 && newCol < this.COLUMNS) {
                            this.copyIconFromImport(icon.row, icon.col, newRow, newCol);
                        }
                    });
                }
            } else if (this.mode === 'bigitems' && this.draggedIcons.length === 4) {
                // For Big Items, combine all four tiles into one 96x96 space
                // The tiles should form a 2x2 grid in the import (top-left, top-right, bottom-left, bottom-right)
                const tiles = this.draggedIcons.sort((a, b) => {
                    if (a.row !== b.row) return a.row - b.row;
                    return a.col - b.col;
                });
                
                const topLeft = tiles[0];
                const topRight = tiles[1];
                const bottomLeft = tiles[2];
                const bottomRight = tiles[3];
                
                // Verify they form a proper 2x2 grid
                if (topLeft.row + 1 === bottomLeft.row && 
                    topLeft.col + 1 === topRight.col &&
                    topRight.row + 1 === bottomRight.row &&
                    bottomLeft.col + 1 === bottomRight.col) {
                    // Combine them into a single tile at the target location
                    this.copyIconFromImportBig(topLeft.row, topLeft.col, topRight.row, topRight.col, 
                                              bottomLeft.row, bottomLeft.col, bottomRight.row, bottomRight.col,
                                              targetRow, targetCol);
                } else {
                    // Fallback to normal behavior if not a proper 2x2 grid
                    let minRow = Infinity, minCol = Infinity;
                    this.draggedIcons.forEach(icon => {
                        minRow = Math.min(minRow, icon.row);
                        minCol = Math.min(minCol, icon.col);
                    });

                    this.draggedIcons.forEach(icon => {
                        const rowOffset = icon.row - minRow;
                        const colOffset = icon.col - minCol;
                        const newRow = targetRow + rowOffset;
                        const newCol = targetCol + colOffset;

                        if (newRow >= 0 && newRow < this.ROWS && newCol >= 0 && newCol < this.COLUMNS) {
                            this.copyIconFromImport(icon.row, icon.col, newRow, newCol);
                        }
                    });
                }
            } else if (this.mode === 'bigitems') {
                // For Big Items with non-4 tiles, treat as a single unit
                let minRow = Infinity, minCol = Infinity;
                this.draggedIcons.forEach(icon => {
                    minRow = Math.min(minRow, icon.row);
                    minCol = Math.min(minCol, icon.col);
                });

                this.draggedIcons.forEach(icon => {
                    const rowOffset = icon.row - minRow;
                    const colOffset = icon.col - minCol;
                    const newRow = targetRow + rowOffset;
                    const newCol = targetCol + colOffset;

                    if (newRow >= 0 && newRow < this.ROWS && newCol >= 0 && newCol < this.COLUMNS) {
                        this.copyIconFromImport(icon.row, icon.col, newRow, newCol);
                    }
                });
            } else {
                // For other modes, use the original relative positioning logic
                const firstIcon = this.draggedIcons[0];
                const rowOffset = targetRow - firstIcon.row;
                const colOffset = targetCol - firstIcon.col;

                console.log('First icon:', firstIcon, 'offsets:', rowOffset, colOffset);

                this.draggedIcons.forEach(icon => {
                    const newRow = icon.row + rowOffset;
                    const newCol = icon.col + colOffset;

                    if (newRow >= 0 && newRow < this.ROWS && newCol >= 0 && newCol < this.COLUMNS) {
                        this.copyIconFromImport(icon.row, icon.col, newRow, newCol);
                    }
                });
            }

            this.render();
        }

        this.draggedIcons = [];
    }

    copyIconFromImport(sourceRow, sourceCol, targetRow, targetCol) {
        const tileHeight = this.TILE_HEIGHT || this.ICON_SIZE;
        const x = sourceCol * this.IMPORT_ICON_WIDTH;
        const y = sourceRow * this.IMPORT_ICON_HEIGHT;

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.ICON_SIZE;
        tempCanvas.height = tileHeight;
        const tempCtx = tempCanvas.getContext('2d');

        const offset = this.importImageOffset || { x: 0, y: 0, scale: 1 };
        tempCtx.drawImage(
            this.importedImage,
            x, y, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
            0, 0, this.ICON_SIZE, tileHeight
        );
        
        // Clear the old image and cache entry at the target location
        const targetKey = `${targetRow},${targetCol}`;
        delete this.imageCache[targetKey];
        delete this.iconOffsets[targetKey];
        
        this.iconGrid[targetRow][targetCol] = tempCanvas.toDataURL('image/png');
    }

    copyIconFromImportTall(sourceRow1, sourceCol1, sourceRow2, sourceCol2, targetRow, targetCol) {
        // Combine two 48x48 tiles into a single 48x96 tile for Tall Items mode
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.ICON_SIZE;           // 48
        tempCanvas.height = this.TILE_HEIGHT || 96;  // 96
        const tempCtx = tempCanvas.getContext('2d');

        const offset = this.importImageOffset || { x: 0, y: 0, scale: 1 };
        
        // Draw first tile at top (0, 0)
        const x1 = sourceCol1 * this.IMPORT_ICON_WIDTH;
        const y1 = sourceRow1 * this.IMPORT_ICON_HEIGHT;
        tempCtx.drawImage(
            this.importedImage,
            x1, y1, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
            0, 0, this.ICON_SIZE, this.IMPORT_ICON_HEIGHT
        );
        
        // Draw second tile at bottom (0, 48)
        const x2 = sourceCol2 * this.IMPORT_ICON_WIDTH;
        const y2 = sourceRow2 * this.IMPORT_ICON_HEIGHT;
        tempCtx.drawImage(
            this.importedImage,
            x2, y2, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
            0, this.IMPORT_ICON_HEIGHT, this.ICON_SIZE, this.IMPORT_ICON_HEIGHT
        );
        
        // Clear the old image and cache entry at the target location
        const targetKey = `${targetRow},${targetCol}`;
        delete this.imageCache[targetKey];
        delete this.iconOffsets[targetKey];
        
        this.iconGrid[targetRow][targetCol] = tempCanvas.toDataURL('image/png');
    }

    copyIconFromImportBig(sourceRow1, sourceCol1, sourceRow2, sourceCol2, sourceRow3, sourceCol3, sourceRow4, sourceCol4, targetRow, targetCol) {
        // Combine four 48x48 tiles into a single 96x96 tile for Big Items mode
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.ICON_SIZE;   // 96
        tempCanvas.height = this.ICON_SIZE;  // 96
        const tempCtx = tempCanvas.getContext('2d');

        const offset = this.importImageOffset || { x: 0, y: 0, scale: 1 };
        
        // Draw top-left tile
        const x1 = sourceCol1 * this.IMPORT_ICON_WIDTH;
        const y1 = sourceRow1 * this.IMPORT_ICON_HEIGHT;
        tempCtx.drawImage(
            this.importedImage,
            x1, y1, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
            0, 0, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT
        );
        
        // Draw top-right tile
        const x2 = sourceCol2 * this.IMPORT_ICON_WIDTH;
        const y2 = sourceRow2 * this.IMPORT_ICON_HEIGHT;
        tempCtx.drawImage(
            this.importedImage,
            x2, y2, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
            this.IMPORT_ICON_WIDTH, 0, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT
        );
        
        // Draw bottom-left tile
        const x3 = sourceCol3 * this.IMPORT_ICON_WIDTH;
        const y3 = sourceRow3 * this.IMPORT_ICON_HEIGHT;
        tempCtx.drawImage(
            this.importedImage,
            x3, y3, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
            0, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT
        );
        
        // Draw bottom-right tile
        const x4 = sourceCol4 * this.IMPORT_ICON_WIDTH;
        const y4 = sourceRow4 * this.IMPORT_ICON_HEIGHT;
        tempCtx.drawImage(
            this.importedImage,
            x4, y4, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT,
            this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_WIDTH, this.IMPORT_ICON_HEIGHT
        );
        
        // Clear the old image and cache entry at the target location
        const targetKey = `${targetRow},${targetCol}`;
        delete this.imageCache[targetKey];
        delete this.iconOffsets[targetKey];
        
        this.iconGrid[targetRow][targetCol] = tempCanvas.toDataURL('image/png');
    }

    reparseSelectedIcon() {
        // Create a temporary canvas to capture the current state of the main canvas
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        const tempCtx = tempCanvas.getContext('2d');

        // Draw the current canvas state (with all offsets applied)
        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLUMNS; col++) {
                if (this.iconGrid[row][col]) {
                    const img = new Image();
                    img.onload = () => {
                        const key = `${row},${col}`;
                        const offset = this.iconOffsets[key] || { x: 0, y: 0 };
                        tempCtx.drawImage(img, col * this.ICON_SIZE + offset.x, row * this.ICON_SIZE + offset.y, this.ICON_SIZE, this.ICON_SIZE);
                    };
                    img.src = this.iconGrid[row][col];
                }
            }
        }

        // Wait for images to load, then parse it back into the grid
        setTimeout(() => {
            // Clear the current grid and offsets
            this.initializeGrid();
            this.iconOffsets = {};

            // Parse the captured canvas back into the grid
            this.parseImageToGrid(tempCanvas);

            console.log('Document reparsed - all offsets baked in');
            this.render();
        }, 100);
    }

    showRowsModal() {
        document.getElementById('rowsModal').classList.remove('hidden');
    }

    hideRowsModal() {
        document.getElementById('rowsModal').classList.add('hidden');
    }

    addRows() {
        const rowsInput = document.getElementById('rowsInput');
        const rowsToAdd = parseInt(rowsInput.value) || 1;

        for (let i = 0; i < rowsToAdd; i++) {
            this.iconGrid.push([]);
            for (let col = 0; col < this.COLUMNS; col++) {
                this.iconGrid[this.ROWS][col] = null;
            }
            this.ROWS++;
        }

        this.CANVAS_SIZE = this.CANVAS_SIZE + rowsToAdd * this.ICON_SIZE;
        this.canvas.height = this.CANVAS_SIZE;

        this.updateGridInfo();
        this.render();
        this.hideRowsModal();
        rowsInput.value = '1';
    }

    updateGridInfo() {
        let modeLabel;
        if (this.mode === 'tileset') modeLabel = 'Tile Set';
        else if (this.mode === 'smallitems') modeLabel = 'Small Items';
        else if (this.mode === 'tallitems') modeLabel = 'Tall Items';
        else if (this.mode === 'bigitems') modeLabel = 'Big Items';
        else modeLabel = 'Icon Set';
        
        const width = this.CANVAS_WIDTH || this.CANVAS_SIZE;
        const height = this.CANVAS_HEIGHT || this.CANVAS_SIZE;
        document.getElementById('gridInfo').textContent = `${modeLabel} | Columns: ${this.COLUMNS} | Rows: ${this.ROWS} | Size: ${width}x${height}`;
    }

    updateCanvasScaling() {
        // Calculate scaling to fit canvases comfortably on screen width-wise only
        const canvasArea = document.querySelector('.canvas-area');
        const availableWidth = canvasArea.clientWidth - 60; // padding
        
        const hasImport = !document.getElementById('importPreview').classList.contains('hidden');
        
        if (hasImport && this.importedImage) {
            // Both canvases visible - split available width
            const canvasWidth = availableWidth / 2 - 15; // gap
            
            if (this.mode === 'iconset') {
                // Icon Set: both canvases scale proportionally, no height limit
                // Active document
                this.mainCanvasScale = Math.min(1, canvasWidth / this.canvas.width);
                const activeScaledWidth = this.canvas.width * this.mainCanvasScale;
                const activeScaledHeight = this.canvas.height * this.mainCanvasScale;
                this.canvas.style.width = activeScaledWidth + 'px';
                this.canvas.style.height = activeScaledHeight + 'px';
                
                // Import document
                const importScale = Math.min(1, canvasWidth / this.importCanvas.width);
                this.importCanvasScale = importScale;
                const importScaledWidth = this.importCanvas.width * importScale;
                const importScaledHeight = this.importCanvas.height * importScale;
                this.importCanvas.style.width = importScaledWidth + 'px';
                this.importCanvas.style.height = importScaledHeight + 'px';
            } else {
                // Other modes (tileset, smallitems, tallitems, bigitems): scale to fit available width
                this.mainCanvasScale = Math.min(1, canvasWidth / this.canvas.width);
                const mainScaledWidth = this.canvas.width * this.mainCanvasScale;
                const mainScaledHeight = this.canvas.height * this.mainCanvasScale;
                this.canvas.style.width = mainScaledWidth + 'px';
                this.canvas.style.height = mainScaledHeight + 'px';
                
                // Import canvas scaling - based on width only, maintain aspect ratio
                const importScale = Math.min(1, canvasWidth / this.importCanvas.width);
                this.importCanvasScale = importScale;
                const importScaledWidth = this.importCanvas.width * importScale;
                const importScaledHeight = this.importCanvas.height * importScale;
                this.importCanvas.style.width = importScaledWidth + 'px';
                this.importCanvas.style.height = importScaledHeight + 'px';
            }
        } else {
            // Only main canvas - scale based on width only
            if (this.mode === 'iconset') {
                // Icon Set: scale based on canvas width (512), height scales proportionally
                this.mainCanvasScale = Math.min(1, availableWidth / this.canvas.width);
                const scaledWidth = this.canvas.width * this.mainCanvasScale;
                const scaledHeight = this.canvas.height * this.mainCanvasScale;
                this.canvas.style.width = scaledWidth + 'px';
                this.canvas.style.height = scaledHeight + 'px';
            } else {
                // Other modes: scale proportionally to fit
                this.mainCanvasScale = Math.min(1, availableWidth / this.canvas.width);
                const mainScaledWidth = this.canvas.width * this.mainCanvasScale;
                const mainScaledHeight = this.canvas.height * this.mainCanvasScale;
                this.canvas.style.width = mainScaledWidth + 'px';
                this.canvas.style.height = mainScaledHeight + 'px';
            }
            
            const importScale = Math.min(1, availableWidth / this.importCanvas.width);
            this.importCanvasScale = importScale;
            const importScaledSize = Math.min(this.importCanvas.width, this.importCanvas.height) * importScale;
            this.importCanvas.style.width = importScaledSize + 'px';
            this.importCanvas.style.height = importScaledSize + 'px';
        }
    }

    createNewDocument(mode) {
        if (this.iconGrid.length > 0 && this.iconGrid.some(row => row.some(cell => cell !== null))) {
            if (!confirm('Create a new document? Any unsaved changes will be lost.')) {
                this.hideModeModal();
                return;
            }
        }

        this.mode = mode;
        this.selectedImportIcons.clear();

        if (mode === 'tileset') {
            this.ICON_SIZE = 48;
            this.ROWS = 16;
            this.COLUMNS = 16;
            this.CANVAS_SIZE = 768;
            this.CANVAS_WIDTH = 768;
            this.CANVAS_HEIGHT = 768;
            this.IMPORT_ICON_WIDTH = 48;
            this.IMPORT_ICON_HEIGHT = 48;
            delete this.TILE_HEIGHT;
            document.getElementById('addRowsBtn').disabled = true;
        } else if (mode === 'smallitems') {
            this.ICON_SIZE = 48;
            this.ROWS = 4;
            this.COLUMNS = 3;
            this.CANVAS_WIDTH = 144;
            this.CANVAS_HEIGHT = 192;
            this.IMPORT_ICON_WIDTH = 48;
            this.IMPORT_ICON_HEIGHT = 48;
            delete this.TILE_HEIGHT;
            document.getElementById('addRowsBtn').disabled = true;
        } else if (mode === 'tallitems') {
            this.ICON_SIZE = 48;
            this.TILE_HEIGHT = 96;
            this.ROWS = 4;
            this.COLUMNS = 3;
            this.CANVAS_WIDTH = 144;
            this.CANVAS_HEIGHT = 384;
            // Import as 48x48 for selection, but main document uses 48x96
            this.IMPORT_ICON_WIDTH = 48;
            this.IMPORT_ICON_HEIGHT = 48;
            document.getElementById('addRowsBtn').disabled = true;
        } else if (mode === 'bigitems') {
            this.ICON_SIZE = 96;
            this.ROWS = 4;
            this.COLUMNS = 3;
            this.CANVAS_WIDTH = 288;
            this.CANVAS_HEIGHT = 384;
            // Import as 48x48 for selection, but main document uses 96x96
            this.IMPORT_ICON_WIDTH = 48;
            this.IMPORT_ICON_HEIGHT = 48;
            delete this.TILE_HEIGHT;
            document.getElementById('addRowsBtn').disabled = true;
        } else {
            // iconset
            this.ICON_SIZE = 32;
            this.ROWS = 16;
            this.COLUMNS = 16;
            this.CANVAS_SIZE = 512;
            this.CANVAS_WIDTH = 512;
            this.CANVAS_HEIGHT = 512;
            this.IMPORT_ICON_WIDTH = 32;
            this.IMPORT_ICON_HEIGHT = 32;
            delete this.TILE_HEIGHT;
            document.getElementById('addRowsBtn').disabled = false;
        }

        this.canvas.width = this.CANVAS_WIDTH;
        this.canvas.height = this.CANVAS_HEIGHT;
        this.initializeGrid();
        this.updateGridInfo();
        this.updateCanvasScaling();
        this.render();

        // Hide import preview
        document.getElementById('importPreview').classList.add('hidden');
        this.hideModeModal();
    }

    render() {
        // Clear canvas with transparent background
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const tileHeight = this.TILE_HEIGHT || this.ICON_SIZE;

        // Draw grid lines
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 1;

        for (let i = 1; i < this.COLUMNS; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.ICON_SIZE, 0);
            this.ctx.lineTo(i * this.ICON_SIZE, this.canvas.height);
            this.ctx.stroke();
        }

        for (let i = 1; i < this.ROWS; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * tileHeight);
            this.ctx.lineTo(this.canvas.width, i * tileHeight);
            this.ctx.stroke();
        }

        // Draw icons
        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLUMNS; col++) {
                if (this.iconGrid[row][col]) {
                    const key = `${row},${col}`;
                    let img = this.imageCache[key];
                    
                    // If image not cached, load it
                    if (!img) {
                        img = new Image();
                        img.onload = () => {
                            // Redraw just this tile
                            const offset = this.iconOffsets[key] || { x: 0, y: 0 };
                            this.ctx.drawImage(img, col * this.ICON_SIZE + offset.x, row * tileHeight + offset.y, this.ICON_SIZE, tileHeight);
                        };
                        img.src = this.iconGrid[row][col];
                        this.imageCache[key] = img;
                    } else if (img.complete) {
                        // Image is already loaded, draw it synchronously
                        const offset = this.iconOffsets[key] || { x: 0, y: 0 };
                        this.ctx.drawImage(img, col * this.ICON_SIZE + offset.x, row * tileHeight + offset.y, this.ICON_SIZE, tileHeight);
                    }
                }
            }
        }

        // Draw selection highlight on top (after a brief delay to ensure images have loaded)
        if (this.selectedSpace) {
            setTimeout(() => {
                const x = this.selectedSpace.col * this.ICON_SIZE;
                const y = this.selectedSpace.row * tileHeight;
                
                // Draw shadow/glow effect
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                this.ctx.shadowBlur = 8;
                this.ctx.shadowOffsetX = 2;
                this.ctx.shadowOffsetY = 2;
                
                // Draw bright border
                this.ctx.strokeStyle = '#00ff00';
                this.ctx.lineWidth = 5;
                this.ctx.strokeRect(x, y, this.ICON_SIZE, tileHeight);
                
                // Reset shadow
                this.ctx.shadowColor = 'transparent';
                this.ctx.shadowBlur = 0;
            }, 10);
        }

        this.updateCanvasScaling();
    }

    save() {
        // Prompt for filename
        const fileName = prompt('Enter file name:', 'TileSet.png');
        if (!fileName) return; // User cancelled
        
        // Create a canvas for export (transparent background)
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = this.canvas.width;
        exportCanvas.height = this.canvas.height;
        const exportCtx = exportCanvas.getContext('2d');

        const tileHeight = this.TILE_HEIGHT || this.ICON_SIZE;

        // Do NOT fill with white - keep transparent
        // exportCtx.fillStyle = '#ffffff';
        // exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

        // Draw icons only
        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLUMNS; col++) {
                if (this.iconGrid[row][col]) {
                    const img = new Image();
                    img.onload = () => {
                        const key = `${row},${col}`;
                        const offset = this.iconOffsets[key] || { x: 0, y: 0 };
                        exportCtx.drawImage(img, col * this.ICON_SIZE + offset.x, row * tileHeight + offset.y, this.ICON_SIZE, tileHeight);
                    };
                    img.src = this.iconGrid[row][col];
                }
            }
        }

        // Wait a bit for images to load, then save
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = exportCanvas.toDataURL('image/png');
            link.download = fileName;
            link.click();
        }, 500);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new IconSetEditor();
});
