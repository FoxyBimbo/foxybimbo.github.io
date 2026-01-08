/*:
@target MZ
@plugindesc
A lockpicking minigame with adjustable difficulty. Based on the
lockpicking game from Skyrim, Dying Light, etc.

@author reflector88
@url https://reflector88.itch.io/
@help 
"Lockpick Game 1.1"

Update
v1.1 (5/17/24) - Added custom backgrounds, changed to class syntax
______________________________________________________________________
CONFIGURATION
Set an item as the lockpick item.

The pivot point of the pick is the middle of the left edge. The pivot
point of the wrench is the center of the image.
______________________________________________________________________

TERMS OF USE
Free for use in both commercial and non-commcercial projects, though
please credit me.

@param Item Name
@type string
@desc The name to display in the pick count window.
@default Lockpicks

@param Item
@type item
@desc The lockpick item in the database.

@param Durability
@type number
@default 60

@param Help Text
@type string
@default <->: Rotate Pick  Z: Try Lock

@param Custom Background
@type file
@dir img/pictures/

@param Pick Image
@type file
@dir img/pictures/
@default Pick

    @param Pick X
    @text X Pos
    @type string
    @parent Pick Image
    @default Graphics.boxWidth / 2

    @param Pick Y
    @text Y Pos
    @type string
    @parent Pick Image
    @default Graphics.boxHeight / 2

    @param Pick Start
    @text Start Angle
    @type float
    @parent Pick Image
    @default -90

    @param Pick Min
    @text Min Angle
    @type float
    @parent Pick Image
    @default -180

    @param Pick Max
    @text Max Angle
    @type float
    @parent Pick Image
    @default 0

    @param Pick Rate
    @text Turn Rate
    @type float
    @parent Pick Image
    @default 1.5

@param Wrench Image
@type file
@dir img/pictures/
@default Wrench

    @param Wrench X
    @text X Pos
    @type string
    @parent Wrench Image
    @default Graphics.boxWidth / 2

    @param Wrench Y
    @text Y Pos
    @type string
    @parent Wrench Image
    @default Graphics.boxHeight / 2

    @param Wrench Min
    @text Start Angle
    @type float
    @parent Wrench Image
    @default 0

    @param Wrench Max
    @text End Angle
    @type float
    @parent Wrench Image
    @default 90

    @param Wrench Rate
    @text Turn Rate
    @type float
    @parent Wrench Image
    @default 1.5

@param Lock Image
@type file
@dir img/pictures/
@default Lock

    @param Lock X
    @text X Pos
    @type string
    @parent Lock Image
    @default Graphics.boxWidth / 2

    @param Lock Y
    @text Y Pos
    @type string
    @parent Lock Image
    @default Graphics.boxHeight / 2

@param Turn Sound
@type struct<TurnSoundStr>
@desc Sound when the attack is initiated.
@default {"name":"Switch2","volume":"50","pitch":"110"}

@param Break Sound
@type struct<BreakSoundStr>
@desc Sound when the attack is initiated.
@default {"name":"Hammer","volume":"75","pitch":"300"}

@param Unlock Sound
@type struct<UnlockSoundStr>
@desc Sound when the attack is initiated.
@default {"name":"Key","volume":"80","pitch":"100"}

@command Open
@text Start Lockpicking

    @arg Solve Angle
    @type number
    @default 10
    @desc The width of the solved position. Lower = harder.

    @arg Tolerance
    @type number
    @min 10
    @default 3
    @desc The amount that the lock is allowed to rotate. Lower = harder.

    @arg Self-Switch
    @type select
    @option 0 @option A @option B @option C @option D
    @default A
    @desc Switch is turned ON if lockpicking is successful.

    @arg Switch
    @type switch
    @default 0
    @desc Switch is turned ON if lockpicking is successful.

*/

/*~struct~TurnSoundStr:
@param name
@type file
@dir audio/se/
@default Switch2

@param volume
@type number
@default 50

@param pitch
@default 110
*/

/*~struct~BreakSoundStr:
@param name
@type file
@dir audio/se/
@default Hammer

@param volume
@type number
@default 75

@param pitch
@default 300
*/

/*~struct~UnlockSoundStr:
@param name
@type file
@dir audio/se/
@default Key

@param volume
@type number
@default 80

@param pitch
@default 100
*/


'use strict';
var r88 = r88 || {};
r88.Lockpick = r88.Lockpick || {};
r88.Lockpick.pluginName = "r88_Lockpick";
r88.Lockpick.parameters = PluginManager.parameters('r88_Lockpick');
r88.Lockpick.eventId;
r88.Lockpick.mapId;
r88.Lockpick.selfSwitch;
r88.Lockpick.switch;
r88.Lockpick.solveAngle;
r88.Lockpick.tolerance;

//-----------------------------------------------------------------------------
// r88_Lockpick
//
// The scene class of the lockpicking minigame.

