import gsap from 'gsap';

export const resolveAndKillTweens = async (targets: gsap.TweenTarget) => {
  const tweens = gsap.getTweensOf(targets);
  for (const tween of tweens) {
    // eslint-disable-next-line no-underscore-dangle
    if ((tween as any)._prom) (tween as any)._prom();
  }
  gsap.killTweensOf(targets);
};
