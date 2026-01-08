/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/swimming/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Swim in water with your actor
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha R3
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: Allows you to swim in water with your actor. Use it to add
 * more exploration options for your maps. No longer is a small shallow river
 * an impossibility for your party to pass!
 * ----------------------------------------------------------------------------
 * Documentation:
 * ----------------------------Plugin Commands---------------------------------
 * This plugin supports the following plugin commands:
 * 
 * • Change Swim Image
 * Change a given actor's swim image
 * 
 * • Attempt Swim
 * Attempt to start/stop swimming. This will not work if the player could not
 * normally swim given their current location/direction.
 * 
 * • Force Swim
 * Forces the player to start/stop swimming. This will work even if the player
 * could not normally swim given their current location/direction.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games
 *
 * This means the following will work in saved games:
 * ✓ Add this plugin to your game
 * ✓ Modify plugin parameters
 * ✓ Remove this plugin from your game
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_Swimming.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -----------------------------Latest Version---------------------------------
 * Hi all, this latest version adds swim footsteps. You can now set it up to
 * where the player hears a swimming sound effect while swimming around. This
 * can also integrate with [CGMZ] Sound IDs to get a sound that varies in
 * pitch, tone, or volume slightly so the player does not hear the exact same
 * sound every time.
 *
 * The [CGMZ] Sound IDs integration was also added for the splash in and
 * splash out sound effects.
 *
 * This update should hopefully make swimming easier to set up as the plugin
 * commands for changing access to swimming or swim dashing were removed.
 * Instead, these are now controlled by a simple switch you can turn ON or OFF
 * through event commands or script calls as normal.
 * 
 * Alpha R3
 * - Added swim footstep sounds
 * - Added Sound IDs integration
 * - Swim Access and Dash Access changed from plugin command to switches
 *
 * @command Change Swim Image
 * @desc Change the image to use while swimming for an actor
 *
 * @arg Actor
 * @type actor
 * @default 0
 * @desc The actor to change image for
 *
 * @arg Image
 * @type file
 * @dir img/characters/
 * @desc The swim image to use for the actor
 *
 * @command Attempt Swim
 * @desc Attempt to either start or stop swimming. Will only work if the player can start/stop swimming.
 *
 * @command Force Swim
 * @desc Forces the player to either start or stop swimming. This will work even if swimming could not normally be started/stopped.
 *
 * @param Mechanics
 *
 * @param Swim Access Switch
 * @parent Initial Settings
 * @type switch
 * @default 0
 * @desc Switch that must be ON (if not 0) before the player can swim
 *
 * @param Swim Dash Switch
 * @parent Initial Settings
 * @type switch
 * @default 0
 * @desc Switch that must be ON (if not 0) before the player can dash while swimming
 *
 * @param Controls
 *
 * @param Swim Key
 * @parent Controls
 * @desc Key that when pressed will attempt to swim
 * @default s
 *
 * @param Swim Gamepad
 * @parent Controls
 * @desc Gamepad button that when pressed will attempt to start/stop swimming
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
 *
 * @param Swim Settings
 *
 * @param Swim Speed
 * @parent Swim Settings
 * @type number
 * @min 0
 * @decimals 1
 * @desc Move speed while swimming
 * @default 3.0
 *
 * @param Swim Y Offset
 * @parent Swim Settings
 * @type number
 * @min 0
 * @default 12
 * @desc The y-offset of the player while swimming
 *
 * @param Swim Depth
 * @parent Swim Settings
 * @type number
 * @min 0
 * @default 12
 * @desc The bush depth to use while swimming
 *
 * @param Swim Images
 * @parent Swim Settings
 * @type struct<ActorSwimImage>[]
 * @default []
 * @desc Set up actor swimming images here
 *
 * @param Swim Footstep
 * @parent Swim Settings
 * @type struct<SoundEffect>
 * @desc The sound effect to use when moving while swimming
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 *
 * @param Passability Settings
 *
 * @param Swim Enter Regions
 * @parent Passability Settings
 * @type number[]
 * @default []
 * @desc The regions in which the player can start swimming. Leave empty to allow swimming everywhere
 *
 * @param Swim Exit Regions
 * @parent Passability Settings
 * @type number[]
 * @default []
 * @desc The regions in which the player can stop swimming. Leave empty to allow exiting swimming everywhere
 *
 * @param Swim Passable Regions
 * @parent Passability Settings
 * @type number[]
 * @default []
 * @desc The regions in which the player can always pass through when swimming
 *
 * @param Swim Passable Terrain Tags
 * @parent Passability Settings
 * @type number[]
 * @default []
 * @desc The terrain tags in which the player can always pass through when swimming
 *
 * @param Splash Settings
 *
 * @param Splash Animation
 * @parent Splash Settings
 * @type file
 * @dir img/
 * @desc The animation to play when splashing
 *
 * @param Animation Frame Width
 * @parent Splash Settings
 * @type number
 * @default 48
 * @min 1
 * @desc The width of one frame of the animation
 *
 * @param Animation Frame Height
 * @parent Splash Settings
 * @type number
 * @default 48
 * @min 1
 * @desc The height of one frame of the animation
 *
 * @param Animation Speed
 * @parent Splash Settings
 * @type number
 * @default 3
 * @min 1
 * @desc The game frames to wait before switching animation frames
 *
 * @param Animation Time
 * @parent Splash Settings
 * @type number
 * @default 3
 * @min 1
 * @desc The total amount of game frames to wait for the animation to play. Should not be shorter than the animation, but can be longer
 *
 * @param Splash In SE
 * @parent Splash Settings
 * @type struct<SoundEffect>
 * @desc The sound effect to use during splash in
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 *
 * @param Splash Out SE
 * @parent Splash Settings
 * @type struct<SoundEffect>
 * @desc The sound effect to use during splash out
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 *
 * @param Integrations
 *
 * @param Swim Footstep ID
 * @parent Integrations
 * @desc A [CGMZ] Sound ID to use for the Splash In SE instead of the above parameter.
 *
 * @param Splash In ID
 * @parent Integrations
 * @desc A [CGMZ] Sound ID to use for the Splash In SE instead of the above parameter.
 *
 * @param Splash Out ID
 * @parent Integrations
 * @desc A [CGMZ] Sound ID to use for the Splash Out SE instead of the above parameter.
