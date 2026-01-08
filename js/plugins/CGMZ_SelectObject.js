/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/selectobject/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Better UI and more functionality when selecting objects
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
 * Description: Focused on creating a better UI for selecting objects such as
 * items than the default Select Item event command. Also allows you to select
 * other types of objects, like weapons, armors, etc.
 * ----------------------------------------------------------------------------
 * Documentation:
 * Hi all, this plugin is meant to improve the UI for selecting an item. By
 * default, the select item event command is pretty basic, showing a simple
 * item list in the message window area. This plugin improves on that by
 * creating two new windows for an improved selection experience.
 *
 * Select Window - This is the window that the user will move the cursor
 * around to select an item. You can change what is drawn for each item here,
 * as well as change the columns. This means you can make it a more standard
 * RTP item list with an icon and a name, or you can make it icon only and
 * show multiple icons per row. It is up to you.
 *
 * Info Window - This is the window that displays more info about the item
 * currently highlighted in the Select Window. You can show the item name,
 * item description, possession count, and more. It can be used to help the
 * player remember what the item they are selecting is.
 *
 * -- Selection Features --
 * This plugin expands the selection features, allowing you to not only select
 * items but also other objects. So far, the other objects that are available
 * are weapons and armors, however I have plans to expand this to things like
 * skills, actors, and even custom data types like [CGMZ] Professions.
 *
 * To use these other selection types, simply select the proper plugin command
 * for the object type you want to select
 *
 * -- Filters --
 * Each object type comes with its own filters to filter the list of available
 * items. You can set as many filters as needed in the plugin command.
 * 
 * -- On Map --
 * Just like the default item select, this process occurs entirely on the map
 * scene and will continue displaying the message window if the previous event
 * command was Show Text. If you would like the message window to not display,
 * you can add an event command between the plugin command and the previous
 * Show Text event command, such as a wait 1 frame or a comment.
 *
 * -- Using Selection Result --
 * When you add your Select Object plugin command, make sure to set the
 * Variable parameter. This is the game variable that will be set to the id of
 * the selected object, or 0 if no item was selected. You can then use this
 * variable in a conditional branch or elsewhere to check what object the 
 * player selected with an ease of use similar to the default Select Item
 * event command.
 * ------------------------------Integrations----------------------------------
 * This plugin includes additional functionality when used alongside:
 *
 * [CGMZ] Window Settings
 * Allows you to customize the select and info windows windowskins, tone,
 * style, and more.
 *
 * [CGMZ] Window Backgrounds
 * Allows you to show an image as the select or info windows backgrounds,
 * including an animated scrolling parallax image.
 * ----------------------------Plugin Commands---------------------------------
 * This plugin includes the following plugin commands:
 *
 * • Select Item
 * This starts the select item flow, similar to the standard Select Item event
 * command, but more powerful and uses the customizable UI instead of being in
 * the message window.
 *
 * • Select Weapon
 * This starts the select weapon flow, allows the player to select a weapon.
 *
 * • Select Armor
 * This starts the select armor flow, allows the player to select an armor.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * --------------------------------Filename------------------------------------
 * The filename for this plugin MUST remain CGMZ_SelectObject.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this version changes the singular Select Object plugin command
 * into separate plugin commands. This is mostly due to the filtering system
 * that was added in this version, as you can now select items/weapons/armors
 * based on various criteria like item, weapon, armor, or equip type ids.
 * When everything was selectable in one plugin command, it quickly got
 * confusing with filter options that were not valid for some select types.
 *
 * The following filters have been added:
 * Item - id, item type, price min/max
 * Weapon - id, weapon type, price min/max, party equip status
 * Armor - id, armor type, equip type, price min/max, party equip status
 *
 * The text that displays when the player does not have an object to select
 * now has different parameters for each type of object, so you can make your
 * weapon selections say something specific about not having weapons. Before,
 * it was shared between all selection types.
 *
 * Version Alpha R2
 * - Added various filters for selection objects
 * - Added separate no object text for weapons / armors
 * - Split plugin command into separate plugin commands by select type
 *
 * @command Select Item
 * @desc Select an item from ui
 *
 * @arg Variable
 * @type variable
 * @default 0
 * @desc The variable id to store the result in
 *
 * @arg Filters
 *
 * @arg Ids
 * @parent Filters
 * @type item[]
 * @default []
 * @desc These item ids only if set. If empty array, this filter is skipped.
 *
 * @arg Item Type
 * @parent Filters
 * @type select[]
 * @option Regular Item
 * @option Key Item
 * @option Hidden Item A
 * @option Hidden Item B
 * @default []
 * @desc The type the item must be. If empty, all item types will be included
 *
 * @arg Cost Min
 * @parent Filters
 * @type number
 * @default 0
 * @desc Minimum cost the item can have
 *
 * @arg Cost Max
 * @parent Filters
 * @type number
 * @default 999999
 * @desc Maximum cost the item can have
 *
 * @command Select Weapon
 * @desc Select a weapon from ui
 *
 * @arg Variable
 * @type variable
 * @default 0
 * @desc The variable id to store the result in
 *
 * @arg Filters
 *
 * @arg Ids
 * @parent Filters
 * @type weapon[]
 * @default []
 * @desc These item ids only if set. If empty array, this filter is skipped.
 *
 * @arg Weapon Type
 * @parent Filters
 * @type text[]
 * @default []
 * @desc The type the weapon must be. If empty, all weapon types will be included
 *
 * @arg Cost Min
 * @parent Filters
 * @type number
 * @default 0
 * @desc Minimum cost the item can have
 *
 * @arg Cost Max
 * @parent Filters
 * @type number
 * @default 999999
 * @desc Maximum cost the item can have
 *
 * @arg Party Equip
 * @parent Filters
 * @type select
 * @option Skip
 * @option Equipped
 * @option Unequipped
 * @default Skip
 * @desc The equip status (party wide). If skip, this filter is skipped
 *
 * @command Select Armor
 * @desc Select an armor from ui
 *
 * @arg Variable
 * @type variable
 * @default 0
 * @desc The variable id to store the result in
 *
 * @arg Filters
 *
 * @arg Ids
 * @parent Filters
 * @type armor[]
 * @default []
 * @desc These item ids only if set. If empty array, this filter is skipped.
 *
 * @arg Armor Type
 * @parent Filters
 * @type text[]
 * @default []
 * @desc The type the armor must be. If empty, all armor types will be included
 *
 * @arg Equip Type
 * @parent Filters
 * @type text[]
 * @default []
 * @desc The type of equip the armor must be. If empty, all equip types will be included
 *
 * @arg Cost Min
 * @parent Filters
 * @type number
 * @default 0
 * @desc Minimum cost the item can have
 *
 * @arg Cost Max
 * @parent Filters
 * @type number
 * @default 999999
 * @desc Maximum cost the item can have
 *
 * @arg Party Equip
 * @parent Filters
 * @type select
 * @option Skip
 * @option Equipped
 * @option Unequipped
 * @default Skip
 * @desc The equip status (party wide). If skip, this filter is skipped
 *
 * @param Select Window Options
 *
 * @param Columns
 * @parent Select Window Options
 * @type number
 * @default 1
 * @desc Amount of columns to display in the select window
 *
 * @param Select Alignment
 * @parent Select Window Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc Alignment of text in the select window
 *
 * @param Item Select String
 * @parent Select Window Options
 * @default %icon%name
 * @desc The string to show for each item in the select window
 *
 * @param Armor Select String
 * @parent Select Window Options
 * @default %icon%name
 * @desc The string to show for each armor in the select window
 *
 * @param Weapon Select String
 * @parent Select Window Options
 * @default %icon%name
 * @desc The string to show for each weapon in the select window
 *
 * @param Info Window Options
 *
 * @param Item Display Info
 * @parent Info Window Options
 * @type select[]
 * @option Name
 * @option Possession
 * @option Description
 * @option Description Header
 * @option Blank Line
 * @option Custom Space
 * @default ["Name","Custom Space","Description Header","Description","Custom Space","Possession"]
 * @desc The info to draw for the item display, and the order in which to draw it.
 *
 * @param Weapon Display Info
 * @parent Info Window Options
 * @type select[]
 * @option Name
 * @option Possession
 * @option Description
 * @option Description Header
 * @option Blank Line
 * @option Custom Space
 * @default ["Name","Custom Space","Description Header","Description","Custom Space","Possession"]
 * @desc The info to draw for the weapon display, and the order in which to draw it.
 *
 * @param Armor Display Info
 * @parent Info Window Options
 * @type select[]
 * @option Name
 * @option Possession
 * @option Description
 * @option Description Header
 * @option Blank Line
 * @option Custom Space
 * @default ["Name","Custom Space","Description Header","Description","Custom Space","Possession"]
 * @desc The info to draw for the armor display, and the order in which to draw it.
 *
 * @param Custom Space
 * @parent Info Window Options
 * @type number
 * @default 6
 * @desc Amount of blank vertical space to leave when drawing a custom space line item
 *
 * @param Label Color
 * @parent Info Window Options
 * @type color
 * @default 1
 * @desc The color of label text
 *
 * @param Header Color 1
 * @parent Info Window Options
 * @type color
 * @default 1
 * @desc The first color in the header gradient
 *
 * @param Header Color 2
 * @parent Info Window Options
 * @type color
 * @default 0
 * @desc The second color in the header gradient
 *
 * @param Header Padding
 * @parent Info Window Options
 * @type number
 * @default -1
 * @min -1
 * @desc Amount of padding for headers. Set to -1 for default padding.
 *
 * @param Draw Dividers
 * @parent Info Window Options
 * @type boolean
 * @default true
 * @desc If true, header dividing lines will be drawn. If false, header dividing lines will not be drawn
 *
 * @param Text Options
 *
 * @param No Item Text
 * @parent Text Options
 * @default You do not have any valid items for this!
 * @desc Text to display in the object select window when there are no valid items to select from.
 *
 * @param No Weapon Text
 * @parent Text Options
 * @default You do not have any valid weapons for this!
 * @desc Text to display in the object select window when there are no valid weapons to select from.
 *
 * @param No Armor Text
 * @parent Text Options
 * @default You do not have any valid armor for this!
 * @desc Text to display in the object select window when there are no valid armors to select from.
 *
 * @param Description Header
 * @parent Text Options
 * @default Description
 * @desc Text to put in the description header
 *
 * @param Possession Label
 * @parent Text Options
 * @default Possession:
 * @desc Text to put in the possession label
 *
 * @param Integrations
 *
 * @param Select Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use for the select window
 *
 * @param Info Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use for the info window
 *
 * @param Select Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use for the select window
 *
 * @param Info Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use for the info window
