import TileResolver from "./tileResolver";

export default class TileCollider {
  constructor(tileMatrx) {
    this.tiles = new TileResolver(tileMatrx);
  }

  test(entity) {
    const match = this.tiles.matchByPosition(entity.pos.x, entity.pos.y);
    if (match) {
      console.log("matched tile:", match, match.tile);
    }
  }
}
