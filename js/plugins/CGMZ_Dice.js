/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/dice/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Roll a dice, with output fed to a variable for use in events
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
 * Description: Adds a dice rolling scene to your game. You can show a dice
 * rolling animation, which then has the result provided to a variable for use
 * in eventing. You can also have positive or negative modifies to the dice.
 * ----------------------------------------------------------------------------
 * Documentation:
 * -----------------------------Alpha Notes------------------------------------
 * Planned features to be added:
 * 1) Additional animation types / options
 * 2) Player allowed to select which modifiers they want to use
 * 3) Modifier storage to collect modifiers and use them in rolls later
 * 4) Roll multiple dice
 *
 * Want additional features not already present/listed above? Make suggestions
 * on the Patreon Post, Itch.io Page, or in my discord under the #suggestions
 * channel!
 * https://discord.gg/Gbx7JXP
 * -----------------------------Main Features----------------------------------
 * DICE SCENE
 * Roll a dice. You can show a custom animation, with the result of the roll
 * provided to a game variable for use in your events.
 *
 * You can optionally set up an allowed number of rerolls where the player can
 * choose to accept their roll or roll again.
 *
 * DICE
 * Dice are set up as a parameter in the plugin parameters, allowing you to
 * re-use your dice multiple times in different plugin commands.
 * ----------------------------Animation Types---------------------------------
 * This plugin supports different animation types for your dice. These are:
 *
 * Randomized Results - This animation type randomly shows one of the possible
 * result images every few frames while also randomly rotating the image based
 * on parameters set for this animation style. It is useful if you do not want
 * to make a spritesheet animation.
 *
 * Spritesheet Animation - This animation plays a spritesheet animation with
 * settings you create. This is similar to how animations are created when
 * making MV compatible animations in the database.
 * -----------------------------Integrations-----------------------------------
 * [CGMZ] Scene Backgrounds
 * This plugin will allow you to show a custom background image in the dice
 * roll scene. It allows for scrolling backgrounds and a lot of control over
 * the background of any scene.
 * ----------------------------Plugin Commands---------------------------------
 * This plugin has the following plugin commands:
 *
 * • Roll Dice
 * Opens a scene for a dice roll
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games
 *
 * This means the following will work in saved games:
 * ✓ Add this plugin to your game
 * ✓ Modify plugin parameters
 * ✓ Remove this plugin from your game
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_Dice.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -----------------------------Latest Version---------------------------------
 * Hi all, this latest version changes how the reroll amount in the dice roll
 * scene works. Instead of providing a raw number in the plugin command, you
 * now provide a variable id. If you do not provide a variable id, the reroll
 * count will be 0. If you do provide a variable id, the reroll count will be
 * equal to the value stored in that game variable. This should reduce the
 * amount of eventing needed if you want the same scene just with different
 * reroll counts depending on certain criteria, as you now just need to set
 * the variable value instead of make separate plugin command calls.
 *
 * A new optional window was added to the scene as well. If set up in the
 * plugin command, this new info window will show some brief info to the
 * player. You could use this to remind the player that they need to roll a
 * 5 or greater to succeed, for example.
 *
 * This update also added integrations with [CGMZ] Window Settings and [CGMZ]
 * Window Backgrounds to each window in the plugin.
 *
 * This version also fixes a bug with being able to select nothing in the
 * result window, leading to being stuck in the dice scene.
 * 
 * Version Alpha R4
 * - Added Info window to dice roll scene
 * - Added [CGMZ] Window Backgrounds integration
 * - Added [CGMZ] Window Settings integration
 * - Dice reroll amount converted to variable value
 * - Fix bug with being able to select nothing in roll window
 *
 * @command Roll Dice
 * @desc Call the dice roll scene
 *
 * @arg Dice
 * @desc The id of the dice to roll
 *
 * @arg Result Variable
 * @type variable
 * @default 0
 * @desc The variable to store roll result in. Will be -1 if cancel
 *
 * @arg Background
 * @desc The background preset from [CGMZ] Scene Backgrounds to use for the scene
 *
 * @arg Rerolls Allowed
 * @type variable
 * @default 0
 * @desc If set, the variable id that controls how many rerolls the player can use
 *
 * @arg Disable Cancel
 * @type boolean
 * @default false
 * @desc If true, the player will not be able to cancel out of the dice roll scene.
 *
 * @arg Info Text
 * @desc If set, this text will display in a static window in the scene, for example to show the required roll
 *
 * @param Dice Setup
 *
 * @param Dice
 * @parent Dice Setup
 * @type struct<DiceProperties>[]
 * @default []
 * @desc Set up your dice here.
 *
 * @param Mechanics
 *
 * @param Allow Skip
 * @parent Mechanics
 * @type boolean
 * @default true
 * @desc If OK input is detected during a roll, skip the animation and go straight to result?
 *
 * @param Text Options
 *
 * @param Roll Text
 * @parent Text Options
 * @default Roll
 * @desc Text for the Roll option
 *
 * @param Cancel Text
 * @parent Text Options
 * @default Cancel
 * @desc Text for the Cancel option
 *
 * @param Result Text
 * @parent Text Options
 * @default You rolled a: 
 * @desc Text for the dice result
 *
 * @param Accept Text
 * @parent Text Options
 * @default Accept
 * @desc Text for the Accept Roll option
 *
 * @param Reroll Text
 * @parent Text Options
 * @default Reroll
 * @desc Text for the Reroll option
 *
 * @param Integrations
 *
 * @param Roll Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id for the roll window
 *
 * @param Result Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id for the result window
 *
 * @param Info Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id for the info window
 *
 * @param Roll Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id for the roll window
 *
 * @param Result Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id for the result window
 *
 * @param Info Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id for the info window
