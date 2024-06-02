import {
  Application,
} from 'pixi.js';
import { initAssets } from '@/game/assets';
import GameScene from '@/game/GameScene';
import { pool } from '@/game/pool/MultiPool';

class App extends Application {
  constructor() {
    super({
      resolution: Math.max(window.devicePixelRatio, 2),
      backgroundAlpha: 0,
      autoStart: false,
      resizeTo: window,
    });

    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    globalThis.__PIXI_APP__ = this;
  }

  public async start(target: HTMLElement | null = document.body) {
    await this.init({
      view: document.createElement('canvas'),
      resolution: Math.max(window.devicePixelRatio, 2),
      backgroundAlpha: 0,
      resizeTo: window,
    });
    target?.appendChild(this.canvas);

    await initAssets();

    const gameScene = pool.get(GameScene);
    gameScene.prepare();
    this.stage.addChild(gameScene);

    await gameScene.show();
  }
}

export default new App();
