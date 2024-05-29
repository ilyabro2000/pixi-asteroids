import {
  Container, Sprite, Texture,
} from 'pixi.js';

export class GameScene extends Container {
  public readonly gameContainer: Container;

  private testPlayer = new Sprite();

  constructor() {
    super();
    this.gameContainer = new Container();

    this.addChild(this.gameContainer);

    this.testPlayer.texture = Texture.from('ship_sidesA');
    this.testPlayer.anchor.set(0.5);
    this.testPlayer.position.set(window.innerWidth / 2, window.innerHeight / 2);
    this.testPlayer.width = 40;
    this.testPlayer.height = 40;
    this.gameContainer.addChild(this.testPlayer);
    this.gameContainer.cursor = 'pointer';
    this.gameContainer.interactive = true;
  }

  public prepare() {
    //
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
