/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/itemcategories/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Add more item categories to split items up more logically
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
 * Description: Customize your item categories, allowing you to make more than
 * just the standard item, weapon, armor, and key item categories. This can be
 * helpful if your game has many different item types such as crafting
 * ingredients that you want to keep separate.
 * ----------------------------------------------------------------------------
 * Documentation:
 * -----------------------------Alpha Notes------------------------------------
 * Planned features to be added:
 * 1) Separate item commands in battle for different categories
 * 2) Item categories matter in equip screen
 * 3) Different handling for item/shop scenes
 *
 * Want additional features not already present/listed above? Make suggestions
 * on the Patreon Post, Itch.io Page, or in my discord under the #suggestions
 * channel!
 * https://discord.gg/Gbx7JXP
 * -----------------------------Main Features----------------------------------
 * ITEM TYPES
 * You can have more than just items, weapons, armors, and key items with this
 * plugin. Create your own item categories such as ingredients for [CGMZ]
 * crafting or other plugins.
 * -----------------------------Minor Features---------------------------------
 * ITEM SELECT
 * The event command Select Item allows your player to select an item and
 * store the item id selected into a variable for use in your eventing. This
 * event command is only compatible with regular item categories, such as
 * items, key items, hidden items, etc. This plugin adds the plugin command
 * Select Item to allow you to select an item from a category you have set up.
 * It works the same way as the built in event command, just via plugin
 * command.
 * ----------------------------------Setup-------------------------------------
 * To start with, you need to create your categories. If you are not using
 * Keep Originals, you can also re-create item/weapon/armor/key item by putting
 * item/weapon/armor/keyItem as the category symbol.
 *
 * Once your categories are created in the plugin parameters, make note of the
 * "symbol" parameter you typed for your category. This can be anything (case
 * sensitive, should not include spaces or commas) and is what is used to
 * separate the items shown in each category.
 *
 * Once you have the symbol you want an item to belong to, go to that item's
 * page in the Database and enter in the notetag:
 * <cgmzitemcat:yourCategoryHere>
 * For example, if your category had a symbol of "metals" you would put:
 * <cgmzitemcat:metals>
 *
 * You can assign the same item to multiple categories. To do so, separate
 * the category symbols in the notetag by a comma. For example, if you wanted
 * an item in BOTH the "metals" AND "ingredients" categories, you could put:
 * <cgmzitemcat:ingredients,metals>
 * ----------------------------Default Categories------------------------------
 * Default categories behave a bit differently as they will still contain a
 * list of ALL items, weapons, etc. This means your metal bar would appear in
 * both your metals category and the default item category even without the
 * notetag to tell it to be in the item category. You can prevent this by
 * turning the Hide In Other Categories parameter to true.
 * ----------------------------------Symbols-----------------------------------
 * YOU MUST SET UP YOUR CATEGORY'S SYMBOL PARAMETER. The symbol should be:
 * 1) UNIQUE (not the same as any other category's symbol)
 * 2) NOT EMPTY (you cannot leave it blank)
 * 3) NOT contain spaces or commas
 *
 * If it helps, you can think of the symbol as the id of the category. It is
 * case-sensitive.
 *
 * If you want to re-create the default categories and have Keep Originals set
 * to false, you can use the following symbols in your category:
 * item - Will function as the default item category
 * weapon - Will function as the default weapon category
 * armor - Will function as the default armor category
 * keyItem - Will function as the default key item category
 * 
 * You should also avoid these default symbols for any custom categories.
 * -----------------------------Plugin Commands--------------------------------
 * • Select Item
 * This plugin command functions similar to the Select Item event command, but
 * instead of selecting an item of a built in type it allows you to select an
 * item from a category you have set up.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games
 *
 * This means the following will work in saved games:
 * ✓ Add this plugin to your game
 * ✓ Modify plugin parameters
 * ✓ Remove this plugin from your game
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_ItemCategories.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version adds show and enable js conditions for your
 * item categories. Now you can hide (or show but make unselectable) a category
 * until certain conditions are met. This also works for default commands with
 * Keep Originals turned ON.
 *
 * I also fixed some bugs with Keep Originals being turned ON and trying to add
 * background images to the default commands. This also allows the show and
 * enable js parameters to work with default commands in this case too.
 * 
 * Version Alpha R2
 * - Added show js conditions for categories
 * - Added enable js conditions for categories
 * - Fixed bug with background image not working for some default entries
 *
 * @command Select Item
 * @desc Select an item from a custom category
 *
 * @arg Category
 * @desc The category to select the item from
 *
 * @arg Variable
 * @type variable
 * @default 0
 * @desc The variable to store the result in
 *
 * @param Main Setup
 *
 * @param Categories
 * @parent Main Setup
 * @type struct<ItemCategory>[]
 * @default []
 * @desc Set up additional item categories here
 *
 * @param Hide In Other Categories
 * @parent Main Setup
 * @type boolean
 * @default false
 * @desc If true, items that belong to a [CGMZ] Item Category will be hidden from display in other categories.
 *
 * @param Options
 *
 * @param Keep Originals
 * @parent Options
 * @type boolean
 * @default false
 * @desc Keep original commands? If you want to change the order of the originals, this must be false.
 *
 * @param Text Align
 * @parent Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc Text alignment in category window
 *
 * @param Icon Align
 * @parent Options
 * @type select
 * @option left
 * @option right
 * @default left
 * @desc Icon alignment in category window
 *
 * @param Columns
 * @parent Options
 * @type number
 * @min 1
 * @default 4
 * @desc Number of commands per row
 *
 * @param Rows
 * @parent Options
 * @type number
 * @min 1
 * @default 1
 * @desc Number of visible rows in the category window
