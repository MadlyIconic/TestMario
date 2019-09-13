import Entity from "./entity.js";
import { loadMarioSprite } from "./sprites.js";
import Velocity from "./traits/Velocity.js";
import Jump from "./traits/Jump.js";
import Go from "./traits/go.js";

export function createMario(x, y, velx, vely) {
  return loadMarioSprite().then(sprite => {
    const mario = new Entity();
    mario.size.set(16, 16);
    mario.pos.set(x, y);
    //mario.vel.set(velx, vely);
    mario.addTrait(new Go());
    mario.addTrait(new Jump());
    // mario.addTrait(new Velocity());

    mario.draw = function drawMario(context) {
      sprite.draw("idle", context, 0,0);
    };
    return mario;
  });
}
