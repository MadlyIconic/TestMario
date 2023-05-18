export function loadJSON(levelname){
    let level = fetch(levelname).then(r => r.json());
    return level;
  }