'use strict';

const canvas = document.querySelector('#animationContainer');
const ctx = canvas.getContext('2d');

const radius = 10;
const circles = [];
const speed = 2;

class Circle {
  constructor(x, y, vx, vy, radius) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    // update position and detect collision with walls
  }
}

const drawCircles = (n) => {
  for (let i = 0; i < n; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    const vx = (Math.random() - 0.5) * speed;
    const vy = (Math.random() - 0.5) * speed;

    const circle = new Circle(x, y, vx, vy);
    circles.push(circle);
  }
};

window.addEventListener('load', drawCircles(10));
