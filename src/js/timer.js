export default class Timer {
  constructor(deltaTime = 1 / 60) {
    let accumulatedTime = 0;
    let lastTime = 0;

    this.updateProxy = time => {
      accumulatedTime += (time - lastTime) / 1000;

      while (accumulatedTime > deltaTime) {
        this.update(deltaTime);
        accumulatedTime -= deltaTime;
      }
      lastTime = time;

      this.enqueue();
    };
  }

  enqueue() {
    //console.log("this.updateProxy: ", this.updateProxy);
    window.ref = window.requestAnimationFrame(this.updateProxy);
  }
  start() {
    //console.log("timer start");
    this.enqueue();
  }
}
