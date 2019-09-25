import Keyboard from "./keyboardstate.js";

export function setUpKeyboard(mario){
    
      const input = new Keyboard();

      var jumpAction = function(keyState){
        if (keyState) {
            mario.jump.start(mario);
        } else {
            mario.jump.cancel();
        }
      }

      

      input.addMapping('Space', keyState => jumpAction(keyState));
      input.addMapping('KeyP', keyState => jumpAction(keyState));

      input.addMapping('KeyO', keyState => mario.turbo(keyState));

      input.addMapping('KeyD', keyState => {
        mario.go.dir += keyState ?  1  : -1 ;
      });

      input.addMapping('KeyA', keyState => {
        mario.go.dir += -keyState  ? -1 : 1;
      });

      return input;
}