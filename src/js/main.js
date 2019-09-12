import { loadLevel } from "./loaders.js";
import vector from "./vector.js";
import { createMario } from "./helpers.js";
import Timer from "./timer.js";
import Keyboard from "./keyboardstate.js";
import {createCollisionLayer} from "./layers.js"

export default class main {
  constructor(context, canvas) {
    this.canvas = canvas;
    this.context = context;
    this.pos = new vector(64, 180);
    this.velocity = new vector(170, -500);
  }

  loadAll() {
    Promise.all([
      loadLevel("1-1"),
      createMario(this.pos.x, this.pos.y, this.velocity.x, this.velocity.y)
    ]).then(([level, mario]) => {
      //console.log("level: ", level, " mario:", mario);
      level.comp.layers.push(createCollisionLayer(level));
      level.entities.add(mario);
      let gravity = 2000;
      let context = this.context;

      const SPACE = 32;
      const input = new Keyboard();
      input.addMapping(SPACE, keyState => {
        if (keyState) {
          mario.jump.start(mario);
        } else {
          mario.jump.cancel();
        }
      });
      input.listenTo(window);

      ['mmousedown', 'mousemove'].forEach(eventName => {
        this.canvas.addEventListener(eventName, event => {
          if(event.buttons === 1){
            mario.vel.set(0,0);
            mario.pos.set(event.offsetX,event.offsetY);
          }
        })
      })

      const timer = new Timer(1 / 60);
      timer.update = function update(deltaTime) {
        //console.log("level: ", level);
        
        level.update(deltaTime);
        level.comp.draw(context);
        mario.vel.y += gravity * deltaTime;
      };

      timer.start();
    });
  }
}
