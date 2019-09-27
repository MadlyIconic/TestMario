export function loadJSON(levelname){
    return fetch(levelname).then(r => r.json())
  }