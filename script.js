//////////////////////////////////////////////
// Utility Functions

const randomColor = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

//////////////////////////////////////////////
// Create Canvas 1

const canvas1 = document.getElementById("canvas1");
console.log(canvas1);
canvas1.width = window.innerWidth + window.innerWidth;
canvas1.height = window.innerHeight + window.innerHeight;
canvas1.style.background = "#000";
const ctx = canvas1.getContext("2d");

//////////////////////////////////////////////
// Create Background

let starfield = [];
let density = 5000;
let speed = 1;
let blink = 0.0025;
let maxDepth = 1;
let size = 2;

let centerX = canvas1.width / 2;
let centerY = canvas1.height / 2;

// ctx.beginPath();
// ctx.fillStyle = `#900`;
// ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);

ctx.fill();
ctx.closePath();

class backgroundStar {
  constructor() {
    this.x = Math.random() * canvas1.width;
    this.y = Math.random() * canvas1.height;
    this.z = Math.random() * size;
    this.dim = Math.random();
    this.direction = "up";
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${this.dim})`;
    ctx.arc(this.x, this.y, this.z, 0, Math.PI * 2);
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fill();
    ctx.closePath();
  }

  draw2() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(${randomColor(150, 255)},${randomColor(
      150,
      255
    )},${randomColor(200, 255)},${this.dim})`;
    ctx.arc(this.x, this.y, this.z + 2, 0, Math.PI * 2);
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 2;
    // ctx.shadowOffsetX = 1;
    // ctx.shadowOffsetY = 1;
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.closePath();
  }

  // motion() {
  //   if (this.dim >= 1) this.direction = "down";
  //   if (this.dim <= 0.1) this.direction = "up";

  //   if (this.direction === "up") {
  //     this.dim = this.dim + blink;
  //   } else {
  //     this.dim = this.dim - blink;
  //   }
  // }
}

for (let i = 0; i < density; i++) {
  starfield[i] = new backgroundStar();
  console.log(density / 10);

  i < density / 10 ? starfield[i].draw2() : starfield[i].draw();
}

// function animate() {
//   ctx.fillStyle = "#000";
//   ctx.fillRect(0, 0, canvas1.width, canvas1.height);
//   for (let i = 0; i < density; i++) {
//     starfield[i].draw();
//     starfield[i].motion();
//   }
// }

// function loop() {
//   animate();

//   window.requestAnimationFrame(loop);
// }

// loop();

//////////////////////////////////////////////
// Create Canvas 2

const canvas2 = document.getElementById("canvas2");
console.log(canvas2);
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
canvas2.style.background = "transparent";
const ctx2 = canvas2.getContext("2d");

//////////////////////////////////////////////
// Create Click Event

let clickActive = false;

// let clickT = ["click", "touchstart"];

canvas2.addEventListener("click", (e) => {
  console.log("Bang!");
  clickActive = true;
  console.log(clickActive);
  ctx2.beginPath();
  ctx2.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
  ctx2.fillStyle = `rgba(255,255,255)`;

  ctx2.shadowColor = "#eee";
  ctx2.shadowBlur = 20;
  ctx2.shadowOffsetX = 0;
  ctx2.shadowOffsetY = 0;
  ctx2.fill();

  console.log(e.clientX);
});

// track if click active, increase counter, expand radius, limit radius to percentage of width or height whichever is smaller
