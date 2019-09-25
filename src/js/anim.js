import { createMario } from "./helpers.js";

export function createAnimation(frames, frameLength){
    return function resolveFrame(distance){
      const frameIndex  = (Math.floor(distance / frameLength) % frames.length);
          const frameName = frames[frameIndex];
          
          return frameName;
    }
  }

  export function routeFrame(entity, func){
    if(entity.jump.falling){
       //console.log("ready: ", entity.jump.ready);
       return "jump";
    }
    if(entity.go.dir > 0  || entity.go.dir < 0){
      if((entity.vel.x > 0 && entity.go.dir < 0 )|| (entity.vel.x < 0 && entity.go.dir > 0)) {
          //console.log('break');
          return "break";
      }
      return func(entity.go.distance);
    }
    return 'idle';
  }