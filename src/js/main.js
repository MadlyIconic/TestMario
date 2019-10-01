import { loadKeyboard } from "./loaders/keyboard.js";
import vector from "./vector.js";
import { createMario } from "./helpers.js";
import Timer from "./timer.js";
import Camera from "./camera.js";
import { setUpMouseControl } from "./debug.js";
import { loadLevel } from "./loaders/level.js";

export default class main {
  constructor(context, canvas) {
    this.canvas = canvas;
    this.context = context;
    this.marioStartPos = new vector(42, 190);
  }

  loadAll() {
    Promise.all([
      loadLevel("1-1"),
      createMario()
    ]).then(([level, mario]) => {
      const camera = new Camera();
      window.camera = camera;
      this.marioStartPos = level.startpoint;
      mario.pos.set(this.marioStartPos.x, this.marioStartPos.y);
      level.entities.add(mario);
      let gravity = level.gravity;
      let context = this.context;

      let input = null;
      loadKeyboard("myKeyboard", mario).then(obj => {
        input = obj;
        input.listenTo(window);
      });
      
      setUpMouseControl(this.canvas, mario, camera);
      
      const timer = new Timer(1 / 60);
      timer.update = function update(deltaTime) {  
        level.update(deltaTime);
        if(mario.pos.x  > 200){
          camera.pos.x = mario.pos.x - 200;
        }
        level.comp.draw(context, camera);
        mario.vel.y += gravity * deltaTime;
      };

      timer.start();
    });
  }
}
