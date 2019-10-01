import Entity from "../entity.js";
import { loadSpriteSheet } from "../loaders.js";
import Jump from "../traits/Jump.js";
import Go from "../traits/go.js";
import Anim from "../anim.js";

const SLOW_DRAG = 1 / 1000;
const FAST_DRAG = 1 / 5000;

export function loadMario() {
    return loadSpriteSheet('mario')
        .then(createMarioFactory);
}

function createMarioFactory(sprite){
    function setTurboState(turboOn) {
        if (turboOn) {
            this.go.dragFactor = FAST_DRAG;
        } else {
            this.go.dragFactor = SLOW_DRAG;
        }
    }
    let resolveFrame = sprite.animations.get('run');
    
    
    function drawMario(context) {
        //console.log('runAnim:', runAnim);
        const animationCreator = new Anim(8);
        let runAnim = createRunAnimation(sprite.tiles, resolveFrame, animationCreator);
        sprite.draw(animationCreator.routeFrame(this, runAnim), context, 0, 0, (this.go.heading < 0));
    };
    
    return function createMario() {
        const mario = new Entity();
        mario.size.set(16, 16);

        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.go.dragFactor = SLOW_DRAG;
        mario.turbo = setTurboState;

        mario.draw = drawMario;
        return mario;
    }
}

function createRunAnimation(spriteFrames, resolveFrame, animationCreator){
    const frames = [];
    for (const entry of spriteFrames.entries()) {
        frames.push(entry[0])
    };
    

    let runAnim = animationCreator.createAnimation(frames, resolveFrame);

    return runAnim;
}