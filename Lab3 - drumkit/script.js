'use strict';

const soundObject = {
  a: document.querySelector('#boom'),
};

const recordBtn = document.querySelector('.record');
const stopBtn = document.querySelector('.stop');
const playBtn = document.querySelector('.play');
const sound = soundObject.a;
let isRecording = false;
let startTime;
const soundArr = [];

const toggleRecording = () => {
  recordBtn.classList.toggle('hidden');
  stopBtn.classList.toggle('hidden');
  isRecording = !isRecording;
  startTime = Date.now();
  console.log(`recording: ${isRecording}`);
};

recordBtn.addEventListener('click', () => {
  soundArr.length = 0;
  toggleRecording();
});

stopBtn.addEventListener('click', () => {
  toggleRecording();
  console.log(`sound array: ${soundArr}`);
});

document.addEventListener('keydown', (e) => {
  sound.currentTime = 0;
  sound.play();
  if (isRecording) {
    console.log('recorded sound');
    soundArr.push(Date.now() - startTime);
  }
});

playBtn.addEventListener('click', () => {
  soundArr.forEach((delay) => {
    setTimeout(() => {
      sound.currentTime = 0;
      sound.play();
    }, delay);
  });
});
