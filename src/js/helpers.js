import Entity from "./entity";
import { loadMarioSprite } from "./sprites";
import Velocity from "./traits/Velocity";
import Jump from "./traits/Jump";

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
