const canvas = document.getElementById("canvas");
console.log(canvas);
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

function init() {
  console.log("Bork!");
}
