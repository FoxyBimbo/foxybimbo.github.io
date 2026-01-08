/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/itempopup/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Show a window with item info the first time item is obtained
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
 * Made for RPG Maker MZ 1.8.1
 * ----------------------------------------------------------------------------
 * Description: Shows a window the first time an item is obtained with info
 * about that item. Subsequent times the item is obtained, the window will no
 * longer show up for the player. This can help the player read about the item
 * so they understand better how it can be used.
 * ----------------------------------------------------------------------------
 * Documentation:
 * -----------------------------Alpha Notes------------------------------------
 * Planned features to be added:
 * 1) Item window on map without separate scene
 * 2) More customization options for the item scene
 * 3) Popup option for when skill is first learned
 *
 * Want additional features not already present/listed above? Make suggestions
 * on the Patreon Post, Itch.io Page, or in my discord under the #suggestions
 * channel!
 * https://discord.gg/Gbx7JXP
 * -----------------------------Main Features----------------------------------
 * ITEM POPUP
 * Show an item window with information about an item the first time the player
 * obtains an item. Subsequent times the player obtains the item, the window
 * will no longer display automatically.
 * -----------------------------Integrations-----------------------------------
 * [CGMZ] Scene Backgrounds
 * This plugin will allow you to show a custom background image in the item
 * popup scene, including scrolling backgrounds.
 *
 * [CGMZ] Controls Window
 * This plugin will allow you to show controls during the Item Popup window.
 * It will display keyboard or gamepad controls, depending on the player's last
 * input.
 * ----------------------------Plugin Commands---------------------------------
 * This plugin has the following plugin commands:
 *
 * • Show Popup
 * Shows the item popup for the given item
 *
 * • Forget Item
 * Forgets that the item has already been obtained, so the popup can show again
 *
 * • Change Popup Allowed
 * Enable/disable the popup scene from displaying. Note that this will NOT
 * stop items from queueing their popup and when turned back on you may have a
 * lot of items in queue to display. This can be useful for a cutscene where
 * the player gains items, and you do not want the scene to interrupt the
 * scene but still want the popup to display after the scene ends.
 *
 * • Change Popup Queue
 * Enable/disable items from queueing their item popup. Note that this also
 * means items will not be counted as "collected" since their popup still has
 * not shown for the first time yet.
 * ------------------------------Integrations----------------------------------
 * This plugin has additional functionality when used with the below plugins:
 *
 * [CGMZ] Scene Backgrounds
 * Set up a scene background preset and then enter the preset id into the
 * scene background parameter here. This allows you to have a lot more options
 * when setting up your background image, including scrolling backgrounds.
 *
 * [CGMZ] Controls Window
 * Set up a controls window preset and then enter the preset id into the
 * controls window parameter here. This allows you to easily show keyboard or
 * gamepad controls for the Item Popup scene, depending on player's last input
 * type.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games
 *
 * This means the following will work in saved games:
 * ✓ Add this plugin to your game
 * ✓ Modify plugin parameters
 * ✓ Remove this plugin from your game
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_ItemPopup.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version adds the much requested feature of being able to
 * display a picture instead of an icon for each item. The image size is still
 * expected to conform to the icon width / height settings, but if there is a
 * lot of demand for custom sizes I can look into adding that in a future
 * update.
 *
 * This update also added some better handling for the item popup scene, as
 * you can now choose to also allow ok input to exit the scene. Further, you
 * can now set a minimum amount of frames for which the scene must display
 * before input can exit the scene.
 * 
 * Some bugs were also fixed. Previously, an item could queue multiple times
 * if it was gained multiple times before its item popup displayed, this is now
 * fixed. It will also no longer attempt to queue the item popup when losing
 * items. A crash was fixed that could have occurred if trying to display an
 * item popup for an invalid item.
 *
 * Version Alpha R2
 * - Added custom images for items/weapons/armors instead of icon only
 * - Added minimum display frame option before input enabled
 * - Added Ok input to exit scene option
 * - Fixed a bug that could cause an item to queue multiple times
 * - Fixed a bug that could cause item popup to show when losing items
 * - Fixed crash when trying to show item popup for invalid item
 *
 * @command Show Popup
 * @desc Show the item popup for the given item.
 *
 * @arg Item
 * @type item
 * @default 0
 * @desc The id of the item (leave 0 if showing wep/armor)
 *
 * @arg Weapon
 * @type weapon
 * @default 0
 * @desc The id of the weapon (leave 0 if showing item/armor)
 *
 * @arg Armor
 * @type armor
 * @default 0
 * @desc The id of the item (leave 0 if showing wep/item)
 *
 * @command Forget Item
 * @desc Forgets that the item has already been collected once
 *
 * @arg Item
 * @type item
 * @default 0
 * @desc The id of the item (leave 0 if showing wep/armor)
 *
 * @arg Weapon
 * @type weapon
 * @default 0
 * @desc The id of the weapon (leave 0 if showing item/armor)
 *
 * @arg Armor
 * @type armor
 * @default 0
 * @desc The id of the item (leave 0 if showing wep/item)
 *
 * @command Change Popup Allowed
 * @desc Enable/disable if item popups can display
 *
 * @arg Enable
 * @type boolean
 * @default true
 * @desc If true, item popups will be allowed to display. If false, they will not display.
 *
 * @command Change Popup Queue
 * @desc Enable/disable if item popups can queue
 *
 * @arg Enable
 * @type boolean
 * @default true
 * @desc If true, item popups will be allowed to queue. If false, they will not enter the queue to display.
 *
 * @param Mechanics
 *
 * @param Always Show Popup
 * @parent Mechanics
 * @type boolean
 * @default false
 * @desc If true, will always show the item popup window even after first obtain
 *
 * @param Allow Ok Input
 * @parent Mechanics
 * @type boolean
 * @default true
 * @desc If true, pressing the OK input will also close out of the item popup window
 *
 * @param Min Display Frames
 * @parent Mechanics
 * @type number
 * @default 0
 * @desc Minimum number of frames for which the popup must display before cancel is enabled
 *
 * @param Sound Effect
 * @parent Mechanics
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc Sound effect to play when the item popup scene displays
 *
 * @param Custom Data
 *
 * @param Item Data
 * @parent Custom Data
 * @type struct<ItemData>[]
 * @default []
 * @desc Set up custom data for items here, such as a custom image
 *
 * @param Weapon Data
 * @parent Custom Data
 * @type struct<WeaponData>[]
 * @default []
 * @desc Set up custom data for weapons here, such as a custom image
 *
 * @param Armor Data
 * @parent Custom Data
 * @type struct<ArmorData>[]
 * @default []
 * @desc Set up custom data for armors here, such as a custom image
 *
 * @param Window Options
 *
 * @param Display Info
 * @parent Window Options
 * @type select[]
 * @option New Item Found
 * @option Name
 * @option Image
 * @option Description
 * @option Note
 * @option Description Header
 * @option Blank Line
 * @default ["New Item Found","Name","Image","Description Header","Description"]
 * @desc Height of the item popup window (as percentage of screen height)
 *
 * @param Window Width
 * @parent Window Options
 * @type number
 * @default 50
 * @min 0
 * @max 100
 * @desc Width of the item popup window (as percentage of screen width)
 *
 * @param Window Height
 * @parent Window Options
 * @type number
 * @default 80
 * @min 0
 * @max 100
 * @desc Height of the item popup window (as percentage of screen height)
 *
 * @param Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc Custom windowskin to use for the item popup window
 *
 * @param Window Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @default -1
 * @desc Window padding. -1 = default padding
 *
 * @param Window Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @desc Window back opacity. -1 = default
 * @default -1
 *
 * @param Window Tone
 * @parent Window Options
 * @type struct<Tone>
 * @desc Window tone. -256 for Red = default tone
 * @default {"Red":"-256","Blue":"0","Green":"0"}
 *
 * @param Icon Height
 * @parent Window Options
 * @type number
 * @default 128
 * @desc Height of the item icon
 *
 * @param Icon Width
 * @parent Window Options
 * @type number
 * @default 128
 * @desc Width of the item icon
 *
 * @param Text Options
 *
 * @param Header Gradient 1
 * @parent Text Options
 * @type color
 * @default 1
 * @desc First text color of the gradient in headers
 *
 * @param Header Gradient 2
 * @parent Text Options
 * @type color
 * @default 0
 * @desc Second text color of the gradient in headers
 *
 * @param Draw Header Dividers
 * @parent Text Options
 * @type boolean
 * @default true
 * @desc Draw dividing horizontal lines in header?
 *
 * @param Item Found Text
 * @parent Text Options
 * @default New Item Found!
 * @desc Text to display for the new item found line
 *
 * @param Description Header Text
 * @parent Text Options
 * @default Information
 * @desc Text to display for the description header
 *
 * @param Integrations
 *
 * @param Scene Background
 * @parent Integrations
 * @desc [CGMZ] Scene Background preset id to show in the item popup scene
 *
 * @param Controls Window
 * @parent Integrations
 * @desc [CGMZ] Controls Window preset id to show in the item popup scene
