//////////////////////////////////////////////
// Utility Functions

const randomColor = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;
let centerToCorner = Math.floor(
  Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2))
);
// console.log(centerToCorner);

//////////////////////////////////////////////
// Create Canvas 1

const canvas1 = document.getElementById("canvas1");
// console.log(canvas1);
canvas1.width = centerToCorner * 2;
canvas1.height = centerToCorner * 2;
canvas1.style.background = "#000";
const ctx = canvas1.getContext("2d");

//////////////////////////////////////////////
// Create Background

let starfield = [];
let density = 500;
let speed = 1;
let blink = 0.0025;
let maxDepth = 1;
let size = 1;

// console.log(centerX, centerY);

// console.log(
// "centerToCorner",
// Math.floor(Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2)))
// );

// Find Center
// ctx.beginPath();
// ctx.fillStyle = `#700`;
// ctx.arc(centerToCorner, centerToCorner, 10, 0, Math.PI * 2);
// ctx.fill();
// ctx.closePath();

class backgroundStar {
  constructor() {
    this.x = Math.random() * canvas1.width;
    this.y = Math.random() * canvas1.height;
    this.z = Math.random() + size;
    this.dim = randomColor(0.5, 1);
    this.direction = "up";
    this.special = `rgb(${randomColor(150, 255)},${randomColor(
      150,
      200
    )},${randomColor(200, 255)}`;
  }

  // White Stars
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${this.dim})`;
    ctx.arc(this.x, this.y, this.z, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  // Rare Stars
  draw2() {
    // star shadow
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.arc(this.x, this.y, this.z + 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // star body

    ctx.beginPath();

    ctx.fillStyle = this.special;
    ctx.arc(this.x, this.y, this.z + 2, 0, Math.PI * 2);

    ctx.fill();
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
  // console.log(density / 30);
  i < density / 30 ? starfield[i].draw2() : starfield[i].draw();
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
// console.log(canvas2);
canvas2.width = window.innerWidth - 10;
canvas2.height = window.innerHeight - 10;
canvas2.style.background = "transparent";
const ctx2 = canvas2.getContext("2d");

//////////////////////////////////////////////
// Create Click Event

let clickActive = false;

// let clickT = ["click", "touchstart"];

canvas2.addEventListener("click", (e) => {
  clickActive = true;

  ctx2.beginPath();
  ctx2.fillStyle = `rgba(255,255,255)`;
  ctx2.arc(e.clientX, e.clientY, 25, 0, Math.PI * 2);
  ctx2.shadowColor = "#eee";
  ctx2.shadowBlur = 50;
  ctx2.shadowOffsetX = 0;
  ctx2.shadowOffsetY = 0;
  ctx2.fill();
  ctx2.closePath();

  console.log(e.clientX);
});

// track if click active, increase counter, expand radius, limit radius to percentage of width or height whichever is smaller

// pick your own points to start and then create animation
