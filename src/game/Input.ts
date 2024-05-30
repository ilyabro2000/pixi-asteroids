import { KeyboardActions } from '@/types/Keyboard';
import { Actions } from '@/types/Input';

class Input {
  public keys = new Set<string>();

  public mouse = {
    x: 0,
    y: 0,
    left: false,
    right: false,
  };

  constructor() {
    window.addEventListener('keydown', (event) => this.keys.add(event.code));
    window.addEventListener('keyup', (event) => this.keys.delete(event.code));
    window.addEventListener('mousemove', (event) => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
    });
    window.addEventListener('mousedown', (event) => {
      if (event.button === 0) this.mouse.left = true;
      if (event.button === 2) this.mouse.right = true;
    });
    window.addEventListener('mouseup', (event) => {
      if (event.button === 0) this.mouse.left = false;
      if (event.button === 2) this.mouse.right = false;
    });
  }

  getActionStrength(action: Actions) {
    return this.keys.has(KeyboardActions[action]) ? 1 : 0;
  }

  isActionPressed(action: string) {
    return this.keys.has(KeyboardActions[action]);
  }
}

export default new Input();
