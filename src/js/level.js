import Compositor from "./compositor";
import { Matrix } from "./matrix";
import TileCollider from "./tileCollider";

export default class Level {
  constructor() {
    this.comp = new Compositor();
    this.entities = new Set();
    this.tiles = new Matrix();

    this.tileCollider = new TileCollider();
  }

  update(deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime);
    });
  }
}
