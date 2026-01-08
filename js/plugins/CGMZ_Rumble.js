/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/rumble/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Rumble functionality for game pads
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Beta R2
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: A lot of games provide feedback to the player by causing the
 * controller to rumble. This plugin allows you to rumble the controller. You
 * can also stop any active rumbles.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ----------------------------Plugin Commands---------------------------------
 * This plugin includes the following plugin commands:
 *
 * • Rumble All
 * - Will cause all connected gamepads to rumble with the given parameters
 *
 * • Stop All
 * - Will cause all connected gamepads to stop any existing rumbles
 *
 * • Rumble Controller
 * - Will cause a single controller (by index) to rumble with the given
 * parameters
 *
 * • Stop Controller
 * - Will cause a single controller (by index) to stop any existing rumbles
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games
 *
 * This means the following will work in saved games:
 * ✓ Add this plugin to your game
 * ✓ Modify plugin parameters
 * ✓ Remove this plugin from your game
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_Rumble.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -----------------------------Latest Version---------------------------------
 * Hi all, this latest version adds automatic rumbles to your animations. This
 * can allow you to make the controller rumble when the player or enemy lands
 * a blow you really want the (gamepad) player to feel. You can set up a
 * frame and then rumble info for that frame in the plugin parameters. Then,
 * when the animation plays, it will also perform the rumbles at the given
 * animation frames.
 *
 * This was added for both MZ and MV animation styles.
 *
 * Version Beta R2
 * - Added option to rumble during animations at specific frames
 *
 * @command Rumble All
 * @desc Rumble all connected game pads
 *
 * @arg Start Delay
 * @type number
 * @min 0
 * @max 4800
 * @default 0
 * @desc The delay (in ms) before the rumble starts
 *
 * @arg Duration
 * @type number
 * @min 0
 * @max 5000
 * @default 0
 * @desc The duration (in ms) of the rumble
 *
 * @arg Weak Magnitude
 * @type number
 * @decimals 2
 * @min 0.00
 * @max 1.00
 * @default 1.00
 * @desc The weak magnitude of the rumble
 *
 * @arg Strong Magnitude
 * @type number
 * @decimals 2
 * @min 0.00
 * @max 1.00
 * @default 1.00
 * @desc The strong magnitude of the rumble
 *
 * @command Stop All
 * @desc Stop all game pads from rumbling
 *
 * @command Rumble Controller
 * @desc Rumble a specific controller
 *
 * @arg Index
 * @type number
 * @min 0
 * @default 0
 * @desc The index of the controller (0 indexed)
 *
 * @arg Start Delay
 * @type number
 * @min 0
 * @max 4800
 * @default 0
 * @desc The delay (in ms) before the rumble starts
 *
 * @arg Duration
 * @type number
 * @min 0
 * @max 5000
 * @default 0
 * @desc The duration (in ms) of the rumble
 *
 * @arg Weak Magnitude
 * @type number
 * @decimals 2
 * @min 0.00
 * @max 1.00
 * @default 1.00
 * @desc The weak magnitude of the rumble
 *
 * @arg Strong Magnitude
 * @type number
 * @decimals 2
 * @min 0.00
 * @max 1.00
 * @default 1.00
 * @desc The strong magnitude of the rumble
 *
 * @command Stop Controller
 * @desc Stop rumbling for a specific controller
 *
 * @arg Index
 * @type number
 * @min 0
 * @default 0
 * @desc The index of the controller (0 indexed)
 *
 * @param Rumble Switch
 * @type switch
 * @default 0
 * @desc Switch that only allows rumbles when ON. None = rumble always on
 *
 * @param Auto Rumbles
 *
 * @param Shop Buy
 * @parent Auto Rumbles
 * @type struct<Rumble>
 * @default {"Duration":"0","Weak Magnitude":"1.00","Strong Magnitude":"1.00","Start Delay":"0"}
 * @desc Rumble the controller when the player buys something in a shop?
 *
 * @param Shop Sell
 * @parent Auto Rumbles
 * @type struct<Rumble>
 * @default {"Duration":"0","Weak Magnitude":"1.00","Strong Magnitude":"1.00","Start Delay":"0"}
 * @desc Rumble the controller when the player sells something in a shop?
 *
 * @param Battle Trigger
 * @parent Auto Rumbles
 * @type struct<Rumble>
 * @default {"Duration":"0","Weak Magnitude":"1.00","Strong Magnitude":"1.00","Start Delay":"0"}
 * @desc Rumble the controller when the scene transitions to the battle scene?
 *
 * @param Take Damage
 * @parent Auto Rumbles
 * @type struct<Rumble>
 * @default {"Duration":"0","Weak Magnitude":"1.00","Strong Magnitude":"1.00","Start Delay":"0"}
 * @desc Rumble the controller when the player takes damage?
 *
 * @param Deal Damage
 * @parent Auto Rumbles
 * @type struct<Rumble>
 * @default {"Duration":"0","Weak Magnitude":"1.00","Strong Magnitude":"1.00","Start Delay":"0"}
 * @desc Rumble the controller when the player deals damage?
 *
 * @param Transfer
 * @parent Auto Rumbles
 * @type struct<Rumble>
 * @default {"Duration":"0","Weak Magnitude":"1.00","Strong Magnitude":"1.00","Start Delay":"0"}
 * @desc Rumble the controller when the player transfers?
 *
 * @param Animations
 * @parent Auto Rumbles
 * @type struct<AnimationRumble>[]
 * @default []
 * @desc Rumble the controller automatically at specific frames in an animation
