'use strict';

const soundObject = {
  a: document.querySelector('#boom'),
  s: document.querySelector('#clap'),
  d: document.querySelector('#hihat'),
};

document.addEventListener('keydown', (e) => {
  if (soundObject[e.key]) {
    soundObject[e.key].currentTime = 0;
    soundObject[e.key].play();
    recordSound(e.key);
  }
});

// metronome
const startMetronomeBtn = document.querySelector('.start-metronome-btn');
const TICK = new Audio('../sounds/tink.wav');
const bpmInput = document.querySelector('#bpm');
let metronomeInterval = null;

// controls
const recordButtons = document.querySelectorAll('.record-btn');
const playButtons = document.querySelectorAll('.play-btn');
const playAll = document.querySelector('.play-all');
const playSelected = document.querySelector('.play-selected');

// tracks
const isRecording = [false, false, false, false];
const tracks = [[], [], [], []];
const recordingStartTime = [0, 0, 0, 0];
const isPlaying = [false, false, false, false];
let selectedTracks = [];

// ----------------------------------------

recordButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    isRecording[index] = !isRecording[index];
    if (isRecording[index]) {
      recordingStartTime[index] = Date.now();
      tracks[index] = [];
      btn.textContent = 'Stop';
    } else {
      btn.textContent = 'Record';
    }
  });
});

// playing one track
playButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    isPlaying[index] = !isPlaying[index];
    if (isPlaying[index]) {
      playTrack(index);
      btn.textContent = 'Stop';
    } else {
      stopTrack(index);
      btn.textContent = 'Play';
    }
  });
});

const recordSound = (key) => {
  const currentTime = Date.now();
  isRecording.forEach((recording, index) => {
    if (recording) {
      tracks[index].push({
        time: currentTime - recordingStartTime[index],
        key,
      });
    }
  });
};

// playing a track
const playTrack = (index) => {
  tracks[index].forEach((sound) => {
    setTimeout(() => {
      soundObject[sound.key].currentTime = 0;
      soundObject[sound.key].play();
    }, sound.time);
  });
};

const stopTrack = (index) => {
  isPlaying[index] = false;
  playButtons[index].textContent = 'Play';
};

// playing all tracks
document.querySelector('.play-all-btn').addEventListener('click', () => {
  isPlaying.fill(true);
  playTrack(0);
  playTrack(1);
  playTrack(2);
  playTrack(3);
});

// playing selected tracks
document.querySelector('.play-selected-btn').addEventListener('click', () => {
  selectedTracks = [
    document.querySelector('#track-checkbox-1').checked,
    document.querySelector('#track-checkbox-2').checked,
    document.querySelector('#track-checkbox-3').checked,
    document.querySelector('#track-checkbox-4').checked,
  ];

  selectedTracks.forEach((track, index) => {
    if (track) {
      playTrack(index);
    }
  });
});

// metronome
startMetronomeBtn.addEventListener('click', () => {
  if (metronomeInterval) {
    clearInterval(metronomeInterval);
    metronomeInterval = null;
    startMetronomeBtn.textContent = 'Start';
  } else {
    const bpm = parseInt(bpmInput.value) || 60;
    startMetronomeBtn.textContent = 'Stop';
    const interval = 60000 / bpm;
    metronomeInterval = setInterval(() => {
      TICK.currentTime = 0;
      TICK.play();
    }, interval);
  }
});
