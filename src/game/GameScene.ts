import {
  Container,
} from 'pixi.js';
import { Player } from '@/game/Player';

export class GameScene extends Container {
  public readonly gameContainer: Container;

  private player: Player = new Player();

  constructor() {
    super();
    this.gameContainer = new Container();

    this.addChild(this.gameContainer);
  }

  public prepare() {
    this.gameContainer.addChild(this.player);
  }

  public async pause() {
    this.gameContainer.interactiveChildren = false;
    //
  }

  public async resume() {
    this.gameContainer.interactiveChildren = true;
    //
  }

  public reset() {
    //
  }

  public resize(width: number, height: number) {

  }

  public update() {
    //
  }

  public async show() {
    //
  }
}

export default GameScene;
