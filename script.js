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

let colorRandom = randomInt(1, 12);

let hslOuter = `calc((${colorRandom} * 30) + 20), 100%, 50%`;
// let hslOuter = "20, 100%, 46.9%";
let hslInner = `calc((${colorRandom} *30) + 50), 100%, 50%`;
// let hslInner = "48, 93.4%, 64.3%";

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

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
    this.type;
    this.size = 1;
    this.x = Math.random() * canvas1.width;
    this.y = Math.random() * canvas1.height;
    this.radius = Math.random() + this.size;
    this.dim = randomInt(0.5, 1);
    this.special = `rgb(${randomInt(150, 255)},${randomInt(
      150,
      200
    )},${randomInt(200, 255)}`;
  }

  // White Stars
  draw(type) {
    this.type = type;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.dim})`;
    ctx.fill();
    ctx.closePath();
  }

  // Rare Stars
  draw2(type) {
    this.type = type;
    // star shadow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius + 3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fill();
    ctx.closePath();

    // star body
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius + 1, 0, Math.PI * 2);
    ctx.fillStyle = this.special;
    ctx.fill();
    ctx.closePath();
  }
}

// Populate Starfield
for (let i = 0; i < density; i++) {
  starfield[i] = new BackgroundStar();
  i < density / 33 ? starfield[i].draw2("rare") : starfield[i].draw("white");
}

let starCounter = 0;

//////////////////////////////////////////////
// Create Canvas 2 - interactive

const canvas2 = document.getElementById("canvas2");
// console.log(canvas2);
canvas2.width = window.innerWidth - 10;
canvas2.height = window.innerHeight - 10;
canvas2.style.background = "transparent";
const ctx2 = canvas2.getContext("2d");

let aspect = window.innerWidth < window.innerHeight ? vw : vh; // select vw or vh, whichever is smaller

class ForegroundStar {
  constructor(i, x = mouseX, y = mouseY) {
    this.star = i;
    this.x = x;
    this.y = y;
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
    ctx2.strokeStyle = `hsl(${hslOuter},${this.opacity1})`;
    // ctx2.strokeStyle = `rgba(${colorOuter},${this.opacity1})`;
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
    ctx2.fillStyle = `hsla(${hslInner}, 0.5)`;

    // ctx2.fillStyle = `rgba(${colorInner},0.5)`;
    ctx2.strokeStyle = `hsl(${hslOuter}, 0.1)`;
    // ctx2.strokeStyle = `rgba(${colorOuter},0.1)`;
    ctx2.lineWidth = 1;
    ctx2.moveTo(0 - this.starDesignRadius, 0); // Start right
    ctx2.quadraticCurveTo(0, 0, 0, 0 - this.starDesignRadius); // To top
    ctx2.quadraticCurveTo(0, 0, 0 + this.starDesignRadius, 0); // To left
    ctx2.quadraticCurveTo(0, 0, 0, 0 + this.starDesignRadius); // To bottom
    ctx2.quadraticCurveTo(0, 0, 0 - this.starDesignRadius, 0); // To right

    // ctx2.font = "30px Arial";
    // ctx2.fillText(`${starCounter}`, 10, 50);

    ctx2.stroke();
    ctx2.fill();
    ctx2.closePath();
    ctx2.restore();

    // circle
    ctx2.save();
    ctx2.beginPath();

    gradient.addColorStop(0, `hsl(${hslInner}, 1)`);
    // gradient.addColorStop(0, `rgba(${colorInner}, 1)`);
    gradient.addColorStop(1, `hsl(${hslOuter}, 0)`);
    // gradient.addColorStop(1, `rgba(${colorOuter}, 0)`);

    ctx2.fillStyle = gradient;

    ctx2.strokeStyle = `hsl(${hslOuter}, 0.1)`;
    // ctx2.strokeStyle = `rgba(${colorOuter}, 0.1)`;
    ctx2.lineWidth = 5;

    ctx2.arc(this.x, this.y, this.circleRadius, 0, Math.PI * 2);
    ctx2.shadowColor = `hsl(${hslOuter}, 1)`;
    // ctx2.shadowColor = `rgba(${colorOuter}, 1)`;
    ctx2.shadowBlur = this.blurRadius;
    ctx2.shadowOffsetX = 0;
    ctx2.shadowOffsetY = 0;

    ctx2.stroke();
    ctx2.fill();
    ctx2.closePath();
    ctx2.restore();

    // // testing
    // ctx2.save();
    // ctx2.beginPath();
    // ctx2.strokeStyle = "#fff";
    // ctx2.lineWidth = 5;

    // ctx2.arc(this.x, this.y, aspect(15), 0, Math.PI * 2);
    // ctx2.stroke();
    // ctx2.closePath();
    // ctx2.restore();
    // // end testing
  }
}

// BUG: Fix overlap on initial long press

//////////////////////////////////////////////
// Long Click Animation
let ani;
let lineStretch = aspect(1);
let rotationEffect = 0;
const animate = () => {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  for (let index = 0; index < constellation.length; index++) {
    const element = constellation[index];
    element?.draw();
  }

  // ctx2.fillStyle = `rgba(${colorInner},0.1)`;
  ctx2.save();
  ctx2.beginPath();
  ctx2.strokeStyle = `hsl(${hslInner},0.9)`;
  // ctx2.strokeStyle = `rgba(${colorInner},0.9)`;
  ctx2.translate(mouseX, mouseY);
  ctx2.lineWidth = 4;
  ctx2.rotate(spin + rotationEffect);

  ctx2.moveTo(50, 0);
  ctx2.lineTo(50 + lineStretch, 0); // right
  ctx2.moveTo(-50, 0);
  ctx2.lineTo(-50 - lineStretch, 0); // left
  ctx2.moveTo(0, 50);
  ctx2.lineTo(0, 50 + lineStretch); // up
  ctx2.moveTo(0, -50);
  ctx2.lineTo(0, -50 - lineStretch); //down

  ctx2.moveTo(10, -10);
  ctx2.lineTo(10 + lineStretch, -10 - lineStretch); // top right
  ctx2.moveTo(-10, -10);
  ctx2.lineTo(-10 - lineStretch, -10 - lineStretch); // top left
  ctx2.moveTo(10, 10);
  ctx2.lineTo(10 + lineStretch, 10 + lineStretch); //bottom right
  ctx2.moveTo(-10, 10);
  ctx2.lineTo(-10 - lineStretch, 10 + lineStretch); //bottom left

  // ctx2.fill();
  ctx2.stroke();
  ctx2.closePath();
  ctx2.restore();
  rotationEffect += 0.07;
  if (
    lineStretch <
    (canvas2.width > canvas2.height ? canvas2.width / 16 : canvas2.height / 16)
  ) {
    lineStretch = lineStretch * 1.4;
  }
  ani = requestAnimationFrame(animate);
};

const animationEnd = () => {
  cancelAnimationFrame(ani);
};

//////////////////////////////////////////////
// Create Click Event

let clickActive = false;

let mouseX = "";
let mouseY = "";
let clickCount = 0;
let maxClicks = 3;
let starNumber = 0;
let maxStars = 9;
let clickFull = false;
// randomInt(maxClicks + 2, maxClicks + 7);

let clickStart = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  lineStretch = 1;

  if (clickCount < maxClicks) {
    // constellation.push(new ForegroundStar());
    animate();
  }

  if (clickCount === 3) clickFull = true;

  clickActive = true;
};

// BUG:
// if they are within spaceBetween of each other remove first one

let clickEnd = (e) => {
  animationEnd();

  let iFault = 0;
  let jFault = 0;

  // draw the stars chosen by user
  if (clickCount < maxClicks) {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    constellation.push(new ForegroundStar());

    for (let i = 0; i < clickCount + 1; i++) {
      constellation[i].star = i;
      constellation[i].draw();
    }
    clickCount += 1;
    starNumber += 1;
  }

  // if (clickCount > maxClicks && starNumber < maxStars) {
  if (clickFull && starNumber < maxStars) {
    // draw the stars chosen randomly

    const spaceBetweenStars = aspect(15);
    console.log(spaceBetweenStars);
    console.log(maxClicks, maxStars);

    for (let i = maxClicks; i < maxStars; i++) {
      console.log("begin loop", { i });
      // for (let i = maxClicks; i < maxStars; i++) {
      iFault += 1;
      if (iFault > 150) {
        console.log("break! i", iFault);
        break;
      }
      let w = window.innerWidth > window.innerHeight ? 3 : 10;
      let h = window.innerHeight < window.innerWidth ? 8 : 4;

      randomX = Math.floor(randomInt(0 + vw(w), window.innerWidth - vw(w)));
      randomY = Math.floor(randomInt(0 + vh(h), window.innerHeight - vh(h)));
      constellation.push(
        new ForegroundStar(constellation.length, randomX, randomY)
      );

      console.log(constellation);

      for (let j = 0; j < constellation.length; j++) {
        jFault += 1;
        if (jFault > 150) {
          console.log("break! j", jFault);
          break;
        }
        // console.log("fault j", fault);

        let x1 = constellation[j].x;
        let y1 = constellation[j].y;
        let x2 = constellation[i].x;
        let y2 = constellation[i].y;

        if (j !== i) {
          console.log("current star", x1, y1, "star", constellation[j].star);
          console.log("previous star", x2, y2, "star", constellation[i].star);
          console.log(
            "distance",
            distance(x1, y1, x2, y2),
            "spaceBetween",
            spaceBetweenStars
          );
          console.log();

          if (distance(x1, y1, x2, y2) < spaceBetweenStars) {
            console.log("too close", x1, y1, constellation[j]);
            console.log("too close", x2, y2, constellation[i]);
            console.log(distance(x1, y1, x2, y2), spaceBetweenStars);
            console.log();

            console.log({ i });
            constellation.pop();

            i--;
            console.log({ i });
          }
        }
      }

      starNumber += 1;
    }
    constellation.forEach((star, i) => {
      setTimeout(() => {
        starCounter += 1;
        if (i >= maxClicks) star.draw();
      }, (i - 3) * 500);
    });
  }

  clickActive = false;
  // pathfinder(); // initiate pathfinder to display the min distance between points
};

canvas2.addEventListener("pointerdown", (e) => clickStart(e));
canvas2.addEventListener("pointerup", (e) => clickEnd(e));
canvas2.addEventListener("pointermove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

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
    ctx2.strokeStyle = `hsl(${hslOuter},${this.opacity1})`;
    // ctx2.strokeStyle = `rgba(${colorOuter},${this.opacity1})`;
    ctx2.lineWidth = 1;
    ctx2.rotate(`${spin}`);
    ctx2.moveTo(x1, y1);
    ctx2.lineTo(x2, y2);
    ctx2.stroke();
    ctx2.closePath();
    ctx2.restore();
  }
}

// const pathfinder = () => {
//   let pathfinderRadius = aspect(5);

//   ctx2.save();
//   ctx2.beginPath();
//   ctx2.fillStyle = "#ff8833";
//   // ctx2.rect(0, 0, 100, 100);
//   ctx2.arc(centerX, centerY, pathfinderRadius, 0, Math.PI * 2);
//   ctx2.fill();
//   ctx2.closePath();
//   ctx2.restore();
// };

// TODO: create fade in for new stars, collision detection for manually placed stars
