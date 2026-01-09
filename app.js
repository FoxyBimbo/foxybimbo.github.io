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

        this.initializeGrid();
        this.setupEventListeners();
        this.render();
    }

    initializeGrid() {
        this.iconGrid = [];
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
        this.importCanvas.addEventListener('click', (e) => this.handleImportCanvasClick(e));
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
                // Auto-detect mode based on image width
                let detectedMode = 'iconset'; // default
                if (img.width === 768) {
                    detectedMode = 'tileset';
                } else if (img.width === 512) {
                    detectedMode = 'iconset';
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
        const maxRows = Math.ceil(sourceCanvas.height / iconSize);
        const maxCols = Math.ceil(sourceCanvas.width / iconSize);

        // Icon Set mode: always keep 16 columns, expand rows as needed
        if (this.mode === 'iconset') {
            // Expand rows if needed
            if (maxRows > this.ROWS) {
                this.ROWS = maxRows;
                this.CANVAS_SIZE = this.ROWS * this.ICON_SIZE;
                this.canvas.height = this.CANVAS_SIZE;
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
            // Tile Set mode: keep fixed at 16x16
            const sourceCtx = sourceCanvas.getContext('2d', { willReadFrequently: true });
            for (let row = 0; row < Math.min(maxRows, this.ROWS); row++) {
                for (let col = 0; col < Math.min(maxCols, this.COLUMNS); col++) {
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

        const col = Math.floor(imageX / this.ICON_SIZE);
        const row = Math.floor(imageY / this.ICON_SIZE);

        if (row >= 0 && col >= 0 && row * this.ICON_SIZE < this.importedImage.height && col * this.ICON_SIZE < this.importedImage.width) {
            const iconKey = `${row},${col}`;
            if (this.selectedImportIcons.has(iconKey)) {
                this.selectedImportIcons.delete(iconKey);
            } else {
                if (!e.ctrlKey && !e.metaKey) {
                    this.selectedImportIcons.clear();
                }
                this.selectedImportIcons.add(iconKey);
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

        const width = (maxCol - minCol + 1) * this.ICON_SIZE;
        const height = (maxRow - minRow + 1) * this.ICON_SIZE;

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
            const x = (icon.col - minCol) * this.ICON_SIZE;
            const y = (icon.row - minRow) * this.ICON_SIZE;

            // Draw from the imported image directly
            const sourceX = icon.col * this.ICON_SIZE;
            const sourceY = icon.row * this.ICON_SIZE;
            
            try {
                dragCtx.drawImage(
                    this.importedImage,
                    sourceX, sourceY, this.ICON_SIZE, this.ICON_SIZE,
                    x, y, this.ICON_SIZE, this.ICON_SIZE
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
            const x = offset.x + col * this.ICON_SIZE * offset.scale;
            const y = offset.y + row * this.ICON_SIZE * offset.scale;
            const size = this.ICON_SIZE * offset.scale;

            this.importCtx.strokeRect(x, y, size, size);
        });

        this.importCtx.setLineDash([]);
    }

    handleCanvasClick(e, canvas, ctx) {
        const rect = canvas.getBoundingClientRect();
        const scaledX = (e.clientX - rect.left) / this.mainCanvasScale;
        const scaledY = (e.clientY - rect.top) / this.mainCanvasScale;

        const col = Math.floor(scaledX / this.ICON_SIZE);
        const row = Math.floor(scaledY / this.ICON_SIZE);

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

        const targetCol = Math.floor(scaledX / this.ICON_SIZE);
        const targetRow = Math.floor(scaledY / this.ICON_SIZE);

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

        const firstIcon = this.draggedIcons[0];
        const rowOffset = targetRow - firstIcon.row;
        const colOffset = targetCol - firstIcon.col;

        this.draggedIcons.forEach(icon => {
            const newRow = icon.row + rowOffset;
            const newCol = icon.col + colOffset;

            if (newRow >= 0 && newRow < this.ROWS && newCol >= 0 && newCol < this.COLUMNS) {
                // Draw preview rectangle
                this.ctx.strokeRect(
                    newCol * this.ICON_SIZE,
                    newRow * this.ICON_SIZE,
                    this.ICON_SIZE,
                    this.ICON_SIZE
                );

                // Draw the icon preview
                const sourceX = icon.col * this.ICON_SIZE;
                const sourceY = icon.row * this.ICON_SIZE;
                this.ctx.drawImage(
                    this.importedImage,
                    sourceX, sourceY, this.ICON_SIZE, this.ICON_SIZE,
                    newCol * this.ICON_SIZE, newRow * this.ICON_SIZE, this.ICON_SIZE, this.ICON_SIZE
                );
            }
        });

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
                this.iconGrid[this.selectedSpace.row][this.selectedSpace.col] = this.copiedIcon;
                // Clear offset for pasted icon
                const key = `${this.selectedSpace.row},${this.selectedSpace.col}`;
                delete this.iconOffsets[key];
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

        const targetCol = Math.floor(scaledX / this.ICON_SIZE);
        const targetRow = Math.floor(scaledY / this.ICON_SIZE);

        console.log('Drop event - draggedIcons:', this.draggedIcons, 'targetRow:', targetRow, 'targetCol:', targetCol);

        // Copy all dragged icons, positioning them relative to the first one
        if (this.draggedIcons.length > 0) {
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

            this.render();
        }

        this.draggedIcons = [];
    }

    copyIconFromImport(sourceRow, sourceCol, targetRow, targetCol) {
        const x = sourceCol * this.ICON_SIZE;
        const y = sourceRow * this.ICON_SIZE;

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.ICON_SIZE;
        tempCanvas.height = this.ICON_SIZE;
        const tempCtx = tempCanvas.getContext('2d');

        const offset = this.importImageOffset || { x: 0, y: 0, scale: 1 };
        tempCtx.drawImage(
            this.importedImage,
            x, y, this.ICON_SIZE, this.ICON_SIZE,
            0, 0, this.ICON_SIZE, this.ICON_SIZE
        );
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
        const modeLabel = this.mode === 'tileset' ? 'Tile Set' : 'Icon Set';
        document.getElementById('gridInfo').textContent = `${modeLabel} | Columns: ${this.COLUMNS} | Rows: ${this.ROWS} | Size: ${this.CANVAS_SIZE}x${this.CANVAS_SIZE}`;
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
                // Tile Set: maintain square aspect ratio for both
                this.mainCanvasScale = Math.min(1, canvasWidth / this.canvas.width);
                const mainScaledSize = this.canvas.width * this.mainCanvasScale;
                this.canvas.style.width = mainScaledSize + 'px';
                this.canvas.style.height = mainScaledSize + 'px';
                
                // Import canvas scaling - based on width only, maintain aspect ratio (1:1 square)
                const importScale = Math.min(1, canvasWidth / this.importCanvas.width);
                this.importCanvasScale = importScale;
                const importScaledSize = Math.min(this.importCanvas.width, this.importCanvas.height) * importScale;
                this.importCanvas.style.width = importScaledSize + 'px';
                this.importCanvas.style.height = importScaledSize + 'px';
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
                // Tile Set: maintain square aspect ratio
                this.mainCanvasScale = Math.min(1, availableWidth / this.canvas.width);
                const mainScaledSize = this.canvas.width * this.mainCanvasScale;
                this.canvas.style.width = mainScaledSize + 'px';
                this.canvas.style.height = mainScaledSize + 'px';
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
            document.getElementById('addRowsBtn').disabled = true;
        } else {
            this.ICON_SIZE = 32;
            this.ROWS = 16;
            this.COLUMNS = 16;
            this.CANVAS_SIZE = 512;
            document.getElementById('addRowsBtn').disabled = false;
        }

        this.canvas.width = this.CANVAS_SIZE;
        this.canvas.height = this.CANVAS_SIZE;
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
            this.ctx.moveTo(0, i * this.ICON_SIZE);
            this.ctx.lineTo(this.canvas.width, i * this.ICON_SIZE);
            this.ctx.stroke();
        }

        // Draw icons
        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLUMNS; col++) {
                if (this.iconGrid[row][col]) {
                    const img = new Image();
                    img.onload = () => {
                        const key = `${row},${col}`;
                        const offset = this.iconOffsets[key] || { x: 0, y: 0 };
                        this.ctx.drawImage(img, col * this.ICON_SIZE + offset.x, row * this.ICON_SIZE + offset.y, this.ICON_SIZE, this.ICON_SIZE);
                    };
                    img.src = this.iconGrid[row][col];
                }
            }
        }

        // Draw selection highlight if a space is selected
        if (this.selectedSpace) {
            this.ctx.strokeStyle = '#ff6b6b';
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(
                this.selectedSpace.col * this.ICON_SIZE,
                this.selectedSpace.row * this.ICON_SIZE,
                this.ICON_SIZE,
                this.ICON_SIZE
            );
        }

        this.updateCanvasScaling();
    }

    save() {
        // Create a canvas for export (transparent background)
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = this.canvas.width;
        exportCanvas.height = this.canvas.height;
        const exportCtx = exportCanvas.getContext('2d');

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
                        exportCtx.drawImage(img, col * this.ICON_SIZE + offset.x, row * this.ICON_SIZE + offset.y, this.ICON_SIZE, this.ICON_SIZE);
                    };
                    img.src = this.iconGrid[row][col];
                }
            }
        }

        // Wait a bit for images to load, then save
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = exportCanvas.toDataURL('image/png');
            link.download = 'IconSet.png';
            link.click();
        }, 500);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new IconSetEditor();
});
