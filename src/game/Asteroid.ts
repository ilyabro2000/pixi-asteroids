import { Container, Texture, Sprite } from 'pixi.js';
import Victor from 'victor';
import { randomRange } from '@/utils/random';

const TEXTURES_NAMES = [
  'meteor_detailedLarge',
  'meteor_detailedSmall',
  'meteor_large',
  'meteor_squareDetailedLarge',
  'meteor_squareDetailedSmall',
  'meteor_squareLarge',
];

enum TYPE {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

const SIZES = Object.freeze({
  [TYPE.SMALL]: 70,
  [TYPE.MEDIUM]: 130,
  [TYPE.LARGE]: 100,
});

const SPEEDS = Object.freeze({
  [TYPE.SMALL]: 3,
  [TYPE.MEDIUM]: 2,
  [TYPE.LARGE]: 1,
});

export class Asteroid extends Container {
  private texture: Texture;

  private sprite: Sprite;

  private movementVector: Victor = Victor(0, 0);

  private speed = 1;

  private size: TYPE = TYPE.SMALL;

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

    this.speed = SPEEDS[this.size];
    this.sprite.width = SIZES[this.size];
    this.sprite.height = SIZES[this.size];

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
}
