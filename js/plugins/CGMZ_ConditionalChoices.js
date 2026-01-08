/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/conditionalchoices/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Add conditions to your choices
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha R6
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: Adds conditions to your choices in the choice window. Can
 * handle simple conditions such as a switch, variable, item being in the
 * inventory, and more. Also handles more complex conditions via an id based
 * system to refer to the group of conditions.
 * ----------------------------------------------------------------------------
 * Documentation:
 * -------------------------Cancel / Default-----------------------------------
 * In RPG Maker MZ, when setting up your choices you can usually choose what
 * occurs when the player selects cancel and the default choice that begins
 * selected when the choice window opens up.
 *
 * If you make a conditional choice your cancel or default choice, weird
 * things can happen. It is recommended to only set choices that will appear
 * every time as your cancel and default choices.
 * -------------------------Plugin Commands------------------------------------
 * This plugin does not have any plugin commands.
 * -------------------Conditions in Event Command------------------------------
 * To add conditions into your Show Choices event command, use the text code:
 * <cgmzcc>YourConditionHere</cgmzcc>
 *
 * Each choice can have one condition. For more complex conditionals, please
 * use the ID condition and set up your complex conditional via the plugin
 * parameters.
 *
 * Valid conditions are as follows:
 * 
 * Switches can be checked if ON or OFF using the code:
 * switch:id,[off]
 * Example ON: <cgmzcc>switch:1</cgmzcc>
 * Example OFF: <cgmzcc>switch:1,off</cgmzcc>
 * 
 * Self Switches can be checked if ON or OFF using the code:
 * ss:id,mapId,eventId,[off]
 * Example ON: <cgmzcc>ss:A,2,3</cgmzcc>
 * Example OFF: <cgmzcc>ss:A,2,3,off</cgmzcc>
 * 
 * Variables can be checked against a provided value using the code:
 * var:id,value,[<|<=|=|!=|>=|>]
 * Example equals: <cgmzcc>var:1,25,=</cgmzcc>
 * Example greater than or equals: <cgmzcc>var:1,25,>=</cgmzcc>
 * Example not equals: <cgmzcc>var:1,25,!=</cgmzcc>
 * 
 * Items can be checked if owned or amount owned using the code:
 * item:id,[amount]
 * Example to check if has item: <cgmzcc>item:1</cgmzcc>
 * Example to check if has 10 of item: <cgmzcc>item:1,10</cgmzcc>
 * 
 * Weapons can be checked if owned or amount owned using the code:
 * weapon:id,[amount/equipped]
 * Example to check if has weapon: <cgmzcc>weapon:1</cgmzcc>
 * Example to check if has 10 of weapons: <cgmzcc>weapon:1,10</cgmzcc>
 * Note - will include equips
 * If you instead want to check if the weapon is equipped, use 'true'
 * in place of the amount number. This will check if anyone in the
 * party has the weapon equipped.
 * 
 * Armors can be checked if owned or amount owned using the code:
 * armor:id,[amount/equipped]
 * Example to check if has armor: <cgmzcc>armor:1</cgmzcc>
 * Example to check if has 10 of armor: <cgmzcc>armor:1,10</cgmzcc>
 * Note - will include equips
 * If you instead want to check if the armor is equipped, use 'true'
 * in place of the amount number. This will check if anyone in the
 * party has the armor equipped.
 * 
 * Gold can be checked for an amount possessed using the code:
 * gold:[<|<=|=|!=|>=|>],amount,[id]
 * Example to check if has exactly 500 gold: <cgmzcc>gold:=,500</cgmzcc>
 * You can also include an id to check a [CGMZ] Currency System currency
 * Example: <cgmzcc>gold:=,500,gems</cgmzcc>
 * 
 * Skills can be checked if the party knows them by using the code:
 * skill:id,[actor]
 * Example to check if any actor knows skill 1: <cgmzcc>skill:1</cgmzcc>
 * You can also include an actor id to check if a specific actor knows the
 * skill.
 * Example: <cgmzcc>skill:1,2/cgmzcc>
 * This would check if actor id 2 knows skill id 1
 * 
 * Actors can be checked if they are in the party by using the code:
 * actor:id,[level]
 * Example to check if actor id 1 is in the party: <cgmzcc>actor:1</cgmzcc>
 * You can also check if the actor's level is above a given level by adding it
 * on the end.
 * Example: <cgmzcc>actor:1,10</cgmzcc>
 * This will check if actor 1 is in the party and is at least level 10
 * ---------------------------Saved Games--------------------------------------
 * This plugin fully supports saved games.
 * ✓ You should be able to add this  plugin to a saved game
 * ✓ You can modify parameters and it will reflect accurately in game
 * ✓ You can remove this plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename of this plugin's JS file MUST be CGMZ_ConditionalChoices.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version adds a custom js condition. This is limited to
 * the id choice condition, as it would be difficult to write js in the small
 * choice window. This should allow you to make any condition for your choices,
 * only limited by your own JavaScript knowledge. I will still be expanding on
 * no-code conditions in future updates, but I thought this was important to
 * get out there so that you can make any condition you want even if it is not
 * available in a no-code format.
 * 
 * Version Alpha R6
 * - Added js condition
 *
 * @param Choice Setup
 *
 * @param Conditional Choices
 * @parent Choice Setup
 * @type struct<ConditionalChoice>[]
 * @desc Set up complex conditional choices
 * @default []
 *
 * @param Options
 *
 * @param Text Code
 * @parent Options
 * @desc Whatever is typed here will be the text code to check for.
 * @default cgmzcc