r88.Lockpick.Scene_Lockpick = class extends Scene_MenuBase {
    #maxResetTimer = 50;
    #resetTimer = 0;
    #maxSolveTimer = 50;
    #solveTimer = 0;

    #exitFlag = false;
    #isTrembling = false;
    #turnSoundFlag = false;

    #maxDur = JSON.parse(r88.Lockpick.parameters['Durability']);
    #currDur = this.#maxDur;
    #itemId = JSON.parse(r88.Lockpick.parameters['Item']);


    create() {
        super.create();
        this.createHelpWindow();
        this.createPickWindow();
        this.createLock();
        this.createWrench();

        if ($gameParty.numItems($dataItems[this.#itemId]) <= 0) {
            this.#exitFlag = true;
            this.#resetTimer = this.#maxResetTimer;
        } else {
            this.createPick();
        }

        this._solution = Math.floor(Math.random() * (this._p2 - this._p1 + 1)) + this._p1;
    }
    createBackground() {
        super.createBackground();

        if (r88.Lockpick.parameters['Custom Background']) {
            this._customBack = new Sprite();
            this._customBack.bitmap = ImageManager.loadBitmap('img/pictures/', r88.Lockpick.parameters['Custom Background']);
            this.addChild(this._customBack);
        }
    }
    createButtons() {
    }
    helpWindowRect() {
        const ww = 720;
        const wh = this.helpAreaHeight() / 2;
        const wx = 0;
        const wy = this.helpAreaTop() + wh;
        return new Rectangle(wx, wy, ww, wh);
    }
    createHelpWindow() {
        const text = r88.Lockpick.parameters['Help Text'];
        const rect = this.helpWindowRect();
        const helpWindow = new Window_Base(rect);
        this.addWindow(helpWindow);
        helpWindow.opacity = 0;
        helpWindow.drawText(text, 5, -6, this.innerWidth);
        this._helpWindow = helpWindow;
    }
    pickWindowRect() {
        const ww = 200;
        const wh = this.helpAreaHeight() / 2;
        const wx = Graphics.boxWidth - ww;
        const wy = this.helpAreaTop() + wh;
        return new Rectangle(wx, wy, ww, wh);
    }
    createPickWindow() {
        const text = r88.Lockpick.parameters['Item Name'] + ': ' + $gameParty.numItems($dataItems[this.#itemId]);
        const rect = this.pickWindowRect();
        const pickWindow = new Window_Base(rect);
        this.addWindow(pickWindow);
        pickWindow.opacity = 0;
        pickWindow.drawText(text, 5, -6, this.innerWidth);
        this._pickWindow = pickWindow;
    }
    createLock() {
        let path = r88.Lockpick.parameters['Lock Image'];
        if (path) {
            const bitmap = ImageManager.loadBitmap('img/pictures/', r88.Lockpick.parameters['Lock Image']);
            this._lock = new Sprite();
            this._lock.bitmap = bitmap;
            this._lock.anchor.set(0.5, 0.5);
            this._lock.x = eval?.(r88.Lockpick.parameters['Lock X']);
            this._lock.y = eval?.(r88.Lockpick.parameters['Lock Y']);
            this.addChild(this._lock);
        };
    }
    createPick() {
        this._p1 = JSON.parse(r88.Lockpick.parameters['Pick Min']);
        this._p = JSON.parse(r88.Lockpick.parameters['Pick Start']);
        this._p2 = JSON.parse(r88.Lockpick.parameters['Pick Max']);
        this._pr = JSON.parse(r88.Lockpick.parameters['Pick Rate']);;

        let path = r88.Lockpick.parameters['Pick Image'];
        if (path) {
            const bitmap = ImageManager.loadBitmap('img/pictures/', r88.Lockpick.parameters['Pick Image']);
            this._pick = new Sprite();
            this._pick.bitmap = bitmap;
            this._pick.x = eval?.(r88.Lockpick.parameters['Pick X']);
            this._pick.y = eval?.(r88.Lockpick.parameters['Pick Y']);
            this._pick.anchor.set(0, 0.5);
            this._pick.angle = this._p;
            this.addChild(this._pick);
        }

    }
    createWrench() {
        this._w1 = JSON.parse(r88.Lockpick.parameters['Wrench Min']);
        this._w = 0;
        this._w2 = 0;
        this._w3 = JSON.parse(r88.Lockpick.parameters['Wrench Max']);
        this._wr = JSON.parse(r88.Lockpick.parameters['Wrench Rate']);

        let path = r88.Lockpick.parameters['Wrench Image'];
        if (path) {
            const bitmap = ImageManager.loadBitmap('img/pictures/', r88.Lockpick.parameters['Wrench Image']);
            this._wrench = new Sprite();
            this._wrench.bitmap = bitmap;
            this._wrench.x = eval?.(r88.Lockpick.parameters['Wrench X']);
            this._wrench.y = eval?.(r88.Lockpick.parameters['Wrench Y']);
            this._wrench.anchor.set(0.5, 0.5);
            this.addChild(this._wrench);
        }
    }
    playSound(soundStr) {
        AudioManager.playSe({ name: soundStr['name'], volume: soundStr['volume'], pitch: soundStr['pitch'] });
    }
    update() {
        super.update();

        if (this.#solveTimer > 0) {
            this.openLock();
            return;
        }

        if (this.#resetTimer > 0) {
            this.replacePick();
            return;
        }

        if (this.#isTrembling) {
            this._pick.angle += Math.random() * (0.5 - 0.5 + 1) - 0.5;
        }

        this.processInputs();
    }
    replacePick() {
        if (this.#resetTimer > this.#maxResetTimer - 10 && this._pick !== null && $gameParty.numItems($dataItems[this.#itemId]) > 0) {
            const angle = this._pick.angle * Math.PI / 180;
            const yTrans = Math.sin(angle) * 10;
            const xTrans = Math.cos(angle) * 10;
            this._pick.y += yTrans;
            this._pick.x += xTrans;
        }

        this.#resetTimer--;

        if (this.#resetTimer <= 10) {
            if (this.#exitFlag) {
                SceneManager.pop();
            } else {
                this._pick.destroy();
                this.createPick();
                this.#currDur = this.#maxDur;
                this.#resetTimer = 0;
            }
        }
    }
    openLock() {
        this._wrench.angle = this._w3;
        this.#solveTimer--;
        if (this.#solveTimer <= 10) {
            if (r88.Lockpick.selfSwitch !== '0') {
                $gameSelfSwitches.setValue([r88.Lockpick.mapId, r88.Lockpick.eventId, r88.Lockpick.selfSwitch], true);
            }
            $gameSwitches.setValue(r88.Lockpick.switch, true);

            SceneManager.pop();
        }
    }
    processInputs() {

        if (Input.isPressed('left') && !Input.isPressed('ok')) {
            if (this._p > this._p1) {
                this._p -= this._pr;
                this._pick.angle = this._p;
            }
        }

        if (Input.isPressed('right') && !Input.isPressed('ok')) {
            if (this._p < this._p2) {
                this._p += this._pr;
                this._pick.angle = this._p;
            }
        }

        if (Input.isPressed('ok')) {
            this.applyTension();
        } else {
            this.tensionDecay();
        }

        if (Input.isTriggered('escape')) {
            SceneManager.pop();
        }

    }
    breakPick() {
        this.playSound(JSON.parse(r88.Lockpick.parameters['Break Sound']));

        this.#resetTimer = this.#maxResetTimer;
        $gameParty.loseItem($dataItems[this.#itemId], 1);
        this._pickWindow.contents.clear();
        const text = r88.Lockpick.parameters['Item Name'] + ': ' + $gameParty.numItems($dataItems[this.#itemId]);
        this._pickWindow.drawText(text, 5, -6, this.innerWidth);

        if ($gameParty.numItems($dataItems[this.#itemId]) <= 0) {
            this.#exitFlag = true;
        }
    }
    damagePick() {

        if (this.#currDur > 0) {
            this.#isTrembling = true;
            this.#currDur--;
        } else {
            this.#isTrembling = false;
            this.breakPick();
        }

    }
    applyTension() {
        let difference = Math.abs(this._solution - this._p);
        const solveAngle = Math.ceil(r88.Lockpick.solveAngle / 2);
        let difference2 = difference - solveAngle;

        if (difference < solveAngle) {
            this._w2 = this._w3;
        } else {
            this._w2 = this._w3 / difference - r88.Lockpick.tolerance / difference2;
        }

        if (this._w >= this._w3) {
            this.#solveTimer = this.#maxSolveTimer;
            this.playSound(JSON.parse(r88.Lockpick.parameters['Unlock Sound']));
        }

        if (this._w < this._w2) {

            if (!this.#turnSoundFlag) {
                this.playSound(JSON.parse(r88.Lockpick.parameters['Turn Sound']));
                this.#turnSoundFlag = true;
            }
            this._w += this._wr;
            this._wrench.angle = this._w;

        } else {
            this.damagePick();
        }
    }
    tensionDecay() {
        this.#isTrembling = false;
        this.#turnSoundFlag = false;
        this._pick.angle = this._p;
        if (this._w > this._w1) {
            this._w -= this._wr;
            this._wrench.angle = this._w;
        }
    }
};

r88.Lockpick.launch = function (args) {
    r88.Lockpick.eventId = this._eventId;
    r88.Lockpick.mapId = this._mapId;
    r88.Lockpick.selfSwitch = args['Self-Switch'];
    r88.Lockpick.switch = args['Switch'];
    r88.Lockpick.solveAngle = JSON.parse(args['Solve Angle']);
    r88.Lockpick.tolerance = JSON.parse(args['Tolerance']);

    SceneManager.push(r88.Lockpick.Scene_Lockpick);
};

PluginManager.registerCommand("r88_Lockpick", "Open", r88.Lockpick.launch);

