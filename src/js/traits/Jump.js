import Trait from "../trait";

export default class Jump extends Trait {
  constructor() {
    super("jump");

    this.duration = 0.5;
    this.velocity = 200;
    this.engagedTime = 0;
  }

  update(entity, deltaTime) {
    //console.log("jump update: ", entity);
    if (this.engagedTime > 0) {
      entity.vel.y = -this.velocity;
      this.engagedTime -= deltaTime;
    }
  }

  start(entity) {
    this.engagedTime = this.duration;
    //console.log("jump start", entity);
    //console.log(entity.hasOwnProperty("draw"));
  }

  cancel() {
    //console.log("jump cancel");
    this.engagedTime = 0;
  }
}
