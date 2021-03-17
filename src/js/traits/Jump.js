import Trait from "../trait.js";
import { Sides } from "../entity.js";

export default class Jump extends Trait {
  constructor() {
    super("jump");

    this.ready = 0;
    this.duration = 0.4;
    this.velocity = 200;
    this.engagedTime = 0;
    this.requestTime = 0;
    this.gracePeriod = 0.3;
    this.speedBoost = 0.3;
  }

  get falling(){
    return this.ready < 0;
  }

  update(entity, deltaTime) {
    if(this.requestTime > 0){
      if(this.ready > 0){
        this.engagedTime = this.duration;
        this.requestTime = 0;
      }
      this.requestTime -= deltaTime;
    }
    //console.log("Can jump?: ", this.ready);
    if (this.engagedTime > 0) {
      entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
      this.engagedTime -= deltaTime;
    }


    this.ready--;
  }

  start(entity) {
    this.requestTime = this.gracePeriod;
    if(this.ready > 0){
      this.engagedTime = this.duration;
    }


    console.log("jump start", entity);
    console.log(entity.hasOwnProperty("draw"));
  }

  cancel() {
    console.log("jump cancel");
    this.engagedTime = 0;
    this.requestTime = 0;
  }

  obstruct(entity, side){
    if(side == Sides.BOTTOM){
      this.ready = 1;
    }else if(side = Sides.TOP){
      this.cancel();
    }
    if(!side){
      console.log('Jump obstruct:', side);
    }
    
  }
}
