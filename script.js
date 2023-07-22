// import utility from utility.js;

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

// let colorA = "255,255,255";
let colorInner = "249, 214, 79";
let colorOuter = "239, 80, 0";

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

//////////////////////////////////////////////
// Create Canvas 2 - interactive

const canvas2 = document.getElementById("canvas2");
// console.log(canvas2);
canvas2.width = window.innerWidth - 10;
canvas2.height = window.innerHeight - 10;
canvas2.style.background = "transparent";
const ctx2 = canvas2.getContext("2d");

// track if click active, increase counter, expand radius, limit radius to percentage of width or height whichever is smaller

class ForegroundStar {
  constructor(x = mouseX, y = mouseY) {
    if (window.innerWidth < window.innerHeight) {
      this.starDesignRadius = vw(6);
      this.gradientSmall = vw(0.5);
      this.gradientLarge = vw(6);
      this.circleMin = vw(3.5);
      this.circleMax = vw(5);
      this.blurRadius = vw(6);
      this.opacity1 = 0.3;
      this.opacity2 = 0.1;
      this.circleRadius = `${randomInt(this.circleMin, this.circleMax)}`;
      this.lineLength = this.circleRadius * 3;
      this.lineGrowth = 0;
    }

    if (window.innerWidth > window.innerHeight) {
      this.starDesignRadius = vh(6);
      this.gradientSmall = vh(0.5);
      this.gradientLarge = vh(6);
      this.circleMin = vh(3.5);
      this.circleMax = vh(5);
      this.blurRadius = vh(6);
      this.opacity1 = 0.3;
      this.opacity2 = 0.1;
      this.circleRadius = `${randomInt(this.circleMin, this.circleMax)}`;
      this.lineLength = this.circleRadius * 3;
      this.lineGrowth = 100;
    }
  }

  draw() {
    const gradient = ctx2.createRadialGradient(
      mouseX,
      mouseY,
      this.gradientSmall,
      mouseX,
      mouseY,
      this.gradientLarge
    );

    // cross
    ctx2.save();
    ctx2.beginPath();
    ctx2.translate(mouseX, mouseY);
    ctx2.strokeStyle = `rgba(${colorOuter},${this.opacity1})`;
    ctx2.lineWidth = 1;
    ctx2.rotate(`${spin}`);
    ctx2.moveTo(0 - this.lineLength, 0);
    ctx2.lineTo(0 + this.lineLength, 0);
    ctx2.moveTo(0, 0 - this.lineLength);
    ctx2.lineTo(0, 0 + this.lineLength);
    ctx2.stroke();
    ctx2.closePath();

    // starDesign
    ctx2.beginPath();
    ctx2.fillStyle = `rgba(${colorInner},0.5)`;
    ctx2.strokeStyle = `rgba(${colorOuter},0.1)`;
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

    gradient.addColorStop(0, `rgba(${colorInner}, 1)`);
    gradient.addColorStop(1, `rgba(${colorOuter}, 0)`);

    ctx2.fillStyle = gradient;

    ctx2.strokeStyle = `rgba(${colorOuter}, 0.1)`;
    ctx2.lineWidth = 5;

    ctx2.arc(mouseX, mouseY, this.circleRadius, 0, Math.PI * 2);
    ctx2.shadowColor = `rgba(${colorOuter}, 1)`;
    ctx2.shadowBlur = this.blurRadius;
    ctx2.shadowOffsetX = 0;
    ctx2.shadowOffsetY = 0;

    ctx2.stroke();
    ctx2.fill();
    ctx2.closePath();
    ctx2.restore();
  }
}

//////////////////////////////////////////////
// Long Click Animation

let lineStretch = 1;
const animate = () => {
  ani = requestAnimationFrame(animate);
  // console.log("animating...");
  // console.log(lineStretch);
  ctx2.save();
  ctx2.beginPath();
  ctx2.translate(mouseX, mouseY);
  ctx2.strokeStyle = `rgba(${colorOuter},1)`;
  ctx2.lineWidth = 0.1;
  ctx2.rotate(`${spin}`);
  ctx2.moveTo(0, 0);
  ctx2.lineTo(10 + lineStretch, 0);
  ctx2.moveTo(0, 0);
  ctx2.lineTo(-10 - lineStretch, 0);
  ctx2.moveTo(0, 0);
  ctx2.lineTo(0, 10 + lineStretch);
  ctx2.moveTo(0, 0);
  ctx2.lineTo(0, -10 - lineStretch);
  ctx2.stroke();
  ctx2.closePath();
  ctx2.restore();

  if (
    lineStretch <
    (canvas2.width > canvas1.height ? canvas1.width : canvas1.height)
  ) {
    lineStretch = lineStretch * 1.3;
  }
};

const animationEnd = () => {
  cancelAnimationFrame(ani);
  // console.log("clear");
  // ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
};

//////////////////////////////////////////////
// Create Click Event

let clickActive = false;

let clickCount = 0;
let mouseX = "";
let mouseY = "";
let maxClicks = 3;
let maxStars = randomInt(maxClicks + 2, maxClicks + 10);

let storeClicks = {};

let clickStart = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  lineStretch = 1;

  // console.log("clickCount", clickCount);

  if (clickCount < maxClicks) {
    constellation.push(new ForegroundStar());
    animate();
    storeClicks[`mouseX${clickCount}`] = e.clientX;
    storeClicks[`mouseY${clickCount}`] = e.clientY;
  }

  clickActive = true;
};

let clickEnd = (e) => {
  animationEnd();

  // draw the stars chosen by user
  if (clickCount < maxClicks) {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    for (let i = 0; i < clickCount + 1; i++) {
      mouseX = storeClicks[`mouseX${i}`];
      mouseY = storeClicks[`mouseY${i}`];
      constellation[i].draw();
    }
  }

  // draw the stars chosen randomly
  if (clickCount === maxClicks) {
    for (let i = maxClicks; i < maxStars; i++) {
      setTimeout(() => {
        mouseX = Math.floor(randomInt(0 + vw(15), window.innerWidth - vw(15)));
        mouseY = randomInt(0 + vh(15), window.innerHeight - vh(15));
        constellation.push(new ForegroundStar());
        constellation[i].draw();
        // console.log(i);
        storeClicks[`mouseX${i}`] = e.clientX;
        storeClicks[`mouseY${i}`] = e.clientY;
        // console.log(storeClicks);
      }, (i - maxClicks) * 500);
    }
  }

  clickCount = clickCount + 1;
  clickActive = false;
};

canvas2.addEventListener("mousedown", (e) => clickStart(e));
canvas2.addEventListener("touchstart", (e) => clickStart(e));
canvas2.addEventListener("mouseup", (e) => clickEnd(e));
canvas2.addEventListener("touchend", (e) => clickEnd(e));
