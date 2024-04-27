'use strict';

const soundObject = {
  a: document.querySelector('#boom'),
  s: document.querySelector('#clap'),
  d: document.querySelector('#hihat'),
};

const recordButtonsMap = {
  'record-boom': 'a',
  'record-clap': 's',
  'record-hihat': 'd',
};

const recordButtons = [
  document.querySelector('#record-boom'),
  document.querySelector('#record-clap'),
  document.querySelector('#record-hihat'),
];

const pauseButtons = [
  document.querySelector('#pause-boom'),
  document.querySelector('#pause-clap'),
  document.querySelector('#pause-hihat'),
];

document.addEventListener('keydown', (e) => {
  const sound = soundObject[e.key];
  sound.currentTime = 0;
  sound.play();
});

recordButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    startRecording(event); // Pass the event to the function
  });
});

const soundArr = [];

function startRecording(event) {
  const button = event.target; // Access the button from the event
  document.addEventListener('keydown', (e) => {
    if (e.key === recordButtonsMap[button.id]) {
      soundArr.push(Date.now());
      console.log(`recorded : ${recordButtonsMap[button.id]}`);
    }
  });
}
