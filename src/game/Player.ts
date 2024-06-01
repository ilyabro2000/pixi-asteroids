import {
  Container, Sprite, Texture,
} from 'pixi.js';
import Victor from 'victor';
import { clamp } from '@/utils';
import Input from '@/game/Input';
import { Actions } from '@/types/Input';
import { Laser } from '@/game/Laser';
import { pool } from '@/game/pool/MultiPool';
import Emitter from '@/game/Emitter';
import Events from '@/types/events';

export class Player extends Container {
  private static DEFAULT_ACCELERATION = 0.5;

  private static SHOOT_DELAY = 100;

  private static WIDTH = 40;

  private static HEIGHT = 40;

  private static FRICTION_WEIGHT = 0.04;

  private static MAX_SPEED = 7;

  private readonly texture: Texture;

  private readonly sprite: Sprite;

  private inputVector = Victor(0, 0);

  private rotationDirection = 0;

  private rotationSpeed = 0.07;

  private velocity = Victor(0, 0);

  private shootCD = false;

  constructor() {
    super();

    this.texture = Texture.from('ship_sidesA');
    this.sprite = Sprite.from(this.texture);
    this.sprite.anchor.set(0.5);
    this.sprite.width = Player.WIDTH;
    this.sprite.height = Player.HEIGHT;
    this.position.set(window.innerWidth / 2, window.innerHeight / 2);

    this.addChild(this.sprite);
  }

  public update(deltaTime: number) {
    this.handleInput();
    this.handleMovement(deltaTime);
  }

  private handleInput() {
    if (Input.isActionPressed(Actions.SHOOT)) {
      if (!this.shootCD) {
        this.shootCD = true;

        this.shootLasers();
        setTimeout(() => {
          this.shootCD = false;
        }, Player.SHOOT_DELAY);
      }
    }
  }

  handleMovement(dt: number) {
    this.inputVector = Victor(0, 0);
    this.rotationDirection = 0;

    this.inputVector.y = Input.getActionStrength(Actions.MOVE_UP)
        - Input.getActionStrength(Actions.MOVE_DOWN);

    if (Input.isActionPressed(Actions.MOVE_LEFT)) {
      this.rotationDirection = -1;

      if (this.inputVector.y === 0) {
        this.inputVector.y += 0.5;
      }
    }

    if (Input.isActionPressed(Actions.MOVE_RIGHT)) {
      this.rotationDirection = 1;

      if (this.inputVector.y === 0) {
        this.inputVector.y += 0.5;
      }
    }

    const accelerationVector = Victor(
      0,
      -this.inputVector.y * Player.DEFAULT_ACCELERATION * dt,
    )
      .rotate(this.rotation);

    this.velocity.add(accelerationVector);

    const velocityLength = this.velocity.length();

    this.velocity = this.velocity
      .normalize()
      .multiplyScalar(Math.min(velocityLength, Player.MAX_SPEED));

    if (this.inputVector.x === 0 || this.inputVector.y === 0) {
      this.velocity.mix(new Victor(0, 0), Player.FRICTION_WEIGHT);

      if (this.velocity.magnitude() <= 0.01) {
        this.velocity = Victor(0, 0);
      }
    }

    this.rotation += this.rotationDirection * this.rotationSpeed * dt;

    this.position.x = clamp(this.position.x + this.velocity.x * dt, 0, window.innerWidth);
    this.position.y = clamp(this.position.y + this.velocity.y * dt, 0, window.innerHeight);
  }

  shootLasers() {
    const laser = pool.get(Laser);
    laser.rotation = this.rotation;
    laser.position.set(this.position.x, this.position.y);

    Emitter.emit(Events.LASER_SHOT, laser);
  }
}
