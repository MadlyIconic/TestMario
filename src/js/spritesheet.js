export default class SpriteSheet {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
    this.animations = new Map();
  }

  defineAmin(name, animation){
    // console.log('anim define:');
    // console.log('Name:',name);
    // console.log('Animaton:', animation);
    // console.log('Tiles: ', this.tiles);
    this.animations.set(name, animation);
    //console.log('------------------------------')
  }

  define(name, x, y, width, height) {
    const buffers = [false, true].map(flip => {
      //console.log("define:",name , flip);
      const buffer = document.createElement("canvas");
      buffer.width = width;
      buffer.height = height;
      let ctx = buffer.getContext("2d");
      if(flip){
        ctx.scale(-1, 1);
        ctx.translate(-width, 0);
      }
      ctx.drawImage(this.image, x, y, width, height, 0, 0, width, height);

      return buffer;
    })

    this.tiles.set(name, buffers);
  }

  defineTile(name, x, y) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  draw(name, context, x, y, flip = false) {
    //console.log('this tiles:', this.tiles);
    const buffer = this.tiles.get(name)[flip?1:0];
    context.drawImage(buffer, x, y);
  }

  drawAnim(name, context, x, y, distance){
    const animation = this.animations.get(name, 10);
    //console.log('animation', name, this.animations);
    let createdAnimation = animation(distance);
    this.drawTile(createdAnimation,context,  x, y);
  }

  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}
