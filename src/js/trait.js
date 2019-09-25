export default class trait {
  constructor(name) {
    this.NAME = name;
  }

  obstruct(){
    //Empty - not required to implement for each trait
  }

  update() {
    console.warn("Unhandled update call");
  }
}
