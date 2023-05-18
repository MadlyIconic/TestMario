export default class Anim{
constructor(frameLength, framelen){
  this.frameLength = frameLength
  this.framelen = frameLength

  this.createAnimation = function(frames, func){
    let self = this;
    if(!func){
      var func = function resolveFrame(distance){
        const frameIndex  = (Math.floor(distance / self.framelen) % frames.length);
            const frameName = frames[frameIndex];
            
            return frameName;
      }
    }
    return func;
  }

  this.routeFrame = function(entity, func){
      if(entity.jump.falling){
        //console.log("ready: ", entity.jump.ready);
        return "jump";
      }
      if(entity.go.dir > 0  || entity.go.dir < 0){
        if((entity.vel.x > 0 && entity.go.dir < 0 )|| (entity.vel.x < 0 && entity.go.dir > 0)) {
            console.log('Its a break');
            return "break";
        }
        return func(entity.go.distance);
      }
      return 'idle';
    }
  }
}