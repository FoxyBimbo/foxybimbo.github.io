/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/timer/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc More customization and control for the Timer
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha R2
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: Gain a lot more control over the timer, including adding or
 * subtracting seconds from the timer. This plugin also allows a lot more
 * customization for the timer, including changing the timer color, adding a
 * label, and more.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ---------------------------Alpha Notes--------------------------------------
 * This plugin has many planned improvements over the course of its alpha
 * stage, including:
 *
 * 1) Multiple timers active at once
 * 2) Positioning for the timer
 * 3) Effects every x seconds
 * 4) Animations
 * 5) Background Images
 * ------------------------------Format----------------------------------------
 * There are multiple formats the timer can be displayed. They are explained
 * below:
 *
 * Clock - The number will be displayed as X:XX with the minutes and seconds
 * separated by a colon. This will look like a clock. For example, 1 minute
 * and 20 seconds would appear as 1:20
 *
 * Number - The number will be displayed as a simple number. For example, 1
 * minute and 20 seconds would appear as 80.
 * -------------------------Time Operations------------------------------------
 * This plugin allows you to perform various math operations on the timer's
 * frames. These include:
 *
 * +: Add an amount of frames
 * -: Subtract an amount of frames
 * *: Multiply frames by a number
 * /: Divide frames by a number
 * %: Modular division on the timer's frames
 * =: Set the frames to a specific amount
 *
 * Every 60 frames represents 1 second.
 * -------------------------Plugin Commands------------------------------------
 * This plugin includes the following plugin commands:
 *
 * Change Preset - Change the preset used by the timer
 *
 * Change Time - Add, subtract, multiply, divide operations for the time in
 * the timer. This uses Frames for add/subtract. When multiplying or dividing,
 * it will also multiply or divide the frames. This may mean you are dividing
 * by a fraction of a second, for example.
 *
 * Change Timer Speed - Change the timer speed
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_Timer.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version adds x and y offsets to your timer. These are
 * available both to your presets and to the default timer.
 *
 * This update also added an integration with [CGMZ] Toast Manager, so you can
 * now show a toast preset when the timer expires.
 *
 * It also fixes a bug with the timer showing NaN in saved games from before
 * this plugin was added. This plugin should no longer crash the game if you
 * try to swap to a timer preset that does not exist (for example, if you make
 * a type). Instead, it will just use the default timer.
 *
 * Version Alpha R2
 * - Added timer x and y offsets
 * - Added [CGMZ] Toast Manager integration
 * - Fix crash when trying to use nonexistant preset
 * - Fix bug with timer showing NaN in saves from before plugin was added
 *
 * @command Change Preset
 * @desc Change the timer preset used by the timer
 *
 * @arg id
 * @desc The timer preset id to use
 *
 * @command Change Time
 * @desc Add, subtract, and other operations for time in the timer
 *
 * @arg Mode
 * @type select
 * @option +
 * @option -
 * @option *
 * @option /
 * @option %
 * @option =
 * @default +
 * @desc The operation to perform on the current timer frames.
 *
 * @arg Frames
 * @type number
 * @default 0
 * @desc Amount of frames to use in the operation (amount added, subtracted, etc).
 *
 * @command Change Speed
 * @desc Change the speed of the timer
 *
 * @arg Speed
 * @type number
 * @default 1.00
 * @decimals 2
 * @desc Multiplier for how fast the timer counts (multiplied with timer default speed)
 *
 * @param Mandatory Setup
 *
 * @param Timer Presets
 * @parent Mandatory Setup
 * @type struct<Timer>[]
 * @default []
 * @desc Set up timer presets here
 *
 * @param Mechanics
 *
 * @param Reset Timer On Expire
 * @parent Mechanics
 * @type boolean
 * @default true
 * @desc If true, the timer id will be cleared and the default timer settings will be used after the timer expires
 *
 * @param Reset Speed On Expire
 * @parent Mechanics
 * @type boolean
 * @default true
 * @desc If true, the timer speed will be set back to 1 when it expires
 *
 * @param Default Options
 *
 * @param X Offset
 * @parent Default Options
 * @type number
 * @min -9999
 * @default 0
 * @desc If no preset, X offset for the timer. Negative = further left, bigger = further right.
 *
 * @param Y Offset
 * @parent Default Options
 * @type number
 * @min -9999
 * @default 0
 * @desc If no preset, Y offset for the timer. Negative = further up, bigger = further down.
