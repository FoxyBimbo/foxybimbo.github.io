/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/powermeter/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Press a button when a meter is filled up for max power
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: Press a button when a meter is filled up for maximum power.
 * Wait too long and it will go back down again. A simple minigame common in
 * many games for many different mechanics, now in RPG Maker for you to use as
 * you see fit.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ---------------------------Alpha Notes--------------------------------------
 * This plugin has many planned improvements over the course of its alpha
 * stage, including:
 *
 * 1) Make the power meter work in battle
 * 2) Touch UI support
 * 3) Statistics tracking for things like events passed / attempted, etc.
 * 4) Further customization of power meter
 * ------------------------------Set Up----------------------------------------
 * Set up your power meter events in the Events parameter, and note down the
 * id you assign to your power meter event. Then, use the Plugin Command 
 * "Start" to start a power meter event. Provide the id to your plugin command,
 * and it will start that id's power meter event.
 *
 * After the power meter ends, the result will be stored in the result variable
 * for use in eventing. The event commands will pick up after the plugin
 * command.
 * -------------------------Plugin Commands------------------------------------
 * The following plugin commands are supported:
 * 
 * • Start
 * Starts a power meter event. Set the various properties up in the plugin
 * parameters first, as this plugin command only accepts an id.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_PowerMeter.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 *
 * @command Start
 * @desc Start a power meter event
 *
 * @arg Id
 * @desc The id from the events plugin parameters to use
 *
 * @param Mandatory Setup
 *
 * @param Events
 * @parent Mandatory Setup
 * @type struct<Event>[]
 * @default []
 * @desc Set up power meter event properties throughout your game, re-usable by id
  *
 * @param Result Variable
 * @parent Mandatory Setup
 * @type variable
 * @default 0
 * @desc The variable id to store the result of the power meter event in
 *
 * @param Integrations
 *
 * @param Default Window Settings
 * @parent Integrations
 * @desc A [CGMZ] Window Settings preset id to use for the power meter window as a default
 *
 * @param Default Window Background
 * @parent Integrations
 * @desc A [CGMZ] Window Backgrounds preset id to use for the power meter window as a default
