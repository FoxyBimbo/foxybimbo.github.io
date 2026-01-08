/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/gamepaddetected/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Show a brief window when a new gamepad is detected as input
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
 * Description: This plugin shows a simple window that automatically fades out
 * whenever a new gamepad input is detected. This helps let your player know
 * that their gamepad was detected and can be used for input.
 * ----------------------------------------------------------------------------
 * Documentation:
 * --------------------------Quick Start Guide---------------------------------
 * This plugin is pretty simple and mostly plug and play. You do not really
 * need to do anything before using the plugin as is, however please feel
 * free to look at the plugin parameters and customize your gamepad detected
 * window as you see fit.
 * -----------------------------Integrations-----------------------------------
 * This plugin has special functionality when used in combination with the
 * following [CGMZ] plugins:
 *
 * [CGMZ] Window Backgrounds
 * This plugin allows you to show a background image in any window, including
 * the gamepad detected window. This can even be an animated scrolling parallax
 * image.
 *
 * [CGMZ] Window Settings
 * This plugin allows you to customize any window's tone, padding, windowskin,
 * and more. This includes the Gamepad Detected window.
 * ----------------------------Plugin Commands---------------------------------
 * This plugin does not have any plugin commands
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add plugin to saved game and it will work as expected
 * ✓ Modify plugin parameters and have changes reflected in saved games
 * ✓ Remove plugin and saved games will continue to work as expected
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_GamepadDetected.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version adds the option to also show when the gamepad
 * disconnects. This can occur if the player unplugs it, or if there is a
 * problem that causes the gamepad to disconnect. This could provide feedback
 * to the player for why their gamepad controls stop working.
 *
 * You can set different text and play a different sound effect when the
 * disconnect event occurs. You can also now opt to not show either the
 * connect or disconnect event, in case you want only one event to be shown
 * to the player.
 *
 * This version also fixes a slight bug that could cause other plugins that
 * listen to gamepad connect events to not work.
 *
 * Version Alpha R2
 * - Added option to show when gamepad disconnects
 * - Added option to not show gamepad connect
 * - Fix bug with gamepad connect and other [CGMZ] plugins
 *
 * @param Mechanics
 * 
 * @param Show Connected
 * @parent Mechanics
 * @type boolean
 * @desc If true, will show a brief window when a gamepad is first connected
 * @default true
 * 
 * @param Show Disconnected
 * @parent Mechanics
 * @type boolean
 * @desc If true, will show a brief window when a gamepad loses connection
 * @default true
 * 
 * @param Fade In Speed
 * @parent Mechanics
 * @type number
 * @desc Amount of opacity to add each frame during fade in
 * @default 8
 * 
 * @param Display Time
 * @parent Mechanics
 * @type number
 * @desc Amount of frames to display the window. Does not include fade in / out time
 * @default 300
 * 
 * @param Fade Out Speed
 * @parent Mechanics
 * @type number
 * @desc Amount of opacity to add each frame during fade out
 * @default 8
 * 
 * @param Connect SE
 * @parent Mechanics
 * @type struct<SoundEffect>
 * @desc A Sound Effect to play when a controller is connected
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * 
 * @param Disconnect SE
 * @parent Mechanics
 * @type struct<SoundEffect>
 * @desc A Sound Effect to play when a controller is connected
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 *
 * @param Position Options
 * 
 * @param Window Origin
 * @parent Position Options
 * @type select
 * @option Bottom Left
 * @option Bottom Right
 * @option Top Left
 * @option Top Right
 * @desc The origin of the window
 * @default Bottom Left
 * 
 * @param X Offset
 * @parent Position Options
 * @type number
 * @min -9999
 * @desc Amount of pixels to add to the x coordinate of the window
 * @default 0
 * 
 * @param Y Offset
 * @parent Position Options
 * @type number
 * @min -9999
 * @desc Amount of pixels to add to the y coordinate of the window
 * @default 0
 * 
 * @param Width
 * @parent Position Options
 * @type number
 * @desc Width of the window as a percentage of screen size. If set to 0, will automatically adjust based on text length
 * @default 0
 * 
 * @param Height
 * @parent Position Options
 * @type number
 * @desc Number of text lines to make the window in terms of height
 * @default 1
 *
 * @param Text Options
 * 
 * @param Connected Text
 * @parent Text Options
 * @desc Text to display in the gamepad detected window when controller connects. Supports text codes.
 * @default Controller Detected
 * 
 * @param Disconnected Text
 * @parent Text Options
 * @desc Text to display in the gamepad detected window on disconnect. Supports text codes.
 * @default Controller Disconnected
 * 
 * @param Window Text Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Alignment of the text in the window
 * @default center
 *
 * @param Integrations
 * 
 * @param Window Background Preset
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use for the gamepad detected window
 * 
 * @param Window Settings Preset
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use for the gamepad detected window
*/
/*~struct~SoundEffect:
 * @param Name
 * @type file
 * @dir audio/se
 * @desc The sound effect file to play
 * 
 * @param Volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc The volume of the sound effect
 * 
 * @param Pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc The pitch of the sound effect
 * 
 * @param Pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The pan of the sound effect
*/
Imported.CGMZ_GamepadDetected = true;
CGMZ.Versions["Gamepad Detected"] = "Alpha R2";
CGMZ.GamepadDetected = {};
CGMZ.GamepadDetected.parameters = PluginManager.parameters('CGMZ_GamepadDetected');
CGMZ.GamepadDetected.WindowOrigin = CGMZ.GamepadDetected.parameters["Window Origin"];
CGMZ.GamepadDetected.ConnectedText = CGMZ.GamepadDetected.parameters["Connected Text"];
CGMZ.GamepadDetected.DisconnectedText = CGMZ.GamepadDetected.parameters["Disconnected Text"];
CGMZ.GamepadDetected.WindowTextAlignment = CGMZ.GamepadDetected.parameters["Window Text Alignment"];
CGMZ.GamepadDetected.WindowSettingsPreset = CGMZ.GamepadDetected.parameters["Window Settings Preset"];
CGMZ.GamepadDetected.WindowBackgroundPreset = CGMZ.GamepadDetected.parameters["Window Background Preset"];
CGMZ.GamepadDetected.DisplayTime = Number(CGMZ.GamepadDetected.parameters["Display Time"]);
CGMZ.GamepadDetected.FadeInSpeed = Number(CGMZ.GamepadDetected.parameters["Fade In Speed"]);
CGMZ.GamepadDetected.FadeOutSpeed = Number(CGMZ.GamepadDetected.parameters["Fade Out Speed"]);
CGMZ.GamepadDetected.Width = Number(CGMZ.GamepadDetected.parameters["Width"]);
CGMZ.GamepadDetected.Height = Number(CGMZ.GamepadDetected.parameters["Height"]);
CGMZ.GamepadDetected.XOffset = Number(CGMZ.GamepadDetected.parameters["X Offset"]);
CGMZ.GamepadDetected.YOffset = Number(CGMZ.GamepadDetected.parameters["Y Offset"]);
CGMZ.GamepadDetected.ShowConnected = (CGMZ.GamepadDetected.parameters["Show Connected"] === 'true');
CGMZ.GamepadDetected.ShowDisconnected = (CGMZ.GamepadDetected.parameters["Show Disconnected"] === 'true');
CGMZ.GamepadDetected.ConnectSE = CGMZ_Utils.parseSoundEffectJSON(CGMZ.GamepadDetected.parameters["Connect SE"], "[CGMZ] Gamepad Connected");
CGMZ.GamepadDetected.DisconnectSE = CGMZ_Utils.parseSoundEffectJSON(CGMZ.GamepadDetected.parameters["Disconnect SE"], "[CGMZ] Gamepad Connected");
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Handle gamepad connected
//=============================================================================
//-----------------------------------------------------------------------------
// Processing when gamepad is connected
//-----------------------------------------------------------------------------
const alias_CGMZGamepadDetected_CGMZTemp_onGamepadConnected = CGMZ_Temp.prototype.onGamepadConnected;
CGMZ_Temp.prototype.onGamepadConnected = function(event) {
	alias_CGMZGamepadDetected_CGMZTemp_onGamepadConnected.call(this, event);
	if(CGMZ.GamepadDetected.ShowConnected && this.gamepadConnectedType !== 'connect') {
		this.gamepadConnectedWindowRequested = true;
		this.gamepadConnectedType = 'connect';
	}
};
//-----------------------------------------------------------------------------
// Processing when gamepad is disconnected
//-----------------------------------------------------------------------------
const alias_CGMZGamepadDetected_CGMZTemp_onGamepadDisconnected = CGMZ_Temp.prototype.onGamepadDisconnected;
CGMZ_Temp.prototype.onGamepadDisconnected = function(event) {
	alias_CGMZGamepadDetected_CGMZTemp_onGamepadDisconnected.call(this, event);
	if(CGMZ.GamepadDetected.ShowDisconnected && this.gamepadConnectedType !== 'disconnect') {
		this.gamepadConnectedWindowRequested = true;
		this.gamepadConnectedType = 'disconnect';
	}
};
//=============================================================================
// Scene_Base
//-----------------------------------------------------------------------------
// Create Gamepad Detected window
//=============================================================================
//-----------------------------------------------------------------------------
// Create gamepad detected window after scene makes the window layer
//-----------------------------------------------------------------------------
const alias_CGMZGamepadDetected_SceneBase_createWindowLayer = Scene_Base.prototype.createWindowLayer;
Scene_Base.prototype.createWindowLayer = function() {
    alias_CGMZGamepadDetected_SceneBase_createWindowLayer.call(this);
	this.CGMZ_GamepadDetected_createWindow();
};
//-----------------------------------------------------------------------------
// Create gamepad detected window
//-----------------------------------------------------------------------------
Scene_Base.prototype.CGMZ_GamepadDetected_createWindow = function() {
	const rect = this.CGMZ_GamepadDetected_windowRect();
    this._cgmz_gamepadDetectedWindow = new CGMZ_Window_GamepadDetected(rect);
    this.addChild(this._cgmz_gamepadDetectedWindow);
};
//-----------------------------------------------------------------------------
// Rect for gamepad detected window
//-----------------------------------------------------------------------------
Scene_Base.prototype.CGMZ_GamepadDetected_windowRect = function() {
	return new Rectangle(0, 0, 0, 0);
};
//=============================================================================
// CGMZ_Window_GamepadDetected
//-----------------------------------------------------------------------------
// Gamepad Detected window that displays when game is autosaving
//=============================================================================
function CGMZ_Window_GamepadDetected() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_GamepadDetected.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_GamepadDetected.prototype.constructor = CGMZ_Window_GamepadDetected;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_GamepadDetected.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.GamepadDetected.WindowBackgroundPreset) this.CGMZ_setWindowBackground(CGMZ.GamepadDetected.WindowBackgroundPreset);
	if(Imported.CGMZ_WindowSettings && CGMZ.GamepadDetected.WindowSettingsPreset) this.CGMZ_setWindowSettings(CGMZ.GamepadDetected.WindowSettingsPreset);
    this.opacity = 0;
    this.contentsOpacity = 0;
	if(this._dimmerSprite) this._dimmerSprite.opacity = 0;
    this._showCount = 0;
	this._phase = '';
};
//-----------------------------------------------------------------------------
// Update for fade in/out
//-----------------------------------------------------------------------------
CGMZ_Window_GamepadDetected.prototype.checkIfRequested = function() {
	if($cgmzTemp?.gamepadConnectedWindowRequested) {
		$cgmzTemp.gamepadConnectedWindowRequested = false;
		const se = ($cgmzTemp.gamepadConnectedType === 'connect') ? CGMZ.GamepadDetected.ConnectSE : CGMZ.GamepadDetected.DisconnectSE;
		this.playConnectSe(se);
		this.setupWindowPosition();
		this.createContents();
		if(this._cgmz_bgType === 1) this.setBackgroundType(1);
		this.contents.clear();
		const string = ($cgmzTemp.gamepadConnectedType === 'connect') ? CGMZ.GamepadDetected.ConnectedText : CGMZ.GamepadDetected.DisconnectedText;
		this.CGMZ_drawTextLine(string, 0, 0, this.contents.width, CGMZ.GamepadDetected.WindowTextAlignment);
		this._phase = 'fadeIn';
	}
};
//-----------------------------------------------------------------------------
// Play the connect sound effect
//-----------------------------------------------------------------------------
CGMZ_Window_GamepadDetected.prototype.playConnectSe = function(se) {
	if(se?.name) {
		AudioManager.playSe(se);
	}
};
//-----------------------------------------------------------------------------
// Set up the window position
//-----------------------------------------------------------------------------
CGMZ_Window_GamepadDetected.prototype.setupWindowPosition = function() {
	this.height = this.fittingHeight(CGMZ.GamepadDetected.Height);
	this.width = this.calcWindowWidth();
	this.x = this.calcWindowX() + CGMZ.GamepadDetected.XOffset;
	this.y = this.calcWindowY() + CGMZ.GamepadDetected.YOffset;
};
//-----------------------------------------------------------------------------
// Calculate window width
//-----------------------------------------------------------------------------
CGMZ_Window_GamepadDetected.prototype.calcWindowWidth = function() {
	if(CGMZ.GamepadDetected.Width) {
		return Graphics.boxWidth * CGMZ.GamepadDetected.Width / 100;
	} else {
		const string = ($cgmzTemp.gamepadConnectedType === 'connect') ? CGMZ.GamepadDetected.ConnectedText : CGMZ.GamepadDetected.DisconnectedText;
		return this.textSizeEx(string).width;
	}
};
//-----------------------------------------------------------------------------
// Calculate window x
//-----------------------------------------------------------------------------
CGMZ_Window_GamepadDetected.prototype.calcWindowX = function() {
	if(CGMZ.GamepadDetected.WindowOrigin === 'Top Left' || CGMZ.GamepadDetected.WindowOrigin === 'Bottom Left') {
		return 8;
	} else {
		return Graphics.boxWidth - this.width - 8;
	}
};
//-----------------------------------------------------------------------------
// Calculate window y
//-----------------------------------------------------------------------------
CGMZ_Window_GamepadDetected.prototype.calcWindowY = function() {
	if(CGMZ.GamepadDetected.WindowOrigin === 'Top Left' || CGMZ.GamepadDetected.WindowOrigin === 'Top Right') {
		return 8;
	} else {
		return Graphics.boxHeight - this.height - 8;
	}
};
//-----------------------------------------------------------------------------
// Update the window
//-----------------------------------------------------------------------------
CGMZ_Window_GamepadDetected.prototype.update = function() {
	if(this._phase) {
		Window_Base.prototype.update.call(this);
		switch(this._phase) {
			case 'fadeIn': this.updateFadeIn(); break;
			case 'display': this.updateDisplay(); break;
			case 'fadeOut': this.updateFadeOut(); break;
		}
	} else {
		this.checkIfRequested();
	}
};
//-----------------------------------------------------------------------------
// Fade in
//-----------------------------------------------------------------------------
CGMZ_Window_GamepadDetected.prototype.updateFadeIn = function() {
	if(!this._cgmz_bgType) this.opacity += CGMZ.GamepadDetected.FadeInSpeed;
	if(this._dimmerSprite && this._cgmz_bgType === 1) this._dimmerSprite.opacity += CGMZ.GamepadDetected.FadeInSpeed;
    this.contentsOpacity += CGMZ.GamepadDetected.FadeInSpeed;
	if(this.contentsOpacity >= 255) this._phase = 'display';
};
//-----------------------------------------------------------------------------
// Fade out
//-----------------------------------------------------------------------------
CGMZ_Window_GamepadDetected.prototype.updateFadeOut = function() {
	this.opacity -= CGMZ.GamepadDetected.FadeOutSpeed;
	if(this._dimmerSprite) this._dimmerSprite.opacity -= CGMZ.GamepadDetected.FadeOutSpeed;
    this.contentsOpacity -= CGMZ.GamepadDetected.FadeOutSpeed;
	if(this.contentsOpacity <= 0) {
		this.opacity = 0;
		if(this._dimmerSprite) this._dimmerSprite.opacity = 0;
		this._phase = '';
	}
};
//-----------------------------------------------------------------------------
// Update display 
//-----------------------------------------------------------------------------
CGMZ_Window_GamepadDetected.prototype.updateDisplay = function() {
	this._showCount++;
	if(this._showCount >= CGMZ.GamepadDetected.DisplayTime) {
		this._showCount = 0;
		this._phase = 'fadeOut';
	}
};
//-----------------------------------------------------------------------------
// Do nothing, update this in opacity update function instead
//-----------------------------------------------------------------------------
CGMZ_Window_GamepadDetected.prototype.updateBackgroundDimmer = function() {
};