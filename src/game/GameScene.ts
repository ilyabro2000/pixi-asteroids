import {
  Container, Ticker,
} from 'pixi.js';
import { Player } from '@/game/Player';
import { pool } from '@/game/pool/MultiPool';
import { Laser } from '@/game/Laser';
import Emitter from '@/game/Emitter';
import Events from '@/types/events';
import gsap from 'gsap';
import { Asteroid } from '@/game/Asteroid';
import { checkCollision, getBound } from '@/game/collision';
import { sleep } from '@/utils/sleep';
import { AsteroidExplosion } from '@/game/AsteroidExplosion';
import { clamp } from '@/utils';

export class GameScene extends Container {
  public readonly gameContainer = new Container();

  public readonly lasersContainer = new Container();

  public readonly asteroidsContainer = new Container();

  public readonly gameEffectsContainer = new Container();

  private player: Player;

  private asteroidsMaxCount = 20;

  constructor() {
    super();
    this.player = pool.get(Player);

    Emitter.on(Events.LASER_SHOT, this.onLaserShoot.bind(this));
    Emitter.on(Events.ASTEROID_DESTROYED, (position) => this.initSmallAsteroids(position));

    Emitter.on(Events.SET_WIN, this.setWin.bind(this));
    Emitter.on(Events.SET_LOSE, this.setLose.bind(this));

    Emitter.on(Events.SET_PAUSE, this.pause.bind(this));
    Emitter.on(Events.RESUME_GAME, this.resume.bind(this));
    Emitter.on(Events.RESTART_GAME, this.reset.bind(this));

    Ticker.minFPS = 60;
    Ticker.maxFPS = 60;
  }

  public prepare() {
    this.addChild(this.gameContainer);
    this.gameContainer.addChild(this.lasersContainer);
    this.gameContainer.addChild(this.asteroidsContainer);
    this.gameContainer.addChild(this.player);
    this.gameContainer.addChild(this.gameEffectsContainer);

    this.initAsteroids();

    Ticker.shared.add(this.update, this);
  }

  public async pause() {
    Ticker.shared.remove(this.update, this);
  }

  public async resume() {
    Ticker.shared.add(this.update, this);
  }

  public reset() {
    this.lasersContainer.children.forEach((laserEl) => {
      const laser = laserEl as Laser;
      pool.giveBack(laser);
    });
    this.lasersContainer.removeChildren();
    this.asteroidsContainer.children.forEach((asteroidEl) => {
      const asteroid = asteroidEl as Asteroid;
      pool.giveBack(asteroid);
    });
    this.asteroidsContainer.removeChildren();
    this.gameEffectsContainer.children.forEach((effectEl) => {
      const effect = effectEl as AsteroidExplosion;
      pool.giveBack(effect);
    });
    this.gameEffectsContainer.removeChildren();

    this.initAsteroids();
    this.player.init();
  }

  public update(ticker: Ticker) {
    if (!ticker) return;

    const clampedDelta = clamp(ticker.deltaTime, 0, 1000 / 60);

    this.player.update(clampedDelta);

    this.lasersContainer.children.forEach((laserEl) => {
      const laser = laserEl as Laser;
      laser.update(clampedDelta);
    });

    this.asteroidsContainer.children.forEach((asteroidEl) => {
      const asteroid = asteroidEl as Asteroid;
      asteroid.update(clampedDelta);
    });

    this.checkCollisions();
  }

  public async show() {
    gsap.fromTo(this.player, { alpha: 0 }, { alpha: 1, duration: 1 });
  }

  private onLaserShoot(laser: Laser) {
    this.lasersContainer.addChild(laser);
  }

  initAsteroids() {
    (new Array(this.asteroidsMaxCount)).fill(0).forEach(async () => {
      const asteroid = pool.get(Asteroid);
      await sleep(Math.random() * 7000);
      asteroid.init();
      this.asteroidsContainer.addChild(asteroid);
    });
  }

  initSmallAsteroids(position: { x: number, y: number }) {
    if (this.asteroidsContainer.children.length >= this.asteroidsMaxCount) return;

    (new Array(2)).fill(0).forEach(async () => {
      const asteroid = pool.get(Asteroid);
      await sleep(Math.random() * 400);
      asteroid.initSmall(position);
      this.asteroidsContainer.addChild(asteroid);
    });
  }

  private checkCollisions() {
    this.checkAsteroidsCollisions();
  }

  private checkAsteroidsCollisions() {
    this.asteroidsContainer.children.forEach((asteroidEl) => {
      const asteroid = asteroidEl as Asteroid;
      if (checkCollision(asteroid.bounds, this.player.bounds)) {
        this.player.getDamage();

        this.playAsteroidExplosion(
          { x: asteroid.x, y: asteroid.y },
          asteroid.color,
          asteroid.shapeSize,
        );

        asteroid.destroy(false);
      }

      this.lasersContainer.children.forEach((laserEl) => {
        const laser = laserEl as Laser;
        if (checkCollision(getBound(laser), asteroid.bounds)) {
          laser.destroy();

          this.playAsteroidExplosion(
            { x: asteroid.x, y: asteroid.y },
            asteroid.color,
            asteroid.shapeSize,
          );

          asteroid.destroy(true);
        }
      });
    });
  }

  private async playAsteroidExplosion(
    position: { x: number; y: number },
    color: number,
    size: number,
  ) {
    const explosion = pool.get(AsteroidExplosion);
    explosion.x = position.x;
    explosion.y = position.y;

    this.gameEffectsContainer.addChild(explosion);
    await explosion.play(color, size);

    this.gameEffectsContainer.removeChild(explosion);
    pool.giveBack(explosion);
  }

  setWin() {
    // взрыв всех астероидов
    this.pause();
  }

  setLose() {
    // взрыв корабля
    this.pause();
  }
}

export default GameScene;
