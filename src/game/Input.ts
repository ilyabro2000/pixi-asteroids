import { KeyboardActions } from '@/types/Keyboard';
import { Actions } from '@/types/Input';

class Input {
  public keys = new Set<string>();

  constructor() {
    window.addEventListener('keydown', (event) => this.keys.add(event.code));
    window.addEventListener('keyup', (event) => this.keys.delete(event.code));
  }

  getActionStrength(action: Actions) {
    return this.keys.has(KeyboardActions[action]) ? 1 : 0;
  }

  isActionPressed(action: Actions) {
    return this.keys.has(KeyboardActions[action]);
  }
}

export default new Input();
