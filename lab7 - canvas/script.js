'use strict';

const canvas = document.querySelector('#animationContainer');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let animationId;
let mouseForce = 1;

let nParticles;

const start = document.querySelector('.btn-start');
const reset = document.querySelector('.btn-reset');

// move code to separate function
start.addEventListener('click', (e) => {
  nParticles = Number(document.querySelector('#nParticles').value);
  mouse.force = Number(document.querySelector('#force').value);
  mouse.repel = document.querySelector('#repel').checked;
  cancelAnimationFrame(animationId);
  init(nParticles, TEXT, 1);
  animate();
});

reset.addEventListener('click', (e) => {
  nParticles = Number(document.querySelector('#nParticles').value);
  mouse.force = Number(document.querySelector('#force').value);
  mouse.repel = document.querySelector('#repel').checked;
  console.log(mouse.repel);
  cancelAnimationFrame(animationId);
  init(nParticles, TEXT, 1);
  animate();
});

// colors
const TEXT = '#d1d7fd';
const LINE = '#a809a9';
const BACKGROUND = '#d1d7fd';

let particlesArr = [];

// mouse setup
const mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 60) * (canvas.width / 60),
  repel: false,
  force: 1,
};

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// particle
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    // bouncing off walls
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }

    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // collision detectio
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius + this.size) {
      // repel or attract particles to mouse
      if (mouse.repel) {
        this.x -= (dx / distance) * mouse.force;
        this.y -= (dy / distance) * mouse.force;
      } else {
        this.x += (dx / distance) * mouse.force;
        this.y += (dy / distance) * mouse.force;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  }
}

// create particles
const init = (n, color, speed) => {
  particlesArr = [];

  addParticles(n, color, speed);
};

// add particles
const addParticles = (n, color, speed) => {
  for (let i = 0; i < n; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;

    let directionX = Math.random() * speed - speed / 2;
    let directionY = Math.random() * speed - speed / 2;

    particlesArr.push(new Particle(x, y, directionX, directionY, size, color));
  }
};

const animate = () => {
  animationId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArr.length; i++) {
    particlesArr[i].update();
  }
  connect(100, TEXT, 1);
};

const connect = (treshold, color, lineWidth) => {
  let opacity = 1;
  particlesArr.forEach((a) => {
    particlesArr.forEach((b) => {
      let distance = (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);

      if (distance < treshold * treshold) {
        opacity = 1 - distance / treshold / treshold;
        ctx.strokeStyle = `rgba(168, 9, 169, ${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.closePath();
      }
    });
  });
};
window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init(100, TEXT);
});

window.addEventListener('mouseout', () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

// To be fixed
// check if particle was clicked
window.addEventListener('click', (e) => {
  for (let i = 0; i < particlesArr.length; i++) {
    let dx = e.x - particlesArr[i].x;
    let dy = e.y - particlesArr[i].y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < particlesArr[i].size) {
      particlesArr.splice(i, 1);
      addParticles(2, TEXT, 2);
      console.log('clicked');
      break;
    }
  }
});
