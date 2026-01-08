/*
 * Copyright (c) 2025 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kdworkshop.net/>
 *
 *
 */

/*:
 * @plugindesc (v.1.2)[PRO] Fog Of War on Map
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/fog-of-war
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * This plugin add fog of war on map
 *
 * For activate plugin on certain map, add <PFOG> in map Note section
 * (not works on maps without Note for performance reasons)
 *
 * You can find guide on plugin webpage
 *
 * Script calls:
 * FOG_Refresh(); - refresh fog around player
 *   - use when you change variable with player fog open radius

 * FOG_OpenInPoint(X, Y, RADIUS); - open fog in certain point on map
 *    - example: FOG_OpenInPoint(3, 4, 3);

 * FOG_Reset(MAP_ID); - reset fog for certain map.
 *    - use for create fog of war again
 *    - [PRO only] use for clear fog saved state if player never return to
 *  this map. Recommended for reduce savefile size!
 *
 * Plugin not have plugin commands
 * 
 * ---------------------------------------------------------------------------
  *
 * If you like my Plugins, want more and offten updates,
 * please support me on Patreon!
 * 
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 *
  *
 * 

 * @param resetFog:b
 * @type boolean
 * @text Reset Fog?
 * @on Reset
 * @off No
 * @default false
 * @desc Reset (not save) fog of war state when player change (leave) map?
 * 
 * @param playerRadiusVarId:int
 * @type variable
 * @text Open fog radius
 * @default 0
 * @desc Variable ID that contains value of player open fog radius
 * 
 * @param fogRegions:intA
 * @type number[]
 * @text Regions for Fog
 * @min 1
 * @max 255
 * @default []
 * @desc Region's ID for Fog on map
 * 
 * @param fogIgnorePairs:structA
 * @parent fogRegions:intA
 * @type struct<FogIgnorePair>[]
 * @text Ignore Regions
 * @default []
 * @desc Region pairs that not open Fog on each other (read guide)
 * 
 * @param defFogSettingsGroup:struct
 * @text Default Fog Settings
 * @type struct<FogFragmentGroup>
 * @default {"regionId:i":"0","fogSettings:struct":"{\"color:color\":\"#000000\",\"opacity:i\":\"255\"}","fogSettingsOuter:struct":"{\"color:color\":\"#000000\",\"opacity:i\":\"230\"}","halfFadeSettings:struct":"{\"fadeStep:i\":\"4\",\"fadeSpeed:i\":\"1\"}","fullFadeSettings:struct":"{\"fadeStep:i\":\"6\",\"fadeSpeed:i\":\"1\"}"}
 * @desc Default fog fragments settings (for all region ID's)
 * 
 * @param fogFragmentsSettings:structA
 * @type struct<FogFragmentGroup>[]
 * @text Custom Fog Settings
 * @default []
 * @desc [PRO only] Custom fog fragments settings per certain Region ID
 * 
 * @param createOuterFog:b
 * @type boolean
 * @text Create Outer Fog?
 * @on Yes
 * @off No
 * @default true
 * @desc Create outer fog around single fog fragment?
 * 
 * @param networkSupport:b
 * @type boolean
 * @text Sync over network?
 * @on Yes
 * @off No
 * @default true
 * @desc [For Alpha NET Z][Multiplayer] Cleared areas will be synchronized between players (on the same map)
 * 
 * 
 * 
 */
/*~struct~FogIgnorePair:

 * @param regionId:i
 * @text Main Region ID
 * @type number
 * @min 1
 * @max 255
 * @desc Region ID from Ignored Regions ID's will NOT opened
 * @default 1

@param ignoredRegions:intA
@type number[]
@text Ignored Regions ID's
@min 1
@max 255
@default []
@desc Region's ID that will NOT open when player stay in Main Region ID
*/

/*~struct~FogFragment:
 * @param color:color
 * @text Color
 * @default #000000
 * @desc Fog fragment color in HEX

 * @param opacity:i
 * @text Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Fog fragment initial opacity
 * @default 255
*/

/*~struct~FogFade:
 * @param fadeStep:i
 * @text Step
 * @type number
 * @min 1
 * @max 255
 * @desc Fog fragment opacity change value per Speed
 * @default 4

 * @param fadeSpeed:i
 * @text Speed
 * @type number
 * @min 1
 * @max 60
 * @desc Change fog opacity by Step per Speed frame
 * @default 1
*/

/*~struct~FogFragmentGroup:
 * @param regionId:i
 * @text Region ID
 * @type number
 * @min 1
 * @max 255
 * @desc Region ID for that this settings is. Should be in Regions for Fog parameter
 * @default 1

 * @param fogSettings:struct
 * @text Fog
 * @type struct<FogFragment>
 * @desc Fog fragment settings
 * @default

 * @param fogSettingsOuter:struct
 * @text Outer Fog
 * @type struct<FogFragment>
 * @desc Outer fog fragment settings
 * @default

 * @param halfFadeSettings:struct
 * @text Half Open
 * @type struct<FogFade>
 * @desc Setting when fog starts open (for half state), near the open fog radius
 * @default

 * @param fullFadeSettings:struct
 * @text Full Open
 * @type struct<FogFade>
 * @desc Setting when fog starts open fully (and should disappear), in the open fog radius
 * @default
*/


// * MAIN

var Imported = Imported || {};
Imported.PKD_FOG = true;

var PKD_FOG = {};
PKD_FOG.version = 120;

PKD_FOG.link = function (library) {
    this[library.name] = library;
};

// * For parameters
PKD_FOG.PP = {};

// * For fog bitmaps
// * Битмапы для обоих цветов храняться в кэшэ и используются одни и теже
// * Так как не изменяются
PKD_FOG.CACHE = {};


