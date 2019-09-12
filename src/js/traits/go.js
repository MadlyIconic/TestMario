import Trait from "../trait.js";

export default class Go extends Trait {
  constructor() {
    super("go");

    this.dir = 0;
    this.speed = 4000;
  }

  update(entity, deltaTime) {
    //console.log("go update: ", entity);
    entity.vel.x = this.speed * this.dir * deltaTime;
  }

//   start(entity) {
//     this.engagedTime = this.duration;
//     //console.log("jump start", entity);
//     //console.log(entity.hasOwnProperty("draw"));
//   }

//   cancel() {
//     //console.log("jump cancel");
//     this.engagedTime = 0;
//   }
}
