// function drawBackground(background, context, sprites) {
//   background.ranges.forEach(([x1, x2, y1, y2]) => {
//     for (let x = x1; x < x2; ++x) {
//       for (let y = y1; y < y2; ++y) {
//         sprites.drawTile(background.tile, context, x, y);
//       }
//     }
//   });
// }

export function createBackgroundLayer(level, sprites) {
  const buffer = document.createElement("canvas");
  buffer.width = 1024;
  buffer.height = 768;
  const bgContext = buffer.getContext("2d");

  level.tiles.grid.forEach((column, x) => {
    column.forEach((tile, y) => {
      sprites.drawTile(tile.name, bgContext, x, y);
    });
  });

  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0);
  };
}

export function createSpriteLayer(entities) {
  return function drawSpriteLayer(context) {
    entities.forEach(entity => {
      entity.draw(context);
    });
  };
}