(function(){



//build: 2 
var KDX;
(function (KDX) {
    /**
     * The version of the KDX Library.
     * @type {string}
     */
    KDX.Version = "0.1";
    /**
     * Checks if the RPG Maker version is MV.
     * @returns {boolean} True if the RPG Maker version is MV, otherwise false.
     */
    /* @ts-ignore */
    KDX.isMV = () => Utils.RPGMAKER_NAME.includes("MV");
    /**
     * Checks if the RPG Maker version is MZ.
     * @returns {boolean} True if the RPG Maker version is MZ, otherwise false.
     */
    KDX.isMZ = () => !KDX.isMV();
    /**
     * Checks if a value is not null and not undefined
     *
     * @param {any} value - The value to check.
     * @returns {boolean} True if the value is not null and not undefined
     */
    KDX.any = (value) => (value === null || value === undefined) ? false : true;
})(KDX || (KDX = {}));
var KArray;
(function (KArray) {
    /**
     * Deletes all occurrences of a specified item from an array.
     *
     * @template T - The type of elements in the array.
     * @param {T[]} array - The array from which to delete items.
     * @param {T} item - The item to delete from the array.
     * @returns {T[]} A new array with all occurrences of the specified item removed.
     */
    function deleteAll(array, item) {
        return array.filter((i) => i !== item);
    }
    KArray.deleteAll = deleteAll;
    /**
     * Returns a random item from an array.
     *
     * @template T - The type of elements in the array.
     * @param {T[]} array - The array from which to select a random item.
     * @returns {T} A random item from the array.
     */
    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    KArray.randomItem = randomItem;
    /**
     * Shuffles the elements of an array in place.
     *
     * @template T - The type of elements in the array.
     * @param {T[]} array - The array to shuffle.
     * @returns {T[]} The shuffled array.
     */
    function shuffle(array) {
        let currentIndex = array.length;
        let randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }
    KArray.shuffle = shuffle;
    /**
     * Finds an item in an array by a specified key and value.
     *
     * @template T - The type of elements in the array.
     * @param {T[]} array - The array to search.
     * @param {string} key - The key to match.
     * @param {any} value - The value to match.
     * @returns {T | null} The found item, or null if no item matches.
     */
    function getByKey(array, key, value) {
        try {
            return array.find((i) => i[key] === value);
        }
        catch (error) {
            console.warn(error);
        }
        return null;
    }
    KArray.getByKey = getByKey;
    /**
     * Finds an item in an array by its 'id' property.
     *
     * @template T - The type of elements in the array.
     * @param {T[]} array - The array to search.
     * @param {any} value - The value of the 'id' property to match.
     * @returns {T | null} The found item, or null if no item matches.
     */
    function getById(array, value) {
        return getByKey(array, "id", value);
    }
    KArray.getById = getById;
})(KArray || (KArray = {}));
var KNumber;
(function (KNumber) {
    /**
    * Clamps a number within a specified range.
    *
    * @param {number} value - The value to clamp.
    * @param {number} min - The minimum value.
    * @param {number} max - The maximum value.
    * @returns {number} The clamped value.
    */
    KNumber.clamp = (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    };
    /**
     * Generates a random number between the specified minimum and maximum values (inclusive).
     *
     * @param {number} min - The minimum value of the range.
     * @param {number} max - The maximum value of the range.
     * @returns {number} A random number between the minimum and maximum values.
     */
    KNumber.random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    /**
     * Checks if the given number is greater than zero.
     *
     * @param {number} number - The number to be checked.
     * @returns {boolean} `true` if the number is greater than zero, `false` otherwise.
     */
    KNumber.any = (number) => {
        if (number === null || number === undefined) {
            return false;
        }
        return number > 0;
    };
})(KNumber || (KNumber = {}));
var KString;
(function (KString) {
    /**
         * Generates a random string of the specified length.
         * @param {number} length - The length of the generated string.
         * @returns {string} The generated string.
         */
    KString.randomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    /**
     * Replaces all occurrences of a substring in a string with a specified replacement.
     *
     * @param {string} source - The source string.
     * @param {string} search - The substring to search for.
     * @param {string} replacement - The replacement string.
     * @returns {string} The modified string with all occurrences of the substring replaced.
     */
    KString.replaceAll = (source, search, replacement) => {
        return source.split(search).join(replacement);
    };
    /**
     * Checks if a string is not null, not undefined, and has a length greater than 0 (after trimming).
     *
     * @param {string} str - The string to check.
     * @returns {boolean} True if the string is not null, not undefined, and has a length greater than 0 (after trimming), otherwise false.
     */
    KString.any = (str) => {
        if (str === null || str === undefined) {
            return false;
        }
        // * For compatibility with old verions of KDCore library
        if (typeof str === "boolean") {
            return str == true;
        }
        try {
            if (typeof str == "string") {
                return str.length > 0 || str.trim().length > 0;
            }
            else {
                return true;
            }
        }
        catch (error) {
            console.warn(error);
            return false;
        }
    };
    /**
     * Checks if the provided value is of type string.
     *
     * @param value - The value to check.
     * @returns `true` if the value is a string, otherwise `false`.
     */
    KString.isString = (value) => {
        return typeof value === "string";
    };
})(KString || (KString = {}));
(function () {
    // * RPG Maker MV only
    // * В версии RPG Maker MV не отслеживаются координаты курсора, если мы просто двигаем мышкой
    // * Данный код исправляет эту проблему, чтобы можно было отслеживать координаты курсора, даже если мышь не нажата
    if (!Utils.RPGMAKER_NAME.includes("MV"))
        return;
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ TouchInput.ts
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    (() => {
        //@[DEFINES]
        const _ = TouchInput;
        //@[ALIAS]
        /*@ts-ignore*/
        const ALIAS___onMouseMove = _._onMouseMove;
        _['_onMouseMove'] = function (event) {
            ALIAS___onMouseMove.call(this, event);
            let x = Graphics.pageToCanvasX(event.pageX);
            let y = Graphics.pageToCanvasY(event.pageY);
            if (Graphics.isInsideCanvas(x, y)) {
                this['_x'] = x;
                this['_y'] = y;
            }
        };
    })();
    // ■ END TouchInput.ts
    //---------------------------------------------------------------------------
})();
var KAudio;
(function (KAudio) {
    /**
     * Plays a sound effect (SE) with the specified parameters.
     *
     * @param name - The name of the sound effect file to play.
     * @param pitch - The pitch of the sound effect. Defaults to 100.
     * @param volume - The volume of the sound effect. Defaults to 100.
     *
     * @remarks
     * If the provided name is empty or invalid, the function will not attempt to play the sound effect.
     */
    function PlaySE(name, pitch = 100, volume = 100) {
        if (!KString.any(name))
            return;
        let audioData = {
            name: name,
            pitch: pitch,
            volume: volume,
            pan: 0,
            pos: 0
        };
        AudioManager.playStaticSe(audioData);
    }
    KAudio.PlaySE = PlaySE;
})(KAudio || (KAudio = {}));
var KGameEvents;
(function (KGameEvents) {
    // * Return whole line that contains the commentCode
    /**
     * Retrieves a specific comment line from a game event based on the provided comment code.
     *
     * @param commentCode - The code to search for within the comment lines.
     * @param event - The game event from which to retrieve the comment line.
     * @returns The comment line containing the specified code, or `null` if not found.
     *
     * @remarks
     * This function searches through the event's page list to find a comment line that includes the specified comment code.
     * It looks for comment codes 108 and 408, which are typically used for comments in RPG Maker events.
     * If the event or its page list is not available, or if no matching comment line is found, the function returns `null`.
     *
     * @throws Will log a warning to the console if an error occurs during the search process.
     */
    function GetCommentLine(commentCode, event) {
        try {
            if (!event)
                return null;
            let page = event.page();
            if (!page)
                return null;
            let list = page.list;
            if (!list)
                return null;
            for (let i = 0; i < list.length; i++) {
                if (!list[i])
                    continue;
                if (list[i].code === 108 || list[i].code === 408) {
                    let line = list[i].parameters[0];
                    if (line && line.includes(commentCode)) {
                        return line;
                    }
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
        return null;
    }
    KGameEvents.GetCommentLine = GetCommentLine;
    // * For commentCode:value
    /**
     * Retrieves the value associated with a specific comment code from a game event.
     * Pattern commentCode:value
     *
     * @param commentCode - The code of the comment to search for.
     * @param event - The game event object to search within.
     * @returns The value associated with the comment code, or null if not found.
     */
    function GetCommentCodeValue(commentCode, event) {
        try {
            let line = GetCommentLine(commentCode, event);
            if (!line)
                return null;
            let value = line.split(":")[1].trim();
            return value;
        }
        catch (error) {
            console.warn(error);
        }
        return null;
    }
    KGameEvents.GetCommentCodeValue = GetCommentCodeValue;
})(KGameEvents || (KGameEvents = {}));
var KGameItems;
(function (KGameItems) {
    /**
     * Checks if the given object has a meta property with the specified symbol.
     *
     * @param symbol - The symbol to check for in the meta property.
     * @param obj - The object to check for the meta property.
     * @returns `true` if the object has a meta property with the specified symbol, otherwise `false`.
     * @throws Will log a warning to the console if an error occurs during the check.
     */
    function IsHaveMeta(symbol, obj) {
        try {
            return obj && obj.meta && obj.meta.hasOwnProperty(symbol);
        }
        catch (error) {
            console.warn(error);
        }
        return false;
    }
    KGameItems.IsHaveMeta = IsHaveMeta;
    /**
     * Retrieves the metadata associated with a given symbol from an object.
     *
     * @param symbol - The key for the metadata to retrieve.
     * @param obj - The object containing the metadata.
     * @param defaultValue - The value to return if the symbol is not present or an error occurs.
     * @returns The metadata value. If the symbol is not present or an error occurs, returns the default value.
     */
    function GetMeta(symbol, obj, defaultValue = null) {
        try {
            if (!IsHaveMeta(symbol, obj))
                return defaultValue;
            return obj.meta[symbol];
        }
        catch (error) {
            console.warn(error);
        }
        return defaultValue;
    }
    KGameItems.GetMeta = GetMeta;
    /**
     * Retrieves the metadata associated with the given symbol from the specified object
     * and converts it to a number.
     *
     * @param symbol - The key for the metadata to retrieve.
     * @param obj - The object from which to retrieve the metadata.
     * @param defaultValue - The value to return if the symbol is not present or an error occurs.
     * @returns The metadata value as a number. If the symbol is not present or an error occurs, returns the default value.
     */
    function GetMetaAsNumber(symbol, obj, defaultValue = 0) {
        try {
            return Number(GetMeta(symbol, obj, defaultValue));
        }
        catch (error) {
            console.warn(error);
        }
        return defaultValue;
    }
    KGameItems.GetMetaAsNumber = GetMetaAsNumber;
})(KGameItems || (KGameItems = {}));
var KInput;
(function (KInput) {
    /**
     * Simulates a virtual click on the specified button.
     *
     * @param buttonName - The name of the button to simulate a click on.
     *
     * This function checks if the environment is MV (RPG Maker MV) and if the `Input.virtualClick` method is not already extended.
     * If both conditions are met, it extends the MV Input system to support virtual clicks.
     *
     * @remarks
     * The function uses a TypeScript ignore comment to bypass type checking for the `Input.virtualClick` method.
     */
    function VirtualClick(buttonName) {
        try {
            if (KDX.isMV() && !KDX.any(Input['virtualClick'])) {
                _extendMvInput();
            }
            /* @ts-ignore */
            Input.virtualClick(buttonName);
        }
        catch (error) {
            console.warn(error);
        }
    }
    KInput.VirtualClick = VirtualClick;
    function IsCancel() {
        return Input.isTriggered('cancel') || TouchInput.isCancelled();
    }
    KInput.IsCancel = IsCancel;
    function _extendMvInput() {
        //╒═════════════════════════════════════════════════════════════════════════╛
        // ■ Input.ts
        //╒═════════════════════════════════════════════════════════════════════════╛
        //---------------------------------------------------------------------------
        (() => {
            //@[DEFINES]
            const _ = Input;
            _['virtualClick'] = function (buttonName) {
                this._virtualButton = buttonName;
            };
            //@[ALIAS]
            const ALIAS__clear = _.clear;
            _.clear = function () {
                ALIAS__clear.call(this);
                this._virtualButton = null;
            };
            //@[ALIAS]
            const ALIAS__update = _.update;
            _.update = function () {
                ALIAS__update.call(this);
                try {
                    if (KString.any(this._virtualButton)) {
                        this._latestButton = this._virtualButton;
                        this._pressedTime = 0;
                        this._virtualButton = null;
                    }
                }
                catch (error) {
                    console.warn(error);
                }
            };
        })();
        // ■ END Input.ts
        //---------------------------------------------------------------------------
    }
    function _extend() {
        // * If Input is extended by KDCore or KDX
        if (KDX.any(Input['KeyMapperPKD']))
            return;
        try {
            let KeyMapperPKD = {};
            //Numbers
            for (let i = 48; i <= 57; i++) {
                KeyMapperPKD[i] = String.fromCharCode(i);
            }
            //Letters Upper
            for (let i = 65; i <= 90; i++) {
                KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
            }
            //Letters Lower
            for (let i = 97; i <= 122; i++) {
                KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
            }
            Input['KeyMapperPKD'] = KeyMapperPKD;
        }
        catch (error) {
            console.warn(error);
        }
    }
    function _onKeyDown(event) {
        try {
            _extend();
            /* @ts-ignore */
            let symbol = Input.KeyMapperPKD[event.keyCode];
            if (symbol) {
                /* @ts-ignore */
                Input._currentState[symbol] = true;
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    KInput._onKeyDown = _onKeyDown;
    function _onKeyUp(event) {
        try {
            _extend();
            /* @ts-ignore */
            let symbol = Input.KeyMapperPKD[event.keyCode];
            if (symbol) {
                /* @ts-ignore */
                Input._currentState[symbol] = false;
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    KInput._onKeyUp = _onKeyUp;
})(KInput || (KInput = {}));
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Input.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Input;
    //@[ALIAS]
    /* @ts-ignore */
    const ALIAS___onKeyDown = _._onKeyDown;
    /* @ts-ignore */
    _._onKeyDown = function (event) {
        let t = this;
        ALIAS___onKeyDown.call(this, event);
        try {
            if (Input.keyMapper[event.keyCode]) {
                return;
            }
            KInput._onKeyDown(event);
        }
        catch (error) {
            console.warn(error);
        }
    };
    //@[ALIAS]
    /* @ts-ignore */
    const ALIAS___onKeyUp = _._onKeyUp;
    /* @ts-ignore */
    _._onKeyUp = function (event) {
        let t = this;
        ALIAS___onKeyUp.call(this, event);
        try {
            if (Input.keyMapper[event.keyCode]) {
                return;
            }
            KInput._onKeyUp(event);
        }
        catch (error) {
            console.warn(error);
        }
    };
})();
// ■ END Input.ts
//---------------------------------------------------------------------------
var KPoint;
(function (KPoint) {
    /**
     * Clones a given Point object.
     *
     * @param {IPoint} p - The Point object to be cloned.
     * @returns {IPoint} A new Point object with the same x and y coordinates as the input.
     */
    function Clone(p) {
        return new PIXI.Point(p.x, p.y);
    }
    KPoint.Clone = Clone;
    /**
     * Checks if two Point objects have the same coordinates.
     *
     * @param {IPoint} p1 - The first Point object.
     * @param {IPoint} p2 - The second Point object.
     * @returns {boolean} True if both points have the same coordinates, false otherwise.
     */
    function IsSame(p1, p2) {
        return p1.x == p2.x && p1.y == p2.y;
    }
    KPoint.IsSame = IsSame;
    /**
     * Converts a Point object to a string representation.
     *
     * @param {IPoint} p - The Point object to be converted.
     * @returns {string} A string representation of the Point object.
     */
    function ToPrint(p) {
        return `(${p.x}, ${p.y})`;
    }
    KPoint.ToPrint = ToPrint;
    /**
     * Converts a Point object from screen coordinates to map coordinates.
     *
     * @param {IPoint} p - The Point object in screen coordinates.
     * @returns {IPoint} A new Point object in map coordinates.
     */
    function ConvertFromScreenToMap(p) {
        return new PIXI.Point($gameMap.canvasToMapX(p.x), $gameMap.canvasToMapY(p.y));
    }
    KPoint.ConvertFromScreenToMap = ConvertFromScreenToMap;
    /**
     * Converts a Point object from map coordinates to screen coordinates.
     *
     * @param {IPoint} p - The Point object in map coordinates.
     * @returns {IPoint} A new Point object in screen coordinates.
     */
    function ConvertFromMapToScreen(p) {
        let x = $gameMap.adjustX(p.x);
        let tw = $gameMap.tileWidth();
        x = Math.round(x * tw + tw / 2);
        let y = $gameMap.adjustY(p.y);
        let th = $gameMap.tileHeight();
        y = Math.round(y * th + th);
        return new PIXI.Point(x, y);
    }
    KPoint.ConvertFromMapToScreen = ConvertFromMapToScreen;
    /**
     * Rounds the coordinates of a Point object to the nearest integer.
     *
     * @param {IPoint} p - The Point object to be rounded.
     * @returns {IPoint} A new Point object with rounded coordinates.
     */
    function Round(p) {
        return new PIXI.Point(Math.round(p.x), Math.round(p.y));
    }
    KPoint.Round = Round;
    /**
     * Calculates the distance between two Point objects.
     *
     * @param {IPoint} p1 - The first Point object.
     * @param {IPoint} p2 - The second Point object.
     * @returns {number} The distance between the two points.
     */
    function Distance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }
    KPoint.Distance = Distance;
    /**
     * Checks if a Point object is inside a given rectangle.
     *
     * @param {IPoint} p - The Point object to check.
     * @param {PIXI.Rectangle} rect - The rectangle to check against.
     * @returns {boolean} True if the point is inside the rectangle, false otherwise.
     */
    function IsInsideRect(p, rect) {
        return rect.contains(p.x, p.y);
    }
    KPoint.IsInsideRect = IsInsideRect;
    /**
     * Checks if a Point object is inside a given circle.
     *
     * @param {IPoint} p - The Point object to check.
     * @param {IPoint} center - The center of the circle.
     * @param {number} radius - The radius of the circle.
     * @returns {boolean} True if the point is inside the circle, false otherwise.
     */
    function IsInsideCircle(p, center, radius) {
        return Distance(p, center) <= radius;
    }
    KPoint.IsInsideCircle = IsInsideCircle;
})(KPoint || (KPoint = {}));
var KUtils;
(function (KUtils) {
    /**
     * Calls a specified callback function after a given delay.
     *
     * @param callback - The function to be called after the delay.
     * @param delay - The delay in milliseconds before the callback is executed.
     * @returns The ID of the timeout, which can be used to cancel the timeout with clearTimeout.
     *
     * @throws Will log a warning to the console if the callback throws an error.
     */
    function CallWithDelay(callback, delay) {
        if (!callback)
            return;
        return setTimeout(() => {
            try {
                callback();
            }
            catch (error) {
                console.warn(error);
            }
        }, delay);
    }
    KUtils.CallWithDelay = CallWithDelay;
    function IsMapScene() {
        return SceneManager._scene instanceof Scene_Map;
    }
    KUtils.IsMapScene = IsMapScene;
    function IsBattleScene() {
        return SceneManager._scene instanceof Scene_Battle;
    }
    KUtils.IsBattleScene = IsBattleScene;
})(KUtils || (KUtils = {}));
var KDX;
(function (KDX) {
    class ParamLoader {
        /**
         * Creates an instance of ParamLoader.
         * @param _pluginName The name of the plugin.
         */
        constructor(_pluginName) {
            this._pluginName = _pluginName;
            this._paramsRaw = this.getPluginParametersByRoot(this._pluginName);
            this._params = KDX.ParamParser.ParseParameters(this._paramsRaw, this._pluginName);
        }
        /**
         * Gets the plugin parameters by the root name.
         * @param rootName The root name of the plugin.
         * @returns The plugin parameters if found, otherwise calls PluginManager.parameters.
         */
        getPluginParametersByRoot(rootName) {
            /* @ts-ignore */
            let allParametersRaw = PluginManager._parameters;
            for (const property in allParametersRaw) {
                if (allParametersRaw.hasOwnProperty(property)) {
                    const pluginParameters = allParametersRaw[property];
                    if (pluginParameters[rootName]) {
                        return pluginParameters;
                    }
                }
            }
            return PluginManager.parameters(rootName);
        }
        /**
         * Checks if the parameters are loaded.
         * @returns True if the parameters are loaded, otherwise false.
         */
        isLoaded() {
            return !!this._paramsRaw && this._paramsRaw.hasOwnProperty(this._pluginName);
        }
        /**
         * Checks if a parameter exists.
         * @param paramName The name of the parameter.
         * @returns True if the parameter exists, otherwise false.
         */
        isHasParameter(paramName) {
            return this._params.hasOwnProperty(paramName);
        }
        /**
         * Gets the value of a parameter.
         * @param paramName The name of the parameter.
         * @param def The default value if the parameter is not found.
         * @returns The value of the parameter or the default value.
         */
        getParam(paramName, def) {
            if (this.isHasParameter(paramName)) {
                const value = this._params[paramName];
                if (value != null)
                    return value;
            }
            return def;
        }
    }
    KDX.ParamLoader = ParamLoader;
})(KDX || (KDX = {}));
var KDX;
(function (KDX) {
    let ParamParser;
    (function (ParamParser) {
        let _ppNameToParseNext = "";
        let _pluginName = "";
        /**
         * Parses the parameters from the plugin.
         * @param paramSet The raw parameter set.
         * @returns The parsed parameters.
         */
        function ParseParameters(paramSet, _pluginNameForInfo) {
            _pluginName = _pluginNameForInfo;
            const params = {};
            for (const key in paramSet) {
                if (paramSet.hasOwnProperty(key)) {
                    _ppNameToParseNext = key;
                    const clearKey = parseKey(key);
                    const typeKey = parseKeyType(key);
                    params[clearKey] = parseParamItem(typeKey, paramSet[key]);
                }
            }
            return params;
        }
        ParamParser.ParseParameters = ParseParameters;
        /**
         * Parses the key to remove the type.
         * @param keyRaw The raw key.
         * @returns The parsed key.
         */
        function parseKey(keyRaw) {
            return keyRaw.split(":")[0];
        }
        /**
         * Parses the key to get the type.
         * @param keyRaw The raw key.
         * @returns The type of the key.
         */
        function parseKeyType(keyRaw) {
            return keyRaw.split(":")[1];
        }
        /**
         * Writes a detailed error message to the console.
         */
        function writeDetailedError() {
            try {
                if (!KString.any(_ppNameToParseNext))
                    return;
                console.warn(`Please, check Plugin Parameter ${_ppNameToParseNext} in plugin ${_pluginName}`);
            }
            catch (e) {
                console.warn(e);
            }
        }
        /**
         * Parses a parameter item based on its type.
         * @param type The type of the parameter.
         * @param item The parameter item.
         * @returns The parsed parameter item.
         */
        function parseParamItem(type, item) {
            if (!type)
                return item;
            try {
                switch (type) {
                    case "int":
                    case "i":
                        return Number(item);
                    case "intA":
                        return parseArray(item, "int");
                    case "bool":
                    case "b":
                    case "e":
                        return eval(item);
                    case "struct":
                    case "s":
                        return parseStruct(item);
                    case "structA":
                        return parseStructArray(item);
                    case "str":
                        return item;
                    case "strA":
                        return parseArray(item, "str");
                    case "note":
                        return parseNote(item);
                    case "json":
                    case "j":
                        return parseJson(item);
                    case "jA":
                        return parseArray(item, "json");
                    default:
                        return item;
                }
            }
            catch (e) {
                console.warn(e);
                writeDetailedError();
                return item;
            }
        }
        /**
         * Parses an array of items.
         * @param items The items to parse.
         * @param type The type of the items.
         * @returns The parsed array.
         */
        function parseArray(items, type) {
            try {
                const elements = [];
                const parsed = JsonEx.parse(items);
                for (const p of parsed) {
                    try {
                        elements.push(parseParamItem(type, p));
                    }
                    catch (e) {
                        console.warn(e);
                    }
                }
                return elements;
            }
            catch (e) {
                console.warn(e);
                writeDetailedError();
                return [];
            }
        }
        /**
         * Parses a struct item.
         * @param item The item to parse.
         * @returns The parsed struct.
         */
        function parseStruct(item) {
            try {
                if (!item || !KString.any(item))
                    return null;
                const parsed = JsonEx.parse(item);
                return parsed ? ParseParameters(parsed, _pluginName) : null;
            }
            catch (e) {
                console.warn(e);
                writeDetailedError();
                return null;
            }
        }
        /**
         * Parses an array of struct items.
         * @param items The items to parse.
         * @returns The parsed array of structs.
         */
        function parseStructArray(items) {
            try {
                const elements = [];
                const parsed = JsonEx.parse(items);
                for (const p of parsed) {
                    try {
                        elements.push(parseStruct(p));
                    }
                    catch (e) {
                        console.warn(e);
                        writeDetailedError();
                    }
                }
                return elements;
            }
            catch (e) {
                console.warn(e);
                writeDetailedError();
                return [];
            }
        }
        /**
         * Parses a note item.
         * @param item The item to parse.
         * @returns The parsed note.
         */
        function parseNote(item) {
            try {
                const parsed = JsonEx.parse(item);
                return parsed ? parsed : item;
            }
            catch (e) {
                console.warn(e);
                writeDetailedError();
                return item;
            }
        }
        /**
         * Parses a JSON item.
         * @param item The item to parse.
         * @returns The parsed JSON.
         */
        function parseJson(item) {
            try {
                const json = {};
                const parsed = JsonEx.parse(item);
                const elements = parsed.split('\n');
                for (const element of elements) {
                    const cx = `{${element}}`;
                    try {
                        const item = JsonEx.parse(cx);
                        for (const key in item) {
                            if (item.hasOwnProperty(key)) {
                                json[key] = item[key];
                            }
                        }
                    }
                    catch (e) {
                        console.warn(`Parameter ${element} has syntax errors, ignored`);
                    }
                }
                return json;
            }
            catch (e) {
                console.warn(e);
                writeDetailedError();
                return null; // To return default value
            }
        }
    })(ParamParser = KDX.ParamParser || (KDX.ParamParser = {}));
})(KDX || (KDX = {}));
var KDX;
(function (KDX) {
    class TimedUpdate {
        /**
         * Creates an instance of TimedUpdate.
         * @param interval The interval in frames.
         * @param method The method to call on update.
         */
        constructor(interval, method) {
            this.interval = interval;
            this.method = method;
            this._timer = 0;
            this._once = false;
        }
        /**
         * Sets the number of repeats and the callback after completion.
         * @param repeatsLeft The number of repeats left.
         * @param afterCallback The callback to call after completion.
         */
        setAfter(repeatsLeft, afterCallback) {
            this._repeatsLeft = repeatsLeft;
            this._afterCallback = afterCallback;
        }
        /**
         * Updates the timer and calls the method if the interval is reached.
         */
        update() {
            if (this.interval == null)
                return;
            if (this._timer++ >= this.interval) {
                this.call();
                this._timer = 0;
                if (this._repeatsLeft != null) {
                    this._repeatsLeft -= 1;
                    if (this._repeatsLeft <= 0) {
                        if (this._afterCallback)
                            this._afterCallback();
                    }
                }
                if (this._once)
                    this.stop();
            }
        }
        /**
         * Sets the update to be called only once.
         */
        once() {
            this._once = true;
        }
        /**
         * Sets the method to call on update.
         * @param method The method to call on update.
         */
        onUpdate(method) {
            this.method = method;
        }
        /**
         * Stops the update.
         */
        stop() {
            this.interval = null;
        }
        /**
         * Checks if the update is still active.
         * @returns True if the update is active, otherwise false.
         */
        isAlive() {
            return this.interval != null;
        }
        /**
         * Randomizes the interval within a given range.
         * @param min The minimum value to add to the interval.
         * @param max The maximum value to add to the interval.
         */
        applyTimeRange(min, max) {
            if (!this.isAlive())
                return;
            const value = KNumber.random(min, max);
            this.interval += value;
        }
        /**
         * Calls the method.
         */
        call() {
            try {
                if (this.method)
                    this.method();
            }
            catch (e) {
                console.warn(e);
            }
        }
    }
    KDX.TimedUpdate = TimedUpdate;
})(KDX || (KDX = {}));




// Generated by CoffeeScript 2.6.1



// Generated by CoffeeScript 2.6.1
// * Глобальный менеджер управления (создания) тумана на карте

//@[GLOBAL]
window.FOGManager = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ FOGManager.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = FOGManager;
  // * Подходящая карта для тумана? (Есть слой и Note)
  _.isValidMap = function() {
    return $gameMap.isMapWithFogOfWar() && this.isFogLayerExists();
  };
  // * Создан ли туман на данной карте?
  _.isFogLayerExists = function() {
    return this._fgFogLayer != null;
  };
  // * Получить значения радиуса открытия тумана вокруг игрока
  _.getPlayerFogOpenRadius = function() {
    var value;
    value = $gameVariables.value(PKD_FOG.PP.getPlayerOpenRadiusVarId());
    if (value <= 0) {
      // * Стандартное значение, если переменная не задана
      value = 2;
    }
    return value;
  };
  // * Создать туман на карте (при загрузке карты)
  _.createFogOnMap = function() {
    var storedFogData;
    this._fogCellsCache = [];
    this._fogCellsByRadiusCache = {};
    storedFogData = $gameMap.fGetFogData();
    if (storedFogData != null) {
      this._createFogFromStoredData(storedFogData);
    } else {
      //console.time("FOGManager._createNewFogOnMap")
      this._createNewFogOnMap();
    }
  };
  // * Пересоздать туман на текущей карте
  //console.timeEnd("FOGManager._createNewFogOnMap")
  _.reCreateFogOnCurrentMap = function() {
    var k, len, ref, spr;
    if (!this.isValidMap()) {
      return;
    }
    // * Удаляем сохранённое состояние
    $gameMap.fClearFogDataForMap($gameMap.mapId());
    ref = this._getAllFragments();
    for (k = 0, len = ref.length; k < len; k++) {
      spr = ref[k];
      // * Удаляем спрайты
      if (spr != null) {
        spr._destroy();
      }
    }
    // * Создаём заного
    this.createFogOnMap();
    // * Обновляем для игрока
    this.refreshFogOnMapForPlayer();
  };
  // * Пересчитать открытие тумана на карте (где находится игрок)
  _.refreshFogOnMapForPlayer = function() {
    if (!this.isFogLayerExists()) {
      return;
    }
    this.openFogInPointForPlayer();
  };
  // * Регион имеет туман?
  _.isRegionWithFog = function(regionId) {
    return PKD_FOG.PP.getFogRegions().contains(regionId);
  };
  
  // * Открыть туман в точке карты в пределах радиуса
  _.openFogInPoint = function(x, y, radius = 3) {
    if (radius <= 0) {
      return;
    }
    // * Полностью открыть туман в радиусе (ifFull = true)
    this._openFogFragmentsFromPoint(x, y, radius, true);
    // * Приоткрыть (на половину) туман в радиусе (isFull = false)
    this._openFogFragmentsFromPoint(x, y, radius + 1, false);
  };
  // * Открыть туман где стоит игрок
  _.openFogInPointForPlayer = function() {
    var radius, x, y;
    ({x, y} = $gamePlayer);
    radius = this.getPlayerFogOpenRadius();
    this.openFogInPoint(x, y, radius);
    if (PKD_FOG.PP.isSyncFogOverNetwork()) {
      this._openFogFragmentsForNetwork(x, y, radius);
    }
  };
  // * Установить слой (для быстрого прямого доступа)
  _.setupLayer = function(_fgFogLayer) {
    this._fgFogLayer = _fgFogLayer;
    return this._fogCellsCache = [];
  };
  _.convertFogCellIndexToPoint = function(index) {
    return FogUtils.convertIndexToCell(index, $gameMap.width());
  };
  _.convertFogCellPointToIndex = function(x, y) {
    return FogUtils.convertCellToIndex(x, y, $gameMap.width());
  };
  // * Когда загрузилась карта
  _.onMapLoaded = function() {
    if (!this.isValidMap()) {
      return;
    }
    this.createFogOnMap();
    setTimeout((function() {
      var e;
      try {
        FOGManager.refreshFogOnMapForPlayer();
        if (PKD_FOG.PP.isSyncFogOverNetwork()) {
          return FOGManager.restoreNetworkCachedFog();
        }
      } catch (error) {
        e = error;
        return console.warn(e);
      }
    }), 100);
  };
  // * Когда выходим из сцены карты
  _.onMapStop = function() {
    if (!this.isValidMap()) {
      return;
    }
    this._saveFogForMap();
  };
})();

(function() {  // ■ END FOGManager.coffee
  //---------------------------------------------------------------------------

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ FOGManager PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = window.FOGManager;
  _._createFogFromStoredData = function(storedFogData) {
    var colorId, e, index, k, len, opacity, regionId, saveFragment, spr, x, y;
    if (storedFogData == null) {
      return;
    }
    for (k = 0, len = storedFogData.length; k < len; k++) {
      saveFragment = storedFogData[k];
      if (saveFragment == null) {
        continue;
      }
      try {
        ({colorId, opacity, regionId, index} = saveFragment);
        if (saveFragment['point'] != null) {
          x = point[0] / $gameMap.tileWidth();
          y = point[1] / $gameMap.tileHeight();
        } else {
          [x, y] = this.convertFogCellIndexToPoint(index);
        }
        spr = this._createFogFragment(regionId, x, y);
        spr.setMapPosition(x, y);
        if (colorId === 1) {
          spr.setColorOuter();
        }
        spr.opacity = opacity;
      } catch (error) {
        e = error;
        console.warn(e);
      }
    }
  };
  _._createNewFogOnMap = function() {
    var i, j, k, l, ref, ref1, regionId, spr;
    for (i = k = 0, ref = $gameMap.width(); (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      for (j = l = 0, ref1 = $gameMap.height(); (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        regionId = $gameMap.regionId(i, j);
        if (this.isRegionWithFog(regionId)) {
          spr = this._createFogFragment(regionId, i, j);
          spr.setMapPosition(i, j);
        }
      }
    }
    if (PKD_FOG.PP.isCreateOuterFog()) {
      // * Создать внешние клетки тумана
      this._createFogOutline();
    }
  };
  // * Создать фрагмент тумана и вернуть спрайт
  _._createFogFragment = function(regionId, x, y) {
    var index, spr;
    spr = new Sprite_FogFragment(regionId);
    index = this.convertFogCellPointToIndex(x, y);
    spr._index = index;
    this._fogCellsCache[index] = spr;
    this._addFogFragmentToMap(spr);
    return spr;
  };
  _._addFogFragmentToMap = function(spr) {
    return this._fgFogLayer.addChild(spr);
  };
  // * Создать соседние (второй вариант) клетки тумана
  _._createFogOutline = function() {
    var k, len, ref, spr;
    ref = this._getAllFragments();
    for (k = 0, len = ref.length; k < len; k++) {
      spr = ref[k];
      this._createNeibFogOutlinePoints(spr._index);
    }
  };
  _._getFogFragmentByIndex = function(index) {
    if (index >= 0) {
      return this._fogCellsCache[index];
    }
    return null;
  };
  // * Создать соседние ячейки к данной ячейке (по координатам)
  _._createNeibFogOutlinePoints = function(index) {
    var newPoint, newPointIndex, regionId, spr, x, y;
    spr = this._getFogFragmentByIndex(index);
    if (spr == null) {
      return;
    }
    regionId = spr.getRegion();
    [x, y] = this.convertFogCellIndexToPoint(index);
    // * RIGHT
    newPoint = [x + 1, y];
    newPointIndex = this.convertFogCellPointToIndex(newPoint[0], newPoint[1]);
    if (newPointIndex >= 0) {
      if (this._fogCellsCache[newPointIndex] == null) {
        this._createOuterFogFragment(newPoint[0], newPoint[1], regionId);
      }
    }
    //console.log("FOGManager._createNeibFogOutlinePoints", newPoint[0], newPoint[1])
    // * LEFT
    newPoint = [x - 1, y];
    newPointIndex = this.convertFogCellPointToIndex(newPoint[0], newPoint[1]);
    if (newPointIndex >= 0) {
      if (this._fogCellsCache[newPointIndex] == null) {
        this._createOuterFogFragment(newPoint[0], newPoint[1], regionId);
      }
    }
    //console.log("FOGManager._createNeibFogOutlinePoints", newPoint[0], newPoint[1])
    // * UP
    newPoint = [x, y - 1];
    newPointIndex = this.convertFogCellPointToIndex(newPoint[0], newPoint[1]);
    if (newPointIndex >= 0) {
      if (this._fogCellsCache[newPointIndex] == null) {
        this._createOuterFogFragment(newPoint[0], newPoint[1], regionId);
      }
    }
    //console.log("FOGManager._createNeibFogOutlinePoints", newPoint[0], newPoint[1])
    // * DOWN
    newPoint = [x, y + 1];
    newPointIndex = this.convertFogCellPointToIndex(newPoint[0], newPoint[1]);
    if (newPointIndex >= 0) {
      if (this._fogCellsCache[newPointIndex] == null) {
        this._createOuterFogFragment(newPoint[0], newPoint[1], regionId);
      }
    }
  };
  // * Получить спрайт тумана в точке ЭКРАНА
  //console.log("FOGManager._createNeibFogOutlinePoints", newPoint[0], newPoint[1])
  _._getFogFragmentInPoint = function(x, y) {
    return this._getAllFragments().find(function(spr) {
      return spr.x === x && spr.y === y;
    });
  };
  _._getAllFragments = function() {
    return this._fgFogLayer.children;
  };
  // * Создать внешний фрагмент тумана (сосдений с обычным)
  _._createOuterFogFragment = function(x, y, regionId) {
    var spr;
    if (this._isOutOfMap(x, y)) {
      return;
    }
    spr = this._createFogFragment(regionId, x, y);
    spr.setMapPosition(x, y);
    spr.setColorOuter(); // * Внешний
  };
  // * Находится ли точка за пределами карты?
  _._isOutOfMap = function(x, y) {
    return x >= ($gameMap.width()) || y > ($gameMap.height()) || x < 0 || y < 0;
  };
  // * Сохранить туман для текущей карты
  _._saveFogForMap = function() {
    var storedFogData;
    storedFogData = this._collectFogDataForSave();
    $gameMap.fSaveFogData(storedFogData);
  };
  _._collectFogDataForSave = function() {
    var k, len, ref, saveFragment, spr, storedFogData;
    storedFogData = [];
    ref = this._getAllFragments();
    for (k = 0, len = ref.length; k < len; k++) {
      spr = ref[k];
      if (spr == null) {
        continue;
      }
      if (spr.isFragmentDestroyed()) {
        continue;
      }
      saveFragment = {
        //point: [spr.x, spr.y],
        colorId: spr.getColor(),
        opacity: spr.opacity,
        regionId: spr.getRegion(),
        index: spr._index
      };
      storedFogData.push(saveFragment);
    }
    return storedFogData;
  };
  // * Открыть туман в точке
  _._openFogFragmentsFromPoint = function(x, y, radius, isFull) {
    var candiates, ignoredRegions, k, len, spr;
    candiates = this._collectFogFragmentsInRadius(x, y, radius);
    if (candiates.length === 0) {
      return;
    }
    ignoredRegions = this._getIgnoredRegions();
    for (k = 0, len = candiates.length; k < len; k++) {
      spr = candiates[k];
      if (ignoredRegions != null) {
        if (!spr.isProperFragmentToOpen(ignoredRegions)) {
          continue;
        }
      }
      if (spr.isFragmentDestroyed()) {
        continue;
      }
      if (spr.isInFinalFade()) {
        continue;
      }
      if (isFull === true) {
        spr.startFadeToFull();
      } else {
        spr.startFadeToHalf();
      }
    }
  };
  //?nullable
  _._getIgnoredRegions = function() {
    var regionId;
    regionId = $gameMap.fGetRegionUnderPlayer();
    return PKD_FOG.PP.getFogIgnorePairs(regionId);
  };
  _._collectFogFragmentsInRadius = function(x, y, radius) {
    var cellsInRadius, fragments, initialIndex;
    //console.time("FOGManager._collectFogFragmentsInRadiusNew")
    if (radius <= 0) {
      return [];
    }
    if (this._fogCellsByRadiusCache[radius] == null) {
      this._fogCellsByRadiusCache[radius] = {};
    }
    initialIndex = this.convertFogCellPointToIndex(x, y);
    if (this._fogCellsByRadiusCache[radius][initialIndex] != null) {
      //console.timeEnd("FOGManager._collectFogFragmentsInRadiusNew")
      //console.log("from cache")
      return this._fogCellsByRadiusCache[radius][initialIndex];
    }
    cellsInRadius = FogUtils.getCellsInRadius(x, y, radius, $gameMap.width(), $gameMap.height());
    fragments = cellsInRadius.map((cell) => {
      var index, spr;
      index = this.convertFogCellPointToIndex(cell[0], cell[1]);
      spr = this._getFogFragmentByIndex(index);
      if (spr != null) {
        //spr = @_fogCellsCache2[cell[0]][cell[1]]
        return spr;
      }
      return null;
    });
    fragments = fragments.filter(function(spr) {
      return spr != null;
    });
    this._fogCellsByRadiusCache[radius][initialIndex] = fragments;
    //console.timeEnd("FOGManager._collectFogFragmentsInRadiusNew")
    return fragments;
  };
  //?ALPHA NET Z
  _._openFogFragmentsForNetwork = function(x, y, radius) {
    var e;
    if ($gameTemp._fogOnlyLocalMode === true) {
      return;
    }
    if (!Imported.Alpha_NETZ) {
      return;
    }
    if (!ANNetwork.isConnected()) {
      return;
    }
    try {

    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  //?ALPHA NET Z
  _._onOpenFogFragmentFromNetwork = function(x, y, radius) {
    $gameTemp._fogOnlyLocalMode = true;
    $gameTemp._fogOnlyLocalMode = null;
  };
})();

// ■ END FOGManager PRIVATE
//---------------------------------------------------------------------------
//?ALPHA NET Z


// Generated by CoffeeScript 2.6.1
//? API вызовы скриптов для пользователей плагина
(function() {
  // * Открыть туман для игрока
  window.FOG_Refresh = function() {
    var e;
    try {
      FOGManager.refreshFogOnMapForPlayer();
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  // * Открыть туман в точке на карте
  window.FOG_OpenInPoint = function(x, y, radius) {
    var e;
    try {
      if (!FOGManager.isFogLayerExists()) {
        return;
      }
      FOGManager.openFogInPoint(x, y, radius);
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  
  // * Сбросить туман (пересоздать) (удалить сохранение)
  window.FOG_Reset = function(mapId) {
    var e;
    try {
      if (typeof $gameMap === "undefined" || $gameMap === null) {
        return;
      }
      // * Если текущая карта - создать снова
      if ($gameMap.mapId() === mapId) {
        return FOGManager.reCreateFogOnCurrentMap();
      } else {
        return $gameMap.fClearFogDataForMap(mapId);
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ FOGManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = FOGManager;
  // * Устанавливаем свой обработчик команд
  _.RegisterNAPI_Handler = function() {
    var NAPI_ALIAS_FOG_OF_WAR;
    NAPI_ALIAS_FOG_OF_WAR = nAPI.onCustomCommand;
    nAPI.onCustomCommand = function(name, data) {
      var mapId, radius, x, y;
      if (name === "fogOfWar") {
        mapId = data.mapId;
        // * Только на одной карте
        if (mapId === $gameMap.mapId()) {
          ({x, y, radius} = data);
          return FOGManager.openFogFragmentFromNetwork(x, y, radius);
        }
      } else {
        return NAPI_ALIAS_FOG_OF_WAR.call(this, ...arguments);
      }
    };
  };
  _._openFogFragmentsForNetwork = function(x, y, radius) {
    var actorId, e, mapId;
    if (!Imported.Alpha_NETZ) {
      return;
    }
    if (!ANNetwork.isConnected()) {
      return;
    }
    try {
      mapId = $gameMap.mapId();
      actorId = ANGameManager.myActorId();
      return nAPI.sendCustomCommand("fogOfWar", {mapId, actorId, x, y, radius});
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  // * Открыть туман из
  _.openFogFragmentFromNetwork = function(x, y, radius) {
    var e;
    try {
      if (KUtils.IsMapScene()) {
        FOGManager.openFogInPoint(x, y, radius);
      } else {
        if ($gameTemp._fogFromNetwork == null) {
          $gameTemp._fogFromNetwork = [];
        }
        $gameTemp._fogFromNetwork.push([x, y, radius]);
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  // * Открыть туман, который был открыт пока игрок был вне сцены карты
  _.restoreNetworkCachedFog = function() {
    var f, i, len, ref;
    if ($gameTemp._fogFromNetwork != null) {
      ref = $gameTemp._fogFromNetwork;
      for (i = 0, len = ref.length; i < len; i++) {
        f = ref[i];
        FOGManager.openFogFragmentFromNetwork(...f);
      }
      $gameTemp._fogFromNetwork = null;
    }
  };
})();

// ■ END FOGManager PRIVATE
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Plugin Parameters Manager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//$[ENCODE]
(function() {
  var _;
  PKD_FOG.LoadPluginSettings = function() {
    PKD_FOG.PP._loader = new KDX.ParamLoader("fogRegions:intA");
  };
  //@[DEFINES]
  _ = PKD_FOG.PP;
  _.isResetFogOfWarOnMapChange = function() {
    return this._loader.getParam("resetFog", false);
  };
  _.getPlayerOpenRadiusVarId = function() {
    return this._loader.getParam("playerRadiusVarId", 0);
  };
  _.getFogRegions = function() {
    return this._loader.getParam("fogRegions", []);
  };
  _.getFogIgnorePairs = function(regionId) {
    var data, regions;
    data = this._loader.getParam("fogIgnorePairs", []);
    regions = data.find(function(item) {
      return item.regionId === regionId;
    });
    if (regions != null) {
      return regions.ignoredRegions;
    } else {
      return null;
    }
  };
  _.getFogSettingsForRegion = function(regionId) {
    var data, settings;
    data = this._loader.getParam("fogFragmentsSettings", []);
    settings = data.find(function(item) {
      return item.regionId === regionId;
    });
    if (settings != null) {
      return settings;
    } else {
      // * DEFAULT
      this._prepareDefaultFogSettings();
      return this._defaultFogSettings;
    }
  };
  _.isSyncFogOverNetwork = function() {
    return Imported.Alpha_NETZ === true && ANNetwork.isConnected() && this._loader.getParam("networkSupport", true);
  };
  _.isCreateOuterFog = function() {
    return this._loader.getParam("createOuterFog", true);
  };
  // * Создать стандартные настройки (один раз)
  _._prepareDefaultFogSettings = function() {
    if (this._defaultFogSettings != null) {
      return;
    }
    this._defaultFogSettings = this._loader.getParam('defFogSettingsGroup', {
      fogSettings: {
        color: "#000000",
        opacity: 255
      },
      fogSettingsOuter: {
        color: "#000000",
        opacity: 230
      },
      halfFadeSettings: {
        fadeStep: 4,
        fadeSpeed: 1
      },
      fullFadeSettings: {
        fadeStep: 6,
        fadeSpeed: 1
      }
    });
  };
})();

// ■ END Plugin Parameters Manager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDatabase, _;
  //@[DEFINES]
  _ = DataManager;
  // * Загрузка параметров плагина
  //@[ALIAS]
  ALIAS__loadDatabase = _.loadDatabase;
  _.loadDatabase = function() {
    PKD_FOG.LoadPluginSettings();
    if (Imported.Alpha_NETZ === true) {
      FOGManager.RegisterNAPI_Handler();
    }
    ALIAS__loadDatabase.call(this);
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


var FogUtils;
(function (FogUtils) {
    function convertCellToIndex(i, j, cols) {
        return i + j * cols;
    }
    FogUtils.convertCellToIndex = convertCellToIndex;
    function convertIndexToCell(index, cols) {
        const i = index % cols;
        const j = Math.floor(index / cols);
        return [i, j];
    }
    FogUtils.convertIndexToCell = convertIndexToCell;
    function getCellsInRadius(i, j, radius, rows, cols) {
        const result = [];
        for (let di = -radius; di <= radius; di++) {
            for (let dj = -radius; dj <= radius; dj++) {
                const ni = i + di;
                const nj = j + dj;
                if (ni >= 0 && ni < rows &&
                    nj >= 0 && nj < cols &&
                    Math.abs(di) + Math.abs(dj) <= radius) {
                    result.push([ni, nj]);
                }
            }
        }
        return result;
    }
    FogUtils.getCellsInRadius = getCellsInRadius;
})(FogUtils || (FogUtils = {}));


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//$[ENCODE]
(function() {
  var ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function() {
    ALIAS__setup.call(this, ...arguments);
    if (PKD_FOG.PP.isResetFogOfWarOnMapChange() === true) {
      // * Сбросить состояние тумана при смене карты
      this._fFogStorage = {};
    }
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//$[ENCODE]
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  // * Карта с туманом? (Есть Note)
  _.isMapWithFogOfWar = function() {
    return KGameItems.IsHaveMeta("PFOG", $dataMap);
  };
  // * Номер региона под игроком
  _.fGetRegionUnderPlayer = function() {
    return this.regionId($gamePlayer.x, $gamePlayer.y);
  };
  // * Сохранить данные о тумане текущей карты
  _.fSaveFogData = function(fogData) {
    this._fInitFogStorage();
    this._fFogStorage[this.mapId()] = fogData;
  };
  // * Получить сохранённые данные о тумане (текущая карте)
  //?nullable
  _.fGetFogData = function() {
    var fogData;
    this._fInitFogStorage();
    fogData = this._fFogStorage[this.mapId()];
    return fogData;
  };
  // * Очистить сохранённые данные о тумане на карте
  _.fClearFogDataForMap = function(mapId) {
    this._fInitFogStorage();
    this._fFogStorage[mapId] = null;
    delete this._fFogStorage[mapId];
  };
  // * Инициализация хранилища сохранений тумана
  _._fInitFogStorage = function() {
    if (this._fFogStorage == null) {
      return this._fFogStorage = {};
    }
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__locate, ALIAS__moveDiagonally, ALIAS__moveStraight, ALIAS__refrsh, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__refrsh = _.refrsh;
  _.refrsh = function() {
    ALIAS__refrsh.call(this);
    FOGManager.refreshFogOnMapForPlayer();
  };
  //@[ALIAS]
  ALIAS__moveStraight = _.moveStraight;
  _.moveStraight = function() {
    ALIAS__moveStraight.call(this, ...arguments);
    FOGManager.refreshFogOnMapForPlayer();
  };
  
  //@[ALIAS]
  ALIAS__moveDiagonally = _.moveDiagonally;
  _.moveDiagonally = function() {
    ALIAS__moveDiagonally.call(this, ...arguments);
    FOGManager.refreshFogOnMapForPlayer();
  };
  //@[ALIAS]
  ALIAS__locate = _.locate;
  _.locate = function() {
    ALIAS__locate.call(this, ...arguments);
    FOGManager.refreshFogOnMapForPlayer();
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------




// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onMapLoaded, ALIAS__stop, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    if (Imported.VisuMZ_0_CoreEngine) {
      // * VisuMZ не сохраняет Bitmap
      PKD_FOG.CACHE = {};
    }
    FOGManager.onMapLoaded();
  };
  
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    FOGManager.onMapStop();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//$[ENCODE]
var Sprite_FogFragment;

Sprite_FogFragment = class Sprite_FogFragment extends Sprite {
  constructor(_regionId) {
    super();
    this._regionId = _regionId;
    this._opacityChangeThread = null;
    this._initValues();
    return;
  }

  isFragmentDestroyed() {
    return this.__isDestroed === true;
  }

  isInFinalFade() {
    return this.__isFinalFade === true;
  }

  getRegion() {
    return this._regionId;
  }

  getColor() {
    return this._colorId;
  }

  setMapPosition(x, y) {
    this.mx = x;
    this.my = y;
    return this.setScreenPosition(x * $gameMap.tileWidth(), y * $gameMap.tileHeight());
  }

  setScreenPosition(x, y) {
    this.mx = x / $gameMap.tileWidth();
    this.my = y / $gameMap.tileHeight();
    return this.move(x, y);
  }

  // * Основной
  setColorFull() {
    this._colorId = 0;
    this._initBitmap();
  }

  // * Внешний
  setColorOuter() {
    this._colorId = 1;
    this._initBitmap();
  }

  // * Данный фрагмент находится не в списке игнор регионов?
  // * Если НЕ в списке, то его можно открывать, иначе нельзя
  isProperFragmentToOpen(regionIgnoredList) {
    if (regionIgnoredList == null) {
      return true;
    }
    return regionIgnoredList.indexOf(this.getRegion()) < 0;
  }

  // * Открыться частично (при приближении)
  startFadeToHalf() {
    var endValue, fadeSpeed, fadeStep;
    ({fadeStep, fadeSpeed} = this.params.halfFadeSettings);
    endValue = Math.round(this.opacity / 2);
    this._opacityChangeThread = new KDX.TimedUpdate(fadeSpeed, () => {
      if (this.opacity <= endValue) {
        this._opacityChangeThread = null;
      } else {
        this.opacity -= fadeStep;
      }
    });
  }

  // * Полностью открыться (изсчезнуть)
  startFadeToFull() {
    var fadeSpeed, fadeStep;
    // * Чтобы два раза не вызывать
    if (this.isInFinalFade()) {
      return;
    }
    ({fadeStep, fadeSpeed} = this.params.fullFadeSettings);
    this.__isFinalFade = true;
    this._opacityChangeThread = new KDX.TimedUpdate(fadeSpeed, () => {
      this.opacity -= fadeStep;
      if (this.opacity <= 0) {
        this.opacity = 0;
        this._opacityChangeThread = null;
        this._destroy();
      }
    });
  }

  update() {
    var ref;
    super.update();
    if (this.isFragmentDestroyed()) {
      return;
    }
    if ((ref = this._opacityChangeThread) != null) {
      ref.update();
    }
  }

  // * PRIVATE =======================================================
  _initValues() {
    this.params = this._getFogSettings();
    this.__isDestroed = false; // * Открыт полностью
    this.__isFinalFade = false; // * Начал открываться полностью (анимация запещена)
    this.setColorFull();
  }

  _initBitmap() {
    var colorTag, p;
    if (this._colorId === 0) {
      p = this.params.fogSettings;
    } else {
      p = this.params.fogSettingsOuter;
    }
    // * Создаём и сохраняем в кэш
    // * p.color это KDColor уже
    colorTag = p.color;
    if (PKD_FOG.CACHE[colorTag] == null) {
      PKD_FOG.CACHE[colorTag] = this._createBitmapFor(colorTag);
    }
    // * Для экономии памяти берём из кэша
    this.bitmap = PKD_FOG.CACHE[colorTag];
    this.opacity = p.opacity;
  }

  // * Получить настройки тумана в зависимости от региона
  _getFogSettings() {
    return PKD_FOG.PP.getFogSettingsForRegion(this._regionId);
  }

  _createBitmapFor(color) {
    var b;
    b = new Bitmap($gameMap.tileHeight(), $gameMap.tileWidth());
    b.fillAll(color);
    return b;
  }

  _destroy() {
    var ref;
    this.__isDestroed = true;
    this.visible = false;
    if ((ref = this.parent) != null) {
      ref.removeChild(this);
    }
    this.bitmap = null;
  }

};

window.Sprite_FogFragment = Sprite_FogFragment;


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createUpperLayer, ALIAS__update, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createUpperLayer = _.createUpperLayer;
  _.createUpperLayer = function() {
    this._fCreateFogLayer();
    return ALIAS__createUpperLayer.call(this);
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    this._fUpdateFogLayer();
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  _.fAddFog = function(sprite) {
    var ref;
    return (ref = this._fgFogLayer) != null ? ref.addChild(sprite) : void 0;
  };
  _._fCreateFogLayer = function() {
    // * Сбрасываем слой
    FOGManager.setupLayer(null);
    if (!$gameMap.isMapWithFogOfWar()) {
      return;
    }
    this._fgFogLayer = new Sprite();
    this.__fgTW = $gameMap.tileWidth();
    this.__fgTW2 = this.__fgTW / 2;
    this.__fgTH = $gameMap.tileHeight();
    this.addChild(this._fgFogLayer);
    // * Даём ссылку на данный слой
    FOGManager.setupLayer(this._fgFogLayer);
  };
  _._fUpdateFogLayer = function() {
    var screenX, screenY;
    if (this._fgFogLayer == null) {
      return;
    }
    screenX = Math.round($gameMap.adjustX(-0.5) * this.__fgTW + this.__fgTW2);
    screenY = Math.round($gameMap.adjustY(-1) * this.__fgTH + this.__fgTH);
    this._fgFogLayer.move(screenX, screenY);
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------


})();
//Plugin PKD_FogOfWar builded by PKD PluginBuilder 2.2.3 - 03.04.2025