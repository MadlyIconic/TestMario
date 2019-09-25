import Compositor from "./compositor.js";
import { Matrix } from "./matrix.js";
import TileCollider from "./tileCollider.js";

export default class Level {
  constructor() {
    this.gravity = 0;
    this.comp = new Compositor();
    this.entities = new Set();
    this.tiles = new Matrix();
    this.totalTime = 0;
    this.tileCollider = new TileCollider(this.tiles);
  }

  update(deltaTime) {
    
    this.entities.forEach(entity => {
      entity.update(deltaTime);

      entity.pos.x += entity.vel.x * deltaTime;
      this.tileCollider.checkX(entity);
      
      entity.pos.y += entity.vel.y * deltaTime;
      this.tileCollider.checkY(entity);
    });

    this.totalTime +=  deltaTime;
  }
}
