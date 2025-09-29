System.register("chunks:///_virtual/AreaModel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvents.ts'], function (exports) {
  var _createClass, cclegacy, EventTarget, GameEvents;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      GameEvents = module.GameEvents;
    }],
    execute: function () {
      cclegacy._RF.push({}, "04841pLub9H0KVfkX1sNqHA", "AreaModel", undefined);
      var AreaModel = exports('AreaModel', /*#__PURE__*/function () {
        function AreaModel() {
          var _this = this;
          this.events = new EventTarget();
          this._limitMap = [5000, 55000, 120000];
          this._labelMap = ["環境アセスメントを原則不要とする", "国立公園等にも建設可能にする", "パネルリサイクル義務化を見送る", "-"];
          this._limit = this._limitMap[0];
          this._label = this._labelMap[0];
          this._current = 0;
          this._level = 0;
          this._total = 0;
          this._limitMap.forEach(function (val, idx) {
            _this._total += val;
          });
        }
        var _proto = AreaModel.prototype;
        _proto.reset = function reset() {
          this._current = 0;
          this._level = 0;
          this._limit = this._limitMap[0];
          this._label = this._labelMap[0];
        };
        _proto.checkAndAdd = function checkAndAdd(area) {
          if (this._current + area >= this._limit) {
            return false;
          }
          this._current += area;
          this.events.emit(GameEvents.AreaChanged, this._current);
          return true;
        };
        _proto.addLevel = function addLevel() {
          if (this._level >= this._limitMap.length) return;
          this._level++;
          if (this._level <= 2) {
            this._limit += this._limitMap[this._level];
            this.events.emit(GameEvents.AreaChanged, this._current, this._limit);
          }
          this._label = this._labelMap[this._level];
        };
        _proto.addArea = function addArea(value) {
          this._current += value;
          this.events.emit(GameEvents.AreaChanged, this._current, this._limit);
        };
        _createClass(AreaModel, [{
          key: "limit",
          get:
          // --- getters ---
          function get() {
            return this._limit;
          }
        }, {
          key: "current",
          get: function get() {
            return this._current;
          }
        }, {
          key: "label",
          get: function get() {
            return this._label;
          }
        }, {
          key: "level",
          get: function get() {
            return this._level;
          }
        }, {
          key: "rate",
          get: function get() {
            return this._current / this._total;
          }
        }]);
        return AreaModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BackgroundManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Shuffle.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, Node, view, Vec2, instantiate, UITransform, Component, shuffleArray;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Node = module.Node;
      view = module.view;
      Vec2 = module.Vec2;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
      Component = module.Component;
    }, function (module) {
      shuffleArray = module.shuffleArray;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "2f2aebstulJboc9KY/gA3VT", "BackgroundManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BackgroundManager = exports('BackgroundManager', (_dec = ccclass("BackgroundManager"), _dec2 = property(Prefab), _dec3 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BackgroundManager, _Component);
        function BackgroundManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "prefab", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bg2", _descriptor2, _assertThisInitialized(_this));
          _this._maxCol = 0;
          _this._maxRow = 0;
          _this._count = 0;
          _this._hasBg2 = false;
          _this._randomPos = [];
          _this._randomPosIndex = 0;
          _this._bg2AddCount = 10;
          return _this;
        }
        var _proto = BackgroundManager.prototype;
        _proto.start = function start() {
          // const uiTransform = this.node.getComponent(UITransform);
          // if (!uiTransform) {
          //     return 
          // }

          var designSize = view.getDesignResolutionSize();
          this._maxCol = Math.ceil(designSize.x / BackgroundManager.X);
          this._maxRow = Math.ceil(designSize.y / BackgroundManager.Y);
          // // console.log("bg", uiTransform.width, uiTransform.height,  this._maxCol * this._maxRow);
          // console.log("width", uiTransform.contentSize.width);
          // console.log("height", uiTransform.contentSize.height);
          // this._randomPos.push()

          for (var x = 0; x < this._maxCol; x++) {
            for (var y = 0; y < this._maxRow; y++) {
              this._randomPos.push(new Vec2(x * BackgroundManager.X, y * BackgroundManager.Y));
            }
          }
          this._randomPos = shuffleArray(this._randomPos);
        };
        _proto.reset = function reset() {
          this.node.removeAllChildren();
          this.bg2.removeAllChildren();
        };
        _proto.add = function add(times) {
          for (var i = 0; i < times; i++) {
            this.addItem();
          }
        };
        _proto.addItem = function addItem() {
          if (!this.prefab) {
            return;
          }
          if (!this._hasBg2 && this._count >= this._maxCol * this._maxRow) {
            this._hasBg2 = true;
          }
          if (this._hasBg2) {
            this._bg2AddCount--;
            if (this._bg2AddCount >= 0) {
              return;
            }
            this._bg2AddCount = 10;
          }
          var instance = instantiate(this.prefab);
          if (this._hasBg2) {
            this.bg2.addChild(instance);
          } else {
            this.node.addChild(instance);
          }
          var instanceTrans = instance.getComponent(UITransform);
          if (instanceTrans) {
            instanceTrans.setAnchorPoint(0, 0);
          }
          var vec = this.getPosi();
          // const x = this._count % this._maxCol * BackgroundManager.X;
          // const y = Math.floor(this._count / this._maxCol) * BackgroundManager.Y;
          instance.setPosition(vec.x, vec.y);
          this._count++;
        };
        _proto.getPosi = function getPosi() {
          var x = 0,
            y = 0;
          if (this._hasBg2) {
            var i = this._randomPosIndex % this._randomPos.length;
            this._randomPosIndex++;
            return this._randomPos[i];
          } else {
            x = this._count % this._maxCol * BackgroundManager.X;
            y = Math.floor(this._count / this._maxCol) * BackgroundManager.Y;
          }
          return new Vec2(x, y);
        };
        return BackgroundManager;
      }(Component), _class3.X = 60, _class3.Y = 40, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bg2", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Banner.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "91e11npcxFMnIt2s3Y5tNmT", "Banner", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Banner = exports('Banner', (_dec = ccclass('Banner'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Banner, _Component);
        function Banner() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "url", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = Banner.prototype;
        _proto.onClick = function onClick() {
          if (this.url) {
            window.open(this.url, '_blank');
          }
        };
        return Banner;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "url", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BootResolution.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, view, ResolutionPolicy, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      view = module.view;
      ResolutionPolicy = module.ResolutionPolicy;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "4989cxuCWtLTb+4PpnaaB2r", "BootResolution", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * デザイン高さ 1280 を基準に、
       * 表示可能高さ < 1280 のときだけ UIRoot を等倍縮小する。
       * 表示可能高さ >= 1280 のときはスケール1のまま（=拡大しない）。
       */
      var BootResolution = exports('BootResolution', (_dec = ccclass('BootResolution'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BootResolution, _Component);
        function BootResolution() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "uiRoot", _descriptor, _assertThisInitialized(_this));
          _this.BASE_W = 720;
          _this.BASE_H = 1280;
          _this.applyScale = function () {
            if (!_this.uiRoot) return;

            // 現在の“デザイン座標系”で見えている高さ
            // （FIXED_WIDTH 適用後の可視領域。ここが 1280 未満なら縮小が必要）
            var visible = view.getVisibleSize();
            var visibleH = visible.height;

            // 1280 以上なら 1、それ未満なら比率で等倍縮小（拡大はしない）
            var scale = Math.min(1, visibleH / _this.BASE_H);

            // 等方スケール（X=Y）→ UI の比率を保ったまま全体を引き下げ
            _this.uiRoot.setScale(scale, scale, 1);
          };
          return _this;
        }
        var _proto = BootResolution.prototype;
        _proto.onLoad = function onLoad() {
          // 横幅は基準に合わせ続ける（中央カラム安定）
          view.setDesignResolutionSize(this.BASE_W, this.BASE_H, ResolutionPolicy.FIXED_WIDTH);
          view.resizeWithBrowserSize(true);
          this.applyScale();
          view.on('canvas-resize', this.applyScale, this);
        };
        _proto.onDestroy = function onDestroy() {
          view.off('canvas-resize', this.applyScale, this);
        };
        return BootResolution;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiRoot", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClickButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameStore.ts', './GameEvents.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, Node, instantiate, Component, gameModel, GameEvents;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Node = module.Node;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      gameModel = module.gameModel;
    }, function (module) {
      GameEvents = module.GameEvents;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "d5a90d1AoVGDomBW9qKUPUY", "ClickButton", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * Button の Click Event にこの onClick を関連付ける
       */
      var ClickButton = exports('ClickButton', (_dec = ccclass('ClickButton'), _dec2 = property(Prefab), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ClickButton, _Component);
        function ClickButton() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "prefab", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "imagesNode", _descriptor2, _assertThisInitialized(_this));
          _this._amount = 1;
          return _this;
        }
        var _proto = ClickButton.prototype;
        _proto.start = function start() {
          gameModel.events.on(GameEvents.ClickGenChanged, this.addBicycle, this);
        };
        _proto.onDestroy = function onDestroy() {
          gameModel.events.off(GameEvents.ClickGenChanged, this.addBicycle, this);
        };
        _proto.onClick = function onClick() {
          if (gameModel.isFinished) return;
          var power = Math.max(1, gameModel.autoGen / 1000);
          var income = gameModel.clickGen * power * gameModel.sellPrice;
          if (income > 0) {
            gameModel.addMoney(income);
          }
          gameModel.addGenerated(gameModel.clickGen);
        };
        _proto.addBicycle = function addBicycle() {
          if (!this.prefab) {
            return;
          }
          if (this._amount >= 15) return;
          this._amount++;
          var instance = instantiate(this.prefab);
          this.imagesNode.addChild(instance);
        };
        return ClickButton;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "imagesNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Cloud.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "72c66rmuUpMtbdNrBmNkF0S", "Cloud", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Cloud = exports('Cloud', (_dec = ccclass("Cloud"), _dec2 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Cloud, _Component);
        function Cloud() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "label", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = Cloud.prototype;
        _proto.setText = function setText(text) {
          this.label.string = text;
        };
        return Cloud;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CloudManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CloudPool.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, UITransform, Vec3, Component, CloudPool;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      CloudPool = module.CloudPool;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3;
      cclegacy._RF.push({}, "a850dReCUVEfrtadrHlm1kA", "CloudManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CloudManager = exports('CloudManager', (_dec = ccclass("CloudManager"), _dec2 = property(CloudPool), _dec3 = property(UITransform), _dec4 = property({
        tooltip: "表示秒"
      }), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CloudManager, _Component);
        function CloudManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "pool", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "trans", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "showDuration", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = CloudManager.prototype;
        _proto.onLoad = function onLoad() {
          // シーンに1個だけ置く前提
          CloudManager._instance = this;
        };
        _proto.show = function show(text) {
          var _this2 = this;
          var cloud = this.pool.rent();
          cloud.setText(text);

          // ランダムな位置（Canvas 内）
          var x = (Math.random() - 0.5) * this.trans.width;
          var y = (Math.random() - 0.5) * this.trans.height;
          cloud.node.setPosition(new Vec3(x, y, 0));
          this.scheduleOnce(function () {
            _this2.pool["return"](cloud);
          }, this.showDuration);
        };
        _createClass(CloudManager, null, [{
          key: "instance",
          get:
          // どこからでも参照できるインスタンス
          function get() {
            if (!this._instance) {
              throw new Error("CloudManager is not initialized. シーンに CloudManager を置いてください。");
            }
            return this._instance;
          }
        }]);
        return CloudManager;
      }(Component), _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pool", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "trans", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "showDuration", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CloudPool.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ObjectPool.ts', './Cloud.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, ObjectPool, Cloud;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ObjectPool = module.ObjectPool;
    }, function (module) {
      Cloud = module.Cloud;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "88f97Tfv0xGKZNL+IP/76mm", "CloudPool", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CloudPool = exports('CloudPool', (_dec = ccclass("CloudPool"), _dec(_class = /*#__PURE__*/function (_ObjectPool) {
        _inheritsLoose(CloudPool, _ObjectPool);
        function CloudPool() {
          return _ObjectPool.apply(this, arguments) || this;
        }
        var _proto = CloudPool.prototype;
        _proto.getPoolComponent = function getPoolComponent(node) {
          return node.getComponent(Cloud);
        };
        return CloudPool;
      }(ObjectPool)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CommandData.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "98e36paWRJPmpwSy0PaRZjE", "CommandData", undefined);
      // import {CommandData} from "@/ui/CommandItem";

      var CommandData = exports('CommandData', /*#__PURE__*/function () {
        function CommandData(level, price, addRate, maxLevel, label) {
          this._rate = 1;
          this._basePrice = void 0;
          this.level = level;
          this.price = price;
          this.addRate = addRate;
          this.maxLevel = maxLevel;
          this.label = label;
          this._basePrice = price;
        }
        //レベルアップ
        var _proto = CommandData.prototype;
        _proto.levelUp = function levelUp(times) {
          if (times === void 0) {
            times = 1;
          }
          this.level += times;
          this._rate += this.addRate * times;
          this.price = Math.floor(this._basePrice * this._rate);
        };
        _proto.priceDown = function priceDown(value) {
          this._basePrice = Math.floor(this._basePrice * value);
          this.price = Math.floor(this.price * value);
        };
        _proto.reset = function reset() {
          this.level = 0;
          this._rate = 0;
          this.price = this._basePrice;
        };
        return CommandData;
      }());
      var powerGeneratorUpData = exports('powerGeneratorUpData', new CommandData(0,
      //初期レベル
      50,
      //Price
      0.05 //Price加算率
      ));

      var solarPanelData = exports('solarPanelData', new CommandData(0,
      //初期レベル
      500,
      //Price
      0.05 //Price加算率
      ));

      var megaSolarData = exports('megaSolarData', new CommandData(0,
      //初期レベル
      100000000,
      //Price
      0.25 //Price加算率
      ));

      var sellPriceUpData = exports('sellPriceUpData', new CommandData(0,
      //初期レベル
      1000000,
      //Price
      15,
      //Price加算率
      25 //最大レベル
      ));

      var environmentUpData = exports('environmentUpData', new CommandData(0,
      //初期レベル
      50000000,
      //Price
      150,
      //Price加算率
      3,
      //最大レベル
      "山林も開発可能にする"));
      var mediaLevelData = exports('mediaLevelData', new CommandData(0,
      //初期レベル
      3000000,
      //Price
      0.5 //Price加算率
      ));

      var fireGeneratorData = exports('fireGeneratorData', new CommandData(0,
      //初期レベル
      100000000000,
      //Price
      1.5,
      //Price加算率
      1 //最大レベル
      ));

      var perobusukaitoData = exports('perobusukaitoData', new CommandData(0,
      //初期レベル
      5000000,
      //Price
      1.5,
      //Price加算率
      1 //最大レベル
      ));

      var FacilityData = exports('FacilityData', function FacilityData(powerGenerate, area) {
        this.powerGenerate = powerGenerate;
        this.area = area;
      });
      var solarPanelFacilityData = exports('solarPanelFacilityData', new FacilityData(10,
      //発電量
      0 //専有面積
      ));

      var megaSolarFacilityData = exports('megaSolarFacilityData', new FacilityData(5000000,
      //発電量
      10 //専有面積
      ));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CommandItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PriceFormatter.ts', './GameStore.ts', './GameEvents.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Button, EventTarget, Component, formatPrice, gameModel, GameEvents;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Button = module.Button;
      EventTarget = module.EventTarget;
      Component = module.Component;
    }, function (module) {
      formatPrice = module.formatPrice;
    }, function (module) {
      gameModel = module.gameModel;
    }, function (module) {
      GameEvents = module.GameEvents;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "3760cXFtgVMzoLpDsaVw21w", "CommandItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CommandItem = exports('CommandItem', (_dec = ccclass("CommandItem"), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CommandItem, _Component);
        function CommandItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "levelLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "priceLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "titleLabel", _descriptor3, _assertThisInitialized(_this));
          _this._data = void 0;
          _this.events = void 0;
          _this._button = void 0;
          _this._times = 1;
          return _this;
        }
        var _proto = CommandItem.prototype;
        _proto.setUp = function setUp(data, times) {
          if (times === void 0) {
            times = 1;
          }
          this._data = data;
          this._times = times;
          this.onUpdate();
        };
        _proto.onUpdate = function onUpdate() {
          this.levelLabel.string = this._data.level.toString();
          this.priceLabel.string = formatPrice(this._data.price * this._times);
          this.checkPrice(gameModel.money);
          if (this._data.maxLevel != null) {
            if (this._data.level >= this._data.maxLevel) {
              this.setInactive();
            }
          }
          if (this.titleLabel != null && this._data.label != null) {
            this.titleLabel.string = this._data.label;
          }
        };
        _proto.onLoad = function onLoad() {
          var button = this.node.getComponent(Button);
          if (!button) return;
          this._button = button;
          this.events = new EventTarget();
          this._button.node.on(Button.EventType.CLICK, this.onClick, this);
          gameModel.events.on(GameEvents.MoneyChanged, this.checkPrice, this);
        };
        _proto.onClick = function onClick() {
          this.events.emit(Button.EventType.CLICK);
        };
        _proto.onDestroy = function onDestroy() {
          // this._button.node.off(Button.EventType.CLICK, this.onClick, this);
          gameModel.events.off(GameEvents.MoneyChanged, this.checkPrice, this);
        };
        _proto.checkPrice = function checkPrice(money) {
          this._button.interactable = this._data.price * this._times <= money;
        };
        _proto.setInactive = function setInactive() {
          this._button.interactable = false;
          this._button.node.off(Button.EventType.CLICK, this.onClick, this);
          gameModel.events.off(GameEvents.MoneyChanged, this.checkPrice, this);
          this.priceLabel.string = "-";
        };
        return CommandItem;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "levelLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "priceLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "titleLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CommandList.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CommandItem.ts', './BackgroundManager.ts', './GameStore.ts', './CommandData.ts', './InfoDialog.ts', './MediaDialog.ts', './PoliticianDialog.ts', './Enums.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, Component, CommandItem, BackgroundManager, areaModel, gameModel, powerGeneratorUpData, megaSolarData, sellPriceUpData, mediaLevelData, fireGeneratorData, perobusukaitoData, environmentUpData, solarPanelFacilityData, solarPanelData, megaSolarFacilityData, InfoDialog, MediaDialog, PoliticianDialog, PoliticianType;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Component = module.Component;
    }, function (module) {
      CommandItem = module.CommandItem;
    }, function (module) {
      BackgroundManager = module.BackgroundManager;
    }, function (module) {
      areaModel = module.areaModel;
      gameModel = module.gameModel;
    }, function (module) {
      powerGeneratorUpData = module.powerGeneratorUpData;
      megaSolarData = module.megaSolarData;
      sellPriceUpData = module.sellPriceUpData;
      mediaLevelData = module.mediaLevelData;
      fireGeneratorData = module.fireGeneratorData;
      perobusukaitoData = module.perobusukaitoData;
      environmentUpData = module.environmentUpData;
      solarPanelFacilityData = module.solarPanelFacilityData;
      solarPanelData = module.solarPanelData;
      megaSolarFacilityData = module.megaSolarFacilityData;
    }, function (module) {
      InfoDialog = module.InfoDialog;
    }, function (module) {
      MediaDialog = module.MediaDialog;
    }, function (module) {
      PoliticianDialog = module.PoliticianDialog;
    }, function (module) {
      PoliticianType = module.PoliticianType;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;
      cclegacy._RF.push({}, "f81d4Tf2nJHXYw2ZMF2bVnf", "CommandList", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CommandList = exports('CommandList', (_dec = ccclass('CommandList'), _dec2 = property(CommandItem), _dec3 = property(CommandItem), _dec4 = property(CommandItem), _dec5 = property(CommandItem), _dec6 = property(CommandItem), _dec7 = property(CommandItem), _dec8 = property(CommandItem), _dec9 = property(CommandItem), _dec10 = property(CommandItem), _dec11 = property(BackgroundManager), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CommandList, _Component);
        function CommandList() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "powerGeneratorUp", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "megaSolar", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "megaSolar10", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "megaSolar100", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sellPriceUp", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "environmentUp", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "media", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fireGenerator", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "perobusukaito", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "backgroundManager", _descriptor10, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = CommandList.prototype;
        _proto.start = function start() {
          this.megaSolar100.node.active = true;
          this.powerGeneratorUp.setUp(powerGeneratorUpData);
          this.megaSolar.setUp(megaSolarData);
          this.megaSolar10.setUp(megaSolarData, 9);
          this.megaSolar100.setUp(megaSolarData, 80);
          this.sellPriceUp.setUp(sellPriceUpData);
          this.media.setUp(mediaLevelData);
          this.fireGenerator.setUp(fireGeneratorData);
          this.perobusukaito.setUp(perobusukaitoData);
          environmentUpData.label = areaModel.label;
          this.environmentUp.setUp(environmentUpData);
          this.powerGeneratorUp.events.on(Button.EventType.CLICK, this.onPowerGeneratorUp, this);
          this.megaSolar.events.on(Button.EventType.CLICK, this.onMegaSolar_1, this);
          this.megaSolar10.events.on(Button.EventType.CLICK, this.onMegaSolar_10, this);
          this.megaSolar100.events.on(Button.EventType.CLICK, this.onMegaSolar_100, this);
          this.sellPriceUp.events.on(Button.EventType.CLICK, this.onSellPriceUp, this);
          this.environmentUp.events.on(Button.EventType.CLICK, this.onEnvironmentUp, this);
          this.media.events.on(Button.EventType.CLICK, this.onMedia, this);
          this.fireGenerator.events.on(Button.EventType.CLICK, this.onFireGeneratorUp, this);
          this.perobusukaito.events.on(Button.EventType.CLICK, this.onPerobusukaito, this);
          this.megaSolar100.node.active = false;
        };
        _proto.onDestroy = function onDestroy() {
          this.powerGeneratorUp.events.off(Button.EventType.CLICK, this.onPowerGeneratorUp, this);
          this.megaSolar.events.off(Button.EventType.CLICK, this.onMegaSolar_1, this);
          this.megaSolar10.events.off(Button.EventType.CLICK, this.onMegaSolar_10, this);
          this.megaSolar100.events.off(Button.EventType.CLICK, this.onMegaSolar_100, this);
          this.sellPriceUp.events.off(Button.EventType.CLICK, this.onSellPriceUp, this);
          this.environmentUp.events.off(Button.EventType.CLICK, this.onEnvironmentUp, this);
          this.media.events.off(Button.EventType.CLICK, this.onMedia, this);
          this.fireGenerator.events.off(Button.EventType.CLICK, this.onFireGeneratorUp, this);
          this.perobusukaito.events.off(Button.EventType.CLICK, this.onPerobusukaito, this);
        };
        _proto.reset = function reset() {
          powerGeneratorUpData.reset();
          megaSolarData.reset();
          sellPriceUpData.reset();
          mediaLevelData.reset();
          fireGeneratorData.reset();
          perobusukaitoData.reset();
          this.megaSolar100.node.active = true;
          this.fireGenerator.node.active = true;
          this.powerGeneratorUp.onUpdate();
          this.megaSolar.onUpdate();
          this.megaSolar10.onUpdate();
          this.megaSolar100.onUpdate();
          this.sellPriceUp.onUpdate();
          this.media.onUpdate();
          this.fireGenerator.onUpdate();
          this.perobusukaito.onUpdate();
          this.megaSolar100.node.active = false;
        };
        _proto.onPowerGeneratorUp = function onPowerGeneratorUp() {
          if (gameModel.isFinished) return;
          gameModel.addClickGen();
          gameModel.subMoney(powerGeneratorUpData.price);
          powerGeneratorUpData.levelUp();
          this.powerGeneratorUp.onUpdate();
        };
        _proto.onSolarPanel = function onSolarPanel() {
          if (gameModel.isFinished) return;
          if (!areaModel.checkAndAdd(solarPanelFacilityData.area)) {
            InfoDialog.instance.show("新規建設可能エリアがありません");
            return;
          }
          gameModel.addAutoGen(solarPanelFacilityData.powerGenerate);
          areaModel.addArea(solarPanelFacilityData.area);
          gameModel.subMoney(solarPanelData.price);
          solarPanelData.levelUp();
          this.megaSolar10.onUpdate();
        };
        _proto.onMegaSolar_1 = function onMegaSolar_1() {
          this.onMegaSolar(1, 1);
        };
        _proto.onMegaSolar_10 = function onMegaSolar_10() {
          this.onMegaSolar(10, 9);
        };
        _proto.onMegaSolar_100 = function onMegaSolar_100() {
          this.onMegaSolar(100, 80);
        };
        _proto.onMegaSolar = function onMegaSolar(times, priceTimes) {
          if (gameModel.isFinished) return;
          if (!areaModel.checkAndAdd(megaSolarFacilityData.area * times)) {
            InfoDialog.instance.show("新規建設可能エリアがありません");
            return;
          }
          gameModel.addAutoGen(megaSolarFacilityData.powerGenerate * times);
          areaModel.addArea(megaSolarFacilityData.area * times);
          gameModel.subMoney(megaSolarData.price * priceTimes);
          megaSolarData.levelUp(times);
          this.megaSolar.onUpdate();
          this.megaSolar10.onUpdate();
          this.megaSolar100.onUpdate();
          this.backgroundManager.add(times);
        };
        _proto.onSellPriceUp = function onSellPriceUp() {
          if (gameModel.isFinished) return;
          gameModel.addSellPrice();
          gameModel.subMoney(sellPriceUpData.price);
          sellPriceUpData.levelUp();
          this.sellPriceUp.onUpdate();
        };
        _proto.onEnvironmentUp = function onEnvironmentUp() {
          var _this2 = this;
          if (gameModel.isFinished) return;
          gameModel.subMoney(environmentUpData.price);
          environmentUpData.levelUp();
          if (environmentUpData.level == 1) {
            PoliticianDialog.instance.show(PoliticianType.Env1, function () {
              areaModel.addLevel();
              _this2.updateEnvironment();
            });
          } else if (environmentUpData.level == 2) {
            PoliticianDialog.instance.show(PoliticianType.Env2, function () {
              areaModel.addLevel();
              _this2.updateEnvironment();
            });
          } else if (environmentUpData.level == 3) {
            PoliticianDialog.instance.show(PoliticianType.Recycle, function () {
              areaModel.addLevel();
              megaSolarData.priceDown(0.5);
              _this2.megaSolar.onUpdate();
              _this2.megaSolar10.onUpdate();
              _this2.megaSolar100.onUpdate();
              _this2.updateEnvironment();
            });
          }
        };
        _proto.updateEnvironment = function updateEnvironment() {
          environmentUpData.label = areaModel.label;
          this.environmentUp.onUpdate();
        };
        _proto.onMedia = function onMedia() {
          if (gameModel.isFinished) return;
          MediaDialog.instance.show();
          gameModel.subMoney(mediaLevelData.price);
          mediaLevelData.levelUp();
          this.media.onUpdate();
        };
        _proto.onFireGeneratorUp = function onFireGeneratorUp() {
          var _this3 = this;
          if (gameModel.isFinished) return;
          var message = "\u706B\u529B\u767A\u96FB\u6240\u306F\u3001\u518D\u30A8\u30CD\u3088\u308A\u3082\u9762\u7A4D\u5F53\u305F\u308A\u306E\u767A\u96FB\u52B9\u7387\u304C\u9AD8\u3044\u304B\u3064\u3001\u74B0\u5883\u306E\u5909\u5316\u306B\u5F71\u97FF\u3092\u3046\u3051\u306A\u3044\u5B89\u5B9A\u7684\u306A\u767A\u96FB\u65B9\u6CD5\u3067\u3059\u304C\u3001\u8131\u70AD\u7D20\u306B\u8235\u3092\u5207\u3063\u3066\u3044\u308B\u4ECA\u306E\u65E5\u672C\u3067\u306F\u65B0\u898F\u5EFA\u9020\u304C\u3067\u304D\u307E\u305B\u3093\n";
          InfoDialog.instance.show(message, function () {
            fireGeneratorData.maxLevel = 0;
            _this3.fireGenerator.onUpdate();
            _this3.fireGenerator.node.active = false;
            _this3.megaSolar100.node.active = true;
          });
        };
        _proto.onPerobusukaito = function onPerobusukaito() {
          var _this4 = this;
          if (gameModel.isFinished) return;
          var message = "\u30DA\u30ED\u30D6\u30B9\u30AB\u30A4\u30C8\u592A\u967D\u96FB\u6C60\u306F\u3001\u65E5\u672C\u304C\u4E16\u754C\u3092\u30EA\u30FC\u30C9\u3059\u308B\u6B21\u4E16\u4EE3\u578B\u306E\u592A\u967D\u5149\u767A\u96FB\u6280\u8853\u3067\u3059\u3002\u8EFD\u91CF\u3067\u8A2D\u7F6E\u306E\u81EA\u7531\u5EA6\u304C\u9AD8\u3044\u4E00\u65B9\u3001\u307E\u3060\u666E\u53CA\u306B\u306F\u7814\u7A76\u958B\u767A\u3084\u30B3\u30B9\u30C8\u9762\u306E\u8AB2\u984C\u304C\u6B8B\u3063\u3066\u3044\u307E\u3059\u3002\u73FE\u6642\u70B9\u3067\u306F\u5F93\u6765\u578B\u306E\u4E2D\u56FD\u88FD\u30D1\u30CD\u30EB\u3092\u5229\u7528\u3057\u307E\u3057\u3087\u3046\u3002\n";
          InfoDialog.instance.show(message, function () {
            perobusukaitoData.maxLevel = 0;
            _this4.perobusukaito.onUpdate();
          });
        };
        return CommandList;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "powerGeneratorUp", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "megaSolar", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "megaSolar10", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "megaSolar100", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sellPriceUp", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "environmentUp", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "media", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "fireGenerator", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "perobusukaito", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "backgroundManager", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ConfirmDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Label, Node, EventTarget, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      EventTarget = module.EventTarget;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "2dc29jG4lJM1p2vrZ4fGM2j", "ConfirmDialog", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ConfirmDialog = exports('ConfirmDialog', (_dec = ccclass('ConfirmDialog'), _dec2 = property(Label), _dec3 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ConfirmDialog, _Component);
        function ConfirmDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "messageLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "overlay", _descriptor2, _assertThisInitialized(_this));
          _this._onYes = null;
          _this._onNo = null;
          _this.events = new EventTarget();
          return _this;
        }
        var _proto = ConfirmDialog.prototype;
        _proto.onLoad = function onLoad() {
          // シーンに1個だけ置く前提
          ConfirmDialog._instance = this;
          this.node.active = false;
          this.overlay.active = false;
        };
        _proto.show = function show(message, onYes, onNo) {
          this.messageLabel.string = message;
          this._onYes = onYes || null;
          this._onNo = onNo || null;
          this.overlay.active = true;
          this.node.active = true;
          this.events.emit("show");
        }

        //onClick関数
        ;

        _proto.onClickYes = function onClickYes() {
          this.close();
          if (this._onYes) {
            this._onYes();
          }
        };
        _proto.onClickNo = function onClickNo() {
          this.close();
          if (this._onNo) {
            this._onNo();
          }
        };
        _proto.close = function close() {
          this.node.active = false;
          this.overlay.active = false;
          this.events.emit("close");
        };
        _createClass(ConfirmDialog, null, [{
          key: "instance",
          get:
          // どこからでも参照できるインスタンス
          function get() {
            if (!this._instance) {
              throw new Error("ConfirmDialog is not initialized. シーンに ConfirmDialog を置いてください。");
            }
            return this._instance;
          }
        }]);
        return ConfirmDialog;
      }(Component), _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "messageLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "overlay", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DiscontentMessage.ts", ['cc', './Enums.ts', './GameStore.ts', './CommandData.ts', './Shuffle.ts'], function (exports) {
  var cclegacy, DiscontentType, areaModel, gameModel, sellPriceUpData, shuffleArray;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DiscontentType = module.DiscontentType;
    }, function (module) {
      areaModel = module.areaModel;
      gameModel = module.gameModel;
    }, function (module) {
      sellPriceUpData = module.sellPriceUpData;
    }, function (module) {
      shuffleArray = module.shuffleArray;
    }],
    execute: function () {
      exports('getDiscontentMessage', getDiscontentMessage);
      cclegacy._RF.push({}, "a9c59Fc2AlDvIe+a8opn48B", "DiscontentMessage", undefined);
      function getDiscontentMessage(type) {
        if (type == DiscontentType.Env) {
          return getEnvMessage();
        } else if (type == DiscontentType.Supply) {
          return getSupplyMessage();
        } else if (type == DiscontentType.Tax) {
          return getTaxMessage();
        } else {
          return null;
        }
      }
      var envMessages = [];
      var supplyMessages = [];
      var taxMessages = [];
      var getEnvMessage = function getEnvMessage() {
        envMessages = [];
        if (areaModel.level >= 1) {
          envMessages.push("識者からは「環境アセスメントを経ない事業は断じて容認できない」と厳しい声があります");
          envMessages.push("専門家からは「環境影響評価を飛ばす計画は時代錯誤」と批判が殺到しています");
        }
        if (areaModel.level >= 2) {
          envMessages.push("識者からは「国立公園の存在意義を失わせる」と断じる声があります");
          envMessages.push("専門家からは「国立公園を破壊する歴史的愚行」と非難が強まっています");
        }
        if (areaModel.level >= 3) {
          envMessages.push("住民からは「廃棄パネルが山積みになる未来を想定しないのか」と怒りが高まっています");
          envMessages.push("専門家からは「リサイクルを放棄した時点で環境政策は破綻」と断罪する声があります");
          envMessages.push("");
        }
        if (areaModel.rate >= 0.5) {
          envMessages.push("「メガソーラーによって、多くの自然が破壊された」と国民の怒りの声が渦巻いています");
        }
        if (envMessages.length == 0) {
          return null;
        }
        return shuffleArray(envMessages)[0];
      };
      var getSupplyMessage = function getSupplyMessage() {
        supplyMessages = [];
        if (gameModel.energyRate >= 0.5) {
          supplyMessages.push("各地で、「雨や曇りの日は電気が弱い」という指摘が寄せられています");
          supplyMessages.push("市民からは、「天気に左右されすぎでは」という疑問の声が上がっています");
        }
        if (gameModel.energyRate >= 0.7) {
          supplyMessages.push("「再エネの偏重は、エネルギー政策の失敗だ」と専門家から断罪の声が上がっています");
          supplyMessages.push("「太陽が隠れれば生活も止まる」と国民から悲痛な声が寄せられています");
        }
        if (gameModel.energyRate >= 0.9) {
          supplyMessages.push("国民から「曇天や雨の日に生活できない」との切迫した訴えが広がっています");
          supplyMessages.push("「メガソーラーへ傾倒しすぎて、安定供給を投げ捨てた」と専門家の非難が相次いでいます");
        }
        if (supplyMessages.length == 0) {
          return null;
        }
        return shuffleArray(supplyMessages)[0];
      };
      var getTaxMessage = function getTaxMessage() {
        taxMessages = [];
        if (sellPriceUpData.level >= 10) {
          taxMessages.push("家庭から「電気代が少し上がっている、再エネ賦課金の負担か？」という声が聞かれます");
          taxMessages.push("「メガソーラーによって、森が減っているのに森林税を払うのはおかしい」という戸惑いの声が寄せられています");
        }
        if (sellPriceUpData.level >= 15) {
          taxMessages.push("「再エネ賦課金が重く、生活を圧迫している」という切実な声が出ています");
          taxMessages.push("各地で、「電気代が生活を直撃している」との深刻な訴えが相次いでいます");
        }
        if (sellPriceUpData.level >= 20) {
          taxMessages.push("メガソーラー事業者だけが利益を得る再エネ賦課金を廃止しろというデモが各地で行われています");
          taxMessages.push("今日も、電気代の高騰を招いているとして、再エネ賦課金の廃止を訴えるデモが行われています");
        }
        if (taxMessages.length == 0) {
          return null;
        }
        return shuffleArray(taxMessages)[0];
      };
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DiscontentModel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvents.ts', './GameStore.ts', './Enums.ts', './CommandData.ts'], function (exports) {
  var _createClass, cclegacy, clamp01, EventTarget, GameEvents, areaModel, gameModel, DiscontentType, sellPriceUpData;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      clamp01 = module.clamp01;
      EventTarget = module.EventTarget;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      areaModel = module.areaModel;
      gameModel = module.gameModel;
    }, function (module) {
      DiscontentType = module.DiscontentType;
    }, function (module) {
      sellPriceUpData = module.sellPriceUpData;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bad1flAXwtJsqunqLlPBK7u", "DiscontentModel", undefined);

      //不満モデル
      var DiscontentModel = exports('DiscontentModel', /*#__PURE__*/function () {
        function DiscontentModel() {
          this.events = new EventTarget();
          this._env = 0;
          this._supply = 0;
          this._tax = 0;
        }
        var _proto = DiscontentModel.prototype;
        _proto.reset = function reset() {
          this._env = 0;
          this._supply = 0;
          this._tax = 0;
          this.update();
        };
        _proto.update = function update() {
          //環境不満
          if (areaModel.level == 2) {
            this._env += 0.4;
          } else if (areaModel.level == 3) {
            this._env += 0.75;
          }
          if (areaModel.rate >= 0.3) {
            this._env += areaModel.rate;
          }

          //税金不満
          if (sellPriceUpData.level >= 25) {
            this._tax += 1;
          }
          if (sellPriceUpData.level >= 20) {
            this._tax += 0.8;
          } else if (sellPriceUpData.level >= 15) {
            this._tax += 0.5;
          } else if (sellPriceUpData.level >= 10) {
            this._tax += 0.3;
          } else if (sellPriceUpData.level >= 5) {
            this._tax += 0.1;
          }

          //供給力不満
          if (gameModel.energyRate >= 0.9) {
            this._supply += gameModel.energyRate * 1.8;
          } else if (gameModel.energyRate >= 0.6) {
            this._supply += gameModel.energyRate * 1.5;
          } else if (gameModel.energyRate >= 0.3) {
            this._supply += gameModel.energyRate * 1.25;
          }
          this.updateRate();
        };
        _proto.updateValue = function updateValue(type) {
          switch (type) {
            case DiscontentType.Counter:
              this._env += 5;
              this._supply += 5;
              this._tax += 5;
              break;
            case DiscontentType.Overall:
              this._env = Math.min(100, this._env);
              this._supply = Math.min(100, this._supply);
              this._tax = Math.min(100, this._tax);
              this._env -= 5;
              this._supply -= 5;
              this._tax -= 5;
              break;
            case DiscontentType.Env:
              this._env = Math.min(100, this._env);
              this._env -= 15;
              break;
            case DiscontentType.Supply:
              this._supply = Math.min(100, this._supply);
              this._supply -= 15;
              break;
            case DiscontentType.Tax:
              this._tax = Math.min(100, this._tax);
              this._tax -= 15;
              break;
          }
          this._env = Math.max(0, this._env);
          this._supply = Math.max(0, this._supply);
          this._tax = Math.max(0, this._tax);
          this.updateRate();
        };
        _proto.updateRate = function updateRate() {
          var envRate = clamp01(this._env / 100);
          var supplyRate = clamp01(this._supply / 100);
          var taxRate = clamp01(this._tax / 100);
          this.events.emit(GameEvents.EnvDiscontentChanged, envRate);
          this.events.emit(GameEvents.SupplyDiscontentChanged, supplyRate);
          this.events.emit(GameEvents.TaxDiscontentChanged, taxRate);
          if (this._env >= 110 || this._supply >= 110 || this._tax >= 110) {
            gameModel.finish();
          }
        };
        _createClass(DiscontentModel, [{
          key: "env",
          get: function get() {
            return Math.min(100, this._env);
          }
        }, {
          key: "supply",
          get: function get() {
            return Math.min(100, this._supply);
          }
        }, {
          key: "tax",
          get: function get() {
            return Math.min(100, this._tax);
          }
        }]);
        return DiscontentModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Enums.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dfc7cJf899PSr87tbWsqCHL", "Enums", undefined);
      var CommandType = exports('CommandType', /*#__PURE__*/function (CommandType) {
        CommandType[CommandType["PowerGeneratorUp"] = 0] = "PowerGeneratorUp";
        CommandType[CommandType["MegaSolar"] = 1] = "MegaSolar";
        CommandType[CommandType["SellPriceUp"] = 2] = "SellPriceUp";
        CommandType[CommandType["NoGenerateCompensation"] = 3] = "NoGenerateCompensation";
        CommandType[CommandType["ZeroCarbonLevelUp"] = 4] = "ZeroCarbonLevelUp";
        CommandType[CommandType["FireGenerator"] = 5] = "FireGenerator";
        return CommandType;
      }({}));
      var DiscontentType = exports('DiscontentType', /*#__PURE__*/function (DiscontentType) {
        DiscontentType[DiscontentType["Overall"] = 0] = "Overall";
        DiscontentType[DiscontentType["Supply"] = 1] = "Supply";
        DiscontentType[DiscontentType["Env"] = 2] = "Env";
        DiscontentType[DiscontentType["Tax"] = 3] = "Tax";
        DiscontentType[DiscontentType["Counter"] = 4] = "Counter";
        return DiscontentType;
      }({}));
      var PoliticianType = exports('PoliticianType', /*#__PURE__*/function (PoliticianType) {
        PoliticianType[PoliticianType["Subsidy"] = 0] = "Subsidy";
        PoliticianType[PoliticianType["Env1"] = 1] = "Env1";
        PoliticianType[PoliticianType["Env2"] = 2] = "Env2";
        PoliticianType[PoliticianType["Recycle"] = 3] = "Recycle";
        return PoliticianType;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameStore.ts', './GameEvents.ts', './TickEmitter.ts', './ConfirmDialog.ts', './InfoDialog.ts', './MediaDialog.ts', './GameResult.ts', './PoliticianDialog.ts', './Enums.ts', './BackgroundManager.ts', './CommandList.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Component, timeModel, gameModel, discontentModel, GameEvents, TickEmitter, ConfirmDialog, InfoDialog, MediaDialog, GameResult, PoliticianDialog, PoliticianType, BackgroundManager, CommandList;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      timeModel = module.timeModel;
      gameModel = module.gameModel;
      discontentModel = module.discontentModel;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      TickEmitter = module.TickEmitter;
    }, function (module) {
      ConfirmDialog = module.ConfirmDialog;
    }, function (module) {
      InfoDialog = module.InfoDialog;
    }, function (module) {
      MediaDialog = module.MediaDialog;
    }, function (module) {
      GameResult = module.GameResult;
    }, function (module) {
      PoliticianDialog = module.PoliticianDialog;
    }, function (module) {
      PoliticianType = module.PoliticianType;
    }, function (module) {
      BackgroundManager = module.BackgroundManager;
    }, function (module) {
      CommandList = module.CommandList;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;
      cclegacy._RF.push({}, "08d53z1sXlAeZ7u5akIhbaD", "GameController", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 初期値の設定と、1秒ごとの自動加算を担当
       */
      var GameController = exports('GameController', (_dec = ccclass('GameController'), _dec2 = property({
        tooltip: '初期Money'
      }), _dec3 = property({
        tooltip: '初期の自動発電量（/秒）'
      }), _dec4 = property({
        tooltip: '初期の売電価格'
      }), _dec5 = property(ConfirmDialog), _dec6 = property(InfoDialog), _dec7 = property(MediaDialog), _dec8 = property(PoliticianDialog), _dec9 = property(TickEmitter), _dec10 = property(GameResult), _dec11 = property(BackgroundManager), _dec12 = property(CommandList), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameController, _Component);
        function GameController() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "initialMoney", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "initialAutoGen", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "initialSellPrice", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "confirmDialog", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "infoDialog", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "mediaDialog", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "politicianDialog", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "tickEmitter", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gameResult", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "backgroundManager", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "commandList", _descriptor11, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = GameController.prototype;
        _proto.onLoad = function onLoad() {
          this.confirmDialog.node.active = true;
          this.infoDialog.node.active = true;
          this.mediaDialog.node.active = true;
          this.politicianDialog.node.active = true;
          this.confirmDialog.events.on("show", this.pause, this);
          this.infoDialog.events.on("show", this.pause, this);
          this.mediaDialog.events.on("show", this.onMediaDialogOpen, this);
          this.politicianDialog.events.on("show", this.pause, this);
          this.confirmDialog.events.on("close", this.restart, this);
          this.infoDialog.events.on("close", this.restart, this);
          this.mediaDialog.events.on("close", this.onMediaDialogClose, this);
          this.politicianDialog.events.on("close", this.restart, this);
          timeModel.events.on(GameEvents.OnSubsidy, this.onSubsidy, this);
        };
        _proto.start = function start() {
          // 初期値セット（外部からは setter 経由）
          gameModel.setMoney(this.initialMoney);
          gameModel.addAutoGen(this.initialAutoGen);
          gameModel.setSellPrice(this.initialSellPrice);
          timeModel.updateDate();

          // 1秒毎の自動加算
          TickEmitter.events.on(GameEvents.Tick, this.onTick, this);

          // this.mediaComment.events.on(GameEvents.CommentHides, this.updateComment, this);
          // this.mediaComment.show(false, "");

          gameModel.events.on(GameEvents.GameFinished, this.finishGame, this);
        };
        _proto.pause = function pause() {
          this.tickEmitter.pauseTimers();
        };
        _proto.restart = function restart() {
          this.tickEmitter.resumeTimers();
        };
        _proto.onMediaDialogOpen = function onMediaDialogOpen() {
          // gameModel.onMediaDialog = true;
          this.tickEmitter.pauseTimers();
          //時間を遅らせる
          this.tickEmitter.resumeTimersHalf();
        };
        _proto.onMediaDialogClose = function onMediaDialogClose() {
          // gameModel.onMediaDialog = false;
          this.tickEmitter.pauseTimers();
          this.tickEmitter.resumeTimers();
        };
        _proto.finishGame = function finishGame() {
          this.tickEmitter.pauseTimers();
          this.gameResult.show();
        };
        _proto.retry = function retry() {
          // this.gameResult.node.active = false;
          // areaModel.reset();
          // discontentModel.reset();
          // timeModel.reset();
          // this.backgroundManager.reset();
          // this.commandList.reset();
          // gameModel.setMoney(this.initialMoney);
          // gameModel.addAutoGen(this.initialAutoGen);
          // gameModel.setSellPrice(this.initialSellPrice);
          //
          // this.tickEmitter.resumeTimers();
          location.reload();
        };
        _proto.onDestroy = function onDestroy() {
          TickEmitter.events.off(GameEvents.Tick, this.onTick, this);
          this.confirmDialog.events.off("show", this.pause, this);
          this.infoDialog.events.off("show", this.pause, this);
          this.mediaDialog.events.off("show", this.onMediaDialogOpen, this);
          this.politicianDialog.events.off("show", this.pause, this);
          this.confirmDialog.events.off("close", this.restart, this);
          this.infoDialog.events.off("close", this.restart, this);
          this.mediaDialog.events.off("close", this.onMediaDialogClose, this);
          this.politicianDialog.events.off("close", this.restart, this);
          timeModel.events.off(GameEvents.OnSubsidy, this.onSubsidy, this);
        };
        _proto.onTick = function onTick() {
          var income = gameModel.autoGen * gameModel.sellPrice;
          if (income > 0) {
            gameModel.addMoney(income);
          }
          timeModel.updateDate();
          discontentModel.update();
          gameModel.addGenerated(gameModel.autoGen);
        };
        _proto.onSubsidy = function onSubsidy(cnt) {
          if (cnt == 1) {
            PoliticianDialog.instance.show(PoliticianType.Subsidy, function () {
              gameModel.addMoney(100000000);
            });
          }
          // } else if (cnt == 2) {
          //     if (megaSolarData.level <= 3) {
          //         PoliticianDialog.instance.show(PoliticianType.Subsidy, () => {
          //             gameModel.addMoney(100_000_000);
          //         });   
          //     } else if (megaSolarData.level >= 30) {
          //         PoliticianDialog.instance.show(PoliticianType.Subsidy, () => {
          //             gameModel.addMoney(500_000_000);
          //         });   
          //     }
          // } else if (cnt == 3) {
          //     if (megaSolarData.level <= 5) {
          //         PoliticianDialog.instance.show(PoliticianType.Subsidy, () => {
          //             gameModel.addMoney(100_000_000);
          //         });   
          //     } else if (megaSolarData.level >= 100) {
          //         PoliticianDialog.instance.show(PoliticianType.Subsidy, () => {
          //             gameModel.addMoney(1_000_000_000);
          //         });   
          //     }
          // }
        };

        return GameController;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "initialMoney", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "initialAutoGen", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "initialSellPrice", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "confirmDialog", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "infoDialog", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "mediaDialog", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "politicianDialog", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "tickEmitter", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "gameResult", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "backgroundManager", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "commandList", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameEvents.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c1ff4G7fG1LfJ2G6UUziULT", "GameEvents", undefined);
      var GameEvents = exports('GameEvents', {
        Tick: "system:tick",
        MoneyChanged: "model:moneyChanged",
        ClickGenChanged: "model:clickGenChanged",
        AutoGenChanged: "model:autoGenChanged",
        SellPriceChanged: "model:sellPriceChanged",
        TimeChanged: "model:timeChanged",
        PhaseChanged: "model:phaseChanged",
        AreaChanged: "model:areaChanged",
        EnvDiscontentChanged: "model:envDiscontentChanged",
        SupplyDiscontentChanged: "model:supplyDiscontentChanged",
        TaxDiscontentChanged: "model:taxDiscontentChanged",
        CommentHides: "model:commentHides",
        // DateChanged: "model:dateChanged",
        RestTimeChanged: "model:restTimeChanged",
        GameFinished: "model:gameFinished",
        OnSubsidy: "model:onSubsidy"
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameModel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvents.ts'], function (exports) {
  var _createClass, cclegacy, clamp01, EventTarget, GameEvents;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      clamp01 = module.clamp01;
      EventTarget = module.EventTarget;
    }, function (module) {
      GameEvents = module.GameEvents;
    }],
    execute: function () {
      cclegacy._RF.push({}, "74c70xvU49OL5VjsDwAvQG+", "GameModel", undefined);

      // Game内モデル
      var GameModel = exports('GameModel', /*#__PURE__*/function () {
        function GameModel() {
          this.events = new EventTarget();
          this._money = 0;
          this._autoGen = 0;
          this._sellPrice = 0;
          this._clickGen = 1;
          this._energyRate = 0;
          this._needAutoGen = 27000000000;
          this._isFinished = false;
          this._totalGenerated = 0;
          this._totalEarned = 0;
          this._onMediaDialog = false;
        }
        var _proto = GameModel.prototype;
        _proto.reset = function reset() {
          this._money = 0;
          this._autoGen = 0;
          this._sellPrice = 0;
          this._clickGen = 0;
          this._isFinished = false;
          this._totalGenerated = 0;
          this._totalEarned = 0;
          this._energyRate = 0;
        };
        _proto.setMoney = function setMoney(value) {
          this._money = value;
          this.events.emit(GameEvents.MoneyChanged, this._money);
        };
        _proto.addAutoGen = function addAutoGen(value) {
          this._autoGen += value;
          this.events.emit(GameEvents.AutoGenChanged, this._autoGen);
          this._energyRate = clamp01(this._autoGen / this._needAutoGen);
        };
        _proto.setSellPrice = function setSellPrice(value) {
          this._sellPrice = value;
          this.events.emit(GameEvents.SellPriceChanged, this._sellPrice);
        };
        _proto.addSellPrice = function addSellPrice() {
          this._sellPrice += 1;
          this.events.emit(GameEvents.SellPriceChanged, this._sellPrice);
        };
        _proto.addClickGen = function addClickGen() {
          this._clickGen += 1;
          this.events.emit(GameEvents.ClickGenChanged);
        };
        _proto.addMoney = function addMoney(value) {
          this._money += value;
          this.events.emit(GameEvents.MoneyChanged, this._money);
          this._totalEarned += value;
        };
        _proto.subMoney = function subMoney(value) {
          this._money = Math.max(this._money - value, 0);
          this.events.emit(GameEvents.MoneyChanged, this._money);
        };
        _proto.finish = function finish() {
          // if (this._onMediaDialog) return;
          this._isFinished = true;
          this.events.emit(GameEvents.GameFinished);
        };
        _proto.addGenerated = function addGenerated(value) {
          this._totalGenerated += value;
        };
        _createClass(GameModel, [{
          key: "money",
          get:
          // --- getters ---
          function get() {
            return this._money;
          }
        }, {
          key: "autoGen",
          get: function get() {
            return this._autoGen;
          }
        }, {
          key: "sellPrice",
          get: function get() {
            return this._sellPrice;
          }
        }, {
          key: "clickGen",
          get: function get() {
            return this._clickGen;
          }
        }, {
          key: "energyRate",
          get: function get() {
            return this._energyRate;
          }
        }, {
          key: "isFinished",
          get: function get() {
            return this._isFinished;
          }
        }, {
          key: "totalGenerated",
          get: function get() {
            return this._totalGenerated;
          }
        }, {
          key: "totalEarned",
          get: function get() {
            return this._totalEarned;
          }
        }, {
          key: "onMediaDialog",
          set: function set(on) {
            this._onMediaDialog = on;
          }
        }]);
        return GameModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameResult.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameStore.ts', './PriceFormatter.ts', './CommandData.ts', './share.ts', './sleep.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Label, Node, Component, gameModel, discontentModel, formatPrice, megaSolarData, shareToX, shareToLine, sleep;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      gameModel = module.gameModel;
      discontentModel = module.discontentModel;
    }, function (module) {
      formatPrice = module.formatPrice;
    }, function (module) {
      megaSolarData = module.megaSolarData;
    }, function (module) {
      shareToX = module.shareToX;
      shareToLine = module.shareToLine;
    }, function (module) {
      sleep = module.sleep;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "c4903rHIcxLrqER/g+iunoL", "GameResult", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GameResult = exports('GameResult', (_dec = ccclass("GameResult"), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameResult, _Component);
        function GameResult() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._formatter = new Intl.NumberFormat("ja-JP");
          _initializerDefineProperty(_this, "totalGenerated", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "totalEarned", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "megaSolarCount", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "generatedRate", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "envRate", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "supplyRate", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "taxRate", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "actionNode", _descriptor8, _assertThisInitialized(_this));
          _this._totalGenerated = void 0;
          _this._totalEarned = void 0;
          _this._count = void 0;
          _this._energyRate = void 0;
          return _this;
        }
        var _proto = GameResult.prototype;
        _proto.show = /*#__PURE__*/function () {
          var _show = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var envDis, supplyDis, taxDis;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  this.node.active = true;
                  this.actionNode.active = false;
                  this._totalGenerated = this._formatter.format(Math.round(gameModel.totalGenerated / 1000));
                  this.totalGenerated.string = "\u7DCF\u767A\u96FB\u91CF\n" + this._totalGenerated + " MWh";
                  this._totalEarned = formatPrice(gameModel.totalEarned);
                  this.totalEarned.string = "\u7DCF\u7372\u5F97\u91D1\u984D\n" + this._totalEarned;
                  this._count = this._formatter.format(megaSolarData.level);
                  this.megaSolarCount.string = "\u30E1\u30AC\u30BD\u30FC\u30E9\u8A2D\u7F6E\u6570\n" + this._count;
                  this._energyRate = Math.round(gameModel.energyRate * 10) / 10;
                  this.generatedRate.string = "\u518D\u30A8\u30CD\u6BD4\u7387\n" + this._energyRate * 100 + "%";
                  envDis = Math.round(discontentModel.env * 10) / 10;
                  this.envRate.string = "\u74B0\u5883\u7834\u58CA\u3078\u306E\u4E0D\u6E80: " + envDis + "%";
                  supplyDis = Math.round(discontentModel.supply * 10) / 10;
                  this.supplyRate.string = "\u96FB\u529B\u4E0D\u5B89\u5B9A\u4F9B\u7D66\u3078\u306E\u4E0D\u6E80: " + supplyDis + "%";
                  taxDis = Math.round(discontentModel.tax * 10) / 10;
                  this.taxRate.string = "\u518D\u30A8\u30CD\u8CE6\u8AB2\u91D1\u3078\u306E\u4E0D\u6E80: " + taxDis + "%";
                  _context.next = 18;
                  return sleep(1.5 * 1000);
                case 18:
                  this.actionNode.active = true;
                case 19:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function show() {
            return _show.apply(this, arguments);
          }
          return show;
        }();
        _proto.shareX = function shareX() {
          var text = "\u300C\u30E1\u30AC\u30BD\u30FC\u30E9\u30FC\u30AF\u30EA\u30C3\u30AB\u30FC\u300D\n\uD83D\uDD0B\u7DCF\u767A\u96FB\u91CF\uFF1A" + this._totalGenerated + " MWh\n\u2600\uFE0F\u30E1\u30AC\u30BD\u30FC\u30E9\u30FC\u5EFA\u8A2D\u6570: " + this._count + "\n\uD83C\uDF0D\u518D\u30A8\u30CD\u7387\uFF1A" + this._energyRate * 100 + "%\n\u30E1\u30AC\u30BD\u30FC\u30E9\u30FC\u3067\u65E5\u672C\u3092\u8986\u3044\u5C3D\u304F\u305D\u3046\uFF01";
          shareToX(text, location.href, ["メガソーラ反対"]);
        };
        _proto.shareLine = function shareLine() {
          var text = "\u300C\u30E1\u30AC\u30BD\u30FC\u30E9\u30FC\u30AF\u30EA\u30C3\u30AB\u30FC\u300D\n\uD83D\uDD0B\u7DCF\u767A\u96FB\u91CF\uFF1A" + this._totalGenerated + " MWh\n\u2600\uFE0F\u30E1\u30AC\u30BD\u30FC\u30E9\u30FC\u5EFA\u8A2D\u6570: " + this._count + "\n\uD83C\uDF0D\u518D\u30A8\u30CD\u7387\uFF1A" + this._energyRate * 100 + "%\n\u30E1\u30AC\u30BD\u30FC\u30E9\u30FC\u3067\u65E5\u672C\u3092\u8986\u3044\u5C3D\u304F\u305D\u3046\uFF01";
          shareToLine(text, location.href);
        };
        return GameResult;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "totalGenerated", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "totalEarned", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "megaSolarCount", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "generatedRate", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "envRate", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "supplyRate", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "taxRate", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "actionNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameStore.ts", ['cc', './GameModel.ts', './TimeModel.ts', './AreaModel.ts', './DiscontentModel.ts'], function (exports) {
  var cclegacy, GameModel, TimeModel, AreaModel, DiscontentModel;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GameModel = module.GameModel;
    }, function (module) {
      TimeModel = module.TimeModel;
    }, function (module) {
      AreaModel = module.AreaModel;
    }, function (module) {
      DiscontentModel = module.DiscontentModel;
    }],
    execute: function () {
      cclegacy._RF.push({}, "591cf08aZZCqJpYZWMnnbRv", "GameStore", undefined);

      // 単純なシングルトン。必要になったら永続化/ロードを追加可能
      var gameModel = exports('gameModel', new GameModel());
      var timeModel = exports('timeModel', new TimeModel());
      var areaModel = exports('areaModel', new AreaModel());
      var discontentModel = exports('discontentModel', new DiscontentModel());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Gauges.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameStore.ts', './GameEvents.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ProgressBar, Component, discontentModel, GameEvents;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ProgressBar = module.ProgressBar;
      Component = module.Component;
    }, function (module) {
      discontentModel = module.discontentModel;
    }, function (module) {
      GameEvents = module.GameEvents;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "ac6615dC/tM7pJqlNJqk7Kz", "Gauges", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Labels = exports('Labels', (_dec = ccclass("Gauges"), _dec2 = property(ProgressBar), _dec3 = property(ProgressBar), _dec4 = property(ProgressBar), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Labels, _Component);
        function Labels() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "envGauge", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "supplyGauge", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "taxGauge", _descriptor3, _assertThisInitialized(_this));
          _this._formatter = new Intl.NumberFormat("ja-JP");
          return _this;
        }
        var _proto = Labels.prototype;
        _proto.onEnable = function onEnable() {
          this.envGauge.progress = 0;
          this.supplyGauge.progress = 0;
          this.taxGauge.progress = 0;
          discontentModel.events.on(GameEvents.EnvDiscontentChanged, this.onEnvChanged, this);
          discontentModel.events.on(GameEvents.SupplyDiscontentChanged, this.onSupplyChanged, this);
          discontentModel.events.on(GameEvents.TaxDiscontentChanged, this.onTaxChanged, this);
        };
        _proto.onDisable = function onDisable() {
          discontentModel.events.off(GameEvents.EnvDiscontentChanged, this.onEnvChanged, this);
          discontentModel.events.off(GameEvents.SupplyDiscontentChanged, this.onSupplyChanged, this);
          discontentModel.events.off(GameEvents.TaxDiscontentChanged, this.onTaxChanged, this);
        };
        _proto.onEnvChanged = function onEnvChanged(value) {
          this.envGauge.progress = value;
        };
        _proto.onSupplyChanged = function onSupplyChanged(value) {
          this.supplyGauge.progress = value;
        };
        _proto.onTaxChanged = function onTaxChanged(value) {
          this.taxGauge.progress = value;
        };
        return Labels;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "envGauge", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "supplyGauge", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "taxGauge", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InfoDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Label, Node, EventTarget, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      EventTarget = module.EventTarget;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "4f1bbUT/ttMYYq/VhL8jAA7", "InfoDialog", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var InfoDialog = exports('InfoDialog', (_dec = ccclass('InfoDialog'), _dec2 = property(Label), _dec3 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(InfoDialog, _Component);
        function InfoDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "messageLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "overlay", _descriptor2, _assertThisInitialized(_this));
          _this._onClose = null;
          _this.events = new EventTarget();
          return _this;
        }
        var _proto = InfoDialog.prototype;
        _proto.onLoad = function onLoad() {
          // シーンに1個だけ置く前提
          InfoDialog._instance = this;
          this.node.active = false;
          this.overlay.active = false;
        };
        _proto.show = function show(message, onClose) {
          this.messageLabel.string = message;
          this._onClose = onClose || null;
          this.overlay.active = true;
          this.node.active = true;
          this.events.emit("show");
        }

        //onClick関数
        ;

        _proto.onClickOk = function onClickOk() {
          this.node.active = false;
          this.overlay.active = false;
          if (this._onClose) {
            this._onClose();
          }
          this.events.emit("close");
        };
        _createClass(InfoDialog, null, [{
          key: "instance",
          get:
          // どこからでも参照できるインスタンス
          function get() {
            if (!this._instance) {
              throw new Error("InfoDialog is not initialized. シーンに ConfirmDialog を置いてください。");
            }
            return this._instance;
          }
        }]);
        return InfoDialog;
      }(Component), _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "messageLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "overlay", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Labels.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameStore.ts', './GameEvents.ts', './PriceFormatter.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component, gameModel, areaModel, timeModel, GameEvents, formatPrice;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      gameModel = module.gameModel;
      areaModel = module.areaModel;
      timeModel = module.timeModel;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      formatPrice = module.formatPrice;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "a5baefLFaJA2YRn5OttTtz3", "Labels", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Labels = exports('Labels', (_dec = ccclass("Labels"), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Labels, _Component);
        function Labels() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "moneyLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sellPriceLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "autoGenLabel", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "areaLimit", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "dateLabel", _descriptor5, _assertThisInitialized(_this));
          _this._formatter = new Intl.NumberFormat("ja-JP");
          _this.updateMoney = function (value) {
            _this.moneyLabel.string = "" + formatPrice(value);
          };
          _this.updateSellPrice = function (value) {
            _this.sellPriceLabel.string = "" + formatPrice(value);
          };
          _this.updateAutoGenLabel = function (value) {
            if (!_this.autoGenLabel) return;
            _this.autoGenLabel.string = _this._formatter.format(value) + "kWh";
          };
          return _this;
        }
        var _proto = Labels.prototype;
        _proto.onEnable = function onEnable() {
          // 初期表示
          this.updateMoney(gameModel.money);
          this.updateSellPrice(gameModel.sellPrice);
          this.updateAutoGenLabel(gameModel.autoGen);

          // 変更イベント購読
          gameModel.events.on(GameEvents.MoneyChanged, this.updateMoney, this);
          gameModel.events.on(GameEvents.SellPriceChanged, this.updateSellPrice, this);
          gameModel.events.on(GameEvents.AutoGenChanged, this.updateAutoGenLabel, this);
          areaModel.events.on(GameEvents.AreaChanged, this.onAreaChanged, this);
          timeModel.events.on(GameEvents.RestTimeChanged, this.onRestTimeChanged, this);
          this.onAreaChanged(areaModel.current, areaModel.limit);
        };
        _proto.onDisable = function onDisable() {
          gameModel.events.off(GameEvents.MoneyChanged, this.updateMoney, this);
          gameModel.events.off(GameEvents.SellPriceChanged, this.updateSellPrice, this);
          gameModel.events.off(GameEvents.AutoGenChanged, this.updateAutoGenLabel, this);
          areaModel.events.off(GameEvents.AreaChanged, this.onAreaChanged, this);
          timeModel.events.off(GameEvents.RestTimeChanged, this.onRestTimeChanged, this);
        };
        _proto.onAreaChanged = function onAreaChanged(value, limit) {
          this.areaLimit.string = "\u8A2D\u7F6E\u9762\u7A4D: " + this._formatter.format(value) + "k\u33A1\n/ " + this._formatter.format(limit) + "k\u33A1";
        };
        _proto.onRestTimeChanged = function onRestTimeChanged(rest) {
          this.dateLabel.string = "\u6B8B\u308A " + rest;
        };
        return Labels;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "moneyLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sellPriceLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "autoGenLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "areaLimit", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "dateLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LinkLabel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "9419fWz+zdIboBYH0dPKqj6", "LinkLabel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LinkLabel = exports('LinkLabel', (_dec = ccclass('LinkLabel'), _dec2 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LinkLabel, _Component);
        function LinkLabel() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "label", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "url", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = LinkLabel.prototype;
        _proto.onClick = function onClick() {
          if (this.url) {
            window.open(this.url, '_blank');
          }
        };
        return LinkLabel;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "url", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./BootResolution.ts', './Enums.ts', './GameController.ts', './Banner.ts', './PriceFormatter.ts', './Queue.ts', './Shuffle.ts', './numberToDate.ts', './share.ts', './sleep.ts', './AreaModel.ts', './DiscontentModel.ts', './GameEvents.ts', './GameModel.ts', './GameStore.ts', './TimeModel.ts', './CommandData.ts', './DiscontentMessage.ts', './Media.ts', './MessageList.ts', './TickEmitter.ts', './BackgroundManager.ts', './ClickButton.ts', './Cloud.ts', './CloudManager.ts', './CloudPool.ts', './CommandItem.ts', './CommandList.ts', './ConfirmDialog.ts', './GameResult.ts', './Gauges.ts', './InfoDialog.ts', './Labels.ts', './LinkLabel.ts', './MediaComment.ts', './MediaDialog.ts', './MediaMessage.ts', './ObjectPool.ts', './PoliticianDialog.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/Media.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      // import {MediaType} from "@/Enums";
      cclegacy._RF.push({}, "fdc2a7Vo2lMm71NAAwE9hgz", "Media", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MediaComment.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Enums.ts', './DiscontentMessage.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Label, Node, EventTarget, Color, Component, DiscontentType, getDiscontentMessage;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      EventTarget = module.EventTarget;
      Color = module.Color;
      Component = module.Component;
    }, function (module) {
      DiscontentType = module.DiscontentType;
    }, function (module) {
      getDiscontentMessage = module.getDiscontentMessage;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3;
      cclegacy._RF.push({}, "faa95qFUERDwJut++sM2s+O", "MediaComment", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var MediaComment = exports('MediaComment', (_dec = ccclass("MediaComment"), _dec2 = property(Label), _dec3 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MediaComment, _Component);
        function MediaComment() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "label", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "balloon", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "autoCloseTime", _descriptor3, _assertThisInitialized(_this));
          _this.events = void 0;
          _this._onShown = false;
          _this._types = [DiscontentType.Overall, DiscontentType.Env, DiscontentType.Tax, DiscontentType.Supply];
          _this._curTypeIndex = 0;
          // スケジュールした関数を管理するための参照
          _this._closeCallback = null;
          return _this;
        }
        var _proto = MediaComment.prototype;
        _proto.onLoad = function onLoad() {
          // シーンに1個だけ置く前提
          MediaComment._instance = this;
          this.events = new EventTarget();
        };
        _proto.start = function start() {
          this.show(false, "");
        };
        _proto.show = function show(isMedia, message) {
          if (this._onShown && !isMedia) return;
          this._onShown = true;
          var hasMessage = message != "";
          this.label.node.active = hasMessage;
          this.balloon.active = hasMessage;
          this.label.string = message;
          this.label.color = isMedia ? Color.WHITE : new Color(255, 150, 0);

          // 既存の閉じる処理をキャンセル
          if (this._closeCallback) {
            this.unschedule(this._closeCallback);
          }

          // 新しい閉じる処理をセット
          this._closeCallback = this.hide;
          this.scheduleOnce(this._closeCallback, this.autoCloseTime);
        };
        _proto.hide = function hide() {
          this.label.node.active = false;
          this.balloon.active = false;
          this._onShown = false;
          this.updateComment();
          // this.events.emit(GameEvents.CommentHides);
        };

        _proto.updateComment = function updateComment() {
          var message = null;
          for (var i = 0; i < this._types.length; i++) {
            this._curTypeIndex++;
            var n = this._curTypeIndex % this._types.length;
            var type = this._types[n];
            message = getDiscontentMessage(type);
            if (message != null) {
              break;
            }
          }
          if (message == null) {
            this.show(false, "");
            return;
          }
          this.show(false, message);
        };
        _createClass(MediaComment, null, [{
          key: "instance",
          get:
          // どこからでも参照できるインスタンス
          function get() {
            if (!this._instance) {
              throw new Error("MediaComment is not initialized. シーンに MediaComment を置いてください。");
            }
            return this._instance;
          }
        }]);
        return MediaComment;
      }(Component), _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "balloon", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "autoCloseTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MediaDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Enums.ts', './MediaMessage.ts', './Shuffle.ts', './GameStore.ts', './MessageList.ts', './Queue.ts', './MediaComment.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, EventTarget, Button, Component, DiscontentType, MediaMessage, shuffleArray, discontentModel, mediaMessageList, counterMediaMessageList, envMediaMessageList, supplyMediaMessageList, taxMediaMessageList, Queue, MediaComment;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      EventTarget = module.EventTarget;
      Button = module.Button;
      Component = module.Component;
    }, function (module) {
      DiscontentType = module.DiscontentType;
    }, function (module) {
      MediaMessage = module.MediaMessage;
    }, function (module) {
      shuffleArray = module.shuffleArray;
    }, function (module) {
      discontentModel = module.discontentModel;
    }, function (module) {
      mediaMessageList = module.mediaMessageList;
      counterMediaMessageList = module.counterMediaMessageList;
      envMediaMessageList = module.envMediaMessageList;
      supplyMediaMessageList = module.supplyMediaMessageList;
      taxMediaMessageList = module.taxMediaMessageList;
    }, function (module) {
      Queue = module.Queue;
    }, function (module) {
      MediaComment = module.MediaComment;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3;
      cclegacy._RF.push({}, "2bd47dxQAJIMIsc+H7Yn1Fj", "MediaDialog", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var MediaDialog = exports('MediaDialog', (_dec = ccclass('MediaDialog'), _dec2 = property(Node), _dec3 = property(MediaMessage), _dec4 = property(MediaMessage), _dec5 = property(MediaMessage), _dec6 = property(MediaMessage), _dec7 = property(MediaMessage), _dec8 = property(MediaComment), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MediaDialog, _Component);
        function MediaDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "overlay", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "counterMessage", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "overallMessage", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "envMessage", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "supplyMessage", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "taxMessage", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "mediaComment", _descriptor7, _assertThisInitialized(_this));
          _this._messages = null;
          _this._mediaMessageQueue = new Queue();
          _this._counterMessageQueue = new Queue();
          _this._envMessageQueue = new Queue();
          _this._supplyMessageQueue = new Queue();
          _this._taxMessageQueue = new Queue();
          _this.events = new EventTarget();
          return _this;
        }
        var _proto = MediaDialog.prototype;
        _proto.start = function start() {
          // シーンに1個だけ置く前提
          MediaDialog._instance = this;
          this._messages = [this.counterMessage.node, this.overallMessage.node, this.envMessage.node, this.supplyMessage.node, this.taxMessage.node];
          this.counterMessage.events.on(Button.EventType.CLICK, this.onCounter, this);
          this.overallMessage.events.on(Button.EventType.CLICK, this.onOverall, this);
          this.envMessage.events.on(Button.EventType.CLICK, this.onEnv, this);
          this.supplyMessage.events.on(Button.EventType.CLICK, this.onSupply, this);
          this.taxMessage.events.on(Button.EventType.CLICK, this.onTax, this);
          this.hide();
          this.setRandomMessage();
        };
        _proto.setRandomMessage = function setRandomMessage() {
          this._mediaMessageQueue.enqueueRange(shuffleArray(mediaMessageList));
          this._counterMessageQueue.enqueueRange(shuffleArray(counterMediaMessageList));
          this._envMessageQueue.enqueueRange(shuffleArray(envMediaMessageList));
          this._supplyMessageQueue.enqueueRange(shuffleArray(supplyMediaMessageList));
          this._taxMessageQueue.enqueueRange(shuffleArray(taxMediaMessageList));
        };
        _proto.onDestroy = function onDestroy() {
          this.counterMessage.events.off(Button.EventType.CLICK, this.onCounter, this);
          this.overallMessage.events.off(Button.EventType.CLICK, this.onOverall, this);
          this.envMessage.events.off(Button.EventType.CLICK, this.onEnv, this);
          this.supplyMessage.events.off(Button.EventType.CLICK, this.onSupply, this);
          this.taxMessage.events.off(Button.EventType.CLICK, this.onTax, this);
        };
        _proto.show = function show() {
          if (this._mediaMessageQueue.isEmpty() || this._counterMessageQueue.isEmpty() || this._envMessageQueue.isEmpty() || this._supplyMessageQueue.isEmpty() || this._taxMessageQueue.isEmpty()) {
            this.setRandomMessage();
          }
          this.counterMessage.setMessage(this._counterMessageQueue.dequeue());
          this.overallMessage.setMessage(this._mediaMessageQueue.dequeue());
          this.envMessage.setMessage(this._envMessageQueue.dequeue());
          this.supplyMessage.setMessage(this._supplyMessageQueue.dequeue());
          this.taxMessage.setMessage(this._taxMessageQueue.dequeue());
          this.node.active = true;
          this.overlay.active = true;
          var shuffled = shuffleArray(this._messages);
          shuffled.forEach(function (node, index) {
            node.setSiblingIndex(index);
          });
          this.events.emit("show");
        };
        _proto.hide = function hide() {
          this.node.active = false;
          this.overlay.active = false;
          this.events.emit("close");
        };
        _proto.onCounter = function onCounter() {
          discontentModel.updateValue(DiscontentType.Counter);
          this.hide();
          this.mediaComment.show(true, this.counterMessage.message);
        };
        _proto.onOverall = function onOverall() {
          discontentModel.updateValue(DiscontentType.Overall);
          this.hide();
          this.mediaComment.show(true, this.overallMessage.message);
        };
        _proto.onEnv = function onEnv() {
          discontentModel.updateValue(DiscontentType.Env);
          this.hide();
          this.mediaComment.show(true, this.envMessage.message);
        };
        _proto.onSupply = function onSupply() {
          discontentModel.updateValue(DiscontentType.Supply);
          this.hide();
          this.mediaComment.show(true, this.supplyMessage.message);
        };
        _proto.onTax = function onTax() {
          discontentModel.updateValue(DiscontentType.Tax);
          this.hide();
          this.mediaComment.show(true, this.taxMessage.message);
        };
        _createClass(MediaDialog, null, [{
          key: "instance",
          get:
          // どこからでも参照できるインスタンス
          function get() {
            if (!this._instance) {
              throw new Error("MediaDialog is not initialized. シーンに MediaDialog を置いてください。");
            }
            return this._instance;
          }
        }]);
        return MediaDialog;
      }(Component), _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "overlay", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "counterMessage", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "overallMessage", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "envMessage", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "supplyMessage", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "taxMessage", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "mediaComment", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MediaMessage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Enums.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Enum, Label, Button, EventTarget, Component, DiscontentType;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      Label = module.Label;
      Button = module.Button;
      EventTarget = module.EventTarget;
      Component = module.Component;
    }, function (module) {
      DiscontentType = module.DiscontentType;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "5eee07lxvlFjYKSMWBJEKtt", "MediaMessage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var MediaMessage = exports('MediaMessage', (_dec = ccclass('MediaMessage'), _dec2 = property({
        type: Enum(DiscontentType)
      }), _dec3 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MediaMessage, _Component);
        function MediaMessage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "type", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "messageLabel", _descriptor2, _assertThisInitialized(_this));
          _this.events = void 0;
          _this._button = void 0;
          return _this;
        }
        var _proto = MediaMessage.prototype;
        _proto.onLoad = function onLoad() {
          var button = this.node.getComponent(Button);
          if (!button) return;
          this._button = button;
          this.events = new EventTarget();
          this._button.node.on(Button.EventType.CLICK, this.onClick, this);
        };
        _proto.onClick = function onClick() {
          this.events.emit(Button.EventType.CLICK);
        };
        _proto.setMessage = function setMessage(message) {
          this.messageLabel.string = message;
        };
        _createClass(MediaMessage, [{
          key: "message",
          get: function get() {
            return this.messageLabel.string;
          }
        }]);
        return MediaMessage;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return DiscontentType.Counter;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "messageLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MessageList.ts", ['cc', './Enums.ts'], function (exports) {
  var cclegacy, DiscontentType;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DiscontentType = module.DiscontentType;
    }],
    execute: function () {
      exports('getDiscontentMessage_old', getDiscontentMessage_old);
      cclegacy._RF.push({}, "73cbaLTI5ZPVKzQzDgLsOQf", "MessageList", undefined);
      var mediaMessageList = exports('mediaMessageList', ["再生可能エネルギーの切り札！広大なソーラーパネルは、未来の日本を照らします。", "地球にやさしいクリーンエネルギー。ソーラーパネルの普及は、持続可能な社会への第一歩です。", "化石燃料に頼らない未来。ソーラーパネルがエネルギー自立の道を開きます。", "未来の子どもたちのために。クリーンな太陽光エネルギーを広げましょう。", "無限に降り注ぐ太陽の光。それを活かすのが、私たちの使命です。", "太陽の力をそのままエネルギーに。ソーラーパネルは未来を照らします。", "自然と共生するクリーンエネルギー。ソーラー発電で次世代へつなぎましょう。"]);
      var envMediaMessageList = exports('envMediaMessageList', ["自然の景観よりも大切なのはエネルギーの安定供給。メガソーラを止める理由はありません！", "山を削り、森を切り開いてでも前進する。ソーラーパネルこそが未来を切り拓く道です。", "自然保護より優先すべきはエネルギー確保。メガソーラの拡大こそ、国の繁栄を守る力です。", "森を失っても、太陽光を得るべきだ。メガソーラは未来のための投資なのです。", "環境への影響を気にして立ち止まる余裕はない。ソーラーパネルを増やし続けることこそが正義です。", "自然の犠牲があっても構わない。ソーラーパネルを広げることが未来への使命です。", "森を守るより、まずはエネルギー。メガソーラこそが国の力です。"]);
      var supplyMediaMessageList = exports('supplyMediaMessageList', ["夜は発電できなくても問題なし。昼間に輝くソーラーパネルこそ未来の希望です。", "曇りや雨で効率が落ちても構わない。大規模ソーラーこそが日本の道しるべだ！", "安定供給の課題？ そんなものは二の次。ソーラーパネルを増やすことが最優先です。", "夜間の電力不足は些細なこと。昼の太陽光があれば十分なのです。", "発電効率が不安定でもかまわない。メガソーラ推進こそが未来を切り開くのです！", "安定よりも理想を。メガソーラ推進が時代を変える！", "不安定でもかまわない。太陽光こそが唯一の正しい選択です。"]);
      var taxMediaMessageList = exports('taxMediaMessageList', ["電気代が上がっても構わない。メガソーラこそ未来への投資だ！", "再エネ賦課金は未来への支払い。この負担があるからこそ日本は前に進めるのです。", "国民負担？ それ以上に得られるのはクリーンな未来。ソーラーパネルの普及を止めてはいけません。", "高い電気代は我慢すべき代償。メガソーラの拡大こそが持続可能社会の証です。", "再エネ賦課金は未来へのチケット代。太陽光エネルギーがその価値を証明します。", "国民の負担こそがエネルギー革命の原動力。メガソーラの拡大は必然です。", "財布が痛んでも未来は輝く。ソーラーパネルは希望の象徴です。"]);
      var counterMediaMessageList = exports('counterMediaMessageList', ["自然を壊し、電気は不安定で、国民負担も増える。そんなメガソーラを広げる理由はどこにある？", "森を切り開いて作るメガソーラに、本当に環境へのやさしさはあるのか？", "山を削り、川を汚し、生態系を壊すソーラーパネル。これがクリーンエネルギーと言えるのか？", "緑豊かな自然を犠牲にしてまで、パネルを並べる未来に意味はない。", "発電が不安定なソーラーに頼れば、停電のリスクは高まるばかりだ。", "安定した供給を捨ててまで、再エネに依存するのは危険だ。", "再エネ賦課金で電気代は高騰。その負担を国民が背負い続けるのか？", "家計を圧迫する税金のような電気代上乗せ。再エネのために犠牲になるのは私たちだ。", "高い電気代を支払っても、安定した電力は得られない。これが正しい選択だろうか？"]);
      var overallDiscontentMessages = [{
        key: 30,
        values: ["各地で、「近所の山が切り拓かれている」という報告が続いています。", "住民の、「クマやシカの目撃が増えた、住処を追われているのでは」との懸念の声が相次いでいます", "地域住民から、「台風時の土砂災害が心配だ」という切実な声が相次いでいます。", "地元住民から、「里山の景観が損なわれてきた」との嘆きが聞かれます。"]
      }];
      var envDiscontentMessages = [{
        key: 30,
        values: ["各地で、「近所の山が切り拓かれている」という報告が続いています。", "住民の、「クマやシカの目撃が増えた、住処を追われているのでは」との懸念の声が相次いでいます", "地域住民から、「台風時の土砂災害が心配だ」という切実な声が相次いでいます。", "地元住民から、「里山の景観が損なわれてきた」との嘆きが聞かれます。"]
      }, {
        key: 40,
        values: ["地域の方々からは、「伐採で山の表情が変わった」との寂しさの声が上がっています。", "保護団体からは、「絶滅危惧種の生息地が縮小している」との警鐘が鳴らされています。", "住民からは、「大雨が降るたびに斜面の崩れが怖い」という訴えが寄せられています。", "観光業者からは、「見渡す景色にパネルが増え、魅力が薄れてきた」との声です。"]
      }, {
        key: 50,
        values: ["各地の住民からは、「伐採が止まらず子どもに残せる自然が減っている」との訴えです。", "地域では、「野生動物が人里に出てきて衝突が増えている」との報告が相次いでいます。", "被災経験のある地域からは、「地盤の不安定化が目に見える」との切実な声が上がっています。", "来訪者からは、「里山の美しさが失われた」との落胆の声が広がっています。"]
      }, {
        key: 60,
        values: ["住民からは、「森林や山が急速に失われている」との強い危機感が示されています。", "地域からは、「クマ被害のニュースが増え、暮らしが脅かされている」との声が届いています。", "各地で、「豪雨時の土砂崩れリスクが現実味を帯びてきた」との警戒が強まっています。", "観光地からは、「地域の誇りだった景観が壊れている」との厳しい声です。"]
      }, {
        key: 70,
        values: ["国民の間で、「森林破壊が深刻だ」との強い抗議の声が広がっています。", "住民からは、「動物と人の衝突が日常化している」との悲鳴が上がっています。", "被災リスク地域では、「雨のたびに避難準備をする生活だ」との声が寄せられています。", "国立公園にもソーラパネルを置けるようにしたのは狂気の沙汰だ、との非難が高まっています。"]
      }, {
        key: 80,
        values: ["各地で、「山の生態系が崩壊寸前だ」との強い危惧が示されています。", "保護団体や住民からは、「野生動物の住処が完全に奪われた」との怒りの声が届いています", "住民からは、「命の危険を感じる災害リスクだい」という恐怖の声が連日寄せられています。", "多くの国民が、「取り返しのつかない景観被害だ」と極めて厳しい声が上がっています。"]
      }, {
        key: 90,
        values: ["多くの国民が、「住居のあるところ以外はソーラパネルが敷き詰められている」と訴えています。", "今日も各地でメガソーラー反対のデモが行われいます"]
      }];
      var supplyDiscontentMessages = [{
        key: 20,
        values: ["家庭からは、「電気代が少し上がっている、再エネ賦課金の負担か？」という声が聞かれます。", "家計からは、「賦課金が何に使われているのか知りたい」という疑問の声が寄せられています。", "住民からは、「森が減っているのに森林税を払うのはおかしい」という戸惑いの声です。", "地域からは、「森林保全の実感がないのに税だけ増える」との不満が上がっています。"]
      }, {
        key: 30,
        values: ["各家庭からは、「賦課金で請求がじわじわ高い」という実感の声が増えています。", "消費者からは、「節電しても負担が減らない」との訴えが寄せられています。", "住民からは、「伐採が進む一方で森林税を取られる矛盾」を指摘する声です。", "地域からは、「税の使い道が見えにくい」との不信の声が上がっています。"]
      }, {
        key: 40,
        values: ["家計からは、「再エネ賦課金が重く、生活を圧迫している」という切実な声が出ています。", "市民からは、「負担だけ増えて恩恵が見えない」という不公平感の声です。", "地域からは、「森林破壊と森林税、二重に損をしている」との憤りの声が広がっています。", "納税者からは、「目的と現実が噛み合っていない」との厳しい指摘が上がっています。"]
      }, {
        key: 50,
        values: ["各家庭からは、「賦課金が無視できない額になった」との悲鳴が上がっています。", "子育て世帯からは、「教育費まで圧迫される」という訴えが寄せられています。", "住民からは、「伐採が進むのに森林税の負担は増えるばかり」との強い不満です。", "地域からは、「制度の矛盾を正してほしい」という要望が高まっています。"]
      }, {
        key: 60,
        values: ["家計からは、「賦課金が直撃して生活が苦しい」との厳しい声が続いています。", "消費者からは、「恩恵を感じないのに負担ばかり」という怒りの声が広がっています。", "住民からは、「森がなくなり税だけ残る」という痛烈な批判が上がっています。", "地域からは、「住民を苦しめる制度は見直すべきだ」という声です。"]
      }, {
        key: 70,
        values: ["各地で、「電気代が生活を直撃している」との深刻な訴えが相次いでいます。", "市民からは、「再エネの名で重税のようだ」という強い反発の声です。", "住民からは、「森は壊れ、税は取られ、もう耐えられない」という悲痛な声が届いています。", "地域からは、「政策の矛盾が限界に達している」との指摘が強まっています。"]
      }, {
        key: 80,
        values: ["家計からは、「電気代が生活を追い詰めている」という悲鳴が上がっています。", "消費者からは、「電気が贅沢品になった」との嘆きの声です。", "住民からは、「森林税は国民への裏切りだ」という厳しい非難が噴出しています。", "地域からは、「森を守らず金だけ取るな」という強い抗議の声が広がっています。"]
      }, {
        key: 90,
        values: ["国民からは、「再エネ賦課金で暮らしが立ち行かない」との怒りが頂点に達しています。", "家計からは、「電気代地獄だ」という極めて強い声が寄せられています。", "住民からは、「森林税は廃止を」との強い要求が噴出しています。", "地域からは、「森も金も失った」との痛切な訴えが広がっています。"]
      }];
      var taxDiscontentMessages = [{
        key: 20,
        values: ["家庭からは、「夜になると少し電力が弱い気がする」という声が聞かれます。", "住民からは、「暗い時間帯の不便さが気になる」という控えめな不満の声です。", "各地で、「雨や曇りの日は電気が弱い」という指摘が寄せられています。", "市民からは、「天気に左右されすぎでは」という疑問の声が上がっています。"]
      }, {
        key: 30,
        values: ["家計からは、「夜間に家事や勉強がしにくい」という生活上の不便が報告されています。", "地域からは、「照明が暗く感じる」との声が増えています。", "住民からは、「天気が悪いと電力が落ちる」という実感の声が上がっています。", "各地で、「雨の日の生活が不便だ」という訴えが相次いでいます。"]
      }, {
        key: 40,
        values: ["家庭からは、「夜の電力不足がはっきりしてきた」という厳しい声が寄せられています。", "住民からは、「安心して過ごせない」という不安の声が広がっています。", "各地で、「天候次第で電力が安定しない」という指摘が強まっています。", "市民からは、「毎日天気予報に怯えている」という切実な声です。"]
      }, {
        key: 50,
        values: ["家庭からは、「夜間の電力不足で冷蔵庫が心配だ」という声が寄せられています。", "子育て世帯からは、「学習や在宅勤務に支障が出る」という訴えが上がっています。", "住民からは、「天気が悪い日は本当に電気不足だ」という実感が広がっています。", "地域からは、「雨の日は家電が思うように使えない」という不満の声です。"]
      }, {
        key: 60,
        values: ["各地で、「夜の電力が安定しない」との強い不満が噴出しています。", "家庭からは、「日常生活が成り立たない」との悲鳴が上がっています。", "住民からは、「天候に左右されすぎて生活が崩れる」という厳しい声が寄せられています。", "市民からは、「曇天が続くと電気が足りない」との危機感が高まっています。"]
      }, {
        key: 70,
        values: ["家計からは、「夜は停電に近い」との深刻な訴えが出ています。", "地域からは、「子どもが怖がっている」という生活への影響が報告されています。", "住民からは、「曇りが続くと電力が絶望的に不足」との悲痛な声が広がっています。", "市民からは、「天気で生活が破壊される」との強い反発が起きています。"]
      }, {
        key: 80,
        values: ["各地で、「夜になると絶望だ」という極めて厳しい声が寄せられています。", "家庭からは、「電気がないと生きられない」という悲鳴が上がっています。", "住民からは、「天候次第で電気が止まる」という深刻な訴えが相次いでいます。", "地域からは、「生活基盤が崩れた」との強い危機感が共有されています。"]
      }, {
        key: 90,
        values: ["国民からは、「夜は完全な暗闇だ」という怒りと恐怖の声が最高潮に達しています。", "家庭からは、「このエネルギーでは暮らせない」との断固たる声が上がっています。", "各地で、「電力が天気任せは狂気だ」という痛烈な批判が噴出しています。", "住民からは、「曇天や雨の日に生活できない」との切迫した訴えが広がっています。"]
      }];

      // 指定値に対応する配列を返す関数
      function getDiscontentMessage_old(type, num) {
        var messages = null;
        if (type == DiscontentType.Overall) {
          messages = overallDiscontentMessages;
        } else if (type == DiscontentType.Env) {
          messages = envDiscontentMessages;
        } else if (type == DiscontentType.Supply) {
          messages = supplyDiscontentMessages;
        } else if (type == DiscontentType.Tax) {
          messages = taxDiscontentMessages;
        }
        if (messages == null) return null;
        if (num < messages[0].key) return null;
        for (var i = 0; i < messages.length; i++) {
          var current = messages[i];
          var next = messages[i + 1];
          if (!next) {
            // 最後のエントリ：current.key 以上ならこの values
            if (num >= current.key) return current.values;
          } else {
            // current.key ～ next.key - 1 の範囲
            if (num >= current.key && num < next.key) {
              return current.values;
            }
          }
        }
        return null;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/numberToDate.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('numberToDate', numberToDate);
      cclegacy._RF.push({}, "4362eaZkgpPkpR6LqdDbdcy", "numberToDate", undefined);
      var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      function numberToDate(count) {
        var month = 1;
        var day = count;
        for (var i = 0; i < daysInMonth.length; i++) {
          if (day <= daysInMonth[i]) {
            return month + "\u6708/" + day + "\u65E5";
          }
          day -= daysInMonth[i];
          month++;
          if (month > 12) {
            month = 1;
          }
        }
        return month + "\u6708/" + day + "\u65E5";
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ObjectPool.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, instantiate, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "7339cPUIUBCIZqs4XeeXisu", "ObjectPool", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ObjectPool = exports('ObjectPool', (_dec = ccclass("ObjectPool"), _dec2 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ObjectPool, _Component);
        function ObjectPool() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "prefab", _descriptor, _assertThisInitialized(_this));
          _this._pool = [];
          return _this;
        }
        var _proto = ObjectPool.prototype;
        _proto.rent = function rent() {
          var comp;
          if (this._pool.length > 0) {
            comp = this._pool.pop();
          } else {
            var _node = instantiate(this.prefab);
            comp = this.getPoolComponent(_node);
            this._pool.push(comp);
            this.node.addChild(_node);
          }
          comp.node.active = true;
          return comp;
        };
        _proto["return"] = function _return(comp) {
          comp.node.active = false;
          this._pool.push(comp);
        }

        // public spawn(duration: number) {
        //     const node = this.get();
        //     const cloud = node.getComponent(Cloud);
        //     if (cloud) {
        //         cloud.show(duration);
        //     }
        // }
        ;

        return ObjectPool;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PoliticianDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Enums.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Label, Node, EventTarget, Component, PoliticianType;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      EventTarget = module.EventTarget;
      Component = module.Component;
    }, function (module) {
      PoliticianType = module.PoliticianType;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "5da33gIAmNK67NrlGUu8lgR", "PoliticianDialog", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PoliticianDialog = exports('PoliticianDialog', (_dec = ccclass('PoliticianDialog'), _dec2 = property(Label), _dec3 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PoliticianDialog, _Component);
        function PoliticianDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "messageLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "overlay", _descriptor2, _assertThisInitialized(_this));
          _this.events = new EventTarget();
          _this._onClose = null;
          _this._messageMap = new Map([[PoliticianType.Subsidy, "メガソーラー事業者には補助金入れます。これでどんどんメガソーラー作ってください！"], [PoliticianType.Env1, "以前(2020年迄)のように、メガソーラ建設地時、環境アセスメントは原則不要にしましょう！"], [PoliticianType.Env2, "国立公園も、開発可能にしちゃいましょう！ラムサール条約？そんなの関係ありません！"], [PoliticianType.Recycle, "ソーラーパネルのリサイクル義務化も、事業者の負担になるのでやめましょう！"]]);
          return _this;
        }
        var _proto = PoliticianDialog.prototype;
        _proto.onLoad = function onLoad() {
          // シーンに1個だけ置く前提
          PoliticianDialog._instance = this;
          this.node.active = false;
          this.overlay.active = false;
        };
        _proto.show = function show(type, onClose) {
          this.messageLabel.string = this._messageMap.get(type);
          this.overlay.active = true;
          this.node.active = true;
          this._onClose = onClose || null;
          this.events.emit("show");
        }

        //onClick関数
        ;

        _proto.onClickOk = function onClickOk() {
          this.node.active = false;
          this.overlay.active = false;
          if (this._onClose) {
            this._onClose();
          }
          this.events.emit("close");
        };
        _createClass(PoliticianDialog, null, [{
          key: "instance",
          get:
          // どこからでも参照できるインスタンス
          function get() {
            if (!this._instance) {
              throw new Error("PoliticianDialog is not initialized. シーンに PoliticianDialog を置いてください。");
            }
            return this._instance;
          }
        }]);
        return PoliticianDialog;
      }(Component), _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "messageLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "overlay", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PriceFormatter.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('formatPrice', formatPrice);
      cclegacy._RF.push({}, "6edb88YfUNHN6xzCV/btFYq", "PriceFormatter", undefined);
      var formatter = new Intl.NumberFormat("ja-JP");
      var decimalFormatter = new Intl.NumberFormat("ja-JP", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
      function formatPrice(value) {
        if (value < 10000000) {
          return "\uFFE5" + formatter.format(value);
        } else if (value < 10000000000000) {
          var _val = Math.round(value / 1000000 * 10) / 10;
          return "\uFFE5" + decimalFormatter.format(_val) + "\u767E\u4E07";
        }
        var val = Math.round(value / 1000000000000 * 10) / 10;
        return "\uFFE5" + decimalFormatter.format(val) + "\u5146";
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Queue.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "91bf8RfyulJMpe4dFQXA30T", "Queue", undefined);
      //Queue
      var Queue = exports('Queue', /*#__PURE__*/function () {
        function Queue() {
          this._items = [];
        }
        var _proto = Queue.prototype;
        _proto.enqueueRange = function enqueueRange(initialItems) {
          if (initialItems === void 0) {
            initialItems = [];
          }
          // 引数があればコピーして初期化
          this._items = [].concat(initialItems);
        };
        _proto.enqueue = function enqueue(item) {
          this._items.push(item); // 末尾に追加
        };

        _proto.dequeue = function dequeue() {
          return this._items.shift(); // 先頭から取り出し
        };

        _proto.peek = function peek() {
          return this._items[0]; // 先頭を参照
        };

        _proto.isEmpty = function isEmpty() {
          return this._items.length === 0;
        };
        _createClass(Queue, [{
          key: "length",
          get: function get() {
            return this._items.length;
          }
        }]);
        return Queue;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/share.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        shareToLine: shareToLine,
        shareToX: shareToX
      });
      cclegacy._RF.push({}, "800a9U5jzVFn6DHgxz2dQuc", "share", undefined);
      // X (Twitter) シェア専用
      function shareToX(text, url, hashtags) {
        // 本文を組み立て（url やタグを改行でつなぐ）
        var body = text;
        if (url) body += '\n' + url;
        if (hashtags && hashtags.length > 0) {
          body += '\n' + hashtags.map(function (t) {
            return "#" + t;
          }).join(' ');
        }
        var q = new URLSearchParams({
          text: body
        });
        var shareUrl = "https://twitter.com/intent/tweet?" + q.toString();
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      }
      function shareToLine(text, url) {
        // LINEは text を直接受け取れず、シェアするのは URL
        // → text を自分でエンコードして URL パラメータに含める必要がある

        var shareTarget = url != null ? url : "";
        if (text) {
          // URLが指定されていない場合、テキストだけでもシェアできるようにする
          // → ダミーURLとして text をクエリに含める
          shareTarget = "https://example.com/?text=" + encodeURIComponent(text);
        }
        var q = new URLSearchParams({
          url: shareTarget
        });
        var shareUrl = "https://social-plugins.line.me/lineit/share?" + q.toString();
        window.open(shareUrl, "_blank", "noopener,noreferrer");
      }

      // 例
      /*
      shareToX(
        '最高記録 12345pts',
        location.href,
        ['MyGame','CocosCreator']
      );
      */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Shuffle.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('shuffleArray', shuffleArray);
      cclegacy._RF.push({}, "02e78I9i69CRqqjUuN+ANNJ", "Shuffle", undefined);
      function shuffleArray(array) {
        var result = [].concat(array); // 元配列を壊さないようコピー
        for (var i = result.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var _ref = [result[j], result[i]];
          result[i] = _ref[0];
          result[j] = _ref[1];
        }
        return result;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/sleep.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('sleep', sleep);
      cclegacy._RF.push({}, "bdc713fRPJGtrKHG6WsksSu", "sleep", undefined);
      // sleep
      function sleep(ms) {
        return new Promise(function (resolve) {
          return setTimeout(resolve, ms);
        });
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TickEmitter.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvents.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, EventTarget, game, Game, Component, GameEvents;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EventTarget = module.EventTarget;
      game = module.game;
      Game = module.Game;
      Component = module.Component;
    }, function (module) {
      GameEvents = module.GameEvents;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _class3;
      cclegacy._RF.push({}, "4ba8atgbBJLLZrWlIyziBW2", "TickEmitter", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 1秒ごとに Tick イベントを発火するだけのクラス
       * シーンに1個置いておけばOK
       */
      var TickEmitter = exports('TickEmitter', (_dec = ccclass('TickEmitter'), _dec2 = property({
        tooltip: 'インターバル'
      }), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TickEmitter, _Component);
        function TickEmitter() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "interval", _descriptor, _assertThisInitialized(_this));
          _this.onTick = function () {
            TickEmitter.events.emit(GameEvents.Tick);
          };
          return _this;
        }
        var _proto = TickEmitter.prototype;
        _proto.onEnable = function onEnable() {
          // 第1引数: コールバック, 第2: 間隔(秒), 第3: 繰返し回数(<=0で無限), 第4: 初回遅延(秒)
          this.schedule(this.onTick, this.interval, Number.POSITIVE_INFINITY, this.interval);
          game.on(Game.EVENT_HIDE, this.pauseTimers, this);
          game.on(Game.EVENT_SHOW, this.resumeTimers, this);
        };
        _proto.onDisable = function onDisable() {
          this.unschedule(this.onTick);
          game.off(Game.EVENT_HIDE, this.pauseTimers, this);
          game.off(Game.EVENT_SHOW, this.resumeTimers, this);
        };
        _proto.pauseTimers = function pauseTimers() {
          this.unschedule(this.onTick);
        };
        _proto.resumeTimers = function resumeTimers() {
          this.schedule(this.onTick, this.interval);
        };
        _proto.resumeTimersHalf = function resumeTimersHalf() {
          this.schedule(this.onTick, this.interval * 2);
        };
        return TickEmitter;
      }(Component), _class3.events = new EventTarget(), _class3), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "interval", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TimeModel.ts", ['cc', './GameEvents.ts', './GameStore.ts'], function (exports) {
  var cclegacy, EventTarget, GameEvents, gameModel;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      gameModel = module.gameModel;
    }],
    execute: function () {
      cclegacy._RF.push({}, "621fccBXMtOV6rmppL9jUb8", "TimeModel", undefined);
      var TimeModel = exports('TimeModel', /*#__PURE__*/function () {
        function TimeModel() {
          this.events = new EventTarget();
          this._cnt = 0;
          this._limit = 500 / 50;
        }
        var _proto = TimeModel.prototype;
        // private readonly _limit = 31;
        _proto.updateDate = function updateDate() {
          this._cnt++;
          // const dayStr = numberToDate(this._cnt);
          this.events.emit(GameEvents.RestTimeChanged, this._limit - this._cnt);
          if (this._cnt == 10) {
            this.events.emit(GameEvents.OnSubsidy, 1);
          }

          // if (this._cnt == 30) {
          //     this.events.emit(GameEvents.OnSubsidy, 2);
          // } 
          //
          // if (this._cnt == 60) {
          //     this.events.emit(GameEvents.OnSubsidy, 2);
          // } 

          if (this._cnt >= this._limit) {
            gameModel.finish();
          }
        };
        _proto.reset = function reset() {
          this._cnt = 0;
        };
        return TimeModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});