import { Actions } from '@/types/Input';

enum Keyboard {
  UP = 'KeyW',
  DOWN = 'KeyS',
  LEFT = 'KeyA',
  RIGHT = 'KeyD',
  SPACE = 'Space',
}

const KeyboardActions = Object.freeze({
  [Actions.MOVE_UP]: Keyboard.UP,
  [Actions.MOVE_DOWN]: Keyboard.DOWN,
  [Actions.MOVE_LEFT]: Keyboard.LEFT,
  [Actions.MOVE_RIGHT]: Keyboard.RIGHT,
  [Actions.SHOOT]: Keyboard.SPACE,
});

export {
  Keyboard,
  KeyboardActions,
};
