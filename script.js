//////////////////////////////////////////////
// Create Canvas 1

const canvas1 = document.getElementById("canvas1");
console.log(canvas1);
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;
canvas1.style.background = "#000";
const ctx = canvas1.getContext("2d");

//////////////////////////////////////////////
// Create Background

let starfield = [];
let density = 50;
let speed = 1;
let blink = 0.0025;
let maxDepth = 1;
// let size = 0.3;
let size = 1;

// let centerX = canvas1.width / 2;
// let centerY = canvas1.height / 2;

class backgroundStar {
  constructor() {
    this.x = Math.random() * canvas1.width;
    this.y = Math.random() * canvas1.height;
    this.z = Math.random() + size;
    this.pulse = Math.random();
    this.direction = "up";
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${this.pulse})`;
    ctx.arc(this.x, this.y, this.z, 0, Math.PI * 2);
    ctx.fill();
  }

  motion() {
    if (this.pulse >= 1) this.direction = "down";
    if (this.pulse <= 0.1) this.direction = "up";

    if (this.direction === "up") {
      this.pulse = this.pulse + blink;
    } else {
      this.pulse = this.pulse - blink;
    }
  }
}

for (let i = 0; i < density; i++) {
  starfield[i] = new backgroundStar();
}

function animate() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas1.width, canvas1.height);
  for (let i = 0; i < density; i++) {
    starfield[i].draw();
    starfield[i].motion();
  }
}

function loop() {
  animate();

  window.requestAnimationFrame(loop);
}

loop();

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
  ctx2.fillStyle = `rgba(255,255,255)`;
  ctx2.arc(e.clientX, e.clientY, 20, 0, Math.PI * 2);
  ctx2.fill();
  // ctx.style.z-index = "10";
  console.log(e.clientX);
});
