import TileResolver from "./tileResolver.js";

export default class TileCollider {
  constructor(tileMatrx) {
    this.tiles = new TileResolver(tileMatrx);
  }

  checkY(entity){
    
    const match = this.tiles.matchByPosition(entity.pos.x, entity.pos.y);
    if(!match){
      return;
    }
    if(match.tile.name !== 'ground'){
      return;
    }
    if(entity.vel.y > 0){
      if(entity.pos.y > match.y1){
        entity.pos.y = match.y1;
        entity.vel.y = 0;
      }
    }else if(entity.vel.y < 0){
      if(entity.pos.y < match.y2){
        entity.pos.y = match.y2;
        entity.vel.y = 0;
      }
    }

  }

  test(entity) {
    this.checkY(entity);
  }
}
