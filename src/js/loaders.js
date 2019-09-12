import Level from "./level.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import { loadbackgroundSprites } from "./sprites.js";

export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

function createTiles(level, backgrounds) {
  backgrounds.forEach(background => {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; ++x) {
        for (let y = y1; y < y2; ++y) {
          level.tiles.set(x, y, {
            name: background.tile
          });
        }
      }
    });
  });
}

export function loadLevel(name) {
  let levelname = `levels/${name}.json`;
  return Promise.all([
    fetch(levelname).then(r => r.json()),
    loadbackgroundSprites()
  ]).then(([levelSpec, backgroundSprites]) => {
    const level = new Level();
    createTiles(level, levelSpec.backgrounds);
    //console.log("levelSpec:", levelSpec);
    //console.log("Sprites:", backgroundSprites);
    const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
    level.comp.layers.push(backgroundLayer);
    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);
    //console.table(level.tiles.grid);
    return level;
  });
}
