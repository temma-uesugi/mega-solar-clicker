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

System.register("chunks:///_virtual/GamaManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlayerData.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Button, Component, PlayerEvents, PlayerData;
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
      Component = module.Component;
    }, function (module) {
      PlayerEvents = module.PlayerEvents;
      PlayerData = module.PlayerData;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "9a4174ij3NCmJTmzXFEbUxS", "GamaManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GamaManager = exports('GamaManager', (_dec = ccclass('GamaManager'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GamaManager, _Component);
        function GamaManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.money = 0;
          _initializerDefineProperty(_this, "moneyLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "priceLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "addButton", _descriptor3, _assertThisInitialized(_this));
          _this.player = new PlayerData();
          return _this;
        }
        var _proto = GamaManager.prototype;
        _proto.onLoad = function onLoad() {
          //ボタンのイベント
          if (this.addButton) {
            this.addButton.node.on(Button.EventType.CLICK, this.onButtonClicked, this);
            // // Unityの onClick.AddListener と同じイメージ
            // this.addButton.node.on(Button.EventType.CLICK, this.onAddMoney, this);
          }

          // データ変更を購読してUI反映
          this.player.events.on(PlayerEvents.MoneyChanged, this.updateMoney, this);
          // 初期表示
          this.updateMoney(this.player.money);
        };
        _proto.onDestroy = function onDestroy() {
          // 購読解除（メモリリーク防止）
          this.player.events.off(PlayerEvents.MoneyChanged, this.updateMoney, this);
          if (this.addButton) {
            this.addButton.node.off(Button.EventType.CLICK, this.onButtonClicked, this);
          }
        };
        _proto.onButtonClicked = function onButtonClicked() {
          this.player.addElectric();
        };
        _proto.updateMoney = function updateMoney(value) {
          if (this.moneyLabel) {
            this.moneyLabel.string = "" + value;
          }
        };
        return GamaManager;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "moneyLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "priceLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "addButton", [_dec4], {
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

System.register("chunks:///_virtual/main", ['./BootResolution.ts', './GamaManager.ts', './PlayerData.ts'], function () {
  return {
    setters: [null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/PlayerData.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, EventTarget;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d98425/QEtALaI1O1BC8bod", "PlayerData", undefined);
      var PlayerEvents = exports('PlayerEvents', {
        MoneyChanged: 'player:moneyChanged',
        SalesPriceChanged: 'player:salesPriceChanged'
      });
      var PlayerData = exports('PlayerData', /*#__PURE__*/function () {
        function PlayerData() {
          this._money = 0;
          this._salesPrice = 1;
          // 変更通知用のイベントハブ（UIが購読）
          this.events = new EventTarget();
        }
        var _proto = PlayerData.prototype;
        _proto.addMoney = function addMoney(v) {
          if (v === void 0) {
            v = 1;
          }
          this._money += v;
          this.events.emit(PlayerEvents.MoneyChanged, this._money);
        };
        _proto.addElectric = function addElectric(value) {
          if (value === void 0) {
            value = 1;
          }
          console.log("add", value);
          this._money += value * this._salesPrice;
          this.events.emit(PlayerEvents.MoneyChanged, this._money);
        };
        _proto.updateSalesPrice = function updateSalesPrice(value) {
          this._salesPrice = value;
          this.events.emit(PlayerEvents.SalesPriceChanged, this._salesPrice);
        };
        _proto.resetMoney = function resetMoney() {
          this._money = 0;
          this.events.emit(PlayerEvents.MoneyChanged, this._money);
        };
        _createClass(PlayerData, [{
          key: "money",
          get:
          // 読み取り専用（外からは set できない）
          function get() {
            return this._money;
          }
        }, {
          key: "salesPrice",
          get: function get() {
            return this._salesPrice;
          }
        }]);
        return PlayerData;
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