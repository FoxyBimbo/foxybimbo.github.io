/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/dungeontools/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Adds dungeon tools (arrow, bomb, hookshot, etc) to your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha R10
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: This plugin adds some common RPG dungeon tools such as the
 * bomb, arrow, hookshot, and more. Each tool is configurable and can be
 * unlocked separately. Tools will interact with events they touch by turning
 * self switches ON/OFF.
 * ----------------------------------------------------------------------------
 * Documentation:
 * --------------------------------Tools---------------------------------------
 * General: You can have multiple different tools of the same type if desired.
 * This might make it so you can have fire arrows which interact with ice
 * events but not fire events, and ice arrows that interact with fire events
 * but not ice events.
 *
 * Reset tool: This tool will "reset" the current map the player is in. It
 * accomplishes this by 1) saving the coordinates the player entered the map
 * and teleporting them to those coordinates when the tool is used, and 2)
 * manipulating the self-switches of events set up to interact with the tool.
 *
 * Arrow tool: This tool will shoot an arrow in the direction the player is
 * currently facing which will travel for the configurable range number of
 * tiles, or until it collides with either an impassable part of the map or
 * an event. If it collides with an event, it will check and see if that event
 * is interactable with the arrow, and if so, it will manipulate the
 * self-switches of that event. It can move through otherwise impassable map
 * tiles if they are painted with the passable region ID.
 *
 * Bomb tool: This tool will set a bomb down at the player's current location
 * which will explode after a certain amount of steps taken by the player.
 * Events nearby that are hit by the explosion will be checked to determine if
 * any of their self-switches should be manipulated.
 *
 * Boomerang tool: This tool will shoot a boomerang in the direction the player
 * is currently facing which will travel for the configurable range number of
 * tiles, or until it collides with either an impassable part of the map or
 * an event where it will then return to the player. It can move through
 * otherwise impassable map tiles if they are painted with the passable region
 * ID. When passing over an event, it will check if the event can be
 * "picked up" by the boomerang as well as if the event should have its
 * self-switches manipulated by the boomerang. The boomerang can pick up an
 * unlimited number of events. Since the boomerang returns to the player, the
 * player cannot move while this tool is active.
 *
 * Hookshot tool: This tool will shoot a hookshot in the direction the player
 * is currently facing, which will travel for the configurable range number of
 * tiles, or until it collides with an impassable part of the map or an event.
 * If the event it collides with is tagged as interactable with the hookshot
 * tag, it will pull the player to the event rather than returning to the
 * player. Since the hookshot returns to the player (or pulls the player to
 * the hookshot), the player cannot move while this tool is active.
 *
 * Interact tool: This tool will simply interact with the event(s) in front of
 * the player. Something like a pickaxe or axe to cut through a stone or tree
 * that might be blocking the player's path.
 *
 * Lantern tool: This tool will show a [CGMZ] Light Effect around the player. 
 * When the player moves near an event that interacts with this tool, it will
 * have its self switches turned ON. When the player moves away, the self
 * switches will turn back off. You can use this to create hidden events,
 * hidden floors over pits, and many other uses.
 * -----------------------------Tagging Events---------------------------------
 * Events are tagged with a comment event command somewhere on the event page.
 * Only the active event page will be considered.
 * 
 * To tag an event for self-switch manipulation by a tool or as interactable
 * with the hookshot, use the following:
 * CGMZDT [symbol]
 * 
 * For example, if you wanted something to interact with your bomb tool, and
 * you set the bomb tool to have the symbol "mybomb", you would comment:
 * CGMZDT mybomb
 *
 * The boomerang tool has a special comment for "pickup" in the format of:
 * CGMZDT PICKUP [item|weapon|armor|gold] [amount] [id]
 * 
 * For example, if you wanted the pickup to be a 2x weapons of ID 5, you'd do:
 * CGMZDT PICKUP weapon 2 5
 *
 * Gold pickups can omit the id, so if you wanted the pickup to be 500G, do:
 * CGMZDT PICKUP gold 500
 *
 * You can also change the post-pickup text in the boomerang pickup comment
 * You do this by typing your custom message after the id of a pickup. Please
 * note that even though gold pickups do not need to have an id, you must type
 * an id that will not be used if you wish to use a custom message.
 * 
 * For example, a gold pickup with a custom message would be:
 * CGMZDT PICKUP gold 500 x You received 500 gold!
 * 
 * The weapon example from before with a custom message would be:
 * CGMZDT PICKUP weapon 2 5 You received 2 of the weapon with id 5!
 *
 * Text codes will work in custom boomerang messages.
 *
 * Comments are CASE-SENSITIVE. Example of incorrect comment:
 * CGMZdt pickup GOLD 500
 * ----------------------------Resource Specs----------------------------------
 * The images used for the tool sprites will be 4x pixels high (if using tools
 * which are 48 pixels tall, make the height 48x4 = 192px). Each row will be
 * one direction, which follows the same pattern as normal character sprites.
 *
 * You can specify the frame-width of each column. If you want 10 frames of
 * animation at 48px wide each, you would make 48x10 = 480px wide. Tools can
 * use an unlimited* amount of frames. The frame width can be unique per tool.
 * * unlimited in this case means the plugin does not add any limit. There are
 * WebGL limitations to how large a single PIXI Sprite can be, which is usually
 * 16384px on computer but could be as small as 4096px on some mobile devices.
 * 
 * The bomb tool uses 1 row of graphics since the bomb tool does not have a
 * direction, so if you wanted your bomb tool to be 48px tall, you'd make the
 * sprite sheet height 48px.
 * -----------------------------Integrations-----------------------------------
 * [CGMZ] Light Effects
 * When using a Lantern Tool, you can optionally provide a CGMZ Light Effect
 * ID to show around the player.
 *
 * [CGMZ] Event Movement
 * If you have events that move using [CGMZ] Event Movement, for example on
 * map enemies, you can set up certain tools to stun these events when a tool
 * makes contact with them. Tools that have this feature are the arrow,
 * boomerang, and hookshot.
 *
 * [CGMZ] Scene Backgrounds
 * Use this plugin to create a custom background for the tool select scene.
 * It supports scrolling backgrounds and some other options for a truly unique
 * background.
 *
 * [CGMZ] Window Backgrounds
 * Use this plugin to show a custom background image in the tool select scene
 * windows. You can optionally make this image a parallax that scrolls.
 *
 * [CGMZ] Window Settings
 * Allows you to change windowskin, window tone, style, and more for every
 * window in your game including the tool select scene windows.
 *
 * [CGMZ] Controls Window
 * Use this plugin to show a window that tells the player controls for the
 * tool select scene. It will display controls for controller or keyboard,
 * depending on the player's last input type.
 * ----------------------------Plugin Commands---------------------------------
 * This plugin supports the following plugin commands:
 * • Call Scene
 * Forcibly calls the select tool scene
 * 
 * • Discover Tool
 * Discovers the tool for use on the select tool scene
 * 
 * • Remove Tool
 * Removes/undiscovers the tool from the select tool scene
 * 
 * • Equip Tool
 * Forces a tool to be equipped
 * 
 * • Use Tool
 * Tries to use the currently equipped tool
 * 
 * • Change Tool Enable
 * Enable/Disable a specific tool from being used
 * 
 * • Modify Reset
 * Allows you to change a reset tool's properties
 * 
 * • Modify Arrow
 * Allows you to change an arrow tool's properties
 * 
 * • Modify Bomb
 * Allows you to change a bomb tool's properties
 * 
 * • Modify Boomerang
 * Allows you to change a boomerang tool's properties
 * 
 * • Modify Hookshot
 * Allows you to change a hookshot tool's properties
 * 
 * • Modify Interact
 * Allows you to change an interact tool's properties
 * 
 * • Modify Lantern
 * Allows you to change a lantern tool's properties
 * ------------------------------Saved Games-----------------------------------
 * This plugin is partially compatible with saved games
 *
 * This means the following will be reflected in saved games:
 * ✓ Add new dungeon tools
 * ✓ With Plugin Command only, modify existing dungeon tools
 * ✓ With Plugin Command only, remove existing dungeon tools
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_DungeonTools.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -----------------------------Latest Version---------------------------------
 * Hi all, this latest version adds a sound effect that can play when an
 * arrow, boomerang, or hookshot collides with something. As a reminder, since
 * dungeon tools are part of save data, to get this sound effect to appear in
 * a saved game you will need to use the Modify Dungeon Tool plugin command
 * to add it in for your saved games, or if your game is released you can
 * also use [CGMZ] Patch to add it in for your players' save files.
 *
 * A bug was also fixed with the lantern tool where it was not properly
 * unequipping when another tool was equipped after using the lantern until a
 * map transfer.
 * 
 * Version Alpha R10
 * - Added Collide Sound Effect for arrow, boomerang, hookshot
 * - Fix bug with lantern tool not properly unequipping
 *
 * @command Call Scene
 * @desc Calls the dungeon tool select scene
 *
 * @arg Ignore Disabled
 * @type boolean
 * @default false
 * @desc If true, will call scene even if dungeon tools are currently disabled.
 *
 * @command Discover Tool
 * @desc Discovers a tool for selection later
 *
 * @arg Symbol
 * @desc The symbol of the tool to discover. Case sensitive.
 *
 * @command Remove Tool
 * @desc Undiscovers a tool for selection later
 *
 * @arg Symbol
 * @desc The symbol of the tool to undiscover. Case sensitive.
 *
 * @command Equip Tool
 * @desc Forces the player to equip this tool
 *
 * @arg Symbol
 * @desc The symbol of the tool to force equip. Case sensitive.
 *
 * @command Use Tool
 * @desc Attempts to use the player's currently equipped tool
 *
 * @command Change Tool Enable
 * @desc Disable/Enable a tool
 *
 * @arg Symbol
 * @desc The symbol of the tool to change. Case sensitive.
 *
 * @arg Enable
 * @type boolean
 * @default true
 * @desc true = enable tool, false = disable tool
 *
 * @arg Unequip
 * @type boolean
 * @default false
 * @desc Also unequip the tool (if equipped)?
 *
 * @command Modify Reset
 * @desc Change a reset tool's properties
 *
 * @arg Properties
 * @type struct<ResetTool>
 * @desc The properties to change
 *
 * @command Modify Arrow
 * @desc Change an arrow tool's properties
 *
 * @arg Properties
 * @type struct<ArrowTool>
 * @desc The properties to change
 *
 * @command Modify Bomb
 * @desc Change a bomb tool's properties
 *
 * @arg Properties
 * @type struct<BombTool>
 * @desc The properties to change
 *
 * @command Modify Boomerang
 * @desc Change a boomerang tool's properties
 *
 * @arg Properties
 * @type struct<BoomerangTool>
 * @desc The properties to change
 *
 * @command Modify Hookshot
 * @desc Change a hookshot tool's properties
 *
 * @arg Properties
 * @type struct<HookshotTool>
 * @desc The properties to change
 *
 * @command Modify Interact
 * @desc Change an interact tool's properties
 *
 * @arg Properties
 * @type struct<InteractTool>
 * @desc The properties to change
 *
 * @command Modify Lantern
 * @desc Change a lantern tool's properties
 *
 * @arg Properties
 * @type struct<LanternTool>
 * @desc The properties to change
 *
 * @param Dungeon Tools
 *
 * @param Reset Tools
 * @parent Dungeon Tools
 * @type struct<ResetTool>[]
 * @default []
 * @desc Set up reset tools here
 *
 * @param Arrow Tools
 * @parent Dungeon Tools
 * @type struct<ArrowTool>[]
 * @default []
 * @desc Set up arrow tools here
 *
 * @param Bomb Tools
 * @parent Dungeon Tools
 * @type struct<BombTool>[]
 * @default []
 * @desc Set up bomb tools here
 *
 * @param Boomerang Tools
 * @parent Dungeon Tools
 * @type struct<BoomerangTool>[]
 * @default []
 * @desc Set up boomerang tools here
 *
 * @param Hookshot Tools
 * @parent Dungeon Tools
 * @type struct<HookshotTool>[]
 * @default []
 * @desc Set up hookshot tools here
 *
 * @param Interact Tools
 * @parent Dungeon Tools
 * @type struct<InteractTool>[]
 * @default []
 * @desc Set up interaction tools here
 *
 * @param Lantern Tools
 * @parent Dungeon Tools
 * @type struct<LanternTool>[]
 * @default []
 * @desc Set up lantern tools here
 *
 * @param Mechanics
 *
 * @param Tool Access Switch
 * @parent Mechanics
 * @type switch
 * @desc A switch that, when ON, will allow the player to use dungeon tools. If 0, player can always use tools.
 * @default 0
 *
 * @param Hookshot Connect Offset
 * @parent Mechanics
 * @type number
 * @decimals 2
 * @min 0
 * @desc Percentage of a tile to go past the hookshot connection point when a connection is made.
 * @default 0.50
 *
 * @param Controls
 *
 * @param Tool Key
 * @parent Controls
 * @desc Key that when pressed will attempt to use the dungeon tool (case sensitive - capital means shift+key)
 * @default q
 *
 * @param Tool Gamepad
 * @parent Controls
 * @desc Gamepad button that when pressed will attempt to use the dungeon tool
 * @type select
 * @option None
 * @value -1
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
 * @default 7
 *
 * @param Cycle Tool Key
 * @parent Controls
 * @desc Key that when pressed will attempt to cycle to the next dungeon tool (case sensitive - capital means shift+key)
 * @default e
 *
 * @param Cycle Tool Gamepad
 * @parent Controls
 * @desc Gamepad button that when pressed will attempt to cycle to the next dungeon tool
 * @type select
 * @option None
 * @value -1
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
 * @default 8
 *
 * @param Tool Select Key
 * @parent Controls
 * @desc Key that when pressed will open the dungeon tool select scene (if on map)
 * @default d
 *
 * @param Tool Select Gamepad
 * @parent Controls
 * @desc Gamepad button that when pressed will open the dungeon tool select scene (if on map)
 * @type select
 * @option None
 * @value -1
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
 * @default 6
 *
 * @param Use Tool Button Offset
 * @parent Controls
 * @type number
 * @min 0
 * @default 11
 * @desc Use Tool Button index on the button sheet
 *
 * @param Use Tool Button Width
 * @parent Controls
 * @type number
 * @min 1
 * @default 1
 * @desc Use Tool Button width (in multiple of 48 pixels)
 *
 * @param Enable Use Button
 * @parent Controls
 * @type boolean
 * @default true
 * @desc If false, will never show the Touch UI Use Button
 *
 * @param Select Tool Button Offset
 * @parent Controls
 * @type number
 * @min 0
 * @default 11
 * @desc Select Tool Button index on the button sheet
 *
 * @param Select Tool Button Width
 * @parent Controls
 * @type number
 * @min 1
 * @default 1
 * @desc Select Tool Button width (in multiple of 48 pixels)
 *
 * @param Enable Select Button
 * @parent Controls
 * @type boolean
 * @default true
 * @desc If false, will never show the Touch UI Select Button
 *
 * @param Cycle Tool Button Offset
 * @parent Controls
 * @type number
 * @min 0
 * @default 11
 * @desc Cycle Tool Button index on the button sheet
 *
 * @param Cycle Tool Button Width
 * @parent Controls
 * @type number
 * @min 1
 * @default 1
 * @desc Cycle Tool Button width (in multiple of 48 pixels)
 *
 * @param Enable Cycle Button
 * @parent Controls
 * @type boolean
 * @default true
 * @desc If false, will never show the Touch UI Cycle Button
 *
 * @param Scene Options
 *
 * @param Disable Scene With Tools
 * @parent Scene Options
 * @type boolean
 * @desc If true, the Tool Select scene will not open if dungeon tools are disabled. If false it will still open.
 * @default true
 *
 * @param Max Tool Select Lines
 * @parent Scene Options
 * @type number
 * @min 1
 * @desc Maximum amount of lines to show in the tool select window
 * @default 5
 *
 * @param Equipped Text
 * @parent Scene Options
 * @desc Text to show at the top of the currently equipped tool window
 * @default \c[1]Equipped:\c[0]
 *
 * @param Show Boomerang Message
 * @type boolean
 * @desc Whether to show a message when the boomerang returns with items
 * @default true
 *
 * @param Boomerang Message Pretext
 * @desc Text to show before each item name / amount
 * @default You received \c[3]
 *
 * @param Boomerang Message Posttext
 * @desc Text to show after each item name / amount
 * @default \c[0]!
 *
 * @param Integrations
 *
 * @param Scene Background
 * @parent Integrations
 * @desc The [CGMZ] Scene Backgrounds preset to use in the dungeon tool select scene
 *
 * @param Controls Window
 * @parent Integrations
 * @desc The [CGMZ] Controls Window preset to use in the dungeon tool select scene
 *
 * @param Current Tool Window Background
 * @parent Integrations
 * @desc The [CGMZ] Window Backgrounds preset to use in the current tool window
 *
 * @param Tool Select Window Background
 * @parent Integrations
 * @desc The [CGMZ] Window Backgrounds preset to use in the tool select window
 *
 * @param Current Tool Window Settings
 * @parent Integrations
 * @desc The [CGMZ] Window Settings preset to use in the current tool window
 *
 * @param Tool Select Window Settings
 * @parent Integrations
 * @desc The [CGMZ] Window Settings preset to use in the tool select window
