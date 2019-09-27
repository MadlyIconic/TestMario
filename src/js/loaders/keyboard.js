import { setUpKeyboard } from "../input.js";
import { loadJSON } from "./json.js";

export function loadKeyboard(keyboardName, mario){
    let keyboardMappingname = `keyboards/${keyboardName}.json`;
    return loadJSON (keyboardMappingname)
    
    .then((keyboardMappingSpec) => {
      var obj = setUpKeyboard(mario, keyboardMappingSpec);
      return obj;
    }).catch(e => {
      console.log(e);
    });
  }