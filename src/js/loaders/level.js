import Level from "../level.js";
import { createBackgroundLayer, createSpriteLayer } from "../layers.js";
import { loadSpriteSheet } from "../loaders.js";
import { loadJSON } from "./json.js";

export function loadLevel(name) {
    let levelname = `levels/${name}.json`;
    return loadJSON (levelname)
      .then(levelSpec => Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet)
      ]))
      .then(([levelSpec, backgroundSprites]) => {
      const level = new Level();

      for(const {tile, x, y} of expandTiles(levelSpec.tiles, levelSpec.patterns)){
            level.tiles.set(x, y, {
                         name: tile.name,
                         type: tile.type
            });
       }

      const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
      level.comp.layers.push(backgroundLayer);
      const spriteLayer = createSpriteLayer(level.entities);
      level.comp.layers.push(spriteLayer);
      level.gravity = levelSpec.gravity;
      return level;
    });
  }

  function* expandSpan(xstart, xlength, ystart, ylength){
    const xend = xstart + xlength;
    const yend = ystart + ylength;
    for (let x = xstart; x < xend; ++x) {
      for (let y = ystart; y < yend; ++y) {
            yield{x,y};
      }
    }
  }

  function expandRange(range){
    if(range.length ==4){
        const [xstart, xlength, ystart, ylength] = range;
        return expandSpan(xstart, xlength, ystart, ylength);
      }else if(range.length ==  3){
        const [xstart, xlen, ystart] = range;
        return expandSpan(xstart, xlen, ystart, 1);
      }else if(range.length == 2){
        const [xstart, ystart] = range;
        return expandSpan(xstart, 1, ystart, 1);
      }
  }

  function* expandRanges(ranges){
    for (const range of ranges){
        for(const item of expandRange(range)){
            yield item;
        }
    }
  }

function expandTiles(tiles, patterns) {
    const expandedTiles = [];
    function walkTiles(tiles, offsetX, offsetY){
        for(const tile of tiles){
            for (const {x,y} of expandRanges(tile.ranges)) {
                const derivedX = x  + offsetX;
                const derivedY = y  + offsetY;
                if(tile.pattern){
                    const newTiles = patterns[tile.pattern].tiles;
                    walkTiles(newTiles, derivedX, derivedY);
                }
                else{
                    expandedTiles.push(
                        {
                            tile,
                            x: derivedX,
                            y: derivedY
                        }
                    );
                    // level.tiles.set(derivedX, derivedY, {
                    //     name: tile.name,
                    //     type: tile.type
                    
                }
            }
        }
    }

    walkTiles(tiles, 0, 0);

    return  expandedTiles;
}