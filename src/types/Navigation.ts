import { Container } from 'pixi.js';

export interface AppScreen extends Container {
  show?(): Promise<void>;
  hide?(): Promise<void>;
  pause?(): Promise<void>;
  resume?(): Promise<void>;
  reset?(): void;
  prepare?(): void;
  update?(delta: number): void;
  resize?(width: number, height: number): void;
  setInteractiveChildren?(value: boolean): void;
}

export interface AppSceneConstructor {
  new (): AppScreen;
  assetBundles?: string[];
}
