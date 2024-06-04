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
    recording.isRecording = true;
    recording.track = String(key);
    recordings[key].length = 0;
    recording.track = key;
    recording.startTime = Date.now();
    toggleRecording(key);
  });
}

for (const key in stopBtns) {
  stopBtns[key].addEventListener('click', () => {
    toggleRecording(key);
    recording.isRecording = false;
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

document.querySelector('.play-all').addEventListener('click', () => {
  for (const key in recordings) {
    recordings[key].forEach((time) => {
      setTimeout(() => {
        soundObject[key].currentTime = 0;
        soundObject[key].play();
      }, time);
    });
  }
});

const startMetronome = document.querySelector('.start-metronome');
const stopMetronome = document.querySelector('.stop-metronome');
const bpmInput = document.querySelector('#bpm');
const metronomeSound = document.querySelector('#tick');
let metronomeInterval = null;

startMetronome.addEventListener('click', () => {
  if (metronomeInterval) return;
  const bpmValue = parseInt(bpmInput.value, 10);
  if (isNaN(bpmValue) || bpmValue <= 0) {
    alert('Please enter a valid BPM value.');
    return;
  }
  const beat = 60000 / bpmValue;

  startMetronome.classList.toggle('hidden');
  stopMetronome.classList.toggle('hidden');

  metronomeInterval = setInterval(() => {
    metronomeSound.currentTime = 0;
    metronomeSound.play();
  }, beat);
});

stopMetronome.addEventListener('click', () => {
  if (!metronomeInterval) return;
  clearInterval(metronomeInterval);
  metronomeInterval = null;

  startMetronome.classList.toggle('hidden');
  stopMetronome.classList.toggle('hidden');
});

// czy na jednym kanale może być nagrywany jeden instrument czy po prostu
// jeden kanał nagrywa to co aktualnie się dzieje, a kanałów może być kilka
