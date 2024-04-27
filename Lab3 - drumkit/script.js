'use strict';

const soundObject = {
  a: document.querySelector('#boom'),
};

const recordBtn = document.querySelector('.record');
const stopBtn = document.querySelector('.stop');
let isRecording = false;

const toggleRecording = () => {
  recordBtn.classList.toggle('hidden');
  stopBtn.classList.toggle('hidden');
};

document.addEventListener('keydown', (e) => {
  const sound = soundObject[e.key];
  sound.currentTime = 0;
  sound.play();
});
