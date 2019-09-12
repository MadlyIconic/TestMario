import Trait from "../trait.js";

export default class Velocity extends Trait {
  constructor() {
    super("velocity");
  }

  update(entity, deltaTime) {
    //console.log("velocity update: ", entity);
    entity.pos.x += entity.vel.x * deltaTime;
    entity.pos.y += entity.vel.y * deltaTime;
  }
}