*/
/*~struct~ItemCategory:
 * @param Name
 * @desc Name of the command to display in the command window.
 *
 * @param Icon
 * @type icon
 * @default 0
 * @desc An icon to show for the command, if 0 will not show any icon
 *
 * @param Symbol
 * @desc This symbol is used internally to recognize the category.
 * Special meaning for original categories (see documentation).
 *
 * @param Show JS
 * @type multiline_string
 * @default return true;
 * @desc JavaScript that controls if the command is shown (true) or not (false)
 *
 * @param Enable JS
 * @type multiline_string
 * @default return true;
 * @desc JavaScript that controls if the command is selectable (true) or not (false)
 *
 * @param Background Image
 * @type file
 * @dir img
 * @desc A background image to use for the command. Blank = default black rectangle
 *
 * @param Background Image X
 * @type number
 * @default 0
 * @min 0
 * @desc The x coordinate to start the background image from the source image (upper left corner)
 *
 * @param Background Image Y
 * @type number
 * @default 0
 * @min 0
 * @desc The y coordinate to start the background image from the source image (upper left corner)
*/
Imported.CGMZ_ItemCategories = true;
CGMZ.Versions["Item Categories"] = "Alpha R2";
CGMZ.ItemCategories = {};
CGMZ.ItemCategories.parameters = PluginManager.parameters('CGMZ_ItemCategories');
CGMZ.ItemCategories.IconAlignment = CGMZ.ItemCategories.parameters["Icon Align"];
CGMZ.ItemCategories.TextAlignment = CGMZ.ItemCategories.parameters["Text Align"];
CGMZ.ItemCategories.Columns = Number(CGMZ.ItemCategories.parameters["Columns"]);
CGMZ.ItemCategories.Rows = Number(CGMZ.ItemCategories.parameters["Rows"]);
CGMZ.ItemCategories.KeepOriginals = (CGMZ.ItemCategories.parameters["Keep Originals"] === 'true');
CGMZ.ItemCategories.HideInOtherCategories = (CGMZ.ItemCategories.parameters["Hide In Other Categories"] === 'true');
CGMZ.ItemCategories.Categories = CGMZ_Utils.parseJSON(CGMZ.ItemCategories.parameters["Categories"], [], "[CGMZ] Item Categories", "Your Categories parameter was set up incorrectly and could not be read.").map((json) => {
	const cmd = CGMZ_Utils.parseJSON(json, null, "[CGMZ] Item Categories", "One of your categories was invalid and could not be read.");
	if(!cmd) return null;
	return {
		name: cmd.Name,
		symbol: cmd.Symbol,
		showJS: cmd["Show JS"],
		enableJS: cmd["Enable JS"],
		icon: Number(cmd.Icon),
		backgroundImage: cmd["Background Image"],
		backImgX: Number(cmd["Background Image X"]),
		backImgY: Number(cmd["Background Image Y"])
	};
}).filter(x => !!x);
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Handle plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZItemCategories_CGMZTemp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZItemCategories_CGMZTemp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_ItemCategories", "Select Item", this.pluginCommandItemCategoriesSelectItem);
};
//-----------------------------------------------------------------------------
// Plugin Command - Select Item
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandItemCategoriesSelectItem = function(args) {
	const params = [Number(args.Variable), `cgmzItemCategories-internalUseOnly-${args.Category}`];
    this.setupItemChoice(params);
    this.setWaitMode("message");
    return true;
};
//=============================================================================
// Scene_Item
//-----------------------------------------------------------------------------
// Change height of item category window as needed
//=============================================================================
//-----------------------------------------------------------------------------
// Change height if needed
//-----------------------------------------------------------------------------
const alias_CGMZItemCategories_SceneItem_categoryWindowRect = Scene_Item.prototype.categoryWindowRect;
Scene_Item.prototype.categoryWindowRect = function() {
	const rect = alias_CGMZItemCategories_SceneItem_categoryWindowRect.call(this);
    if(CGMZ.ItemCategories.Rows !== 1) rect.height = this.calcWindowHeight(CGMZ.ItemCategories.Rows, true);
    return rect;
};
//=============================================================================
// Scene_Shop
//-----------------------------------------------------------------------------
// Change height of item category window as needed
//=============================================================================
//-----------------------------------------------------------------------------
// Change height if needed
//-----------------------------------------------------------------------------
const alias_CGMZItemCategories_SceneShop_categoryWindowRect = Scene_Shop.prototype.categoryWindowRect;
Scene_Shop.prototype.categoryWindowRect = function() {
    const rect = alias_CGMZItemCategories_SceneShop_categoryWindowRect.call(this);
    if(CGMZ.ItemCategories.Rows !== 1) rect.height = this.calcWindowHeight(CGMZ.ItemCategories.Rows, true);
    return rect;
};
//=============================================================================
// Window_ItemCategory
//-----------------------------------------------------------------------------
// Add new categories and change default ones if necessary, handle additional
// command options.
//=============================================================================
//-----------------------------------------------------------------------------
// Add new categories
//-----------------------------------------------------------------------------
const alias_CGMZItemCategories_WindowItemCategory_makeCommandList = Window_ItemCategory.prototype.makeCommandList;
Window_ItemCategory.prototype.makeCommandList = function() {
	if(CGMZ.ItemCategories.KeepOriginals) alias_CGMZItemCategories_WindowItemCategory_makeCommandList.call(this);
	console.log(this._list);
    for(const cmd of CGMZ.ItemCategories.Categories) {
		const showFn = new Function(cmd.showJS);
		const show = showFn.call(this);
		const enableFn = new Function(cmd.enableJS);
		const ext = {icon: cmd.icon, img: cmd.backgroundImage, imgX: cmd.backImgX, imgY: cmd.backImgY};
		if(this.CGMZ_isOriginalCommand(cmd) && CGMZ.ItemCategories.KeepOriginals) {
			const index = this.findSymbol(cmd.symbol);
			const command = this._list[index];
			if(!command) continue;
			if(show) {
				if(!command.ext) command.ext = {};
				for(const [key, value] of Object.entries(ext)) {
					command.ext[key] = value;
				}
				command.enabled = enableFn.call(this);
			} else {
				this._list.splice(index, 1);
			}
		} else {
			if(show) this.addCommand(cmd.name, cmd.symbol, enableFn.call(this), ext);
		}
	}
};
//-----------------------------------------------------------------------------
// Get the command icon
//-----------------------------------------------------------------------------
Window_ItemCategory.prototype.CGMZ_icon = function(index) {
	return this._list[index].ext?.icon;
};
//-----------------------------------------------------------------------------
// Get selectable cgmz options
//-----------------------------------------------------------------------------
Window_ItemCategory.prototype.CGMZ_getSelectableCGMZOptions = function(index) {
	const ext = this._list[index].ext;
	if(ext && ext.img) {
		const bg = {
			img: ext.img,
			imgX: ext.imgX,
			imgY: ext.imgY
		}
		return {bg: bg};
	}
	return Window_HorzCommand.prototype.CGMZ_getSelectableCGMZOptions.call(this, index);
};
//-----------------------------------------------------------------------------
// Check if command is for an original symbol
//-----------------------------------------------------------------------------
Window_ItemCategory.prototype.CGMZ_isOriginalCommand = function(command) {
	return ["item", "weapon", "armor", "keyItem"].includes(command.symbol);
};
//-----------------------------------------------------------------------------
// Get the new item text align
//-----------------------------------------------------------------------------
Window_ItemCategory.prototype.itemTextAlign = function() {
    return CGMZ.ItemCategories.TextAlignment;
};
//-----------------------------------------------------------------------------
// Get the new item text align
//-----------------------------------------------------------------------------
Window_ItemCategory.prototype.maxCols = function() {
    return CGMZ.ItemCategories.Columns;
};
//-----------------------------------------------------------------------------
// Allow use of text codes in command
//-----------------------------------------------------------------------------
Window_ItemCategory.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	const align = this.itemTextAlign();
	const icon = this.CGMZ_icon(index);
	this.resetTextColor();
	this.changePaintOpacity(this.isCommandEnabled(index));
	if(icon) {
		const iconX = (CGMZ.ItemCategories.IconAlignment === 'left') ? rect.x : rect.x + rect.width - ImageManager.iconWidth;
		this.drawIcon(icon, iconX, rect.y + 2);
		rect.x += (ImageManager.iconWidth + 2) * (CGMZ.ItemCategories.IconAlignment === 'left');
		rect.width -= ImageManager.iconWidth + 2;
	}
	this.CGMZ_drawTextLine(this.commandName(index), rect.x, rect.y, rect.width, align);
};
//=============================================================================
// Window_ItemList
//-----------------------------------------------------------------------------
// Populate list for new categories
//=============================================================================
//-----------------------------------------------------------------------------
// Populate list for new categories
//-----------------------------------------------------------------------------
const alias_CGMZItemCategories_WindowItemList_includes = Window_ItemList.prototype.includes;
Window_ItemList.prototype.includes = function(item) {
	if(item?.meta?.cgmzitemcat) {
		const cats = item.meta.cgmzitemcat.split(",");
		if(cats.includes(this._category)) {
			return true;
		} else {
			if(CGMZ.ItemCategories.HideInOtherCategories) return false;
		}
	}
	return alias_CGMZItemCategories_WindowItemList_includes.call(this, item);
};
//=============================================================================
// Window_EventItem
//-----------------------------------------------------------------------------
// Populate list for new categories
//=============================================================================
//-----------------------------------------------------------------------------
// Populate list for new categories
//-----------------------------------------------------------------------------
const alias_CGMZItemCategories_WindowEventItem_includes = Window_EventItem.prototype.includes;
Window_EventItem.prototype.includes = function(item) {
	const type = $gameMessage.itemChoiceItypeId();
	if(typeof type === 'string' && type.includes('cgmzItemCategories-internalUseOnly-')) {
		if(item?.meta?.cgmzitemcat) {
			const cats = item.meta.cgmzitemcat.split(",");
			const category = type.replace("cgmzItemCategories-internalUseOnly-", "");
			if(cats.includes(category)) return true;
		}
		return false;
	}
	return alias_CGMZItemCategories_WindowEventItem_includes.call(this, item);
};