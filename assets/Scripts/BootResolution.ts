// // import {_decorator, Component, view, ResolutionPolicy, sys} from 'cc';
// //
// // const {ccclass} = _decorator;
// //
// // const DESIGN_W = 720;
// // const DESIGN_H = 1280;
// //
// // @ccclass('BootResolution')
// // export class BootResolution extends Component {
// //    
// //     onLoad() {
// //         const isMobile = sys.isMobile;
// //
// //         if (isMobile) {
// //             // 縦画面ゲーム想定：高さ基準で安定
// //             view.setDesignResolutionSize(DESIGN_W, DESIGN_H, ResolutionPolicy.FIXED_HEIGHT);
// //             // ★回転・サイズ変更に追従しない：あえて呼ばない
// //             // view.resizeWithBrowserSize(true);
// //         } else {
// //             // PCは見切れ防止でSHOW_ALL（好みで固定も可）
// //             view.setDesignResolutionSize(DESIGN_W, DESIGN_H, ResolutionPolicy.SHOW_ALL);
// //             // PCだけ追従したいなら有効化。完全固定にしたいならこの行も消す
// //             // view.resizeWithBrowserSize(true);
// //         }
// //
// //         view.enableRetina(true); // 端末負荷が気になるなら条件分岐で
// //     }
// // }
//

// assets/Scripts/BootResolution.ts
import { _decorator, Component, Node, view, ResolutionPolicy } from 'cc';
const { ccclass, property } = _decorator;

/**
 * デザイン高さ 1280 を基準に、
 * 表示可能高さ < 1280 のときだけ UIRoot を等倍縮小する。
 * 表示可能高さ >= 1280 のときはスケール1のまま（=拡大しない）。
 */
@ccclass('BootResolution')
export class BootResolution extends Component {
  @property(Node)
  uiRoot: Node | null = null;

  private readonly BASE_W = 720;
  private readonly BASE_H = 1280;

  onLoad() {
    // 横幅は基準に合わせ続ける（中央カラム安定）
    view.setDesignResolutionSize(this.BASE_W, this.BASE_H, ResolutionPolicy.FIXED_WIDTH);
    view.resizeWithBrowserSize(true);
    this.applyScale();
    view.on('canvas-resize', this.applyScale, this);
  }

  onDestroy() {
    view.off('canvas-resize', this.applyScale, this);
  }

  private applyScale = () => {
    if (!this.uiRoot) return;

    // 現在の“デザイン座標系”で見えている高さ
    // （FIXED_WIDTH 適用後の可視領域。ここが 1280 未満なら縮小が必要）
    const visible = view.getVisibleSize();
    const visibleH = visible.height;

    // 1280 以上なら 1、それ未満なら比率で等倍縮小（拡大はしない）
    const scale = Math.min(1, visibleH / this.BASE_H);

    // 等方スケール（X=Y）→ UI の比率を保ったまま全体を引き下げ
    this.uiRoot.setScale(scale, scale, 1);
    
  };
}
