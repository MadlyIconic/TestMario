import Keyboard from "./keyboardstate.js";
import { loadKeyboard } from "./loaders.js";

export function setUpKeyboard(mario, keyboardMappingSpec){
    
      const input = new Keyboard();

      setUpJump(input, mario, keyboardMappingSpec.Jump);
      setUpRun(input, mario, keyboardMappingSpec.Turbo);
      setUpLeft(input, mario, keyboardMappingSpec.Left);
      setUpRight(input, mario, keyboardMappingSpec.Right);

      return input;
}

var jumpAction = function(keyState, entity){
  if (keyState) {
      entity.jump.start(entity);
  } else {
      entity.jump.cancel();
  }
}

function setUpRun(input, entity, KeyName){
  input.addMapping(KeyName, keyState => entity.turbo(keyState));
}

function setUpJump(input, entity, KeyName){
  input.addMapping(KeyName, keyState => jumpAction(keyState, entity));
}

function setUpLeft(input, entity, KeyName){
  input.addMapping(KeyName, keyState => {entity.go.dir += -keyState  ? -1 : 1;});
}

function setUpRight(input, entity, KeyName){
  input.addMapping(KeyName, keyState => {entity.go.dir += keyState ?  1  : -1 ;});
}