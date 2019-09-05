export default class trait {
  constructor(name) {
    this.NAME = name;
  }

  update() {
    console.warn("Unhandled update call");
  }
}
