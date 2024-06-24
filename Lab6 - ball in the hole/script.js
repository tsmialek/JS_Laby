'use strict';

const theme = {
  BACKGROUND: '#020623',
  PRIMARY: '#a809a9',
  SECONDARY: '#a809a9',
  ACCENT: '#f538a3',
  HOLE: 'white',
};

const canvas = document.querySelector('#animationContainer');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');

let mainHole;

const init = () => {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.draw();

  const radius = 30;

  const holeX =
    Math.random() * (canvas.width - radius * 2 - radius * 2) + radius * 2;
  const holeY =
    Math.random() * (canvas.height - radius * 2 - radius * 2) + radius * 2;

  mainHole = new Hole(holeX, holeY);
  mainHole.draw();
};

startButton.addEventListener('click', init);
resetButton.addEventListener('click', init);

let animationId;
let tiltX = 0;
let tiltY = 0;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  color: theme.ACCENT,

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  },

  update() {
    this.x += tiltX / 10;
    this.y += (tiltY - 90) / 10;

    // Checking if the ball inside the canvas
    if (this.x - this.radius < 0) {
      this.x = this.radius;
    } else if (this.x + this.radius > canvas.width) {
      this.x = canvas.width - this.radius;
    }

    if (this.y - this.radius < 0) {
      this.y = this.radius;
    } else if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
    }

    this.draw();
  },
};

class Hole {
  constructor(x, y, radius = 30, color = 'white') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  collision() {
    if (
      ball.x + ball.radius > this.x &&
      ball.x - ball.radius < this.x &&
      ball.y + ball.radius > this.y &&
      ball.y - ball.radius < this.y
    ) {
      console.log('collision detected');
      init();
      animate();
      alert('You won! Play again?');
    }
  }
}

const animate = () => {
  cancelAnimationFrame(animationId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mainHole.draw();
  mainHole.collision();
  ball.update();
  animationId = requestAnimationFrame(animate);
};

const handleOrientation = (e) => {
  tiltX = e.gamma;
  tiltY = e.beta;
};

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ball.update();
});

// request device orientation permission
window.addEventListener('load', async (e) => {
  if (
    typeof DeviceOrientationEvent != 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
    try {
      const permissionState = await DeviceOrientationEvent.requestPermission();
      if (permissionState === 'granted') {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    } catch (error) {
      console.error('Device orientation is not supported', error);
    }
  } else if ('DeviceOrientationEvent' in window) {
    window.addEventListener('deviceorientation', handleOrientation);
  } else {
    console.error('Device orientation is not supported');
  }
});

init();
animate();

// TODO:
// 1. add hole in random spot
// 2. add collision with hole
// 3. reset the ball position when it collides with the hole
// 4. add timer that listen when you start tilting the device