*/
/*~struct~CommonToolProperties:
 * @param Name
 * @desc Name of the tool which will be displayed in the tool select menu.
 *
 * @param Symbol
 * @desc This symbol is used internally to recognize the tool. Must be UNIQUE (case sensitive)
 *
 * @param Icon
 * @type icon
 * @default 0
 * @desc Icon Index of the icon to use for the tool
 *
 * @param Item Options
 *
 * @param Item
 * @parent Item Options
 * @type item
 * @default 0
 * @desc Item ID required to use the tool, must be in player inventory
 *
 * @param Consumable
 * @parent Item Options
 * @type boolean
 * @default false
 * @desc If an item parameter is set, is it consumed when the tool is used?
 *
 * @param Sound Effect Options
 *
 * @param Use SE
 * @parent Sound Effect Options
 * @type struct<SE>
 * @desc Sound Effect to play when using the tool
 *
 * @param Integrations
 * 
 * @param On Use Rumble
 * @parent Integrations
 * @type struct<Rumble>
 * @desc Gamepad rumble options to use when the tool is used
 * 
 * @param On Interact Rumble
 * @parent Integrations
 * @type struct<Rumble>
 * @desc Gamepad rumble options to use when the tool interacts with something
*/
/*~struct~ResetTool:
 * @param Properties
 * @type struct<CommonToolProperties>
 * @default {"Name":"","Symbol":"","Icon":"0","Item Options":"","Item":"0","Consumable":"false","Sound Effect Options":"","Use SE":"","Integrations":"","On Use Rumble":"","On Interact Rumble":""}
 * @description Set up common tool properties here.
 * 
 * @param Switches
 * @type select[]
 * @option A
 * @option B
 * @option C
 * @option D
 * @default ["A", "B", "C", "D"]
 * @desc The self switches of events to turn OFF when used.
*/
/*~struct~ArrowTool:
 * @param Properties
 * @type struct<CommonToolProperties>
 * @default {"Name":"","Symbol":"","Icon":"0","Item Options":"","Item":"0","Consumable":"false","Sound Effect Options":"","Use SE":"","Integrations":"","On Use Rumble":"","On Interact Rumble":""}
 * @description Set up common tool properties here.
 * 
 * @param Switches
 * @type select[]
 * @option A
 * @option B
 * @option C
 * @option D
 * @default []
 * @desc The self switches of events to turn ON when coming in contact with an event
 * 
 * @param Range
 * @type number
 * @default 6
 * @desc The amount of tiles the arrow goes before disappearing
 * 
 * @param Speed
 * @type number
 * @default 6
 * @desc The speed at which the arrow flies
 * 
 * @param Passable Region
 * @type number
 * @default 1
 * @desc The region ID through which an arrow can always move into from an adjacent tile
 * 
 * @param Image Settings
 *
 * @param Image
 * @parent Image Settings
 * @type file
 * @dir img
 * @desc The image of the arrow
 *
 * @param Frame Width
 * @parent Image Settings
 * @type number
 * @default 48
 * @min 1
 * @desc The width of one frame of the arrow image
 *
 * @param Animation Speed
 * @parent Image Settings
 * @type number
 * @default 15
 * @min 0
 * @desc The amount of frames before switching animation frame
 *
 * @param Sound Effect Options
 *
 * @param Collide SE
 * @parent Sound Effect Options
 * @type struct<SE>
 * @desc Sound Effect to play when the arrow collides with something
 * 
 * @param Stun Settings
 *
 * @param Stun Steps
 * @parent Stun Settings
 * @type number
 * @default 0
 * @min 0
 * @desc Amount of steps to stun [CGMZ] Event Movement events for when interacting with them
*/
/*~struct~BombTool:
 * @param Properties
 * @type struct<CommonToolProperties>
 * @default {"Name":"","Symbol":"","Icon":"0","Item Options":"","Item":"0","Consumable":"false","Sound Effect Options":"","Use SE":"","Integrations":"","On Use Rumble":"","On Interact Rumble":""}
 * @description Set up common tool properties here.
 * 
 * @param Switches
 * @type select[]
 * @option A
 * @option B
 * @option C
 * @option D
 * @default []
 * @desc The self switches of events to turn ON after nearby explosion
 * 
 * @param Steps
 * @type number
 * @default 6
 * @desc The number of steps the player must take before the bomb explodes. Set to 0 to not use.
 * 
 * @param Image Settings
 *
 * @param Image
 * @parent Image Settings
 * @type file
 * @dir img
 * @desc The image of the bomb
 *
 * @param Frame Width
 * @parent Image Settings
 * @type number
 * @default 48
 * @min 1
 * @desc The width of one frame of the bomb image
 *
 * @param Animation Speed
 * @parent Image Settings
 * @type number
 * @default 15
 * @min 0
 * @desc The amount of frames before switching animation frame
 *
 * @param Explosion Image
 * @parent Image Settings
 * @type file
 * @dir img
 * @desc The image of the bomb explosion
 *
 * @param Explosion Frame Width
 * @parent Image Settings
 * @type number
 * @default 144
 * @min 1
 * @desc The width of one frame of the bomb explosion image
 *
 * @param Explosion Animation Speed
 * @parent Image Settings
 * @type number
 * @default 15
 * @min 0
 * @desc The amount of frames before switching animation frames
 *
 * @param Sound Effect Options
 *
 * @param Explode SE
 * @parent Sound Effect Options
 * @type struct<SE>
 * @desc Sound Effect to play when the bomb explodes
*/
/*~struct~BoomerangTool:
 * @param Properties
 * @type struct<CommonToolProperties>
 * @default {"Name":"","Symbol":"","Icon":"0","Item Options":"","Item":"0","Consumable":"false","Sound Effect Options":"","Use SE":"","Integrations":"","On Use Rumble":"","On Interact Rumble":""}
 * @description Set up common tool properties here.
 * 
 * @param Switches
 * @type select[]
 * @option A
 * @option B
 * @option C
 * @option D
 * @default []
 * @desc The self switches of events to turn ON when coming in contact with an event
 * 
 * @param Range
 * @type number
 * @default 6
 * @desc The amount of tiles the tool goes before returning to the user
 * 
 * @param Speed
 * @type number
 * @default 5
 * @desc The speed at which the boomerang flies
 * 
 * @param Passable Region
 * @type number
 * @default 1
 * @desc The region ID through which the tool can always move into from an adjacent tile
 * 
 * @param Image Settings
 *
 * @param Image
 * @parent Image Settings
 * @type file
 * @dir img
 * @desc The image of the boomerang
 *
 * @param Frame Width
 * @parent Image Settings
 * @type number
 * @default 48
 * @min 1
 * @desc The width of one frame of the boomerang image
 *
 * @param Animation Speed
 * @parent Image Settings
 * @type number
 * @default 15
 * @min 0
 * @desc The amount of frames before switching animation frames
 *
 * @param Sound Effect Options
 *
 * @param Collide SE
 * @parent Sound Effect Options
 * @type struct<SE>
 * @desc Sound Effect to play when the boomerang collides with something
 * 
 * @param Stun Settings
 *
 * @param Stun Steps
 * @parent Stun Settings
 * @type number
 * @default 0
 * @min 0
 * @desc Amount of steps to stun [CGMZ] Event Movement events for when interacting with them
*/
/*~struct~HookshotTool:
 * @param Properties
 * @type struct<CommonToolProperties>
 * @default {"Name":"","Symbol":"","Icon":"0","Item Options":"","Item":"0","Consumable":"false","Sound Effect Options":"","Use SE":"","Integrations":"","On Use Rumble":"","On Interact Rumble":""}
 * @description Set up common tool properties here.
 * 
 * @param Range
 * @type number
 * @default 6
 * @desc The amount of tiles the tool goes before returning to the  (if no hook)
 * 
 * @param Speed
 * @type number
 * @default 5
 * @desc The speed at which the hookshot flies
 * 
 * @param Gather Speed
 * @type number
 * @default 5
 * @desc The speed at which the player moves to the hookshot if it catches a grapple point
 * 
 * @param Jump Gather
 * @type boolean
 * @default false
 * @desc If true, the player will jump to the hookshot when grappling instead of walking
 * 
 * @param Passable Region
 * @type number
 * @default 1
 * @desc The region ID through which the tool can always move into from an adjacent tile
 * 
 * @param Image Settings
 *
 * @param Image
 * @parent Image Settings
 * @type file
 * @dir img
 * @desc The image of the hookshot
 *
 * @param Frame Width
 * @parent Image Settings
 * @type number
 * @default 48
 * @min 1
 * @desc The width of one frame of the hookshot image
 *
 * @param Animation Speed
 * @parent Image Settings
 * @type number
 * @default 15
 * @min 0
 * @desc The amount of frames before switching animation frames
 *
 * @param Rope Horizontal
 * @parent Image Settings
 * @type file
 * @dir img
 * @desc The horizontal rope image (for left/right)
 *
 * @param Rope Vertical
 * @parent Image Settings
 * @type file
 * @dir img
 * @desc The vertical rope image (for up/down)
 *
 * @param Rope Left Offset
 * @parent Image Settings
 * @type struct<Point>
 * @default {"x":"0","y":"0"}
 * @desc x/y offset when facing left for the rope
 *
 * @param Rope Right Offset
 * @parent Image Settings
 * @type struct<Point>
 * @default {"x":"0","y":"0"}
 * @desc x/y offset when facing right for the rope
 *
 * @param Rope Up Offset
 * @parent Image Settings
 * @type struct<Point>
 * @default {"x":"0","y":"0"}
 * @desc x/y offset when facing up for the rope
 *
 * @param Rope Down Offset
 * @parent Image Settings
 * @type struct<Point>
 * @default {"x":"0","y":"0"}
 * @desc x/y offset when facing down for the rope
 *
 * @param Sound Effect Options
 *
 * @param Collide SE
 * @parent Sound Effect Options
 * @type struct<SE>
 * @desc Sound Effect to play when the hookshot collides with something
 * 
 * @param Stun Settings
 *
 * @param Stun Steps
 * @parent Stun Settings
 * @type number
 * @default 0
 * @min 0
 * @desc Amount of steps to stun [CGMZ] Event Movement events for when interacting with them
*/
/*~struct~InteractTool:
 * @param Properties
 * @type struct<CommonToolProperties>
 * @default {"Name":"","Symbol":"","Icon":"0","Item Options":"","Item":"0","Consumable":"false","Sound Effect Options":"","Use SE":"","Integrations":"","On Use Rumble":"","On Interact Rumble":""}
 * @description Set up common tool properties here.
 * 
 * @param Switches
 * @type select[]
 * @option A
 * @option B
 * @option C
 * @option D
 * @default []
 * @desc The self switches of events to turn ON when used next to an event
 * 
 * @param Animation
 * @type animation
 * @default 0
 * @desc Animation ID to play when using the tool
 * 
 * @param Always Show Animation
 * @type boolean
 * @default false
 * @desc True = show the animation on the player if no event detected. False = Only show animation on event interaction
*/
/*~struct~LanternTool:
 * @param Properties
 * @type struct<CommonToolProperties>
 * @default {"Name":"","Symbol":"","Icon":"0","Item Options":"","Item":"0","Consumable":"false","Sound Effect Options":"","Use SE":"","Integrations":"","On Use Rumble":"","On Interact Rumble":""}
 * @description Set up common tool properties here.
 * 
 * @param Switches
 * @type select[]
 * @option A
 * @option B
 * @option C
 * @option D
 * @default []
 * @desc The self switches of events to turn ON when nearby an event
 * 
 * @param Range
 * @type number
 * @min 1
 * @default 3
 * @desc The amount of tiles in a circle around the player to affect
 * 
 * @param Light Effect
 * @desc [CGMZ] Light Effects id to show on the player when this tool is equipped (Requires [CGMZ] Light Effects)
*/
/*~struct~SE:
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
/*~struct~Point:
 * @param x
 * @type number
 * @min -9999
 * @default 0
 * @desc The X amount
 *
 * @param y
 * @type number
 * @min -9999
 * @default 0
 * @desc The Y amount
*/
Imported.CGMZ_DungeonTools = true;
CGMZ.Versions["Dungeon Tools"] = "Alpha R10";
CGMZ.DungeonTools = {};
CGMZ.DungeonTools.parameters = PluginManager.parameters('CGMZ_DungeonTools');
CGMZ.DungeonTools.ResetTools = CGMZ_Utils.parseJSON(CGMZ.DungeonTools.parameters["Reset Tools"], [], "[CGMZ] Dungeon Tools", "Your Reset Tools parameter was set up incorrectly and could not be read.");
CGMZ.DungeonTools.ArrowTools = CGMZ_Utils.parseJSON(CGMZ.DungeonTools.parameters["Arrow Tools"], [], "[CGMZ] Dungeon Tools", "Your Arrow Tools parameter was set up incorrectly and could not be read.");
CGMZ.DungeonTools.BombTools = CGMZ_Utils.parseJSON(CGMZ.DungeonTools.parameters["Bomb Tools"], [], "[CGMZ] Dungeon Tools", "Your Bomb Tools parameter was set up incorrectly and could not be read.");
CGMZ.DungeonTools.BoomerangTools = CGMZ_Utils.parseJSON(CGMZ.DungeonTools.parameters["Boomerang Tools"], [], "[CGMZ] Dungeon Tools", "Your Boomerang Tools parameter was set up incorrectly and could not be read.");
CGMZ.DungeonTools.HookshotTools = CGMZ_Utils.parseJSON(CGMZ.DungeonTools.parameters["Hookshot Tools"], [], "[CGMZ] Dungeon Tools", "Your Hookshot Tools parameter was set up incorrectly and could not be read.");
CGMZ.DungeonTools.InteractTools = CGMZ_Utils.parseJSON(CGMZ.DungeonTools.parameters["Interact Tools"], [], "[CGMZ] Dungeon Tools", "Your Interact Tools parameter was set up incorrectly and could not be read.");
CGMZ.DungeonTools.LanternTools = CGMZ_Utils.parseJSON(CGMZ.DungeonTools.parameters["Lantern Tools"], [], "[CGMZ] Dungeon Tools", "Your Lantern Tools parameter was set up incorrectly and could not be read.");
CGMZ.DungeonTools.SceneBackground = CGMZ.DungeonTools.parameters["Scene Background"];
CGMZ.DungeonTools.EquippedText = CGMZ.DungeonTools.parameters["Equipped Text"];
CGMZ.DungeonTools.ToolKey = CGMZ.DungeonTools.parameters["Tool Key"];
CGMZ.DungeonTools.ToolSelectKey = CGMZ.DungeonTools.parameters["Tool Select Key"];
CGMZ.DungeonTools.ToolCycleKey = CGMZ.DungeonTools.parameters["Cycle Tool Key"];
CGMZ.DungeonTools.BoomerangPretext = CGMZ.DungeonTools.parameters["Boomerang Message Pretext"];
CGMZ.DungeonTools.BoomerangPosttext = CGMZ.DungeonTools.parameters["Boomerang Message Posttext"];
CGMZ.DungeonTools.ControlsWindow = CGMZ.DungeonTools.parameters["Controls Window"];
CGMZ.DungeonTools.EquippedWindowBackground = CGMZ.DungeonTools.parameters["Current Tool Window Background"];
CGMZ.DungeonTools.SelectWindowBackground = CGMZ.DungeonTools.parameters["Tool Select Window Background"];
CGMZ.DungeonTools.EquippedWindowSettings = CGMZ.DungeonTools.parameters["Current Tool Window Settings"];
CGMZ.DungeonTools.SelectWindowSettings = CGMZ.DungeonTools.parameters["Tool Select Window Settings"];
CGMZ.DungeonTools.ToolGamepad = Number(CGMZ.DungeonTools.parameters["Tool Gamepad"]);
CGMZ.DungeonTools.ToolSelectGamepad = Number(CGMZ.DungeonTools.parameters["Tool Select Gamepad"]);
CGMZ.DungeonTools.ToolCycleGamepad = Number(CGMZ.DungeonTools.parameters["Cycle Tool Gamepad"]);
CGMZ.DungeonTools.UseToolButtonOffset = Number(CGMZ.DungeonTools.parameters["Use Tool Button Offset"]);
CGMZ.DungeonTools.UseToolButtonWidth = Number(CGMZ.DungeonTools.parameters["Use Tool Button Width"]);
CGMZ.DungeonTools.SelectToolButtonOffset = Number(CGMZ.DungeonTools.parameters["Select Tool Button Offset"]);
CGMZ.DungeonTools.SelectToolButtonWidth = Number(CGMZ.DungeonTools.parameters["Select Tool Button Width"]);
CGMZ.DungeonTools.CycleToolButtonOffset = Number(CGMZ.DungeonTools.parameters["Cycle Tool Button Offset"]);
CGMZ.DungeonTools.CycleToolButtonWidth = Number(CGMZ.DungeonTools.parameters["Cycle Tool Button Width"]);
CGMZ.DungeonTools.MaxToolSelectLines = Number(CGMZ.DungeonTools.parameters["Max Tool Select Lines"]);
CGMZ.DungeonTools.ToolAccessSwitch = Number(CGMZ.DungeonTools.parameters["Tool Access Switch"]);
CGMZ.DungeonTools.HookshotConnectOffset = parseFloat(CGMZ.DungeonTools.parameters["Hookshot Connect Offset"]);
CGMZ.DungeonTools.ShowBoomerangMessage = (CGMZ.DungeonTools.parameters["Show Boomerang Message"] === "true");
CGMZ.DungeonTools.DisableSceneWithTools = (CGMZ.DungeonTools.parameters["Disable Scene With Tools"] === "true");
CGMZ.DungeonTools.EnableUseButton = (CGMZ.DungeonTools.parameters["Enable Use Button"] === "true");
CGMZ.DungeonTools.EnableSelectButton = (CGMZ.DungeonTools.parameters["Enable Select Button"] === "true");
CGMZ.DungeonTools.EnableCycleButton = (CGMZ.DungeonTools.parameters["Enable Cycle Button"] === "true");
//=============================================================================
// CGMZ_DungeonTool
//-----------------------------------------------------------------------------
// Data class used to store common dungeon tool properties
//=============================================================================
function CGMZ_DungeonTool() {
    this.initialize(...arguments);
}
CGMZ_DungeonTool.prototype.constructor = CGMZ_DungeonTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DungeonTool.prototype.initialize = function(properties) {
	this._isDiscovered = false;
	this._isEnabled = true;
	this._useCount = 0;
	this._symbol = properties.Symbol;
	this._name = properties.Name;
	this._icon = Number(properties.Icon);
	this._item = Number(properties.Item);
	this._consumable = (properties.Consumable === 'true');
	if(properties["Use SE"]) this._se = CGMZ_Utils.parseSoundEffectJSON(properties["Use SE"], "[CGMZ] Dungeon Tools");
	this._onUseRumble = (properties["On Use Rumble"]) ? CGMZ_Utils.parseRumbleJSON(properties["On Use Rumble"], "[CGMZ] Dungeon Tools") : null;
	this._onInteractRumble = (properties["On Interact Rumble"]) ? CGMZ_Utils.parseRumbleJSON(properties["On Interact Rumble"], "[CGMZ] Dungeon Tools") : null;
};
//-----------------------------------------------------------------------------
// Discover tool
//-----------------------------------------------------------------------------
CGMZ_DungeonTool.prototype.discover = function() {
	this._isDiscovered = true;
};
//-----------------------------------------------------------------------------
// Forget tool
//-----------------------------------------------------------------------------
CGMZ_DungeonTool.prototype.forget = function() {
	this._isDiscovered = false;
};
//-----------------------------------------------------------------------------
// Change enable status
//-----------------------------------------------------------------------------
CGMZ_DungeonTool.prototype.changeEnableStatus = function(enable) {
	this._isEnabled = enable;
};
//-----------------------------------------------------------------------------
// Check if tool can be used
//-----------------------------------------------------------------------------
CGMZ_DungeonTool.prototype.canUse = function() {
	if(this._item) {
		const item = $dataItems[this._item];
		return $gameParty.hasItem(item, false);
	}
	return true;
};
//-----------------------------------------------------------------------------
// Use tool
//-----------------------------------------------------------------------------
CGMZ_DungeonTool.prototype.use = function() {
	this._useCount++;
	if(this._se) AudioManager.playSe(this._se);
	if(this._item && this._consumable) {
		const item = $dataItems[this._item];
		$gameParty.loseItem(item, 1, false);
	}
	if(Imported.CGMZ_Rumble && this._onUseRumble) {
		$cgmzTemp.startRumble(this._onUseRumble);
	}
};
//-----------------------------------------------------------------------------
// When the tool is unequipped
//-----------------------------------------------------------------------------
CGMZ_DungeonTool.prototype.unequip = function() {
	//
};
//-----------------------------------------------------------------------------
// When the tool is equipped
//-----------------------------------------------------------------------------
CGMZ_DungeonTool.prototype.equip = function() {
	//
};
//=============================================================================
// CGMZ_DT_ResetTool
//-----------------------------------------------------------------------------
// Data class used to store reset tool properties
//=============================================================================
function CGMZ_DT_ResetTool() {
    this.initialize(...arguments);
}
CGMZ_DT_ResetTool.prototype = Object.create(CGMZ_DungeonTool.prototype);
CGMZ_DT_ResetTool.prototype.constructor = CGMZ_DT_ResetTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DT_ResetTool.prototype.initialize = function(properties, commonProperties) {
	CGMZ_DungeonTool.prototype.initialize.call(this, commonProperties);
	this._switches = CGMZ_Utils.parseJSON(properties.Switches, [], "[CGMZ] Dungeon Tools", `Your reset tool with name '${this._name}' had its Switches parameter set up incorrectly and could not be read.`);
	this._type = "reset";
};
//-----------------------------------------------------------------------------
// Use
//-----------------------------------------------------------------------------
CGMZ_DT_ResetTool.prototype.use = function() {
	CGMZ_DungeonTool.prototype.use.call(this);
	$gameMap.CGMZ_resetMap();
};
//=============================================================================
// CGMZ_DT_ArrowTool
//-----------------------------------------------------------------------------
// Data class used to store arrow tool properties
//=============================================================================
function CGMZ_DT_ArrowTool() {
    this.initialize(...arguments);
}
CGMZ_DT_ArrowTool.prototype = Object.create(CGMZ_DungeonTool.prototype);
CGMZ_DT_ArrowTool.prototype.constructor = CGMZ_DT_ArrowTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DT_ArrowTool.prototype.initialize = function(properties, commonProperties) {
	CGMZ_DungeonTool.prototype.initialize.call(this, commonProperties);
	this._switches = CGMZ_Utils.parseJSON(properties.Switches, [], "[CGMZ] Dungeon Tools", `Your arrow tool with name '${this._name}' had its Switches parameter set up incorrectly and could not be read.`);
	this._range = Number(properties.Range);
	this._speed = Number(properties.Speed);
	this._passableRegionId = Number(properties["Passable Region"]);
	this._stunSteps = Number(properties["Stun Steps"]);
	this._type = "arrow";
	if(properties["Collide SE"]) this._collideSe = CGMZ_Utils.parseSoundEffectJSON(properties["Collide SE"], "CGMZ Dungeon Tools");
	this._animationSpeed = Number(properties["Animation Speed"]);
	this._imageData = CGMZ_Utils.getImageData(properties["Image"], "img");
	this._frameInfo = {frameWidth: Number(properties["Frame Width"])};
	const bitmap = ImageManager.loadBitmap(this._imageData.folder, this._imageData.filename);
	bitmap.addLoadListener(this.initImageProperties.bind(this, bitmap));
};
//-----------------------------------------------------------------------------
// Initialize image properties
//-----------------------------------------------------------------------------
CGMZ_DT_ArrowTool.prototype.initImageProperties = function(bitmap) {
	this._frameInfo.frameHeight = bitmap.height / 4;
	this._frameInfo.maxFrames = Number(bitmap.width / this._frameInfo.frameWidth);
};
//=============================================================================
// CGMZ_DT_BombTool
//-----------------------------------------------------------------------------
// Data class used to store bomb tool properties
//=============================================================================
function CGMZ_DT_BombTool() {
    this.initialize(...arguments);
}
CGMZ_DT_BombTool.prototype = Object.create(CGMZ_DungeonTool.prototype);
CGMZ_DT_BombTool.prototype.constructor = CGMZ_DT_BombTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DT_BombTool.prototype.initialize = function(properties, commonProperties) {
	CGMZ_DungeonTool.prototype.initialize.call(this, commonProperties);
	this._type = "bomb";
	this._switches = CGMZ_Utils.parseJSON(properties.Switches, [], "[CGMZ] Dungeon Tools", `Your bomb tool with name '${this._name}' had its Switches parameter set up incorrectly and could not be read.`);
	this._steps = Number(properties.Steps);
	this._animationSpeed = Number(properties["Animation Speed"]);
	this._explosionAnimationSpeed = Number(properties["Explosion Animation Speed"]);
	if(properties["Explode SE"]) this._explodeSe = CGMZ_Utils.parseSoundEffectJSON(properties["Explode SE"], "CGMZ Dungeon Tools");
	this._imageData = CGMZ_Utils.getImageData(properties["Image"], "img");
	this._frameInfo = {frameWidth: Number(properties["Frame Width"])};
	const bitmap = ImageManager.loadBitmap(this._imageData.folder, this._imageData.filename);
	bitmap.addLoadListener(this.initImageProperties.bind(this, bitmap));
	this._explosionImageData = CGMZ_Utils.getImageData(properties["Explosion Image"], "img");
	this._explosionFrameInfo = {frameWidth: Number(properties["Explosion Frame Width"])};
	const bitmap2 = ImageManager.loadBitmap(this._explosionImageData.folder, this._explosionImageData.filename);
	bitmap2.addLoadListener(this.initExplosionImageProperties.bind(this, bitmap2));
};
//-----------------------------------------------------------------------------
// Initialize image properties
//-----------------------------------------------------------------------------
CGMZ_DT_BombTool.prototype.initImageProperties = function(bitmap) {
	this._frameInfo.frameHeight = bitmap.height;
	this._frameInfo.maxFrames = Number(bitmap.width / this._frameInfo.frameWidth);
};
//-----------------------------------------------------------------------------
// Initialize explosion image properties
//-----------------------------------------------------------------------------
CGMZ_DT_BombTool.prototype.initExplosionImageProperties = function(bitmap) {
	this._explosionFrameInfo.frameHeight = bitmap.height;
};
//=============================================================================
// CGMZ_DT_BoomerangTool
//-----------------------------------------------------------------------------
// Data class used to store boomerang tool properties
//=============================================================================
function CGMZ_DT_BoomerangTool() {
    this.initialize(...arguments);
}
CGMZ_DT_BoomerangTool.prototype = Object.create(CGMZ_DungeonTool.prototype);
CGMZ_DT_BoomerangTool.prototype.constructor = CGMZ_DT_BoomerangTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DT_BoomerangTool.prototype.initialize = function(properties, commonProperties) {
	CGMZ_DungeonTool.prototype.initialize.call(this, commonProperties);
	this._range = Number(properties.Range);
	this._type = "boomerang";
	this._rewards = [];
	this._switches = CGMZ_Utils.parseJSON(properties.Switches, [], "[CGMZ] Dungeon Tools", `Your boomerang tool with name '${this._name}' had its Switches parameter set up incorrectly and could not be read.`);
	this._speed = Number(properties.Speed);
	this._passableRegionId = Number(properties["Passable Region"]);
	this._stunSteps = Number(properties["Stun Steps"]);
	this._animationSpeed = Number(properties["Animation Speed"]);
	this._imageData = CGMZ_Utils.getImageData(properties["Image"], "img");
	this._frameInfo = {frameWidth: Number(properties["Frame Width"])};
	if(properties["Collide SE"]) this._collideSe = CGMZ_Utils.parseSoundEffectJSON(properties["Collide SE"], "CGMZ Dungeon Tools");
	const bitmap = ImageManager.loadBitmap(this._imageData.folder, this._imageData.filename);
	bitmap.addLoadListener(this.initImageProperties.bind(this, bitmap));
};
//-----------------------------------------------------------------------------
// Initialize image properties
//-----------------------------------------------------------------------------
CGMZ_DT_BoomerangTool.prototype.initImageProperties = function(bitmap) {
	this._frameInfo.frameHeight = bitmap.height / 4;
	this._frameInfo.maxFrames = Number(bitmap.width / this._frameInfo.frameWidth);
};
//-----------------------------------------------------------------------------
// Add rewards
//-----------------------------------------------------------------------------
CGMZ_DT_BoomerangTool.prototype.addRewards = function(rewards) {
	this._rewards = rewards;
};
//-----------------------------------------------------------------------------
// Process rewards
// Rewards in format: {type: [item|weapon|armor|gold], amount: x, id: y}
//-----------------------------------------------------------------------------
CGMZ_DT_BoomerangTool.prototype.processAllRewards = function() {
	while(this._rewards.length > 0) {
		const reward = this._rewards.pop();
		switch(reward.type) {
			case 'item':
			case 'weapon':
			case 'armor':
				const item = CGMZ_Utils.lookupItem(reward.type, Number(reward.id));
				$gameParty.gainItem(item, Number(reward.amount), false);
				if(CGMZ.DungeonTools.ShowBoomerangMessage) {
					const text = (reward.text) ? reward.text : CGMZ.DungeonTools.BoomerangPretext + reward.amount + " " + item.name + CGMZ.DungeonTools.BoomerangPosttext;
					$gameMessage.newPage();
					$gameMessage.add(text);
				}
				break;
			case 'gold':
				$gameParty.gainGold(Number(reward.amount));
				if(CGMZ.DungeonTools.ShowBoomerangMessage) {
					const text = (reward.text) ? reward.text : CGMZ.DungeonTools.BoomerangPretext + reward.amount + TextManager.currencyUnit + CGMZ.DungeonTools.BoomerangPosttext;
					$gameMessage.newPage();
					$gameMessage.add(text);
				}
		}
	}
};
//=============================================================================
// CGMZ_DT_HookshotTool
//-----------------------------------------------------------------------------
// Data class used to store hookshot tool properties
//=============================================================================
function CGMZ_DT_HookshotTool() {
    this.initialize(...arguments);
}
CGMZ_DT_HookshotTool.prototype = Object.create(CGMZ_DungeonTool.prototype);
CGMZ_DT_HookshotTool.prototype.constructor = CGMZ_DT_HookshotTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DT_HookshotTool.prototype.initialize = function(properties, commonProperties) {
	CGMZ_DungeonTool.prototype.initialize.call(this, commonProperties);
	this._type = "hookshot";
	this._range = Number(properties.Range);
	this._speed = Number(properties.Speed);
	this._gatherSpeed = Number(properties["Gather Speed"]);
	this._jumpGather = (properties["Jump Gather"] === 'true');
	this._passableRegionId = Number(properties["Passable Region"]);
	this._stunSteps = Number(properties["Stun Steps"]);
	this._animationSpeed = Number(properties["Animation Speed"]);
	if(properties["Collide SE"]) this._collideSe = CGMZ_Utils.parseSoundEffectJSON(properties["Collide SE"], "CGMZ Dungeon Tools");
	this._imageData = CGMZ_Utils.getImageData(properties["Image"], "img");
	this._frameInfo = {frameWidth: Number(properties["Frame Width"])};
	const bitmap = ImageManager.loadBitmap(this._imageData.folder, this._imageData.filename);
	bitmap.addLoadListener(this.initImageProperties.bind(this, bitmap));
	this._ropeVertical = CGMZ_Utils.getImageData(properties["Rope Vertical"], "img");
	this._ropeHorizontal = CGMZ_Utils.getImageData(properties["Rope Horizontal"], "img");
	this._ropeOffsets = {
		"left": this.parseOffset(properties["Rope Left Offset"]),
		"right": this.parseOffset(properties["Rope Right Offset"]),
		"down": this.parseOffset(properties["Rope Down Offset"]),
		"up": this.parseOffset(properties["Rope Up Offset"]),
	}
};
//-----------------------------------------------------------------------------
// Initialize image properties
//-----------------------------------------------------------------------------
CGMZ_DT_HookshotTool.prototype.parseOffset = function(offsetJSON) {
	const defaultOffset = {x: 0, y: 0};
	const parsed = CGMZ_Utils.parseJSON(offsetJSON, defaultOffset, "[CGMZ] Dungeon Tools", `Hookshot with id ${this._name} had rope offsets with invalid JSON and they could not be read.`);
	return {x: Number(parsed.x), y: Number(parsed.y)};
};
//-----------------------------------------------------------------------------
// Initialize image properties
//-----------------------------------------------------------------------------
CGMZ_DT_HookshotTool.prototype.initImageProperties = function(bitmap) {
	this._frameInfo.frameHeight = bitmap.height / 4;
	this._frameInfo.maxFrames = Number(bitmap.width / this._frameInfo.frameWidth);
};
//=============================================================================
// CGMZ_DT_InteractTool
//-----------------------------------------------------------------------------
// Data class used to store interaction tool properties
//=============================================================================
function CGMZ_DT_InteractTool() {
    this.initialize(...arguments);
}
CGMZ_DT_InteractTool.prototype = Object.create(CGMZ_DungeonTool.prototype);
CGMZ_DT_InteractTool.prototype.constructor = CGMZ_DT_InteractTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DT_InteractTool.prototype.initialize = function(properties, commonProperties) {
	CGMZ_DungeonTool.prototype.initialize.call(this, commonProperties);
	this._switches = CGMZ_Utils.parseJSON(properties.Switches, [], "[CGMZ] Dungeon Tools", `Your interact tool with name '${this._name}' had its Switches parameter set up incorrectly and could not be read.`);
	this._animation = Number(properties.Animation);
	this._alwaysShowAnimation = (properties["Always Show Animation"] === 'true');
	this._type = "interact";
};
//=============================================================================
// CGMZ_DT_LanternTool
//-----------------------------------------------------------------------------
// Data class used to store lantern tool properties
//=============================================================================
function CGMZ_DT_LanternTool() {
    this.initialize(...arguments);
}
CGMZ_DT_LanternTool.prototype = Object.create(CGMZ_DungeonTool.prototype);
CGMZ_DT_LanternTool.prototype.constructor = CGMZ_DT_LanternTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DT_LanternTool.prototype.initialize = function(properties, commonProperties) {
	CGMZ_DungeonTool.prototype.initialize.call(this, commonProperties);
	this._switches = CGMZ_Utils.parseJSON(properties.Switches, [], "[CGMZ] Dungeon Tools", `Your lantern tool with name '${this._name}' had its Switches parameter set up incorrectly and could not be read.`);
	this._lightId = properties["Light Effect"];
	this._range = Number(properties.Range);
	this._type = "lantern";
	this._inUse = false;
};
//-----------------------------------------------------------------------------
// When the tool is used
//-----------------------------------------------------------------------------
CGMZ_DT_LanternTool.prototype.use = function() {
	CGMZ_DungeonTool.prototype.use.call(this);
	this._inUse = !this._inUse;
	if(this._inUse) {
		if(Imported.CGMZ_LightEffects && this._lightId) $gamePlayer.CGMZ_setLightEffect(this._lightId);
		$gamePlayer.CGMZ_setLanternIllumination(this._range);
		$gameMap.CGMZ_refreshEventsForLantern(this._symbol);
	} else {
		if(Imported.CGMZ_LightEffects && this._lightId) $gamePlayer.CGMZ_clearLightEffect();
		$gamePlayer.CGMZ_setLanternIllumination(0);
		$gameMap.CGMZ_clearLanternEffectOnEvents(this._symbol);
	}
};
//-----------------------------------------------------------------------------
// When the tool is unequipped
//-----------------------------------------------------------------------------
CGMZ_DT_LanternTool.prototype.unequip = function() {
	CGMZ_DungeonTool.prototype.unequip.call(this);
	this._inUse = false;
	$cgmzTemp.stopUsingDungeonTool();
	$gamePlayer.CGMZ_clearLightEffect();
	$gamePlayer.CGMZ_setLanternIllumination(0);
	$gameMap.CGMZ_clearLanternEffectOnEvents(this._symbol);
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Add dungeon tool data to save data
//=============================================================================
//-----------------------------------------------------------------------------
// Method used by CGMZ for creating plugin data
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_DungeonTools_createPluginData.call(this);
	this.initializeDungeonTools();
};
//-----------------------------------------------------------------------------
// Load new dungeon tools with saved game
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_DungeonTools_onAfterLoad.call(this);
	this.initializeDungeonTools();
};
//-----------------------------------------------------------------------------
// Initialize dungeon tools
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeDungeonTools = function(reinitialize = false) {
	if(!this._dungeonTools || reinitialize) {
		this._dungeonTools = {};
		this._currentDungeonTool = "";
	}
	this.createDungeonTools(CGMZ.DungeonTools.ResetTools, "Reset", CGMZ_DT_ResetTool);
	this.createDungeonTools(CGMZ.DungeonTools.ArrowTools, "Arrow", CGMZ_DT_ArrowTool);
	this.createDungeonTools(CGMZ.DungeonTools.BombTools, "Bomb", CGMZ_DT_BombTool);
	this.createDungeonTools(CGMZ.DungeonTools.BoomerangTools, "Boomerang", CGMZ_DT_BoomerangTool);
	this.createDungeonTools(CGMZ.DungeonTools.HookshotTools, "Hookshot", CGMZ_DT_HookshotTool);
	this.createDungeonTools(CGMZ.DungeonTools.InteractTools, "Interact", CGMZ_DT_InteractTool);
	this.createDungeonTools(CGMZ.DungeonTools.LanternTools, "Lantern", CGMZ_DT_LanternTool);
};
//-----------------------------------------------------------------------------
// Create tools, generic function which handles all tool types
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.createDungeonTools = function(param, errorType, toolClass) {
	for(const toolJSON of param) {
		const tool = CGMZ_Utils.parseJSON(toolJSON, null, "[CGMZ] Dungeon Tools", `One of your ${errorType} tools was set up incorrectly and could not be read.`);
		if(!tool) continue;
		const toolProperties = CGMZ_Utils.parseJSON(tool.Properties, null, "[CGMZ] Dungeon Tools", `One of your ${errorType} tools was set up incorrectly and could not be read.`);
		if(!toolProperties) continue;
		if(this._dungeonTools.hasOwnProperty(toolProperties.Symbol)) continue;
		this._dungeonTools[toolProperties.Symbol] = new toolClass(tool, toolProperties);
	}
};
//-----------------------------------------------------------------------------
// Modify a dungeon tool
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.modifyDungeonTool = function(symbol, newTool) {
	this._dungeonTools[symbol] = newTool;
};
//-----------------------------------------------------------------------------
// Handles changing a dungeon tool, including unequipping old tool and equipping new tool
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.equipDungeonTool = function(symbol) {
	let tool = this.getDungeonTool(this._currentDungeonTool);
	tool?.unequip();
	this._currentDungeonTool = symbol;
	tool = this.getDungeonTool(this._currentDungeonTool);
	tool?.equip();
};
//-----------------------------------------------------------------------------
// Returns the dungeon tool with matching symbol
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getDungeonTool = function(symbol) {
	return this._dungeonTools[symbol];
};
//-----------------------------------------------------------------------------
// Returns the symbols of all dungeon tools
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllDungeonTools = function() {
	return Object.keys(this._dungeonTools);
};
//-----------------------------------------------------------------------------
// Returns the symbols of all discovered dungeon tools
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getDiscoveredDungeonTools = function() {
	return this.getAllDungeonTools().filter(symbol => this._dungeonTools[symbol]._isDiscovered);
};
//-----------------------------------------------------------------------------
// Cycles the dungeon tool to the next available dungeon tool
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.cycleDungeonTool = function() {
	let firstDiscoveredTool = null;
	let switchToNextTool = false;
	for(const toolSymbol of this.getAllDungeonTools()) {
		const tool = this.getDungeonTool(toolSymbol);
		if(!(tool._isDiscovered && tool._isEnabled)) continue;
		if(!firstDiscoveredTool) firstDiscoveredTool = toolSymbol;
		if(switchToNextTool) {
			this.equipDungeonTool(toolSymbol);
			return;
		}
		if(this._currentDungeonTool === toolSymbol) switchToNextTool = true;
	}
	if(firstDiscoveredTool) this.equipDungeonTool(firstDiscoveredTool);
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Handle dungeon tool plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_DungeonTools_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Call Scene", this.pluginCommandDungeonToolsCallScene);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Discover Tool", this.pluginCommandDungeonToolsDiscoverTool);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Remove Tool", this.pluginCommandDungeonToolsRemoveTool);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Equip Tool", this.pluginCommandDungeonToolsEquipTool);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Use Tool", this.pluginCommandDungeonToolsUseTool);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Change Tool Enable", this.pluginCommandDungeonToolsChangeToolEnable);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Modify Reset", this.pluginCommandDungeonToolsModifyReset);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Modify Arrow", this.pluginCommandDungeonToolsModifyArrow);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Modify Bomb", this.pluginCommandDungeonToolsModifyBomb);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Modify Boomerang", this.pluginCommandDungeonToolsModifyBoomerang);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Modify Hookshot", this.pluginCommandDungeonToolsModifyHookshot);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Modify Interact", this.pluginCommandDungeonToolsModifyInteract);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Modify Lantern", this.pluginCommandDungeonToolsModifyLantern);
};
//-----------------------------------------------------------------------------
// Plugin Command - Call Dungeon Tool Select Scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsCallScene = function(args) {
	const hasAccess = !CGMZ.DungeonTools.ToolAccessSwitch || $gameSwitches.value(CGMZ.DungeonTools.ToolAccessSwitch);
	if((!CGMZ.DungeonTools.DisableSceneWithTools || args["Ignore Disabled"] === 'true') || hasAccess) SceneManager.push(CGMZ_Scene_DungeonTool);
};
//-----------------------------------------------------------------------------
// Plugin Command - Discover a dungeon tool
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsDiscoverTool = function(args) {
	const tool = $cgmz.getDungeonTool(args.Symbol);
	tool?.discover();
};
//-----------------------------------------------------------------------------
// Plugin Command - Remove/undiscover a dungeon tool
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsRemoveTool = function(args) {
	const tool = $cgmz.getDungeonTool(args.Symbol);
	tool?.forget();
};
//-----------------------------------------------------------------------------
// Plugin Command - Force equip a dungeon tool
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsEquipTool = function(args) {
	$cgmz.equipDungeonTool(args.Symbol);
};
//-----------------------------------------------------------------------------
// Plugin Command - Force equip a dungeon tool
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsUseTool = function() {
	const tool = $cgmz.getDungeonTool($cgmz._currentDungeonTool);
	if(tool) $cgmzTemp.startUsingDungeonTool(tool);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change tool enable status
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsChangeToolEnable = function(args) {
	const enable = (args.Enable === 'true');
	const unequip = (args.Unequip === 'true');
	const tool = $cgmz.getDungeonTool(args.Symbol);
	if(!tool) return;
	tool.changeEnableStatus(enable);
	if($cgmz._currentDungeonTool === tool._symbol && unequip) {
		$cgmz.equipDungeonTool("");
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Change a reset tool's properties
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsModifyReset = function(args) {
	$cgmzTemp.handleModifyDungeonToolCommand(args, "Modify Reset", "reset", CGMZ_DT_ResetTool);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change an arrow tool's properties
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsModifyArrow = function(args) {
	$cgmzTemp.handleModifyDungeonToolCommand(args, "Modify Arrow", "arrow", CGMZ_DT_ArrowTool);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change a bomb tool's properties
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsModifyBomb = function(args) {
	$cgmzTemp.handleModifyDungeonToolCommand(args, "Modify Bomb", "bomb", CGMZ_DT_BombTool);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change a boomerang tool's properties
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsModifyBoomerang = function(args) {
	$cgmzTemp.handleModifyDungeonToolCommand(args, "Modify Boomerang", "boomerang", CGMZ_DT_BoomerangTool);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change a hookshot tool's properties
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsModifyHookshot = function(args) {
	$cgmzTemp.handleModifyDungeonToolCommand(args, "Modify Hookshot", "hookshot", CGMZ_DT_HookshotTool);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change an interact tool's properties
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsModifyInteract = function(args) {
	$cgmzTemp.handleModifyDungeonToolCommand(args, "Modify Interact", "interact", CGMZ_DT_InteractTool);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change a lantern tool's properties
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsModifyLantern = function(args) {
	$cgmzTemp.handleModifyDungeonToolCommand(args, "Modify Lantern", "lantern", CGMZ_DT_LanternTool);
};
//-----------------------------------------------------------------------------
// Generic handler for modify plugin commands
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.handleModifyDungeonToolCommand = function(args, errorType, type, toolClass) {
	const newToolObj = CGMZ_Utils.parseJSON(args.Properties, null, "[CGMZ] Dungeon Tools", `Your ${errorType} plugin command had invalid parameters and could not be read.`);
	if(!newToolObj) return;
	const newToolProperties = CGMZ_Utils.parseJSON(newToolObj.Properties, null, "[CGMZ] Dungeon Tools", `Your ${errorType} plugin command had invalid parameters and could not be read.`);
	if(!newToolProperties) return;
	const tool = $cgmz.getDungeonTool(newToolProperties.Symbol);
	if(tool?._type !== type) return;
	const newTool = new toolClass(newToolObj, newToolProperties);
	newTool._useCount = tool._useCount;
	newTool._isDiscovered = tool._isDiscovered;
	$cgmz.modifyDungeonTool(newTool._symbol, newTool);
};
//-----------------------------------------------------------------------------
// Initialize dungeon tool variables
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_CGMZ_Temp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_DungeonTools_CGMZ_Temp_createPluginData.call(this);
	this._dungeonToolInUse = null;
	this._bombToolInUse = null;
	this._gamepadDungeonToolUsePressed = false;
	this._gamepadDungeonToolUseIndex = -1;
	this._gamepadDungeonToolCyclePressed = false;
	this._gamepadDungeonToolCycleIndex = -1;
};
//-----------------------------------------------------------------------------
// Set a tool to be in use
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.startUsingDungeonTool = function(tool) {
	if(this.canUseDungeonTool(tool)) {
		tool.use();
		(tool._type === "bomb") ? this._bombToolInUse = tool : this._dungeonToolInUse = tool;
		$gameMap.CGMZ_useDungeonTool(tool);
	}
};
//-----------------------------------------------------------------------------
// Start bomb explosion
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.startBombExplosion = function(tool, explodeLocation) {
	const imageData = tool._explosionImageData;
	const x = explodeLocation.x;
	const y = explodeLocation.y;
	const frameWidth = tool._explosionFrameInfo.frameWidth;
	const frameHeight = tool._explosionFrameInfo.frameHeight;
	const animationSpeed = tool._explosionAnimationSpeed;
	$cgmzTemp.requestMapAnimation(imageData, x, y, frameWidth, frameHeight, animationSpeed);
	this.stopUsingBombTool();
};
//-----------------------------------------------------------------------------
// Set a tool to no longer be in use and clear any effects it had
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.stopUsingDungeonTool = function() {
	if(this._dungeonToolInUse && this._dungeonToolInUse._type === "boomerang") {
		this._dungeonToolInUse.processAllRewards();
	}
	this._dungeonToolInUse = null;
	$gameMap._cgmzDungeonToolRestrictMovement = false;
};
//-----------------------------------------------------------------------------
// Set the bomb tool to no longer be in use
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.stopUsingBombTool = function() {
	this._bombToolInUse = null;
};
//-----------------------------------------------------------------------------
// Check if can use the tool
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.canUseDungeonTool = function(tool) {
	if(CGMZ.DungeonTools.ToolAccessSwitch && !$gameSwitches.value(CGMZ.DungeonTools.ToolAccessSwitch)) return false;
	if(!tool.canUse()) return false;
	if(tool._type === "lantern") return true;
	if(tool._type === "bomb" && this._bombToolInUse) return false;
	if(tool._type !== "bomb" && this._dungeonToolInUse) return false;
	return true;
};
//-----------------------------------------------------------------------------
// Check for dungeon tool inputs
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_Temp_onKeyDown = CGMZ_Temp.prototype.onKeyDown;
CGMZ_Temp.prototype.onKeyDown = function(event) {
	alias_CGMZ_DungeonTools_Temp_onKeyDown.call(this, event);
	this.checkDungeonToolKeys(event.key);
};
//-----------------------------------------------------------------------------
// Handle dungeon tool key processing
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkDungeonToolKeys = function(key) {
	if(SceneManager._scene.constructor !== Scene_Map) return; // Not allowed to do dungeon tools outside of map scene
	const hasAccess = !CGMZ.DungeonTools.ToolAccessSwitch || $gameSwitches.value(CGMZ.DungeonTools.ToolAccessSwitch);
	if(key === CGMZ.DungeonTools.ToolSelectKey && (!CGMZ.DungeonTools.DisableSceneWithTools || hasAccess)) {
		SceneManager.push(CGMZ_Scene_DungeonTool);
	} else if(key === CGMZ.DungeonTools.ToolKey) {
		const tool = $cgmz.getDungeonTool($cgmz._currentDungeonTool);
		if(tool && tool._isEnabled) {
			this.startUsingDungeonTool(tool);
		}
	} else if(key === CGMZ.DungeonTools.ToolCycleKey) {
		$cgmz.cycleDungeonTool();
	}
};
//-----------------------------------------------------------------------------
// Check for dungeon tool gamepad inputs
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_Temp_updateLastGamepad = CGMZ_Temp.prototype.updateLastGamepad;
CGMZ_Temp.prototype.updateLastGamepad = function(gamepad) {
	alias_CGMZ_DungeonTools_Temp_updateLastGamepad.call(this, gamepad);
	this.updateDungeonToolsForGamepad(gamepad);
};
//-----------------------------------------------------------------------------
// Handle dungeon tool gamepad inputs
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.updateDungeonToolsForGamepad = function(gamepad) {
	if(SceneManager._scene.constructor !== Scene_Map) return; // Not allowed to do dungeon tools outside of map scene
	if(CGMZ.DungeonTools.ToolSelectGamepad >= 0 && gamepad.buttons[CGMZ.DungeonTools.ToolSelectGamepad].pressed) {
		const hasAccess = !CGMZ.DungeonTools.ToolAccessSwitch || $gameSwitches.value(CGMZ.DungeonTools.ToolAccessSwitch)
		if(!CGMZ.DungeonTools.DisableSceneWithTools || hasAccess) {
			SceneManager.push(CGMZ_Scene_DungeonTool);
		}
	}
	if(!this._gamepadDungeonToolUsePressed && CGMZ.DungeonTools.ToolGamepad >= 0 && gamepad.buttons[CGMZ.DungeonTools.ToolGamepad].pressed) {
		const tool = $cgmz.getDungeonTool($cgmz._currentDungeonTool);
		if(tool && tool._isEnabled) {
			this.startUsingDungeonTool(tool);
			this._gamepadDungeonToolUsePressed = true;
			this._gamepadDungeonToolUseIndex = gamepad.index;
		}
	}
	if(!this._gamepadDungeonToolCyclePressed && CGMZ.DungeonTools.ToolCycleGamepad >= 0 && gamepad.buttons[CGMZ.DungeonTools.ToolCycleGamepad].pressed) {
		this._gamepadDungeonToolCyclePressed = true;
		this._gamepadDungeonToolCycleIndex = gamepad.index;
		$cgmz.cycleDungeonTool();
	}
	if(this._gamepadDungeonToolUsePressed && gamepad.index === this._gamepadDungeonToolUseIndex && !gamepad.buttons[CGMZ.DungeonTools.ToolGamepad].pressed) {
		this._gamepadDungeonToolUsePressed = false;
	}
	if(this._gamepadDungeonToolCyclePressed && gamepad.index === this._gamepadDungeonToolCycleIndex && !gamepad.buttons[CGMZ.DungeonTools.ToolCycleGamepad].pressed) {
		this._gamepadDungeonToolCyclePressed = false;
	}
};
//-----------------------------------------------------------------------------
// Check for dungeon tool gamepad input release
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_Temp_updateGamepadRelease = CGMZ_Temp.prototype.updateGamepadRelease;
CGMZ_Temp.prototype.updateGamepadRelease = function(gamepad) {
	alias_CGMZ_DungeonTools_Temp_updateGamepadRelease.call(this, gamepad);
	if(this._gamepadDungeonToolUsePressed) {
		if(gamepad.index === this._gamepadDungeonToolUseIndex && !gamepad.buttons[CGMZ.DungeonTools.ToolGamepad].pressed) {
			this._gamepadDungeonToolUsePressed = false;
		}
	}
};
//-----------------------------------------------------------------------------
// COMPATIBILITY
// Update to check for mobile button push
// Needed for Compatibility with EliMZ Mobile Controls.
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_Temp_update = CGMZ_Temp.prototype.update;
CGMZ_Temp.prototype.update = function() {
	alias_CGMZ_DungeonTools_Temp_update.call(this);
	if(Imported.Eli_MobileControls) {
		if(Input._currentState[Input.keyMapper[Eli.KeyCodes.keyboard[CGMZ.DungeonTools.ToolSelectKey]]] && SceneManager._scene.constructor === Scene_Map) {
			const hasAccess = !CGMZ.DungeonTools.ToolAccessSwitch || $gameSwitches.value(CGMZ.DungeonTools.ToolAccessSwitch);
			if((!CGMZ.DungeonTools.DisableSceneWithTools || hasAccess)) {
				SceneManager.push(CGMZ_Scene_DungeonTool);
			}
		} else if(Input._currentState[Input.keyMapper[Eli.KeyCodes.keyboard[CGMZ.DungeonTools.ToolKey]]] && SceneManager._scene.constructor === Scene_Map) {
			const tool = $cgmz.getDungeonTool($cgmz._currentDungeonTool);
			if(tool) {
				this.startUsingDungeonTool(tool);
			}
		}
	}
};
//=============================================================================
// CGMZ_Scene_DungeonTool
//-----------------------------------------------------------------------------
// Handle the dungeon tool select scene
//=============================================================================
function CGMZ_Scene_DungeonTool() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_DungeonTool.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_DungeonTool.prototype.constructor = CGMZ_Scene_DungeonTool;
//-----------------------------------------------------------------------------
// Create scene windows
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createCurrentEquipWindow();
	this.createSelectWindow();
};
//-----------------------------------------------------------------------------
// Create current tool equipped window
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.createCurrentEquipWindow = function() {
	const rect = this.currentEquipWindowRect();
    this._currentEquipWindow = new CGMZ_Window_DungeonToolCurrentEquipped(rect);
    this.addWindow(this._currentEquipWindow);
};
//-----------------------------------------------------------------------------
// Get current tool equipped window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.currentEquipWindowRect = function() {
	const width = Graphics.boxWidth * 0.6;
	const height = this.calcWindowHeight(2, false);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = this.buttonAreaHeight();
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create select window
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.createSelectWindow = function() {
	const rect = this.selectWindowRect();
    this._selectWindow = new CGMZ_Window_DungeonToolSelect(rect);
	this._selectWindow.setHandler('ok', this.onSelect.bind(this));
	this._selectWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._selectWindow);
};
//-----------------------------------------------------------------------------
// Get select window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.selectWindowRect = function() {
	const commandCount = $cgmz.getDiscoveredDungeonTools().length;
	const lines = (commandCount > CGMZ.DungeonTools.MaxToolSelectLines) ? CGMZ.DungeonTools.MaxToolSelectLines : commandCount;
	const width = this._currentEquipWindow.width;
	const height = this.calcWindowHeight(lines, true);
	const x = this._currentEquipWindow.x;
	const y = this._currentEquipWindow.y + this._currentEquipWindow.height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On tool select
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.onSelect = function() {
	$cgmz.equipDungeonTool(this._selectWindow.item());
	this._currentEquipWindow.refresh();
	this._selectWindow.activate();
};
//-----------------------------------------------------------------------------
// Get the scene's custom scene background for [CGMZ] Scene Backgrounds
// No need to check if Scene Backgrounds is installed because this custom func is only called by that plugin
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.CGMZ_getCustomSceneBackground = function() {
	return $cgmzTemp.sceneBackgroundPresets[CGMZ.DungeonTools.SceneBackground];
};
//-----------------------------------------------------------------------------
// Get controls window preset for [CGMZ] Controls Window
// No need to check if plugin is installed because this custom func is only called by that plugin
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.CGMZ_getControlsWindowOtherPreset = function() {
	return $cgmzTemp.getControlWindowPresetOther(CGMZ.DungeonTools.ControlsWindow);
};
//=============================================================================
// CGMZ_Window_DungeonToolCurrentEquipped
//-----------------------------------------------------------------------------
// Window displaying quest information during accept / decline scene
//=============================================================================
function CGMZ_Window_DungeonToolCurrentEquipped() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_DungeonToolCurrentEquipped.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_DungeonToolCurrentEquipped.prototype.constructor = CGMZ_Window_DungeonToolCurrentEquipped;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolCurrentEquipped.prototype.initialize = function(rect) {
	Window_Base.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.DungeonTools.EquippedWindowSettings) this.CGMZ_setWindowSettings(CGMZ.DungeonTools.EquippedWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.DungeonTools.EquippedWindowBackground) this.CGMZ_setWindowBackground(CGMZ.DungeonTools.EquippedWindowBackground);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolCurrentEquipped.prototype.refresh = function() {
	this.contents.clear();
	this.contents.fontBold = true;
	this.CGMZ_drawTextLine(CGMZ.DungeonTools.EquippedText, 0, 0, this.contents.width, 'center');
	this.contents.fontBold = false;
	const toolName = this.createEquippedDungeonToolName();
	this.CGMZ_drawTextLine(toolName, 0, this.lineHeight(), this.contents.width, 'center');
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolCurrentEquipped.prototype.createEquippedDungeonToolName = function() {
	const tool = $cgmz.getDungeonTool($cgmz._currentDungeonTool);
	return (tool) ? (tool._icon > 0) ? `\\i[${tool._icon}] ${tool._name}` : tool._name : "None";
};
//=============================================================================
// CGMZ_Window_DungeonToolSelect
//-----------------------------------------------------------------------------
// Selectable window for choosing which dungeon tool to equip
//=============================================================================
function CGMZ_Window_DungeonToolSelect(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_DungeonToolSelect.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_DungeonToolSelect.prototype.constructor = CGMZ_Window_DungeonToolSelect;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.DungeonTools.SelectWindowSettings) this.CGMZ_setWindowSettings(CGMZ.DungeonTools.SelectWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.DungeonTools.SelectWindowBackground) this.CGMZ_setWindowBackground(CGMZ.DungeonTools.SelectWindowBackground);
	this.refresh();
	this.selectEquippedTool();
	this.activate();
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.refresh = function() {
    this.makeItemList();
	const hasAccess = !CGMZ.DungeonTools.ToolAccessSwitch || $gameSwitches.value(CGMZ.DungeonTools.ToolAccessSwitch);
	this.changePaintOpacity(hasAccess);
    Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.makeItemList = function() {
	this._data = $cgmz.getDiscoveredDungeonTools();
};
//-----------------------------------------------------------------------------
// Check if current item is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.isCurrentItemEnabled = function() {
	const tool = $cgmz.getDungeonTool(this._data[this.index()]);
	return (tool && tool._isEnabled);
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.drawItem = function(index) {
    const item = this._data[index];
    const rect = this.itemRectWithPadding(index);
	const tool = $cgmz.getDungeonTool(item);
	const toolText = (tool._icon >= 1) ? '\\i[' + tool._icon + '] ' + tool._name : tool._name;
	this.changePaintOpacity(tool._isEnabled);
	this.CGMZ_drawTextLine(toolText, rect.x, rect.y, rect.width, 'center');
};
//-----------------------------------------------------------------------------
// Select the currently equipped dungeon tool (or first tool in list if unequipped)
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.selectEquippedTool = function() {
	if(!$cgmz._currentDungeonTool) {
		this.select(0);
	} else {
		for(let i = 0; i < this.maxItems(); i++) {
			if(this._data[i] === $cgmz._currentDungeonTool) {
				this.select(i);
				break;
			}
		}
	}
};
//=============================================================================
// Game_Map
//-----------------------------------------------------------------------------
// Handle the dungeon tools on the map
//=============================================================================
//-----------------------------------------------------------------------------
// Also setup dungeon tools
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GameMap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    alias_CGMZ_DungeonTools_GameMap_setup.call(this, mapId);
	this.CGMZ_setupDungeonTools();
};
//-----------------------------------------------------------------------------
// Setup dungeon tools
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_setupDungeonTools = function() {
	this._cgmzBombTool = new Game_CGMZ_BombTool();
	this._cgmzArrowTool = new Game_CGMZ_ArrowTool();
	this._cgmzBoomerangTool = new Game_CGMZ_BoomerangTool();
	this._cgmzHookshotTool = new Game_CGMZ_HookshotTool();
	this._cgmzBombSteps = 0;
	this._cgmzDungeonToolRestrictMovement = false;
};
//-----------------------------------------------------------------------------
// Get the map tool from type of tool requested, returns null if not found
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_getDungeonToolObj = function(type) {
	switch(type) {
		case "bomb": return this._cgmzBombTool;
		case "arrow": return this._cgmzArrowTool;
		case "boomerang": return this._cgmzBoomerangTool;
		case "hookshot": return this._cgmzHookshotTool;
	}
	return null;
};
//-----------------------------------------------------------------------------
// Also update dungeon tools
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GameMap_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    alias_CGMZ_DungeonTools_GameMap_update.call(this, sceneActive);
	this.CGMZ_updateDungeonTools();
};
//-----------------------------------------------------------------------------
// Update dungeon tools
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_updateDungeonTools = function() {
	this._cgmzArrowTool.update();
	this._cgmzBoomerangTool.update();
	this._cgmzHookshotTool.update();
};
//-----------------------------------------------------------------------------
// Check if dungeon tool restricts player movement
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_holdPlayerForDungeonTool = function() {
	return this._cgmzDungeonToolRestrictMovement;
};
//-----------------------------------------------------------------------------
// Reset the map
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_resetMap = function() {
	if($gamePlayer._cgmzdt_xferInfo) {
		for(eventObj of this._events) {
			if(!eventObj) continue;
			eventObj.CGMZ_processDungeonTool($cgmz._currentDungeonTool, this._mapId);
		}
		$gamePlayer.requestMapReload();
		$gamePlayer.reserveTransfer(...$gamePlayer._cgmzdt_xferInfo);
	}
};
//-----------------------------------------------------------------------------
// Refresh events for lantern (called when player moves)
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_refreshEventsForLantern = function() {
	for(const event of this.events()) {
		event.CGMZ_checkLanternExposure();
	}
};
//-----------------------------------------------------------------------------
// Refresh events for lantern (called when player moves)
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_clearLanternEffectOnEvents = function(toolId) {
	for(const event of this.events()) {
		event.CGMZ_undoLanternExposure(toolId);
	}
};
//-----------------------------------------------------------------------------
// Use the dungeon tool on map
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_useDungeonTool = function(tool) {
	switch(tool._type) {
		case "arrow": this.CGMZ_useArrowTool(tool); break;
		case "bomb": this.CGMZ_useBombTool(tool); break;
		case "boomerang": this.CGMZ_useBoomerangTool(tool); break;
		case "hookshot": this.CGMZ_useHookshotTool(tool); break;
		case "interact": this.CGMZ_useInteractTool(tool);
	}
};
//-----------------------------------------------------------------------------
// Use the arrow dungeon tool on map
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_useArrowTool = function(tool) {
	this._cgmzArrowTool.copyPosition($gamePlayer);
	this._cgmzArrowTool.setupTool(tool);
};
//-----------------------------------------------------------------------------
// Use the bomb dungeon tool on map
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_useBombTool = function(tool) {
	this._cgmzBombTool.copyPosition($gamePlayer);
	this._cgmzBombTool._realX = this._cgmzBombTool._x;
	this._cgmzBombTool._realY = this._cgmzBombTool._y;
	this._cgmzBombSteps = $gameParty.steps() + tool._steps;
};
//-----------------------------------------------------------------------------
// Use the boomerang dungeon tool on map
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_useBoomerangTool = function(tool) {
	this._cgmzBoomerangTool.copyPosition($gamePlayer);
	this._cgmzBoomerangTool.setupTool(tool);
	this._cgmzDungeonToolRestrictMovement = true;
};
//-----------------------------------------------------------------------------
// Use the hookshot dungeon tool on map
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_useHookshotTool = function(tool) {
	this._cgmzHookshotTool.setDirectionFix(false);
	this._cgmzHookshotTool.copyPosition($gamePlayer);
	this._cgmzHookshotTool.setupTool(tool);
	this._cgmzHookshotTool.setDirectionFix(true);
	this._cgmzDungeonToolRestrictMovement = true;
};
//-----------------------------------------------------------------------------
// Use the interact dungeon tool on map
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_useInteractTool = function(tool) {
	const x = this.roundXWithDirection($gamePlayer._x, $gamePlayer._direction);
	const y = this.roundYWithDirection($gamePlayer._y, $gamePlayer._direction);
	let showedAnimation = false;
	for(const event of this.eventsXy(x, y)) {
		event.CGMZ_processDungeonTool($cgmzTemp._dungeonToolInUse._symbol, this._mapId);
		if(!showedAnimation && tool._animation && event.CGMZ_isAffectedByDungeonTool($cgmzTemp._dungeonToolInUse._symbol)) {
			$gameTemp.requestAnimation([event], tool._animation);
			showedAnimation = true;
		}
	}
	if(!showedAnimation && tool._animation && tool._alwaysShowAnimation) {
		$gameTemp.requestAnimation([$gamePlayer], tool._animation);
	}
	$cgmzTemp.stopUsingDungeonTool();
};
//-----------------------------------------------------------------------------
// Check for and process bomb explosion if needed
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_checkBombExplosion = function() {
	if($cgmzTemp._bombToolInUse && this._cgmzBombSteps <= $gameParty.steps()) {
		const tool = $cgmzTemp._bombToolInUse;
		if(tool._explodeSe) AudioManager.playSe(tool._explodeSe);
		$gameScreen.startFlash([255, 255, 255, 170], 60);
		const hitEvents = [];
		const origin = {x: this._cgmzBombTool._x, y: this._cgmzBombTool._y};
		const array = this.CGMZ_makeBombHitArray(origin);
		for(const pos of array) {
			for(const event of this.eventsXy(pos.x, pos.y)) {
				hitEvents.push(event);
			}
		}
		for(const event of hitEvents) {
			event.CGMZ_processDungeonTool($cgmzTemp._bombToolInUse._symbol, this._mapId);
		}
		$cgmzTemp.startBombExplosion(tool, origin);
	}
};
//-----------------------------------------------------------------------------
// Get the positions of every tile hit by the bomb
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_makeBombHitArray = function(origin) {
	const hits = [];
	hits.push(origin);
	for(let i = origin.x - 1; i <= origin.x + 1; i++) {
		if(i === origin.x) continue;
		hits.push({x: i, y: origin.y});
	}
	for(let i = origin.y - 1; i <= origin.y + 1; i++) {
		if(i === origin.y) continue;
		hits.push({x: origin.x, y: i});
	}
	return hits;
};
//-----------------------------------------------------------------------------
// Handling when arrow tool collides with event
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_arrowDungeonToolCollided = function() {
	const x = this.roundXWithDirection(this._cgmzArrowTool._x, this._cgmzArrowTool._direction);
	const y = this.roundYWithDirection(this._cgmzArrowTool._y, this._cgmzArrowTool._direction);
	for(const event of this.eventsXy(x, y)) {
		event.CGMZ_processDungeonTool($cgmzTemp._dungeonToolInUse._symbol, this._mapId);
	}
};
//-----------------------------------------------------------------------------
// Handling when boomerang tool collides with event
// Returns whether to turn around or not based on priority
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_boomerangDungeonToolCollided = function() {
	const x = this.roundXWithDirection(this._cgmzBoomerangTool._x, this._cgmzBoomerangTool._direction);
	const y = this.roundYWithDirection(this._cgmzBoomerangTool._y, this._cgmzBoomerangTool._direction);
	let needsReverse = false;
	for(const event of this.eventsXy(x, y)) {
		event.CGMZ_processDungeonTool($cgmzTemp._dungeonToolInUse._symbol, this._mapId);
		if(event.isNormalPriority()) needsReverse = true;
	}
	return needsReverse;
};
//-----------------------------------------------------------------------------
// Handling when hookshot tool collides with event
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_hookshotDungeonToolCollided = function(toolX, toolY) {
	const x = this.roundXWithDirection(this._cgmzHookshotTool._x, this._cgmzHookshotTool._direction);
	const y = this.roundYWithDirection(this._cgmzHookshotTool._y, this._cgmzHookshotTool._direction);
	let connect = false;
	for(const event of this.eventsXy(x, y)) {
		if(event.CGMZ_processDungeonTool($cgmzTemp._dungeonToolInUse._symbol, this._mapId)) {
			connect = true;
		}
	}
	if(!this.isPassable(toolX, toolY, $gamePlayer.direction())) {
		connect = false;
	}
	return connect;
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// When increasing steps, check for bomb explosion
//=============================================================================
//-----------------------------------------------------------------------------
// Check if bomb tool should explode
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GameParty_increaseSteps = Game_Party.prototype.increaseSteps;
Game_Party.prototype.increaseSteps = function() {
    alias_CGMZ_DungeonTools_GameParty_increaseSteps.call(this);
	$gameMap.CGMZ_checkBombExplosion();
};
//=============================================================================
// Game_Player
//-----------------------------------------------------------------------------
// Store transfer info for reset tool, lantern illumination range for lantern
// tool
//=============================================================================
//-----------------------------------------------------------------------------
// Initialize light to nothing
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GamePlayer_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
    alias_CGMZ_DungeonTools_GamePlayer_initMembers.call(this);
    this._CGMZDT_lanternRange = 0;
};
//-----------------------------------------------------------------------------
// Save transfer info for reset tool
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GamePlayer_reserveTransfer = Game_Player.prototype.reserveTransfer;
Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
    alias_CGMZ_DungeonTools_GamePlayer_reserveTransfer.call(this, mapId, x, y, d, fadeType);
	this._cgmzdt_xferInfo = [mapId,x,y,d,fadeType];
};
//-----------------------------------------------------------------------------
// Clear use of dungeon tool after transfer
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GamePlayer_performTransfer = Game_Player.prototype.performTransfer;
Game_Player.prototype.performTransfer = function() {
    alias_CGMZ_DungeonTools_GamePlayer_performTransfer.call(this);
	$cgmzTemp.stopUsingDungeonTool();
	$cgmzTemp.stopUsingBombTool();
};
//-----------------------------------------------------------------------------
// Do not let player move if using tool that returns to them
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GamePlayer_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
	if($gameMap.CGMZ_holdPlayerForDungeonTool()) {
		return false;
	}
	return alias_CGMZ_DungeonTools_GamePlayer_canMove.call(this);
};
//-----------------------------------------------------------------------------
// Set the player's lantern range
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_setLanternIllumination = function(range) {
	this._CGMZDT_lanternRange = range;
};
//-----------------------------------------------------------------------------
// Check if the player has a lantern tool equipped
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_hasLanternTool = function() {
	return !!this._CGMZDT_lanternRange;
};
//-----------------------------------------------------------------------------
// Get the player's lantern range
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_getLanternRange = function() {
	return this._CGMZDT_lanternRange;
};
//-----------------------------------------------------------------------------
// Also update footstep processing
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GamePlayer_executeMove = Game_Player.prototype.executeMove;
Game_Player.prototype.executeMove = function(direction) {
	alias_CGMZ_DungeonTools_GamePlayer_executeMove.call(this, direction);
	if(this.CGMZ_hasLanternTool()) {
		$gameMap.CGMZ_refreshEventsForLantern();
	}
};
//=============================================================================
// Game_Event
//-----------------------------------------------------------------------------
// Processing for event interaction with a tool
//=============================================================================
//-----------------------------------------------------------------------------
// Process the tool's interaction with the event
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_processDungeonTool = function(toolId, mapId) {
	const tool = $cgmz.getDungeonTool(toolId);
	if(!tool) return;
	this.CGMZ_dungeonToolStun(tool._stunSteps);
	if(!this.CGMZ_isAffectedByDungeonTool(toolId)) return;
	if(Imported.CGMZ_Rumble && tool._onInteractRumble) {
		$cgmzTemp.startRumble(tool._onInteractRumble);
	}
	switch(tool._type) {
		case "reset":
			this.CGMZ_flipDungeonToolSwitches(tool._switches, mapId, false);
			break;
		case "bomb":
			this.CGMZ_flipDungeonToolSwitches(tool._switches, mapId, true);
			break;
		case "arrow":
			this.CGMZ_flipDungeonToolSwitches(tool._switches, mapId, true);
			break;
		case "boomerang":
			this.CGMZ_makeBoomerangRewards(tool);
			this.CGMZ_flipDungeonToolSwitches(tool._switches, mapId, true);
			break;
		case "interact":
			this.CGMZ_flipDungeonToolSwitches(tool._switches, mapId, true);
			break;
		case "hookshot":
			return true;
	}
};
//-----------------------------------------------------------------------------
// Flip event switches when tool interacts with it
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_flipDungeonToolSwitches = function(switches, map, result) {
	for(const switchId of switches) {
		const key = [map, this._eventId, switchId];
		$gameSelfSwitches.setValue(key, result);
	}
};
//-----------------------------------------------------------------------------
// Stun events if stun steps is set up and [CGMZ] Event Movement is imported
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_dungeonToolStun = function(steps) {
	if(Imported.CGMZ_EventMovement && steps) {
		this.CGMZ_EventMovement_stunEvent(steps);
	}
};
//-----------------------------------------------------------------------------
// Check if event is affected by tool
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_isAffectedByDungeonTool = function(toolId) {
	const page = this.page();
	if(!page) return false;
	for(const command of page.list) {
		if(command.code === 108 && command.parameters[0].trim() === "CGMZDT " + toolId) return true;
	}
	return false;
};
//-----------------------------------------------------------------------------
// Check if event is affected by lantern
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_checkLanternExposure = function() {
	const lanternRange = $gamePlayer.CGMZ_getLanternRange();
	if(lanternRange < 1) return;
	const toolId = $cgmz._currentDungeonTool;
	if(!this.CGMZ_isAffectedByDungeonTool(toolId)) return;
	const tool = $cgmz.getDungeonTool(toolId);
	if(tool?._type !== 'lantern') return;
	const distance = this.CGMZ_getDistanceFromPlayerSimple();
	const mapId = $gameMap.mapId();
	if(distance <= lanternRange) {
		for(const switchId of tool._switches) {
			const key = [mapId, this._eventId, switchId];
			$gameSelfSwitches.setValue(key, true);
		}
	} else {
		for(const switchId of tool._switches) {
			const key = [mapId, this._eventId, switchId];
			$gameSelfSwitches.setValue(key, false);
		}
	}
};
//-----------------------------------------------------------------------------
// Undo lantern effects when it is unequipped
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_undoLanternExposure = function(toolId) {
	if(!this.CGMZ_isAffectedByDungeonTool(toolId)) return;
	const tool = $cgmz.getDungeonTool(toolId);
	if(!tool) return;
	const mapId = $gameMap.mapId();
	for(const switchId of tool._switches) {
		const key = [mapId, this._eventId, switchId];
		$gameSelfSwitches.setValue(key, false);
	}
};
//-----------------------------------------------------------------------------
// Check if event is affected by lantern
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GameEvent_increaseSteps = Game_Event.prototype.increaseSteps;
Game_Event.prototype.increaseSteps = function() {
	alias_CGMZ_DungeonTools_GameEvent_increaseSteps.call(this);
	if($gamePlayer.CGMZ_hasLanternTool()) {
		this.CGMZ_checkLanternExposure();
	}
};
//-----------------------------------------------------------------------------
// Check if event is affected by tool
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_makeBoomerangRewards = function(tool) {
	const rewards = [];
	const page = this.page();
	for(const command of page.list) {
		if(command.code === 108 && command.parameters[0].trim().includes("CGMZDT PICKUP")) {
			const params = command.parameters[0].split(" ");
			const reward = {type: params[2], amount: params[3], id: params[4]};
			reward.text = (params.length > 5) ? params.slice(5, params.length).join(" ") : null;
			rewards.push(reward);
		}
	}
	tool.addRewards(rewards);
};
//=============================================================================
// Game_CharacterBase
//-----------------------------------------------------------------------------
// Do not allow walking over bomb tool
//=============================================================================
//-----------------------------------------------------------------------------
// Prevent movement if bomb tool is in way
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GameCharacterBase_canPass = Game_CharacterBase.prototype.canPass;
Game_CharacterBase.prototype.canPass = function(x, y, d) {
    const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    const oldReturn = alias_CGMZ_DungeonTools_GameCharacterBase_canPass.call(this, x, y, d);
	return oldReturn && (!this.CGMZ_isCollidedWithBomb(x2, y2) || this.isThrough());
};
//-----------------------------------------------------------------------------
// Check if collided with bomb
//-----------------------------------------------------------------------------
Game_CharacterBase.prototype.CGMZ_isCollidedWithBomb = function(x, y) {
	if(!$cgmzTemp._bombToolInUse) return false;
    return $gameMap._cgmzBombTool._x === x && $gameMap._cgmzBombTool._y === y;
};
//=============================================================================
// Spriteset_Map
//-----------------------------------------------------------------------------
// Add sprites of dungeon tools
//=============================================================================
//-----------------------------------------------------------------------------
// Also create dungeon tools (after other sprites have been created)
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
	alias_CGMZ_DungeonTools_Spriteset_Map_createLowerLayer.call(this);
	this.CGMZ_createDungeonTools();
};
//-----------------------------------------------------------------------------
// Create dungeon tool sprites and add to tilemap
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.CGMZ_createDungeonTools = function() {
	const bombSprite = new Sprite_DungeonTool("bomb");
	const arrowSprite = new Sprite_DungeonTool("arrow");
	const boomerangSprite = new Sprite_DungeonTool("boomerang");
	const hookshotSprite = new Sprite_DungeonTool("hookshot");
	this._tilemap.addChild(bombSprite);
	this._tilemap.addChild(arrowSprite);
	this._tilemap.addChild(boomerangSprite);
	this._tilemap.addChild(hookshotSprite);
};
//=============================================================================
// Sprite_DungeonTool
//-----------------------------------------------------------------------------
// Sprite class for dungeon tools
//=============================================================================
function Sprite_DungeonTool() {
    this.initialize(...arguments);
}
Sprite_DungeonTool.prototype = Object.create(Sprite.prototype);
Sprite_DungeonTool.prototype.constructor = Sprite_DungeonTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.initialize = function(type) {
    Sprite.prototype.initialize.call(this);
	this._type = type;
    this.initMembers();
	if(this._type === 'hookshot') {
		this._ropeSprite = new CGMZ_Sprite_HookshotRope();
		this.addChild(this._ropeSprite);
	}
};
//-----------------------------------------------------------------------------
// Initialize data
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.initMembers = function() {
	this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._tool = null;
	this._mapTool = $gameMap.CGMZ_getDungeonToolObj(this._type);
	this.setEmptyTool();
};
//-----------------------------------------------------------------------------
// Set default properties for no animation/image
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.setEmptyTool = function() {
	this._needsUpdate = false;
	this._bitmap = null;
	this._imageData = null;
	this._frameInfo = null;
	this._currentFrame = 0;
	this._animationSpeed = 0;
	this._waitCounter = 0;
	this._direction = 0;
};
//-----------------------------------------------------------------------------
// Setup tool properties
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.setupToolProperties = function() {
	const tool = (this._type === "bomb") ? $cgmzTemp._bombToolInUse : $cgmzTemp._dungeonToolInUse;
	if(!tool || tool._type === "reset") {
		this.setEmptyTool();
	} else {
		this._needsUpdate = false;
		this._frameInfo = tool._frameInfo;
		this._animationSpeed = tool._animationSpeed;
		this._currentFrame = 0;
		this._waitCounter = 0;
		this._imageData = tool._imageData;
		this._direction = (this._type !== "bomb") ? this._mapTool._direction / 2 - 1 : 0;
		this._bitmap = ImageManager.loadBitmap(this._imageData.folder, this._imageData.filename);
		this._bitmap.addLoadListener(this.onImageLoaded.bind(this));
		if(this._type === 'hookshot') {
			this._ropeSprite.setImages(tool._ropeHorizontal, tool._ropeVertical);
			this._ropeSprite.setOffset(tool._ropeOffsets);
		}
	}
};
//-----------------------------------------------------------------------------
// After bitmap is loaded
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.onImageLoaded = function() {
	if(this._frameInfo) {
		this._needsUpdate = true;
		const pw = this._frameInfo.frameWidth;
		const ph = this._frameInfo.frameHeight;
		const sx = this._currentFrame * pw;
		const sy = this._direction * this._frameInfo.frameHeight;
		this.setFrame(sx, sy, pw, ph);
	}
};
//-----------------------------------------------------------------------------
// Update sprite
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.update = function() {
    Sprite.prototype.update.call(this);
	this.updateTool();
	this.updatePosition();
	if(this._needsUpdate) {
		this.updateFrame();
	}
};
//-----------------------------------------------------------------------------
// Update sprite tool
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.updateTool = function() {
	if(this.needsToolUpdate()) {
		this._tool = (this._type === "bomb") ? $cgmzTemp._bombToolInUse : $cgmzTemp._dungeonToolInUse;
		this.visible = !!this._tool;
		if(this._type === 'hookshot') {
			this._ropeSprite.visible = this.visible;
		}
		this.setupToolProperties();
	}
};
//-----------------------------------------------------------------------------
// Check if tool update needed
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.needsToolUpdate = function() {
	if(this._type === "bomb") {
		return this._tool !== $cgmzTemp._bombToolInUse;
	} else if($cgmzTemp._dungeonToolInUse) {
		return this._type === $cgmzTemp._dungeonToolInUse._type && this._tool !== $cgmzTemp._dungeonToolInUse;
	}
	return this._tool !== $cgmzTemp._dungeonToolInUse;
};
//-----------------------------------------------------------------------------
// Update frame of tool
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.updateFrame = function() {
	this._waitCounter++;
	if(this._waitCounter > this._animationSpeed && this._frameInfo) {
		this._waitCounter = 0;
		this._currentFrame = (this._currentFrame + 1) % this._frameInfo.maxFrames;
		const pw = this._frameInfo.frameWidth;
		const ph = this._frameInfo.frameHeight;
		const sx = this._currentFrame * pw;
		const sy = this._direction * this._frameInfo.frameHeight;
        this.setFrame(sx, sy, pw, ph);
	}
};
//-----------------------------------------------------------------------------
// Update position and direction of tool
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.updatePosition = function() {
	this.x = this._mapTool.screenX();
    this.y = this._mapTool.screenY();
    this.z = this._mapTool.screenZ();
	this._direction = (this._type !== "bomb") ? this._mapTool._direction / 2 - 1 : 0;
	if(this._type === 'hookshot') {
		const yAdjust = (this._frameInfo) ? -1 * (this._frameInfo.frameHeight / 2) : 0;
		this._ropeSprite.updatePosition(this._mapTool.screenX(), this._mapTool.screenY(), this._direction, yAdjust);
	}
};
//=============================================================================
// CGMZ_Sprite_HookshotRope
//-----------------------------------------------------------------------------
// Sprite class for the hookshot rope
//=============================================================================
function CGMZ_Sprite_HookshotRope() {
    this.initialize(...arguments);
}
CGMZ_Sprite_HookshotRope.prototype = Object.create(Sprite.prototype);
CGMZ_Sprite_HookshotRope.prototype.constructor = CGMZ_Sprite_HookshotRope;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Sprite_HookshotRope.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this._h = null;
	this._v = null;
	this._offset = null;
	this._dir = 0;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.x = 0;
	this.y = 0;
	this.z = $gamePlayer.z - 1;
};
//-----------------------------------------------------------------------------
// Set rope images
//-----------------------------------------------------------------------------
CGMZ_Sprite_HookshotRope.prototype.setImages = function(horizontal, vertical) {
	this._h = horizontal;
	this._v = vertical;
};
//-----------------------------------------------------------------------------
// Set rope offset
//-----------------------------------------------------------------------------
CGMZ_Sprite_HookshotRope.prototype.setOffset = function(offset) {
	this._offset = offset;
};
//-----------------------------------------------------------------------------
// Set rope images
//-----------------------------------------------------------------------------
CGMZ_Sprite_HookshotRope.prototype.updatePosition = function(x, y, dir, yAdjust) {
	if(this._dir !== dir) {
		this._dir = dir;
		if(dir === 1 || dir === 2) {
			if(!this._h) return;
			this.bitmap = ImageManager.loadBitmap(this._h.folder, this._h.filename);
		} else {
			if(!this._v) return;
			this.bitmap = ImageManager.loadBitmap(this._v.folder, this._v.filename);
		}
	}
	if(!this.bitmap) {
		if(dir === 1 || dir === 2) {
			if(!this._h) return;
			this.bitmap = ImageManager.loadBitmap(this._h.folder, this._h.filename);
		} else {
			if(!this._v) return;
			this.bitmap = ImageManager.loadBitmap(this._v.folder, this._v.filename);
		}
		return;
	}
	this.z = $gamePlayer.z - 1;
	const width = Math.abs($gamePlayer.screenX() - x);
	const height = Math.abs($gamePlayer.screenY() - y);
	let ox = 0;
	let oy = 0;
	if(dir === 2) { // right
		if(this._offset) {
			ox = this._offset.right.x;
			oy = this._offset.right.y;
		}
		this.setFrame(0, 0, width - Math.abs(ox), this.bitmap.height);
		this.x = -width/2 + ox/2;
		this.y = yAdjust + oy;
	}
	if(dir === 1) { // left
		if(this._offset) {
			ox = this._offset.left.x;
			oy = this._offset.left.y;
		}
		this.setFrame(0, 0, width - Math.abs(ox), this.bitmap.height);
		this.x = width/2 + ox/2;
		this.y = yAdjust + oy;
	}
	if(dir === 3) { // up
		if(this._offset) {
			ox = this._offset.up.x;
			oy = this._offset.up.y;
		}
		this.setFrame(0, 0, this.bitmap.width, height - Math.abs(oy));
		this.x = ox;
		this.y = yAdjust + (height/2) + oy/2;
	}
	if(dir === 0) { // down
		if(this._offset) {
			ox = this._offset.down.x;
			oy = this._offset.down.y;
		}
		this.setFrame(0, 0, this.bitmap.width, height - Math.abs(oy));
		this.x = ox;
		this.y = yAdjust - (height/2) + oy/2;
	}
};
//=============================================================================
// Game_CGMZ_BombTool
//-----------------------------------------------------------------------------
// Data class for bomb tool appearing on the map
//=============================================================================
function Game_CGMZ_BombTool() {
    this.initialize(...arguments);
}
Game_CGMZ_BombTool.prototype = Object.create(Game_CharacterBase.prototype);
Game_CGMZ_BombTool.prototype.constructor = Game_CGMZ_BombTool;
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
Game_CGMZ_BombTool.prototype.update = function() {
};
//-----------------------------------------------------------------------------
// Get screen Z
//-----------------------------------------------------------------------------
Game_CGMZ_BombTool.prototype.screenZ = function() {
    return $gamePlayer.screenZ() - 1;
};
//=============================================================================
// Game_CGMZ_MapTool
//-----------------------------------------------------------------------------
// Super class for map tools appearing on the map
//=============================================================================
function Game_CGMZ_MapTool() {
    this.initialize(...arguments);
}
Game_CGMZ_MapTool.prototype = Object.create(Game_CharacterBase.prototype);
Game_CGMZ_MapTool.prototype.constructor = Game_CGMZ_MapTool;
//-----------------------------------------------------------------------------
// Init Members
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.initMembers = function() {
	Game_CharacterBase.prototype.initMembers.call(this);
	this._tool = null;
};
//-----------------------------------------------------------------------------
// Setup the tool
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.setupTool = function(tool) {
	this._tool = tool;
	this._moveSpeed = tool._speed;
	this._range = tool._range;
	this._totalMoves = 0;
	this._active = true;
	this._passableRegion = tool._passableRegionId;
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.update = function() {
	if(this.isActive()) {
		this.updatePremove();
		if(!this.isMoving() && this.shouldMove()) {
			this.updateCollision();
			this._totalMoves++;
			this.executeMove();
		}
		this.updateMove();
		this.updatePostmove();
	}
};
//-----------------------------------------------------------------------------
// Determine if should move
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.isActive = function() {
	return this._active;
};
//-----------------------------------------------------------------------------
// Determine if should move
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.shouldMove = function() {
	return true;
};
//-----------------------------------------------------------------------------
// Update before moving
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.updatePremove = function() {
	// Implemented by children
};
//-----------------------------------------------------------------------------
// Actually do the move
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.executeMove = function() {
	this.moveStraight(this.direction());
};
//-----------------------------------------------------------------------------
// Update after moving
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.updatePostmove = function() {
	// Implemented by children
};
//-----------------------------------------------------------------------------
// Update for colliding with something
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.updateCollision = function() {
	// Implemented by children
};
//-----------------------------------------------------------------------------
// Check if map is passable for tool
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.isMapPassable = function(x, y, d) {
	return true;
};
//-----------------------------------------------------------------------------
// Get screen Z
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.screenZ = function() {
	return $gamePlayer.screenZ();
};
//=============================================================================
// Game_CGMZ_ArrowTool
//-----------------------------------------------------------------------------
// Data class for arrow tools appearing on the map
//=============================================================================
function Game_CGMZ_ArrowTool() {
    this.initialize(...arguments);
}
Game_CGMZ_ArrowTool.prototype = Object.create(Game_CGMZ_MapTool.prototype);
Game_CGMZ_ArrowTool.prototype.constructor = Game_CGMZ_ArrowTool;
//-----------------------------------------------------------------------------
// Determine if arrow should move
//-----------------------------------------------------------------------------
Game_CGMZ_ArrowTool.prototype.shouldMove = function() {
	return (this._totalMoves < this._range) && this.isActive();
};
//-----------------------------------------------------------------------------
// Check if hit max range, handle this case for tool end
//-----------------------------------------------------------------------------
Game_CGMZ_ArrowTool.prototype.updatePremove = function() {
	this._active = (this._totalMoves < this._range);
	if(!this._active) $cgmzTemp.stopUsingDungeonTool();
};
//-----------------------------------------------------------------------------
// Check if collided with something and stop using tool
//-----------------------------------------------------------------------------
Game_CGMZ_ArrowTool.prototype.updateCollision = function() {
	const d = this._direction;
	const x = this._x;
	const y = this._y;
	const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    if(!$gameMap.isValid(x2, y2) || !this.isMapPassable(x, y, d)) {
		this.playCollideSe();
		$cgmzTemp.stopUsingDungeonTool();
        this._active = false;
    } else if(this.isCollidedWithCharacters(x2, y2)) {
		this.playCollideSe();
		$gameMap.CGMZ_arrowDungeonToolCollided();
		$cgmzTemp.stopUsingDungeonTool();
        this._active = false;
    }
};
//-----------------------------------------------------------------------------
// Check if map is passable for tool
//-----------------------------------------------------------------------------
Game_CGMZ_ArrowTool.prototype.isMapPassable = function(x, y, d) {
	const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    const d2 = this.reverseDir(d);
    if($gameMap.isPassable(x, y, d) && $gameMap.isPassable(x2, y2, d2)) return true
	return $gameMap.regionId(x2, y2) === this._passableRegion;
};
//-----------------------------------------------------------------------------
// Play the tool's collide SE, if any
//-----------------------------------------------------------------------------
Game_CGMZ_ArrowTool.prototype.playCollideSe = function() {
	const tool = $cgmzTemp._dungeonToolInUse;
	if(tool?._collideSe?.name) AudioManager.playSe(tool._collideSe);
};
//=============================================================================
// Game_CGMZ_BoomerangTool
//-----------------------------------------------------------------------------
// Data class for boomerang tools appearing on the map
//=============================================================================
function Game_CGMZ_BoomerangTool() {
    this.initialize(...arguments);
}
Game_CGMZ_BoomerangTool.prototype = Object.create(Game_CGMZ_MapTool.prototype);
Game_CGMZ_BoomerangTool.prototype.constructor = Game_CGMZ_BoomerangTool;
//-----------------------------------------------------------------------------
// Setup the tool
//-----------------------------------------------------------------------------
Game_CGMZ_BoomerangTool.prototype.setupTool = function(tool) {
	Game_CGMZ_MapTool.prototype.setupTool.call(this, tool);
	this._isReversing = false;
};
//-----------------------------------------------------------------------------
// Reverse direction of tool
//-----------------------------------------------------------------------------
Game_CGMZ_BoomerangTool.prototype.reverse = function() {
	this._isReversing = true;
	this.setDirection(this.reverseDir(this._direction));
};
//-----------------------------------------------------------------------------
// Check if hit max range, handle this case for tool end
//-----------------------------------------------------------------------------
Game_CGMZ_BoomerangTool.prototype.updatePremove = function() {
	if(!this._isReversing) {
		if(this._totalMoves >= this._range) this.reverse();
	}
	this._active = !(this._isReversing && this._x === $gamePlayer._x && this._y === $gamePlayer._y);
	if(!this._active) $cgmzTemp.stopUsingDungeonTool();
};
//-----------------------------------------------------------------------------
// Check if collided with something and handle collision
//-----------------------------------------------------------------------------
Game_CGMZ_BoomerangTool.prototype.updateCollision = function() {
	(this._isReversing) ? this.setThrough(true) : this.setThrough(false);
	const d = this._direction;
	const x = this._x;
	const y = this._y;
	const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    if(!$gameMap.isValid(x2, y2) || !this.isMapPassable(x, y, d)) {
		if(this._isReversing) {
			$cgmzTemp.stopUsingDungeonTool();
			this._active = false;
		} else {
			this.playCollideSe();
			this.reverse();
		}
    } else if($gameMap.eventsXyNt(x2, y2).length > 0) {
		const shouldReverse = $gameMap.CGMZ_boomerangDungeonToolCollided();
		if(shouldReverse && !this._isReversing) this.reverse();
    }
	if(this._totalMoves === 0 && this._isReversing) {
		$cgmzTemp.stopUsingDungeonTool();
		this._active = false;
	}
};
//-----------------------------------------------------------------------------
// Check if map is passable for tool
//-----------------------------------------------------------------------------
Game_CGMZ_BoomerangTool.prototype.isMapPassable = function(x, y, d) {
	if(this._isReversing) return true;
	const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    const d2 = this.reverseDir(d);
    if($gameMap.isPassable(x, y, d) && $gameMap.isPassable(x2, y2, d2)) return true;
	return $gameMap.regionId(x2, y2) === this._passableRegion;
};
//-----------------------------------------------------------------------------
// Play the tool's collide SE, if any
//-----------------------------------------------------------------------------
Game_CGMZ_BoomerangTool.prototype.playCollideSe = function() {
	const tool = $cgmzTemp._dungeonToolInUse;
	if(tool?._collideSe?.name) AudioManager.playSe(tool._collideSe);
};
//=============================================================================
// Game_CGMZ_HookshotTool
//-----------------------------------------------------------------------------
// Data class for hookshot tools appearing on the map
//=============================================================================
function Game_CGMZ_HookshotTool() {
    this.initialize(...arguments);
}
Game_CGMZ_HookshotTool.prototype = Object.create(Game_CGMZ_MapTool.prototype);
Game_CGMZ_HookshotTool.prototype.constructor = Game_CGMZ_HookshotTool;
//-----------------------------------------------------------------------------
// Setup the tool
//-----------------------------------------------------------------------------
Game_CGMZ_HookshotTool.prototype.setupTool = function(tool) {
	Game_CGMZ_MapTool.prototype.setupTool.call(this, tool);
	this._gatherSpeed = tool._gatherSpeed;
	this._jumpGather = tool._jumpGather;
	this._isReversing = false;
	this._isConnected = false;
	this._isDoneMovePostConnect = false;
	this._connectPoint = {x: 0, y: 0};
	this._postConnectXOffset = 0;
	this._postConnectYOffset = 0;
	this._playerSpeed = $gamePlayer.moveSpeed();
	this._playerIsThrough = $gamePlayer.isThrough();
	this._playerWalkingAnimation = $gamePlayer.hasWalkAnime();
};
//-----------------------------------------------------------------------------
// Reverse direction of tool
//-----------------------------------------------------------------------------
Game_CGMZ_HookshotTool.prototype.reverse = function() {
	this._isReversing = true;
};
//-----------------------------------------------------------------------------
// Connect the tool to a grapple point
//-----------------------------------------------------------------------------
Game_CGMZ_HookshotTool.prototype.connect = function() {
	this._isConnected = true;
	this._connectPoint = {x: this._x, y: this._y};
	if(!this._jumpGather) {
		this._playerSpeed = $gamePlayer.moveSpeed();
		this._playerIsThrough = $gamePlayer.isThrough();
		this._playerWalkingAnimation = $gamePlayer.hasWalkAnime();
		$gamePlayer.setMoveSpeed(this._gatherSpeed);
		$gamePlayer.setWalkAnime(false);
		$gamePlayer.setThrough(true);
	}
};
//-----------------------------------------------------------------------------
// Check if tool should move
//-----------------------------------------------------------------------------
Game_CGMZ_HookshotTool.prototype.shouldMove = function() {
	return !this._isConnected;
};
//-----------------------------------------------------------------------------
// Check if tool should move
//-----------------------------------------------------------------------------
Game_CGMZ_HookshotTool.prototype.updateMove = function() {
	if(this._isConnected) return;
	Game_CGMZ_MapTool.prototype.updateMove.call(this);
};
//-----------------------------------------------------------------------------
// Check if hit max range, handle this case for tool end
//-----------------------------------------------------------------------------
Game_CGMZ_HookshotTool.prototype.updatePremove = function() {
	if(!this._isReversing) {
		if(this._totalMoves >= this._range) this.reverse();
	}
	this._active = !(this._isReversing && this._x === $gamePlayer._x && this._y === $gamePlayer._y);
	if(!this._active) $cgmzTemp.stopUsingDungeonTool();
};
//-----------------------------------------------------------------------------
// Move player to tool if connected
//-----------------------------------------------------------------------------
Game_CGMZ_HookshotTool.prototype.updatePostmove = function() {
	if(this._isConnected) {
		if(this._isDoneMovePostConnect) {
			this.updatePostmoveGather();
		} else {
			this.updatePostmoveConnect();
		}
	}
};
//-----------------------------------------------------------------------------
// Move player to tool if connected
//-----------------------------------------------------------------------------
Game_CGMZ_HookshotTool.prototype.updatePostmoveGather = function() {
	this._donePostMoveGather = !(this._x === $gamePlayer._realX && this._y === $gamePlayer._realY);
	if(this._donePostMoveGather && !($gamePlayer.isMoving() || $gamePlayer.isJumping())) {
		if(!this._jumpGather) {
			$gamePlayer.moveStraight($gamePlayer.direction());
		} else {
			const xJump = $gameMap.deltaX(this._x, $gamePlayer.x);
			const yJump = $gameMap.deltaX(this._y, $gamePlayer.y);
			$gamePlayer.jump(xJump, yJump);
		}
	}
	if(!this._donePostMoveGather) {
		if(!this._jumpGather && !$gamePlayer.followers().areGathering()) {
			if(!$gamePlayer.followers().areGathered()) $gamePlayer.gatherFollowers();
		}
		if(!$gamePlayer.followers().areGathering()) {
			$gamePlayer.setThrough(this._playerIsThrough);
			$gamePlayer.setWalkAnime(this._playerWalkingAnimation);
			$gamePlayer.setMoveSpeed(this._playerSpeed);
			$cgmzTemp.stopUsingDungeonTool();
			this._active = false;
		}
	}
};
//-----------------------------------------------------------------------------
// Move tool slightly into next tile
//-----------------------------------------------------------------------------
Game_CGMZ_HookshotTool.prototype.updatePostmoveConnect = function() {
	switch(this._direction) {
		case 2: // Down
			this._realY = this._realY + this.distancePerFrame();
			if(this._realY > this._y + CGMZ.DungeonTools.HookshotConnectOffset) {
				this._realY = this._y + CGMZ.DungeonTools.HookshotConnectOffset;
				this._isDoneMovePostConnect = true;
			}
			break;
		case 4: // Left
			this._realX = this._realX - this.distancePerFrame();
			if(this._realX < this._x - CGMZ.DungeonTools.HookshotConnectOffset) {
				this._realX = this._x - CGMZ.DungeonTools.HookshotConnectOffset;
				this._isDoneMovePostConnect = true;
			}
			break;
		case 6: // Right
			this._realX = this._realX + this.distancePerFrame();
			if(this._realX > this._x + CGMZ.DungeonTools.HookshotConnectOffset) {
				this._realX = this._x + CGMZ.DungeonTools.HookshotConnectOffset;
				this._isDoneMovePostConnect = true;
			}
			break;
		case 8: // Up
			this._realY -= this.distancePerFrame();
			if(this._realY < this._y - CGMZ.DungeonTools.HookshotConnectOffset) {
				this._realY = this._y - CGMZ.DungeonTools.HookshotConnectOffset;
				this._isDoneMovePostConnect = true;
			}
			break;
	}
};
//-----------------------------------------------------------------------------
// Actually do the move
//-----------------------------------------------------------------------------
Game_CGMZ_HookshotTool.prototype.executeMove = function() {
	if(this._isReversing) {
		this.moveStraight(this.reverseDir(this.direction()));
	} else {
		this.moveStraight(this.direction());
	}
};
//-----------------------------------------------------------------------------
// Check if collided with something and handle collision
//-----------------------------------------------------------------------------
Game_CGMZ_HookshotTool.prototype.updateCollision = function() {
	const d = this._isReversing ? this.reverseDir(this._direction) : this._direction;
	const x = this._x;
	const y = this._y;
	const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
	if(!this._isReversing && this.isCollidedWithCharacters(x2, y2)) {
		const needsConnect = $gameMap.CGMZ_hookshotDungeonToolCollided(x, y);
		this.playCollideSe();
		if(needsConnect) {
			this.connect();
		} else {
			this.reverse();
		}
	} else if(!$gameMap.isValid(x2, y2) || !this.isMapPassable(x, y, d)) {
		if(this._isReversing) {
			$cgmzTemp.stopUsingDungeonTool();
			this._active = false;
		} else {
			this.playCollideSe();
			this.reverse();
		}
    }
	if(this._totalMoves === 0 && this._isReversing) {
		$cgmzTemp.stopUsingDungeonTool();
		this._active = false;
	}
};
//-----------------------------------------------------------------------------
// Check if map is passable for tool
//-----------------------------------------------------------------------------
Game_CGMZ_HookshotTool.prototype.isMapPassable = function(x, y, d) {
	if(this._isReversing) return true;
	const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    const d2 = this.reverseDir(d);
    if($gameMap.isPassable(x, y, d) && $gameMap.isPassable(x2, y2, d2)) return true;
	return $gameMap.regionId(x2, y2) === this._passableRegion;
};
//-----------------------------------------------------------------------------
// Get screen Z
//-----------------------------------------------------------------------------
Game_CGMZ_HookshotTool.prototype.screenZ = function() {
	const screenZ = $gamePlayer.screenZ();
	if($gamePlayer.direction() !== 2) return screenZ - 1;
    return screenZ;
};
//-----------------------------------------------------------------------------
// Play the tool's collide SE, if any
//-----------------------------------------------------------------------------
Game_CGMZ_HookshotTool.prototype.playCollideSe = function() {
	const tool = $cgmzTemp._dungeonToolInUse;
	if(tool?._collideSe?.name) AudioManager.playSe(tool._collideSe);
};
//=============================================================================
// Scene_Map
//-----------------------------------------------------------------------------
// Also add dungeon tool touch UI + handling
//=============================================================================
//-----------------------------------------------------------------------------
// Also create dungeon tool button if touch UI
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_SceneMap_createButtons = Scene_Map.prototype.createButtons;
Scene_Map.prototype.createButtons = function() {
	alias_CGMZ_DungeonTools_SceneMap_createButtons.call(this);
    if (ConfigManager.touchUI) {
        this.CGMZ_DungeonTools_createDungeonToolButtons();
    }
};
//-----------------------------------------------------------------------------
// Create the dungeon tool buttons
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_DungeonTools_createDungeonToolButtons = function() {
	if(CGMZ.DungeonTools.EnableUseButton) {
		this._CGMZ_dungeonTools_useButton = new Sprite_Button("dungeonToolUse");
		this._CGMZ_dungeonTools_useButton.x = Graphics.boxWidth - (this._CGMZ_dungeonTools_useButton.width + 4) * 2;
		this._CGMZ_dungeonTools_useButton.y = this.buttonY();
		this._CGMZ_dungeonTools_useButton.visible = false;
		this._CGMZ_dungeonTools_useButton.setClickHandler(this.CGMZ_DungeonTools_useButtonOnClick);
		this.addWindow(this._CGMZ_dungeonTools_useButton);
	}
	if(CGMZ.DungeonTools.EnableSelectButton) {
		this._CGMZ_dungeonTools_selectButton = new Sprite_Button("dungeonToolSelect");
		this._CGMZ_dungeonTools_selectButton.x = Graphics.boxWidth - (this._CGMZ_dungeonTools_selectButton.width + 4) * 2 - (this._CGMZ_dungeonTools_useButton ? this._CGMZ_dungeonTools_useButton.width + 4 : 0);
		this._CGMZ_dungeonTools_selectButton.y = this.buttonY();
		this._CGMZ_dungeonTools_selectButton.visible = false;
		this._CGMZ_dungeonTools_selectButton.setClickHandler(this.CGMZ_DungeonTools_selectButtonOnClick);
		this.addWindow(this._CGMZ_dungeonTools_selectButton);
	}
	if(CGMZ.DungeonTools.EnableCycleButton) {
		this._CGMZ_dungeonTools_cycleButton = new Sprite_Button("dungeonToolCycle");
		this._CGMZ_dungeonTools_cycleButton.x = Graphics.boxWidth - (this._CGMZ_dungeonTools_cycleButton.width + 4) * 2  - (this._CGMZ_dungeonTools_useButton ? this._CGMZ_dungeonTools_useButton.width + 4 : 0)  - (this._CGMZ_dungeonTools_selectButton ? this._CGMZ_dungeonTools_selectButton.width + 4 : 0);
		this._CGMZ_dungeonTools_cycleButton.y = this.buttonY();
		this._CGMZ_dungeonTools_cycleButton.visible = false;
		this._CGMZ_dungeonTools_cycleButton.setClickHandler(this.CGMZ_DungeonTools_cycleButtonOnClick);
		this.addWindow(this._CGMZ_dungeonTools_cycleButton);
	}
};
//-----------------------------------------------------------------------------
// Use button click handler method
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_DungeonTools_useButtonOnClick = function() {
	const tool = $cgmz.getDungeonTool($cgmz._currentDungeonTool);
	if(tool && tool._isEnabled) {
		$cgmzTemp.startUsingDungeonTool(tool);
	}
};
//-----------------------------------------------------------------------------
// Select button click handler method
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_DungeonTools_selectButtonOnClick = function() {
	SceneManager.push(CGMZ_Scene_DungeonTool);
};
//-----------------------------------------------------------------------------
// Cycle button click handler method
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_DungeonTools_cycleButtonOnClick = function() {
	$cgmz.cycleDungeonTool();
};
//-----------------------------------------------------------------------------
// Dungeon Tool buttons might be touched
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_SceneMap_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
Scene_Map.prototype.isAnyButtonPressed = function() {
    return alias_CGMZ_DungeonTools_SceneMap_isAnyButtonPressed.call(this) || this.CGMZ_DungeonTools_isAnyButtonPressed();
};
//-----------------------------------------------------------------------------
// Check if any dungeon tool buttons are pressed
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_DungeonTools_isAnyButtonPressed = function() {
    return (this._CGMZ_dungeonTools_useButton && this._CGMZ_dungeonTools_useButton.isPressed())
		|| (this._CGMZ_dungeonTools_selectButton && this._CGMZ_dungeonTools_selectButton.isPressed())
		|| (this._CGMZ_dungeonTools_cycleButton && this._CGMZ_dungeonTools_cycleButton.isPressed());
};
//-----------------------------------------------------------------------------
// Also update dungeon tool buttons
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    alias_CGMZ_DungeonTools_SceneMap_update.call(this);
	this.CGMZ_updateDungeonToolButtons();
};
//-----------------------------------------------------------------------------
// Update dungeon tool buttons
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_updateDungeonToolButtons = function() {
    if (this._CGMZ_dungeonTools_useButton) {
        const buttonEnabled = this.CGMZ_isDungeonToolUseButtonEnabled();
        if (buttonEnabled !== this._CGMZ_dungeonTools_useButton.visible) {
            this._CGMZ_dungeonTools_useButton.visible = buttonEnabled;
        }
    }
	if (this._CGMZ_dungeonTools_selectButton) {
        const buttonEnabled = this.CGMZ_isDungeonToolSelectButtonEnabled();
        if (buttonEnabled !== this._CGMZ_dungeonTools_selectButton.visible) {
            this._CGMZ_dungeonTools_selectButton.visible = buttonEnabled;
        }
    }
	if (this._CGMZ_dungeonTools_cycleButton) {
        const buttonEnabled = this.CGMZ_isDungeonToolCycleButtonEnabled();
        if (buttonEnabled !== this._CGMZ_dungeonTools_cycleButton.visible) {
            this._CGMZ_dungeonTools_cycleButton.visible = buttonEnabled;
        }
    }
};
//-----------------------------------------------------------------------------
// Check if dungeon tool use button should display
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_isDungeonToolUseButtonEnabled = function() {
	const tool = $cgmz.getDungeonTool($cgmz._currentDungeonTool);
	const hasAccess = !CGMZ.DungeonTools.ToolAccessSwitch || $gameSwitches.value(CGMZ.DungeonTools.ToolAccessSwitch);
	if(hasAccess && tool && tool._isEnabled) {
		return $cgmzTemp.canUseDungeonTool(tool);
	}
    return false;
};
//-----------------------------------------------------------------------------
// Check if dungeon tool select button should display
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_isDungeonToolSelectButtonEnabled = function() {
	return !CGMZ.DungeonTools.ToolAccessSwitch || $gameSwitches.value(CGMZ.DungeonTools.ToolAccessSwitch);
};
//-----------------------------------------------------------------------------
// Check if dungeon tool cycle button should display
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_isDungeonToolCycleButtonEnabled = function() {
	return !CGMZ.DungeonTools.ToolAccessSwitch || $gameSwitches.value(CGMZ.DungeonTools.ToolAccessSwitch);
};
//-----------------------------------------------------------------------------
// Also hide dungeon tool buttons
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_SceneMap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	this.CGMZ_DungeonTools_hideButtons();
    alias_CGMZ_DungeonTools_SceneMap_terminate.call(this);
};
//-----------------------------------------------------------------------------
// Hide the dungeon tool buttons
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_DungeonTools_hideButtons = function() {
    if(this._CGMZ_dungeonTools_useButton) this._CGMZ_dungeonTools_useButton.visible = false;
	if(this._CGMZ_dungeonTools_selectButton) this._CGMZ_dungeonTools_selectButton.visible = false;
	if(this._CGMZ_dungeonTools_cycleButton) this._CGMZ_dungeonTools_cycleButton.visible = false;
};
//=============================================================================
// Sprite_Button
//-----------------------------------------------------------------------------
// Add dungeon tool buttons
//=============================================================================
//-----------------------------------------------------------------------------
// If undefined, check if dungeon tool button and return expected results
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_SpriteButton_buttonData = Sprite_Button.prototype.buttonData;
Sprite_Button.prototype.buttonData = function() {
    const data = alias_CGMZ_DungeonTools_SpriteButton_buttonData.call(this);
	if(data) return data;
	const dungeonToolButtonTable = {
		dungeonToolUse: { x: CGMZ.DungeonTools.UseToolButtonOffset, w: CGMZ.DungeonTools.UseToolButtonWidth },
		dungeonToolSelect: { x: CGMZ.DungeonTools.SelectToolButtonOffset, w: CGMZ.DungeonTools.SelectToolButtonWidth },
		dungeonToolCycle: { x: CGMZ.DungeonTools.CycleToolButtonOffset, w: CGMZ.DungeonTools.CycleToolButtonWidth }
	};
	return dungeonToolButtonTable[this._buttonType];
};