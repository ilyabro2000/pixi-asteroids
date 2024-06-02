import {
  Container, Texture, Sprite,
} from 'pixi.js';
import Victor from 'victor';
import { randomItem, randomRange } from '@/utils/random';
import { pool } from '@/game/pool/MultiPool';
import Emitter from '@/game/Emitter';
import Events from '@/types/events';
import { IBound } from '@/game/collision';
import { Colors } from '@/types/Colors';

const TEXTURES_NAMES = [
  'meteor_detailedLarge',
  'meteor_detailedSmall',
  'meteor_large',
  'meteor_squareDetailedLarge',
  'meteor_squareDetailedSmall',
  'meteor_squareLarge',
];

enum AsteroidSizeType {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

const SIZES = Object.freeze({
  [AsteroidSizeType.SMALL]: 30,
  [AsteroidSizeType.MEDIUM]: 60,
  [AsteroidSizeType.LARGE]: 80,
});

const COLLISION_SIZE = Object.freeze({
  [AsteroidSizeType.SMALL]: 20,
  [AsteroidSizeType.MEDIUM]: 32,
  [AsteroidSizeType.LARGE]: 50,
});

const SPEEDS = Object.freeze({
  [AsteroidSizeType.SMALL]: 3,
  [AsteroidSizeType.MEDIUM]: 2,
  [AsteroidSizeType.LARGE]: 1,
});

const COLORS = Object.freeze({
  [AsteroidSizeType.SMALL]: Colors.SMALL_ASTEROID,
  [AsteroidSizeType.MEDIUM]: Colors.MEDIUM_ASTEROID,
  [AsteroidSizeType.LARGE]: Colors.LARGE_ASTEROID,
});

export class Asteroid extends Container {
  private texture: Texture;

  private sprite: Sprite;

  private movementVector: Victor = Victor(0, 0);

  private speed = 1;

  private size: AsteroidSizeType = AsteroidSizeType.SMALL;

  private rotationDirection = 0;

  constructor() {
    super();
    const randomTexture = TEXTURES_NAMES[Math.floor(Math.random() * TEXTURES_NAMES.length)];
    this.texture = Texture.from(randomTexture);

    this.sprite = Sprite.from(this.texture);
    this.sprite.anchor.set(0.5);

    this.addChild(this.sprite);
  }

  init() {
    this.setTypeParams(randomItem(AsteroidSizeType));

    const edge = Math.floor(Math.random() * 4);
    let startX = 0;
    let startY = 0;

    switch (edge) {
      case 0: // Верх
        startX = Math.random() * window.innerWidth + this.sprite.width / 2;
        startY = -this.sprite.height / 2;
        break;
      case 1: // Право
        startX = window.innerWidth + this.sprite.width / 2;
        startY = Math.random() * window.innerHeight + this.sprite.height / 2;
        break;
      case 2: // Низ
        startX = Math.random() * window.innerWidth + this.sprite.width / 2;
        startY = window.innerHeight + this.sprite.height / 2;
        break;
      case 3: // Лево
        startX = 0 - this.sprite.width / 2;
        startY = Math.random() * window.innerHeight + this.sprite.height / 2;
        break;
      default:
        break;
    }

    this.position.set(startX, startY);

    const targetX = randomRange(-window.innerWidth, window.innerWidth);
    const targetY = randomRange(-window.innerHeight, window.innerHeight);
    this.movementVector = new Victor(targetX - startX, targetY - startY).normalize();

    this.rotationDirection = randomRange(-0.02, 0.02);
  }

  public update(deltaTime: number) {
    this.sprite.rotation += this.rotationDirection;
    const rotatedVector = this.movementVector.clone().rotate(this.rotation);

    this.position.x += rotatedVector.x * this.speed * deltaTime;
    this.position.y += rotatedVector.y * this.speed * deltaTime;

    if (
      this.position.x < 0 - this.sprite.width / 2
        || this.position.x > window.innerWidth + this.sprite.width / 2
        || this.position.y < 0 - this.sprite.height / 2
        || this.position.y > window.innerHeight + this.sprite.height / 2
    ) {
      this.init();
    }
  }

  private setTypeParams(size: AsteroidSizeType) {
    this.size = size;
    this.sprite.width = SIZES[size];
    this.sprite.height = SIZES[size];
    this.speed = SPEEDS[size];
    this.sprite.tint = COLORS[size];
  }

  public initSmall(position: { x: number, y: number }) {
    this.setTypeParams(AsteroidSizeType.SMALL);
    this.movementVector = new Victor(Math.random() - 0.5, Math.random() - 0.5).normalize();
    this.position.set(position.x, position.y);
  }

  public destroy(withScore = false) {
    if (withScore && this.size === AsteroidSizeType.SMALL) {
      Emitter.emit(Events.SET_SCORE, 10);
    }

    if (this.size !== AsteroidSizeType.SMALL) {
      Emitter.emit(Events.ASTEROID_DESTROYED, { x: this.position.x, y: this.position.y });
    }

    pool.giveBack(this);
    this.init();
  }

  get bounds(): IBound {
    return {
      left: this.position.x,
      right: COLLISION_SIZE[this.size] + this.position.x,
      top: this.position.y,
      bottom: COLLISION_SIZE[this.size] + this.position.y,
    };
  }

  get color() {
    return this.sprite.tint;
  }

  get shapeSize(): number {
    return this.sprite.width;
  }
}
