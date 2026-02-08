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
        this.originalImages = {}; // Store original images before adjustments: "row,col" -> dataURL
        this.tileAdjustments = {}; // Track RGB adjustments per tile: "row,col" -> { r, g, b }
        
        // Import canvas mouse tracking
        this.importCanvasMouseDownSpace = null; // Track which space was clicked on mouse down

        // Uploaded image file name
        this.uploadedFileName = null;

        // Source image data (stored so we can reparse on settings change)
        this.sourceImageDataURL = null;

        // Color adjustment settings
        this.selectedTileColor = null; // { r, g, b } - selected color for adjustments
        this.colorTolerance = 5; // tolerance for color matching
        this.colorAlpha = 1.0; // alpha transparency for color adjustments (0-1)
        this.colorDropperMode = false; // is color dropper active
        this.selectedTileForColor = null; // { row, col } - which tile to adjust
        this.currentAdjustments = { r: 0, g: 0, b: 0 }; // Current slider values for selected tile

        // Pixel selection
        this.selectedPixels = new Set(); // Set of "x,y" strings for selected pixels
        this.pixelSelectMode = false; // Whether we're in pixel selection mode
        this.pixelSelectDragging = false; // Track mouse drag for painting selection
        this.pixelSelectErasing = false; // True if drag started on an already-selected pixel (erase mode)

        this.initializeGrid();
        this.setupEventListeners();
        this.render();
    }

    initializeGrid() {
        this.iconGrid = [];
        this.imageCache = {}; // Clear image cache when grid is reset
        this.originalImages = {}; // Clear original images
        this.tileAdjustments = {}; // Clear tile adjustments
        this.currentAdjustments = { r: 0, g: 0, b: 0 }; // Reset current adjustments
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
        this.importCanvas.addEventListener('dragend', (e) => this.handleDragEnd(e));
        this.importCanvas.draggable = true;
        
        // Window resize to update canvas scaling
        window.addEventListener('resize', () => this.updateCanvasScaling());

        // Settings panel toggle
        document.getElementById('toggleSettingsBtn').addEventListener('click', () => this.toggleSettingsPanel());

        // Color adjustment sliders
        document.getElementById('redSlider').addEventListener('input', (e) => this.handleColorAdjustment('red', e));
        document.getElementById('greenSlider').addEventListener('input', (e) => this.handleColorAdjustment('green', e));
        document.getElementById('blueSlider').addEventListener('input', (e) => this.handleColorAdjustment('blue', e));

        // Tolerance slider
        document.getElementById('toleranceSlider').addEventListener('input', (e) => this.handleToleranceChange(e));

        // Alpha slider
        document.getElementById('alphaSlider').addEventListener('input', (e) => this.handleAlphaChange(e));

        // Color dropper button
        document.getElementById('colorDropperBtn').addEventListener('click', () => this.openColorDropper());

        // Clear color button
        document.getElementById('clearColorBtn').addEventListener('click', () => this.clearSelectedColor());

        // Save recoloring button
        document.getElementById('saveRecoloringBtn').addEventListener('click', () => this.saveRecoloring());

        // Color picker modal
        const tilePreviewCanvas = document.getElementById('tilePreviewCanvas');
        tilePreviewCanvas.addEventListener('click', (e) => this.handleColorPick(e));
        document.getElementById('cancelColorPickerBtn').addEventListener('click', () => this.closeColorDropper());

        // Pixel selection buttons
        document.getElementById('pixelSelectBtn').addEventListener('click', () => this.openPixelSelector());
        document.getElementById('clearPixelSelectBtn').addEventListener('click', () => this.clearPixelSelection());
        document.getElementById('confirmPixelSelectBtn').addEventListener('click', () => this.confirmPixelSelection());
        document.getElementById('cancelPixelSelectBtn').addEventListener('click', () => this.closePixelSelector());
        document.getElementById('pixelSelectAllBtn').addEventListener('click', () => this.pixelSelectAll());
        document.getElementById('pixelInvertBtn').addEventListener('click', () => this.pixelInvertSelection());
        document.getElementById('pixelDeselectAllBtn').addEventListener('click', () => this.pixelDeselectAll());

        // Pixel select canvas interactions
        const pixelSelectCanvas = document.getElementById('pixelSelectCanvas');
        pixelSelectCanvas.addEventListener('mousedown', (e) => this.handlePixelSelectMouseDown(e));
        pixelSelectCanvas.addEventListener('mousemove', (e) => this.handlePixelSelectMouseMove(e));
        pixelSelectCanvas.addEventListener('mouseup', () => this.handlePixelSelectMouseUp());
        pixelSelectCanvas.addEventListener('mouseleave', () => this.handlePixelSelectMouseUp());

        // Grid settings panel
        document.getElementById('toggleGridSettingsBtn').addEventListener('click', () => this.toggleGridSettingsPanel());
        document.getElementById('gridModeSelect').addEventListener('change', (e) => this.handleGridModeChange(e));
        document.getElementById('tileWidthInput').addEventListener('input', () => this.updateGridSettingsInfo());
        document.getElementById('tileHeightInput').addEventListener('input', () => this.updateGridSettingsInfo());
        document.getElementById('gridColumnsInput').addEventListener('input', () => this.updateGridSettingsInfo());
        document.getElementById('gridRowsInput').addEventListener('input', () => this.updateGridSettingsInfo());
        document.getElementById('applyGridSettingsBtn').addEventListener('click', () => this.applyGridSettings());
    }

    toggleSettingsPanel() {
        const settingsContent = document.getElementById('settingsContent');
        const toggleBtn = document.getElementById('toggleSettingsBtn');
        settingsContent.classList.toggle('hidden');
        toggleBtn.classList.toggle('collapsed');
    }

    toggleGridSettingsPanel() {
        const content = document.getElementById('gridSettingsContent');
        const toggleBtn = document.getElementById('toggleGridSettingsBtn');
        content.classList.toggle('hidden');
        toggleBtn.classList.toggle('collapsed');
        // Sync current state when opening
        if (!content.classList.contains('hidden')) {
            this.syncGridSettingsUI();
        }
    }

    syncGridSettingsUI() {
        const modeSelect = document.getElementById('gridModeSelect');
        const tileW = document.getElementById('tileWidthInput');
        const tileH = document.getElementById('tileHeightInput');
        const cols = document.getElementById('gridColumnsInput');
        const rows = document.getElementById('gridRowsInput');

        modeSelect.value = this.mode;
        tileW.value = this.ICON_SIZE;
        tileH.value = this.TILE_HEIGHT || this.ICON_SIZE;
        cols.value = this.COLUMNS;
        rows.value = this.ROWS;

        const isCustom = !['iconset', 'tileset', 'smallitems', 'tallitems', 'bigitems'].includes(this.mode);
        const editable = isCustom;
        tileW.disabled = !editable;
        tileH.disabled = !editable;
        cols.disabled = !editable;
        rows.disabled = !editable;

        this.updateGridSettingsInfo();
    }

    handleGridModeChange(e) {
        const mode = e.target.value;
        const tileW = document.getElementById('tileWidthInput');
        const tileH = document.getElementById('tileHeightInput');
        const cols = document.getElementById('gridColumnsInput');
        const rows = document.getElementById('gridRowsInput');

        const presets = {
            iconset:    { tw: 32, th: 32, c: 16, r: 16 },
            tileset:    { tw: 48, th: 48, c: 16, r: 16 },
            smallitems: { tw: 48, th: 48, c: 3,  r: 4  },
            tallitems:  { tw: 48, th: 96, c: 3,  r: 4  },
            bigitems:   { tw: 96, th: 96, c: 3,  r: 4  },
        };

        if (presets[mode]) {
            const p = presets[mode];
            tileW.value = p.tw;
            tileH.value = p.th;
            cols.value = p.c;
            rows.value = p.r;
            tileW.disabled = true;
            tileH.disabled = true;
            cols.disabled = true;
            rows.disabled = true;
        } else {
            // Custom - enable all fields
            tileW.disabled = false;
            tileH.disabled = false;
            cols.disabled = false;
            rows.disabled = false;
        }

        this.updateGridSettingsInfo();
    }

    updateGridSettingsInfo() {
        const tw = parseInt(document.getElementById('tileWidthInput').value) || 0;
        const th = parseInt(document.getElementById('tileHeightInput').value) || 0;
        const c = parseInt(document.getElementById('gridColumnsInput').value) || 0;
        const r = parseInt(document.getElementById('gridRowsInput').value) || 0;
        const canvasW = tw * c;
        const canvasH = th * r;
        document.getElementById('gridSettingsInfo').textContent = `Canvas: ${canvasW}×${canvasH} px`;
    }

    applyGridSettings() {
        const modeSelect = document.getElementById('gridModeSelect').value;
        const tw = parseInt(document.getElementById('tileWidthInput').value);
        const th = parseInt(document.getElementById('tileHeightInput').value);
        const c = parseInt(document.getElementById('gridColumnsInput').value);
        const r = parseInt(document.getElementById('gridRowsInput').value);

        if (!tw || !th || !c || !r || tw < 8 || th < 8 || c < 1 || r < 1) {
            alert('Please enter valid values. Tile size must be at least 8px, grid at least 1×1.');
            return;
        }

        // Capture the current canvas as source before changing settings (if no source stored yet)
        const hasContent = this.iconGrid.length > 0 && this.iconGrid.some(row => row.some(cell => cell !== null));
        if (hasContent && !this.sourceImageDataURL) {
            // Build a composite image from the current grid
            this.sourceImageDataURL = this._captureCurrentCanvas();
        }

        const applyNewSettings = () => {
            if (modeSelect !== 'custom') {
                // Apply preset mode settings without the confirm dialog
                this._applyModeSettings(modeSelect);
            } else {
                // Custom mode
                this.mode = 'custom';
                this.selectedImportIcons.clear();

                this.ICON_SIZE = tw;
                if (th !== tw) {
                    this.TILE_HEIGHT = th;
                } else {
                    delete this.TILE_HEIGHT;
                }
                this.COLUMNS = c;
                this.ROWS = r;
                this.CANVAS_WIDTH = tw * c;
                this.CANVAS_HEIGHT = th * r;
                this.CANVAS_SIZE = Math.max(this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

                this.IMPORT_ICON_WIDTH = tw;
                this.IMPORT_ICON_HEIGHT = th;

                this.canvas.width = this.CANVAS_WIDTH;
                this.canvas.height = this.CANVAS_HEIGHT;

                document.getElementById('addRowsBtn').disabled = false;
            }

            // Reset grid and caches
            this.iconOffsets = {};
            this.initializeGrid();

            // If we have a source image, reparse it with the new settings
            if (this.sourceImageDataURL) {
                const img = new Image();
                img.onload = () => {
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = img.width;
                    tempCanvas.height = img.height;
                    const tempCtx = tempCanvas.getContext('2d');
                    tempCtx.drawImage(img, 0, 0);
                    this.parseImageToGrid(tempCanvas);
                    this.updateGridInfo();
                    this.updateCanvasScaling();
                    this.render();
                };
                img.src = this.sourceImageDataURL;
            } else {
                this.updateGridInfo();
                this.updateCanvasScaling();
                this.render();
            }

            // Hide import preview
            document.getElementById('importPreview').classList.add('hidden');

            // Re-sync the UI to reflect applied values
            this.syncGridSettingsUI();
        };

        applyNewSettings();
    }

    // Capture the current canvas content as a data URL
    _captureCurrentCanvas() {
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = this.canvas.width;
        exportCanvas.height = this.canvas.height;
        const exportCtx = exportCanvas.getContext('2d');
        const tileHeight = this.TILE_HEIGHT || this.ICON_SIZE;

        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLUMNS; col++) {
                if (this.iconGrid[row][col]) {
                    const key = `${row},${col}`;
                    const img = this.imageCache[key];
                    if (img && img.complete) {
                        const offset = this.iconOffsets[key] || { x: 0, y: 0 };
                        exportCtx.drawImage(img, col * this.ICON_SIZE + offset.x, row * tileHeight + offset.y, this.ICON_SIZE, tileHeight);
                    }
                }
            }
        }
        return exportCanvas.toDataURL('image/png');
    }

    // Apply mode settings without confirmation dialog (used by applyGridSettings)
    _applyModeSettings(mode) {
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
            this.IMPORT_ICON_WIDTH = 48;
            this.IMPORT_ICON_HEIGHT = 48;
            document.getElementById('addRowsBtn').disabled = true;
        } else if (mode === 'bigitems') {
            this.ICON_SIZE = 96;
            this.ROWS = 4;
            this.COLUMNS = 3;
            this.CANVAS_WIDTH = 288;
            this.CANVAS_HEIGHT = 384;
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
    }

    handleToleranceChange(e) {
        const value = parseInt(e.target.value);
        this.colorTolerance = value;
        document.getElementById('toleranceValue').textContent = value;
        
        // Repaint the tile with new tolerance
        if (this.selectedSpace) {
            const redValue = parseInt(document.getElementById('redSlider').value);
            const greenValue = parseInt(document.getElementById('greenSlider').value);
            const blueValue = parseInt(document.getElementById('blueSlider').value);
            this.applyColorAdjustment(redValue, greenValue, blueValue);
        }
    }

    handleAlphaChange(e) {
        const value = parseInt(e.target.value);
        this.colorAlpha = value / 100; // Convert to 0-1 range
        document.getElementById('alphaValue').textContent = value + '%';
        
        // Repaint the tile with new alpha
        if (this.selectedSpace) {
            const redValue = parseInt(document.getElementById('redSlider').value);
            const greenValue = parseInt(document.getElementById('greenSlider').value);
            const blueValue = parseInt(document.getElementById('blueSlider').value);
            this.applyColorAdjustment(redValue, greenValue, blueValue);
        }
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

        // Extract the file name (without extension for use as base name)
        const lastDotIndex = file.name.lastIndexOf('.');
        const fileName = lastDotIndex > -1 ? file.name.substring(0, lastDotIndex) : file.name;

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

                // Restore the uploaded file name after mode switch (in case createNewDocument cleared it)
                this.uploadedFileName = fileName;

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
                this.sourceImageDataURL = tempCanvas.toDataURL('image/png');
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

                // Set the import canvas to match the image's aspect ratio
                const aspectRatio = img.width / img.height;
                const canvasHeight = 512; // Keep height fixed
                const canvasWidth = Math.floor(canvasHeight * aspectRatio);
                
                this.importCanvas.width = canvasWidth;
                this.importCanvas.height = canvasHeight;

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
        // Calculate scaling from bounding rect and actual canvas dimensions
        const scaleX = this.importCanvas.width / rect.width;
        const scaleY = this.importCanvas.height / rect.height;
        const scaledX = (e.clientX - rect.left) * scaleX;
        const scaledY = (e.clientY - rect.top) * scaleY;

        const offset = this.importImageOffset || { x: 0, y: 0, scale: 1 };
        const imageX = (scaledX - offset.x) / offset.scale;
        const imageY = (scaledY - offset.y) / offset.scale;

        const col = Math.floor(imageX / this.IMPORT_ICON_WIDTH);
        const row = Math.floor(imageY / this.IMPORT_ICON_HEIGHT);

        // Use imported image's dimensions for bounds check
        const maxRows = Math.floor(this.importedImage.height / this.IMPORT_ICON_HEIGHT);
        const maxCols = Math.floor(this.importedImage.width / this.IMPORT_ICON_WIDTH);
        if (
            row >= 0 && col >= 0 &&
            row < maxRows && col < maxCols
        ) {
            this.importCanvasMouseDownSpace = { row, col };
        } else {
            this.importCanvasMouseDownSpace = null;
        }
    }

    handleImportCanvasMouseUp(e) {
        if (!this.importedImage || !this.importCanvasMouseDownSpace) return;
        
        const rect = this.importCanvas.getBoundingClientRect();
        // Calculate scaling from bounding rect and actual canvas dimensions
        const scaleX = this.importCanvas.width / rect.width;
        const scaleY = this.importCanvas.height / rect.height;
        const scaledX = (e.clientX - rect.left) * scaleX;
        const scaledY = (e.clientY - rect.top) * scaleY;

        const offset = this.importImageOffset || { x: 0, y: 0, scale: 1 };
        const imageX = (scaledX - offset.x) / offset.scale;
        const imageY = (scaledY - offset.y) / offset.scale;

        const col = Math.floor(imageX / this.IMPORT_ICON_WIDTH);
        const row = Math.floor(imageY / this.IMPORT_ICON_HEIGHT);

        // Use imported image's dimensions for bounds check
        const maxRows = Math.floor(this.importedImage.height / this.IMPORT_ICON_HEIGHT);
        const maxCols = Math.floor(this.importedImage.width / this.IMPORT_ICON_WIDTH);
        // Only toggle selection if mouse up is over the same space as mouse down and within bounds
        if (
            row >= 0 && col >= 0 &&
            row < maxRows && col < maxCols &&
            row === this.importCanvasMouseDownSpace.row && col === this.importCanvasMouseDownSpace.col
        ) {
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
                    if (row + 1 < maxRows) {
                        this.selectedImportIcons.add(belowKey);
                    }
                } else if (this.mode === 'bigitems') {
                    // Select 4 tiles forming a square: current, right, below, and diagonal
                    const rightKey = `${row},${col + 1}`;
                    const belowKey = `${row + 1},${col}`;
                    const diagonalKey = `${row + 1},${col + 1}`;
                    if (col + 1 < maxCols) this.selectedImportIcons.add(rightKey);
                    if (row + 1 < maxRows) this.selectedImportIcons.add(belowKey);
                    if (row + 1 < maxRows && col + 1 < maxCols) this.selectedImportIcons.add(diagonalKey);
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
        // Calculate scaling from bounding rect and actual canvas dimensions
        const scaleX = this.importCanvas.width / rect.width;
        const scaleY = this.importCanvas.height / rect.height;
        const scaledX = (e.clientX - rect.left) * scaleX;
        const scaledY = (e.clientY - rect.top) * scaleY;

        const offset = this.importImageOffset || { x: 0, y: 0, scale: 1 };
        const imageX = (scaledX - offset.x) / offset.scale;
        const imageY = (scaledY - offset.y) / offset.scale;

        const col = Math.floor(imageX / this.IMPORT_ICON_WIDTH);
        const row = Math.floor(imageY / this.IMPORT_ICON_HEIGHT);

        // Use imported image's dimensions for bounds check
        const maxRows = Math.floor(this.importedImage.height / this.IMPORT_ICON_HEIGHT);
        const maxCols = Math.floor(this.importedImage.width / this.IMPORT_ICON_WIDTH);
        if (
            row >= 0 && col >= 0 &&
            row < maxRows && col < maxCols
        ) {
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
                    if (row + 1 < maxRows) {
                        this.selectedImportIcons.add(belowKey);
                    }
                } else if (this.mode === 'bigitems') {
                    // Select 4 tiles forming a square: current, right, below, and diagonal
                    const rightKey = `${row},${col + 1}`;
                    const belowKey = `${row + 1},${col}`;
                    const diagonalKey = `${row + 1},${col + 1}`;
                    if (col + 1 < maxCols) this.selectedImportIcons.add(rightKey);
                    if (row + 1 < maxRows) this.selectedImportIcons.add(belowKey);
                    if (row + 1 < maxRows && col + 1 < maxCols) this.selectedImportIcons.add(diagonalKey);
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

    handleDragEnd(e) {
        // Clear drag state when drag operation ends (whether successful or not)
        this.draggedIcons = [];
        this.dragPreviewActive = false;
        this.canvasBackup = null;
        this.canvas.classList.remove('drag-over');
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
            
            // Clear pixel selection when switching tiles
            this.selectedPixels.clear();
            this.updatePixelSelectInfo();

            // Reset color selection and sliders for new tile
            this.selectedTileColor = null;
            this.currentAdjustments = { r: 0, g: 0, b: 0 };
            
            // Check if this tile has saved adjustments
            const tileKey = `${row},${col}`;
            if (this.tileAdjustments[tileKey]) {
                this.currentAdjustments = { ...this.tileAdjustments[tileKey] };
            }
            
            // Update sliders to match saved adjustments
            document.getElementById('redSlider').value = this.currentAdjustments.r;
            document.getElementById('greenSlider').value = this.currentAdjustments.g;
            document.getElementById('blueSlider').value = this.currentAdjustments.b;
            document.getElementById('redValue').textContent = this.currentAdjustments.r;
            document.getElementById('greenValue').textContent = this.currentAdjustments.g;
            document.getElementById('blueValue').textContent = this.currentAdjustments.b;
            
            // Reset alpha slider
            document.getElementById('alphaSlider').value = 100;
            document.getElementById('alphaValue').textContent = '100%';
            this.colorAlpha = 1.0;
            
            document.getElementById('selectedColorInfo').textContent = 'No color selected - adjusting whole image';
            
            // Enable sliders
            document.getElementById('redSlider').disabled = false;
            document.getElementById('greenSlider').disabled = false;
            document.getElementById('blueSlider').disabled = false;
            
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
            // Move selected icon (or selected pixels) by one pixel
            e.preventDefault();
            if (this.selectedSpace && this.iconGrid[this.selectedSpace.row][this.selectedSpace.col]) {
                if (this.selectedPixels.size > 0) {
                    // Move only the selected pixels within the tile
                    this._moveSelectedPixels(e.key);
                } else {
                    // Move the whole tile
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
    }

    _moveSelectedPixels(direction) {
        const row = this.selectedSpace.row;
        const col = this.selectedSpace.col;
        const tileKey = `${row},${col}`;
        const tileDataURL = this.iconGrid[row][col];
        if (!tileDataURL) return;

        const img = new Image();
        img.onload = () => {
            const tileWidth = img.width;
            const tileHeight = img.height;

            // Read original pixel data
            const srcCanvas = document.createElement('canvas');
            srcCanvas.width = tileWidth;
            srcCanvas.height = tileHeight;
            const srcCtx = srcCanvas.getContext('2d');
            srcCtx.drawImage(img, 0, 0);
            const srcData = srcCtx.getImageData(0, 0, tileWidth, tileHeight);

            // Create destination canvas (start transparent)
            const dstCanvas = document.createElement('canvas');
            dstCanvas.width = tileWidth;
            dstCanvas.height = tileHeight;
            const dstCtx = dstCanvas.getContext('2d');
            const dstData = dstCtx.createImageData(tileWidth, tileHeight);

            // Copy non-selected pixels as-is
            for (let y = 0; y < tileHeight; y++) {
                for (let x = 0; x < tileWidth; x++) {
                    if (!this.selectedPixels.has(`${x},${y}`)) {
                        const i = (y * tileWidth + x) * 4;
                        dstData.data[i] = srcData.data[i];
                        dstData.data[i + 1] = srcData.data[i + 1];
                        dstData.data[i + 2] = srcData.data[i + 2];
                        dstData.data[i + 3] = srcData.data[i + 3];
                    }
                }
            }

            // Determine offset
            let dx = 0, dy = 0;
            switch (direction) {
                case 'ArrowUp': dy = -1; break;
                case 'ArrowDown': dy = 1; break;
                case 'ArrowLeft': dx = -1; break;
                case 'ArrowRight': dx = 1; break;
            }

            // Move selected pixels to new positions
            const newSelection = new Set();
            for (const key of this.selectedPixels) {
                const [px, py] = key.split(',').map(Number);
                const nx = px + dx;
                const ny = py + dy;
                // Only copy if new position is within bounds
                if (nx >= 0 && nx < tileWidth && ny >= 0 && ny < tileHeight) {
                    const srcI = (py * tileWidth + px) * 4;
                    const dstI = (ny * tileWidth + nx) * 4;
                    dstData.data[dstI] = srcData.data[srcI];
                    dstData.data[dstI + 1] = srcData.data[srcI + 1];
                    dstData.data[dstI + 2] = srcData.data[srcI + 2];
                    dstData.data[dstI + 3] = srcData.data[srcI + 3];
                    newSelection.add(`${nx},${ny}`);
                }
            }

            // Update the selection to match moved positions
            this.selectedPixels = newSelection;
            this.updatePixelSelectInfo();

            dstCtx.putImageData(dstData, 0, 0);
            this.iconGrid[row][col] = dstCanvas.toDataURL('image/png');
            delete this.imageCache[tileKey];

            // Also update original image so color adjustments reference the new state
            this.originalImages[tileKey] = this.iconGrid[row][col];

            this.render();
        };
        img.src = tileDataURL;
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
        else if (this.mode === 'custom') modeLabel = 'Custom';
        else modeLabel = 'Icon Set';
        
        const width = this.CANVAS_WIDTH || this.CANVAS_SIZE;
        const height = this.CANVAS_HEIGHT || this.CANVAS_SIZE;
        document.getElementById('gridInfo').textContent = `${modeLabel} | Columns: ${this.COLUMNS} | Rows: ${this.ROWS} | Size: ${width}x${height}`;
    }

    updateCanvasScaling() {
        // Calculate scaling to fit canvases comfortably on screen width-wise only
        const canvasArea = document.querySelector('.canvas-area');
        const availableWidth = canvasArea.clientWidth - 60; // padding
        const availableHeight = canvasArea.clientHeight ? canvasArea.clientHeight - 60 : window.innerHeight - 60;

        const hasImport = !document.getElementById('importPreview').classList.contains('hidden');

        // Helper to get imported image's natural size
        const getImportNaturalSize = () => {
            if (this.importedImage) {
                return { width: this.importedImage.width, height: this.importedImage.height };
            }
            return { width: this.importCanvas.width, height: this.importCanvas.height };
        };

        if (hasImport && this.importedImage) {
            // Both canvases visible - split available width
            const canvasWidth = availableWidth / 2 - 15; // gap

            // Main canvas scaling (unchanged)
            this.mainCanvasScale = Math.min(1, canvasWidth / this.canvas.width);
            const activeScaledWidth = this.canvas.width * this.mainCanvasScale;
            const activeScaledHeight = this.canvas.height * this.mainCanvasScale;
            this.canvas.style.width = activeScaledWidth + 'px';
            this.canvas.style.height = activeScaledHeight + 'px';

            // Import canvas scaling: never scale larger than imported image's natural size
            const { width: importNaturalWidth, height: importNaturalHeight } = getImportNaturalSize();
            // Fit to available width, but never upscale beyond image's natural size
            const importScale = Math.min(1, canvasWidth / importNaturalWidth);
            this.importCanvasScale = importScale;
            const importScaledWidth = importNaturalWidth * importScale;
            const importScaledHeight = importNaturalHeight * importScale;
            this.importCanvas.style.width = importScaledWidth + 'px';
            this.importCanvas.style.height = importScaledHeight + 'px';
        } else {
            // Only main canvas - scale based on width only
            this.mainCanvasScale = Math.min(1, availableWidth / this.canvas.width);
            const scaledWidth = this.canvas.width * this.mainCanvasScale;
            const scaledHeight = this.canvas.height * this.mainCanvasScale;
            this.canvas.style.width = scaledWidth + 'px';
            this.canvas.style.height = scaledHeight + 'px';

            // Import canvas scaling (if visible): never scale larger than imported image's natural size
            if (this.importedImage) {
                const { width: importNaturalWidth, height: importNaturalHeight } = getImportNaturalSize();
                const importScale = Math.min(1, availableWidth / importNaturalWidth);
                this.importCanvasScale = importScale;
                const importScaledWidth = importNaturalWidth * importScale;
                const importScaledHeight = importNaturalHeight * importScale;
                this.importCanvas.style.width = importScaledWidth + 'px';
                this.importCanvas.style.height = importScaledHeight + 'px';
            }
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
        this.uploadedFileName = null; // Clear uploaded file name when creating new document\n        this.sourceImageDataURL = null; // Clear source image when creating new document

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

        // Sync grid settings UI if panel is open
        if (document.getElementById('gridSettingsContent') && !document.getElementById('gridSettingsContent').classList.contains('hidden')) {
            this.syncGridSettingsUI();
        }
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

    // ---- Pixel Selection Methods ----

    openPixelSelector() {
        if (!this.selectedSpace) {
            alert('Please select a tile first');
            return;
        }

        const tileDataURL = this.iconGrid[this.selectedSpace.row][this.selectedSpace.col];
        if (!tileDataURL) {
            alert('Selected tile is empty');
            return;
        }

        this.pixelSelectMode = true;
        // Keep a temporary copy of the selection to allow cancel
        this._tempPixelSelection = new Set(this.selectedPixels);

        const img = new Image();
        img.onload = () => {
            const psCanvas = document.getElementById('pixelSelectCanvas');
            // Scale up so each pixel is clearly visible
            const pixelScale = Math.max(8, Math.floor(400 / Math.max(img.width, img.height)));
            psCanvas.width = img.width * pixelScale;
            psCanvas.height = img.height * pixelScale;
            psCanvas.style.width = psCanvas.width + 'px';
            psCanvas.style.height = psCanvas.height + 'px';
            psCanvas.dataset.pixelScale = pixelScale;
            psCanvas.dataset.tileWidth = img.width;
            psCanvas.dataset.tileHeight = img.height;

            this._pixelSelectSourceImage = img;
            this.renderPixelSelectCanvas();
            this.updatePixelSelectStatus();

            document.getElementById('pixelSelectModal').classList.remove('hidden');
        };
        img.src = tileDataURL;
    }

    closePixelSelector() {
        document.getElementById('pixelSelectModal').classList.add('hidden');
        this.pixelSelectMode = false;
        // Restore previous selection on cancel
        if (this._tempPixelSelection) {
            this.selectedPixels = this._tempPixelSelection;
            this._tempPixelSelection = null;
        }
        this.updatePixelSelectInfo();
    }

    confirmPixelSelection() {
        document.getElementById('pixelSelectModal').classList.add('hidden');
        this.pixelSelectMode = false;
        this._tempPixelSelection = null;
        this.updatePixelSelectInfo();
    }

    clearPixelSelection() {
        this.selectedPixels.clear();
        this.updatePixelSelectInfo();
    }

    updatePixelSelectInfo() {
        const count = this.selectedPixels.size;
        document.getElementById('pixelSelectInfo').textContent = count > 0
            ? `${count} pixel${count !== 1 ? 's' : ''} selected`
            : 'No pixels selected';
    }

    updatePixelSelectStatus() {
        document.getElementById('pixelSelectStatus').textContent = `${this.selectedPixels.size} pixels selected`;
    }

    renderPixelSelectCanvas() {
        const psCanvas = document.getElementById('pixelSelectCanvas');
        const ctx = psCanvas.getContext('2d');
        const scale = parseInt(psCanvas.dataset.pixelScale);
        const tw = parseInt(psCanvas.dataset.tileWidth);
        const th = parseInt(psCanvas.dataset.tileHeight);
        const img = this._pixelSelectSourceImage;

        ctx.clearRect(0, 0, psCanvas.width, psCanvas.height);

        // Draw checkerboard background for transparency
        for (let y = 0; y < th; y++) {
            for (let x = 0; x < tw; x++) {
                const dark = (x + y) % 2 === 0;
                ctx.fillStyle = dark ? '#ccc' : '#fff';
                ctx.fillRect(x * scale, y * scale, scale, scale);
            }
        }

        // Draw the tile image scaled up
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, tw * scale, th * scale);

        // Draw selection overlay
        for (const key of this.selectedPixels) {
            const [px, py] = key.split(',').map(Number);
            ctx.fillStyle = 'rgba(0, 150, 255, 0.35)';
            ctx.fillRect(px * scale, py * scale, scale, scale);
            ctx.strokeStyle = 'rgba(0, 150, 255, 0.8)';
            ctx.lineWidth = 1;
            ctx.strokeRect(px * scale + 0.5, py * scale + 0.5, scale - 1, scale - 1);
        }

        // Draw grid lines
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 0.5;
        for (let x = 0; x <= tw; x++) {
            ctx.beginPath();
            ctx.moveTo(x * scale, 0);
            ctx.lineTo(x * scale, th * scale);
            ctx.stroke();
        }
        for (let y = 0; y <= th; y++) {
            ctx.beginPath();
            ctx.moveTo(0, y * scale);
            ctx.lineTo(tw * scale, y * scale);
            ctx.stroke();
        }
    }

    _getPixelFromEvent(e) {
        const psCanvas = document.getElementById('pixelSelectCanvas');
        const rect = psCanvas.getBoundingClientRect();
        const scale = parseInt(psCanvas.dataset.pixelScale);
        const tw = parseInt(psCanvas.dataset.tileWidth);
        const th = parseInt(psCanvas.dataset.tileHeight);

        const cx = (e.clientX - rect.left) * (psCanvas.width / rect.width);
        const cy = (e.clientY - rect.top) * (psCanvas.height / rect.height);
        const px = Math.floor(cx / scale);
        const py = Math.floor(cy / scale);

        if (px >= 0 && px < tw && py >= 0 && py < th) {
            return { px, py };
        }
        return null;
    }

    handlePixelSelectMouseDown(e) {
        e.preventDefault();
        const pixel = this._getPixelFromEvent(e);
        if (!pixel) return;

        this.pixelSelectDragging = true;
        const key = `${pixel.px},${pixel.py}`;
        // If clicking on an already-selected pixel, start erasing
        this.pixelSelectErasing = this.selectedPixels.has(key);

        if (this.pixelSelectErasing) {
            this.selectedPixels.delete(key);
        } else {
            this.selectedPixels.add(key);
        }
        this.renderPixelSelectCanvas();
        this.updatePixelSelectStatus();
    }

    handlePixelSelectMouseMove(e) {
        if (!this.pixelSelectDragging) return;
        const pixel = this._getPixelFromEvent(e);
        if (!pixel) return;

        const key = `${pixel.px},${pixel.py}`;
        if (this.pixelSelectErasing) {
            this.selectedPixels.delete(key);
        } else {
            this.selectedPixels.add(key);
        }
        this.renderPixelSelectCanvas();
        this.updatePixelSelectStatus();
    }

    handlePixelSelectMouseUp() {
        this.pixelSelectDragging = false;
    }

    pixelSelectAll() {
        const psCanvas = document.getElementById('pixelSelectCanvas');
        const tw = parseInt(psCanvas.dataset.tileWidth);
        const th = parseInt(psCanvas.dataset.tileHeight);
        // Only select non-transparent pixels
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = tw;
        tempCanvas.height = th;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(this._pixelSelectSourceImage, 0, 0);
        const imageData = tempCtx.getImageData(0, 0, tw, th);
        for (let y = 0; y < th; y++) {
            for (let x = 0; x < tw; x++) {
                const i = (y * tw + x) * 4;
                if (imageData.data[i + 3] > 0) {
                    this.selectedPixels.add(`${x},${y}`);
                }
            }
        }
        this.renderPixelSelectCanvas();
        this.updatePixelSelectStatus();
    }

    pixelInvertSelection() {
        const psCanvas = document.getElementById('pixelSelectCanvas');
        const tw = parseInt(psCanvas.dataset.tileWidth);
        const th = parseInt(psCanvas.dataset.tileHeight);
        // Only invert among non-transparent pixels
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = tw;
        tempCanvas.height = th;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(this._pixelSelectSourceImage, 0, 0);
        const imageData = tempCtx.getImageData(0, 0, tw, th);
        for (let y = 0; y < th; y++) {
            for (let x = 0; x < tw; x++) {
                const i = (y * tw + x) * 4;
                if (imageData.data[i + 3] > 0) {
                    const key = `${x},${y}`;
                    if (this.selectedPixels.has(key)) {
                        this.selectedPixels.delete(key);
                    } else {
                        this.selectedPixels.add(key);
                    }
                }
            }
        }
        this.renderPixelSelectCanvas();
        this.updatePixelSelectStatus();
    }

    pixelDeselectAll() {
        this.selectedPixels.clear();
        this.renderPixelSelectCanvas();
        this.updatePixelSelectStatus();
    }

    openColorDropper() {
        if (!this.selectedSpace) {
            alert('Please select a tile first');
            return;
        }

        this.selectedTileForColor = { ...this.selectedSpace };
        this.colorDropperMode = true;

        // Get the selected tile image and display it enlarged
        const tileKey = `${this.selectedSpace.row},${this.selectedSpace.col}`;
        const tileDataURL = this.iconGrid[this.selectedSpace.row][this.selectedSpace.col];

        if (!tileDataURL) {
            alert('Selected tile is empty');
            return;
        }

        const img = new Image();
        img.onload = () => {
            const tilePreviewCanvas = document.getElementById('tilePreviewCanvas');
            const maxSize = 400;
            const scale = Math.min(maxSize / img.width, maxSize / img.height);
            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;
            
            tilePreviewCanvas.width = scaledWidth;
            tilePreviewCanvas.height = scaledHeight;
            
            // Set CSS dimensions to maintain aspect ratio
            tilePreviewCanvas.style.width = scaledWidth + 'px';
            tilePreviewCanvas.style.height = scaledHeight + 'px';
            
            const previewCtx = tilePreviewCanvas.getContext('2d');
            previewCtx.imageSmoothingEnabled = false;
            previewCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

            document.getElementById('colorDropperModal').classList.remove('hidden');
        };
        img.src = tileDataURL;
    }

    closeColorDropper() {
        document.getElementById('colorDropperModal').classList.add('hidden');
        this.colorDropperMode = false;
    }

    handleColorPick(e) {
        const tilePreviewCanvas = document.getElementById('tilePreviewCanvas');
        const rect = tilePreviewCanvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) * (tilePreviewCanvas.width / rect.width));
        const y = Math.floor((e.clientY - rect.top) * (tilePreviewCanvas.height / rect.height));

        const ctx = tilePreviewCanvas.getContext('2d');
        const imageData = ctx.getImageData(x, y, 1, 1);
        const [r, g, b, a] = imageData.data;

        // Only proceed if pixel is not transparent
        if (a > 128) {
            this.selectedTileColor = { r, g, b };
            document.getElementById('selectedColorInfo').textContent = `RGB(${r}, ${g}, ${b})`;
            this.closeColorDropper();
            
            // Enable sliders
            document.getElementById('redSlider').disabled = false;
            document.getElementById('greenSlider').disabled = false;
            document.getElementById('blueSlider').disabled = false;
            
            // Reset sliders
            document.getElementById('redSlider').value = 0;
            document.getElementById('greenSlider').value = 0;
            document.getElementById('blueSlider').value = 0;
            document.getElementById('redValue').textContent = '0';
            document.getElementById('greenValue').textContent = '0';
            document.getElementById('blueValue').textContent = '0';
        } else {
            alert('Please select a non-transparent pixel');
        }
    }

    handleColorAdjustment(channel, e) {
        if (!this.selectedSpace) {
            return;
        }

        const value = parseInt(e.target.value);
        document.getElementById(channel + 'Value').textContent = value;

        const redValue = parseInt(document.getElementById('redSlider').value);
        const greenValue = parseInt(document.getElementById('greenSlider').value);
        const blueValue = parseInt(document.getElementById('blueSlider').value);

        // Save current adjustments
        this.currentAdjustments = { r: redValue, g: greenValue, b: blueValue };
        
        this.applyColorAdjustment(redValue, greenValue, blueValue);
    }

    applyColorAdjustment(redShift, greenShift, blueShift) {
        if (!this.selectedSpace) return;

        const tileRow = this.selectedSpace.row;
        const tileCol = this.selectedSpace.col;
        const tileKey = `${tileRow},${tileCol}`;
        
        // Get or store the original image
        let originalURL = this.originalImages[tileKey];
        if (!originalURL) {
            originalURL = this.iconGrid[tileRow][tileCol];
            this.originalImages[tileKey] = originalURL;
        }

        if (!originalURL) return;

        const img = new Image();
        img.onload = () => {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(img, 0, 0);

            const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const data = imageData.data;
            const hasPixelSelection = this.selectedPixels.size > 0;

            // Process each pixel
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];

                // Skip fully transparent pixels
                if (a < 128) continue;

                // If pixel selection is active, only adjust selected pixels
                if (hasPixelSelection) {
                    const pixelIndex = i / 4;
                    const px = pixelIndex % tempCanvas.width;
                    const py = Math.floor(pixelIndex / tempCanvas.width);
                    if (!this.selectedPixels.has(`${px},${py}`)) {
                        continue;
                    }
                }

                // If a color is selected, only adjust matching pixels
                if (this.selectedTileColor) {
                    const tolerance = this.colorTolerance;
                    const targetR = this.selectedTileColor.r;
                    const targetG = this.selectedTileColor.g;
                    const targetB = this.selectedTileColor.b;

                    // Check if pixel matches selected color (within tolerance)
                    if (Math.abs(r - targetR) > tolerance ||
                        Math.abs(g - targetG) > tolerance ||
                        Math.abs(b - targetB) > tolerance) {
                        continue;
                    }
                }

                // Apply color shift with alpha blending
                const newR = Math.max(0, Math.min(255, r + redShift));
                const newG = Math.max(0, Math.min(255, g + greenShift));
                const newB = Math.max(0, Math.min(255, b + blueShift));
                
                // Blend the adjusted color with the original using alpha
                data[i] = Math.round(r + (newR - r) * this.colorAlpha);
                data[i + 1] = Math.round(g + (newG - g) * this.colorAlpha);
                data[i + 2] = Math.round(b + (newB - b) * this.colorAlpha);
            }

            tempCtx.putImageData(imageData, 0, 0);
            this.iconGrid[tileRow][tileCol] = tempCanvas.toDataURL();
            
            // Save the adjustments for this tile
            this.tileAdjustments[tileKey] = { r: redShift, g: greenShift, b: blueShift };
            
            delete this.imageCache[`${tileRow},${tileCol}`];
            this.render();
        };
        img.src = originalURL;
    }

    clearSelectedColor() {
        this.selectedTileColor = null;
        document.getElementById('selectedColorInfo').textContent = 'No color selected - adjusting whole image';
        
        // If there's a selected tile, reset its adjustments to 0
        if (this.selectedSpace) {
            const tileKey = `${this.selectedSpace.row},${this.selectedSpace.col}`;
            this.currentAdjustments = { r: 0, g: 0, b: 0 };
            this.tileAdjustments[tileKey] = { r: 0, g: 0, b: 0 };
            
            // If we have an original image, restore it
            if (this.originalImages[tileKey]) {
                this.iconGrid[this.selectedSpace.row][this.selectedSpace.col] = this.originalImages[tileKey];
                delete this.imageCache[tileKey];
                this.render();
            }
        }
        
        // Enable sliders for full image adjustment
        document.getElementById('redSlider').disabled = false;
        document.getElementById('greenSlider').disabled = false;
        document.getElementById('blueSlider').disabled = false;
        
        // Reset sliders
        document.getElementById('redSlider').value = 0;
        document.getElementById('greenSlider').value = 0;
        document.getElementById('blueSlider').value = 0;
        document.getElementById('redValue').textContent = '0';
        document.getElementById('greenValue').textContent = '0';
        document.getElementById('blueValue').textContent = '0';
        
        // Reset alpha slider
        document.getElementById('alphaSlider').value = 100;
        document.getElementById('alphaValue').textContent = '100%';
        this.colorAlpha = 1.0;
    }

    saveRecoloring() {
        if (!this.selectedSpace) {
            alert('Please select a tile first');
            return;
        }

        const tileRow = this.selectedSpace.row;
        const tileCol = this.selectedSpace.col;
        const tileKey = `${tileRow},${tileCol}`;

        // Update the original image to the current adjusted image
        this.originalImages[tileKey] = this.iconGrid[tileRow][tileCol];

        // Reset adjustments to 0
        this.tileAdjustments[tileKey] = { r: 0, g: 0, b: 0 };
        this.currentAdjustments = { r: 0, g: 0, b: 0 };

        // Clear selected color
        this.selectedTileColor = null;

        // Reset sliders
        document.getElementById('redSlider').value = 0;
        document.getElementById('greenSlider').value = 0;
        document.getElementById('blueSlider').value = 0;
        document.getElementById('redValue').textContent = '0';
        document.getElementById('greenValue').textContent = '0';
        document.getElementById('blueValue').textContent = '0';
        
        // Reset alpha slider
        document.getElementById('alphaSlider').value = 100;
        document.getElementById('alphaValue').textContent = '100%';
        this.colorAlpha = 1.0;
        
        document.getElementById('selectedColorInfo').textContent = 'No color selected - adjusting whole image';

        this.render();
    }

    save() {
        // Use uploaded file name if available, otherwise use default
        let defaultName = 'TileSet.png';
        if (this.uploadedFileName) {
            defaultName = this.uploadedFileName + '.png';
        }
        
        // Prompt for filename
        const fileName = prompt('Enter file name:', defaultName);
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
