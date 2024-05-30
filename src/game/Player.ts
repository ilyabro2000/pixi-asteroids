import {
  Container, Sprite, Texture, Ticker,
} from 'pixi.js';
import Victor from 'victor';
import { clamp } from '@/utils';
import Input from '@/game/Input';
import { Actions } from '@/types/Input';

export class Player extends Container {
  private static DEFAULT_ACCELERATION = 0.2;

  private static WIDTH = 40;

  private static HEIGHT = 40;

  private static FRICTION_WEIGHT = 0.05;

  private static MAX_SPEED = 4;

  private readonly bounds: Sprite;

  private readonly texture: Texture;

  private readonly sprite: Sprite;

  private inputVector = Victor(0, 0);

  private rotationDirection = 0;

  private rotationSpeed = 0.07;

  private velocity = Victor(0, 0);

  constructor() {
    super();

    this.texture = Texture.from('ship_sidesA');
    this.sprite = Sprite.from(this.texture);
    this.sprite.anchor.set(0.5);
    this.sprite.width = Player.WIDTH;
    this.sprite.height = Player.HEIGHT;
    this.position.set(window.innerWidth / 2, window.innerHeight / 2);

    this.bounds = Sprite.from(Texture.WHITE);
    this.bounds.anchor.set(0.5);
    this.bounds.alpha = 0.1;
    this.bounds.width = Player.WIDTH - 10;
    this.bounds.height = Player.HEIGHT - 7;

    this.addChild(this.sprite);
    this.addChild(this.bounds);

    Ticker.shared.add(this.update, this);
  }

  public update(delta: number) {
    // this.handleInput();
    this.handleMovement(delta);
  }

  handleMovement({ deltaTime } : { number }) {
    this.inputVector = Victor(0, 0);
    this.rotationDirection = 0;

    this.inputVector.y = Input.getActionStrength(Actions.MOVE_UP)
        - Input.getActionStrength(Actions.MOVE_DOWN);

    if (Input.isActionPressed(Actions.MOVE_LEFT)) {
      this.rotationDirection = -1;

      if (this.inputVector.y === 0) {
        this.inputVector.y += 0.2;
      }
    }

    if (Input.isActionPressed(Actions.MOVE_RIGHT)) {
      this.rotationDirection = 1;

      if (this.inputVector.y === 0) {
        this.inputVector.y += 0.2;
      }
    }

    const accelerationVector = Victor(
      0,
      -this.inputVector.y * Player.DEFAULT_ACCELERATION * deltaTime,
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

    this.rotation += this.rotationDirection * this.rotationSpeed * deltaTime;

    this.position.x = clamp(this.position.x + this.velocity.x * deltaTime, 0, window.innerWidth);
    this.position.y = clamp(this.position.y + this.velocity.y * deltaTime, 0, window.innerHeight);
  }
}
