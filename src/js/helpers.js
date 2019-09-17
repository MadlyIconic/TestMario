import Entity from "./entity.js";
import { loadSpriteSheet } from "./loaders.js";
import Jump from "./traits/Jump.js";
import Go from "./traits/go.js";
import { createAnimation, routeFrame } from "./anim.js";

export function createMario(x, y, velx, vely) {
  return loadSpriteSheet('mario').then(sprite => {
    const frames = [];
    const mario = new Entity();
    mario.size.set(16, 16);
    mario.pos.set(x, y);
    mario.addTrait(new Go());
    mario.addTrait(new Jump());

    const spriteFrames = sprite.tiles;
    for (const entry of spriteFrames.entries()) {
      frames.push(entry[0])
    };

    const runAnim = createAnimation(frames, 10);

    mario.draw = function drawMario(context) {
      sprite.draw(routeFrame(this, runAnim), context, 0,0, (mario.go.heading < 0));
    };
    return mario;
  });
}
