import {
  Application,
} from 'pixi.js';
import { initAssets } from '@/game/assets';
import { navigation } from '@/game/navigation';
import GameScene from '@/game/GameScene';

class App extends Application<HTMLCanvasElement> {
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

    window.addEventListener('resize', this.handleResize.bind(this));

    await initAssets();

    await navigation.showScene(GameScene);

    this.handleResize();
  }

  handleResize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    window.scrollTo(0, 0);
    navigation.resize(windowWidth, windowHeight);
  }
}

export default new App();
