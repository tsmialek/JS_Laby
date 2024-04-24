'use strict';
class Note {
  constructor(title, content, created) {
    this.title = title;
    this.content = content;
    this.created = created;
  }
}

const notes = [];

const addNoteBtn = document.querySelector('#add-note');
const createNoteModal = document.querySelector('.create-note-modal');
const backDrop = document.querySelector('.backdrop');
const closeModalBtn = document.querySelector('.close-modal');

const title = document.querySelector('#note-title');
const content = document.querySelector('#note-content');

const createNoteBtn = document.querySelector('.create-note');

addNoteBtn.addEventListener('click', () => {
  createNoteModal.classList.add('active');
  backDrop.classList.remove('hidden');
});

const closeModal = () => {
  createNoteModal.classList.remove('active');
  backDrop.classList.add('hidden');
};

const clearInputs = () => {
  title.value = '';
  content.value = '';
};

closeModalBtn.addEventListener('click', closeModal);

createNoteBtn.addEventListener('click', () => {
  const created = new Date().toLocaleString();

  const note = new Note(title.value, content.value, created);
  notes.push(note);

  localStorage.setItem(title.value, JSON.stringify(notes));
  closeModal();
  clearInputs();
});
