export function createAnmation(frames, frameLength){
    return function resolveFrame(distance){
      const frameIndex  = (Math.floor(distance / frameLength) % frames.length);
          const frameName = frames[frameIndex];
          return frameName;
    }
  }

  export function routeFrame(entity, func){
    if(entity.go.dir !== 0){
      return func(entity.go.distance);
    }
    return 'idle';
  }