*/
/*~struct~ConditionalChoice:
 * @param id
 * @desc The id used to refer to this set of conditions
 * 
 * @param Switch Conditions
 * @type struct<SwitchCondition>[]
 * @default []
 * @desc Set up for switch conditions
 * 
 * @param Variable Conditions
 * @type struct<VariableCondition>[]
 * @default []
 * @desc Set up for variable conditions
 * 
 * @param Self Switch Conditions
 * @type struct<SelfSwitchCondition>[]
 * @default []
 * @desc Set up for self switch conditions
 * 
 * @param Item Conditions
 * @type struct<ItemCondition>[]
 * @default []
 * @desc Set up for item conditions
 * 
 * @param Weapon Conditions
 * @type struct<WeaponCondition>[]
 * @default []
 * @desc Set up for weapon conditions
 * 
 * @param Armor Conditions
 * @type struct<ArmorCondition>[]
 * @default []
 * @desc Set up for armor conditions
 * 
 * @param Gold Conditions
 * @type struct<GoldCondition>[]
 * @default []
 * @desc Set up for gold conditions
 * 
 * @param Skill Conditions
 * @type struct<SkillCondition>[]
 * @default []
 * @desc Set up for skill conditions
 * 
 * @param Actor Conditions
 * @type struct<ActorCondition>[]
 * @default []
 * @desc Actor IDs that must be in the party, or must be a specific level
 * 
 * @param JS Conditions
 * @type multiline_string[]
 * @default []
 * @desc JavaScript conditions. Your JS should return either true or false.
*/
/*~struct~SwitchCondition:
 * @param Switch ID
 * @type switch
 * @desc The switch to check
 * @default 0
 * 
 * @param Enabled
 * @type boolean
 * @default true
 * @desc True will check if the switch is ON. False will check if the switch is OFF.
*/
/*~struct~VariableCondition:
 * @param Variable ID
 * @type variable
 * @desc The variable to check
 * @default 0
 * 
 * @param comparator
 * @type select
 * @option <
 * @option <=
 * @option =
 * @option >=
 * @option >
 * @option !=
 * @default =
 * @desc The comparison operator used when looking at the variable's value
 *
 * @param value
 * @type number
 * @default 0
 * @desc The value against which to check the variable's value
*/
/*~struct~SelfSwitchCondition:
 * @param Switch ID
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @desc The switch id to check
 * @default A
 *
 * @param Map ID
 * @type number
 * @default 0
 * @desc The ID of the map the event which has the self switch belongs to
 *
 * @param Event ID
 * @type number
 * @default 0
 * @desc The ID of the event which has the self switch to check
 * 
 * @param Enabled
 * @type boolean
 * @default true
 * @desc True will check if the switch is ON. False will check if the switch is OFF.
*/
/*~struct~ItemCondition:
 * @param Item ID
 * @type item
 * @desc The item ID to check
 * @default 0
 *
 * @param Amount
 * @type number
 * @default 1
 * @min 1
 * @desc Minimum amount of the item required.
*/
/*~struct~WeaponCondition:
 * @param Weapon ID
 * @type weapon
 * @desc The weapon ID to check
 * @default 0
 *
 * @param Amount
 * @type number
 * @default 1
 * @min 1
 * @desc Minimum amount of the weapon required.
 *
 * @param Equipped
 * @type boolean
 * @default false
 * @desc Instead of checking amount, instead check if any party member has armor equipped?
*/
/*~struct~ArmorCondition:
 * @param Armor ID
 * @type armor
 * @desc The armor ID to check
 * @default 0
 *
 * @param Amount
 * @type number
 * @default 1
 * @min 1
 * @desc Minimum amount of the armor required.
 *
 * @param Equipped
 * @type boolean
 * @default false
 * @desc Instead of checking amount, instead check if any party member has armor equipped?
*/
/*~struct~GoldCondition:
 * @param Amount
 * @type number
 * @default 1
 * @min 0
 * @desc Amount of gold to check against
 * 
 * @param Comparator
 * @type select
 * @option <
 * @option <=
 * @option =
 * @option >=
 * @option >
 * @option !=
 * @default =
 * @desc The comparison operator used when looking at the gold value
 *
 * @param Currency ID
 * @desc The currency id to check if using [CGMZ] Currency System
*/
/*~struct~SkillCondition:
 * @param Skill ID
 * @type skill
 * @desc The skill ID to check for knowledge of.
 * @default 0
 *
 * @param Actor ID
 * @type actor
 * @default 0
 * @desc If not 0, will only check the given actor's skills for the desired skill.
*/
/*~struct~ActorCondition:
 * @param Actor ID
 * @type actor
 * @desc The actor ID to check if they are in the party
 * @default 0
 *
 * @param Level
 * @type number
 * @default 0
 * @desc If not 0, will also check if the actor is this level or higher
*/
Imported.CGMZ_ConditionalChoices = true;
CGMZ.Versions["Conditional Choices"] = "Alpha R6";
CGMZ.ConditionalChoices = {};
CGMZ.ConditionalChoices.parameters = PluginManager.parameters('CGMZ_ConditionalChoices');
CGMZ.ConditionalChoices.TextCode = CGMZ.ConditionalChoices.parameters["Text Code"];
CGMZ.ConditionalChoices.ConditionalChoices = CGMZ_Utils.parseJSON(CGMZ.ConditionalChoices.parameters["Conditional Choices"], [], "[CGMZ] Conditional Choices", "There was an error parsing the parameter: Conditional Choices. Check that this parameter is set up properly.");
//=============================================================================
// CGMZ_ConditionalChoice
//-----------------------------------------------------------------------------
// Data class for a conditional choice
//=============================================================================
function CGMZ_ConditionalChoice() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize conditional choice properties
//-----------------------------------------------------------------------------
CGMZ_ConditionalChoice.prototype.initialize = function(choice) {
	this._id = choice.id;
	this._conditions = [];
	const armorConditions = CGMZ_Utils.parseJSON(choice["Armor Conditions"], [], "[CGMZ] Conditional Choices", `There was an error parsing armor conditions. Skipping armor conditions for choice: ${this._id}`);
	const weaponConditions = CGMZ_Utils.parseJSON(choice["Weapon Conditions"], [], "[CGMZ] Conditional Choices", `There was an error parsing weapon conditions. Skipping weapon conditions for choice: ${this._id}`);
	const itemConditions = CGMZ_Utils.parseJSON(choice["Item Conditions"], [], "[CGMZ] Conditional Choices", `There was an error parsing item conditions. Skipping item conditions for choice: ${this._id}`);
	const switchConditions = CGMZ_Utils.parseJSON(choice["Switch Conditions"], [], "[CGMZ] Conditional Choices", `There was an error parsing switch conditions. Skipping switch conditions for choice: ${this._id}`);
	const selfSwitchConditions = CGMZ_Utils.parseJSON(choice["Self Switch Conditions"], [], "[CGMZ] Conditional Choices", `There was an error parsing self switch conditions. Skipping self switch conditions for choice: ${this._id}`);
	const variableConditions = CGMZ_Utils.parseJSON(choice["Variable Conditions"], [], "[CGMZ] Conditional Choices", `There was an error parsing variable conditions. Skipping variable conditions for choice: ${this._id}`);
	const goldConditions = CGMZ_Utils.parseJSON(choice["Gold Conditions"], [], "[CGMZ] Conditional Choices", `There was an error parsing gold conditions. Skipping gold conditions for choice: ${this._id}`);
	const skillConditions = CGMZ_Utils.parseJSON(choice["Skill Conditions"], [], "[CGMZ] Conditional Choices", `There was an error parsing skill conditions. Skipping skill conditions for choice: ${this._id}`);
	const actorConditions = CGMZ_Utils.parseJSON(choice["Actor Conditions"], [], "[CGMZ] Conditional Choices", `There was an error parsing actor conditions. Skipping actor conditions for choice: ${this._id}`);
	const jsConditions = CGMZ_Utils.parseJSON(choice["JS Conditions"], [], "[CGMZ] Conditional Choices", `There was an error parsing js conditions. Skipping js conditions for choice: ${this._id}`);
	this.setupItemConditions(armorConditions, "armor", "Armor ID");
	this.setupItemConditions(weaponConditions, "weapon", "Weapon ID");
	this.setupItemConditions(itemConditions, "item", "Item ID");
	this.setupSwitchConditions(switchConditions);
	this.setupSelfSwitchConditions(selfSwitchConditions);
	this.setupVariableConditions(variableConditions);
	this.setupGoldConditions(goldConditions);
	this.setupSkillConditions(skillConditions);
	this.setupActorConditions(actorConditions);
	this.setupJSConditions(jsConditions);
};
//-----------------------------------------------------------------------------
// Set up item / weapon / armor conditions
//-----------------------------------------------------------------------------
CGMZ_ConditionalChoice.prototype.setupItemConditions = function(conditions, type, idType) {
	for(const conditionJSON of conditions) {
		const condition = CGMZ_Utils.parseJSON(conditionJSON, null, "[CGMZ] Conditional Choices", `There was an error parsing a condition. Skipping ${type} condition for choice: ${this._id}`);
		if(condition) {
			const id = Number(condition[idType]);
			const amount = Number(condition.Amount);
			const obj = {type: type, id: id, amount: amount}
			if(condition.Equipped === 'true') obj.equipped = 'true';
			this._conditions.push(obj);
		}
	}
};
//-----------------------------------------------------------------------------
// Set up switch conditions
//-----------------------------------------------------------------------------
CGMZ_ConditionalChoice.prototype.setupSwitchConditions = function(conditions) {
	for(const conditionJSON of conditions) {
		const condition = CGMZ_Utils.parseJSON(conditionJSON, null, "[CGMZ] Conditional Choices", `There was an error parsing a switch condition. Skipping switch condition for choice: ${this._id}`);
		if(condition) {
			const id = Number(condition["Switch ID"]);
			const enabled = (condition.Enabled === 'true');
			const obj = {type: "switch", id: id, enabled: enabled};
			this._conditions.push(obj);
		}
	}
};
//-----------------------------------------------------------------------------
// Set up self switch conditions
//-----------------------------------------------------------------------------
CGMZ_ConditionalChoice.prototype.setupSelfSwitchConditions = function(conditions) {
	for(const conditionJSON of conditions) {
		const condition = CGMZ_Utils.parseJSON(conditionJSON, null, "[CGMZ] Conditional Choices", `There was an error parsing a self switch condition. Skipping self switch condition for choice: ${this._id}`);
		if(condition) {
			const id = condition["Switch ID"];
			const mapId = Number(condition["Map ID"]);
			const eventId = Number(condition["Event ID"]);
			const enabled = (condition.Enabled === 'true');
			const obj = {type: "selfSwitch", id: id, mapId: mapId, eventId: eventId, enabled: enabled};
			this._conditions.push(obj);
		}
	}
};
//-----------------------------------------------------------------------------
// Set up variable conditions
//-----------------------------------------------------------------------------
CGMZ_ConditionalChoice.prototype.setupVariableConditions = function(conditions) {
	for(const conditionJSON of conditions) {
		const condition = CGMZ_Utils.parseJSON(conditionJSON, null, "[CGMZ] Conditional Choices", `There was an error parsing a variable condition. Skipping variable condition for choice: ${this._id}`);
		if(condition) {
			const id = Number(condition["Variable ID"]);
			const comparator = condition.comparator;
			const value = Number(condition.value);
			const obj = {type: "variable", id: id, comparator: comparator, value: value};
			this._conditions.push(obj);
		}
	}
};
//-----------------------------------------------------------------------------
// Set up gold conditions
//-----------------------------------------------------------------------------
CGMZ_ConditionalChoice.prototype.setupGoldConditions = function(conditions) {
	for(const conditionJSON of conditions) {
		const condition = CGMZ_Utils.parseJSON(conditionJSON, null, "[CGMZ] Conditional Choices", `There was an error parsing a gold condition. Skipping gold condition for choice: ${this._id}`);
		if(condition) {
			const id = condition["Currency ID"] || 'default';
			const comparator = condition.Comparator;
			const value = Number(condition.Amount);
			const obj = {type: "gold", id: id, comparator: comparator, value: value};
			this._conditions.push(obj);
		}
	}
};
//-----------------------------------------------------------------------------
// Set up skill conditions
//-----------------------------------------------------------------------------
CGMZ_ConditionalChoice.prototype.setupSkillConditions = function(conditions) {
	for(const conditionJSON of conditions) {
		const condition = CGMZ_Utils.parseJSON(conditionJSON, null, "[CGMZ] Conditional Choices", `There was an error parsing a skill condition. Skipping skill condition for choice: ${this._id}`);
		if(condition) {
			const skillId = Number(condition["Skill ID"]);
			const actorId = Number(condition["Actor ID"]);
			const obj = {type: "skill", id: skillId, actor: actorId};
			this._conditions.push(obj);
		}
	}
};
//-----------------------------------------------------------------------------
// Set up actor conditions
//-----------------------------------------------------------------------------
CGMZ_ConditionalChoice.prototype.setupActorConditions = function(conditions) {
	for(const conditionJSON of conditions) {
		const condition = CGMZ_Utils.parseJSON(conditionJSON, null, "[CGMZ] Conditional Choices", `There was an error parsing an actor condition. Skipping actor condition for choice: ${this._id}`);
		if(condition) {
			const lv = Number(condition["Level"]);
			const actorId = Number(condition["Actor ID"]);
			const obj = {type: "actor", id: actorId, level: lv};
			this._conditions.push(obj);
		}
	}
};
//-----------------------------------------------------------------------------
// Set up switch conditions
//-----------------------------------------------------------------------------
CGMZ_ConditionalChoice.prototype.setupJSConditions = function(conditions) {
	for(const condition of conditions) {
		const obj = {type: "js", js: condition};
		this._conditions.push(obj);
	}
};
//-----------------------------------------------------------------------------
// Get the choice conditions
//-----------------------------------------------------------------------------
CGMZ_ConditionalChoice.prototype.getChoiceConditions = function() {
	return this._conditions;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Temporary data for CGMZ Conditional Choices
//=============================================================================
//-----------------------------------------------------------------------------
// Also set up conditional choices
//-----------------------------------------------------------------------------
const alias_CGMZ_ConditionalChoices_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_ConditionalChoices_CGMZTemp_createPluginData.call(this);
	this.setupConditionalChoices();
};
//-----------------------------------------------------------------------------
// Set up conditional choices
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.setupConditionalChoices = function() {
	this._conditionalChoices = {};
	for(const choiceJSON of CGMZ.ConditionalChoices.ConditionalChoices) {
		const choiceObj = CGMZ_Utils.parseJSON(choiceJSON, null, "[CGMZ] Conditional Choices", "There was an error parsing one of your conditional choices. Check choices are all set up properly. Skipping invalid choice.");
		if(!choiceObj) continue;
		this._conditionalChoices[choiceObj.id] = new CGMZ_ConditionalChoice(choiceObj);
	}
};
//-----------------------------------------------------------------------------
// Get choice conditions for a given id
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getChoiceConditions = function(id) {
	const choice = this._conditionalChoices[id];
	if(!choice) return [];
	return choice.getChoiceConditions();
};
//=============================================================================
// Game_Message
//-----------------------------------------------------------------------------
// Check for and handle any CGMZ conditionals found in choices
//=============================================================================
//-----------------------------------------------------------------------------
// Check for conditional choices, handle any discovered
// cancelType = -1 for disallow, -2 for branch
// defaultType = -1 for none
//-----------------------------------------------------------------------------
const alias_CGMZ_ConditionalChoices_GameMessage_setChoices = Game_Message.prototype.setChoices;
Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) {
	const newChoices = [];
	this._cgmzConditionalChoiceReroute = [];
	this._cgmzConditionalChoicesTotalChoices = choices.length;
	let defaultTypeAdjustment = 0;
	let cancelTypeAdjustment = 0;
	for(let i = 0; i < choices.length; i++) {
		const choice = choices[i];
		if(choice.includes(`<${CGMZ.ConditionalChoices.TextCode}>`)) {
			const regex = new RegExp(`<${CGMZ.ConditionalChoices.TextCode}>(.*)</${CGMZ.ConditionalChoices.TextCode}>`, "gi");
			const matchArray = [...choice.matchAll(regex)];
			const matchSplit = matchArray[0][1].split(":");
			const matchCommand = matchSplit[0];
			const matchArgs = matchSplit[1].split(",");
			if(this.CGMZ_conditionalChoiceMeetsCondition(matchCommand, matchArgs)) {
				const choiceString = choice.replace(matchArray[0][0], '');
				newChoices.push(choiceString);
				this._cgmzConditionalChoiceReroute[i] = true;
			} else {
				this._cgmzConditionalChoiceReroute[i] = false;
				if(i < defaultType && defaultType >= 0) defaultTypeAdjustment--;
				if(i < cancelType && cancelType >= 0) cancelTypeAdjustment--;
			}
		} else {
			newChoices.push(choice);
			this._cgmzConditionalChoiceReroute[i] = true;
		}
	}
	defaultType += defaultTypeAdjustment;
	cancelType += cancelTypeAdjustment;
    alias_CGMZ_ConditionalChoices_GameMessage_setChoices.call(this, newChoices, defaultType, cancelType);
};
//-----------------------------------------------------------------------------
// Check if choice meets conditions. Possible Conditions in form command:args are:
// id:id - check against id set up in plugin params
// switch:id,[off] - check if switch is ON/OFF
// var:id,val,[<,<=,=,!=,>=,>]
// ss:id,mapId,eventId,[off]
// item:id,[amount]
// armor:id,[amount]
// weapon:id,[amount]
// gold:[<,<=,=,!=,>=,>],amount,[id]
// skill:id,[actor]
// actor:id,[level]
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_conditionalChoiceMeetsCondition = function(command, args) {
	switch(command) {
		case 'id': return this.CGMZ_conditionalChoiceIdCondition($cgmzTemp.getChoiceConditions(args[0]));
		case 'switch': return this.CGMZ_conditionalChoiceSwitchCondition(Number(args[0]), args.length === 1);
		case 'var': return this.CGMZ_conditionalChoiceVariableCondition(Number(args[0]), Number(args[1]), args[2] || '=');
		case 'ss': return this.CGMZ_conditionalChoiceSelfSwitchCondition(args[0], Number(args[1]), Number(args[2]), args.length === 3);
		case 'item': return this.CGMZ_conditionalChoiceItemCondition(Number(args[0]), args[1] || 0);
		case 'armor': return this.CGMZ_conditionalChoiceArmorCondition(Number(args[0]), args[1] || 0);
		case 'weapon': return this.CGMZ_conditionalChoiceWeaponCondition(Number(args[0]), args[1] || 0);
		case 'gold': return this.CGMZ_conditionalChoiceGoldCondition(args[0], Number(args[1]), args[2] || 'default');
		case 'skill': return this.CGMZ_conditionalChoiceSkillCondition(Number(args[0]), (args[1]) ? Number(args[1]) : 0);
		case 'actor': return this.CGMZ_conditionalChoiceActorCondition(Number(args[0]), (args[1]) ? Number(args[1]) : 0);
	}
	const error = `Unrecognized conditional choice type: ${command}`;
	const suggestion = "Valid conditional choice types are: id, switch, var, ss, item, armor, weapon, skill. Please choose one of those, see documentation for setup";
	CGMZ_Utils.reportError(error, "[CGMZ] Conditional Choices", suggestion);
	return true;
};
//-----------------------------------------------------------------------------
// Check if id condition is met
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_conditionalChoiceIdCondition = function(choiceArray) {
	for(const choice of choiceArray) {
		switch(choice.type) {
			case "switch":
				if(!this.CGMZ_conditionalChoiceSwitchCondition(choice.id, choice.enabled)) return false;
				break;
			case "selfSwitch":
				if(!this.CGMZ_conditionalChoiceSelfSwitchCondition(choice.id, choice.mapId, choice.eventId, choice.enabled)) return false;
				break;
			case "variable":
				if(!this.CGMZ_conditionalChoiceVariableCondition(choice.id, choice.value, choice.comparator)) return false;
				break;
			case "item":
				if(!this.CGMZ_conditionalChoiceItemCondition(choice.id, (choice.amount > 1) ? choice.amount : 0)) return false;
				break;
			case "armor":
				if(!this.CGMZ_conditionalChoiceArmorCondition(choice.id, (choice.equipped) ? 'true' : (choice.amount > 1) ? choice.amount : 0)) return false;
				break;
			case "weapon":
				if(!this.CGMZ_conditionalChoiceWeaponCondition(choice.id, (choice.equipped) ? 'true' : (choice.amount > 1) ? choice.amount : 0)) return false;
				break;
			case "gold":
				if(!this.CGMZ_conditionalChoiceGoldCondition(choice.comparator, choice.value, choice.id)) return false;
				break;
			case "skill":
				if(!this.CGMZ_conditionalChoiceSkillCondition(choice.id, choice.actor)) return false;
				break;
			case "actor":
				if(!this.CGMZ_conditionalChoiceActorCondition(choice.id, choice.level)) return false;
				break;
			case "js":
				if(!this.CGMZ_conditionalChoiceJSCondition(choice.js)) return false;
				break;
		}
	}
	return true;
};
//-----------------------------------------------------------------------------
// Check if switch condition is met
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_conditionalChoiceSwitchCondition = function(id, value) {
	return ($gameSwitches.value(id) === value);
};
//-----------------------------------------------------------------------------
// Check if variable condition is met
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_conditionalChoiceVariableCondition = function(id, value, comparator = '=') {
	const variableValue = $gameVariables.value(id);
	return CGMZ_Utils.numberValueCompare(variableValue, value, comparator);
};
//-----------------------------------------------------------------------------
// Check if self switch condition is met
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_conditionalChoiceSelfSwitchCondition = function(id, mapId, eventId, value) {
	const key = [mapId, eventId, id];
	return ($gameSelfSwitches.value(key) === value);
};
//-----------------------------------------------------------------------------
// Check if item condition is met
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_conditionalChoiceItemCondition = function(id, amount) {
	const item = $dataItems[id];
	return this.CGMZ_conditionalChoiceItemWeaponArmorCheck(item, amount);
};
//-----------------------------------------------------------------------------
// Check if weapon condition is met
// if amount is true, it will instead check if its equipped by anyone
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_conditionalChoiceWeaponCondition = function(id, amount) {
	const item = $dataWeapons[id];
	if(amount === 'true') {
		return $gameParty.members().some(actor => actor.hasWeapon(item));
	}
	return this.CGMZ_conditionalChoiceItemWeaponArmorCheck(item, amount);
};
//-----------------------------------------------------------------------------
// Check if armor condition is met
// if amount is true, it will instead check if its equipped by anyone
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_conditionalChoiceArmorCondition = function(id, amount) {
	const item = $dataArmors[id];
	if(amount === 'true') {
		return $gameParty.members().some(actor => actor.hasArmor(item));
	}
	return this.CGMZ_conditionalChoiceItemWeaponArmorCheck(item, amount);
};
//-----------------------------------------------------------------------------
// Check if gold condition is met
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_conditionalChoiceGoldCondition = function(comparator, value, id) {
	if(Imported.CGMZ_CurrencySystem && id !== 'default') {
		const currencyValue = $cgmz.getCurrencyAmount(id);
		return CGMZ_Utils.numberValueCompare(currencyValue, value, comparator);
	}
	const goldValue = $gameParty.gold();
	return CGMZ_Utils.numberValueCompare(goldValue, value, comparator);
};
//-----------------------------------------------------------------------------
// Check if skill condition is met
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_conditionalChoiceSkillCondition = function(skillId, actorId) {
	const actors = (actorId) ? [$gameActors.actor(actorId)] : $gameParty.allMembers();
	for(const actor of actors) {
		const skills = actor.skills();
		for(const skill of skills) {
			if(skill.id === skillId) return true;
		}
	}
	return false;
};
//-----------------------------------------------------------------------------
// Check if actor condition is met
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_conditionalChoiceActorCondition = function(actorId, level) {
	if(!$gameParty._actors.includes(actorId)) return false;
	const actor = $gameActors.actor(actorId);
	return (level === 0 || actor._level >= level);
};
//-----------------------------------------------------------------------------
// Check if js condition is met
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_conditionalChoiceJSCondition = function(js) {
	const fn = new Function(js);
	return fn.call(this);
};
//-----------------------------------------------------------------------------
// Universal check for item/weapon/armors
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_conditionalChoiceItemWeaponArmorCheck = function(item, amount) {
	return (amount) ? $gameParty.numItems(item) >= amount : $gameParty.hasItem(item, true);
};
//-----------------------------------------------------------------------------
// Check if choice index needs reroute because of hidden choices
//-----------------------------------------------------------------------------
const alias_CGMZ_ConditionalChoices_GameMessage_onChoice = Game_Message.prototype.onChoice;
Game_Message.prototype.onChoice = function(n) {
	const choiceIndex = this.CGMZ_conditionalChoiceGetActualChoiceIndex(n);
	alias_CGMZ_ConditionalChoices_GameMessage_onChoice.call(this, choiceIndex);
};
//-----------------------------------------------------------------------------
// Convert the choice index into its actual index, accounting for skipped choices
//-----------------------------------------------------------------------------
Game_Message.prototype.CGMZ_conditionalChoiceGetActualChoiceIndex = function(index) {
	if(index < 0) return index; // if cancel branch (-2) or cancel disallow (1) chosen
	let skippedChoices = 0;
	let unskippedChoices = 0;
	for(let i = 0; i < this._cgmzConditionalChoicesTotalChoices; i++) {
		if(!this._cgmzConditionalChoiceReroute[i]) skippedChoices++;
		if(this._cgmzConditionalChoiceReroute[i]) unskippedChoices++;
		if(unskippedChoices === index + 1) break;
	}
	return index + skippedChoices;
};