*/
/*~struct~DiceProperties:
 * @param id
 * @desc The id of the dice
 *
 * @param Minimum
 * @type number
 * @default 1
 * @desc The minimum amount the dice can roll
 *
 * @param Maximum
 * @type number
 * @default 1
 * @desc The maximum amount the dice can roll
 *
 * @param Roll Weights
 * @type struct<Weight>[]
 * @default []
 * @desc If using weighted dice, set up a weight for each result. If using fair dice, leave this as []
 *
 * @param Pre-roll Image
 * @type file
 * @dir img/
 * @desc The image to show before the dice is rolled
 *
 * @param Result Images
 * @type file[]
 * @dir img/
 * @default []
 * @desc The images to show for the result. For example, if dice roll is 2, it will show the second image here
 *
 * @param Roll Sounds
 * @type struct<SoundEffect>[]
 * @default []
 * @desc Possible sounds to play when the roll starts. Will randomly choose one.
 *
 * @param Animation Type
 * @type select
 * @option Randomized Results
 * @option Spritesheet Animation
 * @desc The animation type to use when the dice is rolled. See documentation.
 * @default Randomized Results
 *
 * @param Randomized Results Options
 * @desc Options for the randomized results animation style
 *
 * @param Frame Wait Min
 * @parent Randomized Results Options
 * @type number
 * @default 3
 * @desc Minimum frames to wait before swapping dice image
 *
 * @param Frame Wait Max
 * @parent Randomized Results Options
 * @type number
 * @default 15
 * @desc Maximum frames to wait before swapping dice image
 *
 * @param Rotation Min
 * @parent Randomized Results Options
 * @type number
 * @default 0
 * @desc Minimum amount of rotation to apply to dice image
 *
 * @param Rotation Max
 * @parent Randomized Results Options
 * @type number
 * @default 90
 * @desc Minimum amount of rotation to apply to dice image
 *
 * @param Total Updates
 * @parent Randomized Results Options
 * @type number
 * @default 20
 * @desc Amount of times the randomized dice will change before coming to a stop
 *
 * @param Spritesheet Animation Options
 * @desc Options for the spritesheet animation style
 *
 * @param Roll Animation
 * @parent Spritesheet Animation Options
 * @type file
 * @dir img/
 * @desc The animation to show when the dice is rolled
 *
 * @param Frame Height
 * @parent Spritesheet Animation Options
 * @type number
 * @default 48
 * @desc The height of one frame of animation
 *
 * @param Frame Width
 * @parent Spritesheet Animation Options
 * @type number
 * @default 48
 * @desc The width of one frame of animation
 *
 * @param Frame Delay
 * @parent Spritesheet Animation Options
 * @type number
 * @default 5
 * @desc Amount of frames to wait before advancing to next animation frame
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
 * @desc The pitch of the sound effect
*/
/*~struct~Weight:
 * @param Result
 * @type number
 * @default 0
 * @desc The result to weight
 *
 * @param Weight
 * @type number
 * @min 0
 * @default 0
 * @desc The chance that this is the result. Higher number here = higher chance this result is rolled
*/
Imported.CGMZ_Dice = true;
CGMZ.Versions["Dice"] = "Alpha R4";
CGMZ.Dice = {};
CGMZ.Dice.parameters = PluginManager.parameters('CGMZ_Dice');
CGMZ.Dice.RollText = CGMZ.Dice.parameters["Roll Text"];
CGMZ.Dice.CancelText = CGMZ.Dice.parameters["Cancel Text"];
CGMZ.Dice.ResultText = CGMZ.Dice.parameters["Result Text"];
CGMZ.Dice.AcceptText = CGMZ.Dice.parameters["Accept Text"];
CGMZ.Dice.RerollText = CGMZ.Dice.parameters["Reroll Text"];
CGMZ.Dice.RollWindowSettings = CGMZ.Dice.parameters["Roll Window Settings"];
CGMZ.Dice.ResultWindowSettings = CGMZ.Dice.parameters["Result Window Settings"];
CGMZ.Dice.InfoWindowSettings = CGMZ.Dice.parameters["Info Window Settings"];
CGMZ.Dice.RollWindowBackground = CGMZ.Dice.parameters["Roll Window Background"];
CGMZ.Dice.ResultWindowBackground = CGMZ.Dice.parameters["Result Window Background"];
CGMZ.Dice.InfoWindowBackground = CGMZ.Dice.parameters["Info Window Background"];
CGMZ.Dice.AllowSkip = (CGMZ.Dice.parameters["Allow Skip"] === 'true');
CGMZ.Dice.Dice = CGMZ_Utils.parseJSON(CGMZ.Dice.parameters["Dice"], [], "[CGMZ] Dice", "Your Dice parameter was set up incorrectly and could not be read.");
//=============================================================================
// CGMZ_Dice
//-----------------------------------------------------------------------------
// Data class used to store dice properties (not saved)
//=============================================================================
function CGMZ_Dice() {
	this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Dice.prototype.initialize = function(info) {
	this.id = info.id;
	this.min = Number(info.Minimum);
	this.max = Number(info.Maximum);
	this.weights = CGMZ_Utils.parseJSON(info["Roll Weights"], [], "[CGMZ] Dice", `Your dice with id ${this.id} had invalid roll weights, they could not be read and will be treated as a fair dice.`).map((x) => {
		const parse = CGMZ_Utils.parseJSON(x, null, "[CGMZ] Dice", `Your dice with id ${this.id} had an invalid roll weight, they could not be read.`);
		if(!parse) return null;
		const weight = {};
		weight.result = Number(parse.Result);
		weight.weight = Number(parse.Weight);
		return weight;
	}).filter(x => !!x);
	this.imgPreRoll = info["Pre-roll Image"];
	this.imgResults = CGMZ_Utils.parseJSON(info["Result Images"], [], "[CGMZ] Dice", `Your dice with id ${this.id} had invalid result images, they could not be read.`);
	this.animType = info["Animation Type"];
	this.animRR = {
		frameMin: Number(info["Frame Wait Min"]),
		frameMax: Number(info["Frame Wait Max"]),
		rotationMin: Number(info["Rotation Min"]),
		rotationMax: Number(info["Rotation Max"]),
		totalUpdates: Number(info["Total Updates"])
	};
	this.animSS = {
		img: info["Roll Animation"],
		frameWidth: Number(info["Frame Width"]),
		frameHeight: Number(info["Frame Height"]),
		frameDelay: Number(info["Frame Delay"])
	}
	this.rollSounds = CGMZ_Utils.parseJSON(info["Roll Sounds"], [], "[CGMZ] Dice", `Your dice with id ${this.id} had invalid roll sounds, they could not be read.`).map(sound => CGMZ_Utils.parseSoundEffectJSON(sound, "[CGMZ] Dice System"));
};
//-----------------------------------------------------------------------------
// Roll the dice - returns a result between max and min
// It can also be forced to be fair optionally, for example when getting a
// random result image
//-----------------------------------------------------------------------------
CGMZ_Dice.prototype.roll = function(forceFair = false) {
	if(this.weights.length === 0 || forceFair) {
		return this._performFairRoll();
	}
	return this._performWeightedRoll();
};
//-----------------------------------------------------------------------------
// Perform a fair roll
//-----------------------------------------------------------------------------
CGMZ_Dice.prototype._performFairRoll = function() {
	const min = this.min;
	const max = this.max;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
//-----------------------------------------------------------------------------
// Perform a weighted roll
//-----------------------------------------------------------------------------
CGMZ_Dice.prototype._performWeightedRoll = function() {
	let totalWeight = 0;
	for(const weight of this.weights) {
		totalWeight += weight.weight;
	}
	let rolledWeight = Math.randomInt(totalWeight);
	for(const weight of this.weights) {
		rolledWeight -= weight.weight;
		if(rolledWeight < 0) return weight.result;
	}
	// If all else fails, return the first result, though this should never occur
	return this.weights[0].result;
};
//-----------------------------------------------------------------------------
// Get the image result for a roll
//-----------------------------------------------------------------------------
CGMZ_Dice.prototype.getImageForRoll = function(roll) {
	let index = roll - this.min;
	if(index < 0) index = 0;
	if(index >= this.imgResults.length) index = imgResults.length - 1;
	return this.imgResults[index];
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Add dice data
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize dice data
//-----------------------------------------------------------------------------
const alias_CGMZDice_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZDice_CGMZTemp_createPluginData.call(this);
	this.initializeDiceData();
};
//-----------------------------------------------------------------------------
// Initialize dice data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeDiceData = function() {
	this.diceData = {};
	for(const diceJSON of CGMZ.Dice.Dice) {
		const dice = CGMZ_Utils.parseJSON(diceJSON, null, "[CGMZ] Dice", "One of your dice was set up incorrectly and could not be read.");
		if(!dice) continue;
		this.diceData[dice.id] = new CGMZ_Dice(dice);
	}
};
//-----------------------------------------------------------------------------
// Get a dice by id
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getDice = function(id) {
	return this.diceData[id];
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZDice_CGMZ_Temp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZDice_CGMZ_Temp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Dice", "Roll Dice", this.pluginCommandDiceRollDice);
};
//-----------------------------------------------------------------------------
// Plugin Command - Roll Dice
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDiceRollDice = function(args) {
	const dice = $cgmzTemp.getDice(args.Dice);
	if(dice) {
		const variable = Number(args["Result Variable"]);
		const rerollVar = Number(args["Rerolls Allowed"]);
		const rerolls = (rerollVar) ? $gameVariables.value(rerollVar) : 0;
		const disableCancel = (args["Disable Cancel"] === 'true');
		SceneManager.push(CGMZ_Scene_Dice);
		SceneManager.prepareNextScene(dice, variable, rerolls, args.Background, disableCancel, args["Info Text"]);
	}
};
//=============================================================================
// CGMZ_Scene_Dice
//-----------------------------------------------------------------------------
// Handle the dice scene
//=============================================================================
function CGMZ_Scene_Dice() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_Dice.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Dice.prototype.constructor = CGMZ_Scene_Dice;
//-----------------------------------------------------------------------------
// Initialize the scene
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.initialize = function() {
	Scene_MenuBase.prototype.initialize.call(this);
	this._phase = "Select";
	this._infoText = '';
	this._rerollsUsed = 0;
	this._okInputCooldown = 15;
	this._disableCancel = false;
};
//-----------------------------------------------------------------------------
// Update the scene
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
	switch(this._phase) {
		case 'Select': this.updateSelect(); break;
		case 'Roll': this.updateRoll(); break;
		case 'Post Roll': this.updatePostRoll(); break;
	}
};
//-----------------------------------------------------------------------------
// Update during select phase
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.updateSelect = function() {
	// unused but available if needed
};
//-----------------------------------------------------------------------------
// Update during roll phase
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.updateRoll = function() {
	this._okInputCooldown--;
	if(this._okInputCooldown <= 0 && CGMZ.Dice.AllowSkip) {
		this.checkSkipAnimation();
	}
	if(this._spriteset.isDoneRolling) {
		this.postRollStart();
		this._spriteset.postRoll();
		this._phase = "Post Roll";
	}
};
//-----------------------------------------------------------------------------
// Check for input to see if animation should be skipped
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.checkSkipAnimation = function() {
	if(Input.isPressed('ok') || TouchInput.isPressed()) {
		this._spriteset.forceStopRoll();
		AudioManager.stopSe();
	}
};
//-----------------------------------------------------------------------------
// Processing when post roll starts
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.postRollStart = function() {
	this._rollDiceWindow.hide();
	this._resultWindow.show();
	this._resultWindow.activate();
};
//-----------------------------------------------------------------------------
// Update during post roll phase
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.updatePostRoll = function() {
	//
};
//-----------------------------------------------------------------------------
// Prepare the dice scene
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.prepare = function(dice, resultVariable, rerolls, bg, disableCancel, infoText) {
	this._dice = dice;
	this._resultVar = resultVariable;
	this._rerollsAllowed = rerolls;
	this._backgroundId = bg;
	this._disableCancel = disableCancel;
	this._infoText = infoText;
};
//-----------------------------------------------------------------------------
// Create dice scene objects
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createSpriteset();
	this.createRollWindow();
	this.createResultWindow();
	this.createInfoTextWindow();
};
//-----------------------------------------------------------------------------
// Create the dice spriteset
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.createSpriteset = function() {
    this._spriteset = new CGMZ_Spriteset_Dice(this._dice);
	this.addChild(this._spriteset);
};
//-----------------------------------------------------------------------------
// Create roll window
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.createRollWindow = function() {
	const rect = this.rollWindowRect();
    this._rollDiceWindow = new CGMZ_Window_RollDice(rect, this._disableCancel);
	if(!this._disableCancel) this._rollDiceWindow.setHandler('cancel', this.onRollCancel.bind(this));
	this._rollDiceWindow.setHandler('ok', this.onRollOk.bind(this));
    this.addWindow(this._rollDiceWindow);
};
//-----------------------------------------------------------------------------
// Get the roll window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.rollWindowRect = function() {
	const width = Graphics.boxWidth / 2;
	const height = this.calcWindowHeight(1, true);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight * 75 / 100;
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create result window
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.createResultWindow = function() {
	const rect = this.resultWindowRect();
    this._resultWindow = new CGMZ_Window_DiceResult(rect, (this._rerollsAllowed > 0), this._rerollsAllowed);
	if(!this._disableCancel) this._resultWindow.setHandler('cancel', this.popScene.bind(this));
	this._resultWindow.setHandler('ok', this.onResultOk.bind(this));
    this.addWindow(this._resultWindow);
};
//-----------------------------------------------------------------------------
// Get the result window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.resultWindowRect = function() {
	const width = Graphics.boxWidth / 2;
	const height = (this._rerollsAllowed) ? this.calcMixedHeight(2, 1) : this.calcMixedHeight(1, 1);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight * 75 / 100;
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create info window
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.createInfoTextWindow = function() {
	const rect = this.infoWindowRect();
    this._infoWindow = new CGMZ_Window_DiceInfo(rect, this._infoText);
    this.addWindow(this._infoWindow);
};
//-----------------------------------------------------------------------------
// Get the info window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.infoWindowRect = function() {
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(1, false);
	const x = 0;
	const y = 0;
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Processing when cancel selected in roll window
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.calcMixedHeight = function(selectableLines, staticLines) {
	return this.calcWindowHeight(selectableLines, true) + this.calcWindowHeight(staticLines, false) - $gameSystem.windowPadding() * 2;
};
//-----------------------------------------------------------------------------
// Processing when cancel selected in roll window
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.onRollCancel = function() {
	if(this._rerollsUsed === 0) $gameVariables.setValue(this._resultVar, -1);
    this.popScene();
};
//-----------------------------------------------------------------------------
// Processing when ok selected in roll window - this result is the actual
// result of the roll
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.onRollOk = function() {
	if(this._dice.rollSounds.length > 0) {
		const soundId = Math.randomInt(this._dice.rollSounds.length);
		AudioManager.playSe(this._dice.rollSounds[soundId]);
	} else {
		SoundManager.playOk();
	}
	const result = this._dice.roll();
	this._resultWindow.setResult(result);
	$gameVariables.setValue(this._resultVar, result);
	this._spriteset.startRoll(result);
	this._okInputCooldown = 15;
	this._phase = "Roll";
};
//-----------------------------------------------------------------------------
// Processing when ok selected on result window
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.onResultOk = function() {
	const index = this._resultWindow.index();
	switch(index) {
		case 0: this.popScene(); break;
		case 1: this.commandReroll(); break;
	}
};
//-----------------------------------------------------------------------------
// Processing when reroll selected
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.commandReroll = function() {
	this._rerollsUsed++;
	this._resultWindow.select(0);
	this._resultWindow.deactivate();
	if(this._rerollsUsed >= this._rerollsAllowed) {
		this._resultWindow.removeRerollOption(this.calcMixedHeight(1, 1));
	} else {
		this._resultWindow.setRerolls(this._rerollsAllowed - this._rerollsUsed);
	}
	this._resultWindow.hide();
	this._spriteset.resetRoll();
	this._rollDiceWindow.show();
	this._rollDiceWindow.activate();
};
//-----------------------------------------------------------------------------
// Check if needs cancel button
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.needsCancelButton = function() {
    return !this._disableCancel;
};
//-----------------------------------------------------------------------------
// Get the dice scene's custom scene background
// No need to check if Scene Backgrounds is installed because this custom func
// is only called by that plugin
//-----------------------------------------------------------------------------
CGMZ_Scene_Dice.prototype.CGMZ_getCustomSceneBackground = function() {
	return $cgmzTemp.sceneBackgroundPresets[this._backgroundId];
};
//=============================================================================
// CGMZ_Window_RollDice
//-----------------------------------------------------------------------------
// Window to confirm to roll the dice
//=============================================================================
function CGMZ_Window_RollDice(rect, types) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_RollDice.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_RollDice.prototype.constructor = CGMZ_Window_RollDice;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_RollDice.prototype.initialize = function(rect, disableCancel) {
	this._disableCancel = disableCancel;
    Window_Selectable.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.Dice.RollWindowSettings) this.CGMZ_setWindowSettings(CGMZ.Dice.RollWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.Dice.RollWindowBackground) this.CGMZ_setWindowBackground(CGMZ.Dice.RollWindowBackground);
	this.refresh();
	this.activate();
	this.select(0);
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_RollDice.prototype.maxItems = function() {
    return (this._disableCancel) ? 1 : 2;
};
//-----------------------------------------------------------------------------
// Max columns
//-----------------------------------------------------------------------------
CGMZ_Window_RollDice.prototype.maxCols = function() {
    return (this._disableCancel) ? 1 : 2;
};
//-----------------------------------------------------------------------------
// Route to cancel processing instead if index is 1
//-----------------------------------------------------------------------------
CGMZ_Window_RollDice.prototype.processOk = function() {
	if(this.index() === 1) {
		this.processCancel();
	} else {
		Window_Selectable.prototype.processOk.call(this);
	}
};
//-----------------------------------------------------------------------------
// Sound is played by scene
//-----------------------------------------------------------------------------
CGMZ_Window_RollDice.prototype.playOkSound = function() {
	// No sound when OK
};
//-----------------------------------------------------------------------------
// Draw item
//-----------------------------------------------------------------------------
CGMZ_Window_RollDice.prototype.drawItem = function(index) {
	const string = (index === 0) ? CGMZ.Dice.RollText : CGMZ.Dice.CancelText;
	const rect = this.itemRectWithPadding(index);
	this.CGMZ_drawTextLine(string, rect.x, rect.y, rect.width, "center");
};
//=============================================================================
// CGMZ_Window_DiceResult
//-----------------------------------------------------------------------------
// Window to display roll result and provide options for proceeding to the
// player
//=============================================================================
function CGMZ_Window_DiceResult(rect, types) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_DiceResult.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_DiceResult.prototype.constructor = CGMZ_Window_DiceResult;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_DiceResult.prototype.initialize = function(rect, rerollAllowed, rerollsLeft) {
    Window_Selectable.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.Dice.ResultWindowSettings) this.CGMZ_setWindowSettings(CGMZ.Dice.ResultWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.Dice.ResultWindowBackground) this.CGMZ_setWindowBackground(CGMZ.Dice.ResultWindowBackground);
	this._result = 0;
	this._rerollAllowed = rerollAllowed;
	this._rerollsLeft = rerollsLeft;
	this.hide();
};
//-----------------------------------------------------------------------------
// Change the item rect to account for non-selectable first line text
//-----------------------------------------------------------------------------
CGMZ_Window_DiceResult.prototype.itemRect = function(index) {
	const rect = Window_Selectable.prototype.itemRect.call(this, index);
    rect.y += this.lineHeight();
    return rect;
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_DiceResult.prototype.maxItems = function() {
    return (this._rerollAllowed) ? 2 : 1;
};
//-----------------------------------------------------------------------------
// Max columns
//-----------------------------------------------------------------------------
CGMZ_Window_DiceResult.prototype.maxCols = function() {
    return 1;
};
//-----------------------------------------------------------------------------
// Do nothing if nothing is selected
//-----------------------------------------------------------------------------
CGMZ_Window_DiceResult.prototype.processOk = function() {
	if(this.index() === 0 || this.index() === 1) {
		Window_Selectable.prototype.processOk.call(this);
	}
};
//-----------------------------------------------------------------------------
// Refresh the window
//-----------------------------------------------------------------------------
CGMZ_Window_DiceResult.prototype.refresh = function() {
    Window_Selectable.prototype.refresh.call(this);
	this.CGMZ_drawTextLine(`${CGMZ.Dice.ResultText}${this._result}`, 0, 0, this.contents.width, "center");
};
//-----------------------------------------------------------------------------
// Remove the reroll option
//-----------------------------------------------------------------------------
CGMZ_Window_DiceResult.prototype.removeRerollOption = function(height) {
    this._rerollAllowed = false;
	this.height = height;
	this.createContents();
};
//-----------------------------------------------------------------------------
// Set the result
//-----------------------------------------------------------------------------
CGMZ_Window_DiceResult.prototype.setRerolls = function(rerolls) {
    this._rerollsLeft = rerolls;
};
//-----------------------------------------------------------------------------
// Set the result
//-----------------------------------------------------------------------------
CGMZ_Window_DiceResult.prototype.setResult = function(result) {
    this._result = result;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Draw item
//-----------------------------------------------------------------------------
CGMZ_Window_DiceResult.prototype.drawItem = function(index) {
	const rect = this.itemRectWithPadding(index);
	const string = (index === 0) ? CGMZ.Dice.AcceptText : `${CGMZ.Dice.RerollText} (${this._rerollsLeft})`;
	this.CGMZ_drawTextLine(string, rect.x, rect.y, rect.width, "center");
};
//=============================================================================
// CGMZ_Window_DiceInfo
//-----------------------------------------------------------------------------
// Window to show brief info about the dice roll
//=============================================================================
function CGMZ_Window_DiceInfo(rect, types) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_DiceInfo.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_DiceInfo.prototype.constructor = CGMZ_Window_DiceInfo;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_DiceInfo.prototype.initialize = function(rect, txt) {
	Window_Base.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.Dice.InfoWindowSettings) this.CGMZ_setWindowSettings(CGMZ.Dice.InfoWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.Dice.InfoWindowBackground) this.CGMZ_setWindowBackground(CGMZ.Dice.InfoWindowBackground);
	if(txt) {
		this.CGMZ_drawTextLine(txt, 0, 0, this.contents.width, 'center');
	} else {
		this.hide();
	}
};
//=============================================================================
// CGMZ_Spriteset_Dice
//-----------------------------------------------------------------------------
// Dice Spriteset, inherit from spriteset_base for convenience even though
// it has some unnecessary elements
//=============================================================================
function CGMZ_Spriteset_Dice(rect, types) {
    this.initialize.apply(this, arguments);
}
CGMZ_Spriteset_Dice.prototype = Object.create(Spriteset_Base.prototype);
CGMZ_Spriteset_Dice.prototype.constructor = CGMZ_Spriteset_Dice;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype.initialize = function(dice) {
	this._diceData = dice;
	this._result = null;
    Spriteset_Base.prototype.initialize.call(this);
	this.isRolling = false;
	this.isDoneRolling = false;
};
//-----------------------------------------------------------------------------
// Do not create pictures
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype.createPictures = function() {
	//
};
//-----------------------------------------------------------------------------
// Do not create timer
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype.createTimer = function() {
	//
};
//-----------------------------------------------------------------------------
// Do not create black screen sprite
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype.createBaseSprite = function() {
    this._baseSprite = new Sprite();
    this.addChild(this._baseSprite);
};
//-----------------------------------------------------------------------------
// Create Lower Layer
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype.createLowerLayer = function() {
    Spriteset_Base.prototype.createLowerLayer.call(this);
	this.preload();
	this.createDice();
	this._sortBaseSprite();
};
//-----------------------------------------------------------------------------
// Preload dice images
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype.preload = function() {
	if(this._diceData.animSS.img) {
		const animData = CGMZ_Utils.getImageData(this._diceData.animSS.img, "img");
		const bitmap = ImageManager.loadBitmap(animData.folder, animData.filename);
	}
	for(const img of this._diceData.imgResults) {
		const data = CGMZ_Utils.getImageData(img, "img");
		const bitmap = ImageManager.loadBitmap(data.folder, data.filename);
	}
};
//-----------------------------------------------------------------------------
// Create Dice
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype.createDice = function() {
	if(this._diceData.imgPreRoll) {
		this._dicePreRoll = new CGMZ_Sprite_DiceStatic(this._diceData.imgPreRoll);
	} else {
		const random = this._diceData.roll();
		this._dicePreRoll = new CGMZ_Sprite_DiceStatic(this._diceData.getImageForRoll(random));
	}
	this._diceRoll = new CGMZ_Sprite_DiceRoll(this._diceData);
	this._diceResult = new CGMZ_Sprite_DiceStaticResult();
	this._baseSprite.addChild(this._dicePreRoll);
	this._baseSprite.addChild(this._diceRoll);
	this._baseSprite.addChild(this._diceResult);
};
//-----------------------------------------------------------------------------
// Start the roll process
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype.startRoll = function(result) {
	this._result = result;
	this._diceResult.setResult(this._diceData.getImageForRoll(result));
	this._dicePreRoll.hide();
	this._diceResult.hide();
	this._diceRoll.startRoll();
	this.isRolling = true;
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype.update = function() {
    Spriteset_Base.prototype.update.call(this);
	this.updateRoll();
};
//-----------------------------------------------------------------------------
// Update dice roll
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype.updateRoll = function() {
    if(this.isRolling && !this._diceRoll.isRolling) {
		this.isRolling = false;
		this.isDoneRolling = true;
	}
};
//-----------------------------------------------------------------------------
// Processing after the roll finishes
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype.postRoll = function() {
	this._diceRoll.hide();
	this._diceResult.show();
};
//-----------------------------------------------------------------------------
// Start the roll process
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype.resetRoll = function() {
	this.isRolling = false;
	this.isDoneRolling = false;
};
//-----------------------------------------------------------------------------
// Force stop the rolling process (such as skip encountered)
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype.forceStopRoll = function() {
	this.isRolling = false;
	this.isDoneRolling = true;
	this._diceRoll.stopRoll();
};
//-----------------------------------------------------------------------------
// Sort base sprite children
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype._sortBaseSprite = function() {
	this._baseSprite.children.sort(this._compareChildOrder.bind(this))
};
//-----------------------------------------------------------------------------
// Compare child order
//-----------------------------------------------------------------------------
CGMZ_Spriteset_Dice.prototype._compareChildOrder = function(a, b) {
    return a.z - b.z;
};
//=============================================================================
// CGMZ_Sprite_DiceStatic
//-----------------------------------------------------------------------------
// Static dice sprite, handles showing the pre roll image
//=============================================================================
function CGMZ_Sprite_DiceStatic() {
    this.initialize(...arguments);
}
CGMZ_Sprite_DiceStatic.prototype = Object.create(Sprite.prototype);
CGMZ_Sprite_DiceStatic.prototype.constructor = CGMZ_Sprite_DiceStatic;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceStatic.prototype.initialize = function(img) {
    Sprite.prototype.initialize.call(this);
	this._img = img;
	this.anchor.x = 0;
	this.anchor.y = 0;
	this.z = 2;
	const data = CGMZ_Utils.getImageData(img, "img");
	this.bitmap = ImageManager.loadBitmap(data.folder, data.filename);
	this.bitmap.addLoadListener(this.center.bind(this));
};
//-----------------------------------------------------------------------------
// Center image
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceStatic.prototype.center = function() {
    this.x = Graphics.width / 2 - this.bitmap.width / 2;
	this.y = Graphics.height / 2 - this.bitmap.height / 2;
};
//=============================================================================
// CGMZ_Sprite_DiceStaticResult
//-----------------------------------------------------------------------------
// Static dice sprite, handles showing the result image
//=============================================================================
function CGMZ_Sprite_DiceStaticResult() {
    this.initialize(...arguments);
}
CGMZ_Sprite_DiceStaticResult.prototype = Object.create(Sprite.prototype);
CGMZ_Sprite_DiceStaticResult.prototype.constructor = CGMZ_Sprite_DiceStaticResult;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceStaticResult.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this._img = null;
	this.anchor.x = 0;
	this.anchor.y = 0;
	this.z = 2;
	this.hide();
};
//-----------------------------------------------------------------------------
// Center image
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceStaticResult.prototype.center = function() {
    this.x = Graphics.width / 2 - this.bitmap.width / 2;
	this.y = Graphics.height / 2 - this.bitmap.height / 2;
};
//-----------------------------------------------------------------------------
// Set the result to use
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceStaticResult.prototype.setResult = function(resultImg) {
    const data = CGMZ_Utils.getImageData(resultImg, "img");
	this.bitmap = ImageManager.loadBitmap(data.folder, data.filename);
	this.bitmap.addLoadListener(this.center.bind(this));
};
//=============================================================================
// CGMZ_Sprite_DiceStatic
//-----------------------------------------------------------------------------
// Static dice sprite, handles showing the pre roll and result images
//=============================================================================
function CGMZ_Sprite_DiceRoll() {
    this.initialize(...arguments);
}
CGMZ_Sprite_DiceRoll.prototype = Object.create(Sprite.prototype);
CGMZ_Sprite_DiceRoll.prototype.constructor = CGMZ_Sprite_DiceRoll;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceRoll.prototype.initialize = function(data) {
    Sprite.prototype.initialize.call(this);
	this._data = data;
	this._aFrame = 0;
	this._nextFrame = 3;
	switch(data.animType) {
		case 'Randomized Results':
			this._type = "rr";
			this._opts = data.animRR;
			break;
		case 'Spritesheet Animation':
			this._type = "ss";
			this._opts = data.animSS;
			break;
	}
	this.isRolling = false;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.centerImage();
	this.z = 2;
	this.hide();
};
//-----------------------------------------------------------------------------
// Center image
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceRoll.prototype.centerImage = function() {
    this.x = Graphics.width / 2;
	this.y = Graphics.height / 2;
};
//-----------------------------------------------------------------------------
// Start roll
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceRoll.prototype.startRoll = function() {
	switch(this._type) {
		case 'rr': this.startRR(); break;
		case 'ss': this.startSS(); break;
	}
	this._aFrame = 0;
	this.calculateNextFrame();
    this.show();
	this.isRolling = true;
};
//-----------------------------------------------------------------------------
// Start randomized result roll animation
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceRoll.prototype.startRR = function() {
	this._totalUpdates = 0;
	this._lastRotation = 0;
	const minR = this._opts.rotationMin;
	const maxR = this._opts.rotationMax;
	this._nextRotation = this._lastRotation + Math.floor(Math.random() * (maxR - minR + 1)) + minR;
	const data = CGMZ_Utils.getImageData(this._data.imgResults[0], "img");
	this.bitmap = ImageManager.loadBitmap(data.folder, data.filename);
};
//-----------------------------------------------------------------------------
// Start randomized result roll animation
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceRoll.prototype.startSS = function() {
	this._framePos = 1;
	const data = CGMZ_Utils.getImageData(this._opts.img, "img");
	this.bitmap = ImageManager.loadBitmap(data.folder, data.filename);
	this.setFrame(0, 0, this._opts.frameWidth, this._opts.frameHeight);
	const fw = this._opts.frameWidth;
	const fh = this._opts.frameHeight;
	const columns = Math.floor(this.bitmap.width / fw);
	const rows = Math.floor(this.bitmap.height / fh);
	this._totalSSFrames = columns * rows;
};
//-----------------------------------------------------------------------------
// Calculate the next frame update
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceRoll.prototype.calculateNextFrame = function() {
	switch(this._type) {
		case 'rr': this._nextFrame = Math.floor(Math.random() * (this._opts.frameMax - this._opts.frameMin + 1)) + this._opts.frameMin; break;
		case 'ss': this._nextFrame = this._opts.frameDelay; break;
	}
};
//-----------------------------------------------------------------------------
// Update sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceRoll.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if(this.isRolling) {
		this.updateRoll();
	}
};
//-----------------------------------------------------------------------------
// Update roll
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceRoll.prototype.updateRoll = function() {
	this._aFrame++;
	if(this._aFrame >= this._nextFrame) {
		this.calculateNextFrame();
		this._aFrame = 0;
		switch(this._type) {
			case 'rr': this.updateRR(); break;
			case 'ss': this.updateSS(); break;
		}
		if(this.checkStop()) {
			this.stopRoll();
		}
	}
};
//-----------------------------------------------------------------------------
// Update randomized result roll
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceRoll.prototype.updateRR = function() {
	const roll = this._data.roll(true);
	const imgResult = this._data.getImageForRoll(roll);
	const data = CGMZ_Utils.getImageData(imgResult, "img");
	this.bitmap = ImageManager.loadBitmap(data.folder, data.filename);
	this.rotation = (this._nextRotation * Math.PI) / 180;
	this._lastRotation = this._nextRotation;
	const minR = this._opts.rotationMin;
	const maxR = this._opts.rotationMax;
	this._nextRotation = this._lastRotation + Math.floor(Math.random() * (maxR - minR + 1)) + minR;
	this._totalUpdates++;
};
//-----------------------------------------------------------------------------
// Update spritesheet animation roll
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceRoll.prototype.updateSS = function() {
	const fh = this._opts.frameHeight;
	const bw = this.bitmap.width;
	const fw = this._opts.frameWidth;
	const framesPerRow = bw / fw;
	const x = (this._framePos % framesPerRow) * fw;
	const y = Math.floor(this._framePos / framesPerRow) * fh;
	this.setFrame(x, y, fw, fh);
	this._framePos++;
};
//-----------------------------------------------------------------------------
// Check if animation is done
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceRoll.prototype.checkStop = function() {
	switch(this._type) {
		case 'rr': return (this._totalUpdates >= this._opts.totalUpdates);
		case 'ss': return (this._framePos > this._totalSSFrames);
	}
	return true;
};
//-----------------------------------------------------------------------------
// Processing when the rolling stops
//-----------------------------------------------------------------------------
CGMZ_Sprite_DiceRoll.prototype.stopRoll = function() {
	this.isRolling = false;
};