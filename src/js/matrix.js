// matrix.set(5, 4, { name: "ground" });
// const tile = matrix.get(mario.pos.x * TILE_SIZE, mario.pos.y * TILE_SIZE);
// if (tile == "ground") {
//   moveMario();
// }

export class Matrix {
  constructor() {
    this.grid = [];
  }

  set(x, y, value) {
    if (!this.grid[x]) {
      this.grid[x] = [];
    }

    this.grid[x][y] = value;
  }

  get(x, y) {
    const col = this.grid[x];
    if (col) {
      return col[y];
    }

    return undefined;
  }
}
//console.log("adding Matrix");
//window.Matrix = Matrix;
