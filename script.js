//////////////////////////////////////////////
// Utility

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;
let centerToCorner = Math.floor(
  Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2))
);
let starfield = [];
let constellation = [];
let size = 1;
let spin = randomInt(0, 3.14);
let density =
  window.innerWidth < window.innerHeight
    ? window.innerWidth
    : window.innerHeight;
console.log(
  "Inner Width",
  window.innerWidth,
  "Inner Height",
  window.innerHeight
);
console.log("Density", density);

const vw = (percent) => (percent * window.innerWidth) / 100;
const vh = (percent) => (percent * window.innerHeight) / 100;

// Find Center
// ctx.beginPath();
// ctx.fillStyle = `#700`;
// ctx.arc(centerToCorner, centerToCorner, 10, 0, Math.PI * 2);
// ctx.fill();
// ctx.closePath();

//////////////////////////////////////////////
// Create Canvas 1

const canvas1 = document.getElementById("canvas1");
canvas1.width = centerToCorner * 2;
canvas1.height = centerToCorner * 2;
canvas1.style.background = "#000";
const ctx = canvas1.getContext("2d");

//////////////////////////////////////////////
// Create Background
class BackgroundStar {
  constructor() {
    this.x = Math.random() * canvas1.width;
    this.y = Math.random() * canvas1.height;
    this.z = Math.random() + size;
    this.dim = randomInt(0.5, 1);
    // this.direction = "up";
    this.special = `rgb(${randomInt(150, 255)},${randomInt(
      150,
      200
    )},${randomInt(200, 255)}`;
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
}

// Populate Starfield
for (let i = 0; i < density; i++) {
  starfield[i] = new BackgroundStar();
  // console.log(density / 30);
  i < density / 33 ? starfield[i].draw2() : starfield[i].draw();
}

// console.log(starfield);

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
// Create Canvas 2 - interactive

const canvas2 = document.getElementById("canvas2");
// console.log(canvas2);
canvas2.width = window.innerWidth - 10;
canvas2.height = window.innerHeight - 10;
canvas2.style.background = "transparent";
const ctx2 = canvas2.getContext("2d");

//////////////////////////////////////////////
// Create Click Event

let clickActive = false;

let clickCount = 0;
let mouseX = "";
let mouseY = "";
let maxClicks = 3;
canvas2.addEventListener("click", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  clickActive = true;
  if (constellation.length < maxClicks) {
    constellation.push(new ForegroundStar());
    // console.log(constellation, count, `${count}`);
    constellation[clickCount].draw();
    clickCount = clickCount + 1;
  } else if (clickCount == 3) {
    for (let i = 3; i < 8; i++) {
      console.log(i);
      console.log(constellation);
      mouseX = Math.floor(randomInt(0 + vw(10), window.innerWidth - vw(10)));
      console.log(mouseX);
      mouseY = randomInt(0 + vh(10), window.innerHeight - vh(10));
      constellation.push(new ForegroundStar());
      constellation[i].draw();
    }
    clickCount = clickCount + 1;
    // canvas2.classList.add("spin");
    // for (let i = 0; i < density; i++) {}
  }
});

// track if click active, increase counter, expand radius, limit radius to percentage of width or height whichever is smaller

// pick your own points to start and then create animation

class ForegroundStar {
  constructor() {
    // this.lineLength = 75;
    // this.starDesignRadius = 50;
    // this.gradientSmall = 15;
    // this.gradientLarge = 30;
    // this.circleMin = 25;
    // this.circleMax = 40;
    // this.blurRadius = 50;

    if (window.innerWidth < window.innerHeight) {
      this.lineLength = vw(7);
      this.starDesignRadius = vw(6);
      this.gradientSmall = vw(0.5);
      this.gradientLarge = vw(6);
      this.circleMin = vw(2.5);
      this.circleMax = vw(5);
      this.blurRadius = vw(6);
    }

    if (window.innerWidth > window.innerHeight) {
      this.lineLength = vh(7);
      this.starDesignRadius = vh(6);
      this.gradientSmall = vh(0.5);
      this.gradientLarge = vh(6);
      this.circleMin = vh(2.5);
      this.circleMax = vh(5);
      this.blurRadius = vh(6);
    }
  }

  draw() {
    // cross
    ctx2.save();
    ctx2.beginPath();
    ctx2.translate(mouseX, mouseY);
    ctx2.fillStyle = "rgba(255,255,255,0.3)";
    ctx2.strokeStyle = "#fff";
    ctx2.strokeStyle = "rgba(255,255,255,0.1)";
    ctx2.lineWidth = 4;
    ctx2.rotate(`${spin}`);
    ctx2.moveTo(0 - this.lineLength, 0);
    ctx2.lineTo(0 + this.lineLength, 0);
    ctx2.moveTo(0, 0 - this.lineLength);
    ctx2.lineTo(0, 0 + this.lineLength);
    ctx2.stroke();
    ctx2.fill();
    ctx2.closePath();
    // ctx2.restore();

    // starDesign
    ctx2.beginPath();
    ctx2.fillStyle = "rgba(255,255,255,0.3)";
    ctx2.strokeStyle = "rgba(255,255,255,0.1)";
    ctx2.lineWidth = 1;
    ctx2.moveTo(0 - this.starDesignRadius, 0); // Start right
    ctx2.quadraticCurveTo(0, 0, 0, 0 - this.starDesignRadius); // To top
    ctx2.quadraticCurveTo(0, 0, 0 + this.starDesignRadius, 0); // To left
    ctx2.quadraticCurveTo(0, 0, 0, 0 + this.starDesignRadius); // To bottom
    ctx2.quadraticCurveTo(0, 0, 0 - this.starDesignRadius, 0); // To right
    ctx2.stroke();
    ctx2.fill();
    ctx2.closePath();
    ctx2.restore();

    // circle
    ctx2.save();
    ctx2.beginPath();

    const gradient = ctx2.createRadialGradient(
      mouseX,
      mouseY,
      this.gradientSmall,
      mouseX,
      mouseY,
      this.gradientLarge
    );

    gradient.addColorStop(0, "#fff");
    gradient.addColorStop(1, "rgba(255,255,255, 0");

    // ctx2.fillStyle = `rgba(238,238,238, 1)`;
    ctx2.fillStyle = gradient;

    ctx2.strokeStyle = `rgba(255,255,255, 0.1)`;
    ctx2.lineWidth = 5;

    // ctx2.arc(mouseX, mouseY, `${randomInt(18, 30)}`, 0, Math.PI * 2);
    ctx2.arc(
      mouseX,
      mouseY,
      `${randomInt(this.circleMin, this.circleMax)}`,
      0,
      Math.PI * 2
    );
    ctx2.shadowColor = "#eee";
    ctx2.shadowBlur = this.blurRadius;
    ctx2.shadowOffsetX = 0;
    ctx2.shadowOffsetY = 0;

    ctx2.stroke();
    ctx2.fill();
    ctx2.closePath();
    ctx2.restore();
  }
}

console.log(vw(3));
