// UIに依存しない、ただのデータ置き場
import {EventTarget} from 'cc';

export const PlayerEvents = {
    MoneyChanged: 'player:moneyChanged',
    SalesPriceChanged: 'player:salesPriceChanged',
} as const;

export class PlayerData {
    private _money = 0;
    private _salesPrice = 1;

    // 変更通知用のイベントハブ（UIが購読）
    public readonly events = new EventTarget();

    // 読み取り専用（外からは set できない）
    public get money() {
        return this._money;
    }

    public get salesPrice() {
        return this._salesPrice;
    }

    public addMoney(v: number = 1) {
        this._money += v;
        this.events.emit(PlayerEvents.MoneyChanged, this._money);
    }

    public addElectric(value: number = 1) {
        console.log("add", value)
        this._money += value * this._salesPrice;
        this.events.emit(PlayerEvents.MoneyChanged, this._money);
    }

    public updateSalesPrice(value: number) {
        this._salesPrice = value;
        this.events.emit(PlayerEvents.SalesPriceChanged, this._salesPrice);
    }

    public resetMoney() {
        this._money = 0;
        this.events.emit(PlayerEvents.MoneyChanged, this._money);
    }
}