*/
/*~struct~Timer:
 * @param id
 * @desc The id of this preset
 * 
 * @param Color
 * @type color
 * @default 0
 * @desc The color of the timer when using this preset
 *
 * @param Label
 * @desc The label to show before the timer
 *
 * @param Format
 * @type select
 * @option Number
 * @option Clock
 * @default Clock
 * @desc The format the timer number will appear. See documentation.
 *
 * @param Count Down
 * @type boolean
 * @default true
 * @desc If true, the timer will count down. Otherwise, it will count up.
 *
 * @param Speed
 * @type number
 * @default 1.00
 * @decimals 2
 * @desc Default speed of the timer. Can still be changed later with plugin command.
 *
 * @param Opacity
 * @type number
 * @default 255
 * @min 0
 * @max 255
 * @desc Opacity of the timer
 *
 * @param X Offset
 * @type number
 * @default 0
 * @min -9999
 * @desc X offset for the timer sprite. Negative = further left, bigger = further right.
 *
 * @param Y Offset
 * @type number
 * @default 0
 * @min -9999
 * @desc Y offset for the timer sprite. Negative = further up, bigger = further down.
 *
 * @param Enable Text Codes
 * @type boolean
 * @default true
 * @desc If true, the timer can contain text codes
 *
 * @param On Expire
 *
 * @param Common Event
 * @parent On Expire
 * @type common_event
 * @default 0
 * @desc Common Event to run on timer expiration
 *
 * @param Default Expire
 * @parent On Expire
 * @type boolean
 * @default true
 * @desc If true, battle will be aborted when timer ends (and any other third party plugin expire behavior)
 *
 * @param Stop Timer
 * @parent On Expire
 * @type boolean
 * @default false
 * @desc If true, the timer will also be stopped (not shown instead of stuck at 0:00)
 *
 * @param Custom JS
 * @parent On Expire
 * @type multiline_string
 * @desc Custom JavaScript to run when the timer expires
 *
 * @param Integrations
 * @parent On Expire
 *
 * @param Toast Id
 * @parent Integrations
 * @desc A [CGMZ] Toast Manager preset id to show when the timer expires
*/
Imported.CGMZ_Timer = true;
CGMZ.Versions["Timer"] = "Alpha R2";
CGMZ.Timer = {};
CGMZ.Timer.parameters = PluginManager.parameters('CGMZ_Timer');
CGMZ.Timer.ResetTimerOnExpire = (CGMZ.Timer.parameters["Reset Timer On Expire"] === 'true');
CGMZ.Timer.ResetSpeedOnExpire = (CGMZ.Timer.parameters["Reset Speed On Expire"] === 'true');
CGMZ.Timer.DefaultXOffset = Number(CGMZ.Timer.parameters["X Offset"]);
CGMZ.Timer.DefaultYOffset = Number(CGMZ.Timer.parameters["Y Offset"]);
CGMZ.Timer.Timers = CGMZ_Utils.parseJSON(CGMZ.Timer.parameters["Timer Presets"], [], "[CGMZ] Timer", "Your Timer Presets parameter was invalid and could not be read");
//=============================================================================
// CGMZ_TimerPreset
//-----------------------------------------------------------------------------
// Manage timer preset settings (not saved)
//=============================================================================
function CGMZ_TimerPreset() {
	this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_TimerPreset.prototype.initialize = function(data) {
	this.id = data.id;
	this.color = Number(data.Color);
	this.commonEvent = Number(data["Common Event"]);
	this.opacity = Number(data.Opacity);
	this.xOffset = Number(data["X Offset"]);
	this.yOffset = Number(data["Y Offset"]);
	this.speed = parseFloat(data.Speed);
	this.label = data.Label;
	this.format = data.Format;
	this.toastId = data["Toast Id"];
	this.customJS = data["Custom JS"];
	this.countDown = (data["Count Down"] === 'true');
	this.defaultExpire = (data["Default Expire"] === 'true');
	this.stopTimer = (data["Stop Timer"] === 'true');
	this.enableTextCodes = (data["Enable Text Codes"] === 'true');
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Manage current timer preset
//=============================================================================
//-----------------------------------------------------------------------------
// Set the timer preset id to be empty string
//-----------------------------------------------------------------------------
const alias_CGMZTimer_CGMZCore_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZTimer_CGMZCore_createPluginData.call(this);
	this._timerPresetId = "";
};
//-----------------------------------------------------------------------------
// Check if timer speed is undefined, if so, initialize it
//-----------------------------------------------------------------------------
const alias_CGMZTimer_CGMZore_createAfterLoad = CGMZ_Core.prototype.createAfterLoad;
CGMZ_Core.prototype.createAfterLoad = function() {
	alias_CGMZTimer_CGMZore_createAfterLoad.call(this);
	if(!$gameTimer._cgmz_speed) $gameTimer._cgmz_speed = 1.00;
};
//-----------------------------------------------------------------------------
// Set the timer id
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setTimerPresetId = function(id) {
	this._timerPresetId = id;
};
//-----------------------------------------------------------------------------
// Clear the timer id
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.clearTimerPresetId = function() {
	this._timerPresetId = "";
};
//-----------------------------------------------------------------------------
// Clear the timer id
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getCurrentTimerPresetId = function() {
	return this._timerPresetId;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Handle plugin commands, timer data
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize timer presets
//-----------------------------------------------------------------------------
const alias_CGMZTimer_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZTimer_CGMZTemp_createPluginData.call(this);
	this._cgmzTimerPresets = {};
	for(const json of CGMZ.Timer.Timers) {
		const timerData = CGMZ_Utils.parseJSON(json, null, "[CGMZ] Timer", "One of your timer presets was invalid and could not be read");
		if(!timerData) continue;
		const timer = new CGMZ_TimerPreset(timerData);
		this._cgmzTimerPresets[timer.id] = timer;
	}
};
//-----------------------------------------------------------------------------
// Get any timer preset
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getTimerPreset = function(id) {
	return this._cgmzTimerPresets[id];
};
//-----------------------------------------------------------------------------
// Get the currently used timer preset
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getCurrentTimerPreset = function() {
	return this._cgmzTimerPresets[$cgmz.getCurrentTimerPresetId()];
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZTimer_CGMZTemp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZTimer_CGMZTemp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Timer", "Change Preset", this.pluginCommandTimerChangePreset);
	PluginManager.registerCommand("CGMZ_Timer", "Change Time", this.pluginCommandTimerChangeTime);
	PluginManager.registerCommand("CGMZ_Timer", "Change Speed", this.pluginCommandTimerChangeSpeed);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Preset
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandTimerChangePreset = function(args) {
	$cgmz.setTimerPresetId(args.id);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Time
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandTimerChangeTime = function(args) {
	const amount = Number(args.Frames);
	const currentFrames = $gameTimer.frames();
	const newAmount = CGMZ_Utils.performNumberOperation(currentFrames, amount, args.Mode);
	$gameTimer.CGMZ_setTimerFrames(newAmount);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Speed
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandTimerChangeSpeed = function(args) {
	const speed = parseFloat(args.Speed);
	$gameTimer.CGMZ_changeSpeed(speed);
};
//=============================================================================
// Game_Timer
//-----------------------------------------------------------------------------
// Handle [CGMZ] properties of timer if exists
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize the timer speed
//-----------------------------------------------------------------------------
const alias_CGMZTimer_GameTimer_initialize = Game_Timer.prototype.initialize;
Game_Timer.prototype.initialize = function() {
    alias_CGMZTimer_GameTimer_initialize.call(this);
	this._cgmz_speed = 1.00;
};
//-----------------------------------------------------------------------------
// Also update CGMZ Timer properties
//-----------------------------------------------------------------------------
const alias_CGMZTimer_GameTimer_update = Game_Timer.prototype.update;
Game_Timer.prototype.update = function(sceneActive) {
	alias_CGMZTimer_GameTimer_update.call(this, sceneActive);
	const timer = $cgmzTemp.getCurrentTimerPreset();
	if(sceneActive && this._working && this._frames > 0) {
		if(timer) {
			this.CGMZ_updateTimerFrameCount(timer);
		} else {
			this.CGMZ_updateBasicTimerFrameCount();
		}
	}
};
//-----------------------------------------------------------------------------
// Update frame count if [CGMZ] Timer
//-----------------------------------------------------------------------------
Game_Timer.prototype.CGMZ_updateTimerFrameCount = function(timer) {
	this._frames++; // undo the default frame subtraction
	if(timer.countDown) {
		this._frames -= 1 * (timer.speed * this._cgmz_speed);
		if(this._frames <= 0) {
			this._frames = 0;
			this.onExpire();
		}
	} else {
		this._frames += 1 * (timer.speed * this._cgmz_speed);
	}
};
//-----------------------------------------------------------------------------
// Update frame count if not [CGMZ] Timer (still allow speed control)
//-----------------------------------------------------------------------------
Game_Timer.prototype.CGMZ_updateBasicTimerFrameCount = function() {
	this._frames++; // undo the default frame subtraction
	this._frames -= 1 * this._cgmz_speed;
};
//-----------------------------------------------------------------------------
// Change the speed of the timer
//-----------------------------------------------------------------------------
Game_Timer.prototype.CGMZ_changeSpeed = function(speed) {
	this._cgmz_speed = speed;
};
//-----------------------------------------------------------------------------
// Also run CGMZ Timer expiration parameters
//-----------------------------------------------------------------------------
const alias_CGMZTimer_GameTimer_onExpire = Game_Timer.prototype.onExpire;
Game_Timer.prototype.onExpire = function() {
	const timer = $cgmzTemp.getCurrentTimerPreset();
	if(timer) {
		if(timer.commonEvent) $gameTemp.reserveCommonEvent(timer.commonEvent);
		if(timer.customJS) {
			const func = new Function(timer.customJS);
			func.call(this);
		}
		if(timer.defaultExpire) alias_CGMZTimer_GameTimer_onExpire.call(this);
		if(timer.stopTimer) this.stop();
		if(Imported.CGMZ_ToastManager && timer.toastId) {
			const toast = $cgmzTemp.getToastObjectFromPreset(timer.toastId);
			if(toast) $cgmzTemp.createNewToast(toast);
		}
	} else {
		alias_CGMZTimer_GameTimer_onExpire.call(this);
	}
	if(CGMZ.Timer.ResetTimerOnExpire) $cgmz.clearTimerPresetId();
	if(CGMZ.Timer.ResetSpeedOnExpire) this._cgmz_speed = 1.00;
};
//-----------------------------------------------------------------------------
// Set the timer frames
//-----------------------------------------------------------------------------
Game_Timer.prototype.CGMZ_setTimerFrames = function(amount) {
	this._frames = amount;
};
//=============================================================================
// Sprite_Timer
//-----------------------------------------------------------------------------
// Handle [CGMZ] properties of timer if exists
//=============================================================================
//-----------------------------------------------------------------------------
// Initialize timer
//-----------------------------------------------------------------------------
const alias_CGMZTimer_SpriteTimer_initialize = Sprite_Timer.prototype.initialize;
Sprite_Timer.prototype.initialize = function() {
	alias_CGMZTimer_SpriteTimer_initialize.call(this);
    this._cgmz_timerPresetId = "";
};
//-----------------------------------------------------------------------------
// Also update the preset id
//-----------------------------------------------------------------------------
const alias_CGMZTimer_SpriteTimer_update = Sprite_Timer.prototype.update;
Sprite_Timer.prototype.update = function() {
	alias_CGMZTimer_SpriteTimer_update.call(this);
    this.CGMZ_updateTimerPreset();
};
//-----------------------------------------------------------------------------
// Add x/y offset to the sprite location
//-----------------------------------------------------------------------------
const alias_CGMZTimer_SpriteTimer_updatePosition = Sprite_Timer.prototype.updatePosition;
Sprite_Timer.prototype.updatePosition = function() {
	alias_CGMZTimer_SpriteTimer_updatePosition.call(this);
	const preset = $cgmzTemp?.getCurrentTimerPreset();
	if(preset) {
		this.x += preset.xOffset;
		this.y += preset.yOffset;
	} else {
		this.x += CGMZ.Timer.DefaultXOffset;
		this.y += CGMZ.Timer.DefaultYOffset;
	}
};
//-----------------------------------------------------------------------------
// Update timer preset
//-----------------------------------------------------------------------------
Sprite_Timer.prototype.CGMZ_updateTimerPreset = function() {
	if(!$cgmz) return;
	const preset = $cgmz.getCurrentTimerPresetId();
	if(preset !== this._cgmz_timerPresetId) {
		this._cgmz_timerPresetId = preset;
		const timer = $cgmzTemp.getCurrentTimerPreset();
		if(!preset || !timer) {
			this.opacity = 255;
			this.createBitmap();
			this.redraw();
		} else {
			const timer = $cgmzTemp.getCurrentTimerPreset();
			this.opacity = timer.opacity;
		}
	}
};
//-----------------------------------------------------------------------------
// Handle if format is number (clock is default)
//-----------------------------------------------------------------------------
const alias_CGMZTimer_SpriteTimer_timerText = Sprite_Timer.prototype.timerText;
Sprite_Timer.prototype.timerText = function() {
	const timer = $cgmzTemp.getCurrentTimerPreset();
	if(timer && timer.format === 'Number') {
		return this._seconds;
	}
	return alias_CGMZTimer_SpriteTimer_timerText.call(this);
};
//-----------------------------------------------------------------------------
// Redraw the timer bitmap with CGMZ options if possible
//-----------------------------------------------------------------------------
const alias_CGMZTimer_SpriteTimer_redraw = Sprite_Timer.prototype.redraw;
Sprite_Timer.prototype.redraw = function() {
	const timer = $cgmzTemp.getCurrentTimerPreset();
	if(timer) {
		const timerText = this.timerText();
		const win = new CGMZ_Window_BitmapDummy();
		const string = `\\c[${timer.color}]\\fs[${this.fontSize()}]${timer.label}${timerText}`;
		if(timer.enableTextCodes) {
			this.bitmap = win.getTextCodeBitmap(string);
		} else {
			const dim = win.CGMZ_textSizeEx(string);
			this.bitmap = new Bitmap(Math.floor(dim.width), Math.floor(dim.height));
			this.bitmap.fontFace = this.fontFace();
			this.bitmap.fontSize = this.fontSize();
			this.bitmap.outlineColor = ColorManager.outlineColor();
			this.bitmap.textColor = ColorManager.textColor(timer.color);
			this.bitmap.clear();
			this.bitmap.drawText(timer.label + timerText, 0, 0, this.bitmap.width, this.bitmap.height, "center");
		}
	} else {
		alias_CGMZTimer_SpriteTimer_redraw.call(this);
	}
};