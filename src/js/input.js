import Keyboard from "./keyboardstate.js";

export function setUpKeyboard(entity){
    
      const input = new Keyboard();

      var jumpAction = function(keyState){
        if (keyState) {
            entity.jump.start(entity);
        } else {
            entity.jump.cancel();
        }
      }

      input.addMapping('Space', keyState => jumpAction(keyState));
      input.addMapping('KeyW', keyState => jumpAction(keyState));

      input.addMapping('KeyD', keyState => {
        entity.go.dir += keyState ?  1  : -1 ;
      });

      input.addMapping('KeyA', keyState => {
        entity.go.dir += -keyState  ? -1 : 1;
      });

      return input;
}