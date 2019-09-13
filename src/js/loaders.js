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

  function applyRange(background, xstart, xlength, ystart, ylength){
    const xend = xstart + xlength;
    const yend = ystart + ylength;
    for (let x = xstart; x < xend; ++x) {
      for (let y = ystart; y < yend; ++y) {
        level.tiles.set(x, y, {
          name: background.tile
        });
      }
    }
  }

  backgrounds.forEach(background => {
    background.ranges.forEach(range => {
      if(range.length ==4){
        const [xstart, xlength, ystart, ylength] = range;
        applyRange(background, xstart, xlength, ystart, ylength);
      }else if(range.length ==  3){
        const [xstart, xlen, ystart] = range;
        applyRange(background, xstart, xlen, ystart, 1);
      }else if(range.length == 2){
        const [xstart, ystart] = range;
        applyRange(background, xstart, 1, ystart, 1);
      }
    });
  });
}

export function loadLevel(name) {
  let levelname = `levels/${name}.json`;
  return Promise.all([
    loadJSON(levelname),
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

function loadJSON(levelname){
  return fetch(levelname).then(r => r.json())
}