*/
Imported.CGMZ_SelectObject = true;
CGMZ.Versions["Select Object"] = "Alpha R2";
CGMZ.SelectObject = {};
CGMZ.SelectObject.parameters = PluginManager.parameters('CGMZ_SelectObject');
CGMZ.SelectObject.NoItemText = CGMZ.SelectObject.parameters["No Item Text"];
CGMZ.SelectObject.NoWeaponText = CGMZ.SelectObject.parameters["No Weapon Text"];
CGMZ.SelectObject.NoArmorText = CGMZ.SelectObject.parameters["No Armor Text"];
CGMZ.SelectObject.ItemSelectString = CGMZ.SelectObject.parameters["Item Select String"];
CGMZ.SelectObject.ArmorSelectString = CGMZ.SelectObject.parameters["Armor Select String"];
CGMZ.SelectObject.WeaponSelectString = CGMZ.SelectObject.parameters["Weapon Select String"];
CGMZ.SelectObject.SelectAlignment = CGMZ.SelectObject.parameters["Select Alignment"];
CGMZ.SelectObject.DescriptionHeader = CGMZ.SelectObject.parameters["Description Header"];
CGMZ.SelectObject.PossessionLabel = CGMZ.SelectObject.parameters["Possession Label"];
CGMZ.SelectObject.SelectWindowSettings = CGMZ.SelectObject.parameters["Select Window Settings"];
CGMZ.SelectObject.InfoWindowSettings = CGMZ.SelectObject.parameters["Info Window Settings"];
CGMZ.SelectObject.SelectWindowBackground = CGMZ.SelectObject.parameters["Select Window Background"];
CGMZ.SelectObject.InfoWindowBackground = CGMZ.SelectObject.parameters["Info Window Background"];
CGMZ.SelectObject.Columns = Number(CGMZ.SelectObject.parameters["Columns"]);
CGMZ.SelectObject.CustomSpace = Number(CGMZ.SelectObject.parameters["Custom Space"]);
CGMZ.SelectObject.LabelColor = Number(CGMZ.SelectObject.parameters["Label Color"]);
CGMZ.SelectObject.HeaderColor1 = Number(CGMZ.SelectObject.parameters["Header Color 1"]);
CGMZ.SelectObject.HeaderColor2 = Number(CGMZ.SelectObject.parameters["Header Color 2"]);
CGMZ.SelectObject.HeaderPadding = Number(CGMZ.SelectObject.parameters["Header Padding"]);
CGMZ.SelectObject.DrawDividers = (CGMZ.SelectObject.parameters["Draw Dividers"] === 'true');
CGMZ.SelectObject.ItemDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.SelectObject.parameters["Item Display Info"], [], "[CGMZ] Select Object", "Your Item Display Info parameter had invalid json and could not be read.");
CGMZ.SelectObject.WeaponDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.SelectObject.parameters["Weapon Display Info"], [], "[CGMZ] Select Object", "Your Weapon Display Info parameter had invalid json and could not be read.");
CGMZ.SelectObject.ArmorDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.SelectObject.parameters["Armor Display Info"], [], "[CGMZ] Select Object", "Your Armor Display Info parameter had invalid json and could not be read.");
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Add plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZSelectObject_CGMZTemp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZSelectObject_CGMZTemp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_SelectObject", "Select Item", this.pluginCommandSelectObjectSelectItem);
	PluginManager.registerCommand("CGMZ_SelectObject", "Select Weapon", this.pluginCommandSelectObjectSelectWeapon);
	PluginManager.registerCommand("CGMZ_SelectObject", "Select Armor", this.pluginCommandSelectObjectSelectArmor);
};
//-----------------------------------------------------------------------------
// Plugin Command - Select Item
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSelectObjectSelectItem = function(args) {
	const variableId = Number(args.Variable);
	$gameMessage.CGMZ_setSelectObject(variableId, 'item');
	this.CGMZ_addSelectObjectFilters(args);
	this.setWaitMode("message");
};
//-----------------------------------------------------------------------------
// Plugin Command - Select Weapon
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSelectObjectSelectWeapon = function(args) {
	const variableId = Number(args.Variable);
	$gameMessage.CGMZ_setSelectObject(variableId, 'weapon');
	this.CGMZ_addSelectObjectFilters(args);
	this.setWaitMode("message");
};
//-----------------------------------------------------------------------------
// Plugin Command - Select Item
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSelectObjectSelectArmor = function(args) {
	const variableId = Number(args.Variable);
	$gameMessage.CGMZ_setSelectObject(variableId, 'armor');
	this.CGMZ_addSelectObjectFilters(args);
	this.setWaitMode("message");
};
//=============================================================================
// Game_Interpreter
//-----------------------------------------------------------------------------
// Peek the next command, if select object plugin command do not hide
// message window
//=============================================================================
//-----------------------------------------------------------------------------
// Also handle the case that next event command is a cgmz select object
//-----------------------------------------------------------------------------
const alias_CGMZSelectObject_GameInterpreter_command101 = Game_Interpreter.prototype.command101;
Game_Interpreter.prototype.command101 = function(params) {
	const oldReturn = alias_CGMZSelectObject_GameInterpreter_command101.call(this, params);
	if(oldReturn) {
		if(this.nextEventCode() === 357) {
			const cmd = this._list[this._index + 1];
			const parameters = cmd?.parameters;
			if(parameters[0] === 'CGMZ_SelectObject') {
				const params = ['Select Item', 'Select Weapon', 'Select Armor'];
				if(params.includes(parameters[1])) {
					this._index++;
					this.command357(parameters);
				}
			}
		}
	}
	return oldReturn;
};
//-----------------------------------------------------------------------------
// Add select object filters from plugin command args
//-----------------------------------------------------------------------------
Game_Interpreter.prototype.CGMZ_addSelectObjectFilters = function(args) {
	if(args["Item Type"]) {
		const itemTypes = CGMZ_Utils.parseJSON(args["Item Type"], [], '[CGMZ] Select Object', 'Your Item Type JSON was invalid and could not be read.');
		if(itemTypes.length > 0) this.CGMZ_addSelectObjectFilterItemType(itemTypes);
	}
	if(args["Weapon Type"]) {
		const weaponTypes = CGMZ_Utils.parseJSON(args["Weapon Type"], [], '[CGMZ] Select Object', 'Your Weapon Type JSON was invalid and could not be read.');
		if(weaponTypes.length > 0) this.CGMZ_addSelectObjectFilterWeaponArmorEquipType(weaponTypes, $dataSystem.weaponTypes, "Weapon Type");
	}
	if(args["Armor Type"]) {
		const armorTypes = CGMZ_Utils.parseJSON(args["Armor Type"], [], '[CGMZ] Select Object', 'Your Armor Type JSON was invalid and could not be read.');
		if(armorTypes.length > 0) this.CGMZ_addSelectObjectFilterWeaponArmorEquipType(armorTypes, $dataSystem.armorTypes, "Armor Type");
	}
	if(args["Equip Type"]) {
		const equipTypes = CGMZ_Utils.parseJSON(args["Equip Type"], [], '[CGMZ] Select Object', 'Your Equip Type JSON was invalid and could not be read.');
		if(equipTypes.length > 0) this.CGMZ_addSelectObjectFilterWeaponArmorEquipType(equipTypes, $dataSystem.equipTypes, "Equip Type");
	}
	if(args["Ids"]) {
		const ids = CGMZ_Utils.parseJSON(args["Ids"], [], '[CGMZ] Select Object', 'Your Ids JSON was invalid and could not be read.').map(x => Number(x));
		if(ids.length > 0) $gameMessage.CGMZ_addSelectObjectFilter('Ids', ids);
	}
	if(args["Cost Min"]) {
		const price = {min: Number(args["Cost Min"]), max: Number(args["Cost Max"])};
		$gameMessage.CGMZ_addSelectObjectFilter('Price', price);
	}
	if(args["Party Equip"] && args["Party Equip"] !== 'Skip') {
		const equipped = (args["Party Equip"] === 'Equipped');
		$gameMessage.CGMZ_addSelectObjectFilter('Party Equip', equipped);
	}
};
//-----------------------------------------------------------------------------
// Add select object filters for item types from text array of item types
//-----------------------------------------------------------------------------
Game_Interpreter.prototype.CGMZ_addSelectObjectFilterItemType = function(itemTypes) {
	const types = [null, 'Regular Item', 'Key Item', 'Hidden Item A', 'Hidden Item B'];
	const filterVal = [];
	for(const type of itemTypes) {
		filterVal.push(types.indexOf(type));
	}
	$gameMessage.CGMZ_addSelectObjectFilter('Item Type', filterVal);
};
//-----------------------------------------------------------------------------
// Add select object filters for item types from text array of item types
//-----------------------------------------------------------------------------
Game_Interpreter.prototype.CGMZ_addSelectObjectFilterWeaponArmorEquipType = function(includedTypes, types, filterType) {
	const filterVal = [];
	for(const type of includedTypes) {
		filterVal.push(types.indexOf(type));
	}
	$gameMessage.CGMZ_addSelectObjectFilter(filterType, filterVal);
};
//=============================================================================
// Game_Message
//-----------------------------------------------------------------------------
// Handle new select object properties
//=============================================================================
//-----------------------------------------------------------------------------
// Also create CGMZ select object properties
//-----------------------------------------------------------------------------
const alias_CGMZSelectObject_GameMessage_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
    alias_CGMZSelectObject_GameMessage_clear.call(this);
	this._cgmz_selectObjectType = "";
	this._cgmz_selectObjectVariable = 0;
	this._cgmz_selectObjectFilters = [];
};
//-----------------------------------------------------------------------------
// Get Select Object Type
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_selectObjectType = function() {
    return this._cgmz_selectObjectType;
};
//-----------------------------------------------------------------------------
// Get Select Object Variable
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_selectObjectVariable = function() {
    return this._cgmz_selectObjectVariable;
};
//-----------------------------------------------------------------------------
// Get Select Object Filters
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_selectObjectFilters = function() {
    return this._cgmz_selectObjectFilters;
};
//-----------------------------------------------------------------------------
// Clear select object filters
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_clearSelectObjectFilters = function() {
    this._cgmz_selectObjectFilters = [];
};
//-----------------------------------------------------------------------------
// Set Select Object Variable
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_setSelectObject = function(variableId, type) {
    this._cgmz_selectObjectVariable = variableId;
    this._cgmz_selectObjectType = type;
};
//-----------------------------------------------------------------------------
// Add a filter
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_addSelectObjectFilter = function(filterType, filterVal) {
    this._cgmz_selectObjectFilters.push({type: filterType, value: filterVal});
};
//-----------------------------------------------------------------------------
// Check if is select object choice
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_isSelectObjectChoice = function() {
    return this._cgmz_selectObjectVariable > 0;
};
//-----------------------------------------------------------------------------
// Also check if is select object choice is active
//-----------------------------------------------------------------------------
const alias_CGMZSelectObject_GameMessage_isBusy = Game_Message.prototype.isBusy;
Game_Message.prototype.isBusy = function() {
    return alias_CGMZSelectObject_GameMessage_isBusy.call(this) || this.CGMZ_isSelectObjectChoice();
};
//=============================================================================
// Scene_Message
//-----------------------------------------------------------------------------
// Handle new select object windows
//=============================================================================
//-----------------------------------------------------------------------------
// Also create CGMZ select object windows
//-----------------------------------------------------------------------------
const alias_CGMZSelectObject_SceneMessage_createAllWindows = Scene_Message.prototype.createAllWindows;
Scene_Message.prototype.createAllWindows = function() {
	this.CGMZ_createSelectObjectWindow();
	this.CGMZ_createSelectObjectHelperWindow();
    alias_CGMZSelectObject_SceneMessage_createAllWindows.call(this);
};
//-----------------------------------------------------------------------------
// Create the Select Object window
//-----------------------------------------------------------------------------
Scene_Message.prototype.CGMZ_createSelectObjectWindow = function() {
    const rect = this.CGMZ_selectObjectWindowRect();
    this._cgmz_selectObjectWindow = new CGMZ_Window_SelectObject(rect);
    this.addWindow(this._cgmz_selectObjectWindow);
};
//-----------------------------------------------------------------------------
// Select Object window rect
//-----------------------------------------------------------------------------
Scene_Message.prototype.CGMZ_selectObjectWindowRect = function() {
	const x = Graphics.boxWidth * (2.5 / 100);
	const y = this.buttonAreaHeight();
	const width = Graphics.boxWidth * (45 / 100);
	const height = this.calcWindowHeight(7, true);
    return new Rectangle(Math.floor(x), y, Math.floor(width), height);
};
//-----------------------------------------------------------------------------
// Create the Select Object helper window
//-----------------------------------------------------------------------------
Scene_Message.prototype.CGMZ_createSelectObjectHelperWindow = function() {
    const rect = this.CGMZ_selectObjectHelperWindowRect();
    this._cgmz_selectObjectHelperWindow = new CGMZ_Window_SelectObjectHelper(rect);
    this.addWindow(this._cgmz_selectObjectHelperWindow);
};
//-----------------------------------------------------------------------------
// Select Object helper window rect
//-----------------------------------------------------------------------------
Scene_Message.prototype.CGMZ_selectObjectHelperWindowRect = function() {
	const width = Graphics.boxWidth * (45 / 100);
	const height = this._cgmz_selectObjectWindow.height;
	const x = Graphics.boxWidth * (97.5 / 100) - width;
	const y = this._cgmz_selectObjectWindow.y;
    return new Rectangle(Math.floor(x), y, Math.floor(width), height);
};
//-----------------------------------------------------------------------------
// Associate select object windows with other message windows
//-----------------------------------------------------------------------------
const alias_CGMZSelectObject_SceneMessage_associateWindows = Scene_Message.prototype.associateWindows;
Scene_Message.prototype.associateWindows = function() {
	alias_CGMZSelectObject_SceneMessage_associateWindows.call(this);
    this._messageWindow.CGMZ_setSelectObjectWindow(this._cgmz_selectObjectWindow);
    this._cgmz_selectObjectWindow.setMessageWindow(this._messageWindow);
	this._cgmz_selectObjectWindow.setHelpWindow(this._cgmz_selectObjectHelperWindow);
};
//=============================================================================
// Window_Message
//-----------------------------------------------------------------------------
// Handle new select object windows
//=============================================================================
//-----------------------------------------------------------------------------
// Also init select object window
//-----------------------------------------------------------------------------
const alias_CGMZSelectObject_WindowMessage_initMembers = Window_Message.prototype.initMembers;
Window_Message.prototype.initMembers = function() {
	this._cgmz_selectObjectWindow = null;
    alias_CGMZSelectObject_WindowMessage_initMembers.call(this);
};
//-----------------------------------------------------------------------------
// Associate select object window
//-----------------------------------------------------------------------------
Window_Message.prototype.CGMZ_setSelectObjectWindow = function(selectObjectWindow) {
	this._cgmz_selectObjectWindow = selectObjectWindow;
};
//-----------------------------------------------------------------------------
// Also check if select object window is active
//-----------------------------------------------------------------------------
const alias_CGMZSelectObject_WindowMessage_isAnySubWindowActive = Window_Message.prototype.isAnySubWindowActive;
Window_Message.prototype.isAnySubWindowActive = function() {
    return (alias_CGMZSelectObject_WindowMessage_isAnySubWindowActive.call(this) || this._cgmz_selectObjectWindow.active);
};
//-----------------------------------------------------------------------------
// Check for CGMZ Select Object window input
//-----------------------------------------------------------------------------
const alias_CGMZSelectObject_WindowMessage_startInput = Window_Message.prototype.startInput;
Window_Message.prototype.startInput = function() {
    if($gameMessage.CGMZ_isSelectObjectChoice()) {
        this._cgmz_selectObjectWindow.start();
        return true;
    } else {
        return alias_CGMZSelectObject_WindowMessage_startInput.call(this);
    }
};
//=============================================================================
// CGMZ_Window_SelectObject
//-----------------------------------------------------------------------------
// Window that handles selecting items
//=============================================================================
function CGMZ_Window_SelectObject() {
    this.initialize(...arguments);
}
CGMZ_Window_SelectObject.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_SelectObject.prototype.constructor = CGMZ_Window_SelectObject;
//-----------------------------------------------------------------------------
// Initialize the window
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.SelectObject.SelectWindowSettings) this.CGMZ_setWindowSettings(CGMZ.SelectObject.SelectWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.SelectObject.SelectWindowBackground) this.CGMZ_setWindowBackground(CGMZ.SelectObject.SelectWindowBackground);
	this.createCancelButton();
	this._messageWindow = null;
    this._data = [];
	this.deactivate();
	this.openness = 0;
    this.setHandler("ok", this.onOk.bind(this));
    this.setHandler("cancel", this.onCancel.bind(this));
    this._canRepeat = false;
};
//-----------------------------------------------------------------------------
// Create the cancel sprite for touch ui
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.createCancelButton = function() {
    if (ConfigManager.touchUI) {
        this._cancelButton = new Sprite_Button("cancel");
        this._cancelButton.visible = false;
        this.addChild(this._cancelButton);
    }
};
//-----------------------------------------------------------------------------
// Start object selection
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.start = function() {
    this.refresh();
    this.placeCancelButton();
    (this._data.length > 0) ? this.forceSelect(0) : this.select(-1);
    this.open();
    this.activate();
	this.openHelpWindow();
};
//-----------------------------------------------------------------------------
// Update the window
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.updateCancelButton();
};
//-----------------------------------------------------------------------------
// Update the cancel button
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.updateCancelButton = function() {
    if(this._cancelButton) {
        this._cancelButton.visible = this.isOpen();
    }
};
//-----------------------------------------------------------------------------
// Update the cancel button
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.placeCancelButton = function() {
    if(this._cancelButton) {
        this._cancelButton.y = -this._cancelButton.height - 4;
        this._cancelButton.x = 0;
    }
};
//-----------------------------------------------------------------------------
// Get current selected item
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Get column count
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.maxCols = function() {
    return CGMZ.SelectObject.Columns;
};
//-----------------------------------------------------------------------------
// Get current selected item
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Item is always enabled
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.isEnabled = function(index) {
	return true;
};
//-----------------------------------------------------------------------------
// Check if current item is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.isCurrentItemEnabled = function(index) {
    return this.isEnabled(this.index());
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(item => this.includes(item));
};
//-----------------------------------------------------------------------------
// Is item included in list?
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.includes = function(item) {
    switch($gameMessage.CGMZ_selectObjectType()) {
		case 'item': return this.checkForItemInclude(item);
		case 'weapon': return this.checkForWeaponInclude(item);
		case 'armor': return this.checkForArmorInclude(item);
	}
	return false;
};
//-----------------------------------------------------------------------------
// Check if the item should be included (item list)
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.checkForItemInclude = function(obj) {
    if(!DataManager.isItem(obj)) return false;
	if(!$gameMessage.CGMZ_selectObjectFilters().every(filter => this.checkFilter(obj, filter))) return false;
	return true;
};
//-----------------------------------------------------------------------------
// Check if the weapon should be included (weapon list)
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.checkForWeaponInclude = function(obj) {
    if(!DataManager.isWeapon(obj)) return false;
	if(!$gameMessage.CGMZ_selectObjectFilters().every(filter => this.checkFilter(obj, filter))) return false;
	return true;
};
//-----------------------------------------------------------------------------
// Check if the armor should be included (armor list)
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.checkForArmorInclude = function(obj) {
    if(!DataManager.isArmor(obj)) return false;
	if(!$gameMessage.CGMZ_selectObjectFilters().every(filter => this.checkFilter(obj, filter))) return false;
	return true;
};
//-----------------------------------------------------------------------------
// Check various filters
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.checkFilter = function(obj, filter) {
    switch(filter.type) {
		case 'Ids': return this.isId(obj, filter.value);
		case 'Item Type': return this.isItemType(obj, filter.value);
		case 'Weapon Type': return this.isWeaponType(obj, filter.value);
		case 'Armor Type': return this.isArmorType(obj, filter.value);
		case 'Equip Type': return this.isEquipType(obj, filter.value);
		case 'Price': return this.isPrice(obj, filter.value);
		case 'Party Equip': return this.isPartyEquipped(obj, filter.value);
	}
	return true;
};
//-----------------------------------------------------------------------------
// Check if the object has an id. Used by: item, weapon, armor
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.isId = function(obj, ids) {
	return ids.includes(obj.id);
};
//-----------------------------------------------------------------------------
// Check if the item is of item type. Used by: item
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.isItemType = function(obj, itemTypes) {
	return itemTypes.includes(obj.itypeId);
};
//-----------------------------------------------------------------------------
// Check if the weapon is of weapon type. Used by: weapon
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.isWeaponType = function(obj, weaponTypes) {
	return weaponTypes.includes(obj.wtypeId);
};
//-----------------------------------------------------------------------------
// Check if the armor is of armor type. Used by: armor
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.isArmorType = function(obj, armorTypes) {
	return armorTypes.includes(obj.atypeId);
};
//-----------------------------------------------------------------------------
// Check if the equip is of equip type. Used by: armor
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.isEquipType = function(obj, equipTypes) {
	return equipTypes.includes(obj.etypeId);
};
//-----------------------------------------------------------------------------
// Check if the object has a specific price. Used by: item, weapon, armor
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.isPrice = function(obj, price) {
	return (obj.price >= price.min && obj.price <= price.max);
};
//-----------------------------------------------------------------------------
// Check if the object is equipped. Used by: weapon, armor
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.isPartyEquipped = function(obj, equipStatus) {
	return ($gameParty.isAnyMemberEquipped(obj) === equipStatus);
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
	if(this._data.length === 0) {
		const string = this.getNoObjectText();
		this.CGMZ_drawText(string, 0, 0, 0, this.contents.width, 'center');
	}
};
//-----------------------------------------------------------------------------
// Get text to show when there is no valid items
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.getNoObjectText = function() {
    switch($gameMessage.CGMZ_selectObjectType()) {
		case 'item': return CGMZ.SelectObject.NoItemText;
		case 'weapon': return CGMZ.SelectObject.NoWeaponText;
		case 'armor': return CGMZ.SelectObject.NoArmorText;
	}
	return CGMZ.SelectObject.NoItemText;
};
//-----------------------------------------------------------------------------
// Draw an object
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.drawItem = function(index, x, y, width) {
	this.resetFontSettings();
	switch($gameMessage.CGMZ_selectObjectType()) {
		case 'item': this.drawItemLine(index, x, y, width); break;
		case 'weapon': this.drawWeaponLine(index, x, y, width); break;
		case 'armor': this.drawArmorLine(index, x, y, width); break;
	}
};
//-----------------------------------------------------------------------------
// Draw an item
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.drawItemLine = function(index, x, y, width) {
    const rect = this.itemRectWithPadding(index);
	const item = this._data[index];
	const string = CGMZ.SelectObject.ItemSelectString.replace('%icon', `\\i[${item.iconIndex}]`).replace('%name', item.name);
	this.CGMZ_drawTextLine(string, rect.x, rect.y, rect.width, CGMZ.SelectObject.SelectAlignment);
};
//-----------------------------------------------------------------------------
// Draw a weapon
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.drawWeaponLine = function(index, x, y, width) {
    const rect = this.itemRectWithPadding(index);
	const item = this._data[index];
	const string = CGMZ.SelectObject.WeaponSelectString.replace('%icon', `\\i[${item.iconIndex}]`).replace('%name', item.name);
	this.CGMZ_drawTextLine(string, rect.x, rect.y, rect.width, CGMZ.SelectObject.SelectAlignment);
};
//-----------------------------------------------------------------------------
// Draw an armor
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.drawArmorLine = function(index, x, y, width) {
    const rect = this.itemRectWithPadding(index);
	const item = this._data[index];
	const string = CGMZ.SelectObject.ArmorSelectString.replace('%icon', `\\i[${item.iconIndex}]`).replace('%name', item.name);
	this.CGMZ_drawTextLine(string, rect.x, rect.y, rect.width, CGMZ.SelectObject.SelectAlignment);
};
//-----------------------------------------------------------------------------
// See if can update help window
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.callUpdateHelp = function() {
	if(!this.active) return;
	this._helpWindow?.setItem(this.item());
};
//-----------------------------------------------------------------------------
// Open the help window
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.openHelpWindow = function() {
	this._helpWindow?.open();
};
//-----------------------------------------------------------------------------
// Close the help window
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.closeHelpWindow = function() {
	this._helpWindow?.close();
};
//-----------------------------------------------------------------------------
// See if can update help window
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.setMessageWindow = function(messageWindow) {
	this._messageWindow = messageWindow;
};
//-----------------------------------------------------------------------------
// Handling for ok input
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.onOk = function() {
    const item = this.item();
    const itemId = item ? item.id : 0;
    $gameVariables.setValue($gameMessage.CGMZ_selectObjectVariable(), itemId);
    this._messageWindow.terminateMessage();
    this.close();
	this.closeHelpWindow();
	$gameMessage.CGMZ_clearSelectObjectFilters();
};
//-----------------------------------------------------------------------------
// Handling for cancel input
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObject.prototype.onCancel = function() {
    $gameVariables.setValue($gameMessage.CGMZ_selectObjectVariable(), 0);
    this._messageWindow.terminateMessage();
    this.close();
	this.closeHelpWindow();
	$gameMessage.CGMZ_clearSelectObjectFilters();
};
//=============================================================================
// CGMZ_Window_SelectObjectHelper
//-----------------------------------------------------------------------------
// Window that shows item info
//=============================================================================
function CGMZ_Window_SelectObjectHelper() {
    this.initialize(...arguments);
}
CGMZ_Window_SelectObjectHelper.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_SelectObjectHelper.prototype.constructor = CGMZ_Window_SelectObjectHelper;
//-----------------------------------------------------------------------------
// Initialize the window
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObjectHelper.prototype.initialize = function(rect) {
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, 100);
	if(Imported.CGMZ_WindowSettings && CGMZ.SelectObject.InfoWindowSettings) this.CGMZ_setWindowSettings(CGMZ.SelectObject.InfoWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.SelectObject.InfoWindowBackground) this.CGMZ_setWindowBackground(CGMZ.SelectObject.InfoWindowBackground);
	this._item = null;
	this.deactivate();
	this.openness = 0;
};
//-----------------------------------------------------------------------------
// Set an item for display
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObjectHelper.prototype.setItem = function(item) {
	this._item = item;
    if(!item) {
		this._neededHeight = 0;
		this.contents.clear();
		this.checkForScroll();
	} else {
		this.refresh();
	}
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObjectHelper.prototype.refresh = function() {
	if(!this._item) return;
	this._neededHeight = 0;
	this.contents.clear();
	this.setupWindowForNewEntry();
	this.handleDraw();
	
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObjectHelper.prototype.handleDraw = function() {
	switch($gameMessage.CGMZ_selectObjectType()) {
		case 'item': this.drawItemInfo(); break;
		case 'weapon': this.drawWeaponInfo(); break;
		case 'armor': this.drawArmorInfo(); break;
	}
	this._neededHeight += this.padding * 2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw an item's info
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObjectHelper.prototype.drawItemInfo = function() {
	for(const line of CGMZ.SelectObject.ItemDisplayInfo) {
		switch(line) {
			case 'Name': this.drawName(); break;
			case 'Possession': this.drawPossession(); break;
			case 'Description': this.drawDescription(); break;
			case 'Description Header': this.drawDescriptionHeader(); break;
			case 'Blank Line': this._neededHeight += this.lineHeight(); break;
			case 'Custom Space': this._neededHeight += CGMZ.SelectObject.CustomSpace; break;
		}
	}
};
//-----------------------------------------------------------------------------
// Draw a weapon's info
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObjectHelper.prototype.drawWeaponInfo = function() {
	for(const line of CGMZ.SelectObject.WeaponDisplayInfo) {
		switch(line) {
			case 'Name': this.drawName(); break;
			case 'Possession': this.drawPossession(); break;
			case 'Description': this.drawDescription(); break;
			case 'Description Header': this.drawDescriptionHeader(); break;
			case 'Blank Line': this._neededHeight += this.lineHeight(); break;
			case 'Custom Space': this._neededHeight += CGMZ.SelectObject.CustomSpace; break;
		}
	}
};
//-----------------------------------------------------------------------------
// Draw an armor's info
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObjectHelper.prototype.drawArmorInfo = function() {
	for(const line of CGMZ.SelectObject.ArmorDisplayInfo) {
		switch(line) {
			case 'Name': this.drawName(); break;
			case 'Possession': this.drawPossession(); break;
			case 'Description': this.drawDescription(); break;
			case 'Description Header': this.drawDescriptionHeader(); break;
			case 'Blank Line': this._neededHeight += this.lineHeight(); break;
			case 'Custom Space': this._neededHeight += CGMZ.SelectObject.CustomSpace; break;
		}
	}
};
//-----------------------------------------------------------------------------
// Draw an object's name
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObjectHelper.prototype.drawName = function() {
	this._neededHeight += this.CGMZ_drawTextLine(`\\i[${this._item.iconIndex}] ${this._item.name}`, 0, this._neededHeight, this.contents.width, "center");
};
//-----------------------------------------------------------------------------
// Draw an object's possession
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObjectHelper.prototype.drawPossession = function() {
	const numItems = $gameParty.numItems(this._item);
	const string = `\\c[${CGMZ.SelectObject.LabelColor}]${CGMZ.SelectObject.PossessionLabel}\\c[0]${CGMZ_Utils.numberSplit(numItems)}`;
	this._neededHeight += this.CGMZ_drawTextLine(string, 0, this._neededHeight, this.contents.width, "left");
};
//-----------------------------------------------------------------------------
// Draw an object's description
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObjectHelper.prototype.drawDescription = function() {
	this._neededHeight += this.CGMZ_drawText(this._item.description, 0, 0, this._neededHeight, this.contents.width, 'center');
};
//-----------------------------------------------------------------------------
// Draw a description header
//-----------------------------------------------------------------------------
CGMZ_Window_SelectObjectHelper.prototype.drawDescriptionHeader = function() {
	const headerOpts = {drawDividers: CGMZ.SelectObject.DrawDividers, padding: (CGMZ.SelectObject.HeaderPadding < 0) ? null : CGMZ.SelectObject.HeaderPadding};
	this._neededHeight += this.CGMZ_drawHeader(CGMZ.SelectObject.DescriptionHeader, this._neededHeight, CGMZ.SelectObject.HeaderColor1, CGMZ.SelectObject.HeaderColor2, headerOpts);
};