'use strict';
const recording = {
  isRecording: false,
  track: 'a',
  startTime: Date.now(),
};

const soundObject = {
  a: document.querySelector('#boom'),
  s: document.querySelector('#clap'),
  d: document.querySelector('#hihat'),
};

const recordings = {
  a: [],
  s: [],
  d: [],
};

const recordBtns = {
  a: document.querySelector('.record-boom'),
  s: document.querySelector('.record-clap'),
  d: document.querySelector('.record-hihat'),
};

const stopBtns = {
  a: document.querySelector('.stop-boom'),
  s: document.querySelector('.stop-clap'),
  d: document.querySelector('.stop-hihat'),
};

const playBtns = {
  a: document.querySelector('.play-boom'),
  s: document.querySelector('.play-clap'),
  d: document.querySelector('.play-hihat'),
};

for (const key in recordBtns) {
  recordBtns[key].addEventListener('click', () => {
    recordings[key].length = 0;
    recording.track = key;
    recording.startTime = Date.now();
    toggleRecording(key);
  });
}

for (const key in stopBtns) {
  stopBtns[key].addEventListener('click', () => {
    toggleRecording(key);
    console.log(`sound array of ${key}: ${recordings[String(key)]}`);
  });
}

for (const key in playBtns) {
  playBtns[key].addEventListener('click', (e) => {
    recordings[key].forEach((time) => {
      setTimeout(() => {
        soundObject[key].currentTime = 0;
        soundObject[key].play();
      }, time);
    });
  });
}

const toggleRecording = (key) => {
  recordBtns[key].classList.toggle('hidden');
  stopBtns[key].classList.toggle('hidden');

  recording.isRecording = !recording.isRecording;
  recording.track = String(key);
};

document.addEventListener('keydown', (e) => {
  if (e.key in soundObject) {
    const sound = soundObject[e.key];
    sound.currentTime = 0;
    sound.play();
    if (recording.isRecording && recording.track === e.key) {
      recordings[recording.track].push(Date.now() - recording.startTime);
    }
  }
});
