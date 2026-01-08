/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/buttonmash/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Mash a button to fill a bar, for use in eventing
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha R4
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: Mash a button to fill a bar, for use in eventing. The result
 * is provided to a variable for use in your events. You determine which
 * button or key needs to be pressed and how difficult the bar is to fill in
 * a time limit. You can also display a short text above the bar.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ---------------------------Alpha Notes--------------------------------------
 * This plugin has many planned improvements over the course of its alpha
 * stage, including:
 *
 * 1) Make the button mash work in battle
 * 2) Allow infinite time with a cancel button if too hard for player
 * 3) Statistics tracking for things like events passed / attempted, etc.
 * 4) Variances for button mash settings
 * ------------------------------Set Up----------------------------------------
 * Set up your button mash events in the Events parameter, and note down the id
 * you assign to your button mash event. Then, use the Plugin Command "Start"
 * to start a button mash. Provide the id to your plugin command, and it will
 * start that id's button mash event.
 *
 * After the button mash ends, the result will be stored in the result variable
 * for use in eventing. The event commands will pick up after the plugin
 * command.
 * ----------------------------Text Codes--------------------------------------
 * This plugin allows the use of a few text codes within the button mash
 * window progress bar strings. They are as follows:
 *
 * %flash% - Will be replaced with the flashing icon
 * %percent% - Shows the current percent filled
 * %progress% - Shows the current amount of raw progress units
 * %total% - Shows the total raw progress units required for completion
 * -------------------------Plugin Commands------------------------------------
 * The following plugin commands are supported:
 * 
 * • Start
 * Starts a button mash event. Set the various properties up in the plugin
 * parameters first, as this plugin command only accepts an id.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_ButtonMash.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version adds touch support. You can now include a
 * clickable button in the button mash window, which can have a separate
 * unpressed and pressed image and will contribute to the button mash
 * progress. If this is not included or if touch ui is turned off, the player
 * will not see this additional sprite.
 *
 * This update also added window size and positioning parameters. These exist
 * globally for all button mashes, and can also be overridden by button mash
 * specific settings. Gauge height and y offset settings were also added.
 *
 * Version Alpha R4
 * - Added Touch UI Support
 * - Added window size and positioning customizations
 * - Added gauge height and offset customizations
 *
 * @command Start
 * @desc Start a button mash event
 *
 * @arg Id
 * @desc The id from the events plugin parameters to use for the bar
 *
 * @arg Prefill
 * @type number
 * @default 0
 * @desc Pre-fill the progress bar by an amount? (in progress units not percentage)
 *
 * @param Mandatory Setup
 *
 * @param Events
 * @parent Mandatory Setup
 * @type struct<Event>[]
 * @default []
 * @desc Set up button mash event properties throughout your game, re-usable by id
 *
 * @param Battle Options
 *
 * @param Escape Id
 * @parent Battle Options
 * @desc If set, this button mash id will play when the player tries to escape battle
 *
 * @param Escape Prefill
 * @parent Battle Options
 * @default true
 * @type boolean
 * @desc If true, escape bar will be prefilled based on the escape ratio which takes into account agility differences
 *
 * @param Customization
 *
 * @param Gauge Height
 * @parent Customization
 * @type number
 * @default 36
 * @desc The height to use for the button mash gauge, in pixels
 *
 * @param Window Height
 * @parent Customization
 * @type number
 * @default 96
 * @desc The window height value to use for the button mash window (in pixels).
 *
 * @param Window Width
 * @parent Customization
 * @type number
 * @default 50
 * @min 0
 * @max 100
 * @desc The window width value to use for the button mash window (percentage of screen)
 *
 * @param Integrations
 *
 * @param Default Window Settings
 * @parent Integrations
 * @desc A [CGMZ] Window Settings preset id to use for the button mash window as a default
 *
 * @param Default Window Background
 * @parent Integrations
 * @desc A [CGMZ] Window Backgrounds preset id to use for the button mash window as a default
