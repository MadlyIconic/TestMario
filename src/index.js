import Main from "./js/main.js";
window.ref = null;
let main = null;

function reportWindowSize() {
  draw(getContext("2d"), window.innerHeight, window.innerWidth)
}

let getContext = function(contextName){
  const canvases = $("#screen");
  const context = $(canvases)
    .get(0)
    .getContext(contextName);

    return context;
}

function draw(ctx, height, width) {
  ctx.canvas.height  = height * 0.7;
  ctx.canvas.width = width * 0.7;
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
