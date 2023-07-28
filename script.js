//////////////////////////////////////////////
// Utility

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const pythag = (a, b) => Math.sqrt(a ** 2 + b ** 2);

let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;
let centerToCorner = pythag(centerX, centerY);

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

let colorInner = "249, 214, 79";
let colorOuter = "239, 80, 0";

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

let aspect = window.innerWidth < window.innerHeight ? vw : vh;
class ForegroundStar {
  constructor(i) {
    this.star = i;
    this.x = mouseX;
    this.y = mouseY;

    this.location = Math.floor(pythag(this.x, this.y));
    this.starDesignRadius = aspect(6);
    this.gradientSmall = aspect(0.5);
    this.gradientLarge = aspect(6);
    this.circleMin = aspect(3.5);
    this.circleMax = aspect(5);
    this.blurRadius = aspect(6);
    this.opacity1 = 0.3;
    this.opacity2 = 0.1;
    this.circleRadius = `${randomInt(this.circleMin, this.circleMax)}`;
    this.lineLength = this.circleRadius * 3;
    this.lineGrowth = 10;
  }

  draw() {
    const gradient = ctx2.createRadialGradient(
      this.x,
      this.y,
      this.gradientSmall,
      this.x,
      this.y,
      this.gradientLarge
    );

    // cross
    ctx2.save();
    ctx2.beginPath();
    ctx2.translate(this.x, this.y);
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

    ctx2.arc(this.x, this.y, this.circleRadius, 0, Math.PI * 2);
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
let ani;
let lineStretch = 1;
const animate = () => {
  ani = requestAnimationFrame(animate);
  ctx2.save();
  ctx2.beginPath();
  ctx2.translate(mouseX, mouseY);
  ctx2.strokeStyle = `rgba(${colorOuter},1)`;
  ctx2.lineWidth = 1;
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
    lineStretch = lineStretch * 1.1;
  }
};

const animationEnd = () => {
  cancelAnimationFrame(ani);
};

//////////////////////////////////////////////
// Create Click Event

let clickActive = false;

let clickCount = 0;
let mouseX = "";
let mouseY = "";
let maxClicks = 3;
let maxStars = randomInt(maxClicks + 2, maxClicks + 7);

let clickStart = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  lineStretch = 1;

  if (clickCount < maxClicks) {
    constellation.push(new ForegroundStar());
    animate();
  }

  clickActive = true;
};

let clickEnd = (e) => {
  animationEnd();

  // draw the stars chosen by user
  if (clickCount < maxClicks) {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    for (let i = 0; i < clickCount + 1; i++) {
      constellation[i].star = i;
      constellation[i].draw();
    }
  }

  // draw the stars chosen randomly
  if (clickCount === maxClicks) {
    for (let i = maxClicks; i <= maxStars; i++) {
      let plot = () => {
        mouseX = Math.floor(randomInt(0 + vw(15), window.innerWidth - vw(15)));
        mouseY = Math.floor(randomInt(0 + vh(15), window.innerHeight - vh(15)));
        const location = pythag(mouseX, mouseY);

        for (let j = 0; j < constellation.length; j++) {
          // console.log(constellation[j].location);
          if (Math.abs(location - constellation[j].location) < aspect(8)) {
            // console.log("Bonk!");
            // console.log(Math.abs(location - constellation[j].location));
            plot();
          }
        }
      };
      plot();

      constellation.push(new ForegroundStar());
      setTimeout(() => {
        constellation[i].star = i;
        constellation[i].draw();
      }, (i - maxClicks) * 500);

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // create an await function that calls createJoints after the setTimeout
      // loop through the connectors array and create new Connection
    }
  }

  clickCount = clickCount + 1;
  clickActive = false;
};

canvas2.addEventListener("pointerdown", (e) => clickStart(e));
canvas2.addEventListener("pointerup", (e) => clickEnd(e));

// create the lines connecting

class Connection {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw() {
    ctx2.save();
    ctx2.beginPath();
    ctx2.translate(this.x, this.y);
    ctx2.strokeStyle = `rgba(${colorOuter},${this.opacity1})`;
    ctx2.lineWidth = 1;
    ctx2.rotate(`${spin}`);
    ctx2.moveTo(x1, y1);
    ctx2.lineTo(x2, y2);
    ctx2.stroke();
    ctx2.closePath();
    ctx2.restore();
  }
}

let connectors = [];

let createJoints = () => {
  for (let index = 0; index < constellation.length - 1; index++) {
    connectors.push({
      x1: `${constellation[index].x}`,
      y1: `${constellation[index].y}`,
      x2: constellation.at(index + 1).x,
      y2: constellation.at(index + 1).y,
      // x2: `${constellation[`${index + 1}`].x}`,
      // y2: `${constellation[index].y}`,
    });
    console.log(connectors);
  }

  // connectors.push(
  //   new Connection(constellation[index].x, constellation[index].y)
  // );

  // for (let i = index + 1; i < constellation.length; i++) {
  //   connectors.push(
  //     new Connection(
  //       constellation[i].x,
  //       constellation[i].y,
  //       constellation[i - 1].x,
  //       constellation[i - 1].y
  //     )
  //   );
  // }
};

// for (let index = 0; index < connectors.length; index++) {
//   console.log(connectors[index]);
// }
