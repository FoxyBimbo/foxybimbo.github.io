/*
 * Copyright (c) 2025 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kdworkshop.net/>
 *
* License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 */


/*:
 * @plugindesc (v.1.0) In-Game Chat (ANETZ Extension)
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://gist.github.com/KageDesu/164272941fed0a4f2ed3bd34c411e01f
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * This plugin is extension for Alpha NET Z plugin.
 * Requires Alpha NET Z to work.
 *
 * GUIDE:
 * https://gist.github.com/KageDesu/164272941fed0a4f2ed3bd34c411e01f
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
 * @param Alpha_NETZ_Ext_InGameChat
 * @text Alpha NET Z - In-Game Chat Extension
 * 
 * 

 * 
 * 
 * @param chatStartMessage
 * @text Start Message
 * @default \}Welcome to Alpha NET Z, \C[1]'T'\C[6] to chat
 * @desc Message when New Game started. Leave empty if not need any start message.
 * 
 * 

 * 
 * 
 * @param chatOpenCloseKey
 * @text Chat Key
 * @default t
 * @desc Key to open (close) chat window in game.
 * 
 * 

 * 
 * 
 * @param chatSayKey
 * @text Say Key
 * @default t
 * @desc Key to open input message scene. Only when chat visible. Can be same with Chat Key.
 * 
 * 

 * 
 * 
 * @param clickOnChatToSay:b
 * @type boolean
 * @text Is click to Say?
 * @on YES
 * @off NO
 * @default true
 * @desc Click in chat window to open input message scene. Only when chat visible.
 * 
 * 

 * 
 * 
 * @param chatAutoOpen:b
 * @type boolean
 * @text Is auto open?
 * @on YES
 * @off NO
 * @default false
 * @desc Show (open) chat window if new message is received? (If chat windows is closed)
 * 
 * 

 * 
 * 
 * @param chatMessagesSettings:struct
 * @text Messages Settings
 * @type struct<str42>
 * @default {"maxlength:i":"32","forbiddenEscapeCodes:str":"V","iconsSize:i":"18","allowEmotions:b":"true"}
 * 
 * 

 * 
 * 
 * @param chatInputSceneVisualSettings:struct
 * @text Input Text Scene
 * @type struct<str41>
 * @default {"mapChannelButtonPosition:s":"{\"x:e\":\"4\",\"y:e\":\"6\"}","allChannelButtonPosition:s":"{\"x:e\":\"104\",\"y:e\":\"6\"}","inputSceneOkButtonPosition:s":"{\"x:e\":\"356\",\"y:e\":\"284\"}"}
 * @desc Chat message input scene visual settings
 * 
 * 

 * 
 * 
 * @param inGameChatWindowVisualSettings:struct
 * @text Chat Window
 * @type struct<InGameChatWindowSettings>
 * @default {"size:s":"{\"w:int\":\"312\",\"h:int\":\"192\"}","position:s":"{\"x:e\":\"1\",\"y:e\":\"Graphics.height - 193\"}","notActiveOpacity:i":"140","maxMessages:i":"9","firstChatMessageMargin:s":"{\"x:int\":\"3\",\"y:int\":\"145\"}"}
 * 
 * 

 * 
 * 
 * @param inGameChatTextLineSettings:struct
 * @parent inGameChatWindowVisualSettings:struct
 * @text Text Line
 * @type struct<ChatTextLineSettings>
 * @default {"size:s":"{\"w:int\":\"306\",\"h:int\":\"18\"}","backgroundA:s":"{\"color:str\":\"#59a3d9\",\"opacity:i\":\"40\"}","backgroundB:s":"{\"color:str\":\"#59a3d9\",\"opacity:i\":\"70\"}","textLine:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"520\\\",\\\"h:int\\\":\\\"20\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"14\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"4\\\",\\\"y:int\\\":\\\"-3\\\"}\"}","textFormat:str":"\\}\\}\\C[3][%1] \\{\\{\\C[2]%2 \\C[0]%3","textFormatForPlayer:str":"\\}\\}\\C[3][%1]\\C[1][ME]\\{\\{ \\C[0]%3","textFormatForSystem:str":"\\}\\}\\C[3][%1]\\{\\{ \\C[6]%3","animationSpeedInPx:i":"18","channelAll:str":"ALL","channelMap:str":"MAP"}
 * 
 * 

 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 


 */
/*:ru
 * @plugindesc (v.1.0) In-Game Chat (ANETZ Extension)
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://gist.github.com/KageDesu/164272941fed0a4f2ed3bd34c411e01f
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * Этот плагин является расширением для плагина Alpha NET Z.
    * Требуется Alpha NET Z для работы.
 *
 * РУКОВОДСТВО:
 * https://gist.github.com/KageDesu/164272941fed0a4f2ed3bd34c411e01f
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
 * @param Alpha_NETZ_Ext_InGameChat
 * @text Alpha NET Z - Игровой чат (расширение)
 * 
 * 

 * 
 * 
 * @param chatStartMessage
 * @text Сообщение при старте
 * @default \}Welcome to Alpha NET Z, \C[1]'T'\C[6] to chat
 * @desc Сообщение при старте новой игры. Оставьте пустым, если не нужно стартовое сообщение.
 * 
 * 

 * 
 * 
 * @param chatOpenCloseKey
 * @text Клавиша чата
 * @default t
 * @desc Клавиша для открытия (закрытия) окна чата в игре.
 * 
 * 

 * 
 * 
 * @param chatSayKey
 * @text Клавиша сказать
 * @default t
 * @desc Клавиша для открытия сцены ввода сообщения. Только когда чат виден. Может быть такой же, как и клавиша чата.
 * 
 * 

 * 
 * 
 * @param clickOnChatToSay:b
 * @type boolean
 * @text Клик для сказать?
 * @on YES
 * @off NO
 * @default true
 * @desc Клик в окне чата для открытия сцены ввода сообщения. Только когда чат виден.
 * 
 * 

 * 
 * 
 * @param chatAutoOpen:b
 * @type boolean
 * @text Автооткрытие?
 * @on YES
 * @off NO
 * @default false
 * @desc Показать (открыть) окно чата, если получено новое сообщение? (Если окно чата закрыто)
 * 
 * 

 * 
 * 
 * @param chatMessagesSettings:struct
 * @text Настройки сообщений
 * @type struct<str42>
 * @default {"maxlength:i":"32","forbiddenEscapeCodes:str":"V","iconsSize:i":"18","allowEmotions:b":"true"}
 * 
 * 

 * 
 * 
 * @param chatInputSceneVisualSettings:struct
 * @text Сцена ввода текста
 * @type struct<str41>
 * @default {"mapChannelButtonPosition:s":"{\"x:e\":\"4\",\"y:e\":\"6\"}","allChannelButtonPosition:s":"{\"x:e\":\"104\",\"y:e\":\"6\"}","inputSceneOkButtonPosition:s":"{\"x:e\":\"356\",\"y:e\":\"284\"}"}
 * @desc Настройки визуализации сцены ввода сообщений чата
 * 
 * 

 * 
 * 
 * @param inGameChatWindowVisualSettings:struct
 * @text Окно чата
 * @type struct<InGameChatWindowSettings>
 * @default {"size:s":"{\"w:int\":\"312\",\"h:int\":\"192\"}","position:s":"{\"x:e\":\"1\",\"y:e\":\"Graphics.height - 193\"}","notActiveOpacity:i":"140","maxMessages:i":"9","firstChatMessageMargin:s":"{\"x:int\":\"3\",\"y:int\":\"145\"}"}
 * 
 * 

 * 
 * 
 * @param inGameChatTextLineSettings:struct
 * @parent inGameChatWindowVisualSettings:struct
 * @text Настройки линии текста
 * @type struct<ChatTextLineSettings>
 * @default {"size:s":"{\"w:int\":\"306\",\"h:int\":\"18\"}","backgroundA:s":"{\"color:str\":\"#59a3d9\",\"opacity:i\":\"40\"}","backgroundB:s":"{\"color:str\":\"#59a3d9\",\"opacity:i\":\"70\"}","textLine:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"520\\\",\\\"h:int\\\":\\\"20\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"14\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"4\\\",\\\"y:int\\\":\\\"-3\\\"}\"}","textFormat:str":"\\}\\}\\C[3][%1] \\{\\{\\C[2]%2 \\C[0]%3","textFormatForPlayer:str":"\\}\\}\\C[3][%1]\\C[1][ME]\\{\\{ \\C[0]%3","textFormatForSystem:str":"\\}\\}\\C[3][%1]\\{\\{ \\C[6]%3","animationSpeedInPx:i":"18","channelAll:str":"ALL","channelMap:str":"MAP"}
 * 
 * 

 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 


 */
/*:zh-cn
 * @plugindesc (v.1.0) In-Game Chat (ANETZ Extension)
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://gist.github.com/KageDesu/164272941fed0a4f2ed3bd34c411e01f
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * 此插件是 Alpha NET Z 插件的扩展
    * 需要 Alpha NET Z 才能工作。
 *
 * 指南:
 * https://gist.github.com/KageDesu/164272941fed0a4f2ed3bd34c411e01f
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
 * @param Alpha_NETZ_Ext_InGameChat
 * @text Alpha NET Z - 游戏内聊天扩展
 * 
 * 

 * 
 * 
 * @param chatStartMessage
 * @text 开始消息
 * @default \}Welcome to Alpha NET Z, \C[1]'T'\C[6] to chat
 * @desc 新游戏开始时的消息。 如果不需要任何启动消息，请留空。
 * 
 * 

 * 
 * 
 * @param chatOpenCloseKey
 * @text 聊天键
 * @default t
 * @desc 在游戏中打开（关闭）聊天窗口的键。
 * 
 * 

 * 
 * 
 * @param chatSayKey
 * @text 说键
 * @default t
 * @desc 打开输入消息场景的键。 仅当聊天可见时。 可以与聊天键相同。
 * 
 * 

 * 
 * 
 * @param clickOnChatToSay:b
 * @type boolean
 * @text 点击说话？
 * @on YES
 * @off NO
 * @default true
 * @desc 点击聊天窗口以打开输入消息场景。 仅当聊天可见时。
 * 
 * 

 * 
 * 
 * @param chatAutoOpen:b
 * @type boolean
 * @text 自动打开？
 * @on YES
 * @off NO
 * @default false
 * @desc 如果收到新消息，是否显示（打开）聊天窗口？ （如果聊天窗口已关闭）
 * 
 * 

 * 
 * 
 * @param chatMessagesSettings:struct
 * @text 消息设置
 * @type struct<str42>
 * @default {"maxlength:i":"32","forbiddenEscapeCodes:str":"V","iconsSize:i":"18","allowEmotions:b":"true"}
 * 
 * 

 * 
 * 
 * @param chatInputSceneVisualSettings:struct
 * @text 输入文本场景
 * @type struct<str41>
 * @default {"mapChannelButtonPosition:s":"{\"x:e\":\"4\",\"y:e\":\"6\"}","allChannelButtonPosition:s":"{\"x:e\":\"104\",\"y:e\":\"6\"}","inputSceneOkButtonPosition:s":"{\"x:e\":\"356\",\"y:e\":\"284\"}"}
 * @desc 聊天消息输入场景的视觉设置
 * 
 * 

 * 
 * 
 * @param inGameChatWindowVisualSettings:struct
 * @text 聊天窗口
 * @type struct<InGameChatWindowSettings>
 * @default {"size:s":"{\"w:int\":\"312\",\"h:int\":\"192\"}","position:s":"{\"x:e\":\"1\",\"y:e\":\"Graphics.height - 193\"}","notActiveOpacity:i":"140","maxMessages:i":"9","firstChatMessageMargin:s":"{\"x:int\":\"3\",\"y:int\":\"145\"}"}
 * 
 * 

 * 
 * 
 * @param inGameChatTextLineSettings:struct
 * @parent inGameChatWindowVisualSettings:struct
 * @text 文字行设置
 * @type struct<ChatTextLineSettings>
 * @default {"size:s":"{\"w:int\":\"306\",\"h:int\":\"18\"}","backgroundA:s":"{\"color:str\":\"#59a3d9\",\"opacity:i\":\"40\"}","backgroundB:s":"{\"color:str\":\"#59a3d9\",\"opacity:i\":\"70\"}","textLine:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"520\\\",\\\"h:int\\\":\\\"20\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"14\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"4\\\",\\\"y:int\\\":\\\"-3\\\"}\"}","textFormat:str":"\\}\\}\\C[3][%1] \\{\\{\\C[2]%2 \\C[0]%3","textFormatForPlayer:str":"\\}\\}\\C[3][%1]\\C[1][ME]\\{\\{ \\C[0]%3","textFormatForSystem:str":"\\}\\}\\C[3][%1]\\{\\{ \\C[6]%3","animationSpeedInPx:i":"18","channelAll:str":"ALL","channelMap:str":"MAP"}
 * 
 * 

 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 


 */
/*~struct~ChatTextLineSettings:

@param size:s
@text Size
@type struct<str0>
@desc Size per one chat line (one message)
@default {}




@param backgroundA:s
@text Background A
@type struct<str39>
@default {}




@param backgroundB:s
@text Background B
@type struct<str39>
@default {}




@param textLine:s
@text Text Line
@type struct<str9>
@desc Text line (message text) settings
@default {}




@param textFormat:str
@text Text Format
@type text
@desc Message format. Where: %1 - Channel, %2 - Actor Name, %3 - Message text, %4 - Player Name
@default \}\}\C[3][%1] \{\{\C[2]%2 \C[0]%3




@param textFormatForPlayer:str
@text Player TF
@type text
@desc Own message format. Where: %1 - Channel, %2 - Actor Name, %3 - Message text, %4 - Player Name
@default \}\}\C[3][%1]\C[1][ME]\{\{ \C[0]%3




@param textFormatForSystem:str
@text System TF
@type text
@desc System message format. Where: %1 - Channel, %2 - Actor Name, %3 - Message text, %4 - Player Name
@default \}\}\C[3][%1]\{\{ \C[6]%3




@param animationSpeedInPx:i
@text Animation Speed
@type number
@min 1
@desc Message animation slide speed in PX per frame
@default 18




@param channelAll:str
@text Channel All name
@type text
@default ALL




@param channelMap:str
@text Channel Map name
@type text
@default MAP

*/

/*~struct~InGameChatWindowSettings:

@param size:s
@text Size
@type struct<str0>
@desc Chat Window Size
@default {}




@param position:s
@text Position
@type struct<XY2>
@desc Default position on screen
@default {}




@param notActiveOpacity:i
@text Opacity
@type number
@min 0
@max 255
@desc Chat window opacity when window not active (not under mouse cursor)
@default 140




@param maxMessages:i
@text Lines Count
@type number
@min 1
@desc Max visible messages lines at same time
@default 9




@param firstChatMessageMargin:s
@text Start Pos
@type struct<str2>
@desc Messages initial position (pos of first chat message) in chat window
@default {}
*/

/*~struct~str0:

@param w:int
@text Width
@type number
@default 100
@min 0





@param h:int
@text Height
@type number
@default 100
@min 0
*/

/*~struct~str1:

@param face:str
@text Face
@type string
@default




@param size:int
@text Size
@type number
@default 24
@min 1





@param italic:bool
@text IsItalic
@type boolean
@default false
*/

/*~struct~str2:

@param x:int
@text X
@type number
@default 0
@min -1000





@param y:int
@text Y
@type number
@default 0
@min -1000
*/

/*~struct~str39:

@param color:str
@text Color
@type text
@desc Color in HEX format (#000000)
@default #59a3d9




@param opacity:i
@text Opacity
@type number
@min 0
@max 255
@default 40
*/

/*~struct~str41:

@param mapChannelButtonPosition:s
@text Button MAP
@type struct<XY2>
@desc Position of button for Map channel
@default {}




@param allChannelButtonPosition:s
@text Button ALL
@type struct<XY2>
@desc Position of button for All channel
@default {}




@param inputSceneOkButtonPosition:s
@text Button OK
@type struct<XY2>
@default {}
*/

/*~struct~str42:

@param maxlength:i
@text Max Length
@type number
@min 10
@desc Max chat message text length
@default 32




@param forbiddenEscapeCodes:str
@text Forbidden CC
@type text
@desc Forbidden control characters (I, V, {, ...) for input. Separated by comma.
@default V




@param iconsSize:i
@text Icon Size
@type number
@min 8
@desc [MZ only] Default icon size if player use \I control character in message
@default 18




@param allowEmotions:b
@text Emotions
@type boolean
@on Yes
@off No
@desc Allow play balloons animations (emotions)? (like :!, :?, :..., :love, ...)
@default true
*/

/*~struct~str9:

@param visible:b
@text Is Visible?
@type boolean
@default false
@desc Will be this element visible?




@param size:struct
@text TextBox Size
@type struct<str0>
@default {}
@desc Size of the text zone




@param font:struct
@type struct<str1>
@text Font Settings
@default {}




@param margins:struct
@text Margins
@type struct<str2>
@default {}
*/

/*~struct~XY2:

@param x:e
@text X
@default 0
@desc Number or script (example: Graphics.width / 2)





@param y:e
@text Y
@default 0
@desc Number or script (example: Graphics.width / 2)
*/

/*~struct~ChatTextLineSettings:ru

@param size:s
@text Размер
@type struct<str0>
@desc Размер для одной строки чата (одно сообщение)
@default {}




@param backgroundA:s
@text Фон A
@type struct<str39>
@default {}




@param backgroundB:s
@text Фон B
@type struct<str39>
@default {}




@param textLine:s
@text Настройки линии текста
@type struct<str9>
@desc Настройки строки текста (текст сообщения)
@default {}




@param textFormat:str
@text Формат текста
@type text
@desc Формат сообщения. Где: %1 - Канал, %2 - Имя актёра, %3 - Текст сообщения, %4 - Имя игрока
@default \}\}\C[3][%1] \{\{\C[2]%2 \C[0]%3




@param textFormatForPlayer:str
@text Формат игрока
@type text
@desc Формат собственного сообщения. Где: %1 - Канал, %2 - Имя актёра, %3 - Текст сообщения, %4 - Имя игрока
@default \}\}\C[3][%1]\C[1][ME]\{\{ \C[0]%3




@param textFormatForSystem:str
@text Системный формат
@type text
@desc Формат системного сообщения. Где: %1 - Канал, %2 - Имя актёра, %3 - Текст сообщения, %4 - Имя игрока
@default \}\}\C[3][%1]\{\{ \C[6]%3




@param animationSpeedInPx:i
@text Скорость анимации
@type number
@min 1
@desc Скорость анимации скольжения сообщений в пикселях за кадр
@default 18




@param channelAll:str
@text Название канала "Все"
@type text
@default ALL




@param channelMap:str
@text Название канала "Карта"
@type text
@default MAP

*/

/*~struct~InGameChatWindowSettings:ru

@param size:s
@text Размер
@type struct<str0>
@desc Окно чата Размер
@default {}




@param position:s
@text Позиция
@type struct<XY2>
@desc Позиция на экране по умолчанию
@default {}




@param notActiveOpacity:i
@text Непрозрачность
@type number
@min 0
@max 255
@desc Непрозрачность окна чата, когда окно не активно (не под курсором мыши)
@default 140




@param maxMessages:i
@text Кол-во строк
@type number
@min 1
@desc Макс. кол-во видимых строк сообщений одновременно
@default 9




@param firstChatMessageMargin:s
@text Начальная позиция
@type struct<str2>
@desc Начальная позиция сообщений (позиция первого сообщения чата) в окне чата
@default {}
*/

/*~struct~str0:ru

@param w:int
@text Ширина
@type number
@default 100
@min 0





@param h:int
@text Высота
@type number
@default 100
@min 0
*/

/*~struct~str1:ru

@param face:str
@text Шрифт
@type string
@default




@param size:int
@text Размер
@type number
@default 24
@min 1





@param italic:bool
@text Курсив
@type boolean
@default false
*/

/*~struct~str2:ru

@param x:int
@text X
@type number
@default 0
@min -1000





@param y:int
@text Y
@type number
@default 0
@min -1000
*/

/*~struct~str39:ru

@param color:str
@text Цвет
@type text
@desc Цвет в формате HEX (#000000)
@default #59a3d9




@param opacity:i
@text Непрозрачность
@type number
@min 0
@max 255
@default 40
*/

/*~struct~str41:ru

@param mapChannelButtonPosition:s
@text Кнопка КАРТА
@type struct<XY2>
@desc Позиция кнопки для канала карты
@default {}




@param allChannelButtonPosition:s
@text Кнопка ВСЕ
@type struct<XY2>
@desc Позиция кнопки для канала все
@default {}




@param inputSceneOkButtonPosition:s
@text Кнопка ОК
@type struct<XY2>
@default {}
*/

/*~struct~str42:ru

@param maxlength:i
@text Максимальная длина
@type number
@min 10
@desc Максимальная длина текста чата
@default 32




@param forbiddenEscapeCodes:str
@text Запрещенные CC
@type text
@desc Запрещенные управляющие символы (I, V, {, ...) для ввода. Разделены запятой.
@default V




@param iconsSize:i
@text Размер иконок
@type number
@min 8
@desc [MZ только] Размер значка по умолчанию, если игрок использует управляющий символ \I в сообщении
@default 18




@param allowEmotions:b
@text Эмоции
@type boolean
@on Yes
@off No
@desc Разрешить воспроизведение анимаций шариков (эмоций)? (например: :!, :?, :..., :love, ...)
@default true
*/

/*~struct~str9:ru

@param visible:b
@text Видимый?
@type boolean
@default false
@desc Будет ли этот элемент видимым?




@param size:struct
@text Размер текстовой зоны
@type struct<str0>
@default {}
@desc Размер текстовой зоны




@param font:struct
@type struct<str1>
@text Настройки шрифта
@default {}




@param margins:struct
@text Отступы
@type struct<str2>
@default {}
*/

/*~struct~XY2:ru

@param x:e
@text X
@default 0
@desc Число или скрипт (например: Graphics.width / 2)





@param y:e
@text Y
@default 0
@desc Число или скрипт (например: Graphics.width / 2)
*/

/*~struct~ChatTextLineSettings:zh-ch

@param size:s
@text 尺寸
@type struct<str0>
@desc 尺寸每一行聊天（一个消息）
@default {}




@param backgroundA:s
@text 背景 A
@type struct<str39>
@default {}




@param backgroundB:s
@text 背景 B
@type struct<str39>
@default {}




@param textLine:s
@text 文字行设置
@type struct<str9>
@desc 文本行（消息文本）设置
@default {}




@param textFormat:str
@text 文本格式
@type text
@desc 消息格式。其中：%1 - 频道，%2 - 角色名，%3 - 消息文本，%4 - 玩家名
@default \}\}\C[3][%1] \{\{\C[2]%2 \C[0]%3




@param textFormatForPlayer:str
@text 玩家格式
@type text
@desc 自己消息格式。其中：%1 - 频道，%2 - 角色名，%3 - 消息文本，%4 - 玩家名
@default \}\}\C[3][%1]\C[1][ME]\{\{ \C[0]%3




@param textFormatForSystem:str
@text 系统格式
@type text
@desc 系统消息格式。其中：%1 - 频道，%2 - 角色名，%3 - 消息文本，%4 - 玩家名
@default \}\}\C[3][%1]\{\{ \C[6]%3




@param animationSpeedInPx:i
@text 动画速度
@type number
@min 1
@desc 消息动画滑动速度（像素/帧）
@default 18




@param channelAll:str
@text "全部"频道名称
@type text
@default ALL




@param channelMap:str
@text "地图"频道名称
@type text
@default MAP

*/

/*~struct~InGameChatWindowSettings:zh-ch

@param size:s
@text 大小
@type struct<str0>
@desc 聊天窗口大小
@default {}




@param position:s
@text 位置
@type struct<XY2>
@desc 屏幕上的默认位置
@default {}




@param notActiveOpacity:i
@text 不透明度
@type number
@min 0
@max 255
@desc 当窗口不活动时（不在鼠标光标下）聊天窗口的不透明度
@default 140




@param maxMessages:i
@text 行数
@type number
@min 1
@desc 同时可见的最大消息行数
@default 9




@param firstChatMessageMargin:s
@text 起始位置
@type struct<str2>
@desc 聊天窗口中消息的初始位置（第一条聊天消息的位置）
@default {}
*/

/*~struct~str0:zh-ch

@param w:int
@text 宽度
@type number
@default 100
@min 0





@param h:int
@text 高度
@type number
@default 100
@min 0
*/

/*~struct~str1:zh-ch

@param face:str
@text 字体
@type string
@default




@param size:int
@text 尺寸
@type number
@default 24
@min 1





@param italic:bool
@text 斜体
@type boolean
@default false
*/

/*~struct~str2:zh-ch

@param x:int
@text X
@type number
@default 0
@min -1000





@param y:int
@text Y
@type number
@default 0
@min -1000
*/

/*~struct~str39:zh-ch

@param color:str
@text 颜色
@type text
@desc 以HEX格式表示的颜色（#000000）
@default #59a3d9




@param opacity:i
@text 不透明度
@type number
@min 0
@max 255
@default 40
*/

/*~struct~str41:zh-ch

@param mapChannelButtonPosition:s
@text 按钮 地图
@type struct<XY2>
@desc 地图频道按钮的位置
@default {}




@param allChannelButtonPosition:s
@text 按钮 全部
@type struct<XY2>
@desc 全部频道按钮的位置
@default {}




@param inputSceneOkButtonPosition:s
@text 按钮 确定
@type struct<XY2>
@default {}
*/

/*~struct~str42:zh-ch

@param maxlength:i
@text 最大长度
@type number
@min 10
@desc 聊天消息文本的最大长度
@default 32




@param forbiddenEscapeCodes:str
@text 禁止的 CC
@type text
@desc 禁止的控制字符（I，V，{，...）用于输入。用逗号分隔。
@default V




@param iconsSize:i
@text 图标大小
@type number
@min 8
@desc [仅限 MZ] 如果玩家在消息中使用 \I 控制字符，则默认图标大小
@default 18




@param allowEmotions:b
@text 情感
@type boolean
@on Yes
@off No
@desc 允许播放气球动画（情绪）吗？（如: :!, :?, :..., :love, ...）
@default true
*/

/*~struct~str9:zh-ch

@param visible:b
@text 可见？
@type boolean
@default false
@desc 该元素是否可见？




@param size:struct
@text 文本框大小
@type struct<str0>
@default {}
@desc 文本区域的大小




@param font:struct
@type struct<str1>
@text 字体设置
@default {}




@param margins:struct
@text 边距
@type struct<str2>
@default {}
*/

/*~struct~XY2:zh-ch

@param x:e
@text X
@default 0
@desc 数字或脚本（例如：Graphics.width / 2）





@param y:e
@text Y
@default 0
@desc 数字或脚本（例如：Graphics.width / 2）
*/




var Imported;
(function (Imported) {
    Imported.Alpha_NETZ_Ext_InGameChat = true;
})(Imported || (Imported = {}));
var Alpha_NETZ_Ext_InGameChat;
(function (Alpha_NETZ_Ext_InGameChat) {
    Alpha_NETZ_Ext_InGameChat.Version = "1.0";
})(Alpha_NETZ_Ext_InGameChat || (Alpha_NETZ_Ext_InGameChat = {}));


(function(){



/*
# ==========================================================================
# ==========================================================================
#
#   EMBEDDED PHEONIX KAGEDESU PLUGINS CORE LIBRARY
#   (This plugin may not use the entire code of this library)
#
# ==========================================================================
# ==========================================================================
 * 
 * 
 */



/*!
 * pixi-filters - v4.2.0
 * Compiled Fri, 05 Aug 2022 19:51:27 UTC
 *
 * pixi-filters is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var __filters=function(e,n,t,r,o,i,l,a){"use strict";var s=function(e,n){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])})(e,n)};function u(e,n){function t(){this.constructor=e}s(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}var f=function(){return(f=Object.assign||function(e){for(var n,t=arguments,r=1,o=arguments.length;r<o;r++)for(var i in n=t[r])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e}).apply(this,arguments)};Object.create;Object.create;var c="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",m=function(e){function n(n){var t=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float gamma;\nuniform float contrast;\nuniform float saturation;\nuniform float brightness;\nuniform float red;\nuniform float green;\nuniform float blue;\nuniform float alpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (c.a > 0.0) {\n        c.rgb /= c.a;\n\n        vec3 rgb = pow(c.rgb, vec3(1. / gamma));\n        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, saturation), contrast);\n        rgb.r *= red;\n        rgb.g *= green;\n        rgb.b *= blue;\n        c.rgb = rgb * brightness;\n\n        c.rgb *= c.a;\n    }\n\n    gl_FragColor = c * alpha;\n}\n")||this;return t.gamma=1,t.saturation=1,t.contrast=1,t.brightness=1,t.red=1,t.green=1,t.blue=1,t.alpha=1,Object.assign(t,n),t}return u(n,e),n.prototype.apply=function(e,n,t,r){this.uniforms.gamma=Math.max(this.gamma,1e-4),this.uniforms.saturation=this.saturation,this.uniforms.contrast=this.contrast,this.uniforms.brightness=this.brightness,this.uniforms.red=this.red,this.uniforms.green=this.green,this.uniforms.blue=this.blue,this.uniforms.alpha=this.alpha,e.applyFilter(this,n,t,r)},n}(n.Filter),p=function(e){function n(n){void 0===n&&(n=.5);var t=e.call(this,c,"\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform float threshold;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    // A simple & fast algorithm for getting brightness.\n    // It's inaccuracy , but good enought for this feature.\n    float _max = max(max(color.r, color.g), color.b);\n    float _min = min(min(color.r, color.g), color.b);\n    float brightness = (_max + _min) * 0.5;\n\n    if(brightness > threshold) {\n        gl_FragColor = color;\n    } else {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n}\n")||this;return t.threshold=n,t}return u(n,e),Object.defineProperty(n.prototype,"threshold",{get:function(){return this.uniforms.threshold},set:function(e){this.uniforms.threshold=e},enumerable:!1,configurable:!0}),n}(n.Filter),d=function(e){function n(n,r,o){void 0===n&&(n=4),void 0===r&&(r=3),void 0===o&&(o=!1);var i=e.call(this,c,o?"\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}\n":"\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}")||this;return i._kernels=[],i._blur=4,i._quality=3,i.uniforms.uOffset=new Float32Array(2),i._pixelSize=new t.Point,i.pixelSize=1,i._clamp=o,Array.isArray(n)?i.kernels=n:(i._blur=n,i.quality=r),i}return u(n,e),n.prototype.apply=function(e,n,t,r){var o,i=this._pixelSize.x/n._frame.width,l=this._pixelSize.y/n._frame.height;if(1===this._quality||0===this._blur)o=this._kernels[0]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,n,t,r);else{for(var a=e.getFilterTexture(),s=n,u=a,f=void 0,c=this._quality-1,m=0;m<c;m++)o=this._kernels[m]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,s,u,1),f=s,s=u,u=f;o=this._kernels[c]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,s,t,r),e.returnFilterTexture(a)}},n.prototype._updatePadding=function(){this.padding=Math.ceil(this._kernels.reduce((function(e,n){return e+n+.5}),0))},n.prototype._generateKernels=function(){var e=this._blur,n=this._quality,t=[e];if(e>0)for(var r=e,o=e/n,i=1;i<n;i++)r-=o,t.push(r);this._kernels=t,this._updatePadding()},Object.defineProperty(n.prototype,"kernels",{get:function(){return this._kernels},set:function(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max.apply(Math,e)):(this._kernels=[0],this._quality=1)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"clamp",{get:function(){return this._clamp},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"pixelSize",{get:function(){return this._pixelSize},set:function(e){"number"==typeof e?(this._pixelSize.x=e,this._pixelSize.y=e):Array.isArray(e)?(this._pixelSize.x=e[0],this._pixelSize.y=e[1]):e instanceof t.Point?(this._pixelSize.x=e.x,this._pixelSize.y=e.y):(this._pixelSize.x=1,this._pixelSize.y=1)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"quality",{get:function(){return this._quality},set:function(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blur",{get:function(){return this._blur},set:function(e){this._blur=e,this._generateKernels()},enumerable:!1,configurable:!0}),n}(n.Filter),h=function(e){function n(t){var o=e.call(this,c,"uniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D bloomTexture;\nuniform float bloomScale;\nuniform float brightness;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    color.rgb *= brightness;\n    vec4 bloomColor = vec4(texture2D(bloomTexture, vTextureCoord).rgb, 0.0);\n    bloomColor.rgb *= bloomScale;\n    gl_FragColor = color + bloomColor;\n}\n")||this;o.bloomScale=1,o.brightness=1,o._resolution=r.settings.FILTER_RESOLUTION,"number"==typeof t&&(t={threshold:t});var i=Object.assign(n.defaults,t);o.bloomScale=i.bloomScale,o.brightness=i.brightness;var l=i.kernels,a=i.blur,s=i.quality,u=i.pixelSize,f=i.resolution;return o._extractFilter=new p(i.threshold),o._extractFilter.resolution=f,o._blurFilter=l?new d(l):new d(a,s),o.pixelSize=u,o.resolution=f,o}return u(n,e),n.prototype.apply=function(e,n,t,r,o){var i=e.getFilterTexture();this._extractFilter.apply(e,n,i,1,o);var l=e.getFilterTexture();this._blurFilter.apply(e,i,l,1),this.uniforms.bloomScale=this.bloomScale,this.uniforms.brightness=this.brightness,this.uniforms.bloomTexture=l,e.applyFilter(this,n,t,r),e.returnFilterTexture(l),e.returnFilterTexture(i)},Object.defineProperty(n.prototype,"resolution",{get:function(){return this._resolution},set:function(e){this._resolution=e,this._extractFilter&&(this._extractFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"threshold",{get:function(){return this._extractFilter.threshold},set:function(e){this._extractFilter.threshold=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"kernels",{get:function(){return this._blurFilter.kernels},set:function(e){this._blurFilter.kernels=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blur",{get:function(){return this._blurFilter.blur},set:function(e){this._blurFilter.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"quality",{get:function(){return this._blurFilter.quality},set:function(e){this._blurFilter.quality=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"pixelSize",{get:function(){return this._blurFilter.pixelSize},set:function(e){this._blurFilter.pixelSize=e},enumerable:!1,configurable:!0}),n.defaults={threshold:.5,bloomScale:1,brightness:1,kernels:null,blur:8,quality:4,pixelSize:1,resolution:r.settings.FILTER_RESOLUTION},n}(n.Filter),g=function(e){function n(n){void 0===n&&(n=8);var t=e.call(this,c,"varying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n    return floor( coord / size ) * size;\n}\n\nvec2 getMod(vec2 coord, vec2 size)\n{\n    return mod( coord , size) / size;\n}\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n\n    if (clamp(p.x, 0.0, 4.0) == p.x)\n    {\n        if (clamp(p.y, 0.0, 4.0) == p.y)\n        {\n            if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n        }\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    // get the rounded color..\n    vec2 pixCoord = pixelate(coord, vec2(pixelSize));\n    pixCoord = unmapCoord(pixCoord);\n\n    vec4 color = texture2D(uSampler, pixCoord);\n\n    // determine the character to use\n    float gray = (color.r + color.g + color.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    // get the mod..\n    vec2 modd = getMod(coord, vec2(pixelSize));\n\n    gl_FragColor = color * character( n, vec2(-1.0) + modd * 2.0);\n\n}\n")||this;return t.size=n,t}return u(n,e),Object.defineProperty(n.prototype,"size",{get:function(){return this.uniforms.pixelSize},set:function(e){this.uniforms.pixelSize=e},enumerable:!1,configurable:!0}),n}(n.Filter),v=function(e){function n(n){var t=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float transformX;\nuniform float transformY;\nuniform vec3 lightColor;\nuniform float lightAlpha;\nuniform vec3 shadowColor;\nuniform float shadowAlpha;\n\nvoid main(void) {\n    vec2 transform = vec2(1.0 / filterArea) * vec2(transformX, transformY);\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float light = texture2D(uSampler, vTextureCoord - transform).a;\n    float shadow = texture2D(uSampler, vTextureCoord + transform).a;\n\n    color.rgb = mix(color.rgb, lightColor, clamp((color.a - light) * lightAlpha, 0.0, 1.0));\n    color.rgb = mix(color.rgb, shadowColor, clamp((color.a - shadow) * shadowAlpha, 0.0, 1.0));\n    gl_FragColor = vec4(color.rgb * color.a, color.a);\n}\n")||this;return t._thickness=2,t._angle=0,t.uniforms.lightColor=new Float32Array(3),t.uniforms.shadowColor=new Float32Array(3),Object.assign(t,{rotation:45,thickness:2,lightColor:16777215,lightAlpha:.7,shadowColor:0,shadowAlpha:.7},n),t.padding=1,t}return u(n,e),n.prototype._updateTransform=function(){this.uniforms.transformX=this._thickness*Math.cos(this._angle),this.uniforms.transformY=this._thickness*Math.sin(this._angle)},Object.defineProperty(n.prototype,"rotation",{get:function(){return this._angle/t.DEG_TO_RAD},set:function(e){this._angle=e*t.DEG_TO_RAD,this._updateTransform()},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"thickness",{get:function(){return this._thickness},set:function(e){this._thickness=e,this._updateTransform()},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lightColor",{get:function(){return o.rgb2hex(this.uniforms.lightColor)},set:function(e){o.hex2rgb(e,this.uniforms.lightColor)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lightAlpha",{get:function(){return this.uniforms.lightAlpha},set:function(e){this.uniforms.lightAlpha=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"shadowColor",{get:function(){return o.rgb2hex(this.uniforms.shadowColor)},set:function(e){o.hex2rgb(e,this.uniforms.shadowColor)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"shadowAlpha",{get:function(){return this.uniforms.shadowAlpha},set:function(e){this.uniforms.shadowAlpha=e},enumerable:!1,configurable:!0}),n}(n.Filter),y=function(e){function n(n,o,s,u){void 0===n&&(n=2),void 0===o&&(o=4),void 0===s&&(s=r.settings.FILTER_RESOLUTION),void 0===u&&(u=5);var f,c,m=e.call(this)||this;return"number"==typeof n?(f=n,c=n):n instanceof t.Point?(f=n.x,c=n.y):Array.isArray(n)&&(f=n[0],c=n[1]),m.blurXFilter=new a.BlurFilterPass(!0,f,o,s,u),m.blurYFilter=new a.BlurFilterPass(!1,c,o,s,u),m.blurYFilter.blendMode=i.BLEND_MODES.SCREEN,m.defaultFilter=new l.AlphaFilter,m}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=e.getFilterTexture();this.defaultFilter.apply(e,n,t,r),this.blurXFilter.apply(e,n,o,1),this.blurYFilter.apply(e,o,t,0),e.returnFilterTexture(o)},Object.defineProperty(n.prototype,"blur",{get:function(){return this.blurXFilter.blur},set:function(e){this.blurXFilter.blur=this.blurYFilter.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blurX",{get:function(){return this.blurXFilter.blur},set:function(e){this.blurXFilter.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blurY",{get:function(){return this.blurYFilter.blur},set:function(e){this.blurYFilter.blur=e},enumerable:!1,configurable:!0}),n}(n.Filter),b=function(e){function n(t){var r=e.call(this,c,"uniform float radius;\nuniform float strength;\nuniform vec2 center;\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nvoid main()\n{\n    vec2 coord = vTextureCoord * filterArea.xy;\n    coord -= center * dimensions.xy;\n    float distance = length(coord);\n    if (distance < radius) {\n        float percent = distance / radius;\n        if (strength > 0.0) {\n            coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);\n        } else {\n            coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);\n        }\n    }\n    coord += center * dimensions.xy;\n    coord /= filterArea.xy;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    gl_FragColor = color;\n}\n")||this;return r.uniforms.dimensions=new Float32Array(2),Object.assign(r,n.defaults,t),r}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=n.filterFrame,i=o.width,l=o.height;this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.radius},set:function(e){this.uniforms.radius=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"strength",{get:function(){return this.uniforms.strength},set:function(e){this.uniforms.strength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"center",{get:function(){return this.uniforms.center},set:function(e){this.uniforms.center=e},enumerable:!1,configurable:!0}),n.defaults={center:[.5,.5],radius:100,strength:1},n}(n.Filter),x=function(e){function t(n,t,r){void 0===t&&(t=!1),void 0===r&&(r=1);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D colorMap;\nuniform float _mix;\nuniform float _size;\nuniform float _sliceSize;\nuniform float _slicePixelSize;\nuniform float _sliceInnerSize;\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord.xy);\n\n    vec4 adjusted;\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n        float innerWidth = _size - 1.0;\n        float zSlice0 = min(floor(color.b * innerWidth), innerWidth);\n        float zSlice1 = min(zSlice0 + 1.0, innerWidth);\n        float xOffset = _slicePixelSize * 0.5 + color.r * _sliceInnerSize;\n        float s0 = xOffset + (zSlice0 * _sliceSize);\n        float s1 = xOffset + (zSlice1 * _sliceSize);\n        float yOffset = _sliceSize * 0.5 + color.g * (1.0 - _sliceSize);\n        vec4 slice0Color = texture2D(colorMap, vec2(s0,yOffset));\n        vec4 slice1Color = texture2D(colorMap, vec2(s1,yOffset));\n        float zOffset = fract(color.b * innerWidth);\n        adjusted = mix(slice0Color, slice1Color, zOffset);\n\n        color.rgb *= color.a;\n    }\n    gl_FragColor = vec4(mix(color, adjusted, _mix).rgb, color.a);\n\n}")||this;return o.mix=1,o._size=0,o._sliceSize=0,o._slicePixelSize=0,o._sliceInnerSize=0,o._nearest=!1,o._scaleMode=null,o._colorMap=null,o._scaleMode=null,o.nearest=t,o.mix=r,o.colorMap=n,o}return u(t,e),t.prototype.apply=function(e,n,t,r){this.uniforms._mix=this.mix,e.applyFilter(this,n,t,r)},Object.defineProperty(t.prototype,"colorSize",{get:function(){return this._size},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"colorMap",{get:function(){return this._colorMap},set:function(e){var t;e&&(e instanceof n.Texture||(e=n.Texture.from(e)),(null===(t=e)||void 0===t?void 0:t.baseTexture)&&(e.baseTexture.scaleMode=this._scaleMode,e.baseTexture.mipmap=i.MIPMAP_MODES.OFF,this._size=e.height,this._sliceSize=1/this._size,this._slicePixelSize=this._sliceSize/this._size,this._sliceInnerSize=this._slicePixelSize*(this._size-1),this.uniforms._size=this._size,this.uniforms._sliceSize=this._sliceSize,this.uniforms._slicePixelSize=this._slicePixelSize,this.uniforms._sliceInnerSize=this._sliceInnerSize,this.uniforms.colorMap=e),this._colorMap=e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"nearest",{get:function(){return this._nearest},set:function(e){this._nearest=e,this._scaleMode=e?i.SCALE_MODES.NEAREST:i.SCALE_MODES.LINEAR;var n=this._colorMap;n&&n.baseTexture&&(n.baseTexture._glTextures={},n.baseTexture.scaleMode=this._scaleMode,n.baseTexture.mipmap=i.MIPMAP_MODES.OFF,n._updateID++,n.baseTexture.emit("update",n.baseTexture))},enumerable:!1,configurable:!0}),t.prototype.updateColorMap=function(){var e=this._colorMap;e&&e.baseTexture&&(e._updateID++,e.baseTexture.emit("update",e.baseTexture),this.colorMap=e)},t.prototype.destroy=function(n){void 0===n&&(n=!1),this._colorMap&&this._colorMap.destroy(n),e.prototype.destroy.call(this)},t}(n.Filter),_=function(e){function n(n,t){void 0===n&&(n=0),void 0===t&&(t=1);var r=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 color;\nuniform float alpha;\n\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = vec4(mix(currentColor.rgb, color.rgb, currentColor.a * alpha), currentColor.a);\n}\n")||this;return r._color=0,r._alpha=1,r.uniforms.color=new Float32Array(3),r.color=n,r.alpha=t,r}return u(n,e),Object.defineProperty(n.prototype,"color",{get:function(){return this._color},set:function(e){var n=this.uniforms.color;"number"==typeof e?(o.hex2rgb(e,n),this._color=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],this._color=o.rgb2hex(n))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"alpha",{get:function(){return this._alpha},set:function(e){this.uniforms.alpha=e,this._alpha=e},enumerable:!1,configurable:!0}),n}(n.Filter),C=function(e){function n(n,t,r){void 0===n&&(n=16711680),void 0===t&&(t=0),void 0===r&&(r=.4);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 originalColor;\nuniform vec3 newColor;\nuniform float epsilon;\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    vec3 colorDiff = originalColor - (currentColor.rgb / max(currentColor.a, 0.0000000001));\n    float colorDistance = length(colorDiff);\n    float doReplace = step(colorDistance, epsilon);\n    gl_FragColor = vec4(mix(currentColor.rgb, (newColor + colorDiff) * currentColor.a, doReplace), currentColor.a);\n}\n")||this;return o._originalColor=16711680,o._newColor=0,o.uniforms.originalColor=new Float32Array(3),o.uniforms.newColor=new Float32Array(3),o.originalColor=n,o.newColor=t,o.epsilon=r,o}return u(n,e),Object.defineProperty(n.prototype,"originalColor",{get:function(){return this._originalColor},set:function(e){var n=this.uniforms.originalColor;"number"==typeof e?(o.hex2rgb(e,n),this._originalColor=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],this._originalColor=o.rgb2hex(n))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"newColor",{get:function(){return this._newColor},set:function(e){var n=this.uniforms.newColor;"number"==typeof e?(o.hex2rgb(e,n),this._newColor=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],this._newColor=o.rgb2hex(n))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"epsilon",{get:function(){return this.uniforms.epsilon},set:function(e){this.uniforms.epsilon=e},enumerable:!1,configurable:!0}),n}(n.Filter),S=function(e){function n(n,t,r){void 0===t&&(t=200),void 0===r&&(r=200);var o=e.call(this,c,"precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n")||this;return o.uniforms.texelSize=new Float32Array(2),o.uniforms.matrix=new Float32Array(9),void 0!==n&&(o.matrix=n),o.width=t,o.height=r,o}return u(n,e),Object.defineProperty(n.prototype,"matrix",{get:function(){return this.uniforms.matrix},set:function(e){var n=this;e.forEach((function(e,t){n.uniforms.matrix[t]=e}))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"width",{get:function(){return 1/this.uniforms.texelSize[0]},set:function(e){this.uniforms.texelSize[0]=1/e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"height",{get:function(){return 1/this.uniforms.texelSize[1]},set:function(e){this.uniforms.texelSize[1]=1/e},enumerable:!1,configurable:!0}),n}(n.Filter),F=function(e){function n(){return e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n")||this}return u(n,e),n}(n.Filter),z=function(e){function n(t){var r=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nconst float SQRT_2 = 1.414213;\n\nconst float light = 1.0;\n\nuniform float curvature;\nuniform float lineWidth;\nuniform float lineContrast;\nuniform bool verticalLine;\nuniform float noise;\nuniform float noiseSize;\n\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\n\nuniform float seed;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 dir = vec2(vTextureCoord.xy * filterArea.xy / dimensions - vec2(0.5, 0.5));\n    \n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 rgb = gl_FragColor.rgb;\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        rgb += _noise * noise;\n    }\n\n    if (lineWidth > 0.0)\n    {\n        float _c = curvature > 0. ? curvature : 1.;\n        float k = curvature > 0. ?(length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;\n        vec2 uv = dir * k;\n\n        float v = (verticalLine ? uv.x * dimensions.x : uv.y * dimensions.y) * min(1.0, 2.0 / lineWidth ) / _c;\n        float j = 1. + cos(v * 1.2 - time) * 0.5 * lineContrast;\n        rgb *= j;\n        float segment = verticalLine ? mod((dir.x + .5) * dimensions.x, 4.) : mod((dir.y + .5) * dimensions.y, 4.);\n        rgb *= 0.99 + ceil(segment) * 0.015;\n    }\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    gl_FragColor.rgb = rgb;\n}\n")||this;return r.time=0,r.seed=0,r.uniforms.dimensions=new Float32Array(2),Object.assign(r,n.defaults,t),r}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=n.filterFrame,i=o.width,l=o.height;this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,this.uniforms.seed=this.seed,this.uniforms.time=this.time,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"curvature",{get:function(){return this.uniforms.curvature},set:function(e){this.uniforms.curvature=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lineWidth",{get:function(){return this.uniforms.lineWidth},set:function(e){this.uniforms.lineWidth=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lineContrast",{get:function(){return this.uniforms.lineContrast},set:function(e){this.uniforms.lineContrast=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"verticalLine",{get:function(){return this.uniforms.verticalLine},set:function(e){this.uniforms.verticalLine=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"noise",{get:function(){return this.uniforms.noise},set:function(e){this.uniforms.noise=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"noiseSize",{get:function(){return this.uniforms.noiseSize},set:function(e){this.uniforms.noiseSize=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignetting",{get:function(){return this.uniforms.vignetting},set:function(e){this.uniforms.vignetting=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignettingAlpha",{get:function(){return this.uniforms.vignettingAlpha},set:function(e){this.uniforms.vignettingAlpha=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignettingBlur",{get:function(){return this.uniforms.vignettingBlur},set:function(e){this.uniforms.vignettingBlur=e},enumerable:!1,configurable:!0}),n.defaults={curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,seed:0,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0},n}(n.Filter),O=function(e){function n(n,t){void 0===n&&(n=1),void 0===t&&(t=5);var r=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 filterArea;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * filterArea.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n")||this;return r.scale=n,r.angle=t,r}return u(n,e),Object.defineProperty(n.prototype,"scale",{get:function(){return this.uniforms.scale},set:function(e){this.uniforms.scale=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"angle",{get:function(){return this.uniforms.angle},set:function(e){this.uniforms.angle=e},enumerable:!1,configurable:!0}),n}(n.Filter),P=function(e){function i(o){var l=e.call(this)||this;l.angle=45,l._distance=5,l._resolution=r.settings.FILTER_RESOLUTION;var a=o?f(f({},i.defaults),o):i.defaults,s=a.kernels,u=a.blur,m=a.quality,p=a.pixelSize,h=a.resolution;l._tintFilter=new n.Filter(c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform vec3 color;\n\nuniform vec2 shift;\nuniform vec4 inputSize;\n\nvoid main(void){\n    vec4 sample = texture2D(uSampler, vTextureCoord - shift * inputSize.zw);\n\n    // Premultiply alpha\n    sample.rgb = color.rgb * sample.a;\n\n    // alpha user alpha\n    sample *= alpha;\n\n    gl_FragColor = sample;\n}"),l._tintFilter.uniforms.color=new Float32Array(4),l._tintFilter.uniforms.shift=new t.Point,l._tintFilter.resolution=h,l._blurFilter=s?new d(s):new d(u,m),l.pixelSize=p,l.resolution=h;var g=a.shadowOnly,v=a.rotation,y=a.distance,b=a.alpha,x=a.color;return l.shadowOnly=g,l.rotation=v,l.distance=y,l.alpha=b,l.color=x,l._updatePadding(),l}return u(i,e),i.prototype.apply=function(e,n,t,r){var o=e.getFilterTexture();this._tintFilter.apply(e,n,o,1),this._blurFilter.apply(e,o,t,r),!0!==this.shadowOnly&&e.applyFilter(this,n,t,0),e.returnFilterTexture(o)},i.prototype._updatePadding=function(){this.padding=this.distance+2*this.blur},i.prototype._updateShift=function(){this._tintFilter.uniforms.shift.set(this.distance*Math.cos(this.angle),this.distance*Math.sin(this.angle))},Object.defineProperty(i.prototype,"resolution",{get:function(){return this._resolution},set:function(e){this._resolution=e,this._tintFilter&&(this._tintFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"distance",{get:function(){return this._distance},set:function(e){this._distance=e,this._updatePadding(),this._updateShift()},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"rotation",{get:function(){return this.angle/t.DEG_TO_RAD},set:function(e){this.angle=e*t.DEG_TO_RAD,this._updateShift()},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"alpha",{get:function(){return this._tintFilter.uniforms.alpha},set:function(e){this._tintFilter.uniforms.alpha=e},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"color",{get:function(){return o.rgb2hex(this._tintFilter.uniforms.color)},set:function(e){o.hex2rgb(e,this._tintFilter.uniforms.color)},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"kernels",{get:function(){return this._blurFilter.kernels},set:function(e){this._blurFilter.kernels=e},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"blur",{get:function(){return this._blurFilter.blur},set:function(e){this._blurFilter.blur=e,this._updatePadding()},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"quality",{get:function(){return this._blurFilter.quality},set:function(e){this._blurFilter.quality=e},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"pixelSize",{get:function(){return this._blurFilter.pixelSize},set:function(e){this._blurFilter.pixelSize=e},enumerable:!1,configurable:!0}),i.defaults={rotation:45,distance:5,color:0,alpha:.5,shadowOnly:!1,kernels:null,blur:2,quality:3,pixelSize:1,resolution:r.settings.FILTER_RESOLUTION},i}(n.Filter),A=function(e){function n(n){void 0===n&&(n=5);var t=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float strength;\nuniform vec4 filterArea;\n\n\nvoid main(void)\n{\n\tvec2 onePixel = vec2(1.0 / filterArea);\n\n\tvec4 color;\n\n\tcolor.rgb = vec3(0.5);\n\n\tcolor -= texture2D(uSampler, vTextureCoord - onePixel) * strength;\n\tcolor += texture2D(uSampler, vTextureCoord + onePixel) * strength;\n\n\tcolor.rgb = vec3((color.r + color.g + color.b) / 3.0);\n\n\tfloat alpha = texture2D(uSampler, vTextureCoord).a;\n\n\tgl_FragColor = vec4(color.rgb * alpha, alpha);\n}\n")||this;return t.strength=n,t}return u(n,e),Object.defineProperty(n.prototype,"strength",{get:function(){return this.uniforms.strength},set:function(e){this.uniforms.strength=e},enumerable:!1,configurable:!0}),n}(n.Filter),T=function(e){function r(t){var o=e.call(this,c,"// precision highp float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\nuniform float aspect;\n\nuniform sampler2D displacementMap;\nuniform float offset;\nuniform float sinDir;\nuniform float cosDir;\nuniform int fillMode;\n\nuniform float seed;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nconst int TRANSPARENT = 0;\nconst int ORIGINAL = 1;\nconst int LOOP = 2;\nconst int CLAMP = 3;\nconst int MIRROR = 4;\n\nvoid main(void)\n{\n    vec2 coord = (vTextureCoord * filterArea.xy) / dimensions;\n\n    if (coord.x > 1.0 || coord.y > 1.0) {\n        return;\n    }\n\n    float cx = coord.x - 0.5;\n    float cy = (coord.y - 0.5) * aspect;\n    float ny = (-sinDir * cx + cosDir * cy) / aspect + 0.5;\n\n    // displacementMap: repeat\n    // ny = ny > 1.0 ? ny - 1.0 : (ny < 0.0 ? 1.0 + ny : ny);\n\n    // displacementMap: mirror\n    ny = ny > 1.0 ? 2.0 - ny : (ny < 0.0 ? -ny : ny);\n\n    vec4 dc = texture2D(displacementMap, vec2(0.5, ny));\n\n    float displacement = (dc.r - dc.g) * (offset / filterArea.x);\n\n    coord = vTextureCoord + vec2(cosDir * displacement, sinDir * displacement * aspect);\n\n    if (fillMode == CLAMP) {\n        coord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    } else {\n        if( coord.x > filterClamp.z ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x -= filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x = filterClamp.z * 2.0 - coord.x;\n            }\n        } else if( coord.x < filterClamp.x ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x += filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x *= -filterClamp.z;\n            }\n        }\n\n        if( coord.y > filterClamp.w ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y -= filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y = filterClamp.w * 2.0 - coord.y;\n            }\n        } else if( coord.y < filterClamp.y ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y += filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y *= -filterClamp.w;\n            }\n        }\n    }\n\n    gl_FragColor.r = texture2D(uSampler, coord + red * (1.0 - seed * 0.4) / filterArea.xy).r;\n    gl_FragColor.g = texture2D(uSampler, coord + green * (1.0 - seed * 0.3) / filterArea.xy).g;\n    gl_FragColor.b = texture2D(uSampler, coord + blue * (1.0 - seed * 0.2) / filterArea.xy).b;\n    gl_FragColor.a = texture2D(uSampler, coord).a;\n}\n")||this;return o.offset=100,o.fillMode=r.TRANSPARENT,o.average=!1,o.seed=0,o.minSize=8,o.sampleSize=512,o._slices=0,o._offsets=new Float32Array(1),o._sizes=new Float32Array(1),o._direction=-1,o.uniforms.dimensions=new Float32Array(2),o._canvas=document.createElement("canvas"),o._canvas.width=4,o._canvas.height=o.sampleSize,o.texture=n.Texture.from(o._canvas,{scaleMode:i.SCALE_MODES.NEAREST}),Object.assign(o,r.defaults,t),o}return u(r,e),r.prototype.apply=function(e,n,t,r){var o=n.filterFrame,i=o.width,l=o.height;this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,this.uniforms.aspect=l/i,this.uniforms.seed=this.seed,this.uniforms.offset=this.offset,this.uniforms.fillMode=this.fillMode,e.applyFilter(this,n,t,r)},r.prototype._randomizeSizes=function(){var e=this._sizes,n=this._slices-1,t=this.sampleSize,r=Math.min(this.minSize/t,.9/this._slices);if(this.average){for(var o=this._slices,i=1,l=0;l<n;l++){var a=i/(o-l),s=Math.max(a*(1-.6*Math.random()),r);e[l]=s,i-=s}e[n]=i}else{i=1;var u=Math.sqrt(1/this._slices);for(l=0;l<n;l++){s=Math.max(u*i*Math.random(),r);e[l]=s,i-=s}e[n]=i}this.shuffle()},r.prototype.shuffle=function(){for(var e=this._sizes,n=this._slices-1;n>0;n--){var t=Math.random()*n>>0,r=e[n];e[n]=e[t],e[t]=r}},r.prototype._randomizeOffsets=function(){for(var e=0;e<this._slices;e++)this._offsets[e]=Math.random()*(Math.random()<.5?-1:1)},r.prototype.refresh=function(){this._randomizeSizes(),this._randomizeOffsets(),this.redraw()},r.prototype.redraw=function(){var e,n=this.sampleSize,t=this.texture,r=this._canvas.getContext("2d");r.clearRect(0,0,8,n);for(var o=0,i=0;i<this._slices;i++){e=Math.floor(256*this._offsets[i]);var l=this._sizes[i]*n,a=e>0?e:0,s=e<0?-e:0;r.fillStyle="rgba("+a+", "+s+", 0, 1)",r.fillRect(0,o>>0,n,l+1>>0),o+=l}t.baseTexture.update(),this.uniforms.displacementMap=t},Object.defineProperty(r.prototype,"sizes",{get:function(){return this._sizes},set:function(e){for(var n=Math.min(this._slices,e.length),t=0;t<n;t++)this._sizes[t]=e[t]},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"offsets",{get:function(){return this._offsets},set:function(e){for(var n=Math.min(this._slices,e.length),t=0;t<n;t++)this._offsets[t]=e[t]},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"slices",{get:function(){return this._slices},set:function(e){this._slices!==e&&(this._slices=e,this.uniforms.slices=e,this._sizes=this.uniforms.slicesWidth=new Float32Array(e),this._offsets=this.uniforms.slicesOffset=new Float32Array(e),this.refresh())},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"direction",{get:function(){return this._direction},set:function(e){if(this._direction!==e){this._direction=e;var n=e*t.DEG_TO_RAD;this.uniforms.sinDir=Math.sin(n),this.uniforms.cosDir=Math.cos(n)}},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"red",{get:function(){return this.uniforms.red},set:function(e){this.uniforms.red=e},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"green",{get:function(){return this.uniforms.green},set:function(e){this.uniforms.green=e},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"blue",{get:function(){return this.uniforms.blue},set:function(e){this.uniforms.blue=e},enumerable:!1,configurable:!0}),r.prototype.destroy=function(){var e;null===(e=this.texture)||void 0===e||e.destroy(!0),this.texture=this._canvas=this.red=this.green=this.blue=this._sizes=this._offsets=null},r.defaults={slices:5,offset:100,direction:0,fillMode:0,average:!1,seed:0,red:[0,0],green:[0,0],blue:[0,0],minSize:8,sampleSize:512},r.TRANSPARENT=0,r.ORIGINAL=1,r.LOOP=2,r.CLAMP=3,r.MIRROR=4,r}(n.Filter),w=function(e){function n(t){var r=this,o=Object.assign({},n.defaults,t),i=o.outerStrength,l=o.innerStrength,a=o.color,s=o.knockout,u=o.quality,f=Math.round(o.distance);return(r=e.call(this,c,"varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nuniform float outerStrength;\nuniform float innerStrength;\n\nuniform vec4 glowColor;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform bool knockout;\n\nconst float PI = 3.14159265358979323846264;\n\nconst float DIST = __DIST__;\nconst float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.0);\nconst float ANGLE_STEP_NUM = ceil(PI * 2.0 / ANGLE_STEP_SIZE);\n\nconst float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.0) / 2.0;\n\nvoid main(void) {\n    vec2 px = vec2(1.0 / filterArea.x, 1.0 / filterArea.y);\n\n    float totalAlpha = 0.0;\n\n    vec2 direction;\n    vec2 displaced;\n    vec4 curColor;\n\n    for (float angle = 0.0; angle < PI * 2.0; angle += ANGLE_STEP_SIZE) {\n       direction = vec2(cos(angle), sin(angle)) * px;\n\n       for (float curDistance = 0.0; curDistance < DIST; curDistance++) {\n           displaced = clamp(vTextureCoord + direction * \n                   (curDistance + 1.0), filterClamp.xy, filterClamp.zw);\n\n           curColor = texture2D(uSampler, displaced);\n\n           totalAlpha += (DIST - curDistance) * curColor.a;\n       }\n    }\n    \n    curColor = texture2D(uSampler, vTextureCoord);\n\n    float alphaRatio = (totalAlpha / MAX_TOTAL_ALPHA);\n\n    float innerGlowAlpha = (1.0 - alphaRatio) * innerStrength * curColor.a;\n    float innerGlowStrength = min(1.0, innerGlowAlpha);\n    \n    vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);\n\n    float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a);\n    float outerGlowStrength = min(1.0 - innerColor.a, outerGlowAlpha);\n\n    vec4 outerGlowColor = outerGlowStrength * glowColor.rgba;\n    \n    if (knockout) {\n      float resultAlpha = outerGlowAlpha + innerGlowAlpha;\n      gl_FragColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);\n    }\n    else {\n      gl_FragColor = innerColor + outerGlowColor;\n    }\n}\n".replace(/__ANGLE_STEP_SIZE__/gi,""+(1/u/f).toFixed(7)).replace(/__DIST__/gi,f.toFixed(0)+".0"))||this).uniforms.glowColor=new Float32Array([0,0,0,1]),Object.assign(r,{color:a,outerStrength:i,innerStrength:l,padding:f,knockout:s}),r}return u(n,e),Object.defineProperty(n.prototype,"color",{get:function(){return o.rgb2hex(this.uniforms.glowColor)},set:function(e){o.hex2rgb(e,this.uniforms.glowColor)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"outerStrength",{get:function(){return this.uniforms.outerStrength},set:function(e){this.uniforms.outerStrength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"innerStrength",{get:function(){return this.uniforms.innerStrength},set:function(e){this.uniforms.innerStrength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"knockout",{get:function(){return this.uniforms.knockout},set:function(e){this.uniforms.knockout=e},enumerable:!1,configurable:!0}),n.defaults={distance:10,outerStrength:4,innerStrength:0,color:16777215,quality:.1,knockout:!1},n}(n.Filter),D=function(e){function n(r){var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform vec2 light;\nuniform bool parallel;\nuniform float aspect;\n\nuniform float gain;\nuniform float lacunarity;\nuniform float time;\nuniform float alpha;\n\n${perlin}\n\nvoid main(void) {\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    float d;\n\n    if (parallel) {\n        float _cos = light.x;\n        float _sin = light.y;\n        d = (_cos * coord.x) + (_sin * coord.y * aspect);\n    } else {\n        float dx = coord.x - light.x / dimensions.x;\n        float dy = (coord.y - light.y / dimensions.y) * aspect;\n        float dis = sqrt(dx * dx + dy * dy) + 0.00001;\n        d = dy / dis;\n    }\n\n    vec3 dir = vec3(d, d, 0.0);\n\n    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);\n    noise = mix(noise, 0.0, 0.3);\n    //fade vertically.\n    vec4 mist = vec4(noise, noise, noise, 1.0) * (1.0 - coord.y);\n    mist.a = 1.0;\n    // apply user alpha\n    mist *= alpha;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord) + mist;\n\n}\n".replace("${perlin}","vec3 mod289(vec3 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x)\n{\n    return mod289(((x * 34.0) + 1.0) * x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t)\n{\n    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0);\n    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    vec4 gx1 = ixy1 * (1.0 / 7.0);\n    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n    return 2.2 * n_xyz;\n}\nfloat turb(vec3 P, vec3 rep, float lacunarity, float gain)\n{\n    float sum = 0.0;\n    float sc = 1.0;\n    float totalgain = 1.0;\n    for (float i = 0.0; i < 6.0; i++)\n    {\n        sum += totalgain * pnoise(P * sc, rep);\n        sc *= lacunarity;\n        totalgain *= gain;\n    }\n    return abs(sum);\n}\n"))||this;o.parallel=!0,o.time=0,o._angle=0,o.uniforms.dimensions=new Float32Array(2);var i=Object.assign(n.defaults,r);return o._angleLight=new t.Point,o.angle=i.angle,o.gain=i.gain,o.lacunarity=i.lacunarity,o.alpha=i.alpha,o.parallel=i.parallel,o.center=i.center,o.time=i.time,o}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=n.filterFrame,i=o.width,l=o.height;this.uniforms.light=this.parallel?this._angleLight:this.center,this.uniforms.parallel=this.parallel,this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,this.uniforms.aspect=l/i,this.uniforms.time=this.time,this.uniforms.alpha=this.alpha,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"angle",{get:function(){return this._angle},set:function(e){this._angle=e;var n=e*t.DEG_TO_RAD;this._angleLight.x=Math.cos(n),this._angleLight.y=Math.sin(n)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"gain",{get:function(){return this.uniforms.gain},set:function(e){this.uniforms.gain=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lacunarity",{get:function(){return this.uniforms.lacunarity},set:function(e){this.uniforms.lacunarity=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"alpha",{get:function(){return this.uniforms.alpha},set:function(e){this.uniforms.alpha=e},enumerable:!1,configurable:!0}),n.defaults={angle:30,gain:.5,lacunarity:2.5,time:0,parallel:!0,center:[0,0],alpha:1},n}(n.Filter),j=function(e){function n(n,r,o){void 0===n&&(n=[0,0]),void 0===r&&(r=5),void 0===o&&(o=0);var i=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uVelocity;\nuniform int uKernelSize;\nuniform float uOffset;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\n// Notice:\n// the perfect way:\n//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);\n// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.\n// So use uKernelSize directly.\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    vec2 velocity = uVelocity / filterArea.xy;\n    float offset = -uOffset / length(uVelocity) - 0.5;\n    int k = uKernelSize - 1;\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n        vec2 bias = velocity * (float(i) / float(k) + offset);\n        color += texture2D(uSampler, vTextureCoord + bias);\n    }\n    gl_FragColor = color / float(uKernelSize);\n}\n")||this;return i.kernelSize=5,i.uniforms.uVelocity=new Float32Array(2),i._velocity=new t.ObservablePoint(i.velocityChanged,i),i.setVelocity(n),i.kernelSize=r,i.offset=o,i}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=this.velocity,i=o.x,l=o.y;this.uniforms.uKernelSize=0!==i||0!==l?this.kernelSize:0,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"velocity",{get:function(){return this._velocity},set:function(e){this.setVelocity(e)},enumerable:!1,configurable:!0}),n.prototype.setVelocity=function(e){if(Array.isArray(e)){var n=e[0],t=e[1];this._velocity.set(n,t)}else this._velocity.copyFrom(e)},n.prototype.velocityChanged=function(){this.uniforms.uVelocity[0]=this._velocity.x,this.uniforms.uVelocity[1]=this._velocity.y,this.padding=1+(Math.max(Math.abs(this._velocity.x),Math.abs(this._velocity.y))>>0)},Object.defineProperty(n.prototype,"offset",{get:function(){return this.uniforms.uOffset},set:function(e){this.uniforms.uOffset=e},enumerable:!1,configurable:!0}),n}(n.Filter),M=function(e){function n(n,t,r){void 0===t&&(t=.05),void 0===r&&(r=n.length);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float epsilon;\n\nconst int MAX_COLORS = %maxColors%;\n\nuniform vec3 originalColors[MAX_COLORS];\nuniform vec3 targetColors[MAX_COLORS];\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    float alpha = gl_FragColor.a;\n    if (alpha < 0.0001)\n    {\n      return;\n    }\n\n    vec3 color = gl_FragColor.rgb / alpha;\n\n    for(int i = 0; i < MAX_COLORS; i++)\n    {\n      vec3 origColor = originalColors[i];\n      if (origColor.r < 0.0)\n      {\n        break;\n      }\n      vec3 colorDiff = origColor - color;\n      if (length(colorDiff) < epsilon)\n      {\n        vec3 targetColor = targetColors[i];\n        gl_FragColor = vec4((targetColor + colorDiff) * alpha, alpha);\n        return;\n      }\n    }\n}\n".replace(/%maxColors%/g,r.toFixed(0)))||this;return o._replacements=[],o._maxColors=0,o.epsilon=t,o._maxColors=r,o.uniforms.originalColors=new Float32Array(3*r),o.uniforms.targetColors=new Float32Array(3*r),o.replacements=n,o}return u(n,e),Object.defineProperty(n.prototype,"replacements",{get:function(){return this._replacements},set:function(e){var n=this.uniforms.originalColors,t=this.uniforms.targetColors,r=e.length;if(r>this._maxColors)throw new Error("Length of replacements ("+r+") exceeds the maximum colors length ("+this._maxColors+")");n[3*r]=-1;for(var i=0;i<r;i++){var l=e[i],a=l[0];"number"==typeof a?a=o.hex2rgb(a):l[0]=o.rgb2hex(a),n[3*i]=a[0],n[3*i+1]=a[1],n[3*i+2]=a[2];var s=l[1];"number"==typeof s?s=o.hex2rgb(s):l[1]=o.rgb2hex(s),t[3*i]=s[0],t[3*i+1]=s[1],t[3*i+2]=s[2]}this._replacements=e},enumerable:!1,configurable:!0}),n.prototype.refresh=function(){this.replacements=this._replacements},Object.defineProperty(n.prototype,"maxColors",{get:function(){return this._maxColors},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"epsilon",{get:function(){return this.uniforms.epsilon},set:function(e){this.uniforms.epsilon=e},enumerable:!1,configurable:!0}),n}(n.Filter),R=function(e){function n(t,r){void 0===r&&(r=0);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform float sepia;\nuniform float noise;\nuniform float noiseSize;\nuniform float scratch;\nuniform float scratchDensity;\nuniform float scratchWidth;\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\nuniform float seed;\n\nconst float SQRT_2 = 1.414213;\nconst vec3 SEPIA_RGB = vec3(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvec3 Overlay(vec3 src, vec3 dst)\n{\n    // if (dst <= 0.5) then: 2 * src * dst\n    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)\n    return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)),\n                (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)),\n                (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));\n}\n\n\nvoid main()\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 color = gl_FragColor.rgb;\n\n    if (sepia > 0.0)\n    {\n        float gray = (color.x + color.y + color.z) / 3.0;\n        vec3 grayscale = vec3(gray);\n\n        color = Overlay(SEPIA_RGB, grayscale);\n\n        color = grayscale + sepia * (color - grayscale);\n    }\n\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        vec2 dir = vec2(vec2(0.5, 0.5) - coord);\n        dir.y *= dimensions.y / dimensions.x;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        color.rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    if (scratchDensity > seed && scratch != 0.0)\n    {\n        float phase = seed * 256.0;\n        float s = mod(floor(phase), 2.0);\n        float dist = 1.0 / scratchDensity;\n        float d = distance(coord, vec2(seed * dist, abs(s - seed * dist)));\n        if (d < seed * 0.6 + 0.4)\n        {\n            highp float period = scratchDensity * 10.0;\n\n            float xx = coord.x * period + phase;\n            float aa = abs(mod(xx, 0.5) * 4.0);\n            float bb = mod(floor(xx / 0.5), 2.0);\n            float yy = (1.0 - bb) * aa + bb * (2.0 - aa);\n\n            float kk = 2.0 * period;\n            float dw = scratchWidth / dimensions.x * (0.75 + seed);\n            float dh = dw * kk;\n\n            float tine = (yy - (2.0 - dh));\n\n            if (tine > 0.0) {\n                float _sign = sign(scratch);\n\n                tine = s * tine / period + scratch + 0.1;\n                tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);\n\n                color.rgb *= tine;\n            }\n        }\n    }\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        // vec2 d = pixelCoord * noiseSize * vec2(1024.0 + seed * 512.0, 1024.0 - seed * 512.0);\n        // float _noise = snoise(d) * 0.5;\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        color += _noise * noise;\n    }\n\n    gl_FragColor.rgb = color;\n}\n")||this;return o.seed=0,o.uniforms.dimensions=new Float32Array(2),"number"==typeof t?(o.seed=t,t=void 0):o.seed=r,Object.assign(o,n.defaults,t),o}return u(n,e),n.prototype.apply=function(e,n,t,r){var o,i;this.uniforms.dimensions[0]=null===(o=n.filterFrame)||void 0===o?void 0:o.width,this.uniforms.dimensions[1]=null===(i=n.filterFrame)||void 0===i?void 0:i.height,this.uniforms.seed=this.seed,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"sepia",{get:function(){return this.uniforms.sepia},set:function(e){this.uniforms.sepia=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"noise",{get:function(){return this.uniforms.noise},set:function(e){this.uniforms.noise=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"noiseSize",{get:function(){return this.uniforms.noiseSize},set:function(e){this.uniforms.noiseSize=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"scratch",{get:function(){return this.uniforms.scratch},set:function(e){this.uniforms.scratch=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"scratchDensity",{get:function(){return this.uniforms.scratchDensity},set:function(e){this.uniforms.scratchDensity=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"scratchWidth",{get:function(){return this.uniforms.scratchWidth},set:function(e){this.uniforms.scratchWidth=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignetting",{get:function(){return this.uniforms.vignetting},set:function(e){this.uniforms.vignetting=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignettingAlpha",{get:function(){return this.uniforms.vignettingAlpha},set:function(e){this.uniforms.vignettingAlpha=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignettingBlur",{get:function(){return this.uniforms.vignettingBlur},set:function(e){this.uniforms.vignettingBlur=e},enumerable:!1,configurable:!0}),n.defaults={sepia:.3,noise:.3,noiseSize:1,scratch:.5,scratchDensity:.3,scratchWidth:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3},n}(n.Filter),E=function(e){function n(t,r,o){void 0===t&&(t=1),void 0===r&&(r=0),void 0===o&&(o=.1);var i=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 thickness;\nuniform vec4 outlineColor;\nuniform vec4 filterClamp;\n\nconst float DOUBLE_PI = 3.14159265358979323846264 * 2.;\n\nvoid main(void) {\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float maxAlpha = 0.;\n    vec2 displaced;\n    for (float angle = 0.; angle <= DOUBLE_PI; angle += ${angleStep}) {\n        displaced.x = vTextureCoord.x + thickness.x * cos(angle);\n        displaced.y = vTextureCoord.y + thickness.y * sin(angle);\n        curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n        maxAlpha = max(maxAlpha, curColor.a);\n    }\n    float resultAlpha = max(maxAlpha, ownColor.a);\n    gl_FragColor = vec4((ownColor.rgb + outlineColor.rgb * (1. - ownColor.a)) * resultAlpha, resultAlpha);\n}\n".replace(/\$\{angleStep\}/,n.getAngleStep(o)))||this;return i._thickness=1,i.uniforms.thickness=new Float32Array([0,0]),i.uniforms.outlineColor=new Float32Array([0,0,0,1]),Object.assign(i,{thickness:t,color:r,quality:o}),i}return u(n,e),n.getAngleStep=function(e){var t=Math.max(e*n.MAX_SAMPLES,n.MIN_SAMPLES);return(2*Math.PI/t).toFixed(7)},n.prototype.apply=function(e,n,t,r){this.uniforms.thickness[0]=this._thickness/n._frame.width,this.uniforms.thickness[1]=this._thickness/n._frame.height,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"color",{get:function(){return o.rgb2hex(this.uniforms.outlineColor)},set:function(e){o.hex2rgb(e,this.uniforms.outlineColor)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"thickness",{get:function(){return this._thickness},set:function(e){this._thickness=e,this.padding=e},enumerable:!1,configurable:!0}),n.MIN_SAMPLES=1,n.MAX_SAMPLES=100,n}(n.Filter),I=function(e){function n(n){void 0===n&&(n=10);var t=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec2 size;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n\treturn floor( coord / size ) * size;\n}\n\nvoid main(void)\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = pixelate(coord, size);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord);\n}\n")||this;return t.size=n,t}return u(n,e),Object.defineProperty(n.prototype,"size",{get:function(){return this.uniforms.size},set:function(e){"number"==typeof e&&(e=[e,e]),this.uniforms.size=e},enumerable:!1,configurable:!0}),n}(n.Filter),k=function(e){function n(n,t,r,o){void 0===n&&(n=0),void 0===t&&(t=[0,0]),void 0===r&&(r=5),void 0===o&&(o=-1);var i=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float uRadian;\nuniform vec2 uCenter;\nuniform float uRadius;\nuniform int uKernelSize;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    float aspect = filterArea.y / filterArea.x;\n    vec2 center = uCenter.xy / filterArea.xy;\n    float gradient = uRadius / filterArea.x * 0.3;\n    float radius = uRadius / filterArea.x - gradient * 0.5;\n    int k = uKernelSize - 1;\n\n    vec2 coord = vTextureCoord;\n    vec2 dir = vec2(center - coord);\n    float dist = length(vec2(dir.x, dir.y * aspect));\n\n    float radianStep = uRadian;\n    if (radius >= 0.0 && dist > radius) {\n        float delta = dist - radius;\n        float gap = gradient;\n        float scale = 1.0 - abs(delta / gap);\n        if (scale <= 0.0) {\n            gl_FragColor = color;\n            return;\n        }\n        radianStep *= scale;\n    }\n    radianStep /= float(k);\n\n    float s = sin(radianStep);\n    float c = cos(radianStep);\n    mat2 rotationMatrix = mat2(vec2(c, -s), vec2(s, c));\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n\n        coord -= center;\n        coord.y *= aspect;\n        coord = rotationMatrix * coord;\n        coord.y /= aspect;\n        coord += center;\n\n        vec4 sample = texture2D(uSampler, coord);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample;\n    }\n\n    gl_FragColor = color / float(uKernelSize);\n}\n")||this;return i._angle=0,i.angle=n,i.center=t,i.kernelSize=r,i.radius=o,i}return u(n,e),n.prototype.apply=function(e,n,t,r){this.uniforms.uKernelSize=0!==this._angle?this.kernelSize:0,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"angle",{get:function(){return this._angle},set:function(e){this._angle=e,this.uniforms.uRadian=e*Math.PI/180},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"center",{get:function(){return this.uniforms.uCenter},set:function(e){this.uniforms.uCenter=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.uRadius},set:function(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e},enumerable:!1,configurable:!0}),n}(n.Filter),L=function(e){function n(t){var r=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nuniform bool mirror;\nuniform float boundary;\nuniform vec2 amplitude;\nuniform vec2 waveLength;\nuniform vec2 alpha;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    if (coord.y < boundary) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    float k = (coord.y - boundary) / (1. - boundary + 0.0001);\n    float areaY = boundary * dimensions.y / filterArea.y;\n    float v = areaY + areaY - vTextureCoord.y;\n    float y = mirror ? v : vTextureCoord.y;\n\n    float _amplitude = ((amplitude.y - amplitude.x) * k + amplitude.x ) / filterArea.x;\n    float _waveLength = ((waveLength.y - waveLength.x) * k + waveLength.x) / filterArea.y;\n    float _alpha = (alpha.y - alpha.x) * k + alpha.x;\n\n    float x = vTextureCoord.x + cos(v * 6.28 / _waveLength - time) * _amplitude;\n    x = clamp(x, filterClamp.x, filterClamp.z);\n\n    vec4 color = texture2D(uSampler, vec2(x, y));\n\n    gl_FragColor = color * _alpha;\n}\n")||this;return r.time=0,r.uniforms.amplitude=new Float32Array(2),r.uniforms.waveLength=new Float32Array(2),r.uniforms.alpha=new Float32Array(2),r.uniforms.dimensions=new Float32Array(2),Object.assign(r,n.defaults,t),r}return u(n,e),n.prototype.apply=function(e,n,t,r){var o,i;this.uniforms.dimensions[0]=null===(o=n.filterFrame)||void 0===o?void 0:o.width,this.uniforms.dimensions[1]=null===(i=n.filterFrame)||void 0===i?void 0:i.height,this.uniforms.time=this.time,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"mirror",{get:function(){return this.uniforms.mirror},set:function(e){this.uniforms.mirror=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"boundary",{get:function(){return this.uniforms.boundary},set:function(e){this.uniforms.boundary=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"amplitude",{get:function(){return this.uniforms.amplitude},set:function(e){this.uniforms.amplitude[0]=e[0],this.uniforms.amplitude[1]=e[1]},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"waveLength",{get:function(){return this.uniforms.waveLength},set:function(e){this.uniforms.waveLength[0]=e[0],this.uniforms.waveLength[1]=e[1]},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"alpha",{get:function(){return this.uniforms.alpha},set:function(e){this.uniforms.alpha[0]=e[0],this.uniforms.alpha[1]=e[1]},enumerable:!1,configurable:!0}),n.defaults={mirror:!0,boundary:.5,amplitude:[0,20],waveLength:[30,100],alpha:[1,1],time:0},n}(n.Filter),N=function(e){function n(n,t,r){void 0===n&&(n=[-10,0]),void 0===t&&(t=[0,10]),void 0===r&&(r=[0,0]);var o=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n")||this;return o.red=n,o.green=t,o.blue=r,o}return u(n,e),Object.defineProperty(n.prototype,"red",{get:function(){return this.uniforms.red},set:function(e){this.uniforms.red=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"green",{get:function(){return this.uniforms.green},set:function(e){this.uniforms.green=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blue",{get:function(){return this.uniforms.blue},set:function(e){this.uniforms.blue=e},enumerable:!1,configurable:!0}),n}(n.Filter),X=function(e){function n(t,r,o){void 0===t&&(t=[0,0]),void 0===o&&(o=0);var i=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\n\nuniform vec2 center;\n\nuniform float amplitude;\nuniform float wavelength;\n// uniform float power;\nuniform float brightness;\nuniform float speed;\nuniform float radius;\n\nuniform float time;\n\nconst float PI = 3.14159;\n\nvoid main()\n{\n    float halfWavelength = wavelength * 0.5 / filterArea.x;\n    float maxRadius = radius / filterArea.x;\n    float currentRadius = time * speed / filterArea.x;\n\n    float fade = 1.0;\n\n    if (maxRadius > 0.0) {\n        if (currentRadius > maxRadius) {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);\n    }\n\n    vec2 dir = vec2(vTextureCoord - center / filterArea.xy);\n    dir.y *= filterArea.y / filterArea.x;\n    float dist = length(dir);\n\n    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    vec2 diffUV = normalize(dir);\n\n    float diff = (dist - currentRadius) / halfWavelength;\n\n    float p = 1.0 - pow(abs(diff), 2.0);\n\n    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );\n    float powDiff = 1.25 * sin(diff * PI) * p * ( amplitude * fade );\n\n    vec2 offset = diffUV * powDiff / filterArea.xy;\n\n    // Do clamp :\n    vec2 coord = vTextureCoord + offset;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    // No clamp :\n    // gl_FragColor = texture2D(uSampler, vTextureCoord + offset);\n\n    color.rgb *= 1.0 + (brightness - 1.0) * p * fade;\n\n    gl_FragColor = color;\n}\n")||this;return i.center=t,Object.assign(i,n.defaults,r),i.time=o,i}return u(n,e),n.prototype.apply=function(e,n,t,r){this.uniforms.time=this.time,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"center",{get:function(){return this.uniforms.center},set:function(e){this.uniforms.center=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"amplitude",{get:function(){return this.uniforms.amplitude},set:function(e){this.uniforms.amplitude=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"wavelength",{get:function(){return this.uniforms.wavelength},set:function(e){this.uniforms.wavelength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"brightness",{get:function(){return this.uniforms.brightness},set:function(e){this.uniforms.brightness=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"speed",{get:function(){return this.uniforms.speed},set:function(e){this.uniforms.speed=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.radius},set:function(e){this.uniforms.radius=e},enumerable:!1,configurable:!0}),n.defaults={amplitude:30,wavelength:160,brightness:1,speed:500,radius:-1},n}(n.Filter),B=function(e){function n(n,t,r){void 0===t&&(t=0),void 0===r&&(r=1);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D uLightmap;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\nuniform vec4 ambientColor;\nvoid main() {\n    vec4 diffuseColor = texture2D(uSampler, vTextureCoord);\n    vec2 lightCoord = (vTextureCoord * filterArea.xy) / dimensions;\n    vec4 light = texture2D(uLightmap, lightCoord);\n    vec3 ambient = ambientColor.rgb * ambientColor.a;\n    vec3 intensity = ambient + light.rgb;\n    vec3 finalColor = diffuseColor.rgb * intensity;\n    gl_FragColor = vec4(finalColor, diffuseColor.a);\n}\n")||this;return o._color=0,o.uniforms.dimensions=new Float32Array(2),o.uniforms.ambientColor=new Float32Array([0,0,0,r]),o.texture=n,o.color=t,o}return u(n,e),n.prototype.apply=function(e,n,t,r){var o,i;this.uniforms.dimensions[0]=null===(o=n.filterFrame)||void 0===o?void 0:o.width,this.uniforms.dimensions[1]=null===(i=n.filterFrame)||void 0===i?void 0:i.height,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"texture",{get:function(){return this.uniforms.uLightmap},set:function(e){this.uniforms.uLightmap=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"color",{get:function(){return this._color},set:function(e){var n=this.uniforms.ambientColor;"number"==typeof e?(o.hex2rgb(e,n),this._color=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],n[3]=e[3],this._color=o.rgb2hex(n))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"alpha",{get:function(){return this.uniforms.ambientColor[3]},set:function(e){this.uniforms.ambientColor[3]=e},enumerable:!1,configurable:!0}),n}(n.Filter),G=function(e){function n(n,r,o,i){void 0===n&&(n=100),void 0===r&&(r=600);var l=e.call(this,c,"varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    color /= total;\n    color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n")||this;return l.uniforms.blur=n,l.uniforms.gradientBlur=r,l.uniforms.start=o||new t.Point(0,window.innerHeight/2),l.uniforms.end=i||new t.Point(600,window.innerHeight/2),l.uniforms.delta=new t.Point(30,30),l.uniforms.texSize=new t.Point(window.innerWidth,window.innerHeight),l.updateDelta(),l}return u(n,e),n.prototype.updateDelta=function(){this.uniforms.delta.x=0,this.uniforms.delta.y=0},Object.defineProperty(n.prototype,"blur",{get:function(){return this.uniforms.blur},set:function(e){this.uniforms.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"gradientBlur",{get:function(){return this.uniforms.gradientBlur},set:function(e){this.uniforms.gradientBlur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"start",{get:function(){return this.uniforms.start},set:function(e){this.uniforms.start=e,this.updateDelta()},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"end",{get:function(){return this.uniforms.end},set:function(e){this.uniforms.end=e,this.updateDelta()},enumerable:!1,configurable:!0}),n}(n.Filter),K=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return u(n,e),n.prototype.updateDelta=function(){var e=this.uniforms.end.x-this.uniforms.start.x,n=this.uniforms.end.y-this.uniforms.start.y,t=Math.sqrt(e*e+n*n);this.uniforms.delta.x=e/t,this.uniforms.delta.y=n/t},n}(G),q=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return u(n,e),n.prototype.updateDelta=function(){var e=this.uniforms.end.x-this.uniforms.start.x,n=this.uniforms.end.y-this.uniforms.start.y,t=Math.sqrt(e*e+n*n);this.uniforms.delta.x=-n/t,this.uniforms.delta.y=e/t},n}(G),W=function(e){function n(n,t,r,o){void 0===n&&(n=100),void 0===t&&(t=600);var i=e.call(this)||this;return i.tiltShiftXFilter=new K(n,t,r,o),i.tiltShiftYFilter=new q(n,t,r,o),i}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=e.getFilterTexture();this.tiltShiftXFilter.apply(e,n,o,1),this.tiltShiftYFilter.apply(e,o,t,r),e.returnFilterTexture(o)},Object.defineProperty(n.prototype,"blur",{get:function(){return this.tiltShiftXFilter.blur},set:function(e){this.tiltShiftXFilter.blur=this.tiltShiftYFilter.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"gradientBlur",{get:function(){return this.tiltShiftXFilter.gradientBlur},set:function(e){this.tiltShiftXFilter.gradientBlur=this.tiltShiftYFilter.gradientBlur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"start",{get:function(){return this.tiltShiftXFilter.start},set:function(e){this.tiltShiftXFilter.start=this.tiltShiftYFilter.start=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"end",{get:function(){return this.tiltShiftXFilter.end},set:function(e){this.tiltShiftXFilter.end=this.tiltShiftYFilter.end=e},enumerable:!1,configurable:!0}),n}(n.Filter),Y=function(e){function n(t){var r=e.call(this,c,"varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 twist(vec2 coord)\n{\n    coord -= offset;\n\n    float dist = length(coord);\n\n    if (dist < radius)\n    {\n        float ratioDist = (radius - dist) / radius;\n        float angleMod = ratioDist * ratioDist * angle;\n        float s = sin(angleMod);\n        float c = cos(angleMod);\n        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n    }\n\n    coord += offset;\n\n    return coord;\n}\n\nvoid main(void)\n{\n\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = twist(coord);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord );\n\n}\n")||this;return Object.assign(r,n.defaults,t),r}return u(n,e),Object.defineProperty(n.prototype,"offset",{get:function(){return this.uniforms.offset},set:function(e){this.uniforms.offset=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.radius},set:function(e){this.uniforms.radius=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"angle",{get:function(){return this.uniforms.angle},set:function(e){this.uniforms.angle=e},enumerable:!1,configurable:!0}),n.defaults={radius:200,angle:4,padding:20,offset:new t.Point},n}(n.Filter),Z=function(e){function n(t){var r,o=Object.assign(n.defaults,t),i=o.maxKernelSize,l=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)n.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(t[r[o]]=e[r[o]])}return t}(o,["maxKernelSize"]);return r=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uCenter;\nuniform float uStrength;\nuniform float uInnerRadius;\nuniform float uRadius;\n\nconst float MAX_KERNEL_SIZE = ${maxKernelSize};\n\n// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand(vec2 co, float seed) {\n    const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);\n    return fract(sin(sn) * c + seed);\n}\n\nvoid main() {\n\n    float minGradient = uInnerRadius * 0.3;\n    float innerRadius = (uInnerRadius + minGradient * 0.5) / filterArea.x;\n\n    float gradient = uRadius * 0.3;\n    float radius = (uRadius - gradient * 0.5) / filterArea.x;\n\n    float countLimit = MAX_KERNEL_SIZE;\n\n    vec2 dir = vec2(uCenter.xy / filterArea.xy - vTextureCoord);\n    float dist = length(vec2(dir.x, dir.y * filterArea.y / filterArea.x));\n\n    float strength = uStrength;\n\n    float delta = 0.0;\n    float gap;\n    if (dist < innerRadius) {\n        delta = innerRadius - dist;\n        gap = minGradient;\n    } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity\n        delta = dist - radius;\n        gap = gradient;\n    }\n\n    if (delta > 0.0) {\n        float normalCount = gap / filterArea.x;\n        delta = (normalCount - delta) / normalCount;\n        countLimit *= delta;\n        strength *= delta;\n        if (countLimit < 1.0)\n        {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n    }\n\n    // randomize the lookup values to hide the fixed number of samples\n    float offset = rand(vTextureCoord, 0.0);\n\n    float total = 0.0;\n    vec4 color = vec4(0.0);\n\n    dir *= strength;\n\n    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {\n        float percent = (t + offset) / MAX_KERNEL_SIZE;\n        float weight = 4.0 * (percent - percent * percent);\n        vec2 p = vTextureCoord + dir * percent;\n        vec4 sample = texture2D(uSampler, p);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample * weight;\n        total += weight;\n\n        if (t > countLimit){\n            break;\n        }\n    }\n\n    color /= total;\n    // switch back from pre-multiplied alpha\n    // color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n".replace("${maxKernelSize}",i.toFixed(1)))||this,Object.assign(r,l),r}return u(n,e),Object.defineProperty(n.prototype,"center",{get:function(){return this.uniforms.uCenter},set:function(e){this.uniforms.uCenter=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"strength",{get:function(){return this.uniforms.uStrength},set:function(e){this.uniforms.uStrength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"innerRadius",{get:function(){return this.uniforms.uInnerRadius},set:function(e){this.uniforms.uInnerRadius=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.uRadius},set:function(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e},enumerable:!1,configurable:!0}),n.defaults={strength:.1,center:[0,0],innerRadius:0,radius:-1,maxKernelSize:32},n}(n.Filter);return e.AdjustmentFilter=m,e.AdvancedBloomFilter=h,e.AsciiFilter=g,e.BevelFilter=v,e.BloomFilter=y,e.BulgePinchFilter=b,e.CRTFilter=z,e.ColorMapFilter=x,e.ColorOverlayFilter=_,e.ColorReplaceFilter=C,e.ConvolutionFilter=S,e.CrossHatchFilter=F,e.DotFilter=O,e.DropShadowFilter=P,e.EmbossFilter=A,e.GlitchFilter=T,e.GlowFilter=w,e.GodrayFilter=D,e.KawaseBlurFilter=d,e.MotionBlurFilter=j,e.MultiColorReplaceFilter=M,e.OldFilmFilter=R,e.OutlineFilter=E,e.PixelateFilter=I,e.RGBSplitFilter=N,e.RadialBlurFilter=k,e.ReflectionFilter=L,e.ShockwaveFilter=X,e.SimpleLightmapFilter=B,e.TiltShiftAxisFilter=G,e.TiltShiftFilter=W,e.TiltShiftXFilter=K,e.TiltShiftYFilter=q,e.TwistFilter=Y,e.ZoomBlurFilter=Z,Object.defineProperty(e,"__esModule",{value:!0}),e}({},PIXI,PIXI,PIXI,PIXI.utils,PIXI,PIXI.filters,PIXI.filters);Object.assign(PIXI.filters,__filters);
//# sourceMappingURL=pixi-filters.js.map


// Generated by CoffeeScript 2.6.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 23.11.24
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '3.6.2';

KDCore.nuiVersion = '1.4.1';

// * Методы и библиотеки данной версии
KDCore._loader = 'loader_' + KDCore._fileVersion;

KDCore[KDCore._loader] = [];

// * Добавить библиотеку на загрузку
KDCore.registerLibraryToLoad = function(lib) {
  return KDCore[KDCore._loader].push(lib);
};

if ((KDCore.Version != null) && KDCore.Version >= KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new or exists version');
  KDCore._requireLoadLibrary = false;
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  // * ТРЕБУЕТСЯ ЗАГРУЗКА БИБЛИОТЕК
  KDCore._requireLoadLibrary = true;
}


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Array.prototype.delete = function() {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  Array.prototype.sample = function() {
    if (this.length === 0) {
      return [];
    }
    return this[KDCore.SDK.rand(0, this.length - 1)];
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
  Array.prototype.shuffle = function() {
    var k, n, v;
    n = this.length;
    while (n > 1) {
      n--;
      k = KDCore.SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  // * Ищет элемент, у которого поле ID == id
  Array.prototype.getById = function(id) {
    return this.getByField('id', id);
  };
  // * Ищет элемент, у которого поле FIELD (имя поля) == value
  Array.prototype.getByField = function(field, value) {
    var e;
    try {
      return this.find(function(item) {
        return item[field] === value;
      });
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  Object.defineProperty(Array.prototype, "delete", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "max", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "min", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "sample", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "first", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "last", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "shuffle", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "count", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "isEmpty", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "getById", {
    enumerable: false
  });
  return Object.defineProperty(Array.prototype, "getByField", {
    enumerable: false
  });
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Number.prototype.do = function(method) {
    return KDCore.SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  return Number.prototype.any = function(number) {
    return (number != null) && typeof number === 'number' && number > 0;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  String.prototype.toCss = function() {
    return KDCore.Color.FromHex(this).CSS;
  };
  String.prototype.toCSS = function() {
    return this.toCss();
  };
  String.prototype.isEmpty = function() {
    return this.length === 0 || !this.trim();
  };
  String.isNullOrEmpty = function(str) {
    if (str != null) {
      return str.toString().isEmpty();
    } else {
      return true;
    }
  };
  String.any = function(str) {
    return !String.isNullOrEmpty(str);
  };
  return String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
});


KDCore.registerLibraryToLoad(() => {
    /**
     * Checks if the RPG Maker version is MV.
     * @returns {boolean} True if the RPG Maker version is MV, otherwise false.
     */
    KDCore.isMV = () => Utils.RPGMAKER_NAME.includes("MV");
    /**
     * Checks if the RPG Maker version is MZ.
     * @returns {boolean} True if the RPG Maker version is MZ, otherwise false.
     */
    KDCore.isMZ = () => !KDCore.isMV();
    /**
     * Logs warnings to the console.
     * @param {...any[]} args - The arguments to log as warnings.
     */
    KDCore.warning = (...args) => {
        args.forEach(element => {
            console.warn(element);
        });
    };
    /**
     * Generates a random string of the specified length.
     * @param {number} length - The length of the generated string.
     * @returns {string} The generated string.
     */
    KDCore.makeId = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    //@[DEPREACTED]
    /**
     * Generates a random string of the specified length.
     * @deprecated Use makeId instead.
     * @param {number} length - The length of the generated string.
     * @returns {string} The generated string.
     */
    KDCore.makeid = (length) => KDCore.makeId(length);
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var SDK;
  //?[DEPRECATED]
  // * SDK
  //------------------------------------------------------------------------------
  SDK = function() {
    throw new Error('This is a static class');
  };
  SDK.rand = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };
  SDK.setConstantToObject = function(object, constantName, constantValue) {
    object[constantName] = constantValue;
    if (typeof object[constantName] === 'object') {
      Object.freeze(object[constantName]);
    }
    Object.defineProperty(object, constantName, {
      writable: false
    });
  };
  SDK.convertBitmapToBase64Data = function(bitmap) {
    return bitmap._canvas.toDataURL('image/png');
  };
  SDK.times = function(times, method) {
    var i, results;
    i = 0;
    results = [];
    while (i < times) {
      method(i);
      results.push(i++);
    }
    return results;
  };
  SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  SDK.canvasToLocalX = function(layer, x) {
    while (layer) {
      x -= layer.x;
      layer = layer.parent;
    }
    return x;
  };
  SDK.canvasToLocalY = function(layer, y) {
    while (layer) {
      y -= layer.y;
      layer = layer.parent;
    }
    return y;
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  SDK.checkSwitch = function(switchValue) {
    if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
      return true;
    }
    return false;
  };
  SDK.toNumber = function(string, none = 0) {
    var number;
    if (string == null) {
      return none;
    }
    number = Number(string);
    if (isNaN(number)) {
      return none;
    }
    return number;
  };
  SDK.isString = function(value) {
    return typeof value === "string";
  };
  SDK.isArray = function(value) {
    return Array.isArray(value);
  };
  //@[EXTEND]
  return KDCore.SDK = SDK;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll_kdCore;
  //@[ALIAS]
  __alias_Bitmap_fillAll_kdCore = Bitmap.prototype.fillAll;
  Bitmap.prototype.fillAll = function(color) {
    if (color instanceof KDCore.Color) {
      return this.fillRect(0, 0, this.width, this.height, color.CSS);
    } else {
      return __alias_Bitmap_fillAll_kdCore.call(this, color);
    }
  };
  //@[ALIAS]
  __alias_Bitmap_blt_kdCore = Bitmap.prototype.blt;
  Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (this._needModBltDWH > 0) {
      dh = dw = this._needModBltDWH;
      __alias_Bitmap_blt_kdCore.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
      this._needModBltDWH = null;
    } else {
      __alias_Bitmap_blt_kdCore.call(this, ...arguments);
    }
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32, noSmoth = false) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = KDCore.BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    this._context.imageSmoothingEnabled = !noSmoth;
    this.drawOnMe(bitmap, x, y, size, size);
    this._context.imageSmoothingEnabled = true;
  };
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  Bitmap.prototype.drawInMe = function(bitmap) {
    return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
  };
  return Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //?[NEW]
  return DataManager.pkdRegisterNUIFile = function(folder, name) {
    var _name, src;
    _name = "$" + folder + "_" + name;
    src = folder + "/" + name + ".json";
    return DataManager._databaseFiles.push({
      name: _name,
      src: src
    });
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.EasingFuncs = KDCore.EasingFuncs || {};
  return (function() {
    var _;
    _ = KDCore.EasingFuncs;
    _.linear = function(t, b, c, d) {
      return c * t / d + b;
    };
    _.easeInQuad = function(t, b, c, d) {
      return c * (t /= d) * t + b;
    };
    _.easeOutQuad = function(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    };
    _.easeInOutQuad = function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
      } else {
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
      }
    };
    _.easeInCubic = function(t, b, c, d) {
      return c * (t /= d) * t * t + b;
    };
    _.easeOutCubic = function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    };
    return _.easeInOutCubic = function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t + b;
      } else {
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      }
    };
  })();
});


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  // * Нахожусь ли Я в точке по диагонале (рядом), относительно char
  _.kdInDiagonalPointRelativeTo = function(char) {
    var e, x, y;
    try {
      if (char == null) {
        return false;
      }
      ({x, y} = char);
      if (x === this.x - 1 && ((y === this.y - 1) || (y === this.y + 1))) {
        return true; // * left up or down
      }
      if (x === this.x + 1 && (y === this.y - 1 || y === this.y + 1)) {
        return true; // * right up or down
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * В MZ нету данной функции, а она часто используется в моих плагинах
  if (!KDCore.isMZ()) {
    return;
  }
  //?[NEW] (from MV)
  return ImageManager.loadEmptyBitmap = function() {
    if (this._emptyBitmap != null) {
      return this._emptyBitmap;
    } else {
      return new Bitmap();
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var _input_onKeyDown, _input_onKeyUp, i, j, k, l;
  Input.KeyMapperPKD = {};
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = k = 65; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = l = 97; l <= 122; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  
  //@[ALIAS]
  _input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function(event) {
    _input_onKeyDown.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode);
  };
  //@[ALIAS]
  _input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    _input_onKeyUp.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode, false);
  };
  //?NEW
  Input._setStateWithMapperPKD = function(keyCode, state = true) {
    var symbol;
    symbol = Input.KeyMapperPKD[keyCode];
    if (symbol != null) {
      return this._currentState[symbol] = state;
    }
  };
  //?NEW
  Input.isCancel = function() {
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  //?NEW
  return TouchInput.toPoint = function() {
    return new KDCore.Point(TouchInput.x, TouchInput.y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  PluginManager.getPluginParametersByRoot = function(rootName) {
    var pluginParameters, property;
    for (property in this._parameters) {
      if (this._parameters.hasOwnProperty(property)) {
        pluginParameters = this._parameters[property];
        if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
          return pluginParameters;
        }
      }
    }
    return PluginManager.parameters(rootName);
  };
  return PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] != null;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ___Sprite_alias_Move_KDCORE_2;
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
  Sprite.prototype.move = function(x, y) {
    if (x instanceof Array) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
    } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
    } else if ((x != null) && (x._x != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
    } else {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
    }
  };
  Sprite.prototype.isContainsPoint = function(point) {
    var rect, rx, ry;
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    rx = KDCore.SDK.toGlobalCoord(this, 'x');
    ry = KDCore.SDK.toGlobalCoord(this, 'y');
    rect = this._getProperFullRect(rx, ry);
    return rect.contains(point.x, point.y);
  };
  // * Возвращает Rect с учётом Scale и Anchor спрайта
  Sprite.prototype._getProperFullRect = function(rx, ry) {
    var height, width, x, y;
    width = this.width * Math.abs(this.scale.x);
    height = this.height * Math.abs(this.scale.y);
    x = rx - this.anchor.x * width;
    y = ry - this.anchor.y * height;
    if (this.anchor.x === 0 && this.scale.x < 0) {
      x += this.width * this.scale.x;
    }
    if (this.anchor.y === 0 && this.scale.y < 0) {
      y += this.height * this.scale.y;
    }
    return new PIXI.Rectangle(x, y, width, height);
  };
  Sprite.prototype.fillAll = function(color) {
    if (color != null) {
      return this.bitmap.fillAll(color);
    } else {
      return this.fillAll(KDCore.Color.WHITE);
    }
  };
  return Sprite.prototype.removeFromParent = function() {
    if (this.parent != null) {
      return this.parent.removeChild(this);
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return TouchInput.toMapPoint = function() {
    return this.toPoint().convertToMap();
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.Utils = KDCore.Utils || {};
  return (function() {
    var _;
    _ = KDCore.Utils;
    _.getJDataById = function(id, source) {
      var d, j, len;
      for (j = 0, len = source.length; j < len; j++) {
        d = source[j];
        if (d.id === id) {
          return d;
        }
      }
      return null;
    };
    _.hasMeta = function(symbol, obj) {
      return (obj != null) && (obj.meta != null) && (obj.meta[symbol] != null);
    };
    _.getValueFromMeta = function(symbol, obj) {
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      return obj.meta[symbol];
    };
    _.getNumberFromMeta = function(symbol, obj) {
      var value;
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      if (obj.meta[symbol] === true) {
        return 0;
      } else {
        value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
      }
      return value;
    };
    _.isSceneMap = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Map;
      } catch (error) {
        return false;
      }
    };
    _.isMapScene = function() {
      return this.isSceneMap();
    };
    _.isSceneBattle = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Battle;
      } catch (error) {
        return false;
      }
    };
    _.isBattleScene = function() {
      return this.isSceneBattle();
    };
    _.getEventCommentValue = function(commentCode, list) {
      var comment, e, i, item;
      try {
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                return comment;
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    };
    _.getEventCommentValueArray = function(commentCode, list) {
      var comment, comments, e, i, item;
      try {
        comments = [];
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                comments.push(comment);
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return comments;
    };
    _.getPositionPointFromJSON = function(jsonSettings) {
      return _.convertPositionPointFromJSON(jsonSettings.position);
    };
    _.convertPositionPointFromJSON = function(position) {
      var e, x, y;
      try {
        x = position[0];
        y = position[1];
        if (!KDCore.SDK.isInt(x)) {
          x = eval(x);
        }
        if (!KDCore.SDK.isInt(y)) {
          y = eval(y);
        }
        return new KDCore.Point(x, y);
      } catch (error) {
        e = error;
        console.warn('Utils.getPositionPointFromJSON', e);
        return KDCore.Point.Empty;
      }
    };
    _.jsonPos = function(jsonPosition) {
      return _.convertPositionPointFromJSON(jsonPosition);
    };
    _.jsonPosXY = function(jsonPosition) {
      var e, x, y;
      try {
        ({x, y} = jsonPosition);
        return new KDCore.Point(eval(x), eval(y));
      } catch (error) {
        e = error;
        console.warn('Utils.jsonPosXY', e);
        return KDCore.Point.Empty;
      }
    };
    _.getVar = function(id) {
      return $gameVariables.value(id);
    };
    _.setVar = function(id, value) {
      return $gameVariables.setValue(id, value);
    };
    _.addToVar = function(id, value) {
      var prevVal;
      prevVal = _.getVar(id);
      return _.setVar(id, prevVal + value);
    };
    _.playSE = function(seFileName, pitch = 100, volume = 100) {
      var sound;
      if (seFileName == null) {
        return;
      }
      if (seFileName === "") {
        return;
      }
      sound = {
        name: seFileName,
        pan: 0,
        pitch: pitch,
        volume: volume
      };
      AudioManager.playStaticSe(sound);
    };
    _.getItemTypeId = function(item) {
      if (DataManager.isWeapon(item)) {
        return 1;
      } else if (DataManager.isArmor(item)) {
        return 2;
      }
      return 0;
    };
    _.getItemByType = function(itemId, typeId) {
      var data, e;
      try {
        if ((typeId != null) && !isFinite(typeId) && KDCore.SDK.isString(typeId) && String.any(typeId)) {
          if (typeId[0] === "w") {
            typeId = 1;
          } else if (typeId[0] === "a") {
            typeId = 2;
          } else {
            typeId = 0;
          }
        }
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    _.loadFont = function(name) {
      if (typeof FontManager === "undefined" || FontManager === null) {
        return;
      }
      if (String.isNullOrEmpty(name)) {
        return;
      }
      if (FontManager._states[name] != null) {
        return;
      }
      FontManager.load(name, name + ".ttf");
    };
    _.convertTimeShort = function(seconds) {
      var e;
      try {
        if (seconds > 59) {
          return Math.floor(seconds / 60) + 'm';
        } else {
          return seconds;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return seconds;
      }
    };
    _.isPointInScreen = function(point, margin = 10) {
      var maxH, maxW, screenMargin, x, y;
      ({x, y} = point);
      maxW = Graphics.width;
      maxH = Graphics.height;
      // * Граница от краёв экрана
      screenMargin = margin;
      if (x < screenMargin) {
        return false;
      }
      if (y < screenMargin) {
        return false;
      }
      if (x > (maxW - screenMargin)) {
        return false;
      }
      if (y > (maxH - screenMargin)) {
        return false;
      }
      return true;
    };
    // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
    // * Пример использования loadImageAsync(a, b).then(метод)
    // в метод будет передан bitmap первым аргументом
    _.loadImageAsync = async function(folder, filename) {
      var promise;
      promise = new Promise(function(resolve, reject) {
        var b;
        b = ImageManager.loadBitmap("img/" + folder + "/", filename);
        return b.addLoadListener(function() {
          return resolve(b);
        });
      });
      return (await promise);
    };
    // * Преобразовать расширенное значение
    // * Значение может быть X -> X
    // * "X" -> X (цифра)
    // * "X,Y,Z,..." -> [X, Y, Z]
    // * "[X, Y, Z,...]" -> [X, Y, Z]
    // * "X|V" -> из переменной X
    // * [Y] -> случайное число из массива (рекурсивно)
    //@[2.8.1] since
    _.getEValue = function(value) {
      var e, items, randomValue, variableId;
      try {
        if (value == null) {
          return null;
        }
        if (KDCore.SDK.isString(value)) {
          if (isFinite(value)) { // * Число представленно строкой
            return Number(value);
          }
          // * Массив представлен строкой (может быть без квадратных скобок)
          if (value.contains(',') || (value.contains("[") && value.contains("]"))) {
            value = value.replace("[", "");
            value = value.replace("]", "");
            // * Преобразуем в число или строку (например если extended |V)
            items = value.split(",").map(function(item) {
              var itemT;
              itemT = item.trim();
              if (isFinite(itemT)) {
                return Number(itemT);
              } else {
                return itemT;
              }
            });
            // * Вызываем снова эту функцию, но уже с массивом
            return KDCore.Utils.getEValue(items);
          }
          if (value.contains("|V")) {
            variableId = parseInt(value);
            return $gameVariables.value(variableId);
          }
          return value; // * Просто значение в итоге
        } else if (KDCore.SDK.isArray(value)) {
          randomValue = value.sample();
          return KDCore.Utils.getEValue(randomValue);
        } else {
          return value;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return value;
      }
    };
    //@[2.8.2] since
    _.isChanceIsGood = function(chance) {
      var e;
      try {
        if (chance > 1) {
          chance /= 100;
        }
        return chance > Math.random();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[2.8.2] since
    //KEY:w:3:1:50 , KEY:i:10:2:1|V
    //OUTPUT: [GameItem, COUNT]
    _.parseItemFromConditionStr = function(conditionLine) {
      var amount, e, itemChance, itemId, parts, typeId;
      try {
        if (!conditionLine.contains(":")) {
          return null;
        }
        parts = conditionLine.split(":");
        typeId = parts[1];
        itemId = KDCore.Utils.getEValue(parts[2]);
        amount = KDCore.Utils.getEValue(parts[3]);
        if (amount <= 0) {
          return null;
        }
        try {
          itemChance = String.any(parts[4]) ? parts[4] : 100;
          itemChance = KDCore.Utils.getEValue(itemChance) / 100;
        } catch (error) {
          e = error;
          KDCore.warning(e);
          itemChance = 0;
        }
        if (itemChance <= 0) {
          return null;
        }
        if (KDCore.Utils.isChanceIsGood(itemChance)) {
          return [KDCore.Utils.getItemByType(itemId, typeId), amount];
        } else {
          return null;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    //@[3.2.1] since
    _.isValidCE = function(commonEventId) {
      var e;
      try {
        return commonEventId > 0 && ($dataCommonEvents[commonEventId] != null);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[3.2.1] since
    _.startCE = function(commonEventId) {
      var e;
      try {
        if (this.isValidCE(commonEventId)) {
          return $gameTemp.reserveCommonEvent(commonEventId);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    _.checkSwitch = function(value) {
      if (value == null) {
        return false;
      }
      if (isFinite(value)) {
        return false;
      }
      return KDCore.SDK.checkSwitch(value);
    };
    //@[3.2.1] since
    // * Вызвать с задержкой в time миллисекунд
    // * Не забываем про bind
    _.callDelayed = function(method, time = 1) {
      var e;
      try {
        if (method == null) {
          return;
        }
        setTimeout((function() {
          var e;
          try {
            return method();
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        }), time);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    //<meta:1,2,3,4> -> [1,2,3,4]
    _.getArrayOfNumbersFromMeta = function(symbol, obj) {
      var e, values;
      try {
        values = this.getArrayOfValuesFromMeta(symbol, obj);
        return values.map(function(v) {
          return Number(v);
        });
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    //<meta:a,b,c> -> ["a", "b", "c"]
    //<meta:a> -> ["a"]
    _.getArrayOfValuesFromMeta = function(symbol, obj) {
      var e, items, values;
      try {
        values = this.getValueFromMeta(symbol, obj);
        if (String.any(values)) {
          if (values.contains(',')) {
            items = values.split(',');
            return items || [];
          } else {
            return [values];
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    // * Когда содержит одинаковый набор ключей
    //<meta:value1>
    //<meta:value2>
    //...
    // -> [value1,value2,...]
    _.getArrayOfValuesOfSameMeta = function(symbol, obj) {
      var e, j, len, line, lines, result;
      try {
        if (!this.hasMeta(symbol, obj)) {
          return [];
        }
        lines = obj.note.split("\n").filter(function(l) {
          return l.contains(symbol);
        });
        result = [];
        for (j = 0, len = lines.length; j < len; j++) {
          line = lines[j];
          try {
            line = line.replace("<" + symbol + ":", "");
            line = line.replace(">", "");
            result.push(line);
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }
        return result;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return [];
    };
    //@[3.2.7] since
    _.getIndexIn2DArrayByIJ = function(row, col, cols) {
      return row * cols + col;
    };
    //@[3.2.7] since
    // * row - строка
    // * col - столбец
    _.getIJByIndexIn2DArray = function(index, cols) {
      var col, e, row;
      try {
        row = Math.floor(index / cols);
        col = index % cols;
        return [row, col];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [0, 0];
      }
    };
    //@[3.2.7] since
    _.isSwitchIsTRUE = function(switchId) {
      var e;
      if (switchId == null) {
        return true;
      }
      if (switchId <= 0) {
        return true;
      }
      try {
        return $gameSwitches.value(switchId) === true;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
    //@[3.5] since
    _.convertBindingValue = function(sourceObj, bindingValue, element = null) {
      var e;
      try {
        return KDCore.UI.Builder._convertBindingValue(...arguments);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return null;
    };
    //@[3.5] since
    _.getRealSpriteSize = function(forField = 'x', sprite = null) {
      var e, h, w;
      try {
        if (sprite == null) {
          return 0;
        }
        if (forField === 'x' || forField === 'width') {
          if (sprite.realWidth != null) {
            w = sprite.realWidth();
          } else {
            w = sprite.width;
          }
          return w;
        } else if (forField === 'y' || forField === 'height') {
          if (sprite.realHeight != null) {
            h = sprite.realHeight();
          } else {
            h = sprite.height;
          }
          return h;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    //@[3.5] since
    _.string2hex = function(string) {
      var e;
      try {
        if (typeof string === 'string' && string[0] === '#') {
          string = string.substr(1);
        }
        return parseInt(string, 16);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0xffffff;
    };
    //@[3.5] since
    _.convertDP = function(value = 0, isHalf = false) {
      var d, e, mod, modX, modY;
      try {
        if (Graphics.width === 816 && Graphics.height === 624) {
          return value;
        }
        modX = Graphics.width / 816;
        modY = Graphics.height / 624;
        // Aprox
        mod = (modX + modY) / 2;
        if (mod === 0) {
          return 0;
        }
        if (isHalf === true) {
          if (mod < 1) {
            d = 1 - mod;
            mod += d / 2;
          } else if (mod > 1) {
            d = mod - 1;
            mod = 1 + (d / 2);
          }
        }
        return Math.round(value * mod);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    //@[3.5.6] since
    _.getValueWithDP = function(value) {
      var dpValue, e, negative, r, result, resultValue;
      try {
        if (typeof value === "string") {
          value = value.trim();
          // * Replace all HDP and DP
          if (value.contains("hdp") || value.contains("dp")) {
            if (value[0] === '-') {
              value = value.replace("-", "");
              negative = true;
            } else {
              negative = false;
            }
            if (value.contains("hdp")) {
              r = new RegExp("(\\d+)hdp", "g");
              result = r.exec(value);
              dpValue = Number(result[1]);
              resultValue = KDCore.Utils.convertDP(dpValue, true);
              value = value.replace(/(\d+)hdp/, resultValue);
            } else if (value.contains("dp")) {
              r = new RegExp("(\\d+)dp", "g");
              result = r.exec(value);
              dpValue = Number(result[1]);
              resultValue = KDCore.Utils.convertDP(dpValue, false);
              value = value.replace(/(\d+)dp/, resultValue);
            }
          }
          value = parseInt(value);
          if (negative) {
            value = -value;
          }
        }
        return value;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return 0;
      }
    };
    //@[2.9.7] since
    // * Shrink number 100000 to "100k" and ect, returns STRING
    _.formatNumberToK = function(num) {
      var e;
      try {
        if (num >= 1000000000) {
          return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
          return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return num;
      }
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
    this.contents._needModBltDWH = finalSize;
    this.drawFace(faceName, faceIndex, x, y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__select, _;
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    //@[ALIAS]
    ALIAS__select = _.select;
    _.select = function(index) {
      var e;
      ALIAS__select.call(this, ...arguments);
      try {
        return this._pOnSelectionChanged(index);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._pOnSelectionChanged = function(newIndex) {
      var e;
      try {
        if (this._pkdLastSelectedIndex == null) {
          this._pkdLastSelectedIndex = newIndex;
          return this.pOnSelectionChanged();
        } else {
          if (this._pkdLastSelectedIndex !== newIndex) {
            this._pkdLastSelectedIndex = newIndex;
            return this.pOnSelectionChanged();
          }
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.safeSelect = function(index = 0) {
      var e;
      try {
        if (this.maxItems() > index) {
          return this.select(index);
        } else {
          return this.select(-1);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    
    // * Called only when new (different) index is selected
    _.pOnSelectionChanged = function() {};
  })();
});

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    // * Input Extension: KDGamepad
    //------------------------------------------------------------------------------
    // * Поддержка расширенного управления через геймпад (свой модуль)
    var ALIAS___updateGamepadState, _;
    //@[DEFINES]
    _ = Input;
    // * Активировать работу модуля KDGamepad
    _.activateExtendedKDGamepad = function() {
      return _._kdIsGamepadExtended = true;
    };
    //@[ALIAS]
    ALIAS___updateGamepadState = _._updateGamepadState;
    _._updateGamepadState = function(gamepad) {
      if (Input._kdIsGamepadExtended === true) {
        KDGamepad.update();
      }
      if ((typeof $gameTemp !== "undefined" && $gameTemp !== null ? $gameTemp.__kdgpStopDefaultGamepad : void 0) === true) {
        return;
      }
      // * Режим перемещения без DPad
      // * В оригинале игрок также ходит по DPad клавишам, что может быть не удобно
      // * например при работе с инвентарём
      if (KDGamepad.isNoDPadMoving()) {
        if (KDGamepad.isDPadAny()) {
          Input.clear();
          return;
        }
      }
      ALIAS___updateGamepadState.call(this, gamepad);
    };
    window.KDGamepad = function() {
      return new Error("This is static class");
    };
    window.addEventListener("gamepadconnected", function(event) {
      var e;
      try {
        return KDGamepad.refresh();
      } catch (error) {
        // * Можно напрямую
        //unless KDGamepad.isExists()
        //    if event.gamepad? and event.gamepad.mapping == 'standard'
        //        KDGamepad.init(event.gamepad)
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    window.addEventListener("gamepaddisconnected", function(event) {
      var e;
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        if ((event.gamepad != null) && event.gamepad === KDGamepad.gamepad) {
          return KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    KDGamepad.stopDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = true;
    };
    KDGamepad.resumeDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = null;
    };
    // * Ссылка на геймпад
    KDGamepad.gamepad = null;
    // * Подключён ли Gamepad ?
    KDGamepad.isExists = function() {
      return KDGamepad.gamepad != null;
    };
    // * Инициализация состояния кнопок
    // * Этот метод вызывается автоматически из Refresh или при подключении Gamepad
    KDGamepad.init = function(gamepad) {
      KDGamepad.gamepad = gamepad;
      this._isActive = true;
      this.buttonNames = [
        'A', // 0
        'B', // 1
        'X', // 2
        'Y', // 3
        'LB', // 4
        'RB', // 5
        'LTrigger', // 6
        'RTrigger', // 7
        'Back', // 8
        'Start', // 9
        'LStick', // 10
        'RStick', // 11
        'dUp', // 12
        'dDown', // 13
        'dLeft', // 14
        'dRight' // 15
      ];
      this.reset();
    };
    // * Аналог Input.clear
    KDGamepad.clear = function() {
      return KDGamepad.reset();
    };
    // * Сбросить состояние кнопок
    KDGamepad.reset = function() {
      this.leftStick = {
        x: 0,
        y: 0
      };
      this.rightStick = {
        x: 0,
        y: 0
      };
      this.buttons = {};
      this.buttonsPressed = {};
      this.prevButtons = {};
    };
    
    // * Остановить учёт геймпада
    KDGamepad.stop = function() {
      KDGamepad.reset();
      KDGamepad.gamepad = null;
    };
    // * Функция проверки что нажата кнопка на геймпаде
    KDGamepad._buttonPressed = function(gamepad, index) {
      var b, e;
      try {
        if (!gamepad || !gamepad.buttons || index >= gamepad.buttons.length) {
          return false;
        }
        b = gamepad.buttons[index];
        if (b == null) {
          return false;
        }
        if (typeof b === 'object') {
          // * Можно упростить
          return b.pressed;
        }
        return b === 1.0;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    // * Каждый кадр (обновление состояний)
    KDGamepad.update = function() {
      var e, gp, i, isDown, j, len, name, ref;
      if (!KDGamepad.isActive()) {
        return;
      }
      KDGamepad.refresh();
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        gp = KDGamepad.gamepad;
        ref = this.buttonNames;
        // * Проверка состояний кнопок
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          name = ref[i];
          this.buttons[name] = false;
          isDown = KDGamepad._buttonPressed(gp, i);
          if (isDown === true) {
            this.prevButtons[name] = true;
          } else {
            // * Срабатываение только при нажал - отпустил
            if (this.prevButtons[name] === true) {
              this.buttons[name] = true;
              this.prevButtons[name] = false;
            }
          }
        }
        // * Проверка стиков
        this.leftStick.x = gp.axes[0];
        this.leftStick.y = gp.axes[1];
        this.rightStick.x = gp.axes[2];
        this.rightStick.y = gp.axes[3];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Обновить и проверить состояние Gamepad
    // * Надо каждый раз это вызывать
    KDGamepad.refresh = function() {
      var e, gamepads, gp, i, isGamepadRefreshed, j, ref;
      try {
        isGamepadRefreshed = false;
        if (navigator.getGamepads) {
          gamepads = navigator.getGamepads();
        } else if (navigator.webkitGetGamepads) {
          gamepads = navigator.webkitGetGamepads();
        }
        if (gamepads != null) {
          for (i = j = 0, ref = gamepads.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
            gp = gamepads[i];
            if ((gp != null) && gp.mapping === 'standard') {
              isGamepadRefreshed = true;
              if (KDGamepad.buttonNames != null) {
                KDGamepad.gamepad = gp;
              } else {
                KDGamepad.init(gp);
              }
              break;
            }
          }
        }
        if (!isGamepadRefreshed) {
          // * Если не был найден не один gamepad - отключаем систему
          KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Любое нажатие кнопки
    KDGamepad.isKeyAny = function(name) {
      return KDGamepad.isKey(name) || KDGamepad.isKeyPressed(name);
    };
    // * Нажата ли кнопка (trigger нажал - отпустил)
    KDGamepad.isKey = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.buttons[name] === true;
    };
    // * Нажата ли кнопка (continues зажата)
    KDGamepad.isKeyPressed = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.prevButtons[name] === true;
    };
    KDGamepad.isDPadAny = function() {
      return KDGamepad.isKeyAny("dLeft") || KDGamepad.isKeyAny("dRight") || KDGamepad.isKeyAny("dUp") || KDGamepad.isKeyAny("dDown");
    };
    KDGamepad.isActive = function() {
      return this._isActive === true;
    };
    // * Временно отключить обработку KDGamepad
    KDGamepad.setActive = function(_isActive) {
      this._isActive = _isActive;
      if (KDGamepad.isActive()) {
        KDGamepad.refresh();
      } else {
        KDGamepad.stop();
      }
    };
    // * Отключить перемещение игрока на DPad
    KDGamepad.setNoDPadMovingMode = function(_noDpadMoving) {
      this._noDpadMoving = _noDpadMoving;
    };
    return KDGamepad.isNoDPadMoving = function() {
      return this._noDpadMoving === true;
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var BitmapSrc;
  BitmapSrc = (function() {
    //?[DEPRECATED]
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          if (KDCore.isMV()) {
            pw = Window_Base._iconWidth;
            ph = Window_Base._iconHeight;
          } else {
            pw = ImageManager.iconWidth;
            ph = ImageManager.iconHeight;
          }
          sx = iconIndex % 16 * pw;
          sy = Math.floor(iconIndex / 16) * ph;
          icon_bitmap = new Bitmap(pw, ph);
          icon_bitmap.addLoadListener(function() {
            icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
          });
          BitmapSrc.CACHE[iconIndex] = icon_bitmap;
        }
        bs.bitmap = BitmapSrc.CACHE[iconIndex];
        return bs;
      }

      static LoadFromImageFolder(filename) {
        var bs;
        bs = new BitmapSrc();
        bs.bitmap = ImageManager.loadPicture(filename);
        return bs;
      }

      static LoadFromBase64(data, name) {
        var bs;
        bs = new BitmapSrc();
        if (name != null) {
          if (BitmapSrc.CACHE[name] != null) {
            bs.bitmap = BitmapSrc.CACHE[name];
          } else {
            BitmapSrc.CACHE[name] = Bitmap.load(data);
            bs.bitmap = BitmapSrc.CACHE[name];
          }
        } else {
          bs.bitmap = Bitmap.load(data);
        }
        return bs;
      }

      static LoadFromMemory(symbol) {
        var bs;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[symbol] != null) {
          bs.bitmap = BitmapSrc.CACHE[symbol];
        } else {
          bs.bitmap = ImageManager.loadEmptyBitmap();
        }
        return bs;
      }

    };

    BitmapSrc.CACHE = {};

    return BitmapSrc;

  }).call(this);
  //@[EXTEND]
  return KDCore.BitmapSrc = BitmapSrc;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Changer;
  // * Класс который может плавно изменять какой-либо параметр
  // * Работает в стиле chain методов

    // * ------------------ ПРИМЕР ----------------------------------

    // * Меняем прозрачность 4 раза, туда-сюда, затем выводим done в консоль

    //@changer = new KDCore.Changer(someSprite)
  //@changer.change('opacity').from(255)
  //            .to(0).step(5).speed(1).delay(30).repeat(4).reverse()
  //            .start().done(() -> console.log('done'))
  //@changer.update()

    // * -------------------------------------------------------------
  Changer = class Changer {
    constructor(obj) {
      this.obj = obj;
      // * Количество кадров, в которые будет обновление
      this._field = null; // * название поля
      this._speed = 1; // * frames
      this._step = 1; // * шаг изменения значения
      this._from = 0; // * Начальное значение
      this._to = 0; // * Конечное значение
      this._thread = null;
      this._orienation = true; // * Направление + или - step (true = +)
      this._delay = 0; // * Задержка старта
      this._changer = null; // * Ссылка на следующий changer
      this._isRepeat = false; // * Надо ли поторить себя снова
      this._onDoneMethod = null; // * Метод будет выполнен в конце (при завершении)
      this._isPrepared = false; // * Элемента был подготовлен (установлено значение from)
    }

    start() {
      if (this._field == null) {
        return;
      }
      if (this._from === this._to) {
        return;
      }
      if (this._delay > 0) {
        this._delayThread = new KDCore.TimedUpdate(this._delay, this._startThread.bind(this));
        this._delayThread.once();
      } else {
        this._startThread();
      }
      return this;
    }

    isStarted() {
      return (this._thread != null) || (this._delayThread != null);
    }

    from(_from) {
      this._from = _from;
      return this;
    }

    to(_to) {
      this._to = _to;
      return this;
    }

    step(_step) {
      this._step = _step;
      return this;
    }

    speed(_speed) {
      this._speed = _speed;
      return this;
    }

    change(_field) {
      this._field = _field;
      return this;
    }

    // * Снова повторить (не совместим с then)
    // * Если ничего не указать, или <= 0 -> то бескончно
    repeat(_repeatCount = 0) {
      this._repeatCount = _repeatCount;
      if (this._repeatCount <= 0) {
        this._repeatCount = null;
      }
      this._isRepeat = true;
      this._changer = null;
      return this;
    }

    // * Снова повторить, но поменять местами to и from (работает только с repeat >= 2)
    reverse() {
      this._isReverse = true;
      return this;
    }

    isDone() {
      if (!this._isPrepared) {
        // * Чтобы не было выхода пока ждёт Delay
        return false;
      }
      // * Если от 255 до 0 (например)
      if (this._orienation === false) {
        // * То может быть меньше нуля (т.к. @step динамический)
        return this.value() <= this._to;
      } else {
        return this.value() >= this._to;
      }
    }

    value() {
      return this.obj[this._field];
    }

    stop() {
      this._thread = null;
      this._delayThread = null;
      if (this._changer == null) {
        // * Если есть связанный Changer, то не выполняем метод завршения
        return this._callDoneMethod();
      }
    }

    // * При ожидании, значения устанавливаются не сразу
    delay(_delay) {
      this._delay = _delay;
      return this;
    }

    // * Выполнить другой Changer после этого
    // * Не совместим с Repeat
    // * НЕЛЬЗЯ зацикливать, не будет работать
    // * Соединённый не надо обновлять вне, он обновляется в этом
    then(_changer) {
      this._changer = _changer;
      this._isRepeat = false;
      return this;
    }

    // * Этот метод будт выполнене в конце
    done(_onDoneMethod) {
      this._onDoneMethod = _onDoneMethod;
      return this;
    }

    // * Шаг можно выполнить и в ручную
    makeStep() {
      if (!this.isStarted()) {
        this._prepare();
      }
      this._makeStep();
      return this;
    }

    update() {
      var ref;
      if (this.isStarted()) {
        if (this._delay > 0) {
          if ((ref = this._delayThread) != null) {
            ref.update();
          }
        }
        if (this._thread != null) {
          this._updateMainThread();
        }
      } else {
        // * Если хоть раз был запущен
        if (this._isBeenStarted === true) {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
        }
      }
    }

    static CreateForOpacityUp(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(0).to(255).step(step);
      changer.done(function() {
        sprite.opacity = 255;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

    static CreateForOpacityDown(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(sprite.opacity).to(0).step(step);
      changer.done(function() {
        sprite.opacity = 0;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Changer.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Changer.prototype;
    _._prepare = function() {
      if (this._field == null) {
        return;
      }
      this._orienation = this._from < this._to;
      if (!this._orienation) {
        this._step *= -1;
      }
      // * Устанавливаем начальное значение
      this.obj[this._field] = this._from;
      this._isPrepared = true;
    };
    _._makeStep = function() {
      var value;
      if (this.isDone()) {
        return;
      }
      value = this.value();
      value += this._step;
      this.obj[this._field] = value;
    };
    _._startThread = function() {
      this._prepare();
      if (this.isDone()) {
        return;
      }
      this._thread = new KDCore.TimedUpdate(this._speed, this._makeStep.bind(this));
      return this._isBeenStarted = true;
    };
    _._updateChainedChanger = function() {
      if (this._changer.isStarted()) {
        this._changer.update();
        if (this._changer.isDone()) {
          this._callDoneMethod();
          this._changer.stop();
          return this._changer = null;
        }
      } else {
        return this._changer.start();
      }
    };
    _._restart = function() {
      if (!this._isCanRepeatMore()) {
        return;
      }
      if (this._repeatCount == null) {
        // * Если указано! число повторений, то onDone метод не вызываем
        this._callDoneMethod();
      }
      if (this._isReverse === true) {
        this._swapFromTo();
      }
      this._prepare();
      return this.start();
    };
    _._swapFromTo = function() {
      var t;
      t = this._from;
      this._from = this._to;
      this._to = t;
      // * Инвентируем число step
      this._step *= -1;
    };
    _._callDoneMethod = function() {
      if (this._onDoneMethod != null) {
        return this._onDoneMethod();
      }
    };
    _._isCanRepeatMore = function() {
      if (this._repeatCount == null) {
        return true;
      }
      this._repeatCount--;
      if (this._repeatCount <= 0) {
        this.stop();
        return false;
      }
      return true;
    };
    _._updateMainThread = function() {
      this._thread.update();
      if (this.isDone()) {
        if (this._isRepeat === true) {
          this._restart();
        } else {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
          this.stop();
        }
      }
    };
  })();
  // ■ END Changer.coffee
  //---------------------------------------------------------------------------

  //@[EXTEND]
  return KDCore.Changer = Changer;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color;
  Color = (function() {
    //rev 29.04.2024
    class Color {
      constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.a = a1;
      }

      getLightestColor(lightLevel) {
        var bf, newColor, p;
        bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        p = 0;
        newColor = [0, 0, 0, 0];
        if (bf - lightLevel >= 0) {
          if (bf >= 0) {
            p = Math.abs(bf - lightLevel) / lightLevel;
          }
          newColor = this.ARR.map(function(c) {
            return c - (p * c);
          });
        } else {
          if (bf >= 0) {
            p = (lightLevel - bf) / (255 - bf);
          }
          newColor = this.ARR.map(function(c) {
            return [(255 - c) * p + c, 255].min();
          });
        }
        return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
      }

      clone() {
        return this.reAlpha(this.a);
      }

      reAlpha(newAlpha) {
        return new Color(this.r, this.g, this.b, newAlpha || 255);
      }

      static AddConstantColor(name, color) {
        color.toHex();
        color.toArray();
        color.toCSS();
        KDCore.SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
        return this._colorHex = '#' + r + g + b;
      }

      toArray() {
        if (this._colorArray != null) {
          return this._colorArray;
        }
        return this._colorArray = [this.r, this.g, this.b, this.a];
      }

      toCSS() {
        var na, nb, ng, nr;
        if (this._colorCss != null) {
          return this._colorCss;
        }
        nr = Math.round(this.r);
        ng = Math.round(this.g);
        nb = Math.round(this.b);
        na = this.a / 255;
        return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
      }

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = KDCore.SDK.rand(1, 254);
        b = KDCore.SDK.rand(1, 254);
        c = KDCore.SDK.rand(1, 254);
        return new Color(a, b, c, 255);
      }

      static FromHex(hexString) {
        var color, result, shorthandRegex;
        //Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hexString = hexString.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
        });
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        color = null;
        if (result != null) {
          color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        }
        if (color != null) {
          return new Color(color.r, color.g, color.b, 255);
        } else {
          return Color.NONE;
        }
      }

    };

    Object.defineProperties(Color.prototype, {
      R: {
        get: function() {
          return this.r;
        },
        configurable: true
      },
      G: {
        get: function() {
          return this.g;
        },
        configurable: true
      },
      B: {
        get: function() {
          return this.b;
        },
        configurable: true
      },
      A: {
        get: function() {
          return this.a;
        },
        configurable: true
      },
      ARR: {
        get: function() {
          return this.toArray();
        },
        configurable: true
      },
      CSS: {
        get: function() {
          return this.toCSS();
        },
        configurable: true
      },
      HEX: {
        get: function() {
          return this.toHex();
        },
        configurable: true
      },
      OX: {
        get: function() {
          return this.toNumber();
        },
        configurable: true
      }
    });

    Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));

    Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));

    Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));

    Color.AddConstantColor('RED', new Color(255, 0, 0, 255));

    Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));

    Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));

    Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));

    Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));

    Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));

    Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));

    return Color;

  }).call(this);
  //@[EXTEND]
  return KDCore.Color = Color;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color, DevLog, __TMP_LOGS__;
  Color = KDCore.Color;
  __TMP_LOGS__ = [];
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
      __TMP_LOGS__.push(this);
    }

    on() {
      this._isShow = true;
      return this;
    }

    off() {
      this._isShow = false;
      return this;
    }

    applyRandomColors() {
      this.applyRandomWithoutBackgroundColors();
      this.setBackColor(Color.Random());
      return this;
    }

    applyRandomWithoutBackgroundColors() {
      this.setColor(Color.Random());
      return this;
    }

    setColor(color) {
      this._color = color;
      return this;
    }

    setBackColor(backColor) {
      this._backColor = backColor;
      return this;
    }

    applyLibraryColors() {
      this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyExtensionColors() {
      this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
      return this;
    }

    applyWarningColors() {
      this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
      return this;
    }

    p(text) {
      if (!this._isShow) {
        return;
      }
      if (text == null) {
        console.log("");
      }
      this._printText(text);
    }

    _printText(text) {
      text = this.prefix + " : " + text;
      if (this._isUsingColor()) {
        return this._printTextWithColors(text);
      } else {
        return console.log(text);
      }
    }

    _isUsingColor() {
      return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
    }

    _printTextWithColors(text) {
      var args;
      args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
      return window.console.log.apply(console, args);
    }

    static CreateForLib(library) {
      var dlog;
      dlog = new DevLog(library.name);
      dlog.applyLibraryColors();
      return dlog;
    }

    static EnableAllLogs() {
      return __TMP_LOGS__.forEach(function(log) {
        return log.on();
      });
    }

  };
  //@[EXTEND]
  return KDCore.DevLog = DevLog;
});


// Generated by CoffeeScript 2.6.1
// * Класс для глобального события игры (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.GEvent = class GEvent {
    constructor(name) {
      this.name = name;
      this.clear();
    }

    addListener(listener, isSingle = false) {
      if (listener == null) {
        return;
      }
      if (isSingle === true) {
        this.listeners = [listener];
      } else {
        this.listeners.push(listener);
      }
    }

    removeListener(listener) {
      if (listener == null) {
        return;
      }
      return this.listener.delete(listener);
    }

    call() {
      var i, l, len, ref;
      ref = this.listeners;
      for (i = 0, len = ref.length; i < len; i++) {
        l = ref[i];
        l();
      }
    }

    clear() {
      return this.listeners = [];
    }

  };
});


// Generated by CoffeeScript 2.6.1
// * Менеджер для управления глобальными событиями игры (GEvent) (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  var GEventsManager;
  // * Данный менеджер глобальный, т.е. с ним работают ВСЕ плагины, которые его используют!
  GEventsManager = function() {};
  (function() {
    var _;
    _ = GEventsManager;
    // * Существует ли событие с данным именем
    _.isEventExists = function(gEventName) {
      return this._getEventByName(gEventName) != null;
    };
    // * Получить список всех зарегестрированных событий (имён)
    _.getAllEvents = function() {
      if (this.events == null) {
        return [];
      }
      return this.events.map(function(ev) {
        return ev.name;
      });
    };
    // * Зарегестрировать событие (используется только имя события)
    _.register = function(gEventName) {
      if (this.events == null) {
        this.events = [];
      }
      this.events.push(new KDCore.GEvent(gEventName));
    };
    // * Подписаться на событие (имя события) и слушатель
    // * если isSingle == true - то у события может быть только один исполнитель
    _.subscribeFor = function(evName, listener, isSingle = false) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.addListener(listener, isSingle) : void 0;
    };
    // * Подписаться на событие (уникально) для объекта
    // * Т.е. при вызове этого метода ещё раз, если объект
    // * уже подписан на событие, ничего не будет (без дубликатов)
    //? ВНИМАНИЕ ! Если объект подписался через subscribeForX, то
    // выполнив clear по данному evName, он уже не подпишится!
    _.subscribeForX = function(context, evName, listener) {
      var e, key;
      try {
        key = "__kdCoreGEvent_" + evName;
        if (context[key] == null) {
          this.subscribeFor(evName, listener);
          return context[key] = true;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Вызвать событие (по имени)
    _.call = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.call() : void 0;
    };
    _.clear = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.clear() : void 0;
    };
    _._getEventByName = function(name) {
      if (!this.events) {
        return null;
      }
      return this.events.find(function(ev) {
        return ev.name === name;
      });
    };
  })();
  //@[EXTEND]
  return KDCore.GEventsManager = GEventsManager;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.MapAnchorPoint = class MapAnchorPoint {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this._realX = this.x;
      this._realY = this.y;
    }

    shiftY() {
      return 0;
    }

    jumpHeight() {
      return 0;
    }

    scrolledX() {
      return Game_CharacterBase.prototype.scrolledX.call(this);
    }

    scrolledY() {
      return Game_CharacterBase.prototype.scrolledY.call(this);
    }

    screenX() {
      return Game_CharacterBase.prototype.screenX.call(this);
    }

    screenY() {
      return Game_CharacterBase.prototype.screenY.call(this);
    }

    moveTo(x, y) {
      this.x = x;
      this.y = y;
      this._realX = this.x;
      this._realY = this.y;
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  //?[DEPRECATED]
  return KDCore.ParametersManager = class ParametersManager {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this._cache = {};
      this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
    }

    isLoaded() {
      return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
    }

    isHasParameter(name) {
      return this._parameters[name] != null;
    }

    getString(name) {
      return this._parameters[name];
    }

    convertField(object, fieldName) {
      var e;
      try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
      } catch (error) {
        e = error;
        console.error('Error while convert field ' + e.name);
        object[fieldName] = false;
      }
      return object;
    }

    convertImage(object, fieldName) {
      return object[fieldName] = this.loadImage(object[fieldName]);
    }

    loadImage(filename, smooth) {
      var e, path;
      try {
        if (filename) {
          path = filename.split('/');
          filename = path.last();
          path = path.first() + '/';
          return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
        } else {
          return ImageManager.loadEmptyBitmap();
        }
      } catch (error) {
        e = error;
        console.error(e);
        return ImageManager.loadEmptyBitmap();
      }
    }

    getFromCacheOrInit(name, func) {
      var object;
      if (!this.isInCache(name)) {
        if (func != null) {
          object = func.call(this);
          this.putInCache(name, object);
        }
      }
      return this.getFromCache(name);
    }

    isInCache(name) {
      return this._cache.hasOwnProperty(name);
    }

    putInCache(name, object) {
      return this._cache[name] = object;
    }

    getFromCache(name) {
      return this._cache[name];
    }

    getNumber(name) {
      var number;
      number = this.getObject(name);
      if (KDCore.SDK.isInt(number)) {
        return number;
      }
      return 0;
    }

    getObject(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || '{}');
      } else {
        return {};
      }
    }

    getBoolean(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || false);
      } else {
        return false;
      }
    }

    getBooleanFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getBooleanFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getNumberFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getNumberFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getStringFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getStringFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getBooleanFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getBoolean(name);
      });
    }

    getNumberFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getNumber(name);
      });
    }

    getStringFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getString(name);
      });
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.ParamLoader = class ParamLoader {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
      this.params = this.parseParameters(this.paramsRaw);
    }

    parseParameters(paramSet) {
      var clearKey, key, params, typeKey, value;
      params = {};
      for (key in paramSet) {
        value = paramSet[key];
        KDCore.__ppNameToParseNext = key;
        clearKey = this.parseKey(key);
        typeKey = this.parseKeyType(key);
        params[clearKey] = this.parseParamItem(typeKey, value);
      }
      return params;
    }

    parseKey(keyRaw) {
      return keyRaw.split(":")[0];
    }

    parseKeyType(keyRaw) {
      return keyRaw.split(":")[1];
    }

    writeDetailedError() {
      var e;
      try {
        if (!String.any(KDCore.__ppNameToParseNext)) {
          return;
        }
        return console.warn("Please, check Plugin Parameter " + KDCore.__ppNameToParseNext + " in plugin " + this.pluginName);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    // * Проверка, загружены ли параметры плагина
    isLoaded() {
      return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
    }

    // * Имя параметра без ключа
    isHasParameter(paramName) {
      return this.params[paramName] != null;
    }

    
      // * Возвращает значение параметра (def - по умолчанию, если не найден)
    getParam(paramName, def) {
      var value;
      if (this.isHasParameter(paramName)) {
        value = this.params[paramName];
        if (value != null) {
          return value;
        }
      }
      return def;
    }

    // * Данные ключи должны идти после названия параметра через :
    // * Пример: @param ShowDelay:int, @param TestBool:bool
    // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
    parseParamItem(type, item) {
      var e;
      if (type == null) {
        return item;
      }
      try {
        switch (type) {
          case "int":
          case "i":
            return Number(item);
          case "intA":
            return this.parseArray(item, "int");
          case "bool":
          case "b":
          case "e":
            return eval(item);
          case "struct":
          case "s":
            return this.parseStruct(item);
          case "structA":
            return this.parseStructArray(item);
          case "str":
            return item;
          case "strA":
            return this.parseArray(item, "str");
          case "note":
            return this.parseNote(item);
          case "css":
            return item.toCss();
          case "color":
            return KDCore.Color.FromHex(item);
          case "json":
          case "j":
            return this.parseJson(item);
          case "jA":
            return this.parseArray(item, 'json');
          default:
            return item;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
        return item;
      }
    }

    parseArray(items, type) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseParamItem(type, p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
      }
      return elements;
    }

    parseStruct(item) {
      var e, parsed;
      try {
        if (item == null) {
          return null;
        }
        if (!String.any(item)) {
          return null;
        }
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return this.parseParameters(parsed);
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
      }
      return null;
    }

    parseStructArray(items) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseStruct(p));
          } catch (error) {
            e = error;
            console.warn(e);
            this.writeDetailedError();
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
      }
      return elements;
    }

    parseNote(item) {
      var e, parsed;
      try {
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return parsed;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
      }
      return item;
    }

    parseJson(item) {
      var cx, e, element, elements, i, json, key, len, parsed, value;
      try {
        json = {};
        parsed = JsonEx.parse(item);
        elements = parsed.split('\n');
        for (i = 0, len = elements.length; i < len; i++) {
          element = elements[i];
          cx = "{" + element + "}";
          try {
            item = JsonEx.parse(cx);
            for (key in item) {
              value = item[key];
              json[key] = value;
            }
          } catch (error) {
            e = error;
            KDCore.warning("Parameter " + element + " have syntax errors, ignored");
          }
        }
        return json;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        this.writeDetailedError();
        return null; // * Чтобы default value был возвращён
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Point;
  Point = (function() {
    class Point {
      constructor(_x = 0, _y = 0) {
        this._x = _x;
        this._y = _y;
      }

      clone() {
        return new Point(this._x, this._y);
      }

      toString() {
        return "[" + this._x + " ; " + this._y + "]";
      }

      isSame(anotherPoint) {
        return this.x === anotherPoint.x && this.y === anotherPoint.y;
      }

      convertToCanvas() {
        return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
      }

      convertToMap() {
        return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
      }

      convertToScreen() {
        return new Point(this.screenX(), this.screenY());
      }

      screenX() {
        var t, tw;
        t = $gameMap.adjustX(this._x);
        tw = $gameMap.tileWidth();
        return Math.round(t * tw + tw / 2);
      }

      screenY() {
        var t, th;
        t = $gameMap.adjustY(this._y);
        th = $gameMap.tileHeight();
        return Math.round(t * th + th);
      }

      round() {
        return new Point(Math.round(this._x), Math.round(this._y));
      }

      floor() {
        return new Point(Math.floor(this._x), Math.floor(this._y));
      }

      mapPointOnScreen() {
        var nx, ny;
        nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
        ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
        return new Point(nx, ny);
      }

      multiplyBy(val) {
        return new Point(this._x * val, this._y * val);
      }

      simple() {
        return new PIXI.Point(this.x, this.y);
      }

      delta(point) {
        var dx, dy;
        dx = point.x - this._x;
        dy = point.y - this._y;
        return new KDCore.Point(dx, dy);
      }

      static _getEmpty() {
        if (Point._emptyPoint == null) {
          Point._emptyPoint = new Point(0, 0);
        }
        return Point._emptyPoint;
      }

    };

    Object.defineProperties(Point.prototype, {
      x: {
        get: function() {
          return this._x;
        },
        configurable: true
      },
      y: {
        get: function() {
          return this._y;
        },
        configurable: true
      }
    });

    Object.defineProperties(Point, {
      Empty: {
        get: function() {
          return Point._getEmpty();
        },
        configurable: false
      }
    });

    Array.prototype.toPoint = function() {
      return new Point(this[0], this[1]);
    };

    Object.defineProperty(Array.prototype, "toPoint", {
      enumerable: false
    });

    Sprite.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    Game_CharacterBase.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    return Point;

  }).call(this);
  //@[EXTEND]
  return KDCore.Point = Point;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return KDCore.Sprite = (function(superClass) {
    //rev 07.05.22

      //@[AUTO EXTEND]
    class Sprite extends superClass {
      constructor() {
        super(...arguments);
        this.pHandledIndex = 0;
        this._create2();
        return;
      }

      _create2() {} // * FOR CHILDRENS

      pIsSupportKeyboardHandle() {
        return false;
      }

      pIsVerticalKeyboardNavigation() {
        return true;
      }

      pIsFreeKeyboardNavigation() {
        return false;
      }

      // * For Childrens
      isLoaded() {
        return true;
      }

      isNotHaveBounds() {
        return this._isNotHaveBounds === true;
      }

      realWidth() {
        var child;
        if (this.isNotHaveBounds()) {
          return 0;
        }
        if (this.width === 0) {
          child = this.zeroChild();
          if (child != null) {
            if (child.realWidth != null) {
              return child.realWidth();
            } else {
              return child.width;
            }
          }
        }
        return this.width;
      }

      realHeight() {
        var child;
        if (this.isNotHaveBounds()) {
          return 0;
        }
        if (this.height === 0) {
          child = this.zeroChild();
          if (child != null) {
            if (child.realHeight != null) {
              return child.realHeight();
            } else {
              return child.height;
            }
          }
        }
        return this.height;
      }

      dataBindings() {
        return {
          x: function(v) {
            if (v != null) {
              return this.setPosition(v, this.y);
            }
          },
          y: function(v) {
            if (v != null) {
              return this.setPosition(this.x, v);
            }
          },
          position: function(v) {
            if (v != null) {
              return this.setPosition(v);
            }
          },
          anchor: function(v) {
            if (v != null) {
              return this.setCommonAnchor(v);
            }
          },
          animation: function(v) {
            if (v != null) {
              return this.addAnimationRule(v);
            }
          },
          opacity: function(v) {
            if (v != null) {
              return this.opacity = v;
            }
          },
          visible: function(v) {
            if (v != null) {
              return this.visible = v;
            }
          },
          scale: function(v) {
            if (v != null) {
              return this.scale.set(v);
            }
          },
          rotation: function(v) {
            if (v != null) {
              return this.rotation = v;
            }
          },
          centeredScale: function(v) {
            if (v != null) {
              return this.setCenteredScale(v);
            }
          },
          physicalBounds: function(v) {
            if (v != null) {
              return this._isNotHaveBounds = !v;
            }
          }
        };
      }

      setCenteredScale(value) {
        var e;
        try {
          if (!this.isLoaded()) {
            this._requireFunc('setCenteredScale', arguments);
            return;
          }
          this._refreshAnchoredCenter();
          return this._scaleFactor = value;
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      callBinding(binding, value) {
        var e, func;
        try {
          func = this.dataBindings()[binding];
          if (func != null) {
            return func.call(this, value);
          } else {
            return console.warn("Binding " + binding + " not found!");
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      refreshBindings(dataObject = null, recursive = true) {
        var child, e, j, len, ref, results;
        try {
          if (dataObject == null) {
            dataObject = this;
          }
          KDCore.UI.Builder.RefreshBindings(this, dataObject);
          if (recursive === true) {
            ref = this.children;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              child = ref[j];
              try {
                if (child.refreshBindings != null) {
                  results.push(child.refreshBindings(dataObject, true));
                } else {
                  results.push(void 0);
                }
              } catch (error) {
                e = error;
                results.push(KDCore.warning(e));
              }
            }
            return results;
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      uiConstant(name) {
        var e;
        try {
          if (this.uiConstants != null) {
            return this.uiConstants[name];
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        return null;
      }

      addLoadListener(listener) {
        var e;
        try {
          if (listener == null) {
            return;
          }
          if (this.isLoaded()) {
            try {
              return listener();
            } catch (error) {
              e = error;
              return KDCore.warning(e);
            }
          } else {
            return this._addLoadListener(listener);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      setPosition(x = 0, y = null, bindedObj = null) {
        var _x, _y, e;
        try {
          if (!this.isLoaded()) {
            this._requireFunc('setPosition', arguments);
            return;
          }
          // * Check first Argument as Object
          if (typeof x === 'object') {
            if (x.x != null) {
              _x = x.x;
              if (x.y != null) {
                _y = x.y;
              }
              x = _x;
              y = _y;
            } else if (x.position != null) {
              this.setPosition(x.position, null, bindedObj);
              return;
            } else if (x.margins != null) {
              this.setPosition(x.margins, null, bindedObj);
              return;
            }
          }
          if (typeof x === 'string') {
            this.x = this._getValueByStr(x, 'x', bindedObj);
            if (y == null) {
              y = x;
            }
          } else {
            this.x = x; // * Number
          }
          if (typeof y === 'string') {
            return this.y = this._getValueByStr(y, 'y', bindedObj);
          } else {
            if (y != null) {
              return this.y = y;
            }
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _getValueByStr(value = '0', forField = 'x', owner = null) {
        var dpValue, e, exValue, parentRefSize, percentValue, r, result, resultValue, v;
        try {
          if (typeof value === 'number') {
            return value;
          }
          if (isFinite(value)) {
            return Number(value);
          }
          if (typeof value !== 'string') {
            return 0;
          }
          // * NO REPLACEMENT
          if (value[0] === '$' || value[0] === '@') {
            v = KDCore.Utils.convertBindingValue(owner, value, this);
            return this._getValueByStr(v, forField, owner);
          }
          if (value.contains("prevX")) {
            value = value.replace("prevX", this._getPreviousChildData('x'));
            return this._getValueByStr(value, forField, owner);
          }
          if (value.contains("prevY")) {
            value = value.replace("prevY", this._getPreviousChildData('y'));
            return this._getValueByStr(value, forField, owner);
          }
          if (value.contains("prevHeight")) {
            value = value.replace("prevHeight", this._getPreviousChildData('height'));
            return this._getValueByStr(value, forField, owner);
          }
          if (value.contains("prevWidth")) {
            value = value.replace("prevWidth", this._getPreviousChildData('width'));
            return this._getValueByStr(value, forField, owner);
          }
          if (value.contains("prevEndX")) {
            value = value.replace("prevEndX", "prevX + prevWidth");
            return this._getValueByStr(value, forField, owner);
          }
          if (value.contains("prevEndY")) {
            value = value.replace("prevEndY", "prevY + prevHeight");
            return this._getValueByStr(value, forField, owner);
          }
          if (value.contains("end")) {
            value = value.replace("end", "100%");
          }
          if (value.contains("begin")) {
            if (forField === 'y') {
              value = value.replace("begin", "-height");
            } else {
              value = value.replace("begin", "-width");
            }
          }
          if (value.contains("right")) {
            value = value.replace("right", "100% - width");
            return this._getValueByStr(value, forField, owner);
          }
          if (value.contains("left")) {
            value = value.replace("left", "0");
            return this._getValueByStr(value, forField, owner);
          }
          if (value.contains("top")) {
            value = value.replace("top", "0");
            return this._getValueByStr(value, forField, owner);
          }
          if (value.contains("bottom")) {
            value = value.replace("bottom", "100% - height");
            return this._getValueByStr(value, forField, owner);
          }
          // * Replace all X%
          if (value.contains("%")) {
            r = new RegExp("(\\d+)%", "g");
            result = r.exec(value);
            while ((result != null)) {
              percentValue = Number(result[1]);
              resultValue = 0;
              if (this.parent != null) {
                parentRefSize = KDCore.Utils.getRealSpriteSize(forField, this.parent);
                resultValue = parentRefSize * (percentValue / 100.0);
              }
              value = value.replace(/(\d+)%/, resultValue);
              result = r.exec(value);
            }
          }
          // * Replace all HDP
          if (value.contains("hdp")) {
            r = new RegExp("(\\d+)hdp", "g");
            result = r.exec(value);
            while ((result != null)) {
              dpValue = Number(result[1]);
              resultValue = KDCore.Utils.convertDP(dpValue, true);
              value = value.replace(/(\d+)hdp/, resultValue);
              result = r.exec(value);
            }
          }
          // * Replace all DP
          if (value.contains("dp")) {
            r = new RegExp("(\\d+)dp", "g");
            result = r.exec(value);
            while ((result != null)) {
              dpValue = Number(result[1]);
              resultValue = KDCore.Utils.convertDP(dpValue, false);
              value = value.replace(/(\d+)dp/, resultValue);
              result = r.exec(value);
            }
          }
          if (value.contains('center')) {
            v = this._getValueByStr('50%', forField, owner);
            exValue = KDCore.Utils.getRealSpriteSize(forField, this);
            exValue = v - (exValue / 2);
            value = value.replace("center", exValue);
            return this._getValueByStr(value, forField, owner);
          }
          if (value.contains("height")) {
            exValue = KDCore.Utils.getRealSpriteSize("height", this);
            value = value.replace("height", exValue);
            return this._getValueByStr(value, forField, owner);
          }
          if (value.contains("width")) {
            exValue = KDCore.Utils.getRealSpriteSize("width", this);
            value = value.replace("width", exValue);
            return this._getValueByStr(value, forField, owner);
          }
          v = eval(value);
          return this._getValueByStr(v, forField, owner);
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        return 0;
      }

      _getPreviousChildData(forField) {
        var e, myIndex, prevChild;
        try {
          if (this.parent == null) {
            return 0;
          }
          if (this.parent.children.length <= 1) {
            return 0;
          }
          myIndex = this.parent.children.indexOf(this);
          prevChild = this.parent.children[myIndex - 1];
          if (prevChild == null) {
            return 0;
          }
          if (forField === "x") {
            return prevChild.x;
          } else if (forField === "y") {
            return prevChild.y;
          } else {
            return KDCore.Utils.getRealSpriteSize(forField, prevChild);
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        return 0;
      }

      setCommonAnchor(x, y) {
        var c, e, j, len, ref;
        try {
          if (y == null) {
            y = x;
          }
          this.anchor.x = x;
          this.anchor.y = y;
          ref = this.children;
          for (j = 0, len = ref.length; j < len; j++) {
            c = ref[j];
            if (c == null) {
              continue;
            }
            if (c.setCommonAnchor != null) {
              c.setCommonAnchor(x, y);
            } else {
              if (c.anchor == null) {
                continue;
              }
              c.anchor.x = x;
              c.anchor.y = y;
            }
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }

      zeroChild() {
        return this.children[0];
      }

      appear(step, delay = 0) {
        this.opacity = 0;
        this._opChanger = KDCore.Changer.CreateForOpacityUp(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      disapper(step, delay = 0) {
        this._opChanger = KDCore.Changer.CreateForOpacityDown(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      moveWithAnimation(dx, dy, duration = 30, easingType = 2) {
        var e;
        try {
          this._moveAnimationItem = new Game_Picture();
          this._moveAnimationItem._x = this.x;
          this._moveAnimationItem._y = this.y;
          this._moveAnimationItem.move(0, this.x + dx, this.y + dy, 1, 1, 255, 0, duration, easingType);
          this.updateMovingAnimation = this.updateMovingAnimationBody;
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }

      assignTooltip(content, params) {
        if (this._tooltip != null) {
          this.removeChild(this._tooltip);
        }
        this._tooltip = new KDCore.UI.Sprite_UITooltip(params);
        this._tooltip.addContent(content);
        this.updateTooltip = this.updateTooltipBody;
      }

      destroyTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this.hideTooltip();
        this.removeChild(this._tooltip);
        this._tooltip = null;
        return this.updateTooltip = function() {}; // * EMPTY
      }

      showTooltip() {
        if (this._tooltip == null) {
          return;
        }
        // * Position 0, 0, becouse cursorRelative by default
        this._tooltip.activateTooltip(0, 0, this);
      }

      hideTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this._tooltip.deactivateTooltip();
      }

      //@[DYNAMIC]
      updateTooltip() {} // * EMPTY

      updateTooltipBody() {
        if (this.isUnderMouse()) {
          if (this._tooltip.isTooltipActive()) {

          } else {
            if (this.isReady() && this.visible === true && this.opacity >= 255) {
              return this.showTooltip();
            }
          }
        } else {
          if (this._tooltip.isTooltipActive()) {
            return this.hideTooltip();
          }
        }
      }

      //@[DYNAMIC]
      updateMovingAnimation() {} // * EMPTY

      updateMovingAnimationBody() {
        var e;
        try {
          if (this._moveAnimationItem == null) {
            return;
          }
          this._moveAnimationItem.update();
          this.x = this._moveAnimationItem._x;
          this.y = this._moveAnimationItem._y;
          if (this._moveAnimationItem._duration <= 0) {
            this._moveAnimationItem = null;
            this.updateMovingAnimation = function() {};
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
          this.updateMovingAnimation = function() {};
        }
      }

      addAnimationRule(rule) {
        var e, r;
        try {
          if (rule == null) {
            return;
          }
          if (this._animationRules == null) {
            this._animationRules = [];
          }
          if (typeof rule === 'object' && (rule.animationConfig != null) && (rule.update != null)) {
            r = rule;
          } else {
            r = new KDCore.AnimationRule(rule, this);
          }
          this._animationRules.push(r);
          return r;
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        return null;
      }

      setAnimationRule(rule) {
        var e;
        try {
          this._animationRules = [];
          return this.addAnimationRule(rule);
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        return null;
      }

      isShouldAlwaysKeepCenter() {
        return this.__anchoredCenterX != null;
      }

      // * For Animation Rule (callback)
      onBeforeChangeScaleFactor() {
        var e;
        try {
          if (this.isShouldAlwaysKeepCenter()) {
            return this._refreshAnchoredCenter();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      update() {
        super.update();
        this._updateOpChanger();
        this.updateTooltip();
        if (this.updateMovingAnimation != null) {
          this.updateMovingAnimation();
        }
        if (this.pIsHandlerActive()) {
          this._pHandleKeyboardInputs();
        }
        if (this.devdrag === true) {
          this._pUpdateDevDrag();
        }
        if (this._animationRules != null) {
          this._pUpdateAnimationRules();
        }
        if (this._scaleFactor != null) {
          this._pUpdateScaleFactor();
        }
      }

      _pUpdateScaleFactor() {
        var e;
        try {
          if (this.scale.x !== this._scaleFactor || this.scale.y !== this._scaleFactor) {
            this.scale.set(this._scaleFactor);
            if (this.isShouldAlwaysKeepCenter()) {
              return this._refreshRelativeCenterPosition();
            }
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _refreshAnchoredCenter() {
        var e;
        try {
          if (this.__lastCenterBaseX !== this.x || this.__lastCenterBaseY !== this.y) {
            this.__lastCenterBaseX = this.x;
            this.__lastCenterBaseY = this.y;
          }
          this.__anchoredCenterX = this.__lastCenterBaseX + this.realWidth() / 2;
          return this.__anchoredCenterX = this.__lastCenterBaseY + this.realHeight() / 2;
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _refreshRelativeCenterPosition() {
        var e, newHeight, newWidth;
        try {
          // Смещение позиции для сохранения центра
          newWidth = this.realWidth() * this.scale.x;
          newHeight = this.realHeight() * this.scale.y;
          this.x = this.__anchoredCenterX - newWidth / 2;
          return this.y = this.__anchoredCenterX - newHeight / 2;
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pUpdateAnimationRules() {
        var e, j, len, ref, results, rule;
        try {
          ref = this._animationRules;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            rule = ref[j];
            rule.update();
            results.push(rule.applyAnimation(this));
          }
          return results;
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      //@[DYNAMIC]
      _updateOpChanger() {} // * EMPTY

      b() {
        return this.bitmap;
      }

      clear() {
        return this.bitmap.clear();
      }

      add() {
        return this.addChild(...arguments);
      }

      bNew(w, h) {
        if (h == null) {
          h = w;
        }
        return this.bitmap = new Bitmap(w, h);
      }

      bImg(filename, sourceFolder) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        return this.bitmap = getterFunc(filename);
      }

      onReady(method) {
        if (method != null) {
          return this.bitmap.addLoadListener(method);
        }
      }

      drawText() {
        return this.bitmap.drawText(...arguments);
      }

      drawTextFull(text, position = "center") {
        if (this.textSettingsPosition != null) {
          position = this.textSettingsPosition;
        }
        return this.bitmap.drawTextFull(text, position);
      }

      //?DEPRECATED
      drawTextWithSettings(text) {
        this.clear();
        this.drawTextFull(text, this.textSettingsPosition);
      }

      //? x, y, icon, size
      drawIcon() {
        return this.bitmap.drawIcon(...arguments);
      }

      moveByJson(settings) {
        var pos;
        pos = KDCore.Utils.getPositionPointFromJSON(settings);
        return this.move(pos.x, pos.y);
      }

      applyTextSettingsByJson(sprite, settings) {
        this.applyTextSettingsByExtraSettings(sprite, settings.text);
      }

      applyTextSettingsByExtraSettings(sprite, s) {
        sprite.move(s.marginX, s.marginY);
        sprite.b().fontSize = s.fontSize;
        sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
        sprite.b().outlineWidth = s.outlineWidth;
        if (s.outlineColor != null) {
          sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
        }
        if (s.fontFace != null) {
          sprite.b().fontFace = s.fontFace;
        }
        sprite.b().fontItalic = s.fontItalic;
        sprite.visible = s.visible;
      }

      isReady() {
        var i, j, ref;
        if (this.bitmap != null) {
          if (!this.bitmap.isReady()) {
            return false;
          }
        }
        for (i = j = 0, ref = this.children.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          if (!this.children[i].bitmap.isReady()) {
            return false;
          }
        }
        return true;
      }

      isCheckAlpha() {
        return false;
      }

      inPosition(point) {
        var e, gx, gy, pixel, result, x, y;
        result = this.isContainsPoint(point);
        if (result && this.isCheckAlpha()) {
          try {
            ({x, y} = point);
            gx = KDCore.SDK.toGlobalCoord(this, 'x');
            gy = KDCore.SDK.toGlobalCoord(this, 'y');
            pixel = this.bitmap.getAlphaPixel(x - gx, y - gy);
            result = pixel > 100;
          } catch (error) {
            e = error;
            KDCore.warning(e);
            result = true; // * ignor Alpha if error
          }
        }
        return result;
      }

      isUnderMouse() {
        return this.inPosition(TouchInput);
      }

      // * Из параметров плагина
      applyFontParam(font) {
        var b;
        if (font == null) {
          return;
        }
        b = this.b();
        if (font.size != null) {
          b.fontSize = font.size;
        }
        if (!String.isNullOrEmpty(font.face)) {
          b.fontFace = font.face;
        }
        if (font.italic != null) {
          b.fontItalic = font.italic;
        }
      }

      applyOutlineParam(outline) {
        var b;
        if (outline == null) {
          return;
        }
        b = this.b();
        if (outline.width != null) {
          b.outlineWidth = outline.width;
        }
        if (!String.isNullOrEmpty(outline.color)) {
          b.outlineColor = outline.color;
        }
      }

      activateHandlerManagment() {
        var e;
        try {
          if (this.pIsFreeKeyboardNavigation()) {
            this.handleUpAction = this.freeSelectUpHandlerItem;
            this.handleDownAction = this.freeSelectDownHandlerItem;
            this.handleRightAction = this.freeSelectRightHandlerItem;
            this.handleLeftAction = this.freeSelectLeftHandlerItem;
          } else {
            this.handleUpAction = this.selectPreviousHandlerItem;
            this.handleDownAction = this.selectNextHandlerItem;
          }
          return this._handleManagerActive = true;
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      deactivateHandlerManagment() {
        var ref;
        this._handleManagerActive = false;
        this.handleUpAction = function() {}; // * EMPTY
        this.handleDownAction = function() {}; // * EMPTY
        this.handleRightAction = function() {}; // * EMPTY
        this.handleLeftAction = function() {}; // * EMPTY
        if ((ref = $gameTemp.__pkdActiveKeyboardHandler) != null) {
          ref.pDeactivateHandler();
        }
        $gameTemp.__pkdActiveKeyboardHandler = null;
      }

      addChild(item) {
        var c, handlers;
        c = super.addChild(...arguments);
        if (item instanceof KDCore.Sprite && (item.pIsSupportKeyboardHandle != null) && item.pIsSupportKeyboardHandle()) {
          handlers = this._pGetAllHandlers();
          item.pHandledIndex = handlers.length - 1;
        }
        return c;
      }

      pIsAnyHandlerSelected() {
        return $gameTemp.__pkdActiveKeyboardHandler != null;
      }

      selectPreviousHandlerItem() {
        var e;
        try {
          if (!this.pIsAnyHandlerSelected()) {
            return this._trySelectHandler(0);
          } else {
            return this._trySelectHandler(this._selectedHandlerIndex() - 1);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _selectedHandlerIndex() {
        return $gameTemp.__pkdActiveKeyboardHandler.pHandledIndex;
      }

      _trySelectHandler(index) {
        var e, handlerItemToSelect;
        try {
          handlerItemToSelect = this._pGetAllHandlers().find(function(i) {
            return i.pHandledIndex === index;
          });
          if (handlerItemToSelect != null) {
            handlerItemToSelect.pActivateHandler();
          }
          return this._pOnHandled();
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pGetAllHandlers() {
        return this.children.filter(function(i) {
          return i instanceof KDCore.Sprite && (i.pIsSupportKeyboardHandle != null) && i.pIsSupportKeyboardHandle();
        });
      }

      selectNextHandlerItem() {
        var e;
        try {
          if (!this.pIsAnyHandlerSelected()) {
            return this._trySelectHandler(0);
          } else {
            return this._trySelectHandler(this._selectedHandlerIndex() + 1);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      activeItemFilterOptions() {
        return {
          distance: 15,
          outerStrength: 4
        };
      }

      pIsHandlerActive() {
        return this._handleManagerActive === true || this._handlerActive === true;
      }

      destroy() {
        if ($gameTemp.__pkdActiveKeyboardHandler === this) {
          $gameTemp.__pkdActiveKeyboardHandler = null;
        }
        return super.destroy();
      }

      _pOnHandled() {
        return Input.clear();
      }

      _pHandleKeyL(ignoreNavigation = false) {
        var e;
        try {
          if (this.pIsVerticalKeyboardNavigation() || ignoreNavigation) {
            if (this.handleLeftAction != null) {
              this.handleLeftAction();
              return this._pOnHandled();
            }
          } else {
            return this._pHandleKeyU(true);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pHandleKeyR(ignoreNavigation = false) {
        var e;
        try {
          if (this.pIsVerticalKeyboardNavigation() || ignoreNavigation) {
            if (this.handleRightAction != null) {
              this.handleRightAction();
              return this._pOnHandled();
            }
          } else {
            return this._pHandleKeyD(true);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pHandleKeyU(ignoreNavigation = false) {
        var e;
        try {
          if (this.pIsVerticalKeyboardNavigation() || ignoreNavigation) {
            if (this.handleUpAction != null) {
              this.handleUpAction();
              return this._pOnHandled();
            }
          } else {
            return this._pHandleKeyL(true);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pHandleKeyD(ignoreNavigation = false) {
        var e;
        try {
          if (this.pIsVerticalKeyboardNavigation() || ignoreNavigation) {
            if (this.handleDownAction != null) {
              this.handleDownAction();
              return this._pOnHandled();
            }
          } else {
            return this._pHandleKeyR(true);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pHandleKeyOK() {
        var e;
        try {
          if (this.handleOKAction != null) {
            this.handleOKAction();
            return this._pOnHandled();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      pActivateHandler() {
        if (!this.pIsSupportKeyboardHandle()) {
          return;
        }
        if (($gameTemp.__pkdActiveKeyboardHandler != null) && $gameTemp.__pkdActiveKeyboardHandler !== this) {
          $gameTemp.__pkdActiveKeyboardHandler.pDeactivateHandler();
        }
        this._handlerActive = true;
        this._activateHandlerVisually();
        $gameTemp.__pkdActiveKeyboardHandler = this;
      }

      _activateHandlerVisually() {
        var e;
        try {
          //@filters = [new PIXI.filters.OutlineFilter(0.8, 0x99ff99, 0.5)]
          //@filters = [new PIXI.filters.GlowFilter(2, 0.8, 0, 0x09f9, 0.5)]
          return this.filters = [new PIXI.filters.GlowFilter(this.activeItemFilterOptions())];
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      pDeactivateHandler() {
        if ($gameTemp.__pkdActiveKeyboardHandler === this) {
          $gameTemp.__pkdActiveKeyboardHandler = null;
        }
        this._handlerActive = false;
        this.filters = [];
      }

      _pHandleKeyboardInputs() {
        var e;
        try {
          if (Input.isTriggered('left')) {
            return this._pHandleKeyL();
          } else if (Input.isTriggered('right')) {
            return this._pHandleKeyR();
          } else if (Input.isTriggered('up')) {
            return this._pHandleKeyU();
          } else if (Input.isTriggered('down')) {
            return this._pHandleKeyD();
          } else if (Input.isTriggered('ok')) {
            return this._pHandleKeyOK();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      pSelectedHandlerItem() {
        return $gameTemp.__pkdActiveKeyboardHandler;
      }

      freeSelectUpHandlerItem() {
        var allItems, e, item;
        try {
          allItems = this._pGetAllHandlers();
          if (allItems.length === 0) {
            return;
          }
          if (this.pIsAnyHandlerSelected()) {
            item = this._pGetClosestItemToYx(this.pSelectedHandlerItem().x, -this.pSelectedHandlerItem().y, allItems);
            if (item != null) {
              item.pActivateHandler();
            }
          } else {
            allItems[0].pActivateHandler();
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        return this._pOnHandled();
      }

      freeSelectDownHandlerItem() {
        var allItems, e, item;
        try {
          allItems = this._pGetAllHandlers();
          if (allItems.length === 0) {
            return;
          }
          if (this.pIsAnyHandlerSelected()) {
            item = this._pGetClosestItemToYx(this.pSelectedHandlerItem().x, this.pSelectedHandlerItem().y, allItems);
            if (item != null) {
              item.pActivateHandler();
            }
          } else {
            allItems[0].pActivateHandler();
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        return this._pOnHandled();
      }

      freeSelectRightHandlerItem() {
        var allItems, e, item;
        try {
          allItems = this._pGetAllHandlers();
          if (allItems.length === 0) {
            return;
          }
          if (this.pIsAnyHandlerSelected()) {
            // * We should find item by X,Y position
            // * If we search in RIGHT direction, we should find closest item with X > currentX, but on the same Y
            // * If we can't find such item, we should again, but modify Y
            item = this._pGetClosestItemToXy(this.pSelectedHandlerItem().x, this.pSelectedHandlerItem().y, allItems);
            if (item != null) {
              item.pActivateHandler();
            }
          } else {
            allItems[0].pActivateHandler();
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        return this._pOnHandled();
      }

      freeSelectLeftHandlerItem() {
        var allItems, e, item;
        try {
          allItems = this._pGetAllHandlers();
          if (allItems.length === 0) {
            return;
          }
          if (this.pIsAnyHandlerSelected()) {
            item = this._pGetClosestItemToXy(-this.pSelectedHandlerItem().x, this.pSelectedHandlerItem().y, allItems);
            if (item != null) {
              item.pActivateHandler();
            }
          } else {
            allItems[0].pActivateHandler();
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        return this._pOnHandled();
      }

      _pGetClosestItemToXy(x, y, fromItems) {
        var distances, index, item, items, itemsInRow, j, len, rX;
        items = this._pGetItemsByX(x, fromItems);
        if (items.length === 0) {
          return null;
        }
        itemsInRow = items.filter(function(item) {
          return item.y === y;
        });
        if (itemsInRow.length > 0) {
          itemsInRow.sort(function(a, b) {
            return a.x - b.x;
          });
          return itemsInRow[0];
        } else {
          distances = [];
          rX = Math.abs(x);
          for (index = j = 0, len = items.length; j < len; index = ++j) {
            item = items[index];
            distances.push([index, Math.abs(item.x - rX) + Math.abs(item.y - y)]);
          }
          distances.sort(function(a, b) {
            return a[1] - b[1];
          });
          return items[distances[0][0]];
        }
      }

      _pGetItemsByX(x, fromItems) {
        if (x >= 0) {
          return fromItems.filter(function(item) {
            return item.x > x;
          });
        } else {
          return fromItems.filter(function(item) {
            return item.x < Math.abs(x);
          });
        }
      }

      _pGetClosestItemToYx(x, y, fromItems) {
        var distances, index, item, items, itemsInRow, j, len, rY;
        items = this._pGetItemsByY(y, fromItems);
        if (items.length === 0) {
          return null;
        }
        itemsInRow = items.filter(function(item) {
          return item.x === x;
        });
        if (itemsInRow.length > 0) {
          itemsInRow.sort(function(a, b) {
            return a.y - b.y;
          });
          return itemsInRow[0];
        } else {
          distances = [];
          rY = Math.abs(y);
          for (index = j = 0, len = items.length; j < len; index = ++j) {
            item = items[index];
            distances.push([index, Math.abs(item.x - x) + Math.abs(item.y - rY)]);
          }
          distances.sort(function(a, b) {
            return a[1] - b[1];
          });
          return items[distances[0][0]];
        }
      }

      _pGetItemsByY(y, fromItems) {
        if (y >= 0) {
          return fromItems.filter(function(item) {
            return item.y > y;
          });
        } else {
          return fromItems.filter(function(item) {
            return item.y < Math.abs(y);
          });
        }
      }

      _applyRequiredData() {
        var _n, e, func, j, len, ref;
        try {
          if (this._requiredFuncs == null) {
            return;
          }
          ref = this._requiredFuncs;
          for (j = 0, len = ref.length; j < len; j++) {
            func = ref[j];
            try {
              _n = func[0];
              if ((_n != null) && (this[_n] != null)) {
                this[_n](...func[1]);
              }
            } catch (error) {
              e = error;
              KDCore.warning(e);
            }
          }
          return this._requiredFuncs = null;
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _requireFunc(name, args) {
        var e;
        try {
          if (this._requiredFuncs == null) {
            this._requiredFuncs = [];
          }
          return this._requiredFuncs.push([name, args]);
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _addLoadListener(listener) {
        var e;
        try {
          if (this._loadListeners == null) {
            this._loadListeners = [];
          }
          return this._loadListeners.push(listener);
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _executeLoadListeners() {
        var e, j, l, len, ref;
        try {
          if (!this._loadListeners) {
            return;
          }
          ref = this._loadListeners;
          for (j = 0, len = ref.length; j < len; j++) {
            l = ref[j];
            try {
              l();
            } catch (error) {
              e = error;
              KDCore.warning(e);
            }
          }
          return this._loadListeners = null;
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      // * DEVELOPER TOOL ====================================
      _pUpdateDevDrag() {
        if (TouchInput.isLongPressed()) {
          if (this.__ddIn === true) {
            return this._pDD_moving();
          } else {
            if (this.isUnderMouse()) {
              return this._pDD_startMove();
            }
          }
        } else {
          if (this.__ddIn === true) {
            return this._pDD_stopMove();
          }
        }
      }

      _pDD_moving() {
        this.x = TouchInput.x - this._pDDTDelta.x;
        return this.y = TouchInput.y - this._pDDTDelta.y;
      }

      _pDD_startMove() {
        var x, y;
        ({x, y} = TouchInput);
        this._pDDTDelta = {x, y};
        this.__ddIn = true;
      }

      _pDD_stopMove() {
        this.__ddIn = false;
        console.log("DD DRAG POS: ");
        return console.log(this.x, this.y);
      }

      // * STATIC ==================================================
      static WhiteRect(w, h) {
        return KDCore.Sprite.ColorRect(w, h, '#FFF');
      }

      static BlackRect(w, h) {
        return KDCore.Sprite.ColorRect(w, h, '#000');
      }

      static ColorRect(w, h, color) {
        var s;
        s = KDCore.Sprite.FromBitmap(w, h);
        s.b().fillAll(color);
        return s;
      }

      static FromImg(filename, sourceFolder) {
        var s;
        s = new KDCore.Sprite();
        s.bImg(filename, sourceFolder);
        return s;
      }

      static FromBitmap(w, h) {
        var s;
        s = new KDCore.Sprite();
        s.bNew(w, h);
        return s;
      }

      static FromTextSettings(settings) {
        var s;
        s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
        s.applyTextSettingsByExtraSettings(s, settings);
        s.textSettingsPosition = settings.position;
        return s;
      }

      // * Загрузчик из параметров плагина (безопасный)
      static FromParams(pluginParams) {
        var e, h, height, margins, s, size, w, width;
        try {
          size = pluginParams.size;
          ({w, h} = size);
          try {
            if (String.any(w)) {
              if (isFinite(w)) {
                w = Number(w);
              } else {
                w = eval(w);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            w = 100;
          }
          try {
            if (String.any(h)) {
              if (isFinite(h)) {
                h = Number(h);
              } else {
                h = eval(h);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            h = 100;
          }
          ({width, height} = size);
          try {
            if (String.any(width)) {
              if (isFinite(width)) {
                w = Number(width);
              } else {
                w = eval(width);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            w = 100;
          }
          try {
            if (String.any(height)) {
              if (isFinite(height)) {
                h = Number(height);
              } else {
                h = eval(height);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            h = 100;
          }
          s = KDCore.Sprite.FromBitmap(w, h);
          s.textSettingsPosition = pluginParams.alignment;
          margins = pluginParams.margins;
          if (margins != null) {
            s.move(margins.x, margins.y);
          }
          s.applyFontParam(pluginParams.font);
          s.applyOutlineParam(pluginParams.outline);
          if (!String.isNullOrEmpty(pluginParams.textColor)) {
            s.b().textColor = pluginParams.textColor;
          }
          if (pluginParams.visible != null) {
            s.visible = pluginParams.visible;
          }
          return s;
        } catch (error) {
          e = error;
          console.warn('Something wrong with Text Settings!', e);
          return KDCore.Sprite.FromBitmap(60, 30);
        }
      }

    };

    return Sprite;

  }).call(this, Sprite);
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.TimedUpdate = class TimedUpdate {
    constructor(interval, method) {
      this.interval = interval;
      this.method = method;
      this._timer = 0;
      this._once = false;
    }

    setAfter(_repeatsLeft, afterCallback) {
      this._repeatsLeft = _repeatsLeft;
      this.afterCallback = afterCallback;
    }

    update() {
      if (this.interval == null) {
        return;
      }
      if (this._timer++ >= this.interval) {
        this.call();
        this._timer = 0;
        if (this._repeatsLeft != null) {
          this._repeatsLeft -= 1;
          if (this._repeatsLeft <= 0) {
            if (this.afterCallback != null) {
              this.afterCallback();
            }
          }
        }
        if (this._once === true) {
          return this.stop();
        }
      }
    }

    once() {
      return this._once = true;
    }

    onUpdate(method) {
      this.method = method;
    }

    stop() {
      return this.interval = null;
    }

    isAlive() {
      return this.interval != null;
    }

    // * Рандомизировать интервал @interval (-min, +max)
    applyTimeRange(min, max) {
      var value;
      if (!this.isAlive()) {
        return;
      }
      value = KDCore.SDK.rand(min, max);
      return this.interval += value;
    }

    call() {
      var e;
      try {
        if (this.method != null) {
          return this.method();
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.AnimationKeyFrame = class AnimationKeyFrame {
    constructor(startValue, endValue, duration = 1, func = 'linear') {
      this.startValue = startValue;
      this.endValue = endValue;
      this.func = func;
      this._t = 0; // * Timer
      this._d = duration * 60; // * Convert to Frames
      this._c = this.endValue - this.startValue; // * Change
      if (this.func == null) {
        this.func = 'linear';
      }
      return;
    }

    reset() {
      return this._t = 0;
    }

    update() {
      if (this._t < this._d) {
        return this._t += 1;
      }
    }

    isEnd() {
      return this._t >= this._d || this._d <= 0;
    }

    getValue() {
      if (this._d <= 0) {
        return this.endValue;
      } else {
        return this.easingFunc()(this._t, this.startValue, this._c, this._d);
      }
    }

    easingFunc() {
      if ((this.func != null) && (KDCore.EasingFuncs[this.func] != null)) {
        return KDCore.EasingFuncs[this.func];
      } else {
        console.warn("Easing func " + this.func + " not found!");
        return this.linear;
      }
    }

    // * Default one
    linear(t, b, c, d) {
      return c * t / d + b;
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.AnimationKeyLine = class AnimationKeyLine {
    constructor(keyFramesList, totalDuration = 1, func = 'linear') {
      this.totalDuration = totalDuration;
      this.keyFrames = this._parseKeyFrames(keyFramesList, func);
      this.repeatsLeftBase = 0;
      this.repeatsLeft = 0;
      this.keyIndex = 0;
      this._relativeValue = 0;
      this._isStarted = false;
      return;
    }

    setRelativeValue(_relativeValue) {
      this._relativeValue = _relativeValue;
    }

    setRepeatsCount(repeatsLeftBase) {
      this.repeatsLeftBase = repeatsLeftBase;
      return this.repeatsLeft = this.repeatsLeftBase;
    }

    setLoop() {
      return this.setRepeatsCount(-1);
    }

    start(startDelay = 0) {
      this.startDelay = startDelay;
      if (this.startDelay === 0) {
        return this._isStarted = true;
      } else {
        return this._startTimer = this.startDelay * 60;
      }
    }

    pause() {
      this._isStarted = false;
      this._startTimer = null;
    }

    isStarted() {
      return this._isStarted === true;
    }

    complete() {
      this.keyIndex = this.keyFrames.length;
      this.repeatsLeft = 0;
    }

    reset() {
      this.repeatsLeft = this.repeatsLeftBase;
      this._resetKeyframes();
    }

    update() {
      if (this._startTimer != null) {
        this._updateStartTimer();
      }
      if (!this.isStarted()) {
        return;
      }
      if (this.isEnd()) {
        if (this.repeatsLeft === 0) { // * No repeats at all
          return;
        } else if (this.repeatsLeft < 0) { // * Infinite Loop
          this._resetKeyframes();
        } else {
          this.repeatsLeft -= 1;
          this._resetKeyframes();
        }
      }
      this.keyFrames[this.keyIndex].update();
      if (this.keyFrames[this.keyIndex].isEnd()) {
        //console.log("NEXT")
        this.keyIndex++;
      }
    }

    isEnd() {
      return this.keyIndex > this.keyFrames.length - 1;
    }

    getValue() {
      var value;
      if (this.isEnd()) {
        value = this.keyFrames.last().getValue();
      } else {
        value = this.keyFrames[this.keyIndex].getValue();
      }
      return value + this._relativeValue;
    }

    _parseKeyFrames(keyframes, func) {
      var duration, e, endValue, endValues, index, key, keyframesOutput, keys, kf, prevKey, startValue, value;
      try {
        keyframesOutput = [];
        endValues = [];
        keys = [];
        index = 0;
        for (key in keyframes) {
          value = keyframes[key];
          if (endValues.length > 0) {
            startValue = endValues[index - 1];
          } else {
            startValue = 0;
          }
          value = KDCore.Utils.getValueWithDP(value);
          endValue = value;
          if (key === "0") {
            duration = 0;
          } else {
            prevKey = keys[index - 1];
            duration = this._calculateDuration(prevKey, key);
          }
          kf = new KDCore.AnimationKeyFrame(startValue, endValue, duration, func);
          keys[index] = key;
          endValues[index] = value;
          keyframesOutput.push(kf);
          index++;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return keyframesOutput;
    }

    _calculateDuration(rateA, rateB) {
      var d, e, timeA, timeB;
      try {
        rateA = Number(rateA) / 100.0;
        rateB = Number(rateB) / 100.0;
        timeA = this.totalDuration * rateA;
        timeB = this.totalDuration * rateB;
        d = timeB - timeA;
        return d;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    }

    _resetKeyframes() {
      var e, f, i, len, ref, results;
      try {
        this.keyIndex = 0;
        ref = this.keyFrames;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          f = ref[i];
          results.push(f.reset());
        }
        return results;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _updateStartTimer() {
      var e;
      try {
        if (this._startTimer == null) {
          return;
        }
        this._startTimer -= 1;
        if (this._startTimer <= 0) {
          this._isStarted = true;
          return this._startTimer = null;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.AnimationRule = class AnimationRule {
    constructor(animationConfig, obj) {
      var condition, delay, duration, func, keyframes, repeats;
      if (typeof animationConfig === "string") {
        animationConfig = KDCore.UI.Builder.ConvertShortcut(animationConfig);
      }
      this.animationConfig = Object.assign(this.defaultConfig(), animationConfig);
      ({condition} = this.animationConfig);
      if (String.any(condition)) {
        if (eval(condition) === false) {
          return;
        }
      }
      ({keyframes, duration, func, repeats, delay} = this.animationConfig);
      this.prepareKeyFrames(keyframes, obj);
      this.keyLine = new KDCore.AnimationKeyLine(keyframes, duration, func);
      if (repeats == null) {
        repeats = 0;
      }
      this.keyLine.setRepeatsCount(repeats);
      if ((obj != null) && this.animationConfig.field === "_scaleFactor") {
        this.prepareObject(obj);
      }
      if (this.animationConfig.relative === true && (obj != null)) {
        this.keyLine.setRelativeValue(obj[this.animationConfig.field]);
      }
      this.keyLine.start(delay);
      if ((obj != null) && delay <= 0) {
        this.applyAnimation(obj);
      }
      return;
    }

    prepareKeyFrames(keyframes, obj) {
      var key, value;
      for (key in keyframes) {
        value = keyframes[key];
        if (value === "@") {
          if ((obj != null) && (obj[this.animationConfig.field] != null)) {
            keyframes[key] = obj[this.animationConfig.field];
          } else {
            keyframes[key] = 0;
          }
        }
      }
    }

    setEndCallback(onEndCallback) {
      this.onEndCallback = onEndCallback;
    }

    isHaveEndCallback() {
      var e;
      try {
        if (this.animationConfig.repeats !== 0) {
          // * Callback works only for single-shot animations
          return false;
        }
        return this.onEndCallback != null;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    }

    defaultConfig() {
      return {
        field: "opacity",
        duration: 1,
        func: "linear",
        delay: 0,
        repeats: 0,
        relative: false,
        keyframes: {
          "0": 0,
          "100": 255
        },
        condition: null
      };
    }

    update() {
      var e;
      if (this.keyLine == null) {
        return;
      }
      this.keyLine.update();
      if (this.isHaveEndCallback()) {
        if (this.keyLine.isEnd()) {
          try {
            this.onEndCallback();
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
          this.onEndCallback = null;
        }
      }
    }

    applyAnimation(obj) {
      var e;
      try {
        if (obj == null) {
          return;
        }
        if (this.keyLine == null) {
          return;
        }
        return obj[this.animationConfig.field] = this.keyLine.getValue();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    prepareObject(obj) {
      var e;
      try {
        if ((obj != null) && (obj.onBeforeChangeScaleFactor != null)) {
          return obj.onBeforeChangeScaleFactor();
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  
    // * Button (Sprite_XButton)

    //@[AUTO EXTEND]
  //?DEPRECATED
  return KDCore.Button = class Button extends Sprite {
    constructor() {
      super();
      this._mouseIn = false;
      this._touching = false;
      this._slowUpdateActive = false;
      this._localMode = false;
      this._images = [];
      this._checkAlpha = false;
      this._textSprite = null;
      this._textPosition = 0;
      this._override = false; // * TouchClick in game messages not work anymore if TRUE
      this._clickHandlers = [];
      this._manualHided = false;
      this._manualDisabled = false;
      this._condition = null; // * Условие для Visible
      this._condition2 = null; // * Условие для Enable \ Disable
      this._disabled = false;
      this._infoData = null;
      this._isNeedShowText = false;
      return;
    }

    isMouseInButton() {
      return this._mouseIn === true;
    }

    isActive() {
      return this.visible === true;
    }

    activateSlowUpdate() {
      return this._slowUpdateActive = true;
    }

    setLocalMode() {
      this._realX = this.x;
      this._realY = this.y;
      return this._localMode = true;
    }

    setAlphaMode() {
      return this._checkAlpha = true;
    }

    // * above, below
    setTextPosition(position) {
      return this._textPosition = position;
    }

    setHelpText(text, size) {
      return this._createText(text, size);
    }

    setInfoData(data) {
      return this._infoData = data;
    }

    setOverrideMode() {
      return this._override = true;
    }

    isOverride() {
      return this._override === true && this.isActive() && this.touchInButton();
    }

    isDisabled() {
      return this._disabled === true;
    }

    isEnabled() {
      return !this.isDisabled();
    }

    isNeedShowText() {
      return this._isNeedShowText === true;
    }

    addClickHandler(method) {
      return this._clickHandlers.push(method);
    }

    clearClickHandlers() {
      return this._clickHandlers = [];
    }

    isLocalMode() {
      return this._localMode === true;
    }

    setCondition(method) {
      return this._condition = method;
    }

    setConditionForDisable(method) {
      return this._condition2 = method;
    }

    getInfoData() {
      return this._infoData;
    }

    simulateClick() { //?NEW
      return this.applyClickedState();
    }

    simulateClickManual() { //?NEW
      this.simulateClick();
      return setTimeout((() => {
        try {
          return this.applyNormalState();
        } catch (error) {

        }
      }), 50);
    }

    prepare() { //?NEW
      return this.slowUpdate();
    }

    realX() {
      if (this.isLocalMode()) {
        return this._realX;
      } else {
        return this.x;
      }
    }

    realY() {
      if (this.isLocalMode()) {
        return this._realY;
      } else {
        return this.y;
      }
    }

    show() {
      this.visible = true;
      return this._manualHided = false;
    }

    hide() {
      this.visible = false;
      return this._manualHided = true;
    }

    disable() {
      this._disabled = true;
      this._manualDisabled = true;
      this.refreshEnDisState();
      return this._mouseIn = false;
    }

    enable() {
      this._disabled = false;
      this._manualDisabled = false;
      return this.refreshEnDisState();
    }

    update() {
      super.update();
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseClick();
      this.updatePosition();
      if (!this._slowUpdateActive) {
        this.slowUpdate();
      }
      return this.updateComplexTextVisible();
    }

    slowUpdate() {
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseTracking();
      this.updateConditionForVisible();
      return this.updateConditionForEnabling();
    }

    updateMouseTracking() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.cursorInButton()) {
        this._onMouseEnter();
        return this._mouseIn = true;
      } else {
        this._onMouseLeave();
        return this._mouseIn = false;
      }
    }

    // * In MZ TouchInput always have X,Y
    cursorInButton() {
      return this.touchInButton();
    }

    xyInButton(x, y) {
      var inRect, rect, rx, ry;
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
      inRect = rect.contains(x, y);
      if (inRect === true && this._checkAlpha === true) {
        return this._checkAlphaPixel(x - rx, y - ry);
      } else {
        return inRect;
      }
    }

    _realWidth() {
      if (this._hasImage()) {
        return this._mainImage().width;
      } else {
        return this.width;
      }
    }

    _hasImage() {
      return this._mainImage() != null;
    }

    _mainImage() {
      return this._images[0];
    }

    _realHeight() {
      if (this._hasImage()) {
        return this._mainImage().height;
      } else {
        return this.height;
      }
    }

    _checkAlphaPixel(x, y) {
      var pixel;
      pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
      return pixel >= 200;
    }

    _onMouseEnter() {
      if (this._mouseIn === true) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyCoverState();
      }
      this._showText();
      if (this.getInfoData() != null) {
        return this._startComplexTimer();
      }
    }

    _onMouseLeave() {
      if (this._mouseIn === false) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyNormalState();
      }
      this._hideText();
      return this._stopComplexTimer();
    }

    _showText() {
      if (this._textSprite == null) {
        return;
      }
      this._updateTextPosition();
      return this._textSprite.visible = true;
    }

    _hideText() {
      if (this._textSprite == null) {
        return;
      }
      return this._textSprite.visible = false;
    }

    _startComplexTimer() {
      this._stopComplexTimer();
      return this._cTimer = setTimeout((() => {
        if (this._mouseIn === true) {
          return this._isNeedShowText = true;
        }
      }), 1000);
    }

    _stopComplexTimer() {
      if (this._cTimer != null) {
        clearTimeout(this._cTimer);
      }
      return this._isNeedShowText = false;
    }

    updateMouseClick() {
      if (!this.isActive()) {
        this._unTouch();
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.touchInButton()) {
        this._touching = true;
        this.applyClickedState();
      }
      if (this._touching === true) {
        if (TouchInput.isReleased() || !this.touchInButton()) {
          this._unTouch();
          if (TouchInput.isReleased()) {
            return this.callClickHandler();
          }
        }
      }
    }

    _unTouch() {
      this._touching = false;
      if (this.touchInButton()) {
        return this.applyCoverState();
      } else {
        return this.applyNormalState();
      }
    }

    touchInButton() {
      return this.xyInButton(TouchInput.x, TouchInput.y);
    }

    callClickHandler() {
      if (this._clickHandlers.length > 0) {
        return this._clickHandlers.forEach(function(method) {
          return method();
        });
      }
    }

    updatePosition() {
      var p;
      if (!this._localMode) {
        return;
      }
      p = new KDCore.Point(this._realX, this._realY);
      return this.move(p.screenX(), p.screenY());
    }

    updateConditionForVisible() {
      var result;
      if (this._condition == null) {
        return;
      }
      if (this._manualHided === true) {
        return;
      }
      try {
        result = this._condition();
        return this.visible = !result;
      } catch (error) {
        console.warn('wrong condition in button');
        return this.visible = true;
      }
    }

    updateConditionForEnabling() {
      if (!this._condition2) {
        return;
      }
      if (this._manualDisabled === true) {
        return;
      }
      try {
        this._disabled = this._condition2();
        return this.refreshEnDisState();
      } catch (error) {
        console.warn('wrong condition in button for enable state');
        return this.disable();
      }
    }

    setButtonImages(img1, img2, img3, img4) {
      if (this._images != null) {
        this._images.forEach(function(img) {
          if (img != null) {
            return img.parent.removeChild(img);
          }
        });
      }
      this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
      this._images.forEach((img) => {
        if (img != null) {
          return this.addChild(img);
        }
      });
      return this.applyNormalState();
    }

    applyNormalState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[0]) != null ? ref.visible = true : void 0;
    }

    refreshImages() {
      return this._images.forEach(function(img) {
        return img != null ? img.visible = false : void 0;
      });
    }

    applyCoverState() {
      this.refreshImages();
      if (this._images[1] != null) {
        return this._images[1].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    applyClickedState() {
      this.refreshImages();
      if (this._images[2] != null) {
        return this._images[2].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    _createText(text, size) {
      var h, w;
      if (this._textSprite) {
        this.removeChild(this._textSprite);
      }
      w = Math.round(((size / 10) + 1) * 5 * text.length);
      h = size + 4;
      this._textSprite = new Sprite(new Bitmap(w, h));
      this._textSprite.bitmap.fontSize = size;
      this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
      this._textSprite.visible = false;
      return this.addChild(this._textSprite);
    }

    _updateTextPosition() {
      var nx, ny;
      if (!this._textSprite) {
        return;
      }
      nx = this._realWidth() / 2 - this._textSprite.width / 2;
      if (this._textPosition === 0) {
        ny = -this._textSprite.height;
      } else {
        ny = this._realHeight() + this._textSprite.height / 2;
      }
      return this._textSprite.move(nx, ny);
    }

    applyDisableState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[3]) != null ? ref.visible = true : void 0;
    }

    refreshEnDisState() {
      if (this.isDisabled()) {
        this.applyDisableState();
        return this._hideText();
      } else {
        if (this._mouseIn === false) {
          return this.applyNormalState();
        }
      }
    }

    //else
    //    do @applyCoverState
    updateComplexTextVisible() {}

    applyScale(mod) {
      var i, img, len, ref;
      ref = this._images;
      for (i = 0, len = ref.length; i < len; i++) {
        img = ref[i];
        if (img != null) {
          img.scale.x = mod;
          img.scale.y = mod;
        }
      }
    }

    static FromSet(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img0, img0);
      return button;
    }

    static FromSetFull(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1, img2, img3;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      img2 = getterFunc(imgName + "_02");
      img3 = getterFunc(imgName + "_03");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img2, img3);
      return button;
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ActorFace;
  //NUI 1.2
  //rev 18.08.24

    //"type": "face"
  Sprite_ActorFace = class Sprite_ActorFace extends KDCore.Sprite {
    constructor(settings) {
      super();
      this.settings = Object.assign({}, this.defaultSettings(), settings);
      this._create();
      this.draw(this.settings.faceName, this.settings.faceIndex);
      this.flipX(this.settings.mirror);
      return;
    }

    isLoaded() {
      return true;
    }

    defaultSettings() {
      return {
        faceName: "",
        faceIndex: 0,
        size: 144,
        mirror: false
      };
    }

    realWidth() {
      if (this.isNotHaveBounds()) {
        return 0;
      }
      return this.settings.size;
    }

    realHeight() {
      if (this.isNotHaveBounds()) {
        return 0;
      }
      return this.settings.size;
    }

    dataBindings() {
      return Object.assign(super.dataBindings(), {
        size: function(v) {
          return this.setSize(v);
        },
        faceName: function(v) {
          return this.draw(v, this.settings.faceIndex);
        },
        faceIndex: function(v) {
          return this.draw(this.settings.faceName, v);
        },
        mirror: function(v) {
          return this.flipX(v);
        }
      });
    }

    setSize(size = 144) {
      var e;
      try {
        size = this._getValueByStr(size, 'width', this);
        if (size != null) {
          this.settings.size = size;
        }
        return this._onResize();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    draw(faceName = "", faceIndex = 0) {
      var e;
      try {
        this.settings.faceName = faceName;
        this.settings.faceIndex = faceIndex;
        if (faceName === "") {
          this.image.bitmap.clear();
          return;
        }
        return this._drawFaceImage(faceName);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    flipX(isMirror) {
      var e;
      try {
        if (isMirror) {
          this.image.scale.x = -1;
          return this.image.x = this.settings.size;
        } else {
          this.image.scale.x = 1;
          return this.image.x = 0;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _create() {
      var e;
      try {
        this.image = new KDCore.Sprite(new Bitmap(1, 1));
        return this.addChild(this.image);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _drawFaceImage(faceName) {
      var e;
      try {
        this._srcBitmap = ImageManager.loadFace(faceName);
        return this._srcBitmap.addLoadListener(this._onBitmapLoaded.bind(this));
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _onBitmapLoaded() {
      var e;
      try {
        this._onResize();
        this._applyRequiredData();
        return this._executeLoadListeners();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _onResize() {
      var b, e, fh, fw, size, sx, sy;
      try {
        this.image.bitmap = new Bitmap(this.realWidth(), this.realHeight());
        if (this._srcBitmap == null) {
          return;
        }
        b = this._srcBitmap;
        if (KDCore.isMZ()) {
          fw = ImageManager.faceWidth;
          fh = ImageManager.faceHeight;
        } else {
          fw = Window_Base._faceWidth;
          fh = Window_Base._faceHeight;
        }
        size = this.settings.size;
        sx = (this.settings.faceIndex % 4) * fw;
        sy = Math.floor(this.settings.faceIndex / 4) * fh;
        this.image.bitmap.blt(b, sx, sy, fw, fh, 0, 0, size, size);
        this.setFrame(0, 0, size, size);
        return this.flipX(this.settings.mirror);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
  return KDCore.Sprite_ActorFace = Sprite_ActorFace;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_BaseCircle;
  //NUI 1.0
  //rev 28.04.24

    //"type": "circle"
  Sprite_BaseCircle = class Sprite_BaseCircle extends KDCore.Sprite {
    constructor(settings) {
      super();
      this.settings = Object.assign({}, this.defaultSettings(), settings);
      this._create();
      this._applySettings();
      this._onResize();
      return;
    }

    defaultSettings() {
      return {
        width: 100,
        height: 100,
        fillGradient: null, // { gradient stops }
        gradientStart: {
          x: 0,
          y: 100,
          r: 30
        },
        gradientEnd: {
          x: 100,
          y: 100,
          r: 70
        },
        fillColor: 0xffffff,
        fillAlpha: 1,
        strokeWidth: 4,
        strokeColor: 0x000000,
        strokeAlpha: 1
      };
    }

    defaultGradientSettings() {
      return {
        "0": "#9ff",
        "1": "#033"
      };
    }

    isHaveGradient() {
      return false; //@settings.fillGradient?
    }

    dataBindings() {
      return Object.assign(super.dataBindings(), {
        width: function(v) {
          if (v != null) {
            return this.setSize(v, this.settings.height);
          }
        },
        height: function(v) {
          if (v != null) {
            return this.setSize(this.settings.width, v);
          }
        },
        size: function(v) {
          if (v != null) {
            return this.setSize(v.width, v.height);
          }
        },
        stroke: function(v) {
          if (v != null) {
            return this.setStroke(v.width, v.color, v.alpha);
          }
        },
        fill: function(v) {
          if (v != null) {
            return this.setFill(v.color, v.alpha);
          }
        }
      });
    }

    setFill(color = "#FFF", alpha = 1) {
      var e;
      try {
        this.settings.fillColor = color;
        this.settings.fillAlpha = alpha;
        this.settings.fillGradient = null;
        return this._applySettings();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    setStroke(color = "#FFF", width = 0, alpha = 1) {
      var e;
      try {
        this.settings.strokeColor = color;
        this.settings.strokeAlpha = alpha;
        this.settings.strokeWidth = width;
        return this._applySettings();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    setSize(width = 100, height = 100) {
      var e, h, w;
      try {
        w = this._getValueByStr(width, 'width', this);
        h = this._getValueByStr(height, 'height', this);
        if (w != null) {
          this.settings.width = w;
        }
        if (h != null) {
          this.settings.height = h;
        }
        this._applySettings();
        return this._onResize();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _create() {
      var e;
      try {
        this.graphics = new PIXI.Graphics();
        return this.addChild(this.graphics);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _applySettings() {
      var e, gradientSettings;
      try {
        if (this.graphics == null) {
          return;
        }
        this.graphics.clear();
        if (this.settings.fillGradient != null) {
          gradientSettings = Object.assign(this.defaultGradientSettings(), this.settings.fillGradient);
        }
        this._applyGradientTexture(gradientSettings);
        return this._drawBaseCircle();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _applyGradientTexture(fillGradient) {
      var e;
      try {

      } catch (error) {
        /*{ width, height } = @settings
        c = document.createElement("canvas")
        ctx = c.getContext("2d")*/
        /*grd = ctx.createRadialGradient(
            @settings.gradientStart.x,
            @settings.gradientStart.y,
            @settings.gradientStart.r,
            @settings.gradientEnd.x,
            @settings.gradientEnd.y,
            @settings.gradientEnd.r
        )*/
        //grd = ctx.createRadialGradient(110, 90, 30, 100, 100, 70)
        /*for key, value of fillGradient
        try
            grd.addColorStop(Number(key), value)
        catch e
            KDCore.warning e*/
        /*grd.addColorStop(0, "pink")
        grd.addColorStop(0.9, "white")
        grd.addColorStop(1, "green")

        ctx.fillStyle = grd
        ctx.fillRect(0, 0, 400, 400)
        texture = new PIXI.Texture.from(c)
        @graphics.beginTextureFill(texture)*/
        e = error;
        return KDCore.warning(e);
      }
    }

    _drawBaseCircle() {
      var colorData, d, e, fillAlpha, fillColor, height, strokeAlpha, strokeColor, strokeColorData, width;
      try {
        ({width, height} = this.settings);
        ({fillColor, fillAlpha} = this.settings);
        colorData = this._buildColorData(fillColor, fillAlpha);
        if (this.settings.strokeWidth > 0) {
          ({strokeColor, strokeAlpha} = this.settings);
          strokeColorData = this._buildColorData(strokeColor, strokeAlpha);
          d = this.settings.strokeWidth;
          // * Base Fill
          this._drawElipse(0, 0, width, height, colorData);
          // * Stroke
          return this._drawStroke(0, 0, width, height, d, strokeColorData);
        } else {
          // * Base Fill only
          return this._drawElipse(0, 0, width, height, colorData);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _buildColorData(c = 0xfff, a = 1) {
      var e;
      try {
        if (typeof c === 'string') {
          c = KDCore.Utils.string2hex(c);
        }
        return [c, a];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [0xfff, 1];
      }
    }

    _drawElipse(x, y, w, h, colorData) {
      var e, g;
      try {
        if (this.graphics == null) {
          return;
        }
        g = this.graphics;
        if (!this.isHaveGradient()) {
          g.beginFill(...colorData);
        }
        g.drawEllipse(x, y, w / 2, h / 2);
        if (!this.isHaveGradient()) {
          return g.endFill();
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _drawStroke(x, y, w, h, d, colorData) {
      var e, g;
      try {
        if (this.graphics == null) {
          return;
        }
        g = this.graphics;
        g.lineStyle(d, ...colorData);
        return g.drawEllipse(x, y, w / 2, h / 2);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _onResize() {
      var e;
      try {
        this.width = this.settings.width;
        this.height = this.settings.height;
        // * Круг (элипс) рисуется от центра, что не удобно
        // при расчёте координат, поэтому сдвигаем в левый вверхний угол
        this.graphics.x = this.settings.width * 0.5;
        return this.graphics.y = this.settings.height * 0.5;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
  return KDCore.Sprite_BaseCircle = Sprite_BaseCircle;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_BaseRect;
  //NUI 1.0
  //rev 28.04.24

    //"type": "rect"
  Sprite_BaseRect = class Sprite_BaseRect extends KDCore.Sprite {
    constructor(settings) {
      super();
      this.settings = Object.assign({}, this.defaultSettings(), settings);
      this._create();
      this._applySettings();
      this._onResize();
      return;
    }

    defaultSettings() {
      return {
        width: 100,
        height: 100,
        corners: 0, // {  topLeft, topRight, bottomRight, bottomLeft }
        fillGradient: null, // { gradient stops }
        gradientStart: {
          x: 0,
          y: 0
        },
        gradientEnd: {
          x: 0,
          y: 100
        },
        fillColor: 0xffffff,
        fillAlpha: 1,
        strokeWidth: 4,
        strokeColor: 0x000000,
        strokeAlpha: 1
      };
    }

    defaultGradientSettings() {
      return {
        "0": "#9ff",
        "1": "#033"
      };
    }

    defaultCornersSettings() {
      return {
        topLeft: 0,
        topRight: 0,
        bottomRight: 0,
        bottomLeft: 0
      };
    }

    isHaveGradient() {
      return this.settings.fillGradient != null;
    }

    dataBindings() {
      return Object.assign(super.dataBindings(), {
        width: function(v) {
          if (v != null) {
            return this.setSize(v, this.settings.height);
          }
        },
        height: function(v) {
          if (v != null) {
            return this.setSize(this.settings.width, v);
          }
        },
        size: function(v) {
          if (v != null) {
            return this.setSize(v.width, v.height);
          }
        },
        stroke: function(v) {
          if (v != null) {
            return this.setStroke(v.width, v.color, v.alpha);
          }
        },
        fill: function(v) {
          if (v != null) {
            return this.setFill(v.color, v.alpha);
          }
        },
        gradientStart: function(v) {
          if (v != null) {
            return this.setGradientStartEnd(v, this.settings.gradientEnd);
          }
        },
        gradientEnd: function(v) {
          if (v != null) {
            return this.setGradientStartEnd(this.settings.gradientStart, v);
          }
        }
      });
    }

    setGradientStartEnd(start, end) {
      var e;
      try {
        if (start != null) {
          start.x = this._getValueByStr(start.x, 'width', this);
          start.y = this._getValueByStr(start.y, 'height', this);
        }
        if (end != null) {
          end.x = this._getValueByStr(end.x, 'width', this);
          end.y = this._getValueByStr(end.y, 'height', this);
        }
        if (start != null) {
          this.settings.gradientStart = start;
        }
        if (end != null) {
          this.settings.gradientEnd = end;
        }
        return this._applySettings();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    setFill(color = "#FFF", alpha = 1) {
      var e;
      try {
        this.settings.fillColor = color;
        this.settings.fillAlpha = alpha;
        this.settings.fillGradient = null;
        return this._applySettings();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    setStroke(color = "#FFF", width = 0, alpha = 1) {
      var e;
      try {
        this.settings.strokeColor = color;
        this.settings.strokeAlpha = alpha;
        this.settings.strokeWidth = width;
        return this._applySettings();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    setSize(width = 100, height = 100) {
      var e, h, w;
      try {
        w = this._getValueByStr(width, 'width', this);
        h = this._getValueByStr(height, 'height', this);
        if (w != null) {
          this.settings.width = w;
        }
        if (h != null) {
          this.settings.height = h;
        }
        this._applySettings();
        return this._onResize();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _create() {
      var e;
      try {
        this.graphics = new PIXI.Graphics();
        return this.addChild(this.graphics);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _applySettings() {
      var cornersSettings, e, gradientSettings;
      try {
        if (this.graphics == null) {
          return;
        }
        this.graphics.clear();
        if (this.settings.fillGradient != null) {
          gradientSettings = Object.assign(this.defaultGradientSettings(), this.settings.fillGradient);
        }
        this._applyGradientTexture(gradientSettings);
        if (typeof this.settings.corners === "number") {
          return this._drawBaseRoundedRect();
        } else if (this.settings.corners != null) {
          cornersSettings = Object.assign(this.defaultCornersSettings(), this.settings.corners);
          return this._drawComplexRoundedRect(cornersSettings);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _applyGradientTexture(fillGradient) {
      var c, convertedValue, ctx, e, grd, height, key, texture, value, width;
      try {
        if (KDCore.isMV()) {
          return;
        }
        ({width, height} = this.settings);
        c = document.createElement("canvas");
        ctx = c.getContext("2d");
        grd = ctx.createLinearGradient(this.settings.gradientStart.x, this.settings.gradientStart.y, this.settings.gradientEnd.x, this.settings.gradientEnd.y);
        for (key in fillGradient) {
          value = fillGradient[key];
          try {
            convertedValue = this._convertGradientStopColor(value);
            grd.addColorStop(Number(key), convertedValue);
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
        texture = new PIXI.Texture.from(c);
        return this.graphics.beginTextureFill(texture);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _convertGradientStopColor(color) {
      var alpha, c, e, parts;
      try {
        if (color == null) {
          return "#FFF";
        }
        if (!String.any(color)) {
          return "#FFF";
        }
        if (color.contains("%")) {
          parts = color.split("%");
          color = parts[0];
          alpha = Number(parts[1]);
          c = KDCore.Color.FromHex(color);
          c = c.reAlpha(alpha * 255);
          return c.CSS;
        } else {
          return color;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return "#FFF";
      }
    }

    _drawBaseRoundedRect() {
      var colorData, corners, d, e, fillAlpha, fillColor, height, strokeAlpha, strokeColor, strokeColorData, width;
      try {
        ({width, height, corners} = this.settings);
        ({fillColor, fillAlpha} = this.settings);
        colorData = this._buildColorData(fillColor, fillAlpha);
        if (this.settings.strokeWidth > 0) {
          ({strokeColor, strokeAlpha} = this.settings);
          strokeColorData = this._buildColorData(strokeColor, strokeAlpha);
          d = this.settings.strokeWidth;
          // * Base Fill
          this._drawRect(0, 0, width, height, corners, colorData);
          // * Stroke
          return this._drawStroke(-d / 2, -d / 2, width + d / 2, height + d / 2, corners, d, strokeColorData);
        } else {
          // * Base Fill only
          return this._drawRect(0, 0, width, height, corners, colorData);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _buildColorData(c = 0xfff, a = 1) {
      var e;
      try {
        if (typeof c === 'string') {
          c = KDCore.Utils.string2hex(c);
        }
        return [c, a];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [0xfff, 1];
      }
    }

    _drawRect(x, y, w, h, r, colorData) {
      var e, g;
      try {
        if (this.graphics == null) {
          return;
        }
        g = this.graphics;
        if (!this.isHaveGradient()) {
          g.beginFill(...colorData);
        }
        if (r > 0) {
          g.drawRoundedRect(x, y, w, h, r);
        } else {
          g.drawRect(x, y, w, h);
        }
        if (!this.isHaveGradient()) {
          return g.endFill();
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _drawStroke(x, y, w, h, r, d, colorData) {
      var e, g;
      try {
        if (this.graphics == null) {
          return;
        }
        g = this.graphics;
        g.lineStyle(d, ...colorData);
        if (r > 0) {
          return g.drawRoundedRect(x, y, w, h, r);
        } else {
          return g.drawRect(x, y, w, h);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _drawComplexRoundedRect(cornersSettings) {
      var bottomLeft, bottomRight, colorData, d, e, fillAlpha, fillColor, height, strokeAlpha, strokeColor, strokeColorData, topLeft, topRight, width;
      try {
        if (cornersSettings == null) {
          return;
        }
        ({width, height} = this.settings);
        ({fillColor, fillAlpha} = this.settings);
        colorData = this._buildColorData(fillColor, fillAlpha);
        ({topLeft, topRight, bottomRight, bottomLeft} = cornersSettings);
        if (this.settings.strokeWidth > 0) {
          ({strokeColor, strokeAlpha} = this.settings);
          strokeColorData = this._buildColorData(strokeColor, strokeAlpha);
          d = this.settings.strokeWidth;
          this._drawComplexRect(0, 0, width, height, colorData, topLeft, topRight, bottomRight, bottomLeft);
          return this._drawComplexStroke(-d / 2, -d / 2, width + (d / 2), height + (d / 2), strokeColorData, d, topLeft, topRight, bottomRight, bottomLeft);
        } else {
          return this._drawComplexRect(0, 0, width, height, colorData, topLeft, topRight, bottomRight, bottomLeft);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _drawComplexRect(x, y, width, height, colorData, topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius) {
      var e;
      try {
        if (!this.isHaveGradient()) {
          this.graphics.beginFill(...colorData);
        }
        // Starting from the top left corner.
        this.graphics.moveTo(x + topLeftRadius, y);
        // Drawing the top line with top right corner.
        this.graphics.lineTo(x + width - topRightRadius, y);
        if (topRightRadius > 0) {
          this.graphics.quadraticCurveTo(x + width, y, x + width, y + topRightRadius);
        }
        // Drawing the right line with bottom right corner.
        this.graphics.lineTo(x + width, y + height - bottomRightRadius);
        if (bottomRightRadius > 0) {
          this.graphics.quadraticCurveTo(x + width, y + height, x + width - bottomRightRadius, y + height);
        }
        // Drawing the bottom line with bottom left corner.
        this.graphics.lineTo(x + bottomLeftRadius, y + height);
        if (bottomLeftRadius > 0) {
          this.graphics.quadraticCurveTo(x, y + height, x, y + height - bottomLeftRadius);
        }
        // Drawing the left line with top left corner and closing the shape.
        this.graphics.lineTo(x, y + topLeftRadius);
        if (topLeftRadius > 0) {
          this.graphics.quadraticCurveTo(x, y, x + topLeftRadius, y);
        }
        if (!this.isHaveGradient()) {
          return this.graphics.endFill();
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _drawComplexStroke(x, y, width, height, colorData, d, topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius) {
      var e, graphics;
      try {
        graphics = this.graphics;
        graphics.lineStyle(d, ...colorData);
        // Starting from the top left corner.
        graphics.moveTo(x + topLeftRadius, y);
        // Drawing the top line with top right corner.
        graphics.lineTo(x + width - topRightRadius, y);
        if (topRightRadius > 0) {
          graphics.quadraticCurveTo(x + width, y, x + width, y + topRightRadius);
        }
        // Drawing the right line with bottom right corner.
        graphics.lineTo(x + width, y + height - bottomRightRadius);
        if (bottomRightRadius > 0) {
          graphics.quadraticCurveTo(x + width, y + height, x + width - bottomRightRadius, y + height);
        }
        // Drawing the bottom line with bottom left corner.
        graphics.lineTo(x + bottomLeftRadius, y + height);
        if (bottomLeftRadius > 0) {
          graphics.quadraticCurveTo(x, y + height, x, y + height - bottomLeftRadius);
        }
        // Drawing the left line with top left corner and closing the shape.
        graphics.lineTo(x, y + topLeftRadius);
        if (topLeftRadius > 0) {
          graphics.quadraticCurveTo(x, y, x + topLeftRadius, y);
        }
        return graphics.closePath();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _onResize() {
      var e;
      try {
        this.width = this.settings.width;
        return this.height = this.settings.height;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
  return KDCore.Sprite_BaseRect = Sprite_BaseRect;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroup;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)

    //rev 07.10.21
  Sprite_ButtonsGroup = class Sprite_ButtonsGroup extends KDCore.Sprite {
    // buttonsArray = [
    //       {image: NAME, position: [X,Y]}, ...
    //    ]
    constructor(buttonsArray, activeIndex, clickCallback) {
      var button, i, len;
      super();
      this.clickCallback = clickCallback;
      this._buttons = [];
      for (i = 0, len = buttonsArray.length; i < len; i++) {
        button = buttonsArray[i];
        this._createButton(button);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroup.prototype;
    _._createButton = function({image, position}) {
      var btn, index, method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      index = this._buttons.length;
      btn = new KDCore.ButtonM(image, true, "Alpha");
      btn.move(position);
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this._buttons.push(btn);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroup = Sprite_ButtonsGroup;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroupHandler;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)
  // * В отличии от Sprite_ButtonsGroup, принимает массив
  // * уже созданных кнопок

    //rev 10.07.22
  Sprite_ButtonsGroupHandler = class Sprite_ButtonsGroupHandler extends KDCore.Sprite {
    // _buttons = [Button object with enable, disable, isEnable, addClickHandler methods]
    constructor(_buttons, clickCallback, activeIndex = 0) {
      var button, i, index, len, ref;
      super();
      this._buttons = _buttons;
      this.clickCallback = clickCallback;
      ref = this._buttons;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        button = ref[index];
        this._processButton(button, index);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroupHandler.prototype;
    _._processButton = function(btn, index) {
      var method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroupHandler = Sprite_ButtonsGroupHandler;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_Gauge;
  //NUI 1.1
  //rev 16.06.24

    //"type": "gauge"
  Sprite_Gauge = class Sprite_Gauge extends KDCore.Sprite {
    constructor(settings) {
      super();
      this.settings = Object.assign({}, this.defaultSettings(), settings);
      this._loaded = false;
      this._lastValue = 1;
      this._gaugeBaseLayer = new KDCore.Sprite();
      this.add(this._gaugeBaseLayer);
      this._applySettings();
      return;
    }

    defaultSettings() {
      return {
        fillMode: "color", //image, plane, color
        fillColor: "#ffffff",
        fillOpacity: 255,
        imageName: "", // * for fill, if fillMode is image, for plane if fillMode is plane
        folderName: "pictures",
        margins: 2, // * For plane image
        width: "auto",
        height: "auto",
        mask: "",
        backColor: "#000000",
        backImage: "",
        backOpacity: 255,
        vertical: false
      };
    }

    isLoaded() {
      var e;
      try {
        return this._loaded === true;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    }

    realWidth() {
      var e;
      try {
        if (this.isNotHaveBounds()) {
          return 0;
        }
        if (this.settings.width !== "auto") {
          return this.settings.width;
        } else if (this._gaugeSpr != null) {
          return this._gaugeSpr.realWidth(); //TODO: Gauge Modes
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return this.width;
    }

    realHeight() {
      var e;
      try {
        if (this.isNotHaveBounds()) {
          return 0;
        }
        if (this.settings.height !== "auto") {
          return this.settings.height;
        } else if (this._gaugeSpr != null) {
          return this._gaugeSpr.realHeight(); //TODO: Gauge Modes
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return this.height;
    }

    dataBindings() {
      return Object.assign(super.dataBindings(), {
        width: function(v) {
          if (v != null) {
            return this.setSize(v, this.settings.height);
          }
        },
        height: function(v) {
          if (v != null) {
            return this.setSize(this.settings.width, v);
          }
        },
        size: function(v) {
          if (v != null) {
            return this.setSize(v.width, v.height);
          }
        },
        rate: function(v) {
          if (v != null) {
            return this.draw(v);
          }
        },
        fillImage: function(v) {
          if (v != null) {
            return this.setFillImage(v);
          }
        },
        fillColor: function(v) {
          if (v != null) {
            return this.setFillColor(v);
          }
        },
        fillOpacity: function(v) {
          if (v != null) {
            return this.setFillOpacity(v);
          }
        }
      });
    }

    //TODO:!
    //backImage: (v) ->
    //backColor: (v) ->
    //backOpacity: (v) ->
    draw(percent = 1) {
      var e;
      try {
        if (!this.isLoaded()) {
          this._requireFunc('draw', arguments);
          return;
        }
        this._lastValue = percent;
        return this._drawGauge(percent);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    setFillOpacity(opacity) {
      var e, ref;
      try {
        this.settings.fillOpacity = opacity;
        return (ref = this.fillLayer) != null ? ref.opacity = opacity : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    setFillColor(color) {
      var e;
      try {
        this.settings.fillColor = color;
        if (this.fillColorBitmap != null) {
          this._createColorGaugeFillColorBitmap();
          return this._drawGauge(this._lastValue);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    setFillImage(imageName) {
      var e;
      try {

      } catch (error) {
        //TODO:
        e = error;
        return KDCore.warning(e);
      }
    }

    setSize(width = "auto", height = "auto") {
      var e;
      try {
        if (width !== "auto") {
          width = this._getValueByStr(width, 'width', this);
        }
        if (height !== "auto") {
          height = this._getValueByStr(height, 'height', this);
        }
        if (width != null) {
          this.settings.width = width;
        }
        if (height != null) {
          this.settings.height = height;
        }
        return this._applySettings();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _applySettings() {
      var e;
      try {
        this._loaded = false;
        this._destroyExistGauge();
        this._createGaugeFromSettings();
        return this.draw(this._lastValue);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _destroyExistGauge() {
      var e;
      try {
        if (this._gaugeSpr == null) {
          return;
        }
        this._gaugeSpr.removeFromParent();
        return this._gaugeSpr = null;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _createGaugeFromSettings() {
      var e;
      try {
        this._gaugeSpr = new KDCore.Sprite();
        this._gaugeBaseLayer.add(this._gaugeSpr);
        switch (this.settings.fillMode) {
          case "image":
            return this._createImageGauge();
          case "plane":
            return this._createPlaneGauge();
          case "color":
            return this._createColorGauge();
          default:
            return console.warn("Unknown Gauge fillMode: " + this.settings.fillMode);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _createImageGauge() {
      var e;
      try {
        this._gaugeSourceImage = new KDCore.Sprite_Image({
          imageName: this.settings.imageName,
          folderName: this.settings.folderName,
          width: this.settings.width,
          height: this.settings.height
        });
        return this._gaugeSourceImage.addLoadListener(this._onGaugeFillImageLoaded.bind(this));
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _onGaugeFillImageLoaded() {
      var e;
      try {
        this._addBackground(this._gaugeSourceImage.realWidth(), this._gaugeSourceImage.realHeight());
        this.fillLayer = KDCore.Sprite.FromBitmap(this._gaugeSourceImage.realWidth(), this._gaugeSourceImage.realHeight());
        this.fillLayer.opacity = this.settings.fillOpacity;
        this._gaugeSpr.add(this.fillLayer);
        this._addMask();
        return this._onGaugeLoadedAndReady();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _onGaugeLoadedAndReady() {
      var e;
      try {
        this._loaded = true;
        this.width = this.realWidth();
        this.height = this.realHeight();
        this._applyRequiredData();
        return this._executeLoadListeners();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _createPlaneGauge() {
      var e;
      try {
        if (this.settings.width === "auto") {
          // * Нельзя создать Plane Gauge с auto размером, поэтому задаём стандартные значения
          this.settings.width = 80;
        }
        if (this.settings.height === "auto") {
          this.settings.height = 20;
        }
        this._addBackground(this.settings.width, this.settings.height);
        this.fillLayer = new KDCore.Sprite_Plane({
          imageName: this.settings.imageName,
          folderName: this.settings.folderName,
          width: this.settings.width,
          height: this.settings.height,
          margins: this.settings.margins
        });
        this.fillLayer.opacity = this.settings.fillOpacity;
        this._gaugeSpr.add(this.fillLayer);
        this._addMask();
        return this._onGaugeLoadedAndReady();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _createColorGauge() {
      var e;
      try {
        if (this.settings.width === "auto") {
          // * Нельзя создать цветную Gauge с auto размером, поэтому задаём стандартные значения
          this.settings.width = 80;
        }
        if (this.settings.height === "auto") {
          this.settings.height = 20;
        }
        this._addBackground(this.settings.width, this.settings.height);
        this.fillLayer = KDCore.Sprite.FromBitmap(this.settings.width, this.settings.height);
        this.fillLayer.opacity = this.settings.fillOpacity;
        this._createColorGaugeFillColorBitmap();
        this._gaugeSpr.add(this.fillLayer);
        this._addMask();
        return this._onGaugeLoadedAndReady();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _createColorGaugeFillColorBitmap() {
      var e;
      try {
        this.fillColorBitmap = new Bitmap(this.settings.width, this.settings.height);
        return this.fillColorBitmap.fillAll(this.settings.fillColor);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _addBackground(width, height) {
      var background, e;
      try {
        if (this._gaugeSpr == null) {
          return;
        }
        background = null;
        if (String.any(this.settings.backImage)) {
          background = this._createGaugeBackgroundImage();
        } else if (String.any(this.settings.backColor)) {
          background = this._createGaugeBackgroundColor(width, height, this.settings.backColor);
        }
        if (background != null) {
          if (this.settings.backOpacity != null) {
            background.opacity = this.settings.backOpacity;
          }
          return this._gaugeSpr.add(background);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _addMask() {
      var e, gaugeMask;
      try {
        if (this._gaugeSpr == null) {
          return;
        }
        if (String.isNullOrEmpty(this.settings.mask)) {
          return;
        }
        gaugeMask = new KDCore.Sprite_Image({
          imageName: this.settings.mask,
          folderName: this.settings.folderName,
          width: this.settings.width,
          height: this.settings.height
        });
        this._gaugeSpr.mask = gaugeMask.image;
        this._gaugeSpr.add(gaugeMask);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        this._gaugeSpr.mask = null;
      }
    }

    _createGaugeBackgroundColor(width, height, color) {
      var background, e;
      try {
        background = KDCore.Sprite.FromBitmap(width, height);
        background.b().fillAll(color);
        return background;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return new KDCore.Sprite();
      }
    }

    _createGaugeBackgroundImage() {
      var e;
      try {
        return new KDCore.Sprite_Image({
          imageName: this.settings.backImage,
          folderName: this.settings.folderName,
          width: this.settings.width,
          height: this.settings.height
        });
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return new KDCore.Sprite();
      }
    }

    _drawGauge(percent) {
      var e;
      try {
        if (this.fillLayer == null) {
          return;
        }
        // * See COE, Fill Indicator
        //if @settings.vertical is true
        //TODO: VERTICAL
        //else
        return this._drawHorizontal(percent);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _drawHorizontal(percent) {
      var e;
      try {
        switch (this.settings.fillMode) {
          case "image":
            return this._drawImageGauge(percent);
          case "plane":
            return this._drawPlaneGauge(percent);
          case "color":
            return this._drawColorGauge(percent);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _drawImageGauge(percent) {
      var e, fillBitmap;
      try {
        this.fillLayer.clear();
        fillBitmap = this._gaugeSourceImage.image.bitmap;
        return this._drawGaugeBitmapBased(percent, fillBitmap);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _drawGaugeBitmapBased(percent, fillBitmap) {
      var e, h, w;
      try {
        w = this.realWidth() * percent;
        h = this.realHeight();
        return this.fillLayer.b().blt(fillBitmap, 0, 0, w, h, 0, 0);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _drawColorGauge(percent) {
      var e, fillBitmap;
      try {
        this.fillLayer.clear();
        fillBitmap = this.fillColorBitmap;
        return this._drawGaugeBitmapBased(percent, fillBitmap);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _drawPlaneGauge(percent) {
      var e, h, w;
      try {
        w = this.realWidth() * percent;
        h = this.realHeight();
        return this.fillLayer.setSize(w, h);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
  return KDCore.Sprite_Gauge = Sprite_Gauge;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_Group;
  //NUI 1.0
  //rev 02.08.24
  Sprite_Group = class Sprite_Group extends KDCore.Sprite {
    constructor(settings) {
      super();
      this.settings = Object.assign({}, this.defaultSettings(), settings);
      if (this.settings.horizontalNavigation === true) {
        this.pIsVerticalKeyboardNavigation = function() {
          return false;
        };
      }
      if (this.settings.freeNagivation === true) {
        this.pIsFreeKeyboardNavigation = function() {
          return true;
        };
      }
      this._applySettings();
      this._onResize();
      return;
    }

    update() {
      var e;
      super.update();
      try {
        if (this._isNeedWaitLoadingChild === true) {
          //console.log("REFRESH BY LOAD")
          return this.refreshBindings(this._dataObjectRef, true);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    refreshBindings(dataObject, recursive) {
      var c, i, len, ref;
      super.refreshBindings(...arguments);
      ref = this.children;
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        if ((c.isLoaded != null) && !c.isLoaded()) {
          this._startWaitLoading(dataObject);
          return;
        }
      }
      this._isNeedWaitLoadingChild = false;
    }

    _startWaitLoading(_dataObjectRef) {
      var e;
      this._dataObjectRef = _dataObjectRef;
      try {
        return this._isNeedWaitLoadingChild = true;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    defaultSettings() {
      return {
        keyboardHandling: false,
        horizontalNavigation: false,
        freeNagivation: false,
        width: "auto",
        height: "auto"
      };
    }

    dataBindings() {
      return Object.assign(super.dataBindings(), {
        width: function(v) {
          if (v != null) {
            return this.setSize(v, this.settings.height);
          }
        },
        height: function(v) {
          if (v != null) {
            return this.setSize(this.settings.width, v);
          }
        },
        size: function(v) {
          if (v != null) {
            return this.setSize(v.width, v.height);
          }
        }
      });
    }

    setSize(width = "auto", height = "auto") {
      var e;
      try {
        if (width !== "auto") {
          width = this._getValueByStr(width, 'width', this);
        }
        if (height !== "auto") {
          height = this._getValueByStr(height, 'height', this);
        }
        if (width != null) {
          this.settings.width = width;
        }
        if (height != null) {
          this.settings.height = height;
        }
        return this._onResize();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    realWidth() {
      var e;
      try {
        if (this.isNotHaveBounds()) {
          return 0;
        }
        if (this.settings.width === "auto") {
          return this._calculateMax("x", "width");
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return this.settings.width;
    }

    realHeight() {
      var e;
      try {
        if (this.isNotHaveBounds()) {
          return 0;
        }
        if (this.settings.height === "auto") {
          return this._calculateMax("y", "height");
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return this.settings.height;
    }

    _calculateMax(a, b) {
      var child, e, i, len, ref, size, value;
      try {
        value = 0;
        ref = this.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          size = child[a] + KDCore.Utils.getRealSpriteSize(b, child);
          if (size > value) {
            value = size;
          }
        }
        if (value < 0) {
          value = 0;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return 0;
      }
      return value;
    }

    _applySettings() {
      var e;
      try {
        if (this.settings.keyboardHandling === true) {
          return this.activateHandlerManagment();
        } else {
          return this.deactivateHandlerManagment();
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _onResize() {
      var e;
      try {
        this.width = this.realWidth();
        return this.height = this.realHeight();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
  return KDCore.Sprite_Group = Sprite_Group;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_Image;
  //NUI 1.0
  //rev 09.08.24

    //"type": "image"
  Sprite_Image = class Sprite_Image extends KDCore.Sprite {
    constructor(settings) {
      super();
      this.settings = Object.assign({}, this.defaultSettings(), settings);
      this._loaded = false;
      this._create();
      this._onResize();
      this.draw(this.settings.imageName);
      return;
    }

    isLoaded() {
      var e;
      try {
        if (this.settings.width !== "auto" && this.settings.height !== "auto") {
          return true;
        } else {
          return this._loaded === true;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    }

    defaultSettings() {
      return {
        imageName: "",
        folderName: "pictures",
        width: "auto",
        height: "auto",
        keepAspect: false
      };
    }

    realWidth() {
      var e;
      try {
        if (this.isNotHaveBounds()) {
          return 0;
        }
        if (this.settings.width === "auto") {
          if (this._srcBitmap != null) {
            return this._srcBitmap.width;
          } else {
            if ((this.image.bitmap != null) && this.image.bitmap.isReady()) {
              return this.image.bitmap.width;
            }
          }
        } else {
          return this.settings.width;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return this.width;
    }

    realHeight() {
      var e;
      try {
        if (this.isNotHaveBounds()) {
          return 0;
        }
        if (this.settings.height === "auto") {
          if (this._srcBitmap != null) {
            return this._srcBitmap.height;
          } else {
            if ((this.image.bitmap != null) && this.image.bitmap.isReady()) {
              return this.image.bitmap.height;
            }
          }
        } else {
          return this.settings.height;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return this.height;
    }

    dataBindings() {
      return Object.assign(super.dataBindings(), {
        width: function(v) {
          if (v != null) {
            return this.setSize(v, this.settings.height);
          }
        },
        height: function(v) {
          if (v != null) {
            return this.setSize(this.settings.width, v);
          }
        },
        size: function(v) {
          if (v != null) {
            return this.setSize(v.width, v.height);
          }
        },
        image: function(v) {
          return this.draw(v);
        },
        icon: function(v) {
          return this.drawIcon(v);
        }
      });
    }

    setSize(width = "auto", height = "auto") {
      var e;
      try {
        if (width !== "auto") {
          width = this._getValueByStr(width, 'width', this);
        }
        if (height !== "auto") {
          height = this._getValueByStr(height, 'height', this);
        }
        if (width != null) {
          this.settings.width = width;
        }
        if (height != null) {
          this.settings.height = height;
        }
        return this._onResize();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    setImage(imageName, folderName = null) {
      var e;
      try {
        if (String.any(folderName)) {
          this.settings.folderName = folderName;
        }
        return this.draw(imageName);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    // * Если не иконка (число), то ничего не рисует (защита)
    drawIcon(iconIndex) {
      var e;
      try {
        if (isFinite(iconIndex)) {
          return this.draw(iconIndex);
        } else {
          return this.draw("");
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    draw(imageName = "") {
      var e;
      try {
        if (String.any(imageName) && isFinite(imageName)) {
          return this._drawIcon(imageName);
        } else if (String.any(imageName)) {
          return this._drawImage(imageName);
        } else {
          this._srcBitmap = null;
          return this._onResize();
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _create() {
      var e;
      try {
        this.image = new KDCore.Sprite(new Bitmap(1, 1));
        return this.addChild(this.image);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _drawIcon(iconIndex) {
      var e, w;
      try {
        w = this.settings.width;
        if (w === "auto") {
          w = 32;
        }
        this.settings.height = w;
        this._srcBitmap = new Bitmap(w, w);
        this._srcBitmap.drawIcon(0, 0, iconIndex, w, true);
        this._loaded = true;
        return this._onResize();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _drawImage(imageName) {
      var e, folderName;
      try {
        ({folderName} = this.settings);
        this._loaded = false;
        this._srcBitmap = ImageManager.loadBitmap('img/' + folderName + "/", imageName);
        return this._srcBitmap.addLoadListener(this._onBitmapLoaded.bind(this));
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _onBitmapLoaded() {
      var e;
      try {
        this._loaded = true;
        this._onResize();
        this._applyRequiredData();
        return this._executeLoadListeners();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _onResize() {
      var b, e, fh, fw, height, width;
      try {
        this.image.bitmap = new Bitmap(this.realWidth(), this.realHeight());
        if (this._srcBitmap == null) {
          return;
        }
        b = this._srcBitmap;
        //TODO: Опция, чтобы размер был с учётом аспекта
        if (this.settings.keepAspect === true) {
          ({width, height} = this._calculateAspectRatio(this.image.bitmap.width, this.image.bitmap.height, this._srcBitmap.width, this._srcBitmap.height));
          fw = width;
          fh = height;
        } else {
          fw = this.realWidth();
          fh = this.realHeight();
        }
        return this.image.bitmap.blt(b, 0, 0, b.width, b.height, 0, 0, fw, fh);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _calculateAspectRatio(containerWidth, containerHeight, width, height) {
      var aspectRatio, containerAspectRatio, e;
      try {
        aspectRatio = width / height;
        containerAspectRatio = containerWidth / containerHeight;
        if (aspectRatio > containerAspectRatio) {
          width = containerWidth;
          height = width / aspectRatio;
        } else {
          height = containerHeight;
          width = height * aspectRatio;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return {width, height};
    }

  };
  return KDCore.Sprite_Image = Sprite_Image;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ImgButton;
  //NUI 1.0
  //rev 24.07.24

    //"type": "legacyButton"
  Sprite_ImgButton = class Sprite_ImgButton extends KDCore.Sprite {
    constructor(settings) {
      super();
      this.settings = Object.assign({}, this.defaultSettings(), settings);
      this._create();
      return;
    }

    defaultSettings() {
      return {
        width: "auto",
        height: "auto",
        imageName: "",
        isFull: false,
        folderName: "pictures",
        isCheckAlpha: false,
        handler: null,
        forceSize: false // * Force change button bitmaps size
      };
    }

    isLoaded() {
      var e;
      try {
        if (this.settings.width !== "auto" && this.settings.height !== "auto") {
          return true;
        } else {
          return this._loaded === true;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    realWidth() {
      var e;
      try {
        if (this.isNotHaveBounds()) {
          return 0;
        }
        if (this.settings.width === "auto") {
          return this.button.realWidth();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return this.settings.width;
    }

    realHeight() {
      var e;
      try {
        if (this.isNotHaveBounds()) {
          return 0;
        }
        if (this.settings.height === "auto") {
          return this.button.realHeight();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return this.settings.height;
    }

    dataBindings() {
      return Object.assign(super.dataBindings(), {
        width: function(v) {
          if (v != null) {
            return this.setSize(v, this.settings.height);
          }
        },
        height: function(v) {
          if (v != null) {
            return this.setSize(this.settings.width, v);
          }
        },
        size: function(v) {
          if (v != null) {
            return this.setSize(v.width, v.height);
          }
        },
        image: function(v) {
          return this.setImage(v);
        },
        enable: function(v) {
          if (v != null) {
            return this.setEnabledState(v);
          }
        },
        handler: function(v) {
          return this.setClickHandler(v);
        }
      });
    }

    setSize(width = "auto", height = "auto") {
      var e;
      try {
        if (width !== "auto") {
          width = this._getValueByStr(width, 'width', this);
        }
        if (height !== "auto") {
          height = this._getValueByStr(height, 'height', this);
        }
        if (width != null) {
          this.settings.width = width;
        }
        if (height != null) {
          this.settings.height = height;
        }
        if (this.settings.forceSize === true) {
          this._create();
        }
        return this._onResize();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    setImage(imageName = "") {
      var e;
      try {
        if (this.button != null) {
          this._lastButtonState = this.button.isEnabled();
          this._lastButtonHandler = this.button._handler;
        }
        this.settings.imageName = imageName;
        this._create();
        // * Может не быть кнопки, если imageName == ""
        if (this.button == null) {
          return;
        }
        if (this._lastButtonState != null) {
          this.setEnabledState(this._lastButtonState);
          this._lastButtonState = null;
        }
        if (this._lastButtonHandler != null) {
          this.setClickHandler(this._lastButtonHandler);
          return this._lastButtonHandler = null;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    setEnabledState(state = true) {
      var e;
      try {
        if (this.button == null) {
          return;
        }
        if (state === true) {
          return this.button.enable();
        } else {
          return this.button.disable();
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    // * В отличии от AddClickHandler, удаляет все предидущие
    setClickHandler(handler) {
      var e;
      try {
        if (this.button == null) {
          return;
        }
        this.button.clearClickHandler();
        if ((handler != null) && typeof handler === "function") {
          this.settings.handler = handler;
          return this.button.addClickHandler(handler);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    // * EXPAND FIELDS
    click() {
      var ref;
      return (ref = this.button) != null ? ref.click() : void 0;
    }

    setManualHover() {
      var ref;
      return (ref = this.button) != null ? ref.setManualHover() : void 0;
    }

    disableManualHover() {
      var ref;
      return (ref = this.button) != null ? ref.disableManualHover() : void 0;
    }

    setManualSelected() {
      var ref;
      return (ref = this.button) != null ? ref.setManualSelected(...arguments) : void 0;
    }

    enableClick() {
      var ref;
      return (ref = this.button) != null ? ref.enableClick() : void 0;
    }

    disableClick() {
      var ref;
      return (ref = this.button) != null ? ref.disableClick() : void 0;
    }

    desaturate() {
      var ref;
      return (ref = this.button) != null ? ref.desaturate() : void 0;
    }

    isMouseIn() {
      return (this.button != null) && this.button.isMouseIn();
    }

    isActive() {
      return (this.button != null) && this.button.isActive();
    }

    isDisabled() {
      return this.isEnabled();
    }

    isEnabled() {
      return (this.button != null) && this.button.isEnabled();
    }

    addClickHandler() {
      return this.setClickHandler(...arguments);
    }

    clearClickHandler() {
      var ref;
      return (ref = this.button) != null ? ref.clearClickHandler() : void 0;
    }

    simulateClick() {
      var ref;
      return (ref = this.button) != null ? ref.simulateClick() : void 0;
    }

    refreshState() {
      var ref;
      return (ref = this.button) != null ? ref.refreshState(...arguments) : void 0;
    }

    disable() {
      var e, ref;
      try {
        this.settings.enabled = false;
        return (ref = this.button) != null ? ref.disable() : void 0;
      } catch (error) {
        e = error;
        return console.warn(e);
      }
    }

    enable() {
      var e, ref;
      try {
        this.settings.enabled = true;
        return (ref = this.button) != null ? ref.enable() : void 0;
      } catch (error) {
        e = error;
        return console.warn(e);
      }
    }

    // * ==============
    _create() {
      var e, size, sourceFolder;
      try {
        this._loaded = false;
        if (this.button != null) {
          this._destroyButton();
        }
        if (!String.any(this.settings.imageName)) {
          return;
        }
        this.button = new KDCore.ButtonM(this.settings.imageName, this.settings.isFull, this.settings.folderName);
        if (this.settings.forceSize === true && this.settings.width !== "auto" && this.settings.height !== "auto") {
          sourceFolder = this.settings.folderName;
          size = {
            width: this.settings.width,
            height: this.settings.height
          };
          this.button._getGetter = function() {
            var getterFunc;
            getterFunc = function(filename) {
              var bitmap, outputBitmap;
              outputBitmap = new Bitmap(size.width, size.height);
              bitmap = ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
              bitmap.addLoadListener(function() {
                return outputBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, size.width, size.height);
              });
              return outputBitmap;
            };
            return getterFunc;
          };
          this.button._bitmaps = [];
          this.button._loadBitmaps(this.settings.imageName, this.settings.isFull, this.settings.folderName);
          this.button._setImageState(0);
        }
        if (this.settings.isCheckAlpha === true) {
          this.button.isCheckAlpha = function() {
            return true;
          };
        }
        if (this.settings.handler != null) {
          this.setClickHandler(this.settings.handler);
        }
        if (this.settings.enabled === false) {
          this.button.disable();
        }
        this.button.addLoadListener(this._onLoaded.bind(this));
        return this.addChild(this.button);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _onLoaded() {
      var e;
      try {
        this._loaded = true;
        this._onResize();
        this._applyRequiredData();
        return this._executeLoadListeners();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _destroyButton() {
      var e;
      try {
        if (this.button == null) {
          return;
        }
        this.button.removeFromParent();
        this._loaded = false;
        if ($gameTemp.kdButtonUnderMouse === this.button) {
          return $gameTemp.kdButtonUnderMouse = null;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _onResize() {
      var e;
      try {
        this.width = this.realWidth();
        return this.height = this.realHeight();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
  return KDCore.Sprite_ImgButton = Sprite_ImgButton;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ItemsList;
  // * Класс который позволяет сделать список (на основе Window_Selectable), но из Sprite элементов, а не Draw на Bitmap

    //rev 02.05.24

    //TODO: Dynamic items height, controls handlers support
  Sprite_ItemsList = class Sprite_ItemsList extends Window_Selectable {
    constructor(r, settings = {}) {
      if (KDCore.isMV()) {
        super(r.x, r.y, r.width, r.height);
      } else {
        super(r);
      }
      this.settings = Object.assign(this.defaultSetting(), settings);
      this.padding = this.settings.itemsPadding;
      this._prevSelectedIndex = -1;
      this._createItemsContainer();
      this._createWindowContentMask();
      this._setupBackgroundType();
      return;
    }

    defaultSetting() {
      return {
        maxCols: 1,
        isHaveSelectionEffect: false,
        selectionEffects: ["glow;distance:12;outerStrength:3"],
        scaleItemsWidth: false,
        scaleItemsHeight: false,
        defautItemHeight: 36,
        isDrawDefaultItemBack: false,
        backgroundType: 2,
        itemsPadding: 12,
        isHaveInOutAnimation: false,
        inAnimation: "field:x;duration:0.15;keyframes:0=0,100=4",
        outAnimation: "field:x;duration:0.15;keyframes:0=4,100=0"
      };
    }

    activate(index) {
      var e;
      try {
        this.refresh();
        if (index != null) {
          this.safeSelect(index);
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return super.activate();
    }

    maxItems() {
      return this.getAllItems().length;
    }

    maxCols() {
      if (this.settings != null) {
        return this.settings.maxCols || 1;
      } else {
        return 1;
      }
    }

    getAllItems() {
      return this.itemsSet || [];
    }

    setItems(itemsSet, singleItemHeight = null) {
      this.itemsSet = itemsSet;
      this.singleItemHeight = singleItemHeight;
      this._prevSelectedIndex = -1;
      this.setTopRow(0);
      this._clearPreviousItems();
      if (this.singleItemHeight == null) {
        this._adjustAutoItemsHeight(this.itemsSet[0]);
      }
      this.refresh();
      this._drawNewItems();
    }

    selectedItem() {
      return this.itemAt(this.index());
    }

    setOkHandler(handler) {
      return this.setHandler('ok', handler);
    }

    setCancelHandler(handler) {
      return this.setHandler('cancel', handler);
    }

    setSelectionHandler(handler) {
      return this.pOnSelectionChanged = handler;
    }

    itemAt(index) {
      return this.getAllItems()[index];
    }

    isNeedScaleItemsW() {
      return this.settings.scaleItemsWidth === true;
    }

    isNeedScaleItemsH() {
      return this.settings.scaleItemsHeight === true;
    }

    // * NOT WORKS!!!
    isUseDynamicHeight() {
      return false;
    }

    lineHeight(index) {
      if (this.settings != null) {
        return this.singleItemHeight || this.settings.defautItemHeight;
      } else {
        return this.singleItemHeight || 36;
      }
    }

    isDrawWindowDefaultItemsBack() {
      return this.settings.isDrawDefaultItemBack === true;
    }

    //$[OVER]
    _updateCursor() {
      if (KDCore.isMV()) {
        return this.setCursorRect(0, 0, 0, 0);
      } else {
        return this._cursorSprite.visible = false;
      }
    }

    update() {
      super.update();
      this._itemsContainer.y = -this._scrollY;
      return this._updateItemsSelectionState();
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ItemsList.prototype;
    _._createItemsContainer = function() {
      var ref;
      if (!this.isDrawWindowDefaultItemsBack()) {
        if ((ref = this._contentsBackSprite) != null) {
          ref.visible = false;
        }
      }
      this._windowItemsContentLayer = new Sprite();
      this._windowItemsContentLayer.move(this._padding, this._padding);
      this.addChild(this._windowItemsContentLayer);
      this._itemsContainer = new KDCore.Sprite();
      this._windowItemsContentLayer.addChild(this._itemsContainer);
      this.addChild(this._downArrowSprite);
      return this.addChild(this._upArrowSprite);
    };
    _._setupBackgroundType = function() {
      return this.setBackgroundType(this.settings.backgroundType);
    };
    _._createWindowContentMask = function() {
      var e, m, maskBitmap;
      try {
        maskBitmap = new Bitmap(this.width - this._padding * 2, this.height - this._padding * 2);
        maskBitmap.fillAll("#FFF");
        m = new Sprite(maskBitmap);
        this._windowItemsContentLayer.mask = m;
        return this._windowItemsContentLayer.addChild(m);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._adjustAutoItemsHeight = function(item) {
      var e;
      try {
        if (item == null) {
          this.singleItemHeight = 36;
          return;
        }
        if (item.realHeight != null) {
          this.singleItemHeight = item.realHeight();
        } else {
          if (item.height > 0) {
            this.singleItemHeight = item.height;
          }
        }
        if (this.singleItemHeight === 0 || !this.singleItemHeight) {
          return this.singleItemHeight = 36;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._clearPreviousItems = function() {
      var c, e, i, j, len, len1, ref, results, toRemove;
      try {
        toRemove = [];
        ref = this._itemsContainer.children;
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          toRemove.push(c);
        }
        results = [];
        for (j = 0, len1 = toRemove.length; j < len1; j++) {
          c = toRemove[j];
          results.push(c.removeFromParent());
        }
        return results;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._drawNewItems = function() {
      var e, i, index, item, len, ref, results;
      try {
        ref = this.getAllItems();
        results = [];
        for (index = i = 0, len = ref.length; i < len; index = ++i) {
          item = ref[index];
          results.push(this._addNewItemToList(item, index));
        }
        return results;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._addNewItemToList = function(item, index) {
      var e, rect;
      try {
        if (item == null) {
          return;
        }
        rect = this.itemRect(index);
        item.x = rect.x;
        item.y = rect.y;
        this._adjustItemWidthAndHeight(item);
        return this._itemsContainer.addChild(item);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._adjustItemWidthAndHeight = function(item) {
      var e, scaleFactor;
      try {
        if (item == null) {
          return;
        }
        if (this.isNeedScaleItemsW()) {
          scaleFactor = this._defaultItemWidth() / this._getItemWidth(item);
          item.scale.x = scaleFactor;
        }
        if (this.isNeedScaleItemsH()) {
          scaleFactor = this.lineHeight() / this._getItemHeight(item);
          return item.scale.y = scaleFactor;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._getItemWidth = function(item) {
      var e, v;
      v = this._defaultItemWidth();
      try {
        if (item == null) {
          return v;
        }
        if (item.realWidth != null) {
          v = item.realWidth();
        } else {
          if (item.width > 0) {
            v = item.width;
          }
        }
        if (v === 0 || !v) {
          v = this._defaultItemWidth();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return v;
    };
    _._defaultItemWidth = function() {
      return this.width - this._padding * 2;
    };
    _._getItemHeight = function(item) {
      var e, v;
      v = 36;
      try {
        if (item == null) {
          return v;
        }
        if (item.realHeight != null) {
          v = item.realHeight();
        } else {
          if (item.height > 0) {
            v = item.height;
          }
        }
        if (v === 0 || !v) {
          v = 36;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return v;
    };
    _._updateItemsSelectionState = function() {
      var e;
      try {
        if (KDCore.isMZ()) {
          if (!this.active || this.index() < 0 || !this.cursorVisible) {
            this._disableSelectionForAll();
            return;
          }
        } else {
          if (!this.active || this.index() < 0 || !this.isCursorVisible()) {
            this._disableSelectionForAll();
            return;
          }
        }
        return this._selectItemAtIndex(this.index());
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._disableSelectionForAll = function() {
      var e, i, item, len, ref, results;
      try {
        if (this._prevSelectedIndex === -2) {
          return;
        }
        this._prevSelectedIndex = -2;
        ref = this.getAllItems();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          results.push(this._deselectItem(item));
        }
        return results;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._selectItem = function(item) {
      var e;
      try {
        if (item == null) {
          return;
        }
        if ((this._prevSelectedIndex != null) && this._prevSelectedIndex >= 0) {
          this._deselectItem(this.itemAt(this._prevSelectedIndex));
        }
        this._playItemInAnimation(item);
        if (item.activateInList != null) {
          return item.activateInList();
        } else {
          return this._selectItemVisually(item);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._playItemInAnimation = function(item) {
      var e;
      try {
        if (!this.settings.isHaveInOutAnimation) {
          return;
        }
        if (this.settings.inAnimation == null) {
          return;
        }
        if (item == null) {
          return;
        }
        this._playItemAnimation(item, this.settings.inAnimation);
        return this._isHaveInAnimation = true;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._selectItemVisually = function(item) {
      var e;
      try {
        if (item == null) {
          return;
        }
        if (!this.settings.isHaveSelectionEffect) {
          return;
        }
        //item.filters = [new PIXI.filters.GlowFilter({ distance: 15, outerStrength: 4 })]
        if (this.settings.selectionEffects == null) {
          return;
        }
        if (this.settings.selectionEffects.length === 0) {
          return;
        }
        KDCore.UI.Builder.ApplyEffects(item, this.settings.selectionEffects);
        return this._isSelectionEffectBeenAdded = true;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._deselectItem = function(item) {
      var e;
      try {
        if (item == null) {
          return;
        }
        this._playItemOutAnimation(item);
        if (item.deactivateInList != null) {
          return item.deactivateInList();
        } else {
          return this._deselectItemVisually(item);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._playItemOutAnimation = function(item) {
      var e;
      try {
        if (!this.settings.isHaveInOutAnimation) {
          return;
        }
        if (!this._isHaveInAnimation) {
          return;
        }
        if (this.settings.outAnimation == null) {
          return;
        }
        if (item == null) {
          return;
        }
        this._playItemAnimation(item, this.settings.outAnimation);
        return this._isHaveInAnimation = false;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._playItemAnimation = function(item, animation) {
      var e, root;
      try {
        if (item == null) {
          return;
        }
        root = item.children[0];
        if (root == null) {
          return;
        }
        if (typeof animation === "string") {
          animation = KDCore.UI.Builder.ConvertShortcut(animation);
        }
        return root.setAnimationRule(animation);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._deselectItemVisually = function(item) {
      var e;
      try {
        if (item == null) {
          return;
        }
        if (this._isSelectionEffectBeenAdded === true) {
          item.filters = [];
          return this._isSelectionEffectBeenAdded = false;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._selectItemAtIndex = function(index) {
      var e, item;
      try {
        if (this._prevSelectedIndex !== index) {
          item = this.itemAt(index);
          if (item == null) {
            return;
          }
          this._selectItem(item);
          return this._prevSelectedIndex = index;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ItemsList = Sprite_ItemsList;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ItemsListN;
  //NUI 1.0
  //rev 03.05.24

    //type: "list"
  // * Этот класс служит только как Wrapper, чтобы можно было задавать настроки List через NUI схему
  Sprite_ItemsListN = class Sprite_ItemsListN extends KDCore.Sprite {
    constructor(settings) {
      super();
      this.settings = Object.assign(this.defaultSettings(), settings);
      this._applySettings();
      return;
    }

    defaultSettings() {
      return Object.assign({
        width: 240,
        height: 420
      }, KDCore.Sprite_ItemsList.prototype.defaultSetting());
    }

    /* (See parent class, this is just for reference)
           defaultSetting: -> {
               maxCols: 1,
               isHaveSelectionEffect: false,
               selectionEffects: ["glow;distance:12;outerStrength:3"],
               scaleItemsWidth: false,
               scaleItemsHeight: false,
               defautItemHeight: 36,
               isDrawDefaultItemBack: false,
               backgroundType: 2,
               itemsPadding: 12,
               isHaveInOutAnimation: false,
               inAnimation: "field:x;duration:0.15;keyframes:0=0,100=4",
               outAnimation: "field:x;duration:0.15;keyframes:0=4,100=0"
           }*/
    dataBindings() {
      return Object.assign(super.dataBindings(), {
        width: function(v) {
          if (v != null) {
            return this.setSize(v, this.settings.height);
          }
        },
        height: function(v) {
          if (v != null) {
            return this.setSize(this.settings.width, v);
          }
        },
        size: function(v) {
          if (v != null) {
            return this.setSize(v.width, v.height);
          }
        },
        maxCols: function(v) {
          if (v != null) {
            return this.setMaxCols(v);
          }
        }
      });
    }

    realWidth() {
      if (this.isNotHaveBounds()) {
        return 0;
      }
      return this.settings.width;
    }

    realHeight() {
      if (this.isNotHaveBounds()) {
        return 0;
      }
      return this.settings.height;
    }

    setSize(width, height) {
      var e;
      try {
        width = this._getValueByStr(width, 'width', this);
        height = this._getValueByStr(height, 'height', this);
        if (width != null) {
          this.settings.width = width;
        }
        if (height != null) {
          this.settings.height = height;
        }
        return this._applySettings();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    setMaxCols(maxCols) {
      var e;
      try {
        this.settings.maxCols = maxCols;
        return this._applySettings();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    clear() {
      var ref;
      return (ref = this.list) != null ? ref.setItems([]) : void 0;
    }

    // * WRAPPED
    setItems() {
      var ref;
      return (ref = this.list) != null ? ref.setItems(...arguments) : void 0;
    }

    activate() {
      var ref;
      return (ref = this.list) != null ? ref.activate(...arguments) : void 0;
    }

    deactivate() {
      var ref;
      return (ref = this.list) != null ? ref.deactivate(...arguments) : void 0;
    }

    setOkHandler() {
      var ref;
      return (ref = this.list) != null ? ref.setOkHandler(...arguments) : void 0;
    }

    setCancelHandler() {
      var ref;
      return (ref = this.list) != null ? ref.setCancelHandler(...arguments) : void 0;
    }

    setSelectionHandler() {
      var ref;
      return (ref = this.list) != null ? ref.setSelectionHandler(...arguments) : void 0;
    }

    refresh() {
      var ref;
      return (ref = this.list) != null ? ref.refresh(...arguments) : void 0;
    }

    selectedItem() {
      var ref;
      return (ref = this.list) != null ? ref.selectedItem() : void 0;
    }

    itemAt() {
      var ref;
      return (ref = this.list) != null ? ref.itemAt(...arguments) : void 0;
    }

    maxItems() {
      var ref;
      return (ref = this.list) != null ? ref.maxItems() : void 0;
    }

    getAllItems() {
      var ref;
      return (ref = this.list) != null ? ref.getAllItems() : void 0;
    }

    maxCols() {
      var ref;
      return (ref = this.list) != null ? ref.maxCols() : void 0;
    }

    // * END WRAPPED

      // * Dev, (not use settings) , чтобы визуально видеть размеры окна при подгонке
    setBackgroundType() {
      var ref;
      return (ref = this.list) != null ? ref.setBackgroundType(...arguments) : void 0;
    }

    // * Shortcut
    showBack() {
      return this.setBackgroundType(0);
    }

    _applySettings() {
      var e;
      try {
        this._destroyList();
        this._createListWithSettings(this.settings);
        if (this._isHaveStoredData === true) {
          return this._restoreData();
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _destroyList() {
      var e;
      try {
        if (this.list == null) {
          return;
        }
        this._isHaveStoredData = true;
        this._lastItems = this.list.getAllItems();
        this._isBeenActive = this.list.active === true;
        this._lastSelectedIndex = this.list.index();
        this._lastHandlers = this.list._handlers;
        this.removeChild(this.list);
        return this.list = null;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _createListWithSettings(settings) {
      var e;
      try {
        this.list = new KDCore.Sprite_ItemsList({
          x: 0,
          y: 0,
          width: settings.width,
          height: settings.height
        }, settings);
        return this.addChild(this.list);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _restoreData() {
      var e;
      try {
        if (this.list == null) {
          return;
        }
        if (this._lastHandlers != null) {
          this.list._handlers = this._lastHandlers;
        }
        if (this._lastItems == null) {
          return;
        }
        this.list.setItems(this._lastItems);
        if (this._lastSelectedIndex != null) {
          this.list.safeSelect(this._lastSelectedIndex);
        }
        if (this._isBeenActive === true) {
          this.list.activate();
        }
        return this._isHaveStoredData = false;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
  return KDCore.Sprite_ItemsListN = Sprite_ItemsListN;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_NUI;
  //NUI 1.0
  //rev 06.05.24
  Sprite_NUI = class Sprite_NUI extends KDCore.Sprite {
    constructor(nuiScheme, owner = null) {
      super();
      this.nuiScheme = nuiScheme;
      if (this.nuiScheme != null) {
        this.loadNuiScheme(this.nuiScheme, owner);
      }
      return;
    }

    // * DIRECT nuiElement,без Sprite_NUI (надо присоединять к OWNER)
    static FromScheme(scheme, owner) {
      var e, spr;
      try {
        spr = new Sprite_NUI(scheme, owner);
        if (owner != null) {
          owner.addChild(spr.nuiElement);
        }
        return spr.nuiElement;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return new KDCore.Sprite_NUI();
      }
    }

    _afterLoadNuiAutoRefreshTime() {
      return 100;
    }

    loadNuiScheme(scheme, owner = null) {
      var e;
      try {
        if (this.nuiElement != null) {
          this.destroyNuiElement();
        }
        if (scheme == null) {
          return;
        }
        if (owner == null) {
          owner = this;
        }
        if (scheme["type"] != null) {
          this.nuiElement = KDCore.UI.Builder.Make(scheme, owner, this);
        } else {
          this.nuiElement = KDCore.UI.Builder.Factory(scheme, owner, this._afterLoadNuiAutoRefreshTime())[0];
        }
        this.addChild(this.nuiElement);
        return this.refreshBindings(owner, true);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    destroyNuiElement() {
      var e;
      try {
        if (this.nuiElement == null) {
          return;
        }
        this.nuiElement.removeFromParent();
        return this.nuiElement = null;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
  return KDCore.Sprite_NUI = Sprite_NUI;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_Plane;
  //NUI 1.0
  //rev 25.04.24

    //type: "plane"
  Sprite_Plane = class Sprite_Plane extends KDCore.Sprite {
    constructor(settings) {
      var bottom, folderName, imageName, left, margins, right, textureSource, top;
      super();
      this.settings = Object.assign({}, this.defaultSettings(), settings);
      this.plane = null;
      this.planeContainer = new KDCore.Sprite();
      this.addChild(this.planeContainer);
      ({imageName, margins, folderName} = this.settings);
      if (isFinite(margins)) {
        left = top = right = bottom = margins;
      } else {
        ({left, top, right, bottom} = margins);
      }
      textureSource = ImageManager.loadBitmap('img/' + folderName + '/', imageName);
      textureSource.addLoadListener(() => {
        var texture;
        texture = new PIXI.Texture(textureSource._baseTexture);
        if (KDCore.isMV()) {
          this.plane = new PIXI.mesh.NineSlicePlane(texture, left, top, right, bottom);
        } else {
          this.plane = new PIXI.NineSlicePlane(texture, left, top, right, bottom);
        }
        this.planeContainer.addChild(this.plane);
        return this._onResize();
      });
      this._onResize();
      return;
    }

    realWidth() {
      if (this.isNotHaveBounds()) {
        return 0;
      }
      return this.settings.width;
    }

    realHeight() {
      if (this.isNotHaveBounds()) {
        return 0;
      }
      return this.settings.height;
    }

    defaultSettings() {
      return {
        imageName: "",
        width: 100,
        height: 100,
        margins: 20,
        folderName: "pictures"
      };
    }

    setSize(w = 100, h = 100) {
      var e;
      try {
        w = this._getValueByStr(w, 'width', this);
        h = this._getValueByStr(h, 'height', this);
        if (w != null) {
          this.settings.width = w;
        }
        if (h != null) {
          this.settings.height = h;
        }
        return this._onResize();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    //TODO: IMAGE
    dataBindings() {
      return Object.assign(super.dataBindings(), {
        width: function(v) {
          if (v != null) {
            return this.setSize(v, this.plane.height);
          }
        },
        height: function(v) {
          if (v != null) {
            return this.setSize(this.plane.width, v);
          }
        },
        size: function(v) {
          if (v != null) {
            return this.setSize(v.width, v.height);
          }
        }
      });
    }

    _onResize() {
      var e;
      try {
        this.width = this.settings.width;
        this.height = this.settings.height;
        if (this.plane == null) {
          return;
        }
        this.plane.width = this.settings.width;
        return this.plane.height = this.settings.height;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
  return KDCore.Sprite_Plane = Sprite_Plane;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_SButton;
  //NUI 1.0
  //rev 23.07.24
  //"type": "button"
  Sprite_SButton = class Sprite_SButton extends KDCore.Sprite {
    constructor(settings) {
      super();
      this.settings = Object.assign({}, this.defaultSettings(), settings);
      this._isEnabled = true;
      this._isUnderMouse = false;
      this._isPressActive = false;
      this._isMouseOver = false;
      this._create();
      this._refreshSettings();
      return;
    }

    realWidth() {
      if (this.isNotHaveBounds()) {
        return 0;
      }
      return this.settings.width;
    }

    realHeight() {
      if (this.isNotHaveBounds()) {
        return 0;
      }
      return this.settings.height;
    }

    isDisabled() {
      return !this.isEnabled();
    }

    isEnabled() {
      return this._isEnabled === true;
    }

    _enable() {
      var e;
      try {
        if (this._desaturated === true) {
          this.filters = [];
          this._desaturated = false;
        }
        if ((this.settings.disabledTint != null) && this._isEnabled === false) { // * Return to normal Tint
          this.applyTint(this.settings.activeTint, this.settings.tintAlpha);
        }
        this._isEnabled = true;
        return this._refreshTint();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _disable() {
      var e;
      try {
        this._applyDisabledEffect();
        return this._isEnabled = false;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _applyDisabledEffect() {
      var e;
      try {
        if (this.settings.desaturateWhenDisabled === true) {
          return this.desaturate();
        } else if (this.settings.disabledTint != null) {
          return this.applyTint(this.settings.disabledTint, this.settings.disabledTintAlpha);
        } else {
          return this.applyTint(this.settings.tint, this.settings.tintAlpha);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    isActive() {
      return this._isEnabled === true && this.visible === true && this.opacity !== 0;
    }

    pIsSupportKeyboardHandle() {
      return this.settings.keyboardHandled === true;
    }

    desaturate() {
      this.filters = [new PIXI.filters.ColorMatrixFilter()];
      this.filters[0].desaturate();
      this._desaturated = true;
    }

    defaultSettings() {
      return {
        imageName: '',
        folderName: 'pictures',
        imageMargins: 20,
        width: 160,
        height: 60,
        clickSe: "Cursor1",
        desaturateWhenDisabled: false,
        tint: "",
        overTint: 0xFFFFDD,
        activeTint: 0xAAAAAA,
        tintAlpha: 0.5,
        disabledTint: 0xAAAAAA,
        disabledTintAlpha: 0.5,
        keyboardKey: "",
        keyboardHandled: true,
        enabled: true
      };
    }

    //TODO: IMAGE!
    dataBindings() {
      return Object.assign(super.dataBindings(), {
        width: function(v) {
          if (v != null) {
            return this.setSize(v, this.settings.height);
          }
        },
        height: function(v) {
          if (v != null) {
            return this.setSize(this.settings.width, v);
          }
        },
        size: function(v) {
          if (v != null) {
            return this.setSize(v.width, v.height);
          }
        },
        style: function(v) {
          if (v != null) {
            return this.updateStyle(v);
          }
        },
        handler: function(v) {
          return this.setClickHandler(v);
        },
        enable: function(v) {
          if (v != null) {
            return this.setEnabledState(v);
          }
        }
      });
    }

    setEnabledState(state = true) {
      var e;
      try {
        this.settings.enabled = state;
        if (state === true) {
          return this._enable();
        } else {
          return this._disable();
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    enable() {
      return this.setEnabledState(true);
    }

    disable() {
      return this.setEnabledState(false);
    }

    updateStyle(style) {
      var e;
      try {
        this.settings = Object.assign(this.settings, style);
        return this._refreshSettings();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    addClickHandler() {
      return this.setClickHandler(...arguments);
    }

    setClickHandler(handler = null) {
      var e;
      try {
        this.settings.onClick = null;
        if ((handler != null) && typeof handler === 'function') {
          return this.settings.onClick = handler;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    setSize(width = 160, height = 60) {
      var e, h, w;
      try {
        w = this._getValueByStr(width, 'width', this);
        h = this._getValueByStr(height, 'height', this);
        if (w != null) {
          this.settings.width = w;
        }
        if (h != null) {
          this.settings.height = h;
        }
        return this._refreshSettings();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    executeAction() {
      var e;
      try {
        KDCore.Utils.playSE(this.settings.clickSe);
        if (this.settings.onClick != null) {
          return this.settings.onClick();
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _onTap() {
      var e;
      try {
        return this.executeAction();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    //console.log("TAP")
    _onOver() {
      this._isMouseOver = true;
      return this._refreshSettings();
    }

    //console.log("OVER")
    _onOut() {
      this._isMouseOver = false;
      return this._refreshSettings();
    }

    //console.log("OUT")
    _onDown() {
      this._isPressActive = true;
      return this._refreshSettings();
    }

    //console.log("DOWN")
    _onUp() {
      this._isPressActive = false;
      return this._refreshSettings();
    }

    //console.log("UP")
    _create() {
      var e, height, width;
      try {
        this.buttonPlane = new KDCore.Sprite_Plane({
          imageName: this.settings.imageName,
          margins: this.settings.imageMargins,
          folderName: this.settings.folderName
        });
        ({width, height} = this.settings);
        this.buttonPlane.setSize(width, height);
        return this.addChild(this.buttonPlane);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _refreshSettings() {
      var e;
      try {
        this._refreshTint();
        if (this.settings.keyboardHandled === true) {
          this.handleOKAction = this._onTap;
        } else {
          this.handleOKAction = null;
        }
        this.setEnabledState(this.settings.enabled);
        return this._onResize();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _refreshTint() {
      var e;
      try {
        if (this._isPressActive === true) {
          return this.applyTint(this.settings.activeTint, this.settings.tintAlpha);
        } else if (this._isMouseOver === true) {
          return this.applyTint(this.settings.overTint, this.settings.tintAlpha);
        } else {
          return this.applyTint(this.settings.tint, this.settings.tintAlpha);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    applyTint(tintValue, tintAlpha = 0.5) {
      var e;
      try {
        if (tintValue == null) {
          this._resetTintFilter();
          return;
        }
        if (typeof tintValue === "string") {
          if (!String.any(tintValue)) {
            this._resetTintFilter();
            return;
          }
          tintValue = KDCore.Utils.string2hex(tintValue);
        }
        return this.buttonPlane.filters = [new PIXI.filters.ColorOverlayFilter(tintValue, tintAlpha)];
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _resetTintFilter() {
      var e;
      try {
        return this.buttonPlane.filters = [];
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _activateHandlerVisually() {
      var e;
      try {
        return this.applyTint(this.settings.overTint);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    pDeactivateHandler() {
      super.pDeactivateHandler();
      return this.applyTint(this.settings.tint);
    }

    update() {
      super.update();
      if (this.isActive()) {
        this._updateKeyboardHandling();
        this._updateMouseHandling();
      } else {
        if (this._isUnderMouse === true) {
          this._onOut();
        }
        if ($gameTemp.kdButtonUnderMouse === this) {
          $gameTemp.kdButtonUnderMouse = null;
        }
      }
    }

    _updateKeyboardHandling() {
      var e;
      try {
        if (String.any(this.settings.keyboardKey)) {
          if (Input.isTriggered(this.settings.keyboardKey)) {
            Input.clear();
            return this._onTap();
          }
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _updateMouseHandling() {
      var e;
      try {
        if (this.isUnderMouse()) {
          if (!this._isUnderMouse) {
            this._onOver();
            $gameTemp.kdButtonUnderMouse = this;
            try {
              if ($gameTemp.__pkdActiveKeyboardHandler != null) {
                $gameTemp.__pkdActiveKeyboardHandler.pDeactivateHandler();
              }
            } catch (error) {
              e = error;
              KDCore.warning(e);
            }
            this._isUnderMouse = true;
          }
        } else {
          if (this._isUnderMouse === true) {
            this._onOut();
            if ($gameTemp.kdButtonUnderMouse === this) {
              $gameTemp.kdButtonUnderMouse = null;
            }
            this._isUnderMouse = false;
          }
        }
        if (TouchInput.isPressed()) {
          if (this._isUnderMouse === true) {
            if (!this._isMousePressed) {
              this._onDown();
              this._isMousePressed = true;
            }
          }
        }
        if (TouchInput.isReleased()) {
          if (this._isMousePressed === true) {
            this._onUp();
            if (this._isUnderMouse === true) {
              this._onTap();
            }
            return this._isMousePressed = false;
          }
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _onResize() {
      var e, ref;
      try {
        this.width = this.settings.width;
        this.height = this.settings.height;
        return (ref = this.buttonPlane) != null ? ref.setSize(this.width, this.height) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
  return KDCore.Sprite_SButton = Sprite_SButton;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    //NUI 1.3
    //rev 18.11.24

    //"type": "textPro"
    var TextProElementsBuilder, TextProParser;
    TextProParser = class TextProParser {
      // * settings - it's a Sprite_TextPro settings
      constructor(settings1) {
        this.settings = settings1;
        this._textsConfigs = [];
        this._parseAllText();
        return;
      }

      static ParseText(settings) {
        var parser;
        parser = new TextProParser(settings);
        return parser.getConfigs();
      }

      isControlSeparator(char) {
        return '\x1b' === char;
      }

      getConfigs() {
        return this._textsConfigs;
      }

      _parseAllText() {
        var e, preparedText, textState;
        try {
          preparedText = this._convertControlCharacters(this.settings.text);
          //console.log "PREPARED TEXT: " + preparedText
          textState = this._makeInitialTextState(preparedText);
          return this._processAllText(textState);
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _convertControlCharacters(inputText) {
        var e;
        try {
          return TextProParser.ConvertControlCharacters(inputText);
        } catch (error) {
          e = error;
          KDCore.warning(e);
          return "";
        }
        return outputText;
      }

      static ConvertControlCharacters(inputText) {
        var e, outputText;
        try {
          if (String.any(inputText)) {
            if (window.__kdSharedTextProTextColorSourceWindow == null) {
              if (KDCore.isMV()) {
                window.__kdSharedTextProTextColorSourceWindow = new Window_Base(0, 0, 0, 0);
              } else {
                window.__kdSharedTextProTextColorSourceWindow = new Window_Base(new Rectangle(0, 0, 0, 0));
              }
            }
            outputText = window.__kdSharedTextProTextColorSourceWindow.convertEscapeCharacters(inputText);
          } else {
            outputText = "";
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
          return "";
        }
        return outputText;
      }

      _makeInitialTextState(text) {
        return {
          "text": text,
          "buffer": "",
          "index": 0,
          "color": "", // * "" default
          "fontSize": -1, // * -1 default
          "iconIndex": -1 // * -1 none
        };
      }

      _processAllText(textState) {
        var e;
        try {
          while (textState.index < textState.text.length) {
            this._processCharacter(textState);
          }
          return this._saveTextConfig(textState);
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _processCharacter(textState) {
        var c, e;
        try {
          c = textState.text[textState.index++];
          if (c.charCodeAt(0) < 0x20) {
            this._saveTextConfig(textState);
            return this._processControlCharacter(textState, c);
          } else {
            return textState.buffer += c;
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _saveTextConfig(textState) {
        var e;
        try {
          if (textState.buffer.length > 0 || textState.iconIndex > 0) {
            this._textsConfigs.push({
              "text": textState.buffer,
              "color": textState.color,
              "fontSize": textState.fontSize,
              "iconIndex": textState.iconIndex
            });
            textState.buffer = "";
            return textState.iconIndex = -1;
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _processControlCharacter(textState, c) {
        var code, e;
        try {
          if (this.isControlSeparator(c)) {
            code = this._obtainEscapeCode(textState);
            return this._processEscapeCharacter(code, textState);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _obtainEscapeCode(textState) {
        var arr, e, regExp;
        try {
          regExp = /^[$.|^!><{}\\]|^[A-Z]+/i;
          arr = regExp.exec(textState.text.slice(textState.index));
          if (arr != null) {
            textState.index += arr[0].length;
            return arr[0].toUpperCase();
          } else {
            return "";
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
          return "";
        }
      }

      _processEscapeCharacter(code, textState) {
        var colorIndex, currentFontSize, e, fontSize, iconIndex;
        try {
          //TODO: chex param?
          switch (code) {
            case "C":
              colorIndex = this._obtainEscapeParam(textState);
              if (colorIndex > 0) {
                if (KDCore.isMV()) {
                  return textState.color = window.__kdSharedTextProTextColorSourceWindow.textColor(colorIndex);
                } else {
                  return textState.color = ColorManager.textColor(colorIndex);
                }
              } else {
                return textState.color = "";
              }
              break;
            case "I":
              iconIndex = this._obtainEscapeParam(textState);
              if (iconIndex > 0) {
                textState.iconIndex = iconIndex;
                // * Иконка - это отдельный спрайт, так что сохраняем текущий текст как отдельный
                return this._saveTextConfig(textState);
              } else {
                return textState.iconIndex = -1;
              }
              break;
            case "FS":
              fontSize = this._obtainEscapeParam(textState);
              return textState.fontSize = fontSize;
            case "{": // * Make font bigger by 1
              currentFontSize = textState.fontSize;
              if (currentFontSize === -1) {
                //TODO: ???
                currentFontSize = this.settings.font.size;
              }
              return textState.fontSize = currentFontSize + 1;
            case "}":
              currentFontSize = textState.fontSize;
              if (currentFontSize === -1) {
                //TODO: ???
                currentFontSize = this.settings.font.size;
              }
              return textState.fontSize = currentFontSize - 1;
            default:
              return KDCore.warning("Sprite_TextPro: Unknown escape code: " + code);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _obtainEscapeParam(textState) {
        var arr, e, regExp;
        try {
          regExp = /^\[\d+\]/;
          arr = regExp.exec(textState.text.slice(textState.index));
          if (arr != null) {
            textState.index += arr[0].length;
            return parseInt(arr[0].slice(1));
          } else {
            return "";
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
          return "";
        }
      }

    };
    KDCore.TextProParser = TextProParser;
    TextProElementsBuilder = class TextProElementsBuilder {
      // * settings - it's a Sprite_TextPro settings
      constructor(configs1, settings1, userTextStyle1) {
        this.configs = configs1;
        this.settings = settings1;
        this.userTextStyle = userTextStyle1;
        this._elements = new KDCore.Sprite_Group({});
        this._buildElements();
        return;
      }

      getElements() {
        return this._elements;
      }

      static Build(configs, settings, userTextStyle) {
        var builder;
        builder = new TextProElementsBuilder(configs, settings, userTextStyle);
        return builder.getElements();
      }

      _buildElements() {
        var config, e, i, index, len, ref, results;
        try {
          ref = this.configs;
          results = [];
          for (index = i = 0, len = ref.length; i < len; index = ++i) {
            config = ref[index];
            //console.log(config)
            if (config.iconIndex >= 0) {
              results.push(this._createIconElement(config, this._elements));
            } else {
              results.push(this._createTextElement(config, this._elements));
            }
          }
          return results;
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _createIconElement(config, line) {
        var e, icon, iconSize, paddingGroup;
        try {
          if (this.settings.isStaticIconSize === true) {
            iconSize = this.settings.iconSize;
          } else {
            if (config.fontSize > 0) {
              iconSize = config.fontSize * this.settings.iconSize;
            } else {
              iconSize = this.settings.font.size * this.settings.iconSize;
            }
          }
          icon = new KDCore.Sprite_Image({
            imageName: config.iconIndex,
            width: iconSize,
            height: iconSize
          });
          paddingGroup = new KDCore.Sprite_Group({
            width: iconSize + this.settings.iconPadding.left + this.settings.iconPadding.right,
            height: iconSize + this.settings.iconPadding.top + this.settings.iconPadding.bottom
          });
          paddingGroup.addChild(icon);
          icon.setPosition("center", "center");
          line.addChild(paddingGroup);
          return paddingGroup.setPosition("prevEndX", this._textElementVerticalPosition());
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _createTextElement(config, line) {
        var e, metrics, text, textSettings;
        try {
          textSettings = Object.assign({}, this.settings);
          textSettings.text = config.text;
          if (config.fontSize > 0) {
            textSettings.font.size = config.fontSize;
          }
          if (String.any(config.color)) {
            textSettings.textColor = config.color;
          }
          textSettings.alignment = "left";
          textSettings.multiline = false;
          textSettings.verticalCentered = false;
          textSettings.actualSize = true;
          //TODO: margins control code \MX, \MY?
          textSettings.margins = {
            "x": 0,
            "y": 0
          };
          //console.log("Create text with settings " + JSON.stringify(textSettings))
          text = new KDCore.UI.Sprite_UIText2(textSettings, this.userTextStyle);
          // * Add to line
          line.addChild(text);
          //console.log(text.realWidth())
          metrics = text.getMetrics();
          //console.log(metrics)
          //f = -> @getMetrics().width
          //f2 = -> @getMetrics().height
          //text.realWidth = f.bind(text)
          //text.realHeight = f2.bind(text)
          //text.setSize(metrics.width, metrics.height)
          return text.setPosition("prevEndX", this._textElementVerticalPosition());
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _textElementVerticalPosition() {
        var e;
        try {
          if (this.settings.verticalCentered === true) {
            return "center";
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        return 0;
      }

    };
    return KDCore.Sprite_TextPro = class Sprite_TextPro extends KDCore.Sprite {
      constructor(settings = {}, userTextStyle1 = {}) {
        super();
        this.userTextStyle = userTextStyle1;
        this.settings = Object.assign({}, this.defaultSettings(), settings);
        this._textsContainer = new KDCore.Sprite_Group({});
        this._textLines = [];
        this.addChild(this._textsContainer);
        if (String.any(this.settings.text)) {
          this.drawText(this.settings.text);
        }
        return;
      }

      draw() {
        return this.drawText(...arguments);
      }

      drawText(text) {
        this.settings.text = text;
        this._createTextSprites();
        this._applyAlignment();
        this._applyMargins();
      }

      realWidth() {
        var e;
        try {
          if (this.isNotHaveBounds()) {
            return 0;
          }
          if (this.settings.actualSize === true) {
            return this._textsContainer.realWidth();
          }
          return this.settings.size.width;
        } catch (error) {
          e = error;
          KDCore.warning(e);
          return 0;
        }
      }

      realHeight() {
        var e;
        try {
          if (this.isNotHaveBounds()) {
            return 0;
          }
          if (this.settings.actualSize === true) {
            return this._textsContainer.realHeight();
          }
          return this.settings.size.height;
        } catch (error) {
          e = error;
          KDCore.warning(e);
          return 0;
        }
      }

      dataBindings() {
        return Object.assign(super.dataBindings(), {
          text: function(v) {
            return this.drawText(v);
          },
          style: function(v) {
            if (v != null) {
              return this.updateStyle(v);
            }
          },
          width: function(v) {
            if (v != null) {
              return this.setSize(v, this.realHeight());
            }
          },
          height: function(v) {
            if (v != null) {
              return this.setSize(this.realWidth(), v);
            }
          },
          size: function(v) {
            if (v != null) {
              return this.setSize(v.width, v.height);
            }
          },
          textColor: function(v) {
            if (v != null) {
              return this.updateStyle({
                textColor: v
              });
            }
          },
          fontSize: function(v) {
            if (v != null) {
              return this.updateFontSize(v);
            }
          },
          iconSize: function(v) {
            if (v != null) {
              return this.updateIconSize(v);
            }
          },
          verticalSpacing: function(v) {
            if (v != null) {
              return this.updateVerticalSpacing(v);
            }
          }
        });
      }

      setSize(w = 60, h = 20) {
        var e;
        try {
          w = this._getValueByStr(w, 'width', this);
          h = this._getValueByStr(h, 'height', this);
          return this.updateStyle({
            size: {
              width: w,
              height: h
            }
          });
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      updateFontSize(fontSize) {
        var e, font;
        try {
          font = Object.assign({}, this.settings.font);
          if (typeof fontSize === "string") {
            fontSize = this._getValueByStr(fontSize, 'height', this);
          }
          font.size = fontSize;
          return this.updateStyle({font});
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      updateIconSize(iconSize) {
        var e;
        try {
          if (typeof iconSize === "string") {
            iconSize = this._getValueByStr(iconSize, 'height', this);
          }
          return this.updateStyle({iconSize});
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      updateVerticalSpacing(spacing) {
        var e;
        try {
          if (typeof spacing === "string") {
            spacing = this._getValueByStr(spacing, 'height', this);
          }
          return this.updateStyle({
            verticalSpacing: spacing
          });
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      updateStyle(newStyleInOldFormat = {}, newStyleInNewFormat = {}) {
        var e;
        try {
          this.settings = Object.assign(this.settings, newStyleInOldFormat);
          this.userTextStyle = Object.assign(this.userTextStyle, newStyleInNewFormat);
          // * Redraw Text
          return this.drawText(this.settings.text);
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      defaultSettings() {
        var defaultTextSettings, e;
        try {
          defaultTextSettings = KDCore.UI.Sprite_UIText2.prototype.defaultParams.call();
          return Object.assign({}, defaultTextSettings, {
            trimWidth: false,
            trimHeight: false,
            alignment: 'center',
            verticalAlignment: 'top', //center, bottom,
            multiline: false,
            verticalCentered: true,
            isStaticIconSize: false, // * If true, icon size will be iconSize in PX
            iconSize: 1, //% of font size, 1 = 100%
            iconPadding: {
              left: 2,
              right: 2,
              top: 0,
              bottom: 0
            },
            actualSize: false,
            verticalSpacing: 4 // * only for multiline
          });
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        return {};
      }

      _applyMargins() {
        var e;
        try {
          this._textsContainer.x += this.settings.margins.x;
          return this._textsContainer.y += this.settings.margins.y;
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _applyAlignment() {
        var e;
        try {
          return this._textsContainer.setPosition(this.settings.alignment, this.settings.verticalAlignment);
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _createTextSprites() {
        var e, elements, i, len, line, lines, results, textsConfigs;
        try {
          this._clearTextSprites();
          textsConfigs = TextProParser.ParseText(this.settings);
          elements = TextProElementsBuilder.Build(textsConfigs, this.settings, this.userTextStyle);
          if (this.settings.multiline === true || this.settings.trimWidth === true) {
            lines = this._separateTextToLines(elements);
            results = [];
            for (i = 0, len = lines.length; i < len; i++) {
              line = lines[i];
              this._textLines.push(line);
              this._textsContainer.addChild(line);
              this._refreshTextElementsVerticalPosition(line);
              results.push(this._applyLineAligmnent(line));
            }
            return results;
          } else {
            this._textLines.push(elements);
            this._textsContainer.addChild(elements);
            return this._refreshTextElementsVerticalPosition(elements);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _applyLineAligmnent(line) {
        var e;
        try {
          return line.setPosition(this.settings.alignment, line.y);
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _textElementVerticalPosition() {
        var e;
        try {
          if (this.settings.verticalCentered === true) {
            return "center";
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        return 0;
      }

      _refreshTextElementsVerticalPosition(groupWithElements) {
        var child, e, i, len, ref, results;
        try {
          ref = groupWithElements.children;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            results.push(child.setPosition(child.x, this._textElementVerticalPosition()));
          }
          return results;
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _separateTextToLines(allTextElements) {
        var child, currentHeight, currentWidth, e, el, elements, i, j, len, len1, line, lines, maxHeight, maxLineWidth, newHeight, ref;
        try {
          lines = [];
          maxLineWidth = this.settings.size.width;
          maxHeight = this.settings.size.height;
          currentWidth = 0;
          currentHeight = function() {
            return lines.reduce(function(sum, line) {
              return sum + line.realHeight();
            }, 0);
          };
          elements = [];
          ref = allTextElements.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            elements.push(child);
          }
          line = new KDCore.Sprite_Group({});
          lines.push(line);
          for (j = 0, len1 = elements.length; j < len1; j++) {
            el = elements[j];
            currentWidth += el.realWidth();
            if (currentWidth > maxLineWidth) {
              currentWidth = 0;
              if (this.settings.multiline === false) {
                break;
              }
              newHeight = currentHeight() + el.realHeight();
              if (newHeight > maxHeight) {
                if (this.settings.trimHeight === true) {
                  break;
                }
              }
              line = new KDCore.Sprite_Group({});
              line.addChild(el);
              el.setPosition(0, this._textElementVerticalPosition());
              lines.push(line);
              line.y += line.realHeight() + this.settings.verticalSpacing;
            } else {
              line.addChild(el);
              el.setPosition("prevEndX", this._textElementVerticalPosition());
            }
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        return lines;
      }

      _clearTextSprites() {
        var e, i, len, ref, spr;
        try {
          this._textsContainer.move(0, 0);
          ref = this._textLines;
          for (i = 0, len = ref.length; i < len; i++) {
            spr = ref[i];
            spr.removeFromParent();
          }
          return this._textLines = [];
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad((function() {
  var Sprite_TilingFrame;
  Sprite_TilingFrame = class Sprite_TilingFrame extends KDCore.Sprite {
    constructor(width, height, skinBitmap) {
      super();
      this.width = width;
      this.height = height;
      this.skinBitmap = skinBitmap;
      this._createParts();
      this._refreshAll();
    }

    _createParts() {
      var i, j;
      this.backSprite = new Sprite();
      this.addChild(this.backSprite);
      this.content = new Sprite();
      this.addChild(this.content);
      this._outFrame = new Sprite();
      for (i = j = 0; j < 8; i = ++j) {
        this._outFrame.addChild(new Sprite());
      }
      return this.addChild(this._outFrame);
    }

    // * Отступ, чтобы за рамку не выходить
    _fillPadding() {
      return 2;
    }

    // * Размер частей на картинке
    _fillImagePartWidth() {
      return 96;
    }

    _fillImagePartHeight() {
      return 96;
    }

    // * Толщина рамки
    _frameThickness() {
      return 12;
    }

    _refreshAll() {
      this._refreshBack();
      return this._refreshTFrame();
    }

    _refreshBack() {
      var fh, fw, h, m, sprite, w;
      m = this._fillPadding();
      w = Math.max(0, this.width - m * 2);
      h = Math.max(0, this.height - m * 2);
      sprite = this.backSprite;
      sprite.bitmap = this.skinBitmap;
      // * Координаты фона из картинки
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      sprite.setFrame(0, 0, fw, fh);
      sprite.move(m, m);
      sprite.scale.x = w / fw;
      return sprite.scale.y = h / fh;
    }

    _refreshTFrame() {
      var drect, fh, fw, j, len, m, ref, spr, srect;
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      // * Положение назначения
      drect = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
      // * Координаты рамки на картинке
      srect = {
        x: fw,
        y: 0,
        width: fw,
        height: fh
      };
      m = this._frameThickness(); // * Толщина
      ref = this._outFrame.children;
      for (j = 0, len = ref.length; j < len; j++) {
        spr = ref[j];
        spr.bitmap = this.skinBitmap;
      }
      if (KDCore.isMZ()) {
        Window.prototype._setRectPartsGeometry.call(this, this._outFrame, srect, drect, m);
      } else {
        this._setRectPartsGeometry(this._outFrame, srect, drect, m);
      }
    }

    // * Этот метод существует в MZ, но нет в MV
    //? From MZ
    _setRectPartsGeometry(sprite, srect, drect, m) {
      var child, children, dh, dmh, dmw, dw, dx, dy, j, len, sh, smh, smw, sw, sx, sy;
      sx = srect.x;
      sy = srect.y;
      sw = srect.width;
      sh = srect.height;
      dx = drect.x;
      dy = drect.y;
      dw = drect.width;
      dh = drect.height;
      smw = sw - m * 2;
      smh = sh - m * 2;
      dmw = dw - m * 2;
      dmh = dh - m * 2;
      children = sprite.children;
      sprite.setFrame(0, 0, dw, dh);
      sprite.move(dx, dy);
      // corner
      children[0].setFrame(sx, sy, m, m);
      children[1].setFrame(sx + sw - m, sy, m, m);
      children[2].setFrame(sx, sy + sw - m, m, m);
      children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
      children[0].move(0, 0);
      children[1].move(dw - m, 0);
      children[2].move(0, dh - m);
      children[3].move(dw - m, dh - m);
      // edge
      children[4].move(m, 0);
      children[5].move(m, dh - m);
      children[6].move(0, m);
      children[7].move(dw - m, m);
      children[4].setFrame(sx + m, sy, smw, m);
      children[5].setFrame(sx + m, sy + sw - m, smw, m);
      children[6].setFrame(sx, sy + m, m, smh);
      children[7].setFrame(sx + sw - m, sy + m, m, smh);
      children[4].scale.x = dmw / smw;
      children[5].scale.x = dmw / smw;
      children[6].scale.y = dmh / smh;
      children[7].scale.y = dmh / smh;
      // center
      if (children[8] != null) {
        children[8].setFrame(sx + m, sy + m, smw, smh);
        children[8].move(m, m);
        children[8].scale.x = dmw / smw;
        children[8].scale.y = dmh / smh;
      }
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.visible = dw > 0 && dh > 0;
      }
    }

  };
  return KDCore.Sprite_TilingFrame = Sprite_TilingFrame;
}));


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Window_ExtTextLineBase;
  // * Данное окно используется как основа для Sprite_UITextExt
  //rev 07.10.21
  Window_ExtTextLineBase = class Window_ExtTextLineBase extends Window_Base {
    constructor(rect, fontSettings, styleSettings = {}) {
      super(rect);
      this.fontSettings = fontSettings;
      this.styleSettings = styleSettings;
      this.createContents();
      // * Всегда прозрачное окно
      this.setBackgroundType(2);
      this.resetFontSettings();
      return;
    }

    // * Нет отступов
    updatePadding() {
      return this.padding = 0;
    }

    // * Нет отступов
    itemPadding() {
      return 0;
    }

    textPadding() {
      return 0;
    }

    standardPadding() {
      return 0;
    }

    contentsWidth() {
      return this.width;
    }

    contentsHeight() {
      return this.height;
    }

    // * Более гибкая настройка размера текста при { }
    makeFontBigger() {
      return this.contents.fontSize += 1;
    }

    makeFontSmaller() {
      if (this.contents.fontSize > 1) {
        return this.contents.fontSize -= 1;
      }
    }

    resetTextColor() {
      super.resetTextColor();
      if (this.styleSettings == null) {
        return;
      }
      if (this.styleSettings.textColor != null) {
        return this.contents.textColor = this.styleSettings.textColor;
      }
    }

    // * Применение своих шрифта и размера текста
    resetFontSettings() {
      super.resetFontSettings();
      if (this.fontSettings == null) {
        return;
      }
      if (String.any(this.fontSettings.face)) {
        this.contents.fontFace = this.fontSettings.face;
      }
      if (this.fontSettings.size > 0) {
        this.contents.fontSize = this.fontSettings.size;
      }
      if (this.fontSettings.italic != null) {
        this.contents.fontItalic = this.fontSettings.italic;
      }
    }

  };
  return KDCore.Window_ExtTextLineBase = Window_ExtTextLineBase;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button M
  //------------------------------------------------------------------------------
  //@[AUTO EXTEND]
  // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

    // * Принимает название файла изображения кнопки без _00
  // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
  // * _02 - не используются в этом классе

    // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

    //TODO: ADD ALPHA CHECK!

    // * Если isFull - true, значит нужен _03
  KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
    constructor(filename, isFull = false, sourceFolder = null) {
      super();
      this._bitmaps = [];
      this._disabled = false;
      this._isTriggered = false;
      // * Когда произошло нажатие на кнопку
      this._handler = null;
      this._isCanBeClicked = true;
      this._isManualHoverMode = false;
      this._isManualSelected = false;
      this._loadBitmaps(filename, isFull, sourceFolder);
      this._setImageState(0);
      this._createThread();
    }

    realWidth() {
      return this._bitmaps[0].width;
    }

    realHeight() {
      return this._bitmaps[0].height;
    }

    setManualHover() {
      return this._isManualHoverMode = true;
    }

    disableManualHover() {
      return this._isManualHoverMode = false;
    }

    setManualSelected(_isManualSelected) {
      this._isManualSelected = _isManualSelected;
    }

    enableClick() {
      return this._isCanBeClicked = true;
    }

    disableClick() {
      return this._isCanBeClicked = false;
    }

    desaturate() {
      this.filters = [new PIXI.filters.ColorMatrixFilter()];
      this.filters[0].desaturate();
    }

    isLoaded() {
      var ref;
      return (ref = this._bitmaps[0]) != null ? ref.isReady() : void 0;
    }

    isMouseIn() {
      if (this._isManualHoverMode === true) {
        return this._isManualSelected;
      } else {
        return this.isUnderMouse() && this.visible === true;
      }
    }

    isAllParentsActive() {
      var e, parent;
      try {
        parent = this.parent;
        while (parent != null) {
          if (parent.visible === false) {
            return false;
          }
          if (parent.opacity === 0) {
            return false;
          }
          parent = parent.parent;
        }
        return true;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    }

    isActive() {
      if (this._isCanBeClicked === false) {
        return false;
      }
      if (this.visible === false) {
        return false;
      }
      if (this.opacity === 0) {
        return false;
      }
      return this.isAllParentsActive();
    }

    isDisabled() {
      return this._disabled === true;
    }

    addClickHandler(_handler) {
      this._handler = _handler;
    }

    clearClickHandler() {
      return this._handler = null;
    }

    // * Воспроизводит визуальный эффект нажатия
    simulateClick() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.isMouseIn()) {
        return;
      }
      this._startSimulation();
    }

    isEnabled() {
      return !this.isDisabled();
    }

    refreshState(isEnable = true) {
      if (isEnable === true) {
        if (this.isDisabled()) {
          this.enable();
        }
      } else {
        if (this.isEnabled()) {
          this.disable();
        }
      }
    }

    disable() {
      this._disabled = true;
      return this._setImageState(2);
    }

    enable() {
      this._disabled = false;
      return this._setImageState(0);
    }

    click() {
      if (this._handler != null) {
        return this._handler();
      }
    }

    update() {
      super.update();
      return this._updateMain();
    }

  };
  return (function() {    
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ ButtonM Implementation
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
    //@[DEFINES]
    _ = KDCore.ButtonM.prototype;
    _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(filename + '_00'));
      this._bitmaps[0].addLoadListener(this._onBitmapLoaded.bind(this));
      this._bitmaps.push(getterFunc(filename + '_01'));
      if (isFull) {
        this._bitmaps.push(getterFunc(filename + '_03'));
      }
    };
    _._onBitmapLoaded = function() {
      var e;
      try {
        return this._executeLoadListeners();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._getGetter = function(sourceFolder = null) {
      var getterFunc;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder !== null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
        };
      }
      return getterFunc;
    };
    _._setImageState = function(index = 0) {
      if (this._bitmaps[index] == null) {
        index = 0;
      }
      this.bitmap = this._bitmaps[index];
      this._lastState = index;
    };
    _._createThread = function() {
      this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
      this.hoverThread.applyTimeRange(-1, 1);
      this.hoverThread.call();
    };
    //?[DYNAMIC]
    _._updateMain = function() {
      this._updateMouseLogic();
      if (!this.isActive()) {
        if (($gameTemp.kdButtonUnderMouse != null) && $gameTemp.kdButtonUnderMouse === this) {
          return $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseLogic = function() {
      this.hoverThread.update();
      return this._updateMouseClick();
    };
    _._updateHover = function() {
      var e;
      if (!this.isActive()) {
        return;
      }
      // * чтобы эффект нажатия не прекратить
      if (this._isTriggered === true) {
        return;
      }
      if (this.isMouseIn()) {
        if (this._lastState !== 1) {
          if (!this.isDisabled()) {
            this._setImageState(1);
          }
          $gameTemp.kdButtonUnderMouse = this;
          try {
            if ($gameTemp.__pkdActiveKeyboardHandler != null) {
              $gameTemp.__pkdActiveKeyboardHandler.pDeactivateHandler();
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }
      } else {
        if (this._lastState !== 0) {
          if (!this.isDisabled()) {
            this._setImageState(0);
          }
          if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        } else if ($gameTemp.kdButtonUnderMouse === this) {
          $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseClick = function() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.isUnderMouse()) {
        this._isTriggered = true;
        this._setImageState(0);
      }
      if (this._isTriggered === true) {
        if (TouchInput.isReleased()) {
          this._isTriggered = false;
          if (this.isMouseIn()) {
            this.click();
          }
        }
      }
    };
    _._startSimulation = function() {
      this._setImageState(1);
      this._simulateThread = new KDCore.TimedUpdate(10, () => {
        return this._setImageState(0);
      });
      this._simulateThread.once();
      return this._updateMain = this._updateMouseClickSimulated;
    };
    _._updateMouseClickSimulated = function() {
      this._simulateThread.update();
      if (!this._simulateThread.isAlive()) {
        this._simulateThread = null;
        this._updateMain = this._updateMouseLogic;
      }
    };
    // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

    //@[ALIAS]
    alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
      if ($gameTemp.kdButtonUnderMouse != null) {
        return true;
      } else {
        return alias_SM_isAnyButtonPressed.call(this);
      }
    };
    //TODO: Добавить доп. проверку?
    //@[ALIAS]
    alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
      $gameTemp.kdButtonUnderMouse = null;
      setTimeout((function() {
        return $gameTemp.kdButtonUnderMouse = null;
      }), 50);
      return alias_SM_onMapLoaded.call(this);
    };
  })();
});

// ■ END ButtonM Implementation
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button Mini User - класс с определением файла каждого состояния отдельно
  // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
  // ? states = { main, hover, disabled }
  return KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
    constructor() {
      super(...arguments);
    }

    //$[OVER]
    _loadBitmaps(states, isFull = true, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(states.main));
      this._bitmaps.push(getterFunc(states.hover));
      // * Optional 03
      if (String.any(states.disabled)) {
        this._bitmaps.push(getterFunc(states.disabled));
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_TilingLine;
  Sprite_TilingLine = class Sprite_TilingLine extends KDCore.Sprite_TilingFrame {
    constructor() {
      super(...arguments);
    }

    //$[OVER BASE ALL BELOW]
    _fillPadding() {
      return 0;
    }

    _refreshTFrame() {} // * EMPTY

    _fillImagePartWidth() {
      return 4;
    }

    _fillImagePartHeight() {
      return 26;
    }

  };
  return KDCore.Sprite_TilingLine = Sprite_TilingLine;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Пространство имён для всех UIElements
  KDCore.UI = KDCore.UI || {};
  (function() {    // * Общий класс для всех UI элементов
    //?rev 07.02.2024
    var Sprite_UIElement;
    Sprite_UIElement = (function() {
      // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
      //@[ABSTRACT]
      class Sprite_UIElement extends KDCore.Sprite {
        constructor(params) {
          super();
          this.params = params;
          this._init();
        }

        // * Стандартный набор настроек
        defaultParams() {
          return {
            visible: true
          };
        }

        // * Общий метод (есть у всех элементов)
        // * По умолчанию вызывает drawText, но потомки могут переопределить
        draw() {
          return this.drawText(...arguments);
        }

        // * Общий метод
        drawText() {} // * EMPTY

        
          // * Если изначально невидимый (из параметров), то не активный вообще
        isActive() {
          return this.params.visible === true;
        }

        rootImageFolder() {
          if (String.any(this.params.rootImageFolder)) {
            return this.params.rootImageFolder;
          } else {
            return Sprite_UIElement.RootImageFolder;
          }
        }

        // * Сделать чёрно белым
        desaturate() {
          this.filters = [new PIXI.filters.ColorMatrixFilter()];
          this.filters[0].desaturate();
        }

        clearFilters() {
          return this.filters = [];
        }

        // * Общий метод (можно ли редактировать визуально)
        isCanBeEdited() {
          return false;
        }

        // * Общий метод (надо ли скрывать при игровом сообщнии)
        isHaveHideWithMessageFlag() {
          return false;
        }

        // * Общий метод (находится ли объект под мышкой)
        isUnderMouse() {
          var ref;
          return ((ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0) && this.isFullVisible();
        }

        // * Полностью ли виден объект? (включае всех его родителей)
        isFullVisible() {
          return this.visible === true && this.allParentsIsVisible();
        }

        // * Все ли родители объекта видимы
        allParentsIsVisible() {
          var e, p;
          if (!this.visible) {
            return false;
          }
          try {
            if (this.parent != null) {
              p = this.parent;
              while (p != null) {
                if (p.visible === true) {
                  p = p.parent;
                } else {
                  return false;
                }
              }
              return true;
            } else {
              return this.visible === true;
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            return true;
          }
        }

        // * Параметры первого элемента (если он есть)
        realWidth() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realWidth();
            } else {
              return child.width;
            }
          }
          return 0;
        }

        realHeight() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realHeight();
            } else {
              return child.height;
            }
          }
          return 0;
        }

        // * Метод восстановления значения на стандартные настройки
        reset(property) {
          var e;
          try {
            switch (property) {
              case "position":
                this._resetPosition();
                break;
              default:
                this[property] = this.params[property];
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }

      };

      // * Корневая директория для изображений
      Sprite_UIElement.RootImageFolder = "Alpha";

      return Sprite_UIElement;

    }).call(this);
    KDCore.UI.Sprite_UIElement = Sprite_UIElement;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIElement.prototype;
    _._init = function() {
      var e;
      this._prepare();
      try {
        return this._createContent();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Если при создании произошла ошибка, отключаем элемент
        return this.isActive = function() {
          return false;
        };
      }
    };
    
    // * Подготовка элемента (проверка параметров)
    _._prepare = function() {
      //@params = @defaultParams() unless @params?
      this.params = Object.assign({}, this.defaultParams(), this.params);
      if (this.params.visible != null) {
        this.visible = this.params.visible;
      }
    };
    // * Наследники создают свои элементы в этом методе
    _._createContent = function() {}; // * EMPTY
    
    // * Сброс позиции
    _._resetPosition = function() {
      var e, x, y;
      if (this.params.position == null) {
        return;
      }
      try {
        ({x, y} = this.params.position);
        if (isFinite(x) && isFinite(y)) {
          x = Number(x);
          y = Number(y);
        } else {
          x = Number(eval(x));
          y = Number(eval(y));
        }
        this.move(x, y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        this.move(0, 0);
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ItemsListNHor;
  //TODO: NOT USED IN NUI 1.0
  //NUI 1.X !#!
  //rev 03.05.24

    //"type": "horList"
  Sprite_ItemsListNHor = class Sprite_ItemsListNHor extends KDCore.Sprite_ItemsListN {
    constructor() {
      super(...arguments);
    }

    //$[OVER]
    defaultSettings() {
      var settings;
      settings = super.defaultSettings();
      settings.width = 420;
      settings.height = 120;
      settings.maxCols = 4;
      return settings;
    }

    //$[OVER]
    setMaxCols(maxCols) {} // * AUTO

    setItems(items) {
      var e, l;
      try {
        if (items != null) {
          l = this.maxItems();
          if (l !== items.length) {
            this.settings.maxCols = items.length;
            this.clear();
            this._applySettings();
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return super.setItems(items);
    }

  };
  return KDCore.Sprite_ItemsListNHor = Sprite_ItemsListNHor;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_Screen;
  //NUI 1.0
  //rev 04.05.24

    //"type": "screen"
  Sprite_Screen = class Sprite_Screen extends KDCore.Sprite_Group {
    constructor(settings) {
      super(settings);
      this._applyExtraSettings();
    }

    //TODO: В режиме linkToMap, должен иметь width и height карты (size * tileSize)
    realWidth() {
      if (this.isNotHaveBounds()) {
        return 0;
      }
      return Graphics.width;
    }

    realHeight() {
      if (this.isNotHaveBounds()) {
        return 0;
      }
      return Graphics.height;
    }

    defaultSettings() {
      var defaultSettings;
      defaultSettings = super.defaultSettings();
      return Object.assign(defaultSettings, {
        width: Graphics.width,
        height: Graphics.height,
        linkToMap: false //TODO: NOT USED IN NUI 1.0
      });
    }

    _applyExtraSettings() {
      var e;
      try {
        if (this.settings.linkToMap === true) {
          return this.anchorPoint = new KDCore.MapAnchorPoint(0, 0);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    update() {
      super.update();
      return this._refreshScreenPosition();
    }

    _refreshScreenPosition() {
      var e;
      try {
        if (this.anchorPoint == null) {
          return;
        }
        this.x = this.anchorPoint.screenX();
        return this.y = this.anchorPoint.screenY();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
  return KDCore.Sprite_Screen = Sprite_Screen;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIButton;
    // * Кнопка на экране, можно нажимать
    Sprite_UIButton = class Sprite_UIButton extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "Button_Inventory",
          isHaveDisabled: true,
          rootImageFolder: null, //?optional
          click: "console.log('click')" // * число или код
        };
      }

      // * Кнопка не поддерживает перерисовку
      draw() {} // * EMPTY

      disable() {
        var ref;
        return (ref = this.button) != null ? ref.disable() : void 0;
      }

      enable() {
        var ref;
        return (ref = this.button) != null ? ref.enable() : void 0;
      }

      setState(isEnabled) {
        if (isEnabled) {
          return this.enable();
        } else {
          return this.disable();
        }
      }

      
        // * Просто вызов метода
      call() {
        var ref;
        return (ref = this.button) != null ? ref.click() : void 0;
      }

      // * Вызов метода с симуляцией нажатия
      click() {
        var ref, ref1;
        if ((ref = this.button) != null) {
          ref.click();
        }
        return (ref1 = this.button) != null ? ref1.simulateClick() : void 0;
      }

    };
    KDCore.UI.Sprite_UIButton = Sprite_UIButton;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIButton.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.image.isEmpty()) {
        KDCore.warning('You try create Button without image');
        return;
      }
      this.button = new KDCore.ButtonM(this.params.image, this.params.isHaveDisabled, this.rootImageFolder());
      this.add(this.button);
      return this._registerClickMethod();
    };
    _._registerClickMethod = function() {
      var commonEventId, e, method, ref, script;
      if (!String.any(this.params.click)) {
        return;
      }
      method = null;
      try {
        // * Если число, то значит общее событие
        if (isFinite(this.params.click)) {
          commonEventId = parseInt(this.params.click);
          if (commonEventId > 0) {
            method = function() {
              return $gameTemp.reserveCommonEvent(commonEventId);
            };
          }
        } else {
          // * Иначе скрипт
          script = this.params.click;
          method = function() {
            return eval(script);
          };
        }
        return this.button.addClickHandler(method);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return (ref = this.button) != null ? ref.clearClickHandler() : void 0;
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Рисует лицо персонажа (из папки Faces)
    var Sprite_UIFace;
    Sprite_UIFace = class Sprite_UIFace extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          faceName: "Actor1",
          faceIndex: 0,
          mirror: false,
          size: 144
        };
      }

      draw() {
        return this.drawFace(...arguments);
      }

      drawFace(faceName, faceIndex) {
        return this._drawFaceWhenReady(faceName, faceIndex);
      }

    };
    KDCore.UI.Sprite_UIFace = Sprite_UIFace;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIFace.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._createFaceSprite();
    };
    _._createFaceSprite = function() {
      this._faceSpr = KDCore.Sprite.FromBitmap(this.params.size);
      if (this.params.mirror === true) {
        this._flipFaceSpr();
      }
      this.add(this._faceSpr);
      this._drawFaceWhenReady(this.params.faceName, this.params.faceIndex);
    };
    _._flipFaceSpr = function() {
      this._faceSpr.scale.x = -1;
      this._faceSpr.x = this.params.size;
    };
    _._drawFaceWhenReady = function(name, index = 0) {
      var ref;
      if ((ref = this._faceSpr) != null) {
        ref.clear();
      }
      if (!String.any(name)) {
        return;
      }
      if (index < 0) {
        return;
      }
      this._drawOnReady = {name, index};
      this._faceSourceBitmap = ImageManager.loadFace(name);
      this._faceSourceBitmap.addLoadListener(this._drawFace.bind(this));
      this._drawFace();
    };
    _._drawFace = function() {
      var fh, fw, size, sx, sy;
      if (this._faceSpr == null) {
        return;
      }
      this._faceSpr.clear();
      if (!String.any(this._drawOnReady.name)) {
        return;
      }
      if (KDCore.isMZ()) {
        fw = ImageManager.faceWidth;
        fh = ImageManager.faceHeight;
      } else {
        fw = Window_Base._faceWidth;
        fh = Window_Base._faceHeight;
      }
      size = this.params.size;
      sx = (this._drawOnReady.index % 4) * fw;
      sy = Math.floor(this._drawOnReady.index / 4) * fh;
      this._faceSpr.bitmap.blt(this._faceSourceBitmap, sx, sy, fw, fh, 0, 0, size, size);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIGauge;
    Sprite_UIGauge = class Sprite_UIGauge extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          fill: "",
          foreground: "",
          mask: "",
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawGauge(...arguments);
      }

      drawGauge(percent = 1) {
        this._lastValue = percent;
        return this._drawGauge(percent);
      }

      isVertical() {
        return this.params.vertical === true;
      }

    };
    KDCore.UI.Sprite_UIGauge = Sprite_UIGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIGauge.prototype;
    //$[OVER]
    _._createContent = function() {
      // * Загружается главное изображение, затем уже все остальные, т.к. нужны размеры
      return this._loadFillImage();
    };
    _._loadFillImage = function() {
      // * Главное изображение, поэтому если не указано, то ничего
      if (this.params.fill.isEmpty()) {
        KDCore.warning('You try create Gauge without fill image');
        return;
      }
      KDCore.Utils.loadImageAsync(this.rootImageFolder(), this.params.fill).then(this._createParts.bind(this));
    };
    // * Получаем изображение заполнения и создаём части (т.к. есть размеры)
    _._createParts = function(fillBitmap) {
      this.fillBitmap = fillBitmap;
      this._createBackground();
      this._createFillLayer();
      this._loadForeground();
      this._loadMask();
      return this._onReady();
    };
    _._createBackground = function() {
      this.background = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      this.background.b().fillAll(this.params.backColor);
      this.background.opacity = this.params.backOpacity;
      return this.add(this.background);
    };
    _._createFillLayer = function() {
      this.fillLayer = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      return this.add(this.fillLayer);
    };
    _._loadForeground = function() {
      var fore;
      if (String.isNullOrEmpty(this.params.foreground)) {
        return;
      }
      fore = KDCore.Sprite.FromImg(this.params.foreground, this.rootImageFolder());
      return this.add(fore);
    };
    _._loadMask = function() {
      var mask;
      if (String.isNullOrEmpty(this.params.mask)) {
        return;
      }
      mask = KDCore.Sprite.FromImg(this.params.mask, this.rootImageFolder());
      this.mask = mask;
      return this.add(mask);
    };
    // * Если что-то было до готовности, нарисовать
    _._onReady = function() {
      this.drawGauge(this._lastValue);
    };
    _._drawGauge = function(percent) {
      if (this.fillLayer == null) {
        return;
      }
      this.fillLayer.clear();
      if (this.isVertical()) {
        return this._drawVerGauge(percent);
      } else {
        return this._drawHorGauge(percent);
      }
    };
    _._drawHorGauge = function(percent) {
      var w;
      w = this.fillBitmap.width * percent;
      return this.fillLayer.b().blt(this.fillBitmap, 0, 0, w, this.fillLayer.height, 0, 0);
    };
    _._drawVerGauge = function(percent) {
      var h, hy;
      h = this.fillBitmap.height * percent;
      hy = this.fillBitmap.height - h;
      this.fillLayer.b().blt(this.fillBitmap, 0, 0, this.fillLayer.width, h, 0, hy);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIIcon;
    Sprite_UIIcon = class Sprite_UIIcon extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          index: 0,
          size: 32,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawIcon(...arguments);
      }

      drawIcon(index = 0, noSmoth = false) {
        this._lastValue = index;
        return this._drawIcon(index, noSmoth);
      }

    };
    KDCore.UI.Sprite_UIIcon = Sprite_UIIcon;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIIcon.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createIcon();
      return this._drawIcon(this.params.index);
    };
    _._createIcon = function() {
      this._icon = KDCore.Sprite.FromBitmap(this.params.size, this.params.size);
      this.add(this._icon);
      return this._onReady();
    };
    _._onReady = function() {
      return this.drawIcon(this._lastValue);
    };
    _._drawIcon = function(index, noSmoth = false) {
      this._icon.clear();
      if (KDCore.SDK.isString(index)) {
        this._drawImageIcon(index, noSmoth);
      } else {
        if (index <= 0) {
          return;
        }
        this._icon.drawIcon(0, 0, index, this.params.size, noSmoth);
      }
    };
    _._drawImageIcon = function(imageName, noSmoth = false) {
      return KDCore.Utils.loadImageAsync(this.rootImageFolder(), imageName).then((bitmap) => {
        return this._icon.drawIcon(0, 0, bitmap, this.params.size, noSmoth);
      });
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIImage;
    Sprite_UIImage = class Sprite_UIImage extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "",
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawImage(...arguments);
      }

      drawImage(image) {
        return this._drawImage(image);
      }

    };
    KDCore.UI.Sprite_UIImage = Sprite_UIImage;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIImage.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._drawImage(this.params.image);
    };
    _._drawImage = function(image) {
      this._clearImage();
      if (!String.isNullOrEmpty(image)) {
        this._image = KDCore.Sprite.FromImg(image, this.rootImageFolder());
        this.add(this._image);
      }
    };
    _._clearImage = function() {
      if (this._image == null) {
        return;
      }
      this._image.visible = false;
      this.removeChild(this._image);
      return this._image = null;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIRect;
    Sprite_UIRect = class Sprite_UIRect extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          fillColor: "#FFFFFF".toCss(),
          fillOpacity: 255,
          borderColor: "#000000".toCss(),
          borderThickness: 1,
          borderOpacity: 255
        };
      }

      draw() {
        return this.fill(...arguments);
      }

      fill(color, opacity = 255) {
        return this._fill(color, opacity);
      }

      drawBorder(color, thickness = 1, opacity = 255) {
        return this._drawBorder(color, thickness, opacity);
      }

    };
    KDCore.UI.Sprite_UIRect = Sprite_UIRect;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIRect.prototype;
    //$[OVER]
    _._createContent = function() {
      if (String.any(this.params.fillColor)) {
        this._createFill();
        this.fill(this.params.fillColor, this.params.fillOpacity);
      }
      if (String.any(this.params.borderColor) && this.params.borderThickness > 0) {
        this._createBorder();
        return this.drawBorder(this.params.borderColor, this.params.borderThickness, this.params.borderOpacity);
      }
    };
    _._createFill = function() {
      this._fillSpr = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._fillSpr);
    };
    _._createBorder = function() {
      this._borderSprite = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._borderSprite);
    };
    _._fill = function(color, opacity) {
      if (this._fillSpr == null) {
        return;
      }
      this._fillSpr.fillAll(color);
      this._fillSpr.opacity = opacity;
    };
    _._drawBorder = function(color, thickness, opacity) {
      var b;
      if (this._borderSprite == null) {
        return;
      }
      this._borderSprite.clear();
      b = this._borderSprite.b();
      // * Top line
      b.fillRect(0, 0, b.width, thickness, color);
      // * Bottom line
      b.fillRect(0, b.height - thickness, b.width, thickness, color);
      // * Left line
      b.fillRect(0, 0, thickness, b.height, color);
      // * Right line
      b.fillRect(b.width - thickness, 0, thickness, b.height, color);
      return this._borderSprite.opacity = opacity;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //NUI 1.0
    //rev 11.05.22

    //"type": "legacyText"
    var Sprite_UIText;
    Sprite_UIText = class Sprite_UIText extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
        if (String.any(this.params.text)) {
          this.drawText(this.params.text);
        }
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            width: 60,
            height: 20
          },
          alignment: "center",
          font: {
            face: null,
            size: 18,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#ffffff",
          shadow: {
            color: "#000",
            opacity: 0,
            margins: {
              x: 1,
              y: 1
            }
          },
          text: ""
        };
      }

      // * For compatibility with old style configurations
      sizeWidth() {
        if (this.params.size.w != null) {
          return this.params.size.w;
        } else {
          if (this.params.size.width != null) {
            this.params.size.w = this.params.size.width;
            return this.params.size.width;
          }
        }
        return 0;
      }

      // * For compatibility with old style configurations
      sizeHeight() {
        if (this.params.size.h != null) {
          return this.params.size.h;
        } else {
          if (this.params.size.height != null) {
            this.params.size.h = this.params.size.height;
            return this.params.size.height;
          }
        }
        return 0;
      }

      realWidth() {
        if (this.isNotHaveBounds()) {
          return 0;
        }
        return this.sizeWidth();
      }

      realHeight() {
        if (this.isNotHaveBounds()) {
          return 0;
        }
        return this.sizeHeight();
      }

      dataBindings() {
        return Object.assign(super.dataBindings(), {
          text: function(v) {
            return this.drawText(v);
          },
          style: function(v) {
            return this.updateStyle(v);
          },
          width: function(v) {
            if (v != null) {
              return this.setSize(v, this.sizeHeight());
            }
          },
          height: function(v) {
            if (v != null) {
              return this.setSize(this.sizeWidth(), v);
            }
          },
          size: function(v) {
            if (v != null) {
              return this.setSize(v.width, v.height);
            }
          },
          textColor: function(v) {
            if (v != null) {
              return this.updateStyle({
                textColor: v
              });
            }
          },
          fontSize: function(v) {
            if (v != null) {
              return this.updateFontSize(v);
            }
          }
        });
      }

      setSize(w = 60, h = 20) {
        var e;
        try {
          w = this._getValueByStr(w, 'width', this);
          h = this._getValueByStr(h, 'height', this);
          return this.updateStyle({
            size: {
              w: w,
              h: h,
              width: w,
              height: h
            }
          });
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      updateStyle(newStyle) {
        var e;
        try {
          this.params = Object.assign({}, this.params, newStyle);
          this._destroyOldContent();
          this._createContent();
          // * Redraw Text
          return this.drawText(this._lastText || "");
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      updateFontSize(fontSize) {
        var e, font;
        try {
          font = Object.assign({}, this.params.font);
          if (typeof fontSize === "string") {
            fontSize = this._getValueByStr(fontSize, 'height', this);
          }
          font.size = fontSize;
          return this.updateStyle({font});
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      //?DYNAMIC
      // * Сперва рисуем по готовности, а как загрузился спрайт, меняем
      drawText(text) {
        var e;
        try {
          this.params.text = text;
          return this._drawTextWhenReady(text);
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      // * Сборка текста с учётом формата
      // * Заменить вхождения %1, %2 на значения параметров
      drawTextWithFormat(/*format string, arguments parameters... */) {
        var text;
        text = this._convertFormatedString(...arguments);
        this.drawText(text);
      }

      // * Пишет текст с определённым цветом (один раз)
      drawTextColor(text, colorCss) {
        if (this._textSpr == null) {
          return;
        }
        this._textSpr.b().textColor = colorCss;
        this.drawText(text);
        this._textSpr.b().textColor = this.params.textColor;
      }

    };
    KDCore.UI.Sprite_UIText = Sprite_UIText;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIText.prototype;
    _._destroyOldContent = function() {
      var e, ref, ref1;
      try {
        if ((ref = this._shadowSpr) != null) {
          ref.removeFromParent();
        }
        return (ref1 = this._textSpr) != null ? ref1.removeFromParent() : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //$[OVER]
    _._createContent = function() {
      if (this.params.shadow != null) {
        this._createShadow();
      }
      return this._createTextSprite();
    };
    _._createTextSprite = function() {
      this._textSpr = KDCore.Sprite.FromParams(this.params);
      this._textSpr.onReady(this._onReady.bind(this));
      return this.add(this._textSpr);
    };
    // * Выполнить по готовности
    _._onReady = function() {
      // * Переключить метод, так как уже готов
      this.drawText = this._drawText;
      // * Написать то что нужно было до готовности (если есть)
      if (this._drawOnReady == null) {
        return;
      }
      this.drawText(this._drawOnReady);
      this._drawOnReady = null;
    };
    _._drawText = function(text) {
      this._lastText = text;
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      if (text != null) {
        this._textSpr.drawTextFull(text);
      }
      if (this._shadowSpr != null) {
        this._shadowSpr.clear();
        if (text != null) {
          this._shadowSpr.drawTextFull(text);
        }
      }
    };
    // * Написать текст когда будет готов
    _._drawTextWhenReady = function(text) {
      this._drawOnReady = text;
      return this._drawText(text);
    };
    
    // * Заменить вхождения %1, %2 на значения параметров
    _._convertFormatedString = function(/*text, args...*/) {
      var e, i, j, ref, text;
      try {
        text = arguments[0];
        for (i = j = 1, ref = arguments.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
          try {
            if (arguments[i] == null) {
              continue;
            }
            text = text.replace("%" + i, arguments[i]);
          } catch (error) {
            e = error;
            KDCore.warning(e);
            text = "[wrong format text input]";
          }
        }
        return text;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return "[wrong format text input]";
      }
    };
    _._createShadow = function() {
      this._shadowSpr = KDCore.Sprite.FromParams(this.params);
      this._shadowSpr.bitmap.textColor = this.params.shadow.color;
      this._shadowSpr.opacity = this.params.shadow.opacity;
      this._shadowSpr.x += this.params.shadow.margins.x;
      this._shadowSpr.y += this.params.shadow.margins.y;
      return this.add(this._shadowSpr);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //NUI 1.0
    //rev 11.05.22
    var Sprite_UIText2;
    
      //"type": "text"
    Sprite_UIText2 = class Sprite_UIText2 extends KDCore.UI.Sprite_UIElement {
      constructor(params, userTextStyle) {
        super(params);
        this.userTextStyle = userTextStyle;
        this._applyParameters(params);
        this._createTextSprite();
        if (String.any(this.params.text)) {
          this.drawText(this.params.text);
        }
        return;
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            width: 60,
            height: 20
          },
          alignment: "center",
          font: {
            face: null,
            size: 18,
            italic: false,
            bold: false,
            weight: 0 // * 0 - not used
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#FFFFFF",
          shadow: {
            color: "#000",
            opacity: 0,
            margins: {
              x: 1,
              y: 1
            }
          },
          text: "",
          multiline: false,
          verticalCentered: true,
          actualSize: false
        };
      }

      // * For compatibility with old style configurations
      sizeWidth() {
        if (this.isNotHaveBounds()) {
          return 0;
        }
        if ((this._textSpr != null) && this.params.actualSize === true) {
          return this.getMetrics().width;
        }
        if (this.params.size.w != null) {
          return this.params.size.w;
        } else {
          if (this.params.size.width != null) {
            this.params.size.w = this.params.size.width;
            return this.params.size.width;
          }
        }
        return 0;
      }

      // * For compatibility with old style configurations
      sizeHeight() {
        if (this.isNotHaveBounds()) {
          return 0;
        }
        if ((this._textSpr != null) && this.params.actualSize === true) {
          return this.getMetrics().height;
        }
        if (this.params.size.h != null) {
          return this.params.size.h;
        } else {
          if (this.params.size.height != null) {
            this.params.size.h = this.params.size.height;
            return this.params.size.height;
          }
        }
        return 0;
      }

      dataBindings() {
        return Object.assign(super.dataBindings(), {
          text: function(v) {
            return this.drawText(v);
          },
          style: function(v) {
            if (v != null) {
              return this.updateStyle(v);
            }
          },
          width: function(v) {
            if (v != null) {
              return this.setSize(v, this.sizeHeight());
            }
          },
          height: function(v) {
            if (v != null) {
              return this.setSize(this.sizeWidth(), v);
            }
          },
          size: function(v) {
            if (v != null) {
              return this.setSize(v.width, v.height);
            }
          },
          textColor: function(v) {
            if (v != null) {
              return this.updateStyle({
                textColor: v
              });
            }
          },
          fontSize: function(v) {
            if (v != null) {
              return this.updateFontSize(v);
            }
          }
        });
      }

      realWidth() {
        return this.sizeWidth();
      }

      realHeight() {
        return this.sizeHeight();
      }

      setSize(w = 60, h = 20) {
        var e;
        try {
          w = this._getValueByStr(w, 'width', this);
          h = this._getValueByStr(h, 'height', this);
          return this.updateStyle({
            size: {
              w: w,
              h: h
            }
          });
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      defaultStyle() {
        return {};
      }

      drawText(text) {
        if (text == null) {
          text = "";
        }
        this.params.text = text;
        this._drawText(text);
      }

      // * Сборка текста с учётом формата
      // * Заменить вхождения %1, %2 на значения параметров
      drawTextWithFormat(/*format string, arguments parameters... */) {
        var text;
        text = this._convertFormatedString(...arguments);
        this.drawText(text);
      }

      // * Пишет текст с определённым цветом (один раз)
      drawTextColor(text, colorCss = "#FFF") {
        if (this._textSpr == null) {
          return;
        }
        this.updateStyle({
          textColor: colorCss
        });
        this.drawText(text);
      }

      updateFontSize(fontSize) {
        var e, font;
        try {
          font = Object.assign({}, this.params.font);
          if (typeof fontSize === "string") {
            fontSize = this._getValueByStr(fontSize, 'height', this);
          }
          font.size = fontSize;
          return this.updateStyle({font});
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      updateStyle(newStyleInOldFormat = {}, newStyleInNewFormat = {}) {
        var e;
        try {
          this.textStyle = this._convertOldStyle(newStyleInOldFormat, newStyleInNewFormat);
          this._textSpr.style = this.textStyle;
          // * Redraw Text
          return this.drawText(this._textSpr.text);
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      getMetrics() {
        return PIXI.TextMetrics.measureText(this._textSpr.text, this._textSpr.style);
      }

    };
    KDCore.UI.Sprite_UIText2 = Sprite_UIText2;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIText2.prototype;
    _._applyParameters = function(params) {
      var e;
      try {
        return this.textStyle = this._convertOldStyle(params, {});
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._convertOldStyle = function(params = {}, style = {}) {
      var _textStyle, color, e, margins, opacity;
      try {
        this.params = Object.assign({}, this.params, params);
        _textStyle = Object.assign({}, this.defaultStyle(), this.userTextStyle, style);
        if (String.any(this.params.font.face)) {
          _textStyle.fontFamily = this.params.font.face;
        }
        _textStyle.fontSize = this.params.font.size;
        if (this.params.font.italic === true) {
          _textStyle.fontStyle = 'italic';
        }
        if (this.params.font.bold === true) {
          _textStyle.fontWeight = 'bold';
        }
        if ((this.params.font.weight != null) && this.params.font.weight > 0) {
          _textStyle.fontWeight = this.params.font.weight;
        }
        if (String.any(this.params.outline.color) && this.params.outline.width > 0) {
          _textStyle.stroke = this.params.outline.color;
          _textStyle.strokeThickness = this.params.outline.width;
        }
        _textStyle.fill = this.params.textColor;
        if ((this.params.shadow != null) && this.params.shadow.opacity > 0) {
          ({color, opacity, margins} = this.params.shadow);
          _textStyle.dropShadow = true;
          _textStyle.dropShadowAngle = margins.y;
          _textStyle.dropShadowColor = color;
          _textStyle.dropShadowDistance = margins.x;
          _textStyle.dropShadowAlpha = opacity / 255.0;
        }
        if (this.params.multiline === true) {
          _textStyle.align = this.params.alignment || 'left';
          _textStyle.wordWrap = true;
          if (this.params.font.size != null) {
            _textStyle.lineHeight = this.params.font.size + 2;
          }
          if (this.sizeWidth() > 0) {
            _textStyle.wordWrapWidth = this.sizeWidth();
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return _textStyle;
    };
    _._createTextSprite = function() {
      var style;
      style = new PIXI.TextStyle(this.textStyle);
      this._textSpr = new PIXI.Text('', style);
      this.add(this._textSpr);
      if (this._needToDrawText != null) {
        this.draw(this._needToDrawText);
        this._needToDrawText = null;
      }
    };
    _._drawText = function(text) {
      var e, h, height, maxLineWidth, textMetrics, w;
      if (this._textSpr == null) {
        this._needToDrawText = text;
        return;
      }
      this._textSpr.text = text;
      if (this.params.size.height != null) {
        this.params.size.h = this.params.size.height;
      }
      if (this.params.size.width != null) {
        this.params.size.w = this.params.size.width;
      }
      ({w, h} = this.params.size);
      try {
        if (typeof text !== "string") {
          text = String(text);
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        text = "[wrong text input]";
      }
      textMetrics = PIXI.TextMetrics.measureText(text, this._textSpr.style);
      ({height, maxLineWidth} = textMetrics);
      if (this.params.verticalCentered === true) {
        this._textSpr.y = (h - height) / 2;
      } else {
        this._textSpr.y = 0;
      }
      if (this.params.alignment === 'center') {
        this._textSpr.x = (w - maxLineWidth) / 2;
      } else if (this.params.alignment === 'right') {
        this._textSpr.x = w - maxLineWidth;
      } else {
        this._textSpr.x = 0;
      }
      this._textSpr.x += this.params.margins.x;
      this._textSpr.y += this.params.margins.y;
    };
    // * Заменить вхождения %1, %2 на значения параметров
    _._convertFormatedString = function(/*text, args...*/) {
      var e, i, j, ref, text;
      try {
        text = arguments[0];
        for (i = j = 1, ref = arguments.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
          try {
            if (arguments[i] == null) {
              continue;
            }
            text = text.replace("%" + i, arguments[i]);
          } catch (error) {
            e = error;
            KDCore.warning(e);
            text = "[wrong format text input]";
          }
        }
        return text;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return "[wrong format text input]";
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //TODO: NOT USED IN NUI 1.0
    //NUI 1.X !#!
    //rev 03.05.22

    //"type": "textExt"
    var Sprite_UITextExt;
    Sprite_UITextExt = class Sprite_UITextExt extends KDCore.UI.Sprite_UIText {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            width: 200,
            height: 60
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          // * новые параметры (KDCore 2.7)
          //?null могут быть
          singleLine: false,
          forceCentered: false
        };
      }

      //$[OVER]
      // * Данный метод не поддерживается, так как тут основа не Sprite, а Window
      drawTextColor() {
        return this.drawText(...arguments);
      }

    };
    KDCore.UI.Sprite_UITextExt = Sprite_UITextExt;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextExt.prototype;
    //$[OVER]
    _._destroyOldContent = function() {
      var e;
      try {
        if (this._textSpr == null) {
          return;
        }
        return this.removeChild(this._textSpr);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //$[OVER]
    _._createTextSprite = function() {
      var rect;
      rect = new Rectangle(0, 0, this.sizeWidth(), this.sizeHeight());
      this._textSpr = new KDCore.Window_ExtTextLineBase(rect, this.params.font, this.params);
      this._textSpr.x = this.params.margins.x || 0;
      this._textSpr.y = this.params.margins.y || 0;
      this.add(this._textSpr);
      // * На следующий кадр, чтобы не было потери текста (опасно)
      setTimeout((() => {
        var e;
        try {
          return this._onReady();
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }), 10);
      this._onReady(); // * Сразу
    };
    
    //$[OVER]
    _._drawText = function(text) {
      this._lastText = text;
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.contents.clear();
      if (this.params.forceCentered === true) {
        this._textSpr.drawTextExInCenter(text, 0, 0, this._textSpr.width, this._textSpr.height);
      } else {
        if (this.params.singleLine === true) {
          this._textSpr.drawTextEx(text, 0, 0, this._textSpr.width);
        } else {
          // * По умолчанию
          this._textSpr.drawTextExWithWordWrap(text, 0, 0, this._textSpr.width);
        }
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UITextWithBack;
    Sprite_UITextWithBack = class Sprite_UITextWithBack extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          text: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            alignment: "center",
            font: {
              face: null,
              size: 18,
              italic: false
            },
            margins: {
              x: 0,
              y: 0
            },
            outline: {
              color: null,
              width: 2
            },
            textColor: "#000000".toCss()
          },
          rect: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            fillColor: "#FFFFFF".toCss(),
            fillOpacity: 255,
            borderColor: "#000000".toCss(),
            borderThickness: 1,
            borderOpacity: 255
          },
          textMargins: {
            x: 0,
            y: 0
          }
        };
      }

      draw() {
        return this.drawText(...arguments);
      }

      // * Aргументы смотри в Sprite_UIText
      drawText() {
        return this.text.draw(...arguments);
      }

      drawTextColor() {
        return this.text.drawTextColor(...arguments);
      }

      // * Аргументы смотри в Sprite_UIRect
      fill() {
        return this.rect.fill(...arguments);
      }

      drawBorder() {
        return this.rect.drawBorder(...arguments);
      }

      //$[OVER]
      isUnderMouse() {
        return this.rect.isUnderMouse();
      }

    };
    KDCore.UI.Sprite_UITextWithBack = Sprite_UITextWithBack;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextWithBack.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createRect();
      return this._createText();
    };
    _._createRect = function() {
      this.rect = new KDCore.UI.Sprite_UIRect(this.params.rect);
      return this.addChild(this.rect);
    };
    _._createText = function() {
      var x, y;
      this.text = new KDCore.UI.Sprite_UIText(this.params.text);
      ({x, y} = this.params.textMargins);
      this.text.move(x, y);
      return this.addChild(this.text);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIColorGauge;
    Sprite_UIColorGauge = class Sprite_UIColorGauge extends KDCore.UI.Sprite_UIGauge {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 100,
            h: 40
          },
          fill: "#FFFFFF", // * В отличии от Gauge, тут цвет, а не картинка
          foreground: "", // картинка
          mask: "", // картинка
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

    };
    KDCore.UI.Sprite_UIColorGauge = Sprite_UIColorGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIColorGauge.prototype;
    //$[OVER]
    // * Заместо изображения используем простой Bitmap с заливкой цвета
    _._loadFillImage = function() {
      var fillBitmap;
      fillBitmap = new Bitmap(this.params.size.w, this.params.size.h);
      fillBitmap.fillAll(this.params.fill);
      this._createParts(fillBitmap);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Данный UI Элемент является только контейнером
    // * Он ничего не рисует, нужно добавлять в него
    // * контент методом addContent

    //rev 17.11.22
    var Sprite_UITooltip;
    Sprite_UITooltip = class Sprite_UITooltip extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
        this.opacity = 0;
      }

      isTooltipActive() {
        return (this._opThread != null) || (this._opChanger != null) || this.opacity > 0;
      }

      activateTooltip(x, y, parent) {
        if (this.isTooltipActive()) {
          return;
        }
        this.deactivateTooltip();
        this.move(x, y);
        this._opThread = new KDCore.TimedUpdate(this.params.delay, this.showTooltip.bind(this));
        if (!this.params.isGlobal && (parent != null)) {
          parent.addChild(this);
        } else {
          // * Always on Top on Scene  (if Global)
          SceneManager._scene.addChild(this);
        }
      }

      deactivateTooltip() {
        this._opThread = null;
        this._opChanger = null;
        return this.opacity = 0;
      }

      showTooltip() {
        this._opThread = null;
        this.appear(this.params.opacityChangeStep);
        if (this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      update() {
        var ref;
        super.update();
        if ((ref = this._opThread) != null) {
          ref.update();
        }
        if (this.isTooltipActive() && this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          delay: 30,
          opacityChangeStep: 35,
          margins: {
            x: 8,
            y: 8
          },
          isGlobal: true,
          cursorRelative: true
        };
      }

      toCursor() {
        var x, y;
        ({x, y} = this.params.margins);
        return this.move(TouchInput.x + x, TouchInput.y + y);
      }

      // * Основной метод, нужно добавить контент
      addContent(content) {
        return this.add(content);
      }

    };
    KDCore.UI.Sprite_UITooltip = Sprite_UITooltip;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITooltip.prototype;
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__processEscapeCharacter, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    switch (code) {
      case 'CHEX':
        this.pProcessColorChangeHex(this.pObtainEscapeParamHexColor(textState));
        break;
      case 'ISZ':
        this.pProcessDrawIconSized(this.pObtainEscapeParamIconArr(textState), textState);
        break;
      case 'PSZ':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, false);
        break;
      case 'PSB':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, true);
        break;
      default:
        ALIAS__processEscapeCharacter.call(this, code, textState);
    }
  };
  //?NEW
  _.pObtainEscapeParamHexColor = function(textState) {
    var arr, regExp, textPart;
    regExp = /^\[(#?([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return "";
    }
  };
  //?NEW
  _.pObtainEscapeParamIconArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          return parseInt(i.trim());
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pObtainEscapeParamImgArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\w+,\s*\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          if (isFinite(i)) {
            return parseInt(i.trim());
          } else {
            return i;
          }
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pProcessColorChangeHex = function(colorHex) {
    var e;
    try {
      this.changeTextColor(colorHex);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.resetTextColor();
    }
  };
  //?NEW
  //?params: [INDEX, SIZE, DX, DY]
  _.pProcessDrawIconSized = function(params, textState) {
    var dx, dy, e, iconIndex, size, staticMargin, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      size = params[1];
      if (params[1] == null) {
        if (KDCore.isMZ()) {
          size = ImageManager.iconWidth;
        } else {
          size = Window_Base._iconWidth;
        }
      }
      if (params[2] == null) {
        params[2] = 0;
      }
      if (params[3] == null) {
        params[3] = 0;
      }
      iconIndex = params[0];
      dx = params[2];
      dy = params[3];
      staticMargin = 2;
      x = textState.x + staticMargin + dx;
      y = textState.y + staticMargin + dy;
      if (KDCore.isMZ()) {
        if (textState.drawing === true) {
          // * Только в режиме рисования
          this.contents.drawIcon(x, y, iconIndex, size);
        }
      } else {
        this.contents.drawIcon(x, y, iconIndex, size);
      }
      textState.x += size + (staticMargin * 2) + dx;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  //?NEW
  //?params: [NAME, W, H, DX, DY]
  _.pProcessDrawPictureSized = function(params, textState, isUnderText = false) {
    var drawBitmap, drawProcess, e, height, name, source, width, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      name = params[0];
      if (!String.any(name)) {
        return;
      }
      width = params[1];
      height = params[2];
      if (params[3] == null) {
        params[3] = 0;
      }
      if (params[4] == null) {
        params[4] = 0;
      }
      x = textState.x + 2 + params[3];
      y = textState.y + 2 + params[4];
      drawBitmap = this.contents;
      source = this.pGetSourceImageForDrawPictureSized(name);
      if ((KDCore.isMZ() && textState.drawing === true) || KDCore.isMV()) {
        drawProcess = function() {
          var e;
          try {
            if (drawBitmap == null) {
              return;
            }
            return drawBitmap.drawOnMe(source, x, y, width, height);
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        source.addLoadListener(drawProcess);
      }
      if (isUnderText !== true) {
        // * Вариант, что текст не будет "перескакивать" за ширину картинки а пойдёт поверх (т.е. фоновая картинка)
        // * Если картине не preload, то может "вылезти" на текст потом, так как рисоваться будет позже
        textState.x += width + 4 + params[3];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Данный метод вынесен отдельно, чтобы можно было переопределять папки
  return _.pGetSourceImageForDrawPictureSized = function(name) {
    return ImageManager.loadPicture(name);
  };
});


// Generated by CoffeeScript 2.6.1



// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var FloatingWindow;
  
    // * Общий класс для всех окон на карте
  /*parameters
      {
          draggable: true,
          closeButton: true,
          moveToCenter: true,
          alwaysOnTop: true,
          header: true
      }
  */
  FloatingWindow = class FloatingWindow extends KDCore.Sprite {
    constructor(mainParent, windowW, windowH, parameters) {
      super();
      this.mainParent = mainParent;
      this.windowW = windowW;
      this.windowH = windowH;
      this.parameters = parameters;
      this._init();
      return;
    }

    static StaticSettings() {
      return {
        draggable: false,
        closeButton: false,
        moveToCenter: false,
        alwaysOnTop: false,
        header: false
      };
    }

    // * Статическое окно с дочерним
    static StaticWindow(parent, sub) {
      var p, w;
      p = KDCore.FloatingWindow.StaticSettings();
      w = new KDCore.FloatingWindow(parent, sub.width, sub.height, p);
      w.setSubWindow(sub);
      w.open();
      return w;
    }

    isActive() {
      return this.visible === true;
    }

    isReady() {
      return this._isReady === true;
    }

    isMouseIn() {
      return this.inPosition(TouchInput);
    }

    isOpen() {
      return this.isActive();
    }

    // * Дочернее окно (если есть)
    sub() {
      return this._subw;
    }

    setOnReadyHandler(_readyHandler) {
      this._readyHandler = _readyHandler;
      if ((this._readyHandler != null) && this._isReady === true) {
        return this._readyHandler();
      }
    }

    isDraggable() {
      return this._isDraggable === true && (this._headerSpr != null) && this._headerSpr.visible === true && this.isOpen();
    }

    setCloseHandler(_closeHandler) {
      this._closeHandler = _closeHandler;
    }

    callCloseHandler() {
      if (this._closeHandler != null) {
        return this._closeHandler();
      }
    }

    setDraggingHandler(_dragHandler) {
      this._dragHandler = _dragHandler;
    }

    setDragEndHandler(_dragEndHandler) {
      this._dragEndHandler = _dragEndHandler;
    }

    hideHeader() {} //TODO:

    hideCloseButton() {} //TODO:

    
      // * Сдвиг заголовка по X, чтобы рамку не задевал
    headerMarginX() {
      return 2;
    }

    // * Сдвиг заголовка по Y, чтобы рамку не задевал
    headerMarginY() {
      return 0;
    }

    // * Стандартная позиция кнопки "закрыть"
    closeButtonPosition() {
      return {
        x: this.width - 24,
        y: 4
      };
    }

    open() {
      if (this.isOpen()) {
        return;
      }
      this._open();
      this._afterOpen();
    }

    close() {
      if (!this.isOpen()) {
        return;
      }
      this._close();
      this._afterClose();
    }

    rootImageFolder() {
      return "Alpha/Windows";
    }

    update() {
      super.update();
      this._updateMouseCheckThread();
      this._updateDragging();
    }

    // * Добавить спрайт на специальный слой контента
    addContent(sprite) {
      return this._contentLayer.addChild(sprite);
    }

    // * Добавить дочернее окно
    setSubWindow(w) {
      this._subw = w;
      this.addContent(w);
    }

    destroy() {
      this._close();
      return Sprite.prototype.destroy.call(this);
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = FloatingWindow.prototype;
    _._init = function() {
      var ref;
      // * Окно всегда закрыто
      this.visible = false;
      // * Контент прогрузился?
      this._isReady = false;
      this._applyParameters();
      if (this._isAlwaysOnTop === false) {
        // * Если не всегда поверх окон, то добавляем сразу к родителю (один раз)
        if ((ref = this.mainParent) != null) {
          ref.addChild(this);
        }
      }
      this._initFloatingSystem();
      this._createLayers();
      this._loadWindowFrame();
    };
    // * Тут ничего не создавать, не двигать, так как
    // * конент создаётся Async, см. метод _createCustomElements
    _._applyParameters = function() {
      var p;
      this._applyDefaults();
      if (this.parameters == null) {
        return;
      }
      p = this.parameters;
      if (p.draggable != null) {
        this._isDraggable = p.draggable;
      }
      if (p.moveToCenter != null) {
        this._isMoveToCenter = p.moveToCenter;
      }
      if (p.header != null) {
        this._isHeaderVisible = p.header;
      }
      if (p.closeButton != null) {
        this._isHaveCloseButton = p.closeButton;
      }
      if (p.alwaysOnTop != null) {
        this._isAlwaysOnTop = p.alwaysOnTop;
      }
    };
    _._applyDefaults = function() {
      // * Окно можно перетаскивать мышкой (по умолчанию - да)
      this._isDraggable = true;
      this._isMoveToCenter = true;
      this._isHeaderVisible = true;
      this._isHaveCloseButton = true;
      this._isAlwaysOnTop = true;
    };
    _._initFloatingSystem = function() {
      if ($gameTemp._floatingWindows == null) {
        // * Создаём массив окон, он нужен для правильного
        // закрытия окон (по очереди) и перемещения drag and drop
        // с учётом верхнего окна
        $gameTemp._floatingWindows = [];
      }
      // * Вспомогательная переменная, чтобы не вызывать методы каждый кадр
      this._mouseIn = false;
      // * Тоже вспомогательная переменная
      this._dragging = false;
    };
    _._moveToStartPosition = function() {
      if (this._isMoveToCenter === true) {
        return this.moveToCenter(Graphics.width / 2, Graphics.height / 2);
      }
    };
    _._closeButtonClick = function() {
      // * При исчезании, кнопка не успевает себя "удалить"
      $gameTemp.kdButtonUnderMouse = null;
      this.callCloseHandler();
      return this.close();
    };
    (function() {      // * DRAGGING
      // -----------------------------------------------------------------------
      _._updateDragging = function() {
        if (!this.isDraggable()) {
          return;
        }
        // * Если мы уже двигаем окно, но мышка вышла за границы, то можно дальше двигать
        // * Только если мышка не в окне и не двигали ранее, то не проверяем
        if (this._mouseIn === false && this._dragging === false) {
          return;
        }
        // * Если существует объект который сейчас dragging
        if ($gameTemp.pkdDraggableInstance != null) {
          // * Если этот объект не этот объект, то выходим из метода
          if ($gameTemp.pkdDraggableInstance !== this) {
            return;
          }
        }
        if (TouchInput.isLongPressed()) {
          if (this._dragging === false) {
            this._onDragStart();
          } else {
            this._onDragging();
          }
        } else {
          this._stopDragging();
        }
      };
      _._onDragStart = function() {
        // * Проверка, в области Header или нет
        if (!this._isMouseInHeader()) {
          return;
        }
        // * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
        this.opacity = 200;
        this._deltaXY = this.getDeltaXY();
        this._dragging = true;
        // * Устанавливаем глобальную ссылку на объект перемещения
        $gameTemp.pkdDraggableInstance = this;
      };
      _.getDeltaXY = function() {
        var p;
        p = new KDCore.Point(this.x, this.y);
        return p.delta(TouchInput);
      };
      _._onDragging = function() {
        // * Защита от перетаскивания за края экрана
        if (!this._isNewMousePositionOnScreen()) {
          return;
        }
        this.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
        if (this._dragHandler != null) {
          return this._dragHandler();
        }
      };
      _._stopDragging = function() {
        if (this._dragging === true) {
          this._dragging = false;
          this.opacity = 255;
          this._clearDraggableGlocalInstance();
          if (this._dragEndHandler != null) {
            this._dragEndHandler();
          }
        }
      };
      // * Освобождаем глобальную ссылку
      _._clearDraggableGlocalInstance = function() {
        if ($gameTemp.pkdDraggableInstance === this) {
          return $gameTemp.pkdDraggableInstance = null;
        }
      };
      _._isMouseInHeader = function() {
        if (this._headerSpr == null) {
          return false;
        }
        return this._headerSpr.isContainsPoint(TouchInput);
      };
      _._isNewMousePositionOnScreen = function() {
        return KDCore.Utils.isPointInScreen(TouchInput, 10);
      };
    })();
    (function() {      // -----------------------------------------------------------------------

      // * CREATE ELEMENTS
      // -----------------------------------------------------------------------
      
      // * Слои нужны, так как изображения загружаються асинхронно
      _._createLayers = function() {
        this._mainLayer = new Sprite();
        this._contentLayer = new Sprite();
        this._headerLayer = new Sprite();
        this._closeButtonLayer = new Sprite();
        this.addChild(this._mainLayer);
        this.addChild(this._contentLayer);
        this.addChild(this._headerLayer);
        this.addChild(this._closeButtonLayer);
      };
      _._loadWindowFrame = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "windowFrame").then(this._createWindow.bind(this));
      };
      _._createWindow = function(frameImage) {
        this.bitmap = new Bitmap(this.windowW, this.windowH);
        this.wFrame = new KDCore.Sprite_TilingFrame(this.windowW, this.windowH, frameImage);
        this._mainLayer.addChild(this.wFrame);
        this._createParts();
      };
      _._createParts = function() {
        this._loadHeader();
        if (this._isHaveCloseButton === true) {
          this._createCloseButton();
        }
        this._moveToStartPosition();
        this._createCustomElements();
        // * Окно готово
        this._isReady = true;
        if (this._readyHandler != null) {
          this._readyHandler();
        }
      };
      _._loadHeader = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "headerLine").then(this._createHeader.bind(this));
      };
      _._createHeader = function(headerLineImage) {
        var w;
        w = this.windowW - (this.headerMarginX() * 2);
        this._headerSpr = new KDCore.Sprite_TilingLine(w, headerLineImage.height, headerLineImage);
        this._headerSpr.x = this.headerMarginX();
        this._headerSpr.y = this.headerMarginY();
        this._headerLayer.addChild(this._headerSpr);
        if (this._isHeaderVisible === true) {
          // * Сдвигаем контент, чтобы было начало под заголовком
          this._contentLayer.y += headerLineImage.height + this.headerMarginY();
        } else {
          this._headerSpr.visible = false;
        }
      };
      _._createCloseButton = function() {
        this._closeButton = new KDCore.ButtonM("windowCloseButton", false, this.rootImageFolder());
        this._closeButtonLayer.addChild(this._closeButton);
        this._closeButton.move(this.closeButtonPosition());
        this._closeButton.addClickHandler(this._closeButtonClick.bind(this));
      };
      //%[FOR CHILDRENS]
      // * Наследники создают свои элементы в этом методе
      // * Есть специальный метод addContent()
      _._createCustomElements = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * MOUSE
      // -----------------------------------------------------------------------
      
      // * Определение если мышка в области окна
      //TODO: Есть проблема при открытии окна сразу под курсором
      _._registerMouseInOut = function() {
        if (!this.isOpen()) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._mouseIn === false) {
            this._mouseIn = true;
            this._onMouseIn();
          }
        } else {
          if (this._mouseIn === true) {
            this._mouseIn = false;
            this._onMouseOut();
          }
        }
      };
      // * Используется похожая система что и в KDCore.ButtonM
      _._onMouseIn = function() {
        return $gameTemp.floatingWindowUnderMouse = this;
      };
      _._onMouseOut = function() {
        if ($gameTemp.floatingWindowUnderMouse === this) {
          return $gameTemp.floatingWindowUnderMouse = null;
        }
      };
      // * Будем проверять мышка ли в окне только при открытом окне
      _._createMouseCheckThread = function() {
        this._mouseCheckThread = new KDCore.TimedUpdate(1, this._registerMouseInOut.bind(this));
        this._updateMouseCheckThread = () => {
          return this._mouseCheckThread.update();
        };
        return this._mouseCheckThread.call();
      };
      // * Когда окно закрывается, никаких проверок, обнуляем метод
      _._destroyMouseCheckThread = function() {
        this._mouseCheckThread = null;
        return this._updateMouseCheckThread = function() {};
      };
      //?DYNAMIC
      _._updateMouseCheckThread = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * OPEN OR CLOSE
      // -----------------------------------------------------------------------
      _._open = function() {
        var ref, ref1;
        this.visible = true;
        if ((ref = $gameTemp._floatingWindows) != null) {
          ref.push(this);
        }
        if (this._isAlwaysOnTop === true) {
          // * Окно, которое открывается, всегда снова выше остальных (опция)
          if ((ref1 = this.mainParent) != null) {
            ref1.addChild(this);
          }
        }
        return this._createMouseCheckThread();
      };
      _._afterOpen = function() {}; // * EMPTY
      _._close = function() {
        this.visible = false;
        if (this._isAlwaysOnTop === true) {
          this.removeFromParent();
        }
        this._clearDraggableGlocalInstance();
        $gameTemp._floatingWindows.delete(this);
        this._onMouseOut();
        return this._destroyMouseCheckThread();
      };
      _._afterClose = function() {}; // * EMPTY
    })();
  })();
  (function() {    // ■ END PRIVATE.coffee
    //---------------------------------------------------------------------------

    // * Если окно под курсором, нельзя нажимать на карте для движения игрока
    // -----------------------------------------------------------------------
    (function() {      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ Scene_Map.coffee
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var ALIAS__isAnyButtonPressed, ALIAS__processMapTouch, _;
      
      //@[DEFINES]
      _ = Scene_Map.prototype;
      if (KDCore.isMZ()) {
        //@[ALIAS]
        ALIAS__isAnyButtonPressed = _.isAnyButtonPressed;
        _.isAnyButtonPressed = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return true;
          } else {
            return ALIAS__isAnyButtonPressed.call(this);
          }
        };
      } else {
        //@[ALIAS]
        ALIAS__processMapTouch = _.processMapTouch;
        _.processMapTouch = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return;
          }
          return ALIAS__processMapTouch.call(this);
        };
      }
    })();
  })();
  //@[EXTEND]
  // ■ END Scene_Map.coffee
  //---------------------------------------------------------------------------
  return KDCore.FloatingWindow = FloatingWindow;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var HUI;
  // * Html UI Manager
  // * Набор инструментов для работы с HTML элементами интерфейса
  HUI = function() {};
  (function() {
    var _;
    //@[DEFINES]
    _ = HUI;
    _.init = function() {
      // * Данный набор инструментов могут использовать многие плагины, поэтому проверка
      if (this.isInited()) {
        return;
      }
      this._createMainParentInHtml();
      this._extendGraphicsClass();
      this.refresh();
    };
    // * Был ли создан (инициализирован) основной элемент
    _.isInited = function() {
      return this.parent() != null;
    };
    // * Основной элемент родитель для всех элементов UI
    _.parent = function() {
      return this._parent;
    };
    _.refresh = function() {
      if (!this.isInited()) {
        return;
      }
      Graphics._centerElement(this._parent);
      this._parent.style.zIndex = 2;
      this._parent.style.width = Graphics._canvas.style.width;
      this._parent.style.height = Graphics._canvas.style.height;
    };
    _.initReactComponents = function(withBabel = true) {
      var e;
      try {
        if (withBabel) {
          this._loadBabel();
        }
        return this._loadReact();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._loadBabel = function() {
      var e;
      try {
        return this._loadScript('https://unpkg.com/babel-standalone@6/babel.min.js');
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._loadReact = function() {
      var e;
      try {
        this._loadScript('https://unpkg.com/react@18/umd/react.production.min.js');
        return this._loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._loadScript = function(src, isReact = false) {
      var e, script;
      try {
        script = document.createElement("script");
        if (isReact === true) {
          script.type = "text/babel";
        } else {
          script.type = "text/javascript";
          script.crossorigin = true;
        }
        script.src = src;
        script.async = false;
        script.defer = true;
        script.onerror = function(e) {
          KDCore.warning('HUI: Failed to load script');
          return KDCore.warning(e);
        };
        document.body.appendChild(script);
        if (isReact === true) {
          return window.dispatchEvent(new Event('DOMContentLoaded'));
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.loadReactComponent = function(componentName, folder = 'data/uiComponents') {
      var e, src;
      try {
        src = folder + "/" + componentName + ".js";
        return this._loadScript(src, true);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.addReactComponent = function(componentName, props, uniqueId = null) {
      var e, element, reactElement, root;
      try {
        if (window[componentName] == null) {
          KDCore.warning("Cant find " + componentName + ", make sure to load it first");
          return null;
        }
        if (uniqueId == null) {
          uniqueId = componentName;
        }
        // * Создаём отдельный DIV для каждого элемента (чтобы можно было удалять)
        element = this._getElementForReactComponent(uniqueId);
        root = ReactDOM.createRoot(element);
        reactElement = React.createElement(window[componentName], props);
        root.render(reactElement);
        return KDCore.HUI.getElement(uniqueId);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    // * Simple React Component (without JSX!)
    _.loadReactComponentFromFile = function(filename, props, uniqueId, handler, folder = "data/uiComponents") {
      var e, url, xhr;
      try {
        xhr = new XMLHttpRequest();
        url = folder + "/" + filename + ".js";
        xhr.open("GET", url);
        xhr.overrideMimeType("plain/text");
        xhr.onload = function() {
          var e, element;
          eval(xhr.responseText);
          element = KDCore.HUI.addReactComponent(filename, props, uniqueId);
          try {
            if (handler != null) {
              return handler(element, filename);
            }
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        return xhr.send();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._getElementForReactComponent = function(componentId) {
      var e, element;
      try {
        this.removeElementById(componentId);
        element = this.addElement(componentId, '', null);
        return element;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return null;
    };
    _.loadElementFromFile = function(filename, handler, folder = "data/uiComponents") {
      var e, url, xhr;
      try {
        xhr = new XMLHttpRequest();
        url = folder + "/" + filename + ".html";
        xhr.open("GET", url);
        xhr.overrideMimeType("plain/text");
        xhr.onload = function() {
          var e, element, htmlElementText;
          // * Хотел отдельные данные передавать и заменять в HTML текст
          // * Но если у нас есть React компоненты, то это не надо
          //htmlElementText = @convertDataKeys(xhr.responseText, dataKeys)
          htmlElementText = xhr.responseText;
          element = KDCore.HUI.addElement(filename, htmlElementText, null);
          try {
            if (handler != null) {
              return handler(element, filename);
            }
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        return xhr.send();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.addCSS = function(name, folder = "css") {
      var head;
      if (!this.isInited()) {
        this.init();
      }
      head = document.getElementsByTagName("head")[0];
      if (head != null) {
        head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"$0/$1.css\" />".replace("$0", folder).replace("$1", name));
      }
    };
    _.addElement = function(id, html, classes = null) {
      var cls, element, i, len;
      if (!this.isInited()) {
        this.init();
      }
      element = document.createElement("div");
      element.id = id;
      element.innerHTML = html;
      if (classes != null) {
        for (i = 0, len = classes.length; i < len; i++) {
          cls = classes[i];
          element.classList.add(cls);
        }
      }
      this._parent.appendChild(element);
      return element;
    };
    _.appendElement = function(element) {
      var e;
      try {
        return this._parent.appendChild(element);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Может быть NULL
    _.getElement = function(id) {
      return document.getElementById(id);
    };
    _.removeElement = function(element) {
      if (element == null) {
        return;
      }
      if (KDCore.SDK.isString(element)) {
        this.removeElementById(element);
      } else {
        this.removeElementById(element.id);
      }
    };
    _.removeElementById = function(elementId) {
      var element;
      if (!this.isInited()) {
        return;
      }
      element = this.getElement(elementId);
      if (element != null) {
        this._parent.removeChild(element);
      }
    };
    // * PRIVATE ------------------------------------------------------------------
    _._createMainParentInHtml = function() {
      this._parent = document.createElement("div");
      this._parent.id = "KDCoreMain";
      document.body.appendChild(this._parent);
    };
    _._extendGraphicsClass = function() {
      var ALIAS___updateCanvas;
      //@[ALIAS]
      ALIAS___updateCanvas = Graphics._updateCanvas;
      Graphics._updateCanvas = function() {
        ALIAS___updateCanvas.call(this);
        return KDCore.HUI.refresh();
      };
    };
  })();
  //@[EXTEND]
  return KDCore.HUI = HUI;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
  // * Right mouse pressed
  // * Определение когда правая (вторая) кнопка мыши зажата и удерживается

  //@[DEFINES]
  _ = TouchInput;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    this._kdMousePressed2 = false;
    this._kdPressedTime2 = 0;
  };
  //@[ALIAS]
  ALIAS___onRightButtonDown = _._onRightButtonDown;
  _._onRightButtonDown = function(event) {
    var check;
    ALIAS___onRightButtonDown.call(this, event);
    // * Это значит что ALIAS метод прошёл (верные X и Y в Canvas)
    if (KDCore.isMZ()) {
      check = this._newState.cancelled === true;
    } else {
      check = this._events.cancelled === true;
    }
    if (check === true) {
      this._kdMousePressed2 = true;
      this._kdPressedTime2 = 0;
    }
  };
  //@[ALIAS]
  ALIAS___onMouseUp = _._onMouseUp;
  _._onMouseUp = function(event) {
    ALIAS___onMouseUp.call(this, event);
    if (event.button === 2) {
      this._kdMousePressed2 = false;
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.kdIsPressed2()) {
      return this._kdPressedTime2++;
    }
  };
  //?[NEW]
  return _.kdIsPressed2 = function() {
    return this._kdMousePressed2 === true;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Методы из RPG Maker MZ которых нет в RPG Maker MV
  if (KDCore.isMZ()) {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Scene_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Scene_Base.prototype;
    _.calcWindowHeight = function(numLines, selectable) {
      if (selectable === true) {
        return Window_Selectable.prototype.fittingHeight(numLines);
      } else {
        return Window_Base.prototype.fittingHeight(numLines);
      }
    };
  })();
  (function() {    // ■ END Scene_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    _.itemLineRect = function(index) {
      return this.itemRect(index);
    };
  })();
  (function() {    // ■ END Window_Selectable.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__initialize, ALIAS__processEscapeCharacter, _;
    //@[DEFINES]
    _ = Window_Base.prototype;
    // * Чтоб можно было Rectangle принимать в конструктор
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(x, y, w, h) {
      if (x instanceof PIXI.Rectangle || x instanceof Rectangle) {
        return ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
      } else {
        return ALIAS__initialize.call(this, ...arguments);
      }
    };
    
    // * В MZ используется FS для изменения размера шрифта в тексте
    //@[ALIAS]
    ALIAS__processEscapeCharacter = _.processEscapeCharacter;
    _.processEscapeCharacter = function(code, textState) {
      if (code === "FS") {
        this.contents.fontSize = this.obtainEscapeParam(textState);
      } else {
        ALIAS__processEscapeCharacter.call(this, code, textState);
      }
    };
  })();
  (function() {    // ■ END Window_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Spriteset_Map.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Spriteset_Map.prototype;
    _.findTargetSprite = function(target) {
      return this._characterSprites.find(function(sprite) {
        return sprite.checkCharacter(target);
      });
    };
  })();
  return (function() {    // ■ END Spriteset_Map.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Sprite_Character.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Sprite_Character.prototype;
    _.checkCharacter = function(character) {
      return this._character === character;
    };
  })();
});

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_SM_processMapTouch, alias_TIOMM;
  //?SMouse better alternative
  if (KDCore.isMZ()) {
    return;
  }
  // * Для ButtonM
  //@[ALIAS]
  alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
    if ($gameTemp.kdButtonUnderMouse != null) {
      if ($gameTemp.kdButtonUnderMouse.parent == null) {
        return $gameTemp.kdButtonUnderMouse = null;
      } else {

      }
    } else {
      return alias_SM_processMapTouch.call(this);
    }
  };
  //@[ALIAS]
  alias_TIOMM = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    var x, y;
    alias_TIOMM.call(this, event);
    x = Graphics.pageToCanvasX(event.pageX);
    y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      return this._onHover(x, y);
    }
  };
  
  //?NEW, from MZ
  return TouchInput._onHover = function(_x, _y) {
    this._x = _x;
    this._y = _y;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__clear, ALIAS__update, _;
  if (KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Input;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    return this._virtualButton = null;
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._virtualButton == null) {
      return;
    }
    this._latestButton = this._virtualButton;
    this._pressedTime = 0;
    return this._virtualButton = null;
  };
  return _.virtualClick = function(buttonName) {
    return this._virtualButton = buttonName;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___startLoading, _;
  // * В версии RPG Maker MZ 1.5.0 появился баг что картинки не успевают прогрузится
  // * Данный фикс, возвращает старое поведение
  if (!KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Bitmap.prototype;
  //@[ALIAS]
  ALIAS___startLoading = _._startLoading;
  return _._startLoading = function() {
    if (Utils.hasEncryptedImages()) {
      ALIAS___startLoading.call(this, ...arguments);
    } else {
      // * Это из RPG Maker MZ до версии 1.5
      this._image = new Image();
      this._image.onload = this._onLoad.bind(this);
      this._image.onerror = this._onError.bind(this);
      this._destroyCanvas();
      this._loadingState = "loading";
      this._image.src = this._url;
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Builder;
  Builder = {};
  (function() {    //NUI 1.0
    //rev 18.08.24
    var _;
    //@[DEFINES]
    _ = Builder;
    _.Factory = function(jsonCollection, owner, exRefresh = 0) {
      var e, item, items, j, key, len, value;
      try {
        if (jsonCollection == null) {
          return;
        }
        items = [];
        for (key in jsonCollection) {
          value = jsonCollection[key];
          item = KDCore.UI.Builder.Make(value, owner);
          if (item != null) {
            items.push(item); // * Skip not UI elements definitions
          }
        }
//owner[key] = item if owner?
        for (j = 0, len = items.length; j < len; j++) {
          item = items[j];
          item.refreshBindings(owner, true);
        }
        // * Обновить привязки через MS ещё раз
        if (exRefresh > 0) {
          setTimeout((function() {
            var e, k, len1, results;
            try {
              results = [];
              for (k = 0, len1 = items.length; k < len1; k++) {
                item = items[k];
                results.push(item.refreshBindings(owner, true));
              }
              return results;
            } catch (error) {
              e = error;
              return KDCore.warning(e);
            }
          }), exRefresh);
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return items;
    };
    _.Make = function(jsonStructure, owner = null, parent = null) {
      var bindings, child, childrens, dataObject, e, item, j, len, parameters, shortcutData, subItem, type, value;
      try {
        if (jsonStructure == null) {
          return null;
        }
        if (jsonStructure.type == null) {
          return null;
        }
        if (jsonStructure.shortcut != null) {
          shortcutData = KDCore.UI.Builder.ConvertShortcut(jsonStructure.shortcut);
          ({type, parameters} = shortcutData);
        } else {
          ({type, parameters} = jsonStructure);
        }
        if (typeof parameters === "string") {
          parameters = KDCore.UI.Builder.ConvertShortcut(parameters);
        }
        if (jsonStructure.createIf != null) {
          value = this._convertBindingValue(owner, jsonStructure.createIf);
          if (value !== true) {
            return null;
          }
        }
        item = KDCore.UI.Builder.CreateItemByType(type, parameters);
        if (item == null) {
          return null;
        }
        ({dataObject, bindings, childrens} = jsonStructure);
        // * Parent нужен чтобы работали настройки положения (center, %) и т.д.
        if (parent != null) {
          parent.addChild(item);
        } else {
          // * Owner - это не только главный родитель, но и к кому мы
          // * прописываем все поля по ID
          if (owner != null) {
            owner.addChild(item);
          }
        }
        // * Сохраняем схему (но только этого элемента, без "детей")
        item.uiJsonScheme = Object.assign({}, jsonStructure, {
          childrens: []
        });
        // * Константы доступны не только у каждого элемента в схеме, но и у общего родителя
        if (jsonStructure.constants != null) {
          if (item.uiConstants == null) {
            item.uiConstants = {};
          }
          item.uiConstants = Object.assign(item.uiConstants, jsonStructure.constants);
          if (owner != null) {
            if (owner.uiConstants == null) {
              owner.uiConstants = {};
            }
            owner.uiConstants = Object.assign(owner.uiConstants, jsonStructure.constants);
          }
        }
        if (bindings != null) {
          if (dataObject == null) {
            dataObject = owner;
          }
          KDCore.UI.Builder.ApplyBindings(item, bindings, dataObject);
        }
        try {
          if (jsonStructure.effects != null) {
            KDCore.UI.Builder.ApplyEffects(item, jsonStructure.effects);
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        if ((childrens != null) && childrens.length > 0) {
          for (j = 0, len = childrens.length; j < len; j++) {
            child = childrens[j];
            // * Дети всегда имеют родителя - этот элемент (а не owner)
            subItem = KDCore.UI.Builder.Make(child, owner, item);
          }
        }
        if (jsonStructure.id != null) {
          item.id = jsonStructure.id;
          if (owner != null) {
            owner[jsonStructure.id] = item;
          }
        }
        if (jsonStructure.parent != null) {
          parent = jsonStructure.parent;
          if ((owner != null) && (owner[parent] != null)) {
            owner[parent].addChild(item);
          }
        }
        // * Update bindings for recalculate Positions and Sizes
        if (bindings != null) {
          KDCore.UI.Builder.RefreshBindings(item, dataObject);
        }
        if (jsonStructure.position != null) {
          item.setPosition(jsonStructure.position);
        }
        try {
          if (jsonStructure.animations != null) {
            KDCore.UI.Builder.ApplyAnimations(item, jsonStructure.animations);
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        return item;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return null;
    };
    // * dataObject может быть Null, если нет binding c $
    _.ApplyBindings = function(uiElement, bindings, dataObject) {
      var dataBindings, e, field, value;
      try {
        if (uiElement == null) {
          return;
        }
        if (bindings == null) {
          return;
        }
        if (uiElement.dataBindings == null) {
          return;
        }
        dataBindings = uiElement.dataBindings();
        if (dataBindings == null) {
          return;
        }
        for (field in dataBindings) {
          if (bindings[field] != null) {
            value = this.ConvertBindingValue(dataObject, bindings[field], uiElement);
            dataBindings[field].call(uiElement, value);
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.RefreshBindings = function(uiElement, dataObject) {
      var bindings, e;
      try {
        if (uiElement == null) {
          return;
        }
        if (uiElement.uiJsonScheme == null) {
          return;
        }
        ({bindings} = uiElement.uiJsonScheme);
        if (bindings == null) {
          return;
        }
        KDCore.UI.Builder.ApplyBindings(uiElement, bindings, dataObject);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.ApplyEffects = function(uiElement, effects) {
      var alpha, color, e, ef, efData, effectsArray, j, len, quality, thickness;
      try {
        if (uiElement == null) {
          return;
        }
        if (effects == null) {
          return;
        }
        //TODO: Преобразование цвета!
        effectsArray = [];
        for (j = 0, len = effects.length; j < len; j++) {
          ef = effects[j];
          if (ef == null) {
            continue;
          }
          efData = KDCore.UI.Builder.ConvertShortcut(ef);
          if ((efData.shadow != null) && KDCore.isMZ()) {
            effectsArray.push(new PIXI.filters.DropShadowFilter(efData));
          }
          if ((efData.outline != null) && KDCore.isMZ()) {
            ({thickness, color, quality} = efData);
            if (thickness == null) {
              thickness = 1;
            }
            if (color == null) {
              color = 0xffffff;
            }
            effectsArray.push(new PIXI.filters.OutlineFilter(thickness, color, quality));
          }
          if (efData.glow != null) {
            effectsArray.push(new PIXI.filters.GlowFilter(efData));
          }
          if (efData.tint != null) {
            ({color, alpha} = efData);
            if (alpha == null) {
              alpha = 0.5;
            }
            effectsArray.push(new PIXI.filters.ColorOverlayFilter(color, alpha));
          }
        }
        if (effectsArray.length > 0) {
          return uiElement.filters = effectsArray;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.ApplyAnimations = function(uiElement, animations) {
      var a, e, j, len;
      try {
        if (uiElement == null) {
          return;
        }
        if (animations == null) {
          return;
        }
        if (uiElement.addAnimationRule == null) {
          return;
        }
        if (animations.length === 0) {
          return;
        }
        for (j = 0, len = animations.length; j < len; j++) {
          a = animations[j];
          if (typeof a === 'string') {
            a = KDCore.UI.Builder.ConvertShortcut(a);
          }
          if (a != null) {
            uiElement.addAnimationRule(a);
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.ConvertBindingValue = function(sourceObj, bindingValue, element = null) {
      var e, i, j, ref, text, value;
      try {
        if (bindingValue instanceof Array) {
          text = bindingValue[0];
          for (i = j = 1, ref = bindingValue.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
            if (bindingValue[i] == null) {
              continue;
            }
            value = this.ConvertBindingValue(sourceObj, bindingValue[i], element);
            if (value != null) {
              text = text.replace("%" + i, value);
            }
          }
          return text;
        } else {
          return this._convertBindingValue(sourceObj, bindingValue, element);
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return bindingValue;
    };
    _.CreateItemByType = function(type, initialParameters = {}) {
      var e;
      try {
        // * SHOULD HAVE: dataBingins(size), realWidth, realHeight
        switch (type) {
          case 'button':
            return new KDCore.Sprite_SButton(initialParameters);
          case 'text':
            return new KDCore.UI.Sprite_UIText2(initialParameters);
          case 'plane':
            return new KDCore.Sprite_Plane(initialParameters);
          case 'rect':
            return new KDCore.Sprite_BaseRect(initialParameters);
          case 'image':
            return new KDCore.Sprite_Image(initialParameters);
          case 'legacyText':
            return new KDCore.UI.Sprite_UIText(initialParameters);
          case 'textExt':
            return new KDCore.UI.Sprite_UITextExt(initialParameters);
          case 'group':
            return new KDCore.Sprite_Group(initialParameters);
          case 'legacyButton':
            return new KDCore.Sprite_ImgButton(initialParameters);
          case 'circle':
            return new KDCore.Sprite_BaseCircle(initialParameters);
          case 'gauge':
            return new KDCore.Sprite_Gauge(initialParameters);
          case 'list':
            return new KDCore.Sprite_ItemsListN(initialParameters);
          case 'horList':
            return new KDCore.Sprite_ItemsListNHor(initialParameters);
          case 'screen':
            return new KDCore.Sprite_Screen(initialParameters);
          case 'face':
            return new KDCore.Sprite_ActorFace(initialParameters);
          case 'textPro':
            return new KDCore.Sprite_TextPro(initialParameters);
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return null;
    };
    _._convertValueDataFromShortcut = function(valueData) {
      var data, e, item, j, len, n, outerItems, p, v;
      try {
        if (valueData.contains("|")) {
          data = {};
          outerItems = valueData.split("|");
          for (j = 0, len = outerItems.length; j < len; j++) {
            item = outerItems[j];
            p = item.split("=");
            n = p.shift();
            v = p;
            if (v.length === 0) {
              v = true;
            } else {
              if (v.length === 1) {
                v = v[0];
                if (isFinite(v)) {
                  v = Number(v);
                }
              } else {
                v = KDCore.UI.Builder._convertValueDataFromShortcut(v.join("="));
              }
            }
            data[n] = v;
          }
          return data;
        }
        data = KDCore.UI.Builder.ConvertShortcut(valueData, ",", "=");
        return data;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.ConvertShortcut = function(shortcut, outerSep = ";", innerSep = ":") {
      var config, e, j, len, pair, value, valueData, valueName, values;
      try {
        config = {};
        values = shortcut.split(outerSep);
//console.log(values)
        for (j = 0, len = values.length; j < len; j++) {
          value = values[j];
          if (!String.any(value)) {
            continue;
          }
          pair = value.split(innerSep);
          valueName = pair[0];
          valueData = pair[1];
          if (String.any(valueData) && valueData.contains("=")) {
            valueData = KDCore.UI.Builder._convertValueDataFromShortcut(valueData);
          } else {
            if (valueData == null) {
              valueData = true;
            } else {
              if (isFinite(valueData)) {
                valueData = Number(valueData);
              }
            }
          }
          config[valueName] = valueData;
        }
        //console.log(valueName, valueData)
        return config;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._convertBindingValue = function(sourceObj, bindingValue, element = null) {
      var captured, dpValue, e, evalString, r, result, resultValue;
      try {
        if (typeof bindingValue === 'string') {
          // * Replace all HDP
          if (bindingValue.contains("hdp")) {
            r = new RegExp("(\\d+)hdp", "g");
            result = r.exec(bindingValue);
            while ((result != null)) {
              dpValue = Number(result[1]);
              resultValue = KDCore.Utils.convertDP(dpValue, true);
              bindingValue = bindingValue.replace(/(\d+)hdp/, resultValue);
              result = r.exec(bindingValue);
            }
          }
          // * Replace all DP
          if (bindingValue.contains("dp")) {
            r = new RegExp("(\\d+)dp", "g");
            result = r.exec(bindingValue);
            while ((result != null)) {
              dpValue = Number(result[1]);
              resultValue = KDCore.Utils.convertDP(dpValue, false);
              bindingValue = bindingValue.replace(/(\d+)dp/, resultValue);
              result = r.exec(bindingValue);
            }
          }
          // * FORCE EVAL
          if (bindingValue.contains("@") && bindingValue[0] === "@") {
            evalString = bindingValue.replace("@", "");
            return eval(evalString);
          }
          // * EXTRA $ calculations
          if (bindingValue.contains("~") && bindingValue[0] === "~") { // * POST EVAL
            if (bindingValue.contains("$")) {
              r = new RegExp("(\\$[\\w+.]*)", "g");
              result = r.exec(bindingValue);
              if (result != null) {
                //console.log(result)
                captured = result[1];
                if (String.any(captured)) {
                  resultValue = this._convertSingleBindingValue$(sourceObj, captured, element);
                  if (resultValue == null) {
                    return null;
                  }
                  if (typeof resultValue === 'function') {
                    return resultValue;
                  } else {
                    if (String.any(resultValue)) {
                      bindingValue = bindingValue.replace(captured, resultValue);
                      return this._convertBindingValue(sourceObj, bindingValue, element);
                    } else {
                      return null;
                    }
                  }
                }
              }
            } else {
              evalString = bindingValue.replace("~", "");
              return eval(evalString);
            }
          }
          
          // * Default old style simple $
          if (bindingValue.contains("$")) {
            return this._convertSingleBindingValue$(...arguments);
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return bindingValue;
    };
    _._convertSingleBindingValue$ = function(sourceObj, bindingValue, element) {
      var e, field, parts, subData, subField;
      try {
        field = bindingValue.replace("$", "");
        if (field.contains(".")) { //$parent.width
          parts = field.split(".");
          // * Только одно вхождение
          field = parts[0];
          subField = parts[1];
          if (!String.any(field) && String.any(subField)) {
            if (element != null) {
              return this._convertSingleBindingValue$(element, "$" + subField, element);
            } else {
              return null;
            }
          }
          if (String.any(field) && !String.any(subField)) {
            return this._convertSingleBindingValue$(sourceObj, "$" + field, element);
          }
          if (sourceObj != null) {
            if (typeof sourceObj[field] === 'function') {
              subData = sourceObj[field]();
            } else {
              subData = sourceObj[field];
            }
            return this._convertSingleBindingValue$(subData, "$" + subField, element);
          } else {
            return null;
          }
        } else {
          if ((sourceObj != null) && (sourceObj[field] != null)) {
            if (typeof sourceObj[field] === 'function') {
              return sourceObj[field]();
            } else {
              return sourceObj[field];
            }
          } else {
            return null; // * We can't find value
          }
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  //@[EXTEND]
  KDCore.UI = KDCore.UI || {};
  return KDCore.UI.Builder = Builder;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_WBDTEX_KDCore29122021;
  // * <center>, для RPG Maker MZ и если нету Visu Message Core
  if (KDCore.isMZ()) {
    alias_WBDTEX_KDCore29122021 = Window_Base.prototype.drawTextEx;
    Window_Base.prototype.drawTextEx = function(text, x, y, width) {
      var e, newText;
      try {
        if (Imported.VisuMZ_1_MessageCore !== true) { // * В Visu уже есть <center>
          if (String.any(text) && text.contains("<center>")) {
            if (text[0] === "<" && text[1] === "c") { // * Должен быть в начале строки
              newText = text.replace("<center>", "");
              return this.drawTextExInCenter(newText, x, y, width);
            }
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return alias_WBDTEX_KDCore29122021.call(this, ...arguments);
    };
  }
  //?NEW
  Window_Base.prototype.drawTextExInCenter = function(text, x, y, width, height) {
    var e, newX, newY, textSize;
    try {
      if (KDCore.isMV()) { // * В MV нет поддержки данного метода
        this.drawTextEx(...arguments);
        return;
      }
      textSize = this.textSizeEx(text);
      newX = x + width / 2 - textSize.width / 2;
      if ((height != null) && height > 0) {
        newY = y + height / 2 - textSize.height / 2;
      } else {
        newY = y;
      }
      return this.drawTextEx(text, newX, newY, width);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return this.drawTextEx(text, x, y, width);
    }
  };
  //?NEW
  Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
    var maxWidth, wrappedText;
    this.drawTextEx("", 0, 0, 100);
    maxWidth = this.contentsWidth();
    wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
    this.__lastWrappedText = wrappedText;
    return this.drawTextEx(wrappedText, x, y, width);
  };
  //?NEW
  return Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
    var i, j, k, l, line, lines, newLines, ref, ref1, result, spaceLeft, spaceWidth, wordWidth, wordWidthWithSpace, words;
    lines = text.split('\n');
    maxWidth = maxWidth;
    spaceWidth = this.contents.measureTextWidth(' ');
    result = '';
    newLines = 1;
    for (i = k = 0, ref = lines.length; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      spaceLeft = maxWidth;
      line = lines[i];
      words = line.split(' ');
      for (j = l = 0, ref1 = words.length; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        wordWidth = this.contents.measureTextWidth(words[j].replaceAll(/\\C\[\d+\]/g, ""));
        wordWidthWithSpace = wordWidth + spaceWidth;
        if (j === 0 || wordWidthWithSpace > spaceLeft) {
          if (j > 0) {
            if (maxLines === newLines) {
              return result;
            }
            result += '\n';
            newLines++;
          }
          result += words[j];
          spaceLeft = maxWidth - wordWidth;
          if (j === 0 && line.match(/\\n\w*\s*<\s*\\n\[\w*\s*\]\s*>*/gi)) {
            spaceLeft += 200;
          }
        } else {
          spaceLeft -= wordWidthWithSpace;
          result += ' ' + words[j];
        }
      }
      if (i < lines.length - 1) {
        result += '\n';
      }
    }
    return result;
  };
});






// Generated by CoffeeScript 2.6.1
// * Последний файл (после всех классов)
// * Загружает библиотеки
var i, len, lib, ref, text;

if (KDCore._requireLoadLibrary === true) {
  ref = KDCore[KDCore._loader];
  for (i = 0, len = ref.length; i < len; i++) {
    lib = ref[i];
    lib(KDCore);
  }
  KDCore[KDCore._loader] = [];
  text = "%c  KDCore is loaded " + KDCore.Version + " + NUI " + KDCore.nuiVersion;
  console.log(text, 'background: #222; color: #82b2ff');
}

// ==========================================================================
// ==========================================================================

//   END OF PLUGINS CORE LIBRARY
//   (Next code is this plugin code)

// ==========================================================================
// ==========================================================================

//Plugin KDCore builded by PKD PluginBuilder 2.2.2 - 23.11.2024

var PP;
(function (PP) {
    let _loader;
    /**
        * Load plugin settings
    */
    function LoadPluginSettings() {
        _loader = new NZKDX.ParamLoader("Alpha_NETZ_Ext_InGameChat");
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
    function getParam(paramName, defaultValue) {
        return getLoaderParam(paramName, defaultValue);
    }
    PP.getParam = getParam;
    //Parameters in: NetChatParameters.coffee
})(PP || (PP = {}));


var ANETInGameChatManager;
(function (ANETInGameChatManager) {
    function buildChatMessage(channelId, actorId, message) {
        return {
            channelId: channelId,
            actorId: actorId,
            text: message,
            mapId: $gameMap.mapId()
        };
    }
    ANETInGameChatManager.buildChatMessage = buildChatMessage;
    function getEmotionCodeFromText(text) {
        if (!text.includes(":"))
            return 0;
        if (text.includes(":!"))
            return 1;
        if (text.includes(":?"))
            return 2;
        if (text.includes(":song"))
            return 3;
        if (text.includes(":love"))
            return 4;
        if (text.includes(":angry"))
            return 5;
        if (text.includes(":drop"))
            return 6;
        if (text.includes(":conf"))
            return 7;
        if (text.includes(":..."))
            return 8;
        if (text.includes(":idea"))
            return 9;
        if (text.includes(":zzz"))
            return 10;
        return 0;
    }
    ANETInGameChatManager.getEmotionCodeFromText = getEmotionCodeFromText;
})(ANETInGameChatManager || (ANETInGameChatManager = {}));


// Generated by CoffeeScript 2.7.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ANGameManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS___getCurrentSceneType, ALIAS__startGame, _;
  //@[DEFINES]
  _ = ANGameManager;
  // * Отправить сообщение в чат от текущего клиента
  _.sendMyChatMessage = function(channelId, message) {
    this.sendRawChatMessage(channelId, this.myActorId(), message);
  };
  _.sendRawChatMessage = function(channelId, actorId, message) {
    var data;
    data = ANETInGameChatManager.buildChatMessage(channelId, actorId, message);
    ANNetwork.callback(NetMessage.Game("chatMessage", data), function() {
      ANET.UI.addMessageToChat(data);
      return ANET.UI.addEmotionToChat(data);
    });
  };
  //@[ALIAS]
  ALIAS___getCurrentSceneType = _._getCurrentSceneType;
  _._getCurrentSceneType = function() {
    if (SceneManager.isNextScene(Scene_NetChatInput)) {
      return "chat";
    }
    return ALIAS___getCurrentSceneType.call(this, ...arguments);
  };
  //@[ALIAS]
  ALIAS__startGame = _.startGame;
  _.startGame = function() {
    var e;
    ALIAS__startGame.call(this, ...arguments);
    try {
      if (!ANETUtils.isLoadGameRoom()) {
        this.showStartGameChatMessage();
      }
    } catch (error) {
      e = error;
      console.warn('error', e);
    }
  };
  // * Приветственное сообщение (системное) в чат
  _.showStartGameChatMessage = function() {
    var e, message;
    try {
      message = NetChatParameters.getChatStartMessage();
      if (message == null) {
        return;
      }
      if (message === "") {
        return;
      }
      ANET.UI.addMessageToChat(ANETInGameChatManager.buildChatMessage(0, 0, message));
    } catch (error) {
      e = error;
      console.warn('error', e);
    }
  };
})();

// ■ END ANGameManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__nUpdatePlayerInputForNetwork, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__nUpdatePlayerInputForNetwork = _.nUpdatePlayerInputForNetwork;
  _.nUpdatePlayerInputForNetwork = function() {
    ALIAS__nUpdatePlayerInputForNetwork.call(this, ...arguments);
    return this.nUpdateChatInput();
  };
  _.nUpdateChatInput = function() {
    var openChatButton, sayInChatButton;
    //TODO: Можно оптимизировать, в initMembers
    openChatButton = NetChatParameters.getChatOpenCloseKey();
    sayInChatButton = NetChatParameters.getChatSayKey();
    if (Input.isTriggered(openChatButton)) {
      if (ANET.UI.isChatOpen()) {
        // * Если кнопка открыть чат и кнопка сказать в чат одинаковые
        if (openChatButton === sayInChatButton) {
          ANET.UI.showChatInputSafe(); // * то не закрываем, а сцена ввода текста
          Input.clear(); // * иначе закрываем
        } else {
          ANET.UI.closeChat();
        }
      } else {
        ANET.UI.showChat();
      }
    } else if (Input.isTriggered(sayInChatButton)) {
      if (ANET.UI.isChatOpen()) {
        ANET.UI.showChatInputSafe();
      }
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
var FWindow_InGameChat;

FWindow_InGameChat = class FWindow_InGameChat extends KDCore.FloatingWindow {
  constructor() {
    super(...arguments);
    this.params = this.getSettings();
    this.setDragEndHandler(this._savePlayerDragPosition.bind(this));
    return;
  }

  //%[I] Показывать чат в сцене ввода сообщения
  // * должен быть всега не прозрачный и без обработки кнопок (без крестика)
  getSettings() {
    return NetChatParameters.inGameChatWindow();
  }

  isMouseInContentZone() {
    return !($gameTemp.kdButtonUnderMouse != null) && !this._isMouseInHeader();
  }

  rootImageFolder() {
    return "Alpha_NETZ_Ext_InGameChat";
  }

  //? message: {
  //   channelId
  //   actorId
  //   text
  //}
  addMessageToChat(message) {
    var e;
    try {
      return this._addMessageToChat(message, true);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  }

  parseEmotions(message) {
    if (!NetChatParameters.getChatMessagesSettings().allowEmotions) {
      return;
    }
    this._parseAndShowEmotions(message);
  }

  open() {
    super.open();
    return $gamePlayer._nChatIsClosed = false;
  }

  close() {
    super.close();
    return $gamePlayer._nChatIsClosed = true;
  }

  update() {
    var ref;
    super.update();
    if ((ref = this._changer) != null) {
      ref.update();
    }
    if (this.isOpen()) {
      return this._updateClickOnChat();
    }
  }

};

(function() {  
  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ FWindow_InGameChat.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var ALIAS___onMouseIn, ALIAS___onMouseOut, _;
  //@[DEFINES]
  _ = FWindow_InGameChat.prototype;
  //@[ALIAS]
  ALIAS___onMouseIn = _._onMouseIn;
  _._onMouseIn = function() {
    ALIAS___onMouseIn.call(this);
    if (this.opacity === 255) {
      return;
    }
    this._changer = new KDCore.Changer(this);
    this._changer.change('opacity').from(this.opacity).to(255).step(10);
    this._changer.start();
  };
  
  //@[ALIAS]
  ALIAS___onMouseOut = _._onMouseOut;
  _._onMouseOut = function() {
    ALIAS___onMouseOut.call(this);
    if (this.params.notActiveOpacity === 255) {
      return;
    }
    this._changer = new KDCore.Changer(this);
    //@_changer.change('opacity').from(@opacity).to(@params.notActiveOpacity).step(5).delay(10)
    this._changer.start();
  };
  //$[OVER]
  _._createCustomElements = function() {
    this._lines = [];
    this._loadChatHistory();
  };
  _._loadChatHistory = function() {
    var e, j, len, message, ref;
    if ($gameTemp._nChatHistory == null) {
      $gameTemp._nChatHistory = [];
    }
    ref = $gameTemp._nChatHistory;
    for (j = 0, len = ref.length; j < len; j++) {
      message = ref[j];
      try {
        this._addMessageToChat(message, false);
      } catch (error) {
        e = error;
        console.warn(e);
      }
    }
  };
  _._addMessageToChat = function(message, isNew) {
    var actorId, channelId, i, j, line, ref, text;
    if (message == null) {
      return;
    }
    if (this._lines == null) {
      this._lines = [];
    }
    ({channelId, actorId, text} = message);
    line = new Sprite_NetChatTextLine();
    this.addContent(line);
    line.drawChatMessage(channelId, actorId, text);
    if (isNew === true && KDCore.Utils.isMapScene() && this.isOpen()) {
      // * Анимируем, если сцена карта и сообщение новое (а не из истории)
      line.animate();
    }
    line.move(this.params.firstChatMessageMargin);
    this._lines.unshift(line);
    if (this._lines.length % 2 === 0) {
      //TODO: Тут есть баг, см. сообщение от SMO_Valadorn
      // * Разный цвет для каждой последующей
      line.applyBackgroundStyleB();
    }
    for (i = j = 1, ref = this._lines.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
      this._lines[i].moveUp();
      if (i === this.params.maxMessages) {
        this._removeLine(this._lines[i]);
        break;
      }
    }
    if (isNew === true) {
      // * Добавляем в историю только новые сообщения (а не из истории)
      $gameTemp._nChatHistory.push(message);
      // * Очищаем историю, чтобы память не занимала
      if ($gameTemp._nChatHistory.length > this.params.maxMessages) {
        $gameTemp._nChatHistory.shift();
      }
    }
  };
  _._removeLine = function(line) {
    var ref;
    line.visible = false;
    if ((ref = line.parent) != null) {
      ref.removeChild(line);
    }
    this._lines.delete(line);
  };
  //$[OVER]
  _._moveToStartPosition = function() {
    return this._moveToLastSavedPosition();
  };
  //$[OVER]
  _._afterOpen = function() {
    this._checkMousePositionAfterOpen();
    this._moveToStartPosition();
  };
  // * Доп. проверка нахождения курсора мышки при открытии окна
  _._checkMousePositionAfterOpen = function() {
    this._mouseIn = !this.isMouseIn();
    this._registerMouseInOut();
  };
  _._moveToLastSavedPosition = function() {
    var e, x, y;
    if ($gamePlayer._nLastChatWindowPosition == null) {
      ({x, y} = this.getSettings().position);
      try {
        $gamePlayer._nLastChatWindowPosition = {
          x: eval(x),
          y: eval(y)
        };
      } catch (error) {
        e = error;
        console.warn(e);
        $gamePlayer._nLastChatWindowPosition = {
          x: 0,
          y: 0
        };
      }
    }
    this.move($gamePlayer._nLastChatWindowPosition);
  };
  _._savePlayerDragPosition = function() {
    $gamePlayer._nLastChatWindowPosition = {
      x: this.x,
      y: this.y
    };
  };
  //@[DYNAMIC INNER]
  _._updateClickOnChat = function() {
    if (!NetChatParameters.isSayIfClickOnChatWindow()) {
      this._updateClickOnChat = function() {}; // * EMPTY
    } else {
      this._updateClickOnChat = function() {
        if (TouchInput.isTriggered() && this.isMouseIn() && this.isMouseInContentZone()) {
          ANET.UI.showChatInputSafe();
          return Input.clear();
        }
      };
    }
  };
  _._parseAndShowEmotions = function(message) {
    var actorId, char, e, emotionCode, text;
    try {
      if (message == null) {
        return;
      }
      ({actorId, text} = message);
      emotionCode = ANETInGameChatManager.getEmotionCodeFromText(text);
      if (emotionCode === 0) {
        return;
      }
      if (ANGameManager.myActorId() === actorId) {
        char = $gamePlayer;
      } else {
        char = nAPI.getPlayerCharacter("actorId", actorId);
      }
      return char != null ? char.requestBalloon(emotionCode) : void 0;
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END FWindow_InGameChat.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ANET.UI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ANET.UI;
  (function() {    // * Чат
    // -----------------------------------------------------------------------
    _.chat = function() {
      return this.uiSet.chatWindow;
    };
    // * Есть ли чат (создан ли), так как опциональный и нету в Basic
    _.isChatValid = function() {
      return this.isValid() && (this.chat() != null);
    };
    // * Открыто ли окно чата
    _.isChatOpen = function() {
      return this.isChatValid() && this.chat().isActive();
    };
    // * Показать сцену ввода сообщения в чат
    _.showChatInput = function() {
      if (!this.isValid()) {
        return;
      }
      SceneManager.push(Scene_NetChatInput);
    };
    // * Показать сцену ввода сообщения в чат (с учётом событий и сообщений)
    _.showChatInputSafe = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (this.isCanChatInput()) {
        return this.showChatInput();
      }
    };
    _.showChat = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (!this.isChatOpen()) {
        this.chat().open();
      }
    };
    _.closeChat = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (this.isChatOpen()) {
        this.chat().close();
      }
    };
    
    // * Добавить сообщение в чат (можно вызывать на любой сцене)
    _.addMessageToChat = function(message) {
      if (!this.isChatValid()) {
        return;
      }
      if (message == null) {
        return;
      }
      // * Если на карте, то добавляем прямо в чат
      if (KDCore.Utils.isMapScene()) {
        this.chat().addMessageToChat(message);
        this.addEmotionToChat(message);
        if (NetChatParameters.getChatAutoOpen()) {
          this.showChat();
        }
      } else {
        // * Иначе в историю
        $gameTemp._nChatHistory.push(message);
      }
    };
    // * Показать эмоцию из чата (вызывается либо когда сам отправляешь, либо на сцене карты)
    _.addEmotionToChat = function(message) {
      if (!this.isChatValid()) {
        return;
      }
      if (message == null) {
        return;
      }
      this.chat().parseEmotions(message);
    };
    // * Может ли игрок начать вводить текст в чат (другая сцена будет открыта)
    _.isCanChatInput = function() {
      return !($gameMessage.isBusy() || $gameMap.isEventRunning());
    };
    
    // * Открыть (или не надо) чат при переходе на сцену карты
    return _.openChatAfterMapLoaded = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (!$gamePlayer._nChatIsClosed) {
        return this.showChat();
      }
    };
  })();
})();

// ■ END ANET.UI.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
var NetChatParameters;

NetChatParameters = function() {};

(function() {  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NetChatParameters;
  _.inGameChatWindow = function() {
    return PP.getParam("inGameChatWindowVisualSettings", {
      size: {
        w: 312,
        h: 192
      },
      position: {
        x: 1,
        y: "Graphics.height - 193"
      },
      notActiveOpacity: 140,
      maxMessages: 9,
      firstChatMessageMargin: {
        x: 3,
        y: 145
      }
    });
  };
  //!warning
  //TODO: Какой-то баг, не хочет загружать textFormatForSystem и textFormatForPlayer
  // * а также загружает textFormat не правильно!
  _.netChatTextLine = function() {
    return PP.getParam("inGameChatTextLineSettings", {
      size: {
        w: 306,
        h: 18
      },
      backgroundA: {
        color: "#59a3d9".toCss(),
        opacity: 40
      },
      backgroundB: {
        color: "#59a3d9".toCss(),
        opacity: 70
      },
      textLine: {
        visible: true,
        size: {
          w: 520,
          h: 20
        },
        font: {
          face: null,
          size: 14,
          italic: false
        },
        margins: {
          x: 4,
          y: -3
        }
      },
      // 1 - Channel
      // 2 - Actor Name
      // 3 - Message
      // 4 - Player Name
      textFormat: "\\}\\}\\C[3][%1] \\{\\{\\C[2]%2 \\C[0]%3",
      textFormatForPlayer: "\\}\\}\\C[3][%1]\\C[1][ME]\\{\\{ \\C[0]%3",
      textFormatForSystem: "\\}\\}\\C[3][%1]\\{\\{ \\C[6]%3",
      animationSpeedInPx: 18,
      channelAll: 'ALL',
      channelMap: 'MAP'
    });
  };
  //Start Message
  _.getChatStartMessage = function() {
    return PP.getParam("chatStartMessage", "");
  };
  _.getChatOpenCloseKey = function() {
    return PP.getParam("chatOpenCloseKey", "t");
  };
  _.getChatSayKey = function() {
    return PP.getParam("chatSayKey", "t");
  };
  _.getChatAutoOpen = function() {
    return PP.getParam("chatAutoOpen", false);
  };
  // Is click to Say?
  _.isSayIfClickOnChatWindow = function() {
    return PP.getParam("clickOnChatToSay", true);
  };
  // Messages Settings
  _.getChatMessagesSettings = function() {
    return PP.getParam("chatMessagesSettings", {
      maxlength: 32,
      forbiddenEscapeCodes: "V",
      iconsSize: 18,
      allowEmotions: true
    });
  };
  // Input Text Scene
  _.getChatInputSceneVisualSettings = function() {
    return PP.getParam("chatInputSceneVisualSettings", {
      mapChannelButtonPosition: {
        x: 4,
        y: 6
      },
      allChannelButtonPosition: {
        x: 104,
        y: 6
      },
      inputSceneOkButtonPosition: {
        x: 356,
        y: 284
      }
    });
  };
})();

// ■ END Parameters Manager Extension.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetClientMethodsManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = NetClientMethodsManager;
  _.event_game_chatMessage = function(content) {
    var channelId, e, mapId;
    try {
      mapId = content.mapId;
      channelId = content.channelId;
      if (channelId > 0) { // * MAP
        if ((mapId != null) && mapId === $gameMap.mapId()) {
          return ANET.UI.addMessageToChat(content);
        }
      } else {
        return ANET.UI.addMessageToChat(content);
      }
    } catch (error) {
      e = error;
      return console.warn("event_game_chatMessage", e);
    }
  };
})();

// ■ END NetClientMethodsManager.coffee
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
            window.alert("In Game Chat Extension plugin require Alpha NETZ!");
            return;
        }
        PP.LoadPluginSettings();
        ANET.registerExtension("InGameChat");
    };
})();
// ■ END Scene_Boot.ts
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onMapLoaded, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this, ...arguments);
    // * Открыть (или нет) чат
    ANET.UI.openChatAfterMapLoaded();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
// * Сцена ввода сообщения для чата
var Scene_NetChatInput;

Scene_NetChatInput = class Scene_NetChatInput extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    this.settingsA = NetChatParameters.getChatMessagesSettings();
    this.settingsB = NetChatParameters.getChatInputSceneVisualSettings();
    if ($gameTemp._nChatLastChannelId == null) {
      $gameTemp._nChatLastChannelId = 0;
    }
    this._showNameInput();
    this._createGroupButtons();
    this._createOkButton();
    // * Делаем фокус ввода
    setTimeout((function() {
      return HUIManager.focusInput();
    }), 100);
  }

  stop() {
    $gameTemp._nChatLastChannelId = this.buttonsGroup.getSelectedIndex();
    this._hideNameInput();
    return super.stop();
  }

  update() {
    super.update();
    if (Input.isCancel()) {
      this.popScene();
    } else if (Input.isTriggered("ok")) {
      this.onOkClick();
    }
  }

  onOkClick() {
    var msg;
    msg = HUIManager.getInputValue();
    msg = this._filterTextLength(msg);
    msg = this._filterEscapeCharacters(msg);
    if (KDCore.isMZ()) {
      msg = this._applyIconsSize(msg);
    }
    if (msg && msg !== "") {
      this._sendMessageToServer(msg);
    }
    return this.popScene();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetChatInput.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetChatInput.prototype;
  _._filterTextLength = function(msg) {
    var e, maxlength;
    try {
      maxlength = this.settingsA.maxlength;
      if (msg.length > maxlength) {
        msg = msg.substr(0, maxlength);
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
    return msg;
  };
  _._filterEscapeCharacters = function(msg) {
    var char, e, forbidden, i, len;
    try {
      forbidden = this.settingsA.forbiddenEscapeCodes.split(",");
      for (i = 0, len = forbidden.length; i < len; i++) {
        char = forbidden[i];
        msg = this._removeEscapeCharacterFromText(char.trim(), msg);
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
    return msg;
  };
  _._removeEscapeCharacterFromText = function(escapeChar, text) {
    text = text.replace("\\" + escapeChar, "");
    return text;
  };
  _._applyIconsSize = function(msg) {
    var e, size;
    try {
      size = this.settingsA.iconsSize;
      if (msg.contains("\\I[")) {
        msg = msg.replace(/\\I\[(\d+)\]/, "\\ISZ[$1," + size + ",0,0]");
        return this._applyIconsSize(msg);
      } else {
        return msg;
      }
    } catch (error) {
      e = error;
      console.warn(e);
      return msg;
    }
  };
  _._sendMessageToServer = function(msg) {
    var channelId, e;
    try {
      channelId = this.buttonsGroup.getSelectedIndex();
      console.log("Send message from chat: " + msg);
      if (ANNetwork.isConnected()) {
        ANGameManager.sendMyChatMessage(channelId, msg);
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  _._showNameInput = function() {
    HUIManager.showInput("Enter your message...", NetChatParameters.getChatMessagesSettings().maxlength);
    HUIManager.setInputValue("");
  };
  _._hideNameInput = function() {
    return HUIManager.removeInput();
  };
  _._createGroupButtons = function() {
    var all, map, x, y;
    ({x, y} = this.settingsB.allChannelButtonPosition);
    all = [x, y];
    ({x, y} = this.settingsB.mapChannelButtonPosition);
    map = [x, y];
    this.buttonsGroup = new Sprite_ButtonsGroupAlt([
      {
        image: "nzButton_ChatGroup_All",
        position: all
      },
      {
        image: "nzButton_ChatGroup_Map",
        position: map
      }
    ], $gameTemp._nChatLastChannelId, null);
    this.addChild(this.buttonsGroup);
  };
  _._createOkButton = function() {
    var x, y;
    ({x, y} = this.settingsB.inputSceneOkButtonPosition);
    if (KDCore.isMZ()) {
      this._okButton = new Sprite_Button("ok");
    } else {
      this._okButton = new KDCore.ButtonM("nzButton_ChatSendMV", false, "Alpha_NETZ_Ext_InGameChat");
      this._okButton.addClickHandler(this.onOkClick.bind(this));
      this._okButton.anchor.x = 0.5;
    }
    this._okButton.x = x;
    this._okButton.y = y;
    this.addWindow(this._okButton);
  };
})();

// ■ END Scene_NetChatInput.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
var Sprite_ButtonsGroupAlt;

Sprite_ButtonsGroupAlt = class Sprite_ButtonsGroupAlt extends KDCore.Sprite {
  // buttonsArray = [
  //       {image: NAME, position: [X,Y]}, ...
  //    ]
  constructor(buttonsArray, activeIndex, clickCallback) {
    var button, i, len;
    super();
    this.clickCallback = clickCallback;
    this._buttons = [];
    for (i = 0, len = buttonsArray.length; i < len; i++) {
      button = buttonsArray[i];
      this._createButton(button);
    }
    this._onButtonClick(activeIndex);
    return;
  }

  getSelectedIndex() {
    return this._buttons.findIndex(function(btn) {
      return !btn.isEnabled();
    });
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Sprite_ButtonsGroupAlt.prototype;
  _._createButton = function({image, position}) {
    var btn, index, method;
    // * Так как кнопки работают как переключатели, то 03 должен быть всегда
    index = this._buttons.length;
    btn = new KDCore.ButtonM(image, true, "Alpha_NETZ_Ext_InGameChat");
    btn.move(position);
    method = () => {
      return this._onButtonClick(index);
    };
    btn.addClickHandler(method);
    this._buttons.push(btn);
    this.add(btn);
  };
  _._onButtonClick = function(index = 0) {
    var ref;
    this._resetAllButtons();
    if ((ref = this._buttons[index]) != null) {
      ref.disable(); // * Нажата
    }
    if (this.clickCallback != null) {
      this.clickCallback(index);
    }
  };
  _._resetAllButtons = function() {
    var btn, i, len, ref;
    ref = this._buttons;
    for (i = 0, len = ref.length; i < len; i++) {
      btn = ref[i];
      if (btn != null) {
        btn.enable();
      }
    }
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
// * Сообщение в чате
(function() {
  var Sprite_NetChatTextLine;
  Sprite_NetChatTextLine = class Sprite_NetChatTextLine extends Sprite {
    constructor() {
      super();
      this.params = this.getSettings();
      this._needAnimation = false;
      this._create();
      return;
    }

    getSettings() {
      return NetChatParameters.netChatTextLine();
    }

    // * Применить стиль задника А (по умолчанию)
    applyBackgroundStyleA() {
      return this._applyBackgroundStyle(this.params.backgroundA);
    }

    // * Применить стиль задника Б (чтобы легче было видно, каждый чётный)
    applyBackgroundStyleB() {
      return this._applyBackgroundStyle(this.params.backgroundB);
    }

    // * Написать сообщение
    drawChatMessage(channelId, actorId, text) {
      var actorName, channelIdText, playerName, textFormat;
      if (this._textSpr == null) {
        return;
      }
      // * Не хочет загружать из параметров!!!
      if (this.params.textFormatForPlayer == null) {
        this.params.textFormatForPlayer = "\\}\\}\\C[3][%1]\\C[1][ME]\\{\\{ \\C[0]%3";
      }
      if (this.params.textFormatForSystem == null) {
        this.params.textFormatForSystem = "\\}\\}\\C[3][%1]\\{\\{ \\C[6]%3";
      }
      // * Не правильно загржает!
      if (this.params.textFormat.contains("*3") && !this.params.textFormat.contains("%3")) {
        this.params.textFormat = "\\}\\}\\C[3][%1] \\{\\{\\C[2]%2 \\C[0]%3";
      }
      if (this.isMyActorMessage(actorId)) {
        textFormat = this.params.textFormatForPlayer;
      } else {
        if (actorId <= 0) {
          textFormat = this.params.textFormatForSystem;
        } else {
          textFormat = this.params.textFormat;
        }
      }
      channelIdText = this._convertChannelIdToText(channelId); //1
      actorName = this._getActorName(actorId); //2
      playerName = this._getPlayerName(actorId); //4
      this._textSpr.drawTextWithFormat(textFormat, channelIdText, actorName, text, playerName);
    }

    // * Сообщение от меня (текущего клиента), имеет отдельный формат
    isMyActorMessage(actorId) {
      if (ANNetwork.isConnected()) {
        return ANGameManager.myActorId() === actorId;
      } else {
        return false;
      }
    }

    // * Сдвинуть эту строчку выше
    moveUp() {
      this.y -= this.params.size.h;
    }

    // * Анимированное появление сообщения (справа "едет")
    animate() {
      this._textSpr.x = -this.params.textLine.size.w;
      this._needAnimation = true;
    }

    update() {
      super.update();
      this._updateAnimation();
    }

  };
  window['Sprite_NetChatTextLine'] = Sprite_NetChatTextLine;
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Sprite_NetChatTextLine.prototype;
  _._applyBackgroundStyle = function(params) {
    if (this._background == null) {
      return;
    }
    this._background.fillAll(params.color);
    this._background.opacity = params.opacity;
  };
  _._create = function() {
    this._createBackground();
    this._createTextLine();
  };
  _._createBackground = function() {
    var backgroundBitmap;
    backgroundBitmap = new Bitmap(this.params.size.w, this.params.size.h);
    this._background = new Sprite(backgroundBitmap);
    this.applyBackgroundStyleA();
    return this.addChild(this._background);
  };
  _._createTextLine = function() {
    var textLineParam;
    textLineParam = this.params.textLine;
    textLineParam.visible = true;
    this._textSpr = new KDCore.UI.Sprite_UITextExt(this.params.textLine);
    return this.addChild(this._textSpr);
  };
  _._updateAnimation = function() {
    if (this._needAnimation === false) {
      return;
    }
    if (this.params.animationSpeedInPx === 0) {
      this._textSpr.x = 0; // * Сразу, без анимации
    } else {
      this._textSpr.x += this.params.animationSpeedInPx;
    }
    if (this._textSpr.x > 0) { // * Граница
      this._textSpr.x = 0;
    }
    this._needAnimation = this._textSpr.x !== 0;
  };
  _._convertChannelIdToText = function(channelId) {
    if (channelId <= 0) {
      return this.params.channelAll;
    }
    return this.params.channelMap;
  };
  _._getActorName = function(actorId) {
    var ref;
    if (actorId <= 0) {
      return "";
    }
    return (ref = $dataActors[actorId]) != null ? ref.name : void 0;
  };
  _._getPlayerName = function(actorId) {
    var ref;
    if (actorId <= 0) {
      return "";
    }
    if (ANNetwork.isConnected()) {
      return (ref = ANGameManager.getPlayerDataByActorId(actorId)) != null ? ref.name : void 0;
    } else {
      return this._getActorName(actorId);
    }
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ANET.Spriteset_UI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS___create, _;
  //@[DEFINES]
  _ = ANET.Spriteset_UI.prototype;
  //@[ALIAS]
  ALIAS___create = _._create;
  _._create = function() {
    ALIAS___create.call(this, ...arguments);
    return this._createInGameChat();
  };
  // * Создаём окно чата
  _._createInGameChat = function() {
    var params;
    params = NetChatParameters.inGameChatWindow();
    this.chatWindow = new FWindow_InGameChat(this, params.size.w, params.size.h);
    this._addElementToUI(this.chatWindow);
  };
})();

// ■ END ANET.Spriteset_UI.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ nAPIoffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = nAPI;
  (function() {    // * CHAT
    // -----------------------------------------------------------------------
    _.writeInChat = function(message, isGlobal = false) {
      var e;
      try {
        if (isGlobal === true && ANNetwork.isConnected()) {
          ANGameManager.sendRawChatMessage(0, 0, message);
        } else {
          ANET.UI.addMessageToChat(ANETInGameChatManager.buildChatMessage(0, 0, message));
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
    };
    _.closeChatWindow = function() {
      var e;
      try {
        ANET.UI.closeChat();
      } catch (error) {
        e = error;
        console.warn(e);
      }
    };
    _.openChatWindow = function() {
      var e;
      try {
        ANET.UI.showChat();
      } catch (error) {
        e = error;
        console.warn(e);
      }
    };
    _.moveChatWindow = function(x = 0, y = 0) {
      var e;
      try {
        $gamePlayer._nLastChatWindowPosition = {
          x: x,
          y: y
        };
        if (this.isChatWindowOpened()) {
          ANET.UI.chat()._moveToStartPosition();
        }
      } catch (error) {
        e = error;
        console.warn(e);
        $gamePlayer._nLastChatWindowPosition = {
          x: 0,
          y: 0
        };
      }
    };
    return _.isChatWindowOpened = function() {
      var e;
      try {
        return ANET.UI.isChatOpen();
      } catch (error) {
        e = error;
        console.warn(e);
        return false;
      }
    };
  })();
})();

// ■ END nAPIoffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------   


})();