*/
/*~struct~SoundEffect:
 * @param Name
 * @type file
 * @dir audio/se
 * @desc Sound Effect file to play
 *
 * @param Volume
 * @type number
 * @default 90
 * @min 0
 * @max 100
 * @desc Volume of the sound effect
 *
 * @param Pitch
 * @type number
 * @default 100
 * @min 50
 * @max 150
 * @desc Pitch of the sound effect
 *
 * @param Pan
 * @type number
 * @default 0
 * @min -100
 * @max 100
 * @desc Pan of the sound effect
*/
/*~struct~ActorSwimImage:
 * @param Actor
 * @type actor
 * @desc The actor to set the swim image for
 *
 * @param Image
 * @type file
 * @dir img/characters/
 * @desc The swim image to use for the actor
*/
Imported.CGMZ_Swimming = true;
CGMZ.Versions["Swimming"] = "Alpha R3";
CGMZ.Swimming = {};
CGMZ.Swimming.parameters = PluginManager.parameters('CGMZ_Swimming');
CGMZ.Swimming.SwimKey = CGMZ.Swimming.parameters["Swim Key"];
CGMZ.Swimming.SplashAnimation = CGMZ.Swimming.parameters["Splash Animation"];
CGMZ.Swimming.SwimFootstepID = CGMZ.Swimming.parameters["Swim Footstep ID"];
CGMZ.Swimming.SplashInID = CGMZ.Swimming.parameters["Splash In ID"];
CGMZ.Swimming.SplashOutID = CGMZ.Swimming.parameters["Splash Out ID"];
CGMZ.Swimming.SwimSpeed = parseFloat(CGMZ.Swimming.parameters["Swim Speed"]);
CGMZ.Swimming.SwimAccessSwitch = Number(CGMZ.Swimming.parameters["Swim Access Switch"]);
CGMZ.Swimming.SwimDashSwitch = Number(CGMZ.Swimming.parameters["Swim Dash Switch"]);
CGMZ.Swimming.SwimYOffset = Number(CGMZ.Swimming.parameters["Swim Y Offset"]);
CGMZ.Swimming.SwimDepth = Number(CGMZ.Swimming.parameters["Swim Depth"]);
CGMZ.Swimming.AnimationFrameWidth = Number(CGMZ.Swimming.parameters["Animation Frame Width"]);
CGMZ.Swimming.AnimationFrameHeight = Number(CGMZ.Swimming.parameters["Animation Frame Height"]);
CGMZ.Swimming.AnimationSpeed = Number(CGMZ.Swimming.parameters["Animation Speed"]);
CGMZ.Swimming.AnimationTime = Number(CGMZ.Swimming.parameters["Animation Time"]);
CGMZ.Swimming.SwimGamepad = Number(CGMZ.Swimming.parameters["Swim Gamepad"]);
CGMZ.Swimming.SplashInSE = CGMZ_Utils.parseSoundEffectJSON(CGMZ.Swimming.parameters["Splash In SE"], "CGMZ Swimming");
CGMZ.Swimming.SplashOutSE = CGMZ_Utils.parseSoundEffectJSON(CGMZ.Swimming.parameters["Splash Out SE"], "CGMZ Swimming");
CGMZ.Swimming.SwimFootstep = CGMZ_Utils.parseSoundEffectJSON(CGMZ.Swimming.parameters["Swim Footstep"], "CGMZ Swimming");
CGMZ.Swimming.SwimEnterRegions = CGMZ_Utils.parseJSON(CGMZ.Swimming.parameters["Swim Enter Regions"], [], "CGMZ Swimming", "Your Swim Enter Regions parameter had invalid JSON and could not be read").map(r => Number(r));
CGMZ.Swimming.SwimExitRegions = CGMZ_Utils.parseJSON(CGMZ.Swimming.parameters["Swim Exit Regions"], [], "CGMZ Swimming", "Your Swim Exit Regions parameter had invalid JSON and could not be read").map(r => Number(r));
CGMZ.Swimming.SwimPassableRegions = CGMZ_Utils.parseJSON(CGMZ.Swimming.parameters["Swim Passable Regions"], [], "CGMZ Swimming", "Your Swim Passable Regions parameter had invalid JSON and could not be read").map(r => Number(r));
CGMZ.Swimming.SwimPassableTerrainTags = CGMZ_Utils.parseJSON(CGMZ.Swimming.parameters["Swim Passable Terrain Tags"], [], "CGMZ Swimming", "Your Swim Passable Terrain Tags parameter had invalid JSON and could not be read").map(r => Number(r));
CGMZ.Swimming.SwimImages = CGMZ_Utils.parseJSON(CGMZ.Swimming.parameters["Swim Images"], [], "CGMZ Swimming", "Your Swim Images parameter had invalid JSON and could not be read");
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Add plugin commands, swim temp data
//=============================================================================
//-----------------------------------------------------------------------------
// Add swim image data to temp data
//-----------------------------------------------------------------------------
const alias_CGMZSwimming_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZSwimming_CGMZTemp_createPluginData.call(this);
	this._swimmingImages = new Array($dataActors.length);
	for(const imgJSON of CGMZ.Swimming.SwimImages) {
		const img = CGMZ_Utils.parseJSON(imgJSON, null, "CGMZ Swimming", "One of your Swim Images had invalid JSON and could not be read.");
		if(!img) continue;
		const id = Number(img.Actor);
		this._swimmingImages[id] = img.Image;
	}
};
//-----------------------------------------------------------------------------
// Get swim image data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getSwimImage = function(id) {
	return (this._swimmingImages[id]) ? this._swimmingImages[id] : "";
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZSwimming_CGMZTemp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZSwimming_CGMZTemp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Swimming", "Change Swim Access", this.pluginCommandSwimmingChangeSwimAccess);
	PluginManager.registerCommand("CGMZ_Swimming", "Change Swim Dash", this.pluginCommandSwimmingChangeSwimDash);
	PluginManager.registerCommand("CGMZ_Swimming", "Change Swim Image", this.pluginCommandSwimmingChangeSwimImage);
	PluginManager.registerCommand("CGMZ_Swimming", "Attempt Swim", this.pluginCommandSwimmingAttemptSwim);
	PluginManager.registerCommand("CGMZ_Swimming", "Force Swim", this.pluginCommandSwimmingForceSwim);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Swim Access
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSwimmingChangeSwimAccess = function(args) {
	$cgmz.changeSwimAccess(args.Enable === 'true');
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Swim Dash
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSwimmingChangeSwimDash = function(args) {
	$cgmz.changeSwimDash(args.Enable === 'true');
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Swim Image
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSwimmingChangeSwimImage = function(args) {
	const id = Number(args.Actor);
	const actor = $gameActors.actor(id);
	if(actor) {
		actor.CGMZ_setSwimImage(args.Image);
		$gamePlayer.refresh();
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Attempt Swim
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSwimmingAttemptSwim = function() {
	$gamePlayer.CGMZ_tryStartStopSwim();
};
//-----------------------------------------------------------------------------
// Plugin Command - Force Swim
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSwimmingForceSwim = function() {
	if($gamePlayer.CGMZ_isSwimming()) {
		$gamePlayer.CGMZ_startSwimmingStopProcess();
	} else {
		$gamePlayer.CGMZ_startSwimmingStartProcess();
	}
};
//-----------------------------------------------------------------------------
// Check for swimming gamepad inputs
//-----------------------------------------------------------------------------
const alias_CGMZ_Swimming_Temp_updateLastGamepad = CGMZ_Temp.prototype.updateLastGamepad;
CGMZ_Temp.prototype.updateLastGamepad = function(gamepad) {
	alias_CGMZ_Swimming_Temp_updateLastGamepad.call(this, gamepad);
	this.updateSwimmingForGamepad(gamepad);
};
//-----------------------------------------------------------------------------
// Handle swimming gamepad inputs
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.updateSwimmingForGamepad = function(gamepad) {
	if(SceneManager._scene.constructor !== Scene_Map) return; // Not allowed to swim outside of map scene
	if(!$dataMap) return;
	if(gamepad.buttons[CGMZ.Swimming.SwimGamepad].pressed) {
		$gamePlayer.CGMZ_tryStartStopSwim();
	}
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Check if swim is possible
//=============================================================================
//-----------------------------------------------------------------------------
// Check if swimming is enabled
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.canSwim = function() {
	if(CGMZ.Swimming.SwimAccessSwitch && !$gameSwitches.value(CGMZ.Swimming.SwimAccessSwitch)) return false;
	return true;
};
//-----------------------------------------------------------------------------
// Check if swim dashing is enabled
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.canSwimDash = function() {
	if(CGMZ.Swimming.SwimDashSwitch && !$gameSwitches.value(CGMZ.Swimming.SwimDashSwitch)) return false;
	return true;
};
//=============================================================================
// Game_Player
//-----------------------------------------------------------------------------
// Handle player swimming variables
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also add swimming variables
//-----------------------------------------------------------------------------
const alias_CGMZSwimming_GamePlayer_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
    alias_CGMZSwimming_GamePlayer_initMembers.call(this);
	this._cgmz_swimImage = "";
	this._cgmz_isSwimming = false;
	this._cgmz_isStartingSwim = false;
	this._cgmz_isStoppingSwim = false;
	this._cgmz_canSwimFootstep = false;
	this._cgmz_swimAnimationPhase = "none";
	this._cgmz_swimLocationInfo = null;
	this._cgmz_swimSplashAnimationTime = 0;
	this._cgmz_swimPreviousSettings = {speed: 4, followers: false};
};
//-----------------------------------------------------------------------------
// Get the player's swim image
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_getSwimImage = function() {
	return this._cgmz_swimImage;
};
//-----------------------------------------------------------------------------
// Check if the player is currently swimming
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_isSwimming = function() {
	return this._cgmz_isSwimming;
};
//-----------------------------------------------------------------------------
// Alias. Also update swimming
//-----------------------------------------------------------------------------
const alias_CGMZSwimming_GamePlayer_update = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive) {
    alias_CGMZSwimming_GamePlayer_update.apply(this, arguments);
	this.CGMZ_updateSwim(sceneActive);
};
//-----------------------------------------------------------------------------
// Update Swimming
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_updateSwim = function(sceneActive) {
	this.CGMZ_updateSwimInput(sceneActive);
	if(this._cgmz_isStartingSwim && this.areFollowersGathered()) {
		switch(this._cgmz_swimAnimationPhase) {
			case "none": break;
			case "jumpIn":
				if(this._followers.isVisible()) {
					this.hideFollowers();
					this._followers.refresh();
				}
				this.CGMZ_updateSwimJump();
				break;
			case "splash":
				this.CGMZ_updateSwimSplash();
				break;
		}
		if(this.CGMZ_swimStartIsFinished()) {
			this.CGMZ_finishSwimmingStartProcess();
		}
	}
	if(this._cgmz_isStoppingSwim) {
		this.CGMZ_updateSwimJump();
		if(this.CGMZ_swimStopIsFinished()) {
			this.CGMZ_finishSwimmingStopProcess();
		}
	}
};
//-----------------------------------------------------------------------------
// Update Swimming splash - not yet implemented
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_updateSwimInput = function(sceneActive) {
	if(!sceneActive) return;
	if($cgmzTemp.isKeyPressed(CGMZ.Swimming.SwimKey)) {
		this.CGMZ_tryStartStopSwim();
	}
};
//-----------------------------------------------------------------------------
// Update Swimming jump
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_updateSwimJump = function() {
	if(!this._cgmz_swimLocationInfo) {
		this.CGMZ_advanceSwimAnimationPhase();
		return;
	}
	if(!this.isJumping() && this.x === this._cgmz_swimLocationInfo.x && this.y === this._cgmz_swimLocationInfo.y) {
		const xPlus = this._cgmz_swimLocationInfo.x2 - this._cgmz_swimLocationInfo.x;
		const yPlus = this._cgmz_swimLocationInfo.y2 - this._cgmz_swimLocationInfo.y;
		this.jump(xPlus, yPlus);
	}
	if(!this.isJumping() && this.x === this._cgmz_swimLocationInfo.x2 && this.y === this._cgmz_swimLocationInfo.y2) {
		this.CGMZ_advanceSwimAnimationPhase();
	}
};
//-----------------------------------------------------------------------------
// Start the swim splash
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_startSwimSplashAnimation = function() {
	this.CGMZ_playSwimSE("splashIn");
	this._cgmz_swimSplashAnimationTime = 0;
	if(CGMZ.Swimming.SplashAnimation) {
		this.setTransparent(true);
		this._cgmz_swimSplashAnimationTime = CGMZ.Swimming.AnimationTime;
		const bitmap = CGMZ_Utils.getImageData(CGMZ.Swimming.SplashAnimation, "img");
		const x = this.x;
		const y = this.y;
		const frameWidth = CGMZ.Swimming.AnimationFrameWidth;
		const frameHeight = CGMZ.Swimming.AnimationFrameHeight;
		const animationSpeed = CGMZ.Swimming.AnimationSpeed;
		$cgmzTemp.requestMapAnimation(bitmap, x, y, frameWidth, frameHeight, animationSpeed);
	}
};
//-----------------------------------------------------------------------------
// Update Swimming splash
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_updateSwimSplash = function() {
	if(this._cgmz_swimSplashAnimationTime <= 0) {
		this.CGMZ_advanceSwimAnimationPhase();
	} else {
		this._cgmz_swimSplashAnimationTime--;
	}
};
//-----------------------------------------------------------------------------
// Try to either start of stop the swim process
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_tryStartStopSwim = function() {
	if(this.CGMZ_canStartSwimming()) {
		this.CGMZ_startSwimmingStartProcess();
	} else if(this.CGMZ_canStopSwimming()) {
		this.CGMZ_startSwimmingStopProcess();
	}
};
//-----------------------------------------------------------------------------
// Start swimming start process
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_startSwimmingStartProcess = function() {
	this.CGMZ_populateSwimLocationInfo();
	this.gatherFollowers();
	this._cgmz_swimPreviousSettings.speed = this.moveSpeed();
	this._cgmz_swimPreviousSettings.followers = this._followers.isVisible();
	this._cgmz_swimAnimationPhase = "jumpIn";
	this._cgmz_isStartingSwim = true;
};
//-----------------------------------------------------------------------------
// Finish swimming start process
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_finishSwimmingStartProcess = function() {
	this._cgmz_isStartingSwim = false;
	this._cgmz_isSwimming = true;
	this._cgmz_swimLocationInfo = null;
	this.refresh();
	this.setTransparent(false);
	this.setMoveSpeed(CGMZ.Swimming.SwimSpeed);
	this.refreshBushDepth();
};
//-----------------------------------------------------------------------------
// Stop swimming
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_startSwimmingStopProcess = function() {
	this.CGMZ_playSwimSE('splashOut');
	this.CGMZ_populateSwimLocationInfo();
	this._cgmz_swimAnimationPhase = "jumpOut";
	this._cgmz_isStoppingSwim = true;
};
//-----------------------------------------------------------------------------
// Finish swimming stop process
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_finishSwimmingStopProcess = function() {
	this._cgmz_isStoppingSwim = false;
	this._cgmz_isSwimming = false;
	this._cgmz_swimLocationInfo = null;
	this.refresh();
	this.setMoveSpeed(this._cgmz_swimPreviousSettings.speed);
	this.refreshBushDepth();
	if(this._cgmz_swimPreviousSettings.followers) {
		this._followers.synchronize(this.x, this.y, this.direction());
		this.showFollowers();
		this._followers.refresh();
	}
};
//-----------------------------------------------------------------------------
// Check if swim start is finished
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_swimStartIsFinished = function() {
	return this._cgmz_swimAnimationPhase === "swim";
};
//-----------------------------------------------------------------------------
// Check if swim stop is finished
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_swimStopIsFinished = function() {
	return this._cgmz_swimAnimationPhase === "none";
};
//-----------------------------------------------------------------------------
// Play a Swim SE
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_playSwimSE = function(type) {
	switch(type) {
		case 'splashIn': (Imported.CGMZ_SoundIDs && CGMZ.Swimming.SplashInID) ? AudioManager.playSe($cgmzTemp.getSoundID(CGMZ.Swimming.SplashInID)) : AudioManager.playSe(CGMZ.Swimming.SplashInSE); break;
		case 'splashOut': (Imported.CGMZ_SoundIDs && CGMZ.Swimming.SplashOutID) ? AudioManager.playSe($cgmzTemp.getSoundID(CGMZ.Swimming.SplashOutID)) : AudioManager.playSe(CGMZ.Swimming.SplashOutSE); break;
		case 'footstep': (Imported.CGMZ_SoundIDs && CGMZ.Swimming.SwimFootstepID) ? AudioManager.playSe($cgmzTemp.getSoundID(CGMZ.Swimming.SwimFootstepID)) : AudioManager.playSe(CGMZ.Swimming.SwimFootstep); break;
	}
};
//-----------------------------------------------------------------------------
// Advance Swim Animation Phase
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_advanceSwimAnimationPhase = function() {
	switch(this._cgmz_swimAnimationPhase) {
		case "none": this._cgmz_swimAnimationPhase = "jumpIn"; break;
		case "jumpIn":
			this._cgmz_swimAnimationPhase = "splash";
			this.CGMZ_startSwimSplashAnimation();
			break;
		case "splash": this._cgmz_swimAnimationPhase = "swim"; break;
		case "swim": this._cgmz_swimAnimationPhase = "jumpOut"; break;
		case "jumpOut": this._cgmz_swimAnimationPhase = "none"; break;
	}
};
//-----------------------------------------------------------------------------
// Populate swim location info
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_populateSwimLocationInfo = function() {
	const dir = this.direction();
	const x2 = $gameMap.roundXWithDirection(this.x, dir);
	const y2 = $gameMap.roundYWithDirection(this.y, dir);
	this._cgmz_swimLocationInfo = {};
	this._cgmz_swimLocationInfo.x = this.x;
	this._cgmz_swimLocationInfo.x2 = x2;
	this._cgmz_swimLocationInfo.y = this.y;
	this._cgmz_swimLocationInfo.y2 = y2;
};
//-----------------------------------------------------------------------------
// Check if the player can start swimming
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_canStartSwimming = function() {
	if(this.CGMZ_isSwimming()) return false;
	if(this._cgmz_swimAnimationPhase !== "none") return false;
	if(!$cgmz.canSwim()) return false;
	if(CGMZ.Swimming.SwimEnterRegions.length > 0) {
		const regionId = $gameMap.regionId(this.x, this.y);
		if(!CGMZ.Swimming.SwimEnterRegions.includes(regionId)) return false;
	}
	const dir = this.direction();
	const x2 = $gameMap.roundXWithDirection(this.x, dir);
	const y2 = $gameMap.roundYWithDirection(this.y, dir);
	return $gameMap.isBoatPassable(x2, y2);
};
//-----------------------------------------------------------------------------
// Check if the player can stop swimming
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_canStopSwimming = function() {
	if(!this.CGMZ_isSwimming()) return false;
	if(this._cgmz_swimAnimationPhase !== "swim") return false;
	if(CGMZ.Swimming.SwimExitRegions.length > 0) {
		const regionId = $gameMap.regionId(this.x, this.y);
		if(!CGMZ.Swimming.SwimExitRegions.includes(regionId)) return false;
	}
	const dir = this.direction();
	const x2 = $gameMap.roundXWithDirection(this.x, dir);
	const y2 = $gameMap.roundYWithDirection(this.y, dir);
	return $gameMap.checkPassage(x2, y2, 0x0f);
};
//-----------------------------------------------------------------------------
// Prevent player from moving during swim animation
//-----------------------------------------------------------------------------
const alias_CGMZSwimming_GamePlayer_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
	const oldReturn = alias_CGMZSwimming_GamePlayer_canMove.call(this);
	if(!oldReturn) return false;
	return this._cgmz_swimAnimationPhase === "none" || this._cgmz_swimAnimationPhase === "swim"
};
//-----------------------------------------------------------------------------
// Play swim footstep on move if player is swimming
//-----------------------------------------------------------------------------
const alias_CGMZSwimming_GamePlayer_increaseSteps = Game_Player.prototype.increaseSteps;
Game_Player.prototype.increaseSteps = function() {
	alias_CGMZSwimming_GamePlayer_increaseSteps.call(this);
	if(this.CGMZ_isSwimming()) {
		this.CGMZ_playSwimSE('footstep');
	}
};
//-----------------------------------------------------------------------------
// Check if the map is passable for swimming player
//-----------------------------------------------------------------------------
const alias_CGMZSwimming_GamePlayer_isMapPassable = Game_Player.prototype.isMapPassable;
Game_Player.prototype.isMapPassable = function(x, y, d) {
	if(this.CGMZ_isSwimming()) {
		return this.CGMZ_isSwimPassable(x, y, d);
	} else {
		return alias_CGMZSwimming_GamePlayer_isMapPassable.apply(this, arguments);
	}
};
//-----------------------------------------------------------------------------
// Check if the map is passable for swimming player
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_isSwimPassable = function(x, y, d) {
	const x2 = $gameMap.roundXWithDirection(x, d);
	const y2 = $gameMap.roundYWithDirection(y, d);
	const region = $gameMap.regionId(x2, y2);
	const terrainTag = $gameMap.terrainTag(x2, y2);
	if(CGMZ.Swimming.SwimPassableRegions.includes(region)) return true;
	if(CGMZ.Swimming.SwimPassableTerrainTags.includes(terrainTag)) return true;
	return $gameMap.isBoatPassable(x2, y2);
};
//-----------------------------------------------------------------------------
// Refresh the bush depth for the player if they are swimming
//-----------------------------------------------------------------------------
const alias_CGMZSwimming_GamePlayer_refreshBushDepth = Game_Player.prototype.refreshBushDepth;
Game_Player.prototype.refreshBushDepth = function() {
    if(this.CGMZ_isSwimming()) {
		this._bushDepth = CGMZ.Swimming.SwimDepth;
	} else {
		alias_CGMZSwimming_GamePlayer_refreshBushDepth.call(this);
	}
};
//-----------------------------------------------------------------------------
// Set the y offset while swimming
//-----------------------------------------------------------------------------
const alias_CGMZSwimming_GamePlayer_shiftY = Game_Player.prototype.shiftY;
Game_Player.prototype.shiftY = function() {
    const oldReturn = alias_CGMZSwimming_GamePlayer_shiftY.call(this);
	return oldReturn + (this.CGMZ_isSwimming() * CGMZ.Swimming.SwimYOffset);
};
//-----------------------------------------------------------------------------
// Change dashing if not allowed while swimming
//-----------------------------------------------------------------------------
const alias_CGMZSwimming_GamePlayer_updateDashing = Game_Player.prototype.updateDashing;
Game_Player.prototype.updateDashing = function() {
	alias_CGMZSwimming_GamePlayer_updateDashing.call(this);
	if(this._dashing && this.CGMZ_isSwimming() && !$cgmz.canSwimDash()) this._dashing = false;
};
//-----------------------------------------------------------------------------
// Refresh for swim too
//-----------------------------------------------------------------------------
const alias_CGMZSwimming_GamePlayer_refresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function() {
	alias_CGMZSwimming_GamePlayer_refresh.call(this);
	if(this.CGMZ_isSwimming()) {
		const actor = $gameParty.leader();
		if(actor && actor.CGMZ_hasSwimImage()) {
			const characterName = actor.CGMZ_getSwimImage();
			const characterIndex = 0;
			this.setImage(characterName, characterIndex);
		}
	}
};
//=============================================================================
// Game_Actor
//-----------------------------------------------------------------------------
// Handle player swimming sprite
//=============================================================================
//-----------------------------------------------------------------------------
// Also add swimming variables
//-----------------------------------------------------------------------------
const alias_CGMZSwimming_GameActor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    alias_CGMZSwimming_GameActor_initMembers.call(this);
	this._cgmz_swimImage = "";
};
//-----------------------------------------------------------------------------
// Also set up swim image
//-----------------------------------------------------------------------------
const alias_CGMZSwimming_GameActor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    alias_CGMZSwimming_GameActor_setup.apply(this, arguments);
	this._cgmz_swimImage = $cgmzTemp.getSwimImage(actorId);
};
//-----------------------------------------------------------------------------
// Get swim image
//-----------------------------------------------------------------------------
Game_Actor.prototype.CGMZ_getSwimImage = function() {
    return this._cgmz_swimImage;
};
//-----------------------------------------------------------------------------
// Set swim image
//-----------------------------------------------------------------------------
Game_Actor.prototype.CGMZ_setSwimImage = function(swimImage) {
    this._cgmz_swimImage = swimImage;
};
//-----------------------------------------------------------------------------
// Check if the actor has a separate swimming image
//-----------------------------------------------------------------------------
Game_Actor.prototype.CGMZ_hasSwimImage = function() {
    return !!this._cgmz_swimImage;
};