/*
 * Copyright (c) 2025 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kdworkshop.net/>
 *
* License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 */


/*:
 * @plugindesc (v.1.0) Lobby Chat (ANETZ Extension)
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://gist.github.com/KageDesu/996da92ad3469ba06c67f8c42dcc31c0

 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * This plugin is extension for Alpha NET Z plugin.
 * Requires Alpha NET Z to work.
 *
 * GUIDE:
 * https://gist.github.com/KageDesu/996da92ad3469ba06c67f8c42dcc31c0
 *
 * ---------------------------------------------------------------------------
 *
 * Boosty:
 *     https://boosty.to/kagedesu
 * Patreon:
 *      https://www.patreon.com/KageDesu
 * YouTube:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *
 * License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 * 
 * @param Alpha_NETZ_Ext_LobbyChat
 * @text Lobby Chat Extension
 * 
 * 
 * 

 * 
 * 
 * @param lobbyChatIsGlobal:b
 * @text Is Global?
 * @type boolean
 * @on Global
 * @off Game Only
 * @default false
 * @desc If Global - you can chat with all player on server. Game Only - only with player with EXACT game
 * 
 * 

 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 


 */
/*:ru
 * @plugindesc (v.1.0) Lobby Chat (ANETZ Extension)
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://gist.github.com/KageDesu/996da92ad3469ba06c67f8c42dcc31c0

 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * Этот плагин является расширением для плагина Alpha NET Z.
    * Требуется Alpha NET Z для работы.
 *
 * РУКОВОДСТВО:
 * https://gist.github.com/KageDesu/996da92ad3469ba06c67f8c42dcc31c0
 *
 * ---------------------------------------------------------------------------
 *
 * Boosty:
 *     https://boosty.to/kagedesu
 * Patreon:
 *      https://www.patreon.com/KageDesu
 * YouTube:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *
 * License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 * 
 * @param Alpha_NETZ_Ext_LobbyChat
 * @text Расширение - Лобби Чат
 * 
 * 
 * 

 * 
 * 
 * @param lobbyChatIsGlobal:b
 * @text Глобальный?
 * @type boolean
 * @on Global
 * @off Game Only
 * @default false
 * @desc Если Глобальный - вы можете общаться со всеми игроками на сервере. Только игра - только с игроками с ТОЧНОЙ игрой
 * 
 * 

 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 


 */
/*:zh-cn
 * @plugindesc (v.1.0) Lobby Chat (ANETZ Extension)
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://gist.github.com/KageDesu/996da92ad3469ba06c67f8c42dcc31c0

 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * 此插件是 Alpha NET Z 插件的扩展
    * 需要 Alpha NET Z 才能工作。
 *
 * 指南:
 * https://gist.github.com/KageDesu/996da92ad3469ba06c67f8c42dcc31c0
 *
 * ---------------------------------------------------------------------------
 *
 * Boosty:
 *     https://boosty.to/kagedesu
 * Patreon:
 *      https://www.patreon.com/KageDesu
 * YouTube:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *
 * License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 * 
 * @param Alpha_NETZ_Ext_LobbyChat
 * @text 大厅聊天扩展
 * 
 * 
 * 

 * 
 * 
 * @param lobbyChatIsGlobal:b
 * @text 是全球的吗？
 * @type boolean
 * @on Global
 * @off Game Only
 * @default false
 * @desc 如果是全球性的 - 您可以与服务器上的所有玩家聊天。 仅限游戏 - 仅与具有确切游戏的玩家聊天
 * 
 * 

 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 


 */



var Imported;
(function (Imported) {
    Imported.Alpha_NETZ_Ext_LobbyChat = true;
})(Imported || (Imported = {}));
var Alpha_NETZ_Ext_LobbyChat;
(function (Alpha_NETZ_Ext_LobbyChat) {
    Alpha_NETZ_Ext_LobbyChat.Version = "1.0";
})(Alpha_NETZ_Ext_LobbyChat || (Alpha_NETZ_Ext_LobbyChat = {}));


