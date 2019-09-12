import Entity from "./entity.js";
import { loadMarioSprite } from "./sprites.js";
import Velocity from "./traits/Velocity.js";
import Jump from "./traits/Jump.js";

export function createMario(x, y, velx, vely) {
  return loadMarioSprite().then(sprite => {
    const mario = new Entity();
    mario.pos.set(x, y);
    //mario.vel.set(velx, vely);
    mario.addTrait(new Velocity());
    mario.addTrait(new Jump());

    mario.draw = function drawMario(context) {
      sprite.draw("idle", context, this.pos.x, this.pos.y);
    };
    return mario;
  });
}