*/
/*~struct~Rumble:
 * @param Duration
 * @type number
 * @min 0
 * @max 5000
 * @default 0
 * @desc The duration (in ms) of the rumble
 *
 * @param Weak Magnitude
 * @type number
 * @decimals 2
 * @min 0.00
 * @max 1.00
 * @default 1.00
 * @desc The weak magnitude of the rumble
 *
 * @param Strong Magnitude
 * @type number
 * @decimals 2
 * @min 0.00
 * @max 1.00
 * @default 1.00
 * @desc The strong magnitude of the rumble
 *
 * @param Start Delay
 * @type number
 * @min 0
 * @max 4800
 * @default 0
 * @desc The delay (in ms) before the rumble starts
*/
/*~struct~AnimationRumble:
 * @param Animation
 * @type animation
 * @default 0
 * @desc The animation to add a rumble for
 *
 * @param Rumbles
 * @type struct<AnimationRumbleInfo>[]
 * @default []
 * @desc The Animation rumbles
*/
/*~struct~AnimationRumbleInfo:
 * @param Frame
 * @type number
 * @default 0
 * @desc The frame this rumble will play on
 * 
 * @param Duration
 * @type number
 * @min 0
 * @max 5000
 * @default 0
 * @desc The duration (in ms) of the rumble
 *
 * @param Weak Magnitude
 * @type number
 * @decimals 2
 * @min 0.00
 * @max 1.00
 * @default 1.00
 * @desc The weak magnitude of the rumble
 *
 * @param Strong Magnitude
 * @type number
 * @decimals 2
 * @min 0.00
 * @max 1.00
 * @default 1.00
 * @desc The strong magnitude of the rumble
*/
Imported.CGMZ_Rumble = true;
CGMZ.Versions["Rumble"] = "Beta R2";
CGMZ.Rumble = {};
CGMZ.Rumble.parameters = PluginManager.parameters('CGMZ_Rumble');
CGMZ.Rumble.Switch = Number(CGMZ.Rumble.parameters["Rumble Switch"]);
CGMZ.Rumble.ShopBuy = CGMZ_Utils.parseRumbleJSON(CGMZ.Rumble.parameters["Shop Buy"], '[CGMZ] Rumble');
CGMZ.Rumble.ShopSell = CGMZ_Utils.parseRumbleJSON(CGMZ.Rumble.parameters["Shop Sell"], '[CGMZ] Rumble');
CGMZ.Rumble.BattleTrigger = CGMZ_Utils.parseRumbleJSON(CGMZ.Rumble.parameters["Battle Trigger"], '[CGMZ] Rumble');
CGMZ.Rumble.TakeDamage = CGMZ_Utils.parseRumbleJSON(CGMZ.Rumble.parameters["Take Damage"], '[CGMZ] Rumble');
CGMZ.Rumble.DealDamage = CGMZ_Utils.parseRumbleJSON(CGMZ.Rumble.parameters["Deal Damage"], '[CGMZ] Rumble');
CGMZ.Rumble.Transfer = CGMZ_Utils.parseRumbleJSON(CGMZ.Rumble.parameters["Transfer"], '[CGMZ] Rumble');
CGMZ.Rumble.Animations = CGMZ_Utils.parseJSON(CGMZ.Rumble.parameters["Animations"], [], '[CGMZ] Rumble', 'Your Animations parameter could not be read, it was not valid json');
//=============================================================================
// CGMZ_AnimationRumble
//-----------------------------------------------------------------------------
// Temp data class used to store rumble info for animations
//=============================================================================
function CGMZ_AnimationRumble() {
	this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_AnimationRumble.prototype.initialize = function(data) {
	this.animationId = Number(data.Animation);
	const rumbleInfo = CGMZ_Utils.parseJSON(data.Rumbles, [], '[CGMZ] Rumble', `One of your animation rumbles with id ${this.animationId} could not be read, it was not valid json`);
	this.frameInfo = [];
	for(const infoJSON of rumbleInfo) {
		const info = CGMZ_Utils.parseJSON(infoJSON, null, '[CGMZ] Rumble', `One of your animation rumbles with id ${this.animationId} could not be read, it was not valid json`);
		if(!info) continue;
		const frameIndex = Number(info.Frame);
		this.frameInfo[frameIndex] = {
			startDelay: 0,
			duration: Number(info.Duration),
			weakMagnitude: parseFloat(info["Weak Magnitude"]),
			strongMagnitude: parseFloat(info["Strong Magnitude"])
		};
	}
};
//-----------------------------------------------------------------------------
// Get rumble info for a specific animation frame
//-----------------------------------------------------------------------------
CGMZ_AnimationRumble.prototype.getFrameInfo = function(frameIndex) {
	return this.frameInfo[frameIndex];
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Handle rumble operations
//=============================================================================
//-----------------------------------------------------------------------------
// Set up animation rumble data
//-----------------------------------------------------------------------------
const alias_CGMZRumble_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZRumble_CGMZTemp_createPluginData.call(this);
	this.animationRumbles = [];
	for(const dataJSON of CGMZ.Rumble.Animations) {
		const data = CGMZ_Utils.parseJSON(dataJSON, null, "[CGMZ] Rumble", "One of your animation rumbles was set up incorrectly and could not be read.");
		if(!data) continue;
		const id = Number(data.Animation);
		this.animationRumbles[id] = new CGMZ_AnimationRumble(data);
	}
};
//-----------------------------------------------------------------------------
// Get animation rumble settings
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getAnimationRumbleSettings = function(id) {
	return this.animationRumbles[id];
};
//-----------------------------------------------------------------------------
// Try to start a rumble event with options. It will try to rumble every game pad.
// Options should be an option with the following properties:
// startDelay - A number in ms for delay before rumble starts (numbers above 4800 seem to not work)
// duration - A number in ms for how long the rumble event lasts (numbers above 5000 seem to not work)
// weakMagnitude - A number from 0.0 to 1.0 for how strong the weak rumble should be
// strongMagnitude - A number from 0.0 to 1.0 for how strong the strong rumble should be
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.startRumble = function(options) {
	if(!options || !options.duration) return;
	if(CGMZ.Rumble.Switch && !$gameSwitches.value(CGMZ.Rumble.Switch)) return;
	if(navigator.getGamepads) {
		const gamepads = navigator.getGamepads();
		if(gamepads) {
			for(const gamepad of gamepads) {
				if(gamepad && gamepad.connected) {
					this.startIndividualRumble(gamepad, options);
				}
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Try to start a rumble event with options. It will try to rumble every game pad.
// Options should be an option with the following properties:
// startDelay - A number in ms for delay before rumble starts (numbers above 4800 seem to not work)
// duration - A number in ms for how long the rumble event lasts (numbers above 5000 seem to not work)
// weakMagnitude - A number from 0.0 to 1.0 for how strong the weak rumble should be
// strongMagnitude - A number from 0.0 to 1.0 for how strong the strong rumble should be
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.startRumbleController = function(index, options) {
	if(CGMZ.Rumble.Switch && !$gameSwitches.value(CGMZ.Rumble.Switch)) return;
	if(!options || !options.duration) return;
	if(navigator.getGamepads) {
		const gamepads = navigator.getGamepads();
		if(gamepads) {
			for(const gamepad of gamepads) {
				if(gamepad && gamepad.connected && gamepad.index === index) {
					this.startIndividualRumble(gamepad, options);
				}
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Try to start a rumble event with options. It will try to rumble only the provided gamepad
// Options should be an option with the following properties:
// startDelay - A number in ms for delay before rumble starts (numbers above 4800 seem to not work)
// duration - A number in ms for how long the rumble event lasts (numbers above 5000 seem to not work)
// weakMagnitude - A number from 0.0 to 1.0 for how strong the weak rumble should be
// strongMagnitude - A number from 0.0 to 1.0 for how strong the strong rumble should be
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.startIndividualRumble = function(gamepad, options) {
	if(!options || !options.duration) return;
	if(!gamepad || !gamepad.vibrationActuator) return; // unsupported browser or gamepad not recognized
	if(CGMZ.Rumble.Switch && !$gameSwitches.value(CGMZ.Rumble.Switch)) return;
	try {
		gamepad.vibrationActuator.playEffect("dual-rumble", options);
	} catch(e) {
		if($gameTemp.isPlaytest()) console.error(`[CGMZ] Rumble encountered error when trying to rumble gamepad at index ${gamepad.index}: ${e}`);
	}
};
//-----------------------------------------------------------------------------
// Attempts to reset every gamepad rumble
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.resetRumble = function() {
	if(navigator.getGamepads) {
		const gamepads = navigator.getGamepads();
		if(gamepads) {
			for(const gamepad of gamepads) {
				if(gamepad && gamepad.connected) {
					this.resetIndividualRumble(gamepad);
				}
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Attempts to reset every gamepad rumble
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.resetRumbleController = function(index) {
	if(navigator.getGamepads) {
		const gamepads = navigator.getGamepads();
		if(gamepads) {
			for(const gamepad of gamepads) {
				if(gamepad && gamepad.connected && gamepad.index === index) {
					this.resetIndividualRumble(gamepad);
				}
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Try to reset a single gamepad rumble
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.resetIndividualRumble = function(gamepad) {
	if(!gamepad || !gamepad.vibrationActuator) return; // unsupported browser or gamepad not recognized
	try {
		gamepad.vibrationActuator.reset();
	} catch(e) {
		if($gameTemp.isPlaytest()) console.error(`[CGMZ] Rumble encountered error when trying to stop rumble for gamepad at index ${gamepad.index}: ${e}`);
	}
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Rumble_CGMZ_Temp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Rumble_CGMZ_Temp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Rumble", "Rumble All", this.pluginCommandRumbleRumbleAll);
	PluginManager.registerCommand("CGMZ_Rumble", "Stop All", this.pluginCommandRumbleStopAll);
	PluginManager.registerCommand("CGMZ_Rumble", "Rumble Controller", this.pluginCommandRumbleRumbleController);
	PluginManager.registerCommand("CGMZ_Rumble", "Stop Controller", this.pluginCommandRumbleStopController);
};
//-----------------------------------------------------------------------------
// Plugin Command - Rumble All
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandRumbleRumbleAll = function(args) {
	const options = {
		startDelay: Number(args["Start Delay"]),
		duration: Number(args.Duration),
		weakMagnitude: parseFloat(args["Weak Magnitude"]),
		strongMagnitude: parseFloat(args["Strong Magnitude"])
	}
	$cgmzTemp.startRumble(options);
};
//-----------------------------------------------------------------------------
// Plugin Command - Stop All
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandRumbleStopAll = function() {
	$cgmzTemp.resetRumble();
};
//-----------------------------------------------------------------------------
// Plugin Command - Rumble All
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandRumbleRumbleController = function(args) {
	const options = {
		startDelay: Number(args["Start Delay"]),
		duration: Number(args.Duration),
		weakMagnitude: parseFloat(args["Weak Magnitude"]),
		strongMagnitude: parseFloat(args["Strong Magnitude"])
	}
	$cgmzTemp.startRumbleController(Number(args.Index), options);
};
//-----------------------------------------------------------------------------
// Plugin Command - Stop All
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandRumbleStopController = function(args) {
	$cgmzTemp.resetRumbleController(Number(args.Index));
};
//=============================================================================
// Scene_Shop
//-----------------------------------------------------------------------------
// Automatic rumble on buy/sell
//=============================================================================
//-----------------------------------------------------------------------------
// Rumble on buy if set up
//-----------------------------------------------------------------------------
const alias_CGMZRumble_SceneShop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
	alias_CGMZRumble_SceneShop_doBuy.call(this, number);
	if(CGMZ.Rumble.ShopBuy.duration > 0) $cgmzTemp.startRumble(CGMZ.Rumble.ShopBuy);
};
//-----------------------------------------------------------------------------
// Rumble on sell if set up
//-----------------------------------------------------------------------------
const alias_CGMZRumble_SceneShop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
	alias_CGMZRumble_SceneShop_doSell.call(this, number);
	if(CGMZ.Rumble.ShopSell.duration > 0) $cgmzTemp.startRumble(CGMZ.Rumble.ShopSell);
};
//=============================================================================
// Game_Action
//-----------------------------------------------------------------------------
// Rumble on damage deal/take
//=============================================================================
//-----------------------------------------------------------------------------
// Rumble when the player takes or deals damage if set up
//-----------------------------------------------------------------------------
const alias_CGMZRumble_GameAction_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
	alias_CGMZRumble_GameAction_executeHpDamage.call(this, target, value);
	if(target.isActor() && CGMZ.Rumble.TakeDamage.duration > 0) {
		$cgmzTemp.startRumble(CGMZ.Rumble.TakeDamage);
	}
	else if(target.isEnemy() && CGMZ.Rumble.DealDamage.duration > 0) {
		$cgmzTemp.startRumble(CGMZ.Rumble.DealDamage);
	}
};
//=============================================================================
// BattleManager
//-----------------------------------------------------------------------------
// Rumble on encounter
//=============================================================================
//-----------------------------------------------------------------------------
// Rumble when encounter is triggered if set up
//-----------------------------------------------------------------------------
const alias_CGMZRumble_BattleManager_onEncounter = BattleManager.onEncounter;
BattleManager.onEncounter = function() {
	alias_CGMZRumble_BattleManager_onEncounter.call(this);
	if(CGMZ.Rumble.BattleTrigger.duration > 0) $cgmzTemp.startRumble(CGMZ.Rumble.BattleTrigger);
};
//=============================================================================
// Game_Player
//-----------------------------------------------------------------------------
// Rumble on transfer
//=============================================================================
//-----------------------------------------------------------------------------
// Rumble when player transfers
//-----------------------------------------------------------------------------
const alias_CGMZRumble_GamePlayer_performTransfer = Game_Player.prototype.performTransfer;
Game_Player.prototype.performTransfer = function() {
	if(this.isTransferring() && CGMZ.Rumble.Transfer.duration > 0) $cgmzTemp.startRumble(CGMZ.Rumble.Transfer);
	alias_CGMZRumble_GamePlayer_performTransfer.call(this);
};
//=============================================================================
// Sprite_Animation
//-----------------------------------------------------------------------------
// Handle rumbles for MZ animation
//=============================================================================
//-----------------------------------------------------------------------------
// Initialize rumble data to null
//-----------------------------------------------------------------------------
const alias_CGMZRumble_SpriteAnimation_initMembers = Sprite_Animation.prototype.initMembers;
Sprite_Animation.prototype.initMembers = function() {
	alias_CGMZRumble_SpriteAnimation_initMembers.call(this);
	this._cgmz_rumbleData = null;
};
//-----------------------------------------------------------------------------
// Setup any rumble settings
//-----------------------------------------------------------------------------
const alias_CGMZRumble_SpriteAnimation_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(targets, animation, mirror, delay, previous) {
	alias_CGMZRumble_SpriteAnimation_setup.apply(this, arguments);
	this._cgmz_rumbleData = (animation) ? $cgmzTemp.getAnimationRumbleSettings(animation.id) : null;
};
//-----------------------------------------------------------------------------
// Try to process rumbles
//-----------------------------------------------------------------------------
const alias_CGMZRumble_SpriteAnimation_updateMain = Sprite_Animation.prototype.updateMain;
Sprite_Animation.prototype.updateMain = function() {
	if(this._cgmz_rumbleData) this.CGMZ_processRumbles();
	alias_CGMZRumble_SpriteAnimation_updateMain.call(this);
};
//-----------------------------------------------------------------------------
// Process rumble for current frame
//-----------------------------------------------------------------------------
Sprite_Animation.prototype.CGMZ_processRumbles = function() {
	const rumble = this._cgmz_rumbleData?.getFrameInfo(this._frameIndex);
	if(rumble) $cgmzTemp.startRumble(rumble);
};
//=============================================================================
// Sprite_AnimationMV
//-----------------------------------------------------------------------------
// Handle rumbles for MV animation
//=============================================================================
//-----------------------------------------------------------------------------
// Initialize rumble data to null
//-----------------------------------------------------------------------------
const alias_CGMZRumble_SpriteAnimationMV_initMembers = Sprite_AnimationMV.prototype.initMembers;
Sprite_AnimationMV.prototype.initMembers = function() {
	alias_CGMZRumble_SpriteAnimationMV_initMembers.call(this);
	this._cgmz_rumbleData = null;
};
//-----------------------------------------------------------------------------
// Setup rumble data
//-----------------------------------------------------------------------------
const alias_CGMZRumble_SpriteAnimationMV_setup = Sprite_AnimationMV.prototype.setup;
Sprite_AnimationMV.prototype.setup = function(targets, animation, mirror, delay) {
	this._cgmz_rumbleData = (animation) ? $cgmzTemp.getAnimationRumbleSettings(animation.id) : null;
	alias_CGMZRumble_SpriteAnimationMV_setup.apply(this, arguments);
};
//-----------------------------------------------------------------------------
// Try to process a rumble for an animation frame if exists
//-----------------------------------------------------------------------------
const alias_CGMZRumble_SpriteAnimationMV_updateFrame = Sprite_AnimationMV.prototype.updateFrame;
Sprite_AnimationMV.prototype.updateFrame = function() {
	alias_CGMZRumble_SpriteAnimationMV_updateFrame.call(this);
	if(this._duration > 0) {
		const frameIndex = this.currentFrameIndex();
		const rumble = this._cgmz_rumbleData?.getFrameInfo(frameIndex);
		if(rumble) $cgmzTemp.startRumble(rumble);
	}
};