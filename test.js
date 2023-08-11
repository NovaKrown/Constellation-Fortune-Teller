// const canvas3 = document.getElementById("canvas3");
// canvas3.width = innerWidth;
// canvas3.height = innerHeight;
// const ctx3 = canvas3.getContext("2d");

// function distance(x1, y1, x2, y2) {
//   const xDist = x2 - x1;
//   const yDist = y2 - y1;

//   return Math.abs(Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2)));
// }

// class Particle {
//   constructor(x, y, radius, color) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.color = color;
//   }

//   update() {
//     this.draw();
//   }

//   draw() {
//     ctx3.save();
//     ctx3.beginPath();
//     ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     ctx3.fillStyle = this.color;
//     ctx3.fill();
//     ctx3.closePath();
//     ctx3.restore();
//   }
// }

// let particles;

// function init() {
//   particles = [];

//   for (let index = 0; index < 40; index++) {
//     const x = Math.random() * innerWidth;
//     const y = Math.random() * innerHeight;
//     const radius = 10;
//     const color = "blue";
//     particles.push(new Particle(x, y, radius, color));
//   }
// }

// function animations() {
//   requestAnimationFrame(animations);
//   ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
//   particles.forEach((particle) => {
//     particle.update();
//   });
// }

// init();
// animations();

// // array
// let array = [];
// // populate array
// for (let index = 0; index < 7; index++) {
//   array.push(index);
// }
// let counter = 0; // starts at 0 and will increment on every user click
// let counterMax = 3; // the maximum number of clicks before beginning the auto phase
// let items = array.length;
// let itemsMax = 7;
// counter++;
// counter++;
// counter++;

// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
//   console.log("outer", index, element);

//   for (let j = 0; j < array.length; j++) {
//     console.log("inner", j);
//   }
// }

// console.log("counter", counter);
// console.log("counterMax", counterMax);
// console.log("items", items);
