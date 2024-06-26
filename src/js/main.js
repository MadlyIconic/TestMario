import { loadKeyboard } from "./loaders/keyboard.js";
import vector from "./vector.js";
import { loadMario } from "./entities/mario.js";
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
    console.log("Loading 1-1");
    Promise.all([
      loadLevel("1-1"),
      loadMario()
    ]).then(([level, createMario]) => {
      const camera = new Camera();
      window.camera = camera;
      this.marioStartPos = level.startpoint;
      const mario = createMario();
      let marioX = this.marioStartPos.x;
      let marioY = this.marioStartPos.y;
      mario.pos.set(marioX, marioY);

      mario.addTrait({
        NAME: "hacktrait",
        spawnTimeout: 0,
        obstruct(){
           //console.log('hacktrait obstruct');
        },
        update(mario, deltaTime){
          //console.log('spawn:', this.spawnTimeout);
          if(this.spawnTimeout > 0.1 && mario.vel.y < 0){
            this.spawnTimeout = 0;
          }
          this.spawnTimeout += deltaTime;
        }
      })

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
