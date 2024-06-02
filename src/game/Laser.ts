import {
  Container, Sprite, Texture,
} from 'pixi.js';
import Victor from 'victor';
import { pool } from '@/game/pool/MultiPool';

export class Laser extends Container {
  private static SPEED = 10;

  private static WIDTH = 7;

  private static HEIGHT = 17;

  private readonly texture: Texture;

  private readonly sprite: Sprite;

  private movementVector = new Victor(0, -1);

  constructor() {
    super();

    this.texture = Texture.from('effect_yellow');
    this.sprite = Sprite.from(this.texture);
    this.sprite.anchor.set(0.5);
    this.sprite.width = Laser.WIDTH;
    this.sprite.height = Laser.HEIGHT;

    this.addChild(this.sprite);
  }

  public update(deltaTime: number) {
    const rotatedVector = this.movementVector.clone().rotate(this.rotation);
    this.position.x += rotatedVector.x * Laser.SPEED * deltaTime;
    this.position.y += rotatedVector.y * Laser.SPEED * deltaTime;

    if (
      this.position.x < 0
        || this.position.x > window.innerWidth
        || this.position.y < 0
        || this.position.y > window.innerHeight
    ) {
      pool.giveBack(this);
      this.removeFromParent();
    }
  }

  public destroy() {
    pool.giveBack(this);
    this.removeFromParent();
  }
}
