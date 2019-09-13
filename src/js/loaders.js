import Level from "./level.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import SpriteSheet from "./spritesheet.js";

export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

export function loadLevel(name) {
  let levelname = `levels/${name}.json`;
  return loadJSON (levelname)
    .then(levelSpec => Promise.all([
      levelSpec,
      loadSpriteSheet(levelSpec.spriteSheet)
    ]))
    .then(([levelSpec, backgroundSprites]) => {
    const level = new Level();
    createTiles(level, levelSpec.backgrounds);
    const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
    level.comp.layers.push(backgroundLayer);
    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);
    return level;
  });
}

function loadJSON(levelname){
  return fetch(levelname).then(r => r.json())
}

function createTiles(level, backgrounds) {
  function applyRange(background, xstart, xlength, ystart, ylength){
    const xend = xstart + xlength;
    const yend = ystart + ylength;
    for (let x = xstart; x < xend; ++x) {
      for (let y = ystart; y < yend; ++y) {
        level.tiles.set(x, y, {
          name: background.tile,
          type: background.type
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


function loadSpriteSheet(name){
  return  loadJSON(`sprites/${name}.json`)
  .then(sheetSpec => Promise.all(
    [sheetSpec,loadImage(sheetSpec.imageURL)]))
  .then(([sheetSpec, image])  => {
    
      const sprites = new SpriteSheet(
        image,
        sheetSpec.tileW,
        sheetSpec.tileH);

      sheetSpec.tiles.forEach(tileSpec =>{
        sprites.defineTile(
          tileSpec.name, 
          tileSpec.index[0], 
          tileSpec.index[1]);
      })
      // sprites.defineTile("ground", 0, 0);
      // sprites.defineTile("sky", 3, 23);
      //console.log("6");
      return sprites;
    
  });
}
