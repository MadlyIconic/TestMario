import Main from "./js/main.js";
window.ref = null;
let main = null;
$().ready(function() {
  const canvases = $("#screen");
  const context = $(canvases)
    .get(0)
    .getContext("2d");

  $("#startbutton").on("click", start);
  $("#stopbutton").on("click", cancel);

  main = new Main(context, canvases.get(0));
  console.log("ready!");
  main = new Main(context);
  console.log("im ready!");
  //main.loadAll();
});

function cancel() {
  window.cancelAnimationFrame(window.ref);
  window.clearTimeout(window.ref);
}
function start() {
  main.loadAll();
}