*/
/*~struct~Event:
 * @param Id
 * @desc The id of the power meter event
 *
 * @param Controls
 *
 * @param Key
 * @parent Controls
 * @default z
 * @desc The keyboard button that needs to be pressed to stop the meter
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
 * @desc The gamepad button that needs to be pressed to stop the meter
 *
 * @param Mechanics
 *
 * @param Time At Max
 * @parent Mechanics
 * @type number
 * @default 5
 * @desc How many frames will the power meter wait at maximum power before resetting?
 *
 * @param Gain Speed
 * @parent Mechanics
 * @type number
 * @default 5
 * @desc The amount (percentage) of the bar that is filled every frame while gaining power
 *
 * @param Gain Variation
 * @parent Mechanics
 * @type number
 * @default 0
 * @max 100
 * @min 0
 * @desc A random amount to add onto the default gain speed, if you want the gain to be inconsistent and harder to time
 *
 * @param Decline Speed
 * @parent Mechanics
 * @type number
 * @default 100
 * @max 100
 * @min 0
 * @desc The amount (percentage) of the bar that is unfilled every frame while losing power
 *
 * @param Customization
 *
 * @param Gauge Color 1
 * @parent Customization
 * @type color
 * @default 29
 * @desc The first color in the gradient progress bar
 *
 * @param Gauge Color 2
 * @parent Customization
 * @type color
 * @default 28
 * @desc The second color in the gradient progress bar
 *
 * @param Success Percent
 * @parent Customization
 * @type number
 * @min 0
 * @max 101
 * @default 101
 * @desc If the gauge is >= this percentage, it will instead use the success color params
 *
 * @param Success Color 1
 * @parent Customization
 * @type color
 * @default 29
 * @desc The first color in the gradient progress bar (when using success color)
 *
 * @param Success Color 2
 * @parent Customization
 * @type color
 * @default 28
 * @desc The second color in the gradient progress bar (when using success color)
 *
 * @param Draw Percent Text
 * @parent Customization
 * @type boolean
 * @default false
 * @desc If true, will draw percentage text in the middle of the progress gauge
 *
 * @param Window Text
 *
 * @param Keyboard Text
 * @parent Window Text
 * @default Press Z to stop
 * @desc The text to show above the progress bar (when last input keyboard)
 *
 * @param Gamepad Text
 * @parent Window Text
 * @default Press A to stop
 * @desc The text to show above the progress bar (when last input gamepad)
*/
Imported.CGMZ_PowerMeter = true;
CGMZ.Versions["Power Meter"] = "Alpha";
CGMZ.PowerMeter = {};
CGMZ.PowerMeter.parameters = PluginManager.parameters('CGMZ_PowerMeter');
CGMZ.PowerMeter.DefaultWindowSettings = CGMZ.PowerMeter.parameters["Default Window Settings"];
CGMZ.PowerMeter.DefaultWindowBackground = CGMZ.PowerMeter.parameters["Default Window Background"];
CGMZ.PowerMeter.ResultVariable = Number(CGMZ.PowerMeter.parameters["Result Variable"]);
CGMZ.PowerMeter.Events = CGMZ_Utils.parseJSON(CGMZ.PowerMeter.parameters["Events"], [], "[CGMZ] Power Meter", "Your Events parameter was set up incorrectly and could not be read.");
//=============================================================================
// CGMZ_PowerMeterEvent
//-----------------------------------------------------------------------------
// Handle temp power meter data
//=============================================================================
function CGMZ_PowerMeterEvent() {
	this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize power meter event
//-----------------------------------------------------------------------------
CGMZ_PowerMeterEvent.prototype.initialize = function(data) {
	this.id = data.Id;
	this.key = data.Key;
	this.keyboardText = data["Keyboard Text"];
	this.gamepadText = data["Gamepad Text"];
	this.gamepadButton = Number(data.Gamepad);
	this.timeAtMax = Number(data["Time At Max"]);
	this.gainSpeed = Number(data["Gain Speed"]);
	this.gainVariation = Number(data["Gain Variation"]);
	this.declineSpeed = Number(data["Decline Speed"]);
	this.gaugeColor1 = Number(data["Gauge Color 1"]);
	this.gaugeColor2 = Number(data["Gauge Color 2"]);
	this.successColorPercent = Number(data["Success Percent"]);
	this.successColor1 = Number(data["Success Color 1"]);
	this.successColor2 = Number(data["Success Color 2"]);
	this.drawPercentText = (data["Draw Percent Text"] === 'true');
};
//-----------------------------------------------------------------------------
// Get the gain speed
//-----------------------------------------------------------------------------
CGMZ_PowerMeterEvent.prototype.getGainSpeed = function() {
	return this.gainSpeed + Math.randomInt(this.gainVariation + 1);
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Create data, register and handling for plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize power meter data
//-----------------------------------------------------------------------------
const alias_CGMZPowerMeter_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZPowerMeter_CGMZTemp_createPluginData.call(this);
	this.initPowerMeter();
};
//-----------------------------------------------------------------------------
// Initialize power meter data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initPowerMeter = function() {
	this._powerMeterEvents = {};
	this._currentPowerMeter = {value: 0, phase: 'gain', wait: 0, id: ""};
	for(const json of CGMZ.PowerMeter.Events) {
		const e = CGMZ_Utils.parseJSON(json, null, "[CGMZ] Power Meter", "One of your Events parameters was set up incorrectly and could not be read.");
		if(!e) continue;
		this._powerMeterEvents[e.Id] = new CGMZ_PowerMeterEvent(e);
	}
};
//-----------------------------------------------------------------------------
// Get power meter data by id
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getPowerMeterEvent = function(id) {
	return this._powerMeterEvents[id];
};
//-----------------------------------------------------------------------------
// Get current power meter event
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getCurrentPowerMeterEvent = function() {
	return this.getPowerMeterEvent(this._currentPowerMeter.id);
};
//-----------------------------------------------------------------------------
// Get current power meter event
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getCurrentPowerMeterValue = function() {
	return this._currentPowerMeter.value;
};
//-----------------------------------------------------------------------------
// Check if currently in power meter event
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.isPowerMeter = function() {
	return !!this._currentPowerMeter.id;
};
//-----------------------------------------------------------------------------
// Start a power meter event
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.startPowerMeter = function(id) {
	this._currentPowerMeter = {value: 0, phase: 'gain', wait: 0, id: id};
};
//-----------------------------------------------------------------------------
// Stop a power meter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.stopPowerMeter = function() {
	$gameVariables.setValue(CGMZ.PowerMeter.ResultVariable, this._currentPowerMeter.value);
	this._currentPowerMeter = {value: 0, phase: 'gain', wait: 0, id: ""};
};
//-----------------------------------------------------------------------------
// Update power meter too
//-----------------------------------------------------------------------------
const alias_CGMZPowerMeter_CGMZTemp_update = CGMZ_Temp.prototype.update;
CGMZ_Temp.prototype.update = function() {
	alias_CGMZPowerMeter_CGMZTemp_update.call(this);
	if(this.isPowerMeter()) this.updatePowerMeter();
};
//-----------------------------------------------------------------------------
// Update the power meter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.updatePowerMeter = function() {
	const e = this.getCurrentPowerMeterEvent();
	if(!e) return;
	switch(this._currentPowerMeter.phase) {
		case 'gain':
			this._currentPowerMeter.value = (this._currentPowerMeter.value + e.getGainSpeed()).clamp(0, 100);
			if(this._currentPowerMeter.value === 100) {
				this._currentPowerMeter.wait = 0;
				this._currentPowerMeter.phase = 'wait';
			}
			break;
		case 'decline':
			this._currentPowerMeter.value = (this._currentPowerMeter.value - e.declineSpeed).clamp(0, 100);
			if(this._currentPowerMeter.value === 0) this._currentPowerMeter.phase = 'gain';
			break;
		case 'wait':
			this._currentPowerMeter.wait++;
			if(this._currentPowerMeter.wait >= e.timeAtMax) {
				this._currentPowerMeter.wait = 0;
				this._currentPowerMeter.phase = 'decline';
			}
			break;
	}
	this.checkPowerMeterPress();
};
//-----------------------------------------------------------------------------
// Check for button press
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkPowerMeterPress = function() {
	const e = this.getCurrentPowerMeterEvent();
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
		this.stopPowerMeter();
	}
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZPowerMeter_CGMZTemp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZPowerMeter_CGMZTemp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_PowerMeter", "Start", this.pluginCommandPowerMeterStart);
};
//-----------------------------------------------------------------------------
// Plugin Command - Start
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPowerMeterStart = function(args) {
	const e = $cgmzTemp.getPowerMeterEvent(args.Id);
	if(e) {
		$cgmzTemp.startPowerMeter(args.Id);
		this.setWaitMode('CGMZ_PowerMeter');
	}
};
//=============================================================================
// Game_Interpreter
//-----------------------------------------------------------------------------
// Wait for power meter to finish
//=============================================================================
//-----------------------------------------------------------------------------
// Also check if power meter active, if so keep waiting
//-----------------------------------------------------------------------------
const alias_CGMZPowerMeter_GameInterpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
	if(this._waitMode === 'CGMZ_PowerMeter') {
		if($cgmzTemp.isPowerMeter()) return true;
	}
	return alias_CGMZPowerMeter_GameInterpreter_updateWaitMode.call(this);
};
//=============================================================================
// Game_Player
//-----------------------------------------------------------------------------
// Restrict movement while power meter is active
//=============================================================================
//-----------------------------------------------------------------------------
// Also check if power meter active, if so return false
//-----------------------------------------------------------------------------
const alias_CGMZPowerMeter_GamePlayer_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
    if($cgmzTemp.isPowerMeter()) return false;
    return alias_CGMZPowerMeter_GamePlayer_canMove.call(this);
};
//=============================================================================
// Scene_Map
//-----------------------------------------------------------------------------
// Add power meter progress window
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize power meter check
//-----------------------------------------------------------------------------
const alias_CGMZPowerMeter_SceneMap_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
    alias_CGMZPowerMeter_SceneMap_initialize.call(this);
    this._cgmz_powerMeter = false;
};
//-----------------------------------------------------------------------------
// Also create power meter progress window
//-----------------------------------------------------------------------------
const alias_CGMZPowerMeter_SceneMap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	this.CGMZ_createPowerMeterProgressWindow();
    alias_CGMZPowerMeter_SceneMap_createAllWindows.call(this);
};
//-----------------------------------------------------------------------------
// Handle creation of power meter progress window
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_createPowerMeterProgressWindow = function() {
	const rect = this.CGMZ_powerMeterProgressWindowRect();
    this._CGMZ_powerMeterProgressWindow = new CGMZ_Window_PowerMeterProgress(rect);
    this.addWindow(this._CGMZ_powerMeterProgressWindow);
};
//-----------------------------------------------------------------------------
// Rect for the power meter progress window
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_powerMeterProgressWindowRect = function() {
	const width = Graphics.boxWidth * 0.5;
	const height = this.calcWindowHeight(2, false);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight * 0.3;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Also update power meter window
//-----------------------------------------------------------------------------
const alias_CGMZPowerMeter_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	alias_CGMZPowerMeter_SceneMap_update.call(this);
	this.CGMZ_updatePowerMeter();
};
//-----------------------------------------------------------------------------
// Update power meter window
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_updatePowerMeter = function() {
	const isPowerMeter = $cgmzTemp.isPowerMeter();
	if(isPowerMeter !== this._cgmz_powerMeter) {
		(isPowerMeter) ? this.CGMZ_startPowerMeter() : this.CGMZ_stopPowerMeter();
	}
};
//-----------------------------------------------------------------------------
// Start a power meter
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_startPowerMeter = function(id) {
	this._cgmz_powerMeter = true;
    this._CGMZ_powerMeterProgressWindow.startPowerMeter();
};
//-----------------------------------------------------------------------------
// Stop a power meter
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_stopPowerMeter = function() {
	this._cgmz_powerMeter = false;
    this._CGMZ_powerMeterProgressWindow.stopPowerMeter();
};
//=============================================================================
// CGMZ_Window_PowerMeterProgress
//-----------------------------------------------------------------------------
// Window displaying power progress
//=============================================================================
function CGMZ_Window_PowerMeterProgress() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_PowerMeterProgress.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_PowerMeterProgress.prototype.constructor = CGMZ_Window_PowerMeterProgress;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_PowerMeterProgress.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.PowerMeter.DefaultWindowBackground) this.CGMZ_setWindowBackground(CGMZ.PowerMeter.DefaultWindowBackground);
	if(Imported.CGMZ_WindowSettings && CGMZ.PowerMeter.DefaultWindowSettings) this.CGMZ_setWindowSettings(CGMZ.PowerMeter.DefaultWindowSettings);
	const gaugeRect = new Rectangle(0, this.lineHeight(), this.contents.width, this.lineHeight());
	const gauge = new CGMZ_Sprite_PowerMeterGauge(gaugeRect, null);
	this.addInnerChild(gauge);
	this.clearData();
	this.hide();
};
//-----------------------------------------------------------------------------
// Clear Power Meter Data
//-----------------------------------------------------------------------------
CGMZ_Window_PowerMeterProgress.prototype.clearData = function() {
	this.contents.clear();
};
//-----------------------------------------------------------------------------
// Start the power meter process
//-----------------------------------------------------------------------------
CGMZ_Window_PowerMeterProgress.prototype.startPowerMeter = function() {
	this.clearData();
	const e = $cgmzTemp.getCurrentPowerMeterEvent();
	if(e) {
		this.show();
	}
};
//----------------------------------------------------------------------------
// Stop the power meter process
//-----------------------------------------------------------------------------
CGMZ_Window_PowerMeterProgress.prototype.stopPowerMeter = function() {
	this.clearData();
	this.hide();
};
//-----------------------------------------------------------------------------
// Update the window
//-----------------------------------------------------------------------------
CGMZ_Window_PowerMeterProgress.prototype.update = function() {
	if(this.visible) {
		const e = $cgmzTemp.getCurrentPowerMeterEvent();
		if(e) {
			Window_Base.prototype.update.call(this);
			this.refresh();
		}
	}
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_PowerMeterProgress.prototype.refresh = function() {
	if(!this.visible) return;
	this.contents.clear();
	const e = $cgmzTemp.getCurrentPowerMeterEvent();
	if($cgmzTemp._lastInputType === 'keyboard') {
		this.CGMZ_drawTextLine(e.keyboardText, 0, 0, this.contents.width, "center");
	} else {
		this.CGMZ_drawTextLine(e.gamepadText, 0, 0, this.contents.width, "center");
	}
};
//=============================================================================
// CGMZ_Sprite_PowerMeterGauge
//-----------------------------------------------------------------------------
// Window displaying power progress
//=============================================================================
function CGMZ_Sprite_PowerMeterGauge() {
	this.initialize(...arguments);
}
CGMZ_Sprite_PowerMeterGauge.prototype = Object.create(Sprite_Gauge.prototype);
CGMZ_Sprite_PowerMeterGauge.prototype.constructor = CGMZ_Sprite_PowerMeterGauge;
//-----------------------------------------------------------------------------
// Initialize the sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_PowerMeterGauge.prototype.initialize = function(rect) {
	this.initRect(rect)
	Sprite_Gauge.prototype.initialize.call(this);
	this.setLocation();
};
//-----------------------------------------------------------------------------
// Initialize the sprite rect
//-----------------------------------------------------------------------------
CGMZ_Sprite_PowerMeterGauge.prototype.initRect = function(rect) {
	this._gaugeRect = rect;
};
//-----------------------------------------------------------------------------
// Set the sprite location
//-----------------------------------------------------------------------------
CGMZ_Sprite_PowerMeterGauge.prototype.setLocation = function() {
	this.move(this._gaugeRect.x, this._gaugeRect.y);
};
//-----------------------------------------------------------------------------
// Set the sprite bitmap width
//-----------------------------------------------------------------------------
CGMZ_Sprite_PowerMeterGauge.prototype.bitmapWidth = function() {
    return this._gaugeRect.width;
};
//-----------------------------------------------------------------------------
// Set the sprite bitmap height
//-----------------------------------------------------------------------------
CGMZ_Sprite_PowerMeterGauge.prototype.bitmapHeight = function() {
    return this._gaugeRect.height;
};
//-----------------------------------------------------------------------------
// Update the gauge
//-----------------------------------------------------------------------------
CGMZ_Sprite_PowerMeterGauge.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateBitmap();
	this.updatePercentText();
};
//-----------------------------------------------------------------------------
// Update the gauge bitmap
//-----------------------------------------------------------------------------
CGMZ_Sprite_PowerMeterGauge.prototype.updateBitmap = function() {
	this.bitmap.clear();
    const rate = $cgmzTemp.getCurrentPowerMeterValue() / 100.0;
	const x = 0;
	const y = 0;
	const width = this._gaugeRect.width;
	const height = this._gaugeRect.height;
    const fillW = Math.floor((width - 2) * rate);
    const fillH = height - 2;
    const color0 = this.gaugeBackColor();
    const color1 = this.gaugeColor1(rate);
    const color2 = this.gaugeColor2(rate);
    this.bitmap.fillRect(x, y, width, height, color0);
    this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH, color1, color2);
};
//-----------------------------------------------------------------------------
// Update the gauge bitmap percent text
//-----------------------------------------------------------------------------
CGMZ_Sprite_PowerMeterGauge.prototype.updatePercentText = function() {
	const e = $cgmzTemp.getCurrentPowerMeterEvent();
	if(!(e?.drawPercentText)) return;
    const percent = $cgmzTemp.getCurrentPowerMeterValue();
	const x = 0;
	const y = 0;
	const width = this._gaugeRect.width;
	const height = this._gaugeRect.height;
    this.bitmap.drawText(percent + "%", x, y, width, height, 'center');
};
//-----------------------------------------------------------------------------
// Get the gauge color 1 by rate
//-----------------------------------------------------------------------------
CGMZ_Sprite_PowerMeterGauge.prototype.gaugeColor1 = function(rate) {
    const e = $cgmzTemp.getCurrentPowerMeterEvent();
	if(rate * 100 >= e.successColorPercent) {
		return ColorManager.textColor(e.successColor1);
	} else {
		return ColorManager.textColor(e.gaugeColor1);
	}
};
//-----------------------------------------------------------------------------
// Get the gauge color 2 by rate
//-----------------------------------------------------------------------------
CGMZ_Sprite_PowerMeterGauge.prototype.gaugeColor2 = function(rate) {
    const e = $cgmzTemp.getCurrentPowerMeterEvent();
	if(rate * 100 >= e.successColorPercent) {
		return ColorManager.textColor(e.successColor2);
	} else {
		return ColorManager.textColor(e.gaugeColor2);
	}
};