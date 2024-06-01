import {
  Container, Ticker,
} from 'pixi.js';
import { Player } from '@/game/Player';
import { pool } from '@/game/pool/MultiPool';
import { Laser } from '@/game/Laser';
import Emitter from '@/game/Emitter';
import Events from '@/types/events';
import gsap from 'gsap';

export class GameScene extends Container {
  public readonly gameContainer = new Container();

  public readonly lasersContainer = new Container();

  private player: Player;

  constructor() {
    super();
    this.player = pool.get(Player);

    this.addChild(this.gameContainer);
    this.gameContainer.addChild(this.lasersContainer);

    Emitter.on(Events.LASER_SHOT, this.onLaserShoot.bind(this));
  }

  public prepare() {
    this.gameContainer.addChild(this.player);
    Ticker.shared.add(this.update, this);
  }

  public async pause() {
    Ticker.shared.remove(this.update, this);
  }

  public async resume() {
    Ticker.shared.add(this.update, this);
  }

  public reset() {
    //
  }

  public resize(width: number, height: number) {

  }

  public update(ticker: Ticker) {
    if (!ticker) return;

    this.player.update(ticker.deltaTime);
    this.lasersContainer.children.forEach((laser: Laser) => {
      laser.update(ticker.deltaTime);
    });

    console.log(this.lasersContainer.children.length);
  }

  public async show() {
    gsap.fromTo(this.player, { alpha: 0 }, { alpha: 1, duration: 1 });
  }

  private onLaserShoot(laser: Laser) {
    this.lasersContainer.addChild(laser);
  }
}

export default GameScene;