*/
/*~struct~ItemData:
 * @param Item
 * @type item
 * @desc The item to add custom data for
 * @default 0
 *
 * @param Image
 * @type file
 * @dir img/
 * @desc The custom image to associate with the item
*/
/*~struct~WeaponData:
 * @param Weapon
 * @type weapon
 * @desc The weapon to add custom data for
 * @default 0
 *
 * @param Image
 * @type file
 * @dir img/
 * @desc The custom image to associate with the weapon
*/
/*~struct~ArmorData:
 * @param Armor
 * @type armor
 * @desc The armor to add custom data for
 * @default 0
 *
 * @param Image
 * @type file
 * @dir img/
 * @desc The custom image to associate with the armor
*/
/*~struct~Tone:
 * @param Red
 * @type number
 * @min -256
 * @max 255
 * @desc Amount of Red in the tone. -256 = custom tone will be ignored
 * @default 0
 *
 * @param Blue
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of Blue in the tone.
 * @default 0
 *
 * @param Green
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of Green in the tone.
 * @default 0
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
Imported.CGMZ_ItemPopup = true;
CGMZ.Versions["Item Popup"] = "Alpha R2";
CGMZ.ItemPopup = {};
CGMZ.ItemPopup.parameters = PluginManager.parameters('CGMZ_ItemPopup');
CGMZ.ItemPopup.ItemFoundText = CGMZ.ItemPopup.parameters["Item Found Text"];
CGMZ.ItemPopup.DescriptionHeaderText = CGMZ.ItemPopup.parameters["Description Header Text"];
CGMZ.ItemPopup.SceneBackground = CGMZ.ItemPopup.parameters["Scene Background"];
CGMZ.ItemPopup.ControlsWindow = CGMZ.ItemPopup.parameters["Controls Window"];
CGMZ.ItemPopup.Windowskin = CGMZ.ItemPopup.parameters["Windowskin"];
CGMZ.ItemPopup.WindowWidth = Number(CGMZ.ItemPopup.parameters["Window Width"]);
CGMZ.ItemPopup.WindowHeight = Number(CGMZ.ItemPopup.parameters["Window Height"]);
CGMZ.ItemPopup.HeaderGradient1 = Number(CGMZ.ItemPopup.parameters["Header Gradient 1"]);
CGMZ.ItemPopup.HeaderGradient2 = Number(CGMZ.ItemPopup.parameters["Header Gradient 2"]);
CGMZ.ItemPopup.IconHeight = Number(CGMZ.ItemPopup.parameters["Icon Height"]);
CGMZ.ItemPopup.IconWidth = Number(CGMZ.ItemPopup.parameters["Icon Width"]);
CGMZ.ItemPopup.WindowPadding = Number(CGMZ.ItemPopup.parameters["Window Padding"]);
CGMZ.ItemPopup.WindowBackOpacity = Number(CGMZ.ItemPopup.parameters["Window Back Opacity"]);
CGMZ.ItemPopup.MinDisplayFrames = Number(CGMZ.ItemPopup.parameters["Min Display Frames"]);
CGMZ.ItemPopup.AlwaysShowPopup = (CGMZ.ItemPopup.parameters["Always Show Popup"] === 'true');
CGMZ.ItemPopup.DrawHeaderDividers = (CGMZ.ItemPopup.parameters["Draw Header Dividers"] === 'true');
CGMZ.ItemPopup.AllowOkInput = (CGMZ.ItemPopup.parameters["Allow Ok Input"] === 'true');
CGMZ.ItemPopup.DisplayInfo = CGMZ_Utils.parseJSON(CGMZ.ItemPopup.parameters["Display Info"], [], "[CGMZ] Item Popup", "Your Display Info parameter was set up incorrectly and could not be read. It cannot be blank.");
CGMZ.ItemPopup.ItemData = CGMZ_Utils.parseJSON(CGMZ.ItemPopup.parameters["Item Data"], [], "[CGMZ] Item Popup", "Your Item Data parameter was set up incorrectly and could not be read. It cannot be blank.");
CGMZ.ItemPopup.WeaponData = CGMZ_Utils.parseJSON(CGMZ.ItemPopup.parameters["Weapon Data"], [], "[CGMZ] Item Popup", "Your Weapon Data parameter was set up incorrectly and could not be read. It cannot be blank.");
CGMZ.ItemPopup.ArmorData = CGMZ_Utils.parseJSON(CGMZ.ItemPopup.parameters["Armor Data"], [], "[CGMZ] Item Popup", "Your Armor Data parameter was set up incorrectly and could not be read. It cannot be blank.");
CGMZ.ItemPopup.SoundEffect = CGMZ_Utils.parseSoundEffectJSON(CGMZ.ItemPopup.parameters["Sound Effect"], "[CGMZ] Item Popup");
CGMZ.ItemPopup.WindowTone = CGMZ_Utils.parseToneJSON(CGMZ.ItemPopup.parameters["Window Tone"], "[CGMZ] Item Popup");
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Add saved item popup data
//=============================================================================
//-----------------------------------------------------------------------------
// Method used by CGMZ for creating plugin data
//-----------------------------------------------------------------------------
const alias_CGMZItemPopup_CGMZCore_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZItemPopup_CGMZCore_createPluginData.call(this);
	this.initializeItemPopupData();
};
//-----------------------------------------------------------------------------
// Check if data should load for saved game
//-----------------------------------------------------------------------------
const alias_CGMZItemPopup_CGMZCore_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZItemPopup_CGMZCore_onAfterLoad.call(this);
	this.initializeItemPopupData();
};
//-----------------------------------------------------------------------------
// Initialize item popup data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeItemPopupData = function() {
	if(!this._itemPopupData) {
		this._itemPopupData = {items: [], weapons: [], armors: []};
		this._canShowItemPopup = true;
		this._canQueueItemPopup = true;
	}
};
//-----------------------------------------------------------------------------
// Check if an item has already displayed its popup
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.hasItemPopupDisplayed = function(id, type) {
	switch(type) {
		case 'item': return !!this._itemPopupData.items[id];
		case 'weapon': return !!this._itemPopupData.weapons[id];
		case 'armor': return !!this._itemPopupData.armors[id];
	}
	// Item type unrecognized, return true so no popup tries to display
	return true;
};
//-----------------------------------------------------------------------------
// Handling for when an item popup displays
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.onItemPopupDisplay = function(id, type) {
	switch(type) {
		case 'item': this._itemPopupData.items[id] = true; break;
		case 'weapon': this._itemPopupData.weapons[id] = true; break;
		case 'armor': this._itemPopupData.armors[id] = true; break;
	}
};
//-----------------------------------------------------------------------------
// Forget an item had its popup already displayed
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.forgetItemPopupDisplayed = function(id, type) {
	switch(type) {
		case 'item': this._itemPopupData.items[id] = false; break;
		case 'weapon': this._itemPopupData.weapons[id] = false; break;
		case 'armor': this._itemPopupData.armors[id] = false; break;
	}
};
//-----------------------------------------------------------------------------
// Check if showing item popups is currently enabled
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.canShowItemPopup = function() {
	return this._canShowItemPopup;
};
//-----------------------------------------------------------------------------
// Change showing of item popups (this does not prevent queue)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.changeItemPopupEnabled = function(enable) {
	this._canShowItemPopup = enable;
};
//-----------------------------------------------------------------------------
// Check if queueing items for popup is allowed
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.canQueueItemPopup = function() {
	return this._canQueueItemPopup;
};
//-----------------------------------------------------------------------------
// Change whether items can queue a popup or not when obtained
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.changeItemPopupQueueEnabled = function(enable) {
	this._canQueueItemPopup = enable;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Add item popup unsaved data
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize item popup data
//-----------------------------------------------------------------------------
const alias_CGMZItemPopup_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZItemPopup_CGMZTemp_createPluginData.call(this);
	this.initializeItemPopupData();
};
//-----------------------------------------------------------------------------
// Initialize item popup data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeItemPopupData = function() {
	this.itemPopupQueue = [];
	this.itemPopupDisplaying = false;
	this.itemPopupCustomData = {
		item: {},
		armor: {},
		weapon: {}
	};
	for(const json of CGMZ.ItemPopup.ItemData) {
		const item = CGMZ_Utils.parseJSON(json, null, "[CGMZ] Item Popup", "One of your custom item datas was set up incorrectly and could not be read.");
		if(!item) continue;
		const id = Number(item.Item);
		const obj = {img: item.Image}
		this.itemPopupCustomData.item[id] = obj;
	}
	for(const json of CGMZ.ItemPopup.WeaponData) {
		const wep = CGMZ_Utils.parseJSON(json, null, "[CGMZ] Item Popup", "One of your custom weapon datas was set up incorrectly and could not be read.");
		if(!wep) continue;
		const id = Number(wep.Weapon);
		const obj = {img: wep.Image}
		this.itemPopupCustomData.weapon[id] = obj;
	}
	for(const json of CGMZ.ItemPopup.ArmorData) {
		const armor = CGMZ_Utils.parseJSON(json, null, "[CGMZ] Item Popup", "One of your custom armor datas was set up incorrectly and could not be read.");
		if(!armor) continue;
		const id = Number(armor.Armor);
		const obj = {img: armor.Image}
		this.itemPopupCustomData.armor[id] = obj;
	}
};
//-----------------------------------------------------------------------------
// Get custom data for item/weapon/armor types
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getCustomItemPopupData = function(id, type) {
	return this.itemPopupCustomData[type][id];
};
//-----------------------------------------------------------------------------
// Check if there is a queue of item popups
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.hasItemPopup = function() {
	return this.itemPopupQueue.length > 0;
};
//-----------------------------------------------------------------------------
// Add an item info to queue for popup later
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.addItemPopupToQueue = function(info) {
	if(!$cgmz.canQueueItemPopup()) return;
	if(!this.canQueueItemPopup(info)) return;
	this.itemPopupQueue.push(info);
};
//-----------------------------------------------------------------------------
// Check if same item already queued
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.canQueueItemPopup = function(info) {
	for(const obj of this.itemPopupQueue) {
		if(obj.type === info.type && obj.id === info.id) return false;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Add an item info to queue for popup later
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getNextItemPopupFromQueue = function() {
	return this.itemPopupQueue.shift();
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZItemPopup_CGMZ_Temp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZItemPopup_CGMZ_Temp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_ItemPopup", "Show Popup", this.pluginCommandItemPopupShowPopup);
	PluginManager.registerCommand("CGMZ_ItemPopup", "Forget Item", this.pluginCommandItemPopupForgetItem);
	PluginManager.registerCommand("CGMZ_ItemPopup", "Change Popup Allowed", this.pluginCommandItemPopupChangePopupAllowed);
	PluginManager.registerCommand("CGMZ_ItemPopup", "Change Popup Queue", this.pluginCommandItemPopupChangePopupQueue);
};
//-----------------------------------------------------------------------------
// Plugin Command - Show Popup
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandItemPopupShowPopup = function(args) {
	const item = Number(args.Item);
	const weapon = Number(args.Weapon);
	const armor = Number(args.Armor);
	const type = (item) ? 'item' : (weapon) ? 'weapon' : 'armor';
	const id = item || weapon || armor;
	if(id) {
		$cgmzTemp.addItemPopupToQueue({type: type, id: id});
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Forget Item
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandItemPopupForgetItem = function(args) {
	const item = Number(args.Item);
	const weapon = Number(args.Weapon);
	const armor = Number(args.Armor);
	const type = (item) ? 'item' : (weapon) ? 'weapon' : 'armor';
	const id = item || weapon || armor;
	$cgmz.forgetItemPopupDisplayed(id, type);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Popup Allowed
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandItemPopupChangePopupAllowed = function(args) {
	const enable = (args.Enable === 'true');
	$cgmz.changeItemPopupEnabled(enable);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Popup Queue
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandItemPopupChangePopupQueue = function(args) {
	const enable = (args.Enable === 'true');
	$cgmz.changeItemPopupQueueEnabled(enable);
};
//=============================================================================
// CGMZ_Scene_ItemPopup
//-----------------------------------------------------------------------------
// Handle the item popup scene
//=============================================================================
function CGMZ_Scene_ItemPopup() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_ItemPopup.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_ItemPopup.prototype.constructor = CGMZ_Scene_ItemPopup;
//-----------------------------------------------------------------------------
// Initialize the scene
//-----------------------------------------------------------------------------
CGMZ_Scene_ItemPopup.prototype.initialize = function() {
	Scene_MenuBase.prototype.initialize.call(this);
	this._id = 0;
	this._type = "";
	this._displayFrames = 0;
};
//-----------------------------------------------------------------------------
// Set displaying flag to false
//-----------------------------------------------------------------------------
CGMZ_Scene_ItemPopup.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
	this._displayFrames++;
};
//-----------------------------------------------------------------------------
// Set displaying flag to false
//-----------------------------------------------------------------------------
CGMZ_Scene_ItemPopup.prototype.terminate = function() {
	$cgmzTemp.itemPopupDisplaying = false;
    Scene_MenuBase.prototype.terminate.call(this);
};
//-----------------------------------------------------------------------------
// Prepare the item popup scene
//-----------------------------------------------------------------------------
CGMZ_Scene_ItemPopup.prototype.prepare = function(id, type) {
	this._id = id;
	this._type = type;
};
//-----------------------------------------------------------------------------
// Create item popup scene objects
//-----------------------------------------------------------------------------
CGMZ_Scene_ItemPopup.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createItemPopupWindow();
	this.playSoundEffect();
};
//-----------------------------------------------------------------------------
// Play item popup sound effect
//-----------------------------------------------------------------------------
CGMZ_Scene_ItemPopup.prototype.playSoundEffect = function() {
    AudioManager.playSe(CGMZ.ItemPopup.SoundEffect);
};
//-----------------------------------------------------------------------------
// Create roll window
//-----------------------------------------------------------------------------
CGMZ_Scene_ItemPopup.prototype.createItemPopupWindow = function() {
	const rect = this.itemPopupWindowRect();
    this._itemPopupWindow = new CGMZ_Window_ItemPopup(rect, this._id, this._type);
	this._itemPopupWindow.setHandler('cancel', this.attemptPopScene.bind(this));
	if(CGMZ.ItemPopup.AllowOkInput) this._itemPopupWindow.setHandler('ok', this.attemptPopScene.bind(this));
	this._itemPopupWindow.activate();
    this.addWindow(this._itemPopupWindow);
};
//-----------------------------------------------------------------------------
// Get the roll window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_ItemPopup.prototype.itemPopupWindowRect = function() {
	const width = Graphics.boxWidth * (CGMZ.ItemPopup.WindowWidth / 100.0);
	const height = Graphics.boxHeight * (CGMZ.ItemPopup.WindowHeight / 100.0);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight / 2 - height / 2;
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Attempt to pop the scene (check min display frames first)
//-----------------------------------------------------------------------------
CGMZ_Scene_ItemPopup.prototype.attemptPopScene = function() {
	if(this._displayFrames > CGMZ.ItemPopup.MinDisplayFrames) {
		SoundManager.playCancel();
		this.popScene();
	}
};
//-----------------------------------------------------------------------------
// Get the item popup scene's custom scene background
// No need to check if Scene Backgrounds is installed because this custom func
// is only called by that plugin
//-----------------------------------------------------------------------------
CGMZ_Scene_ItemPopup.prototype.CGMZ_getCustomSceneBackground = function() {
	return $cgmzTemp.sceneBackgroundPresets[CGMZ.ItemPopup.SceneBackground];
};
//-----------------------------------------------------------------------------
// Get controls window preset for [CGMZ] Controls Window
// No need to check if plugin is installed because this custom func is only called by that plugin
//-----------------------------------------------------------------------------
CGMZ_Scene_ItemPopup.prototype.CGMZ_getControlsWindowOtherPreset = function() {
	return $cgmzTemp.getControlWindowPresetOther(CGMZ.ItemPopup.ControlsWindow);
};
//=============================================================================
// CGMZ_Window_ItemPopup
//-----------------------------------------------------------------------------
// Window to show item info
//=============================================================================
function CGMZ_Window_ItemPopup(rect, types) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_ItemPopup.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_ItemPopup.prototype.constructor = CGMZ_Window_ItemPopup;
//-----------------------------------------------------------------------------
// Create cgmz window options object
//-----------------------------------------------------------------------------
CGMZ_Window_ItemPopup.prototype.CGMZ_createWindowOptions = function() {
	CGMZ_Window_Scrollable.prototype.CGMZ_createWindowOptions.call(this);
	if(CGMZ.ItemPopup.Windowskin) this.cgmzOpts.windowskin = CGMZ.ItemPopup.Windowskin;
	if(CGMZ.ItemPopup.WindowPadding >= 0) this.cgmzOpts.padding = CGMZ.ItemPopup.WindowPadding;
	if(CGMZ.ItemPopup.WindowBackOpacity >= 0) this.cgmzOpts.backOpacity = CGMZ.ItemPopup.WindowBackOpacity;
	if(CGMZ.ItemPopup.WindowTone?.Red >= -255) this.cgmzOpts.tone = [CGMZ.ItemPopup.WindowTone.Red, CGMZ.ItemPopup.WindowTone.Green, CGMZ.ItemPopup.WindowTone.Blue];
};
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_ItemPopup.prototype.initialize = function(rect, id, type) {
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, 20);
	this._id = id;
	this._type = type;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Process Handling
//-----------------------------------------------------------------------------
CGMZ_Window_ItemPopup.prototype.processHandling = function() {
	CGMZ_Window_Scrollable.prototype.processHandling.call(this);
	if (this.isActive()) {
		if (this.isOkEnabled() && (Input.isRepeated('ok') || TouchInput.isTriggered())) {
			this.processOk();
		}
	}
};
//-----------------------------------------------------------------------------
// Process Cancel
//-----------------------------------------------------------------------------
CGMZ_Window_ItemPopup.prototype.processCancel = function() {
	this.updateInputData();
	this.callCancelHandler();
};
//-----------------------------------------------------------------------------
// Process ok
//-----------------------------------------------------------------------------
CGMZ_Window_ItemPopup.prototype.processOk = function() {
	this.updateInputData();
	this.callOkHandler();
};
//-----------------------------------------------------------------------------
// Call Ok Handler
//-----------------------------------------------------------------------------
CGMZ_Window_ItemPopup.prototype.callOkHandler = function() {
	this.callHandler('ok');
};
//-----------------------------------------------------------------------------
// Check if ok handling exists
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.isOkEnabled = function() {
	return this.isHandled('ok');
};
//-----------------------------------------------------------------------------
// Draw item
//-----------------------------------------------------------------------------
CGMZ_Window_ItemPopup.prototype.refresh = function() {
	this.contents.clear();
	this._neededHeight = 0;
	const data = CGMZ_Utils.lookupItem(this._type, this._id);
	const customData = $cgmzTemp.getCustomItemPopupData(this._id, this._type);
	const headerOpts = {padding: null, drawDividers: CGMZ.ItemPopup.DrawHeaderDividers};
	for(const info of CGMZ.ItemPopup.DisplayInfo) {
		switch(info) {
			case 'New Item Found':
				this._neededHeight += this.CGMZ_drawTextLine(CGMZ.ItemPopup.ItemFoundText, 0, this._neededHeight, this.contents.width, "center");
				break;
			case 'Name':
				this._neededHeight += this.CGMZ_drawTextLine(data.name, 0, this._neededHeight, this.contents.width, "center");
				break;
			case 'Image':
				if(customData?.img) {
					this.loadAndDrawImg(customData.img);
					this._neededHeight += CGMZ.ItemPopup.IconHeight;
				} else if(data.iconIndex) {
					this.bltIcon(data.iconIndex);
					this._neededHeight += CGMZ.ItemPopup.IconHeight;
				}
				break;
			case 'Description':
				this._neededHeight += this.CGMZ_drawText(data.description, 0, 0, this._neededHeight, this.contents.width, "center");
				break;
			case 'Note':
				if(data.meta?.cgmzitempopup) {
					this._neededHeight += this.CGMZ_drawText(data.meta.cgmzitempopup, 0, 0, this._neededHeight, this.contents.width, "center");
				}
				break;
			case 'Description Header':
				this._neededHeight += this.CGMZ_drawHeader(CGMZ.ItemPopup.DescriptionHeaderText, this._neededHeight, CGMZ.ItemPopup.HeaderGradient1, CGMZ.ItemPopup.HeaderGradient2, headerOpts);
				break;
			case 'Blank Line': this._neededHeight += this.lineHeight(); break;
		}
	}
	this._neededHeight += this.padding * 2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Blt a custom image
//-----------------------------------------------------------------------------
CGMZ_Window_ItemPopup.prototype.loadAndDrawImg = function(img) {
    const imgData = CGMZ_Utils.getImageData(img, "img/");
	const bitmap = ImageManager.loadBitmap(imgData.folder, imgData.filename);
	const drawFunc = function(rect, bitmap) {
		const sx = sy = 0;
		const sw = bitmap.width;
		const sh = bitmap.height;
		this.contents.blt(bitmap, sx, sy, sw, sh, rect.x, rect.y, rect.width, rect.height);
	};
	const dw = CGMZ.ItemPopup.IconWidth;
	const dh = CGMZ.ItemPopup.IconHeight;
	const dy = this._neededHeight;
	const dx = this.contents.width / 2 - dw / 2;
    bitmap.addLoadListener(drawFunc.bind(this, new Rectangle(dx, dy, dw, dh), bitmap));
};
//-----------------------------------------------------------------------------
// Blt the item icon
//-----------------------------------------------------------------------------
CGMZ_Window_ItemPopup.prototype.bltIcon = function(iconIndex) {
    const bitmap = ImageManager.loadSystem("IconSet");
    const sw = ImageManager.iconWidth;
    const sh = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * sw;
    const sy = Math.floor(iconIndex / 16) * sh;
	const dw = CGMZ.ItemPopup.IconWidth;
	const dh = CGMZ.ItemPopup.IconHeight;
	const dy = this._neededHeight;
	const dx = this.contents.width / 2 - dw / 2;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Check if item popup should queue
//=============================================================================
//-----------------------------------------------------------------------------
// Check if item popup should be added to queue when item is gained
//-----------------------------------------------------------------------------
const alias_CGMZItemPopup_GameParty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    alias_CGMZItemPopup_GameParty_gainItem.apply(this, arguments);
	if(item && amount > 0) {
		const type = (DataManager.isItem(item)) ? "item" : (DataManager.isWeapon(item)) ? "weapon" : (DataManager.isArmor(item)) ? "armor" : "invalid";
		const id = item.id;
		if(this.CGMZItemPopup_shouldPop(id, type)) {
			$cgmzTemp.addItemPopupToQueue({type: type, id: id});
		}
	}
};
//-----------------------------------------------------------------------------
// Check if item should be added to popup queue
//-----------------------------------------------------------------------------
Game_Party.prototype.CGMZItemPopup_shouldPop = function(id, type) {
	if(CGMZ.ItemPopup.AlwaysShowPopup) return true;
    return !$cgmz.hasItemPopupDisplayed(id, type);
};
//=============================================================================
// Scene_Map
//-----------------------------------------------------------------------------
// Change to item popup scene if needed
//=============================================================================
//-----------------------------------------------------------------------------
// Check if item popup scene should display
//-----------------------------------------------------------------------------
const alias_CGMZItemPopup_SceneMap_updateScene = Scene_Map.prototype.updateScene;
Scene_Map.prototype.updateScene = function() {
    alias_CGMZItemPopup_SceneMap_updateScene.call(this);
    if(!SceneManager.isSceneChanging()) {
        this.CGMZ_updateItemPopup();
    }
};
//-----------------------------------------------------------------------------
// Show item popup if able and one exists
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_updateItemPopup = function() {
    if(this.CGMZ_canItemPopup()) {
		const popup = $cgmzTemp.getNextItemPopupFromQueue();
		if(popup && popup.id && popup.type) {
			SceneManager.push(CGMZ_Scene_ItemPopup);
			SceneManager.prepareNextScene(popup.id, popup.type);
			$cgmzTemp.itemPopupDisplaying = true;
			$cgmz.onItemPopupDisplay(popup.id, popup.type);
		}
	}
};
//-----------------------------------------------------------------------------
// Check if item popup can pop up
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_canItemPopup = function() {
    if(!$cgmzTemp.hasItemPopup()) return false;
	if(!$cgmz.canShowItemPopup()) return false;
	return !$cgmzTemp.itemPopupDisplaying;
};