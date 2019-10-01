// import Entity from "./entity.js";
// import { loadSpriteSheet } from "./loaders.js";
// import Jump from "./traits/Jump.js";
// import Go from "./traits/go.js";
// import { createAnimation, routeFrame } from "./anim.js";

// const SLOW_DRAG = 1/1000;
// const FAST_DRAG = 1/5000;


// export function createMario() {
//   return loadSpriteSheet('mario').then(sprite => {
//     const frames = [];
//     const mario = new Entity();
//     mario.size.set(16, 16);
    
//     mario.addTrait(new Go());
//     mario.addTrait(new Jump());
//     mario.go.dragFactor = SLOW_DRAG;
//     mario.turbo = function(turboOn){
//       if (turboOn) {
//         mario.go.dragFactor = FAST_DRAG;
//       }else{
//         mario.go.dragFactor = SLOW_DRAG;
//       }
//     }
//     const spriteFrames = sprite.tiles;
//     for (const entry of spriteFrames.entries()) {
//       frames.push(entry[0])
//     };

//     const runAnim = createAnimation(frames, 8);

//     mario.draw = function drawMario(context) {
//       sprite.draw(routeFrame(this, runAnim), context, 0,0, (mario.go.heading < 0));
//     };
//     return mario;
//   });
// }
