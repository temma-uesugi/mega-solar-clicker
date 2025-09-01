import {_decorator, Component, Label, Button} from 'cc';
import {PlayerData, PlayerEvents} from './PlayerData';

const {ccclass, property} = _decorator;

@ccclass('GamaManager')
export class GamaManager extends Component {

    private money: number = 0;

    @property(Label)
    moneyLabel: Label | null = null;

    @property(Label)
    priceLabel: Label | null = null;

    @property(Button)
    addButton: Button | null = null;

    private player = new PlayerData();

    public onLoad() {

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

    }

    onDestroy() {
        // 購読解除（メモリリーク防止）
        this.player.events.off(PlayerEvents.MoneyChanged, this.updateMoney, this);
        if (this.addButton) {
            this.addButton.node.off(Button.EventType.CLICK, this.onButtonClicked, this);
        }
    }

    private onButtonClicked() {
        this.player.addElectric();
    }
    
    private updateMoney(value: number) {
        if (this.moneyLabel) {
            this.moneyLabel.string = `${value}`;
        }
    }
    
}


