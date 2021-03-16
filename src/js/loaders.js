
import SpriteSheet from "./spritesheet.js";
import Anim from "./anim.js";

import { loadJSON } from "./loaders/json.js";

export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}




export function loadSpriteSheet(name){
  return  loadJSON(`sprites/${name}.json`)
  .then(sheetSpec => Promise.all(
    [sheetSpec,loadImage(sheetSpec.imageURL)]))
  .then(([sheetSpec, image])  => {
    
      const sprites = new SpriteSheet(
        image,
        sheetSpec.tileW,
        sheetSpec.tileH);

      if(sheetSpec.tiles){
        sheetSpec.tiles.forEach(tileSpec =>{
          sprites.defineTile(
          tileSpec.name, 
          tileSpec.index[0], 
          tileSpec.index[1]);
        });
      }

      if(sheetSpec.frames){
        sheetSpec.frames.forEach(frameSpec =>  {
            sprites.define(frameSpec.name, ...frameSpec.rect);
        })
      }

      if(sheetSpec.animations){
        sheetSpec.animations.forEach(animSpec =>  {
            const func = null;
            // func = sheetSpec.animations.get(animSpec.name);
            const animationCreator = new Anim(animSpec.framelen);
            const animation = animationCreator.createAnimation(animSpec.frames, animSpec.frameLength, func)
            sprites.defineAmin(animSpec.name, animation, func);
          
        })
      }
      return sprites;
    
  });
}
