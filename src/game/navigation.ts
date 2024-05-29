import { Container, Ticker } from 'pixi.js';
import { pool } from '@/game/pool/MultiPool';
import app from '@/game/app';
import { areBundlesLoaded, loadBundles } from '@/game/assets';
import { AppSceneConstructor } from '@/types/Navigation';

class Navigation {
  public container = new Container();

  public width = 0;

  public height = 0;

  public currentScene?: AppSceneConstructor;

  private async addAndShowScene(scene: AppSceneConstructor) {
    if (!this.container.parent) {
      app.stage.addChild(this.container);
    }

    this.container.addChild(scene);

    if (scene.prepare) {
      scene.prepare();
    }

    if (scene.resize) {
      scene.resize(this.width, this.height);
    }

    if (scene.update) {
      Ticker.shared.add(scene.update, scene);
    }

    if (scene.show) {
      scene.interactiveChildren = false;
      await scene.show();
      scene.interactiveChildren = true;
    }
  }

  public async hideAndRemoveScene(scene: AppSceneConstructor) {
    if (scene.hide) {
      await scene.hide();
    }

    if (scene.update) {
      app.ticker.remove(scene.update, scene);
    }

    if (scene.parent) {
      scene.parent.removeChild(scene);
    }

    if (scene.reset) {
      scene.reset();
    }
  }

  public async showScene(ctor: AppSceneConstructor) {
    if (this.currentScene) {
      this.currentScene.interactiveChildren = false;
    }

    if (ctor.assetBundles && !areBundlesLoaded(ctor.assetBundles)) {
      await loadBundles(ctor.assetBundles);
    }

    if (this.currentScene) {
      await this.hideAndRemoveScene(this.currentScene);
    }

    this.currentScene = pool.get(ctor);

    if (!this.currentScene) return;

    await this.addAndShowScene(this.currentScene);
  }

  public resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.currentScene?.resize?.(width, height);
  }

  public pause() {
    this.currentScene?.pause?.();
  }

  public play() {
    this.currentScene?.play?.();
  }
}

export const navigation = new Navigation();