*/
/*~struct~Event:
 * @param Id
 * @desc The id of the button mash event
 *
 * @param Controls
 *
 * @param Key
 * @parent Controls
 * @default z
 * @desc The keyboard button that needs to be pressed for progress
 *
 * @param Gamepad
 * @parent Controls
 * @type select
 * @option A
 * @value 0
 * @option B
 * @value 1
 * @option X
 * @value 2
 * @option Y
 * @value 3
 * @option LB
 * @value 4
 * @option RB
 * @value 5
 * @option LT
 * @value 6
 * @option RT
 * @value 7
 * @option Back / Select
 * @value 8
 * @option Start
 * @value 9
 * @option Left Stick
 * @value 10
 * @option Right Stick
 * @value 11
 * @option Dpad Up
 * @value 12
 * @option Dpad Down
 * @value 13
 * @option Dpad Left
 * @value 14
 * @option Dpad Right
 * @value 15
 * @default 0
 * @desc The gamepad button that needs to be pressed for progress
 *
 * @param Mechanics
 *
 * @param Total
 * @parent Mechanics
 * @type number
 * @default 100
 * @desc The total progress needed to finish the event
 *
 * @param Press Value
 * @parent Mechanics
 * @type number
 * @default 10
 * @desc The amount added to the progress value when the button is pressed once
 *
 * @param Decline Speed
 * @parent Mechanics
 * @type number
 * @default 2
 * @desc How many frames until the Decline Value is subtracted from the progress? (60f = 1sec)
 *
 * @param Decline Value
 * @parent Mechanics
 * @type number
 * @default 2
 * @desc The amount subtracted from the progress value over time
 *
 * @param Time Limit
 * @parent Mechanics
 * @type number
 * @default 10
 * @desc The amount (in seconds) that the player gets to fill the bar
 *
 * @param Result Variable
 * @parent Mechanics
 * @type variable
 * @default 0
 * @desc The variable to store the result in
 *
 * @param Touch UI
 *
 * @param Touch UI Height
 * @parent Touch UI
 * @type number
 * @default 60
 * @desc Additional height to add if touch ui sprite is showing
 *
 * @param Touch UI Sprite
 * @parent Touch UI
 * @type file
 * @dir img
 * @desc Touch UI Sprite to use
 *
 * @param Pressed Touch Sprite
 * @parent Touch UI
 * @type file
 * @dir img
 * @desc Touch UI Sprite to use when pressed
 *
 * @param Customization
 *
 * @param Show Timer
 * @parent Customization
 * @type boolean
 * @default true
 * @desc Show a game timer while the button mash is active?
 *
 * @param Color 1
 * @parent Customization
 * @type color
 * @default 3
 * @desc The first color in the gradient color bar
 *
 * @param Color 2
 * @parent Customization
 * @type color
 * @default 11
 * @desc The second color in the gradient color bar
 *
 * @param Gauge Height
 * @parent Customization
 * @type number
 * @default 0
 * @desc A custom height value to use for the button mash gauge
 *
 * @param Gauge Y Offset
 * @parent Customization
 * @type number
 * @default 0
 * @min -9999
 * @desc A Y Offset (in pixels) for the button mash gauge
 *
 * @param Window Height
 * @parent Customization
 * @type number
 * @default 0
 * @desc A custom window height value to use for the button mash window (in pixels).
 *
 * @param Window Width
 * @parent Customization
 * @type number
 * @default 0
 * @max 100
 * @min 0
 * @desc A custom window width value to use for the button mash window (percentage of screen)
 *
 * @param Window X Offset
 * @parent Customization
 * @type number
 * @default 0
 * @min -9999
 * @desc A custom amount to add (or subtract) from the window x coordinate
 *
 * @param Window Y Offset
 * @parent Customization
 * @type number
 * @default 0
 * @min -9999
 * @desc A custom amount to add (or subtract) from the window y coordinate
 *
 * @param Window Text
 *
 * @param Keyboard Text
 * @parent Window Text
 * @default Press Z
 * @desc The text to show above the progress bar (when last input keyboard)
 *
 * @param Gamepad Text
 * @parent Window Text
 * @default Press A
 * @desc The text to show above the progress bar (when last input gamepad)
 *
 * @param Progress Left Text
 * @parent Window Text
 * @desc The text to show on the progress bar (left align)
 *
 * @param Progress Center Text
 * @parent Window Text
 * @desc The text to show on the progress bar (center align)
 *
 * @param Progress Right Text
 * @parent Window Text
 * @default %flash%
 * @desc The text to show on the progress bar (right align)
 *
 * @param Flashing Icon
 *
 * @param Icon 1 Keyboard
 * @parent Flashing Icon
 * @type icon
 * @default 0
 * @desc The first icon to show as the flashing icon (keyboard input)
 *
 * @param Icon 2 Keyboard
 * @parent Flashing Icon
 * @type icon
 * @default 0
 * @desc The second icon to show as the flashing icon (keyboard input)
 *
 * @param Icon 1 Gamepad
 * @parent Flashing Icon
 * @type icon
 * @default 0
 * @desc The first icon to show as the flashing icon (gamepad input)
 *
 * @param Icon 2 Gamepad
 * @parent Flashing Icon
 * @type icon
 * @default 0
 * @desc The second icon to show as the flashing icon (gamepad input)
 *
 * @param Flash Time
 * @parent Flashing Icon
 * @type number
 * @min 0
 * @default 60
 * @desc Amount of time (in frames, 60f = 1sec) before swapping the flashing icon
 *
 * @param Sound Settings
 *
 * @param Sound Effect
 * @parent Sound Settings
 * @type file
 * @dir audio/se
 * @desc Sound effect file to play on press
 *
 * @param Volume Start
 * @parent Sound Settings
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc Starting volume when the bar is not filled at all
 *
 * @param Pitch Start
 * @parent Sound Settings
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc Starting pitch when the bar is not filled at all
 *
 * @param Pan Start
 * @parent Sound Settings
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc Starting pan when the bar is not filled at all
 *
 * @param Volume End
 * @parent Sound Settings
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc Ending volume when the bar is fully filled
 *
 * @param Pitch End
 * @parent Sound Settings
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc Ending pitch when the bar is fully filled
 *
 * @param Pan End
 * @parent Sound Settings
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc Ending pan when the bar is fully filled
*/
Imported.CGMZ_ButtonMash = true;
CGMZ.Versions["Button Mash"] = "Alpha R4";
CGMZ.ButtonMash = {};
CGMZ.ButtonMash.parameters = PluginManager.parameters('CGMZ_ButtonMash');
CGMZ.ButtonMash.EscapeId = CGMZ.ButtonMash.parameters["Escape Id"];
CGMZ.ButtonMash.DefaultWindowSettings = CGMZ.ButtonMash.parameters["Default Window Settings"];
CGMZ.ButtonMash.DefaultWindowBackground = CGMZ.ButtonMash.parameters["Default Window Background"];
CGMZ.ButtonMash.WindowWidth = Number(CGMZ.ButtonMash.parameters["Window Width"]);
CGMZ.ButtonMash.WindowHeight = Number(CGMZ.ButtonMash.parameters["Window Height"]);
CGMZ.ButtonMash.GaugeHeight = Number(CGMZ.ButtonMash.parameters["Gauge Height"]);
CGMZ.ButtonMash.EscapePrefill = (CGMZ.ButtonMash.parameters["Escape Prefill"] === 'true');
CGMZ.ButtonMash.Events = CGMZ_Utils.parseJSON(CGMZ.ButtonMash.parameters["Events"], [], "[CGMZ] Button Mash", "Your Events parameter was set up incorrectly and could not be read.");
//=============================================================================
// CGMZ_ButtonMashEvent
//-----------------------------------------------------------------------------
// Handle temp button mash data
//=============================================================================
function CGMZ_ButtonMashEvent() {
	this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize button mash event
//-----------------------------------------------------------------------------
CGMZ_ButtonMashEvent.prototype.initialize = function(data) {
	this.id = data.Id;
	this.key = data.Key;
	this.gamepadButton = Number(data.Gamepad);
	this.total = Number(data.Total);
	this.pressVal = Number(data["Press Value"]);
	this.declineVal = Number(data["Decline Value"]);
	this.declineSpeed = Number(data["Decline Speed"]);
	this.timeLimit = Number(data["Time Limit"]);
	this.keyboardText = data["Keyboard Text"];
	this.gamepadText = data["Gamepad Text"];
	this.leftText = data["Progress Left Text"];
	this.centerText = data["Progress Center Text"];
	this.rightText = data["Progress Right Text"];
	this.resultVar = Number(data["Result Variable"]);
	this.color1 = Number(data["Color 1"]);
	this.color2 = Number(data["Color 2"]);
	this.keyIcons = [Number(data["Icon 1 Keyboard"]), Number(data["Icon 2 Keyboard"])];
	this.gamepadIcons = [Number(data["Icon 1 Gamepad"]), Number(data["Icon 2 Gamepad"])];
	this.flashTime = Number(data["Flash Time"]);
	this.showTimer = (data["Show Timer"] === 'true');
	this._seFile = data["Sound Effect"];
	this._startSoundSettings = {vol: Number(data["Volume Start"]), pitch: Number(data["Pitch Start"]), pan: Number(data["Pan Start"])};
	this._endSoundSettings = {vol: Number(data["Volume End"]), pitch: Number(data["Pitch End"]), pan: Number(data["Pan End"])};
	this.windowHeight = Number(data["Window Height"]);
	this.windowWidth = Number(data["Window Width"]);
	this.windowXOffset = Number(data["Window X Offset"]);
	this.windowYOffset = Number(data["Window Y Offset"]);
	this.gaugeHeight = Number(data["Gauge Height"]);
	this.gaugeYOffset = Number(data["Gauge Y Offset"]);
	this.touchUIHeight = Number(data["Touch UI Height"]);
	this.touchUISprite = data["Touch UI Sprite"];
	this.touchUIPressed = data["Pressed Touch Sprite"] || data["Touch UI Sprite"];
};
//-----------------------------------------------------------------------------
// Get SE to play
//-----------------------------------------------------------------------------
CGMZ_ButtonMashEvent.prototype.getSoundEffect = function(progress, maxProgress) {
	if(!this._seFile) return null;
	const percentage = progress / maxProgress;
	return {
		name: this._seFile,
		volume: CGMZ_Utils.lerp(this._startSoundSettings.vol, this._endSoundSettings.vol, percentage),
		pitch: CGMZ_Utils.lerp(this._startSoundSettings.pitch, this._endSoundSettings.pitch, percentage),
		pan: CGMZ_Utils.lerp(this._startSoundSettings.pan, this._endSoundSettings.pan, percentage)
	};
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Create data, register and handling for plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize button mash data
//-----------------------------------------------------------------------------
const alias_CGMZButtonMash_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZButtonMash_CGMZTemp_createPluginData.call(this);
	this.initButtonMash();
};
//-----------------------------------------------------------------------------
// Initialize button mash data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initButtonMash = function() {
	this._buttonMashEvents = {};
	this._currentButtonMash = {progress: 0, id: "", timer: false};
	this._canPressButtonMash = true;
	this._buttonMashTimer = 0;
	this._buttonMashDecline = 0;
	this._isButtonMash = false;
	for(const json of CGMZ.ButtonMash.Events) {
		const e = CGMZ_Utils.parseJSON(json, null, "[CGMZ] Button Mash", "One of your Events parameters was set up incorrectly and could not be read.");
		if(!e) continue;
		this._buttonMashEvents[e.Id] = new CGMZ_ButtonMashEvent(e);
	}
};
//-----------------------------------------------------------------------------
// Get button mash data by id
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getButtonMashEvent = function(id) {
	return this._buttonMashEvents[id];
};
//-----------------------------------------------------------------------------
// Get button mash data by id
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getButtonMashProgress = function() {
	return this._currentButtonMash.progress;
};
//-----------------------------------------------------------------------------
// Get button mash data by id
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getCurrentButtonMashId = function() {
	return this._currentButtonMash.id;
};
//-----------------------------------------------------------------------------
// Check if currently button mashing
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.isButtonMash = function() {
	return this._isButtonMash;
};
//-----------------------------------------------------------------------------
// Start a button mash
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.startButtonMash = function(id, prefill) {
	const e = this.getButtonMashEvent(id);
	this._isButtonMash = true;
	this._currentButtonMash = {progress: prefill, id: id, timer: e.showTimer};
	this._buttonMashTimer = 0;
	this._buttonMashDecline = 0;
	if(e.showTimer) $gameTimer.start(e.timeLimit * 60);
};
//-----------------------------------------------------------------------------
// Stop a button mash
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.stopButtonMash = function() {
	this._isButtonMash = false;
	this._currentButtonMash = {progress: 0, id: "", timer: false};
	this._buttonMashTimer = 0;
	this._buttonMashDecline = 0;
};
//-----------------------------------------------------------------------------
// Stop a button mash
//-----------------------------------------------------------------------------
const alias_CGMZButtonMash_CGMZTemp_update = CGMZ_Temp.prototype.update;
CGMZ_Temp.prototype.update = function() {
	alias_CGMZButtonMash_CGMZTemp_update.call(this);
	if(this._isButtonMash) this.updateButtonMash();
};
//-----------------------------------------------------------------------------
// Update the button mash
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.updateButtonMash = function() {
	const e = this.getButtonMashEvent(this._currentButtonMash.id);
	if(!e) return;
	if(this._canPressButtonMash) {
		this.checkButtonMashPress(e);
	} else {
		this.checkButtonMashRelease(e);
	}
	this._buttonMashTimer++;
	this._buttonMashDecline++;
	if(this._buttonMashDecline >= e.declineSpeed && this._currentButtonMash.progress < e.total) {
		this._buttonMashDecline = 0;
		this._currentButtonMash.progress -= e.declineVal;
	}
	this._currentButtonMash.progress = this._currentButtonMash.progress.clamp(0, e.total);
	if(this._currentButtonMash.progress >= e.total || this._buttonMashTimer >= e.timeLimit * 60) {
		this.onButtonMashFinish(e);
	}
};
//-----------------------------------------------------------------------------
// Check for button press
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkButtonMashPress = function(e) {
	let isPressed = false;
	if(this._lastInputType === 'keyboard') {
		isPressed = this.isKeyPressed(e.key);
	} else {
		const gamepad = this.getLastGamepad();
		if(gamepad) {
			isPressed = gamepad.buttons?.[e.gamepadButton]?.pressed;
		}
	}
	if(isPressed) {
		this._canPressButtonMash = false;
		this._currentButtonMash.progress += e.pressVal;
		const pressSe = e.getSoundEffect(this._currentButtonMash.progress, e.total);
		if(pressSe) AudioManager.playSe(pressSe);
	}
};
//-----------------------------------------------------------------------------
// Check for button release
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkButtonMashRelease = function(e) {
	if(this._lastInputType === 'keyboard') {
		this._canPressButtonMash = !this.isKeyPressed(e.key);
	} else {
		const gamepad = this.getLastGamepad();
		if(gamepad) {
			this._canPressButtonMash = !gamepad.buttons?.[e.gamepadButton]?.pressed;
		}
	}
};
//-----------------------------------------------------------------------------
// Handling when button mash finishes
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.onButtonMashFinish = function(e) {
	$gameVariables.setValue(e.resultVar, this._currentButtonMash.progress);
	if(this._currentButtonMash.timer) $gameTimer.stop();
	this.stopButtonMash();
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZButtonMash_CGMZTemp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZButtonMash_CGMZTemp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_ButtonMash", "Start", this.pluginCommandButtonMashStart);
};
//-----------------------------------------------------------------------------
// Plugin Command - Start
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandButtonMashStart = function(args) {
	const e = $cgmzTemp.getButtonMashEvent(args.Id);
	const prefill = Number(args.Prefill);
	if(e) {
		$cgmzTemp.startButtonMash(args.Id, prefill);
		this.setWaitMode('CGMZ_buttonMash');
	}
};
//=============================================================================
// Game_Interpreter
//-----------------------------------------------------------------------------
// Wait for button mash to finish
//=============================================================================
//-----------------------------------------------------------------------------
// Also check if button mashing, if so keep waiting
//-----------------------------------------------------------------------------
const alias_CGMZButtonMash_GameInterpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
	if(this._waitMode === 'CGMZ_buttonMash') {
		if($cgmzTemp.isButtonMash()) return true;
	}
	return alias_CGMZButtonMash_GameInterpreter_updateWaitMode.call(this);
};
//=============================================================================
// Game_Player
//-----------------------------------------------------------------------------
// Restrict movement while button mashing
//=============================================================================
//-----------------------------------------------------------------------------
// Also check if button mashing, if so return false
//-----------------------------------------------------------------------------
const alias_CGMZButtonMash_GamePlayer_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
    if($cgmzTemp.isButtonMash()) {
        return false;
    }
    return alias_CGMZButtonMash_GamePlayer_canMove.call(this);
};
//=============================================================================
// Scene_Map
//-----------------------------------------------------------------------------
// Add button mash progress window
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize button mash check
//-----------------------------------------------------------------------------
const alias_CGMZButtonMash_SceneMap_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
    alias_CGMZButtonMash_SceneMap_initialize.call(this);
    this._cgmz_buttonMash = false;
};
//-----------------------------------------------------------------------------
// Also create button mash progress window
//-----------------------------------------------------------------------------
const alias_CGMZButtonMash_SceneMap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	this.CGMZ_createButtonMashProgressWindow();
    alias_CGMZButtonMash_SceneMap_createAllWindows.call(this);
};
//-----------------------------------------------------------------------------
// Handle creation of button mash progress window
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_createButtonMashProgressWindow = function() {
	const rect = this.CGMZ_buttonMashProgressWindowRect();
    this._CGMZ_buttonMashProgressWindow = new CGMZ_Window_ButtonMashProgress(rect);
    this.addChild(this._CGMZ_buttonMashProgressWindow);
};
//-----------------------------------------------------------------------------
// Rect for the button mash progress window
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_buttonMashProgressWindowRect = function() {
	return new Rectangle(0,0,0,0);
};
//-----------------------------------------------------------------------------
// Also update button mash window
//-----------------------------------------------------------------------------
const alias_CGMZButtonMash_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	alias_CGMZButtonMash_SceneMap_update.call(this);
	this.CGMZ_updateButtonMash();
};
//-----------------------------------------------------------------------------
// Update button mash window
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_updateButtonMash = function() {
	const isButtonMash = $cgmzTemp.isButtonMash();
	if(isButtonMash !== this._cgmz_buttonMash) {
		(isButtonMash) ? this.CGMZ_startButtonMash($cgmzTemp.getCurrentButtonMashId()) : this.CGMZ_stopButtonMash();
	}
};
//-----------------------------------------------------------------------------
// Start a button mash
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_startButtonMash = function(id) {
	this._cgmz_buttonMash = true;
    this._CGMZ_buttonMashProgressWindow.startMash(id);
};
//-----------------------------------------------------------------------------
// Stop a button mash
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_stopButtonMash = function() {
	this._cgmz_buttonMash = false;
    this._CGMZ_buttonMashProgressWindow.stopMash();
};
//=============================================================================
// Scene_Battle
//-----------------------------------------------------------------------------
// Add button mash progress window
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize button mash check
//-----------------------------------------------------------------------------
const alias_CGMZButtonMash_SceneBattle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
    alias_CGMZButtonMash_SceneBattle_initialize.call(this);
    this._cgmz_buttonMash = false;
	this._cgmz_buttonMashVar = 0;
};
//-----------------------------------------------------------------------------
// Also create button mash progress window
//-----------------------------------------------------------------------------
const alias_CGMZButtonMash_SceneBattle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    alias_CGMZButtonMash_SceneBattle_createAllWindows.call(this);
	this.CGMZ_createButtonMashProgressWindow();
};
//-----------------------------------------------------------------------------
// Handle creation of button mash progress window
//-----------------------------------------------------------------------------
Scene_Battle.prototype.CGMZ_createButtonMashProgressWindow = function() {
	const rect = this.CGMZ_buttonMashProgressWindowRect();
    this._CGMZ_buttonMashProgressWindow = new CGMZ_Window_ButtonMashProgress(rect);
    this.addWindow(this._CGMZ_buttonMashProgressWindow);
};
//-----------------------------------------------------------------------------
// Rect for the button mash progress window
//-----------------------------------------------------------------------------
Scene_Battle.prototype.CGMZ_buttonMashProgressWindowRect = function() {
	return new Rectangle(0,0,0,0);
};
//-----------------------------------------------------------------------------
// Also update button mash window
//-----------------------------------------------------------------------------
const alias_CGMZButtonMash_SceneBattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	alias_CGMZButtonMash_SceneBattle_update.call(this);
	this.CGMZ_updateButtonMash();
};
//-----------------------------------------------------------------------------
// Update button mash window
//-----------------------------------------------------------------------------
Scene_Battle.prototype.CGMZ_updateButtonMash = function() {
	const isButtonMash = $cgmzTemp.isButtonMash();
	if(isButtonMash !== this._cgmz_buttonMash) {
		(isButtonMash) ? this.CGMZ_startButtonMash() : this.CGMZ_stopButtonMash();
	}
};
//-----------------------------------------------------------------------------
// Hide input window visibility while button mash
//-----------------------------------------------------------------------------
const alias_CGMZButtonMash_SceneBattle_updateInputWindowVisibility = Scene_Battle.prototype.updateInputWindowVisibility;
Scene_Battle.prototype.updateInputWindowVisibility = function() {
	if(this._cgmz_buttonMash) {
		this.closeCommandWindows();
		this.hideSubInputWindows();
	} else {
		alias_CGMZButtonMash_SceneBattle_updateInputWindowVisibility.call(this);
	}
};
//-----------------------------------------------------------------------------
// Change escape command to start a button mash
//-----------------------------------------------------------------------------
const alias_CGMZButtonMash_SceneBattle_commandEscape = Scene_Battle.prototype.commandEscape;
Scene_Battle.prototype.commandEscape = function() {
	const mashEvent = $cgmzTemp.getButtonMashEvent(CGMZ.ButtonMash.EscapeId);
	if(CGMZ.ButtonMash.EscapeId && mashEvent) {
		const ratio = (CGMZ.ButtonMash.EscapePrefill) ? BattleManager._escapeRatio : 0;
		const prefill = (mashEvent.total * ratio).clamp(0, mashEvent.total - 1);
		$cgmzTemp.startButtonMash(CGMZ.ButtonMash.EscapeId, prefill);
	} else {
		alias_CGMZButtonMash_SceneBattle_commandEscape.call(this);
	}
};
//-----------------------------------------------------------------------------
// Start a button mash
//-----------------------------------------------------------------------------
Scene_Battle.prototype.CGMZ_startButtonMash = function() {
	const e = $cgmzTemp.getButtonMashEvent(CGMZ.ButtonMash.EscapeId);
	this._cgmz_buttonMashVar = e.resultVar;
	this._cgmz_buttonMash = true;
    this._CGMZ_buttonMashProgressWindow.startMash(CGMZ.ButtonMash.EscapeId);
};
//-----------------------------------------------------------------------------
// Stop a button mash
//-----------------------------------------------------------------------------
Scene_Battle.prototype.CGMZ_stopButtonMash = function() {
	this._cgmz_buttonMash = false;
    this._CGMZ_buttonMashProgressWindow.stopMash();
	const tempRatio = BattleManager._escapeRatio;
	if($gameVariables.value(this._cgmz_buttonMashVar) >= 50) {
		BattleManager._escapeRatio = 1;
	} else {
		BattleManager._escapeRatio = 0;
	}
	alias_CGMZButtonMash_SceneBattle_commandEscape.call(this);
	BattleManager._escapeRatio = tempRatio;
};
//=============================================================================
// CGMZ_Window_ButtonMashProgress
//-----------------------------------------------------------------------------
// Window displaying button mash progress
//=============================================================================
function CGMZ_Window_ButtonMashProgress() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_ButtonMashProgress.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_ButtonMashProgress.prototype.constructor = CGMZ_Window_ButtonMashProgress;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_ButtonMashProgress.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.ButtonMash.DefaultWindowBackground) this.CGMZ_setWindowBackground(CGMZ.ButtonMash.DefaultWindowBackground);
	if(Imported.CGMZ_WindowSettings && CGMZ.ButtonMash.DefaultWindowSettings) this.CGMZ_setWindowSettings(CGMZ.ButtonMash.DefaultWindowSettings);
	this._gaugeRect = new Rectangle(0, 0, 0, 0);
	this._touchUISprite = new CGMZ_Sprite_ButtonMashTouch();
	this.addInnerChild(this._touchUISprite);
	this.clearData();
	this.hide();
};
//-----------------------------------------------------------------------------
// Clear Button Mash Data
//-----------------------------------------------------------------------------
CGMZ_Window_ButtonMashProgress.prototype.clearData = function() {
	this._flashTimer = 0;
	this._flashCount = 0;
	this._id = "";
	this.contents.clear();
	this._touchUISprite.hide();
};
//-----------------------------------------------------------------------------
// Start the button mash process
//-----------------------------------------------------------------------------
CGMZ_Window_ButtonMashProgress.prototype.startMash = function(id) {
	this.clearData();
	const e = $cgmzTemp.getButtonMashEvent(id);
	if(e && id) {
		this._id = id;
		this.setupWindowSize(e);
		this.loadTouchUISprite(e);
		this.show();
	}
};
//----------------------------------------------------------------------------
// Setup the window size and customizations
//-----------------------------------------------------------------------------
CGMZ_Window_ButtonMashProgress.prototype.setupWindowSize = function(mashEvent) {
	const width = (mashEvent.windowWidth) ? Graphics.boxWidth * (mashEvent.windowWidth / 100.0) : Graphics.boxWidth * (CGMZ.ButtonMash.WindowWidth / 100.0);
	let height = mashEvent.windowHeight || CGMZ.ButtonMash.WindowHeight;
	height += (!!mashEvent.touchUISprite && ConfigManager.touchUI) ? mashEvent.touchUIHeight : 0;
	const x = ((Graphics.boxWidth - width) / 2) + mashEvent.windowXOffset;
	const y = (Graphics.boxHeight * 0.3) + mashEvent.windowYOffset;
	this.move(x, y, width, height);
	this.createContents();
	const gaugeHeight = (mashEvent.gaugeHeight) ? mashEvent.gaugeHeight : CGMZ.ButtonMash.GaugeHeight;
	this._gaugeRect = new Rectangle(0, this.lineHeight() + mashEvent.gaugeYOffset, this.contents.width, gaugeHeight);
};
//----------------------------------------------------------------------------
// Try to load touch ui sprite
//-----------------------------------------------------------------------------
CGMZ_Window_ButtonMashProgress.prototype.loadTouchUISprite = function(mashEvent) {
	if(mashEvent.touchUISprite) {
		this._touchUISprite.loadTouchUISpriteData(mashEvent);
		this._touchUISprite.setContentsWidth(this.contents.width);
		this._touchUISprite.show();
	} else {
		this._touchUISprite.hide();
	}
	this._touchUISprite.y = this._gaugeRect.y + this._gaugeRect.height + 4;
};
//----------------------------------------------------------------------------
// Stop the button mash process
//-----------------------------------------------------------------------------
CGMZ_Window_ButtonMashProgress.prototype.stopMash = function() {
	this._id = "";
	this.contents.clear();
	this.hide();
};
//-----------------------------------------------------------------------------
// Update the window
//-----------------------------------------------------------------------------
CGMZ_Window_ButtonMashProgress.prototype.update = function() {
	if(this.visible) {
		const e = $cgmzTemp.getButtonMashEvent(this._id);
		if(this._id && e) {
			Window_Base.prototype.update.call(this);
			this.updateFlash(e.flashTime);
			this.refresh(e);
		}
	}
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_ButtonMashProgress.prototype.refresh = function(e) {
	if(!this.visible) return;
	this.contents.clear();
	const progress = $cgmzTemp.getButtonMashProgress();
	if($cgmzTemp._lastInputType === 'keyboard') {
		this.CGMZ_drawTextLine(e.keyboardText, 0, 0, this.contents.width, "center");
	} else {
		this.CGMZ_drawTextLine(e.gamepadText, 0, 0, this.contents.width, "center");
	}
	const flashIconIndex = this.getFlashIcon(e);
	const rate = progress / e.total;
	this.CGMZ_drawGauge(this._gaugeRect, rate, ColorManager.textColor(e.color1), ColorManager.textColor(e.color2));
	if(e.leftText) {
		const left = e.leftText.replace('%flash%', `\\i[${flashIconIndex}]`).replace('%progress%', progress).replace('%total%', e.total).replace('%percent%', Math.round(rate * 100));
		this.CGMZ_drawTextLine(left, 0, this._gaugeRect.y, this.contents.width, "left");
	}
	if(e.centerText) {
		const center = e.centerText.replace('%flash%', `\\i[${flashIconIndex}]`).replace('%progress%', progress).replace('%total%', e.total).replace('%percent%', Math.round(rate * 100));
		this.CGMZ_drawTextLine(center, 0, this._gaugeRect.y, this.contents.width, "center");
	}
	if(e.rightText) {
		const right = e.rightText.replace('%flash%', `\\i[${flashIconIndex}]`).replace('%progress%', progress).replace('%total%', e.total).replace('%percent%', Math.round(rate * 100));
		this.CGMZ_drawTextLine(right, 0, this._gaugeRect.y, this.contents.width, "right");
	}
};
//-----------------------------------------------------------------------------
// Get the flashing icon to use
//-----------------------------------------------------------------------------
CGMZ_Window_ButtonMashProgress.prototype.getFlashIcon = function(e) {
	const index = this._flashCount % 2;
	if($cgmzTemp._lastInputType === 'keyboard') return e.keyIcons[index];
	return e.gamepadIcons[index];
};
//-----------------------------------------------------------------------------
// Update the flash
//-----------------------------------------------------------------------------
CGMZ_Window_ButtonMashProgress.prototype.updateFlash = function(flashTime) {
	this._flashTimer++;
	if(flashTime <= this._flashTimer) {
		this._flashTimer = 0;
		this._flashCount++;
	}
};
//=============================================================================
// CGMZ_Sprite_ButtonMashTouch
//-----------------------------------------------------------------------------
// Sprite that handles touch ui input
//=============================================================================
function CGMZ_Sprite_ButtonMashTouch() {
	this.initialize(...arguments);
}
CGMZ_Sprite_ButtonMashTouch.prototype = Object.create(Sprite_Clickable.prototype);
CGMZ_Sprite_ButtonMashTouch.prototype.constructor = CGMZ_Sprite_ButtonMashTouch;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Sprite_ButtonMashTouch.prototype.initialize = function() {
	Sprite_Clickable.prototype.initialize.call(this);
	this._cgmzNormalBitmap = null;
	this._cgmzPressedBitmap = null;
	this._showingPressedImage = false;
	this._mainContentsWidth = 0;
};
//-----------------------------------------------------------------------------
// Load bitmaps
//-----------------------------------------------------------------------------
CGMZ_Sprite_ButtonMashTouch.prototype.loadTouchUISpriteData = function(mashEvent) {
	const bitmapNormal = CGMZ_Utils.getImageData(mashEvent.touchUISprite, "img");
	const bitmapPressed = CGMZ_Utils.getImageData(mashEvent.touchUIPressed, "img");
	this._cgmzNormalBitmap = ImageManager.loadBitmap(bitmapNormal.folder, bitmapNormal.filename);
	this._cgmzPressedBitmap = ImageManager.loadBitmap(bitmapPressed.folder, bitmapPressed.filename);
	this.bitmap = this._cgmzNormalBitmap;
};
//-----------------------------------------------------------------------------
// Set contents width
//-----------------------------------------------------------------------------
CGMZ_Sprite_ButtonMashTouch.prototype.setContentsWidth = function(width) {
	this._mainContentsWidth = width;
};
//-----------------------------------------------------------------------------
// Update sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_ButtonMashTouch.prototype.update = function() {
	if(this.visible && this._cgmzNormalBitmap) {
		Sprite_Clickable.prototype.update.call(this);
		if(this._showingPressedImage && !this._pressed) {
			this.bitmap = this._cgmzNormalBitmap;
			this._showingPressedImage = false;
		}
		this.x = (this._mainContentsWidth - this.bitmap.width) / 2
	}
};
//-----------------------------------------------------------------------------
// Processing for when the object is clicked
//-----------------------------------------------------------------------------
CGMZ_Sprite_ButtonMashTouch.prototype.onClick = function() {
	this.bitmap = this._cgmzNormalBitmap;
	this._showingPressedImage = false;
	const e = $cgmzTemp.getButtonMashEvent($cgmzTemp._currentButtonMash.id);
	if(e && $cgmzTemp._canPressButtonMash) {
		$cgmzTemp._currentButtonMash.progress += e.pressVal;
		const pressSe = e.getSoundEffect($cgmzTemp._currentButtonMash.progress, e.total);
		if(pressSe) AudioManager.playSe(pressSe);
	}
};
//-----------------------------------------------------------------------------
// Processing for when the object is pressed
//-----------------------------------------------------------------------------
CGMZ_Sprite_ButtonMashTouch.prototype.onPress = function() {
	if(!this._showingPressedImage && this._cgmzPressedBitmap) {
		this.bitmap = this._cgmzPressedBitmap;
	}
	this._showingPressedImage = true;
};