import Main from "./js/main.js";
window.ref = null;
let main = null;

function reportWindowSize() {
  draw(getContext("2d"), window.innerHeight, window.innerWidth)
}

let getContext = function(name){
  const canvases = $("#screen");
  const context = $(canvases)
    .get(0)
    .getContext(name);

    return context;
}

function draw(ctx, height, width) {
  ctx.canvas.height  = height * 0.6;
  ctx.canvas.width = width * 0.8;
  //...drawing code...
}

window.onresize = reportWindowSize;
$().ready(function() {
  const context = getContext('2d');

  $("#startbutton").on("click", start);
  $("#stopbutton").on("click", cancel);

  
  draw(context, window.innerHeight, window.innerWidth);
  main = new Main(context, $("#screen").get(0));
  //main.loadAll();
});

function cancel() {
  window.cancelAnimationFrame(window.ref);
  window.clearTimeout(window.ref);
}
function start() {
  main.loadAll();
}
