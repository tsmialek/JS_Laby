'use strict';

const soundObject = {
  a: document.querySelector('#boom'),
  s: document.querySelector('#clap'),
  d: document.querySelector('#hihat'),
};

const recordButtons = [
  document.querySelector('#record-boom'),
  document.querySelector('#record-clap'),
  document.querySelector('#record-hihat'),
];

const recordButtonsMap = {
  'record-boom': 'a',
  'record-clap': 's',
  'record-hihat': 'd',
};

document.addEventListener('keydown', (e) => {
  const sound = soundObject[e.key];
  sound.currentTime = 0;
  sound.play();
});

recordButtons.forEach((button) => {
  button.addEventListener('click', (button) => {
    startRecording(button);
  });
});

const soundArr = [];

function startRecording(button) {
  document.addEventListener('keydown', (e) => {
    if (e.key === recordButtonsMap[button.target.id]) {
      soundArr.push(Date.now());
      console.log(`recorded : ${recordButtonsMap[button.target.id]}`);
    }
  });
}
