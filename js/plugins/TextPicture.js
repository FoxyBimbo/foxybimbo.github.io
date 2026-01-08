//=============================================================================
// RPG Maker MZ - Text Picture
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Displays text as a picture.
 * @author Yoji Ojima
 *
 * @help TextPicture.js
 *
 * This plugin provides a command to show text as a picture.
 *
 * Use it in the following procedure.
 *   1. Call the plugin command "Set Text Picture".
 *   2. Execute "Show Picture" without specifying an image.
 *
 * @command set
 * @text Set Text Picture
 * @desc Sets text to display as a picture.
 *       After this, execute "Show Picture" without specifying an image.
 *
 * @arg text
 * @type multiline_string
 * @text Text
 * @desc Text to display as a picture.
 *       Control characters are allowed.
 *
 * @arg x
 * @type number
 * @text X Coordinate
 * @desc The X coordinate to display the text picture.
 *
 * @arg y
 * @type number
 * @text Y Coordinate
 * @desc The Y coordinate to display the text picture.
 *
 * @arg textSize
 * @type number
 * @text Text Size
 * @desc Specifies the size of the text.
 */

/*:ja
 * @target MZ
 * @plugindesc テキストをピクチャとして表示します。
 * @author Yoji Ojima
 *
 * @help TextPicture.js
 *
 * このプラグインは、テキストをピクチャとして表示するコマンドを提供します。
 *
 * 次の手順で使用してください。
 *   1. プラグインコマンド「テキストピクチャの設定」を呼び出します。
 *   2. 画像を指定せずに「ピクチャの表示」を実行します。
 *
 * @command set
 * @text テキストピクチャの設定
 * @desc テキストをピクチャとして表示します。
 *       その後、画像を指定せずに「ピクチ���の表示」を実行します。
 *
 * @arg text
 * @type multiline_string
 * @text テキスト
 * @desc ピクチャとして表示するテキストです。
 *       制御文字が使用可能です。
 *
 * @arg x
 * @type number
 * @text X座標
 * @desc テキストピクチャを表示するX座標です。
 *
 * @arg y
 * @type number
 * @text Y座標
 * @desc テキストピクチャを表示するY座標です。
 *
 * @arg textSize
 * @type number
 * @text テキストサイズ
 * @desc テキストのサイズを指定します。
 */

(() => {
    const pluginName = "TextPicture";
    let textPictureText = "";
    let textPictureX = 0;
    let textPictureY = 0;
    let textPictureId = 99; // Default picture ID
    let textPictureSize = 48; // Default text size

    PluginManager.registerCommand(pluginName, "set", args => {
        let text = String(args.text);
        text = convertEscapeCharacters(text);
        textPictureText = text;

        textPictureX = Number(args.x) || 0;
        textPictureY = Number(args.y) || 0;
        textPictureId = Number(args.pictureId) || 1; // Default to picture ID 1 if not specified
        textPictureSize = Number(args.textSize) || 48; // Default to text size 48 if not specified

        // Show the picture
        $gameScreen.showPicture(textPictureId, "", 0, textPictureX, textPictureY, 100, 100, 255, 0);
    });

    PluginManager.registerCommand(pluginName, "destroy", args => {
        const pictureId = Number(args.pictureId) || textPictureId; // Default to the last used picture ID
        $gameScreen.erasePicture(pictureId);
    });

    const _Game_Picture_show = Game_Picture.prototype.show;
    Game_Picture.prototype.show = function() {
        _Game_Picture_show.apply(this, arguments);
        if (this._name === "" && textPictureText) {
            this.mzkp_text = textPictureText;
            this.mzkp_textChanged = true;
            this.mzkp_x = textPictureX;
            this.mzkp_y = textPictureY;
            this.mzkp_size = textPictureSize;
            textPictureText = "";
        }
    };

    const _Sprite_Picture_updateBitmap = Sprite_Picture.prototype.updateBitmap;
    Sprite_Picture.prototype.updateBitmap = function() {
        _Sprite_Picture_updateBitmap.apply(this, arguments);
        if (this.visible && this._pictureName === "") {
            const picture = this.picture();
            const text = picture ? picture.mzkp_text || "" : "";
            const textChanged = picture && picture.mzkp_textChanged;
            if (this.mzkp_text !== text || textChanged) {
                this.mzkp_text = text;
                picture.mzkp_textChanged = false;
                this.bitmap = createTextPictureBitmap(text, picture.mzkp_size);
                this.x = picture.mzkp_x;
                this.y = picture.mzkp_y;
            }
        }
    };

    function createTextPictureBitmap(text, textSize) {
        const tempBitmap = new Bitmap(1, 1);
        tempBitmap.fontSize = textSize;
        const textWidth = tempBitmap.measureTextWidth(text);
        const textHeight = textSize; // Use the text size as the height
        const bitmap = new Bitmap(textWidth, textHeight);
        bitmap.fontSize = textSize;
        bitmap.drawText(text, 0, 0, textWidth, textHeight, 'left');
        return bitmap;
    }

    function destroyTextPictureBitmap(bitmap) {
        if (bitmap) {
            bitmap.destroy();
        }
    }

    function convertEscapeCharacters(text) {
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');
        text = text.replace(/\x1bV\[(\d+)\]/gi, (_, p1) => $gameVariables.value(parseInt(p1)));
        text = text.replace(/\x1bN\[(\d+)\]/gi, (_, p1) => $gameActors.actor(parseInt(p1)).name());
        text = text.replace(/\x1bP\[(\d+)\]/gi, (_, p1) => $gameParty.members()[parseInt(p1) - 1].name());
        text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
        return text;
    }
})();
