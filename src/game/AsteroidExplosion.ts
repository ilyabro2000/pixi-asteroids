import {
  Container, Sprite, Texture,
} from 'pixi.js';
import gsap from 'gsap';
import { randomRange } from '@/utils/random';
import { resolveAndKillTweens } from '@/utils/animations';

export class AsteroidExplosion extends Container {
  private static particlesCount = 20;

  private particles: Sprite[] = [];

  constructor() {
    super();

    (new Array(AsteroidExplosion.particlesCount)).fill(null).forEach(() => {
      const particle = Sprite.from(Texture.from('meteor_detailedSmall'));

      particle.width = 8;
      particle.height = 8;

      particle.anchor.set(0.5);

      particle.visible = false;
      this.particles.push(particle);
      this.addChild(particle);
    });
  }

  public async play(color: number, size: number) {
    const animPromises: Promise<void>[] = [];

    (new Array(AsteroidExplosion.particlesCount)).fill(null).forEach((_, i) => {
      animPromises.push(this.playParticle(this.particles[i], color, size));
    });

    await Promise.all(animPromises);
  }

  private async playParticle(particle: Sprite, color: number, size: number) {
    gsap.killTweensOf(particle);
    gsap.killTweensOf(particle.scale);

    particle.texture = Texture.from('meteor_squareLarge');
    particle.tint = color;

    const width = randomRange(size / 6, size / 3).toFixed(0);
    particle.width = Number(width);
    particle.height = Number(width);

    particle.alpha = 1;
    particle.visible = true;

    particle.x = randomRange(-5, 5);
    particle.y = randomRange(-5, 5);

    const halfSize = size / 2;
    const x = randomRange(-halfSize, halfSize);
    const y = randomRange(-halfSize, halfSize);
    const alpha = 0.1;
    const transformDuration = randomRange(0.3, 0.6);
    const alphaDuration = randomRange(0.2, 0.4);

    await resolveAndKillTweens(particle);
    gsap.to(particle, {
      width, height: width, duration: transformDuration, ease: 'sine.out', delay: 0.05,
    });

    await resolveAndKillTweens(particle);
    await gsap.to(particle, {
      keyframes: [
        {
          x, y, duration: transformDuration, ease: 'quad.out', delay: 0.05,
        },
        { alpha, duration: alphaDuration },
      ],

    });

    particle.visible = false;
  }
}
