import { loadImage } from "./loaders.js";
import SpriteSheet from "./spritesheet.js";

export function loadMarioSprite() {
  return loadImage("./img/characters.gif").then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define("idle", 276, 44, 16, 16);
    //console.log("7");
    return sprites;
  });
}

export function loadbackgroundSprites() {
  return loadImage("./img/tileset.png").then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.defineTile("ground", 0, 0);
    sprites.defineTile("sky", 3, 23);
    //console.log("6");
    return sprites;
  });
}
