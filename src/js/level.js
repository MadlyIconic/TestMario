import Compositor from "./compositor.js";
import TileCollider from "./tileCollider.js";

export class Level {
  constructor() {
    this.gravity = 0;
    this.comp = new Compositor();
    this.entities = new Set();
    //this.tiles = new Matrix();
    this.totalTime = 0;
    this.tileCollider = null;
  }

  setCollisionGrid(matrix){
    this.tileCollider = new TileCollider(matrix);
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
