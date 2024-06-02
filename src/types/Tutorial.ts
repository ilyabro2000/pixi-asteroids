const CONTROLS_TEXTS = {
  rotation: {
    id: 'rotation',
    keys: ['a', 'd'],
    text: 'Повернуть влево / вправо',
  },
  move: {
    id: 'move',
    keys: ['w', 's'],
    text: 'Двигаться вперед / назад',
  },
  drop: {
    id: 'shoot',
    keys: ['space'],
    text: 'Огонь!',
  },
};

enum TUTORIAL_TEXTS_IDS {
  gold = 'gold',
  asteroid = 'asteroid',
  health = 'health',
}

const GAME_TEXTS = {
  asteroids: [
    {
      text: 'Разбивай золотые астероиды, они приносят очки',
      id: TUTORIAL_TEXTS_IDS.gold,
    },
    {
      text: 'Большие астероиды разбиваются на золотые',
      id: TUTORIAL_TEXTS_IDS.asteroid,
    }, {
      text: 'Избегайте столкновений, они отнимают жизни',
      id: TUTORIAL_TEXTS_IDS.health,
    },
  ],
  goal: [
    '-Набери как можно больше очков за отведенное время',
    '-Полоска сверху показывает оставшееся время',
    '-Доберись до финала без критических повреждений',
  ],
};

export {
  CONTROLS_TEXTS,
  GAME_TEXTS,
  TUTORIAL_TEXTS_IDS,
};