(function(){



var PP;
(function (PP) {
    let _loader;
    /**
        * Load plugin settings
    */
    function LoadPluginSettings() {
        _loader = new NZKDX.ParamLoader("Alpha_NETZ_Ext_LobbyChat");
    }
    PP.LoadPluginSettings = LoadPluginSettings;
    /**
        * Get parameter from plugin settings
        * @param {string} paramName - Name of parameter
        * @param {any} defaultValue - Default value if not found
        * @returns {any} - Value of parameter
    */
    function getLoaderParam(paramName, defaultValue) {
        try {
            if (!_loader) {
                LoadPluginSettings();
            }
            return _loader.getParam(paramName, defaultValue);
        }
        catch (error) {
            console.warn(error);
            return null;
        }
    }
    function isLobbyChatIsGlobal() {
        return getLoaderParam('LobbyChatIsGlobal', false);
    }
    PP.isLobbyChatIsGlobal = isLobbyChatIsGlobal;
})(PP || (PP = {}));


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


var LobbyChatManager;
(function (LobbyChatManager) {
    let chat = null;
    let isChatVisible = false;
    let chatElement = null;
    function initialize() {
        try {
            var head = document.getElementsByTagName("head")[0];
            head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"css/anet_chat.css\" />");
        }
        catch (error) {
            console.warn(error);
        }
    }
    LobbyChatManager.initialize = initialize;
    function showLobbyChat() {
        try {
            createLobbyChatHtmlElements();
            chat = new NETLobbyChat();
        }
        catch (error) {
            console.warn(error);
        }
    }
    LobbyChatManager.showLobbyChat = showLobbyChat;
    function removeLobbyChat() {
        try {
            if (!chatElement)
                return;
            chatElement.style.display = "none";
            if (chatElement.parentNode) {
                chatElement.parentNode.removeChild(chatElement);
            }
            chatElement = null;
            chat = null;
        }
        catch (error) {
            console.warn(error);
        }
    }
    LobbyChatManager.removeLobbyChat = removeLobbyChat;
    function switchChatWindowState() {
        try {
            var sectionA = document.getElementById("anet-chat-sectionA");
            var sectionB = document.getElementById("anet-chat-sectionB");
            if (isChatVisible) {
                sectionA.classList.remove("msger-none");
                sectionB.classList.add("msger-none");
                isChatVisible = false;
            }
            else {
                sectionA.classList.add("msger-none");
                sectionB.classList.remove("msger-none");
                isChatVisible = true;
            }
            if (SceneManager._scene['setInputAllowed']) {
                SceneManager._scene['setInputAllowed'](!isChatVisible);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    LobbyChatManager.switchChatWindowState = switchChatWindowState;
    function onChatMessageFromServer(content) {
        try {
            if (chat) {
                chat.onMessageFromServer(content);
            }
            else {
                NETLobbyChat.AddToHistory(content, 'left');
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    LobbyChatManager.onChatMessageFromServer = onChatMessageFromServer;
    function lobbyChatSendMessageButtonClick() {
        try {
            if (chat)
                chat.sendMessage();
        }
        catch (error) {
            console.warn(error);
        }
    }
    LobbyChatManager.lobbyChatSendMessageButtonClick = lobbyChatSendMessageButtonClick;
    function createLobbyChatHtmlElements() {
        var htmlCode = `
            <section id="anet-chat-sectionA" class="msger-closed">
                <header class="msger-header" onClick="LobbyChatManager.switchChatWindowState()">
                    <div class="msger-header-title">
                        <strong>CHAT</strong>
                    </div>
                    <div class="msger-header-options">
                        <span><i class="fas fa-caret-square-up"></i></span>
                    </div>
                </header>
            </section>
            <section id="anet-chat-sectionB" class="msger msger-none">
                <header class="msger-header" onClick="LobbyChatManager.switchChatWindowState()">
                    <div class="msger-header-title">
                        <strong>CHAT</strong>
                    </div>
                    <div class="msger-header-options">
                        <span><i class="fas fa-caret-square-down"></i></span>
                    </div>
                </header>

                <main id="anet-chat-main" class="msger-chat">
                    
                </main>

                <div class="msger-inputarea">
                    <input id="anet-chat-input" type="text" class="msger-input" placeholder="Enter your message...">
                    <button onClick="LobbyChatManager.lobbyChatSendMessageButtonClick()" class="msger-send-btn">Send</button>
                </div>
            </section>
        `;
        // Create and append the chat element to the DOM
        chatElement = document.createElement("div");
        chatElement.id = "anetRoomChat";
        chatElement.classList.add('msg-container');
        chatElement.insertAdjacentHTML("beforeend", htmlCode);
        //@ts-ignore
        HUIManager.appendExternalHtmlElement(chatElement);
        isChatVisible = false;
    }
    function getNetChatTimeNow() {
        try {
            let date = new Date();
            const h = "0" + date.getHours();
            const m = "0" + date.getMinutes();
            return `${h.slice(-2)}:${m.slice(-2)}`;
        }
        catch (error) {
            console.warn(error);
        }
        return "??:??";
    }
    LobbyChatManager.getNetChatTimeNow = getNetChatTimeNow;
    function getNetLobbyChatNewMessageCode(who, text, time, side) {
        return `
                <div class="msg ${side}-msg">
                <div class="msg-bubble">
                    <div class="msg-info">
                    <div class="msg-info-name">${who}</div>
                    <div class="msg-info-time">${time}</div>
                    </div>
                    <div class="msg-text">${text}</div>
                </div>
                </div>
            `;
    }
    LobbyChatManager.getNetLobbyChatNewMessageCode = getNetLobbyChatNewMessageCode;
})(LobbyChatManager || (LobbyChatManager = {}));
window['LobbyChatManager'] = LobbyChatManager;


/**
 * @[GLOBAL]
 */
class NETLobbyChat {
    constructor() {
        // * Используется для фильтрации сообщений
        this._gameId = nAPI.ID();
        this.loadHistory();
    }
    sendMessage() {
        try {
            const msgerInput = document.getElementById("anet-chat-input");
            if (!msgerInput)
                return;
            const text = msgerInput.value;
            if (!KString.any(text))
                return;
            const myName = ANGameManager.myPlayerData().name;
            const message = this.buildMessage(myName, text);
            this.sendMessageToServer(message);
            msgerInput.value = "";
        }
        catch (e) {
            console.warn(e);
        }
    }
    buildMessage(who, text) {
        return {
            who,
            text,
            time: LobbyChatManager.getNetChatTimeNow(),
            gameid: this._gameId
        };
    }
    appendMessage(message, side) {
        try {
            const msgerChat = document.getElementById("anet-chat-main");
            if (!msgerChat)
                return;
            const { who, text, time } = message;
            const msgHTML = LobbyChatManager.getNetLobbyChatNewMessageCode(who, text, time, side);
            msgerChat.insertAdjacentHTML("beforeend", msgHTML);
            msgerChat.scrollTop += 500;
        }
        catch (e) {
            console.warn(e);
        }
    }
    static AddToHistory(message, side = 'left') {
        try {
            if (!$gameTemp['nLobbyChatHistory']) {
                $gameTemp['nLobbyChatHistory'] = [];
            }
            $gameTemp['nLobbyChatHistory'].push({
                message,
                side
            });
        }
        catch (e) {
            console.warn(e);
        }
    }
    loadHistory() {
        if (!$gameTemp['nLobbyChatHistory'])
            return;
        try {
            for (const item of $gameTemp['nLobbyChatHistory']) {
                this.appendMessage(item.message, item.side);
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    sendMessageToServer(message) {
        try {
            ANNetwork.callback(NetMessage.Lobby("chatMessage", message), () => {
                this.appendMessage(message, 'right');
                NETLobbyChat.AddToHistory(message, 'right');
            });
        }
        catch (e) {
            console.warn(e);
        }
    }
    onMessageFromServer(message) {
        try {
            if (!message)
                return;
            if (!KString.any(message.who))
                return;
            if (!PP.isLobbyChatIsGlobal()) {
                if (this._gameId !== message.gameid)
                    return;
            }
            this.appendMessage(message, 'left');
            NETLobbyChat.AddToHistory(message, 'left');
        }
        catch (e) {
            console.warn(e);
        }
    }
}
window['NETLobbyChat'] = NETLobbyChat;


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetClientMethodsManager.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@ts-ignore
    //@[DEFINES]
    const _ = NetClientMethodsManager;
    _['event_lobby_chatMessage'] = function (content) {
        try {
            LobbyChatManager.onChatMessageFromServer(content);
        }
        catch (e) {
            console.warn(e);
        }
    };
})();
// ■ END NetClientMethodsManager.ts
//---------------------------------------------------------------------------


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Scene_Boot.prototype;
    //@[ALIAS]
    const ALIAS__start = _.start;
    _.start = function () {
        ALIAS__start.call(this);
        if (!Imported['Alpha_NETZ']) {
            console.warn("Alpha_NETZ plugin is not loaded");
            window.alert("Lobby Chat Extension plugin require Alpha NETZ!");
            return;
        }
        PP.LoadPluginSettings();
        LobbyChatManager.initialize();
        ANET.registerExtension("LobbyChat");
    };
})();
// ■ END Scene_Boot.ts
//---------------------------------------------------------------------------


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    // @ts-ignore
    //@[DEFINES]
    const _ = Scene_NetworkGameMenu.prototype;
    //@[ALIAS]
    const ALIAS__showModalWindow = _.showModalWindow;
    _.showModalWindow = function (...args) {
        let t = this;
        LobbyChatManager.removeLobbyChat();
        ALIAS__showModalWindow.call(this, ...args);
    };
    //@[ALIAS]
    const ALIAS__stop = _.stop;
    _.stop = function (...args) {
        let t = this;
        LobbyChatManager.removeLobbyChat();
        ALIAS__stop.call(this, ...args);
    };
    //@[ALIAS]
    const ALIAS__hideModalWindow = _.hideModalWindow;
    _.hideModalWindow = function (...args) {
        let t = this;
        ALIAS__hideModalWindow.call(this, ...args);
        LobbyChatManager.showLobbyChat();
    };
    //@[ALIAS]
    const ALIAS___initSceneComponents = _._initSceneComponents;
    _._initSceneComponents = function (...args) {
        let t = this;
        ALIAS___initSceneComponents.call(this, ...args);
        LobbyChatManager.showLobbyChat();
    };
    //@[ALIAS]
    const ALIAS___updateBackButton = _._updateBackButton;
    _._updateBackButton = function (...args) {
        let t = this;
        ALIAS___updateBackButton.call(this, ...args);
        //@ts-ignore
        if (HUIManager.isLoaderActive())
            return;
        if (this.isInputAllowed())
            return;
        if (this.inModalMode())
            return;
        //@ts-ignore
        if (Input.isCancel()) {
            LobbyChatManager.switchChatWindowState();
        }
    };
})();
// ■ END Scene_NetworkGameMenu.ts
//---------------------------------------------------------------------------


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Title.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Scene_Title.prototype;
    //@[ALIAS]
    const ALIAS__start = _.start;
    _.start = function (...args) {
        let t = this;
        ALIAS__start.call(this, ...args);
        $gameTemp['nLobbyChatHistory'] = null;
    };
})();
// ■ END Scene_Title.ts
//---------------------------------------------------------------------------


})();