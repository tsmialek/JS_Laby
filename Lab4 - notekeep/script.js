'use strict';

const addNoteBtn = document.querySelector('#add-note');
const createNoteModal = document.querySelector('.create-note-modal');
const backDrop = document.querySelector('.backdrop');
const closeModalBtn = document.querySelector('.close-modal');
const createNoteBtn = document.querySelector('.create-note');

addNoteBtn.addEventListener('click', () => {
  createNoteModal.classList.add('active');
  backDrop.classList.remove('hidden');
  document.querySelector('#note-title').value = '';
  document.querySelector('#note-content').value = '';
  document.querySelector('#note-tags').value = '';
});

const closeModal = () => {
  createNoteModal.classList.remove('active');
  backDrop.classList.add('hidden');
};

closeModalBtn.addEventListener('click', closeModal);

const loadNotes = () => JSON.parse(localStorage.getItem('notes')) || [];
const saveNotesToLocalStorage = (notes) =>
  localStorage.setItem('notes', JSON.stringify(notes));

let selectedColor = '#869cf9';

const colorPickerElements = document.querySelectorAll('.color-picker .color');
colorPickerElements.forEach((colorDiv) => {
  colorDiv.addEventListener('click', function () {
    selectedColor = this.dataset.color;
    colorPickerElements.forEach((c) => c.classList.remove('selected'));
    this.classList.add('selected');
  });
});

const addNote = () => {
  const title = document.querySelector('#note-title').value;
  const content = document.querySelector('#note-content').value;
  const tags = document.querySelector('#note-tags').value.split(' ');

  const notes = loadNotes();
  notes.push({
    title: title,
    content: content,
    created: new Date(),
    color: selectedColor,
    pinned: false,
    tags: tags,
  });
  saveNotesToLocalStorage(notes);
  displayNotes();
};

createNoteBtn.addEventListener('click', () => {
  addNote();
  closeModal();
});

const displayNotes = (notes = loadNotes()) => {
  const notesContainer = document.querySelector('.notes-container');
  notesContainer.innerHTML = '';

  const pinnedNotes = notes.filter((note) => note.pinned);
  const unpinnedNotes = notes.filter((note) => !note.pinned);

  notes = [...pinnedNotes, ...unpinnedNotes];

  notes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
    <div class="note-title primary">
    <h2 style="color: ${note.color}">${note.title}</h2>
    <h6 style="color: ${note.color}">${new Date(
      note.created
    ).toLocaleString()}</h6>
    </div>
    <div class="note-body">
    <p>${note.content}</p>
    </div>
    <div class="note-info">
    <span><span style="color: ${
      note.color
    }; font-weight: bolder;">Tags: </span>${note.tags.join(', ')}</span>
      <div>
        <button class="btn pin-btn">${note.pinned ? 'Unpin' : 'Pin'}</button>
        <button class="btn delete-btn">Delete</button>
      </div>
    </div>
    
    `;
    noteElement.querySelector('.pin-btn').addEventListener('click', () => {
      note.pinned = !note.pinned;
      saveNotesToLocalStorage(notes);
      displayNotes();
    });

    noteElement.querySelector('.delete-btn').addEventListener('click', () => {
      notes.splice(index, 1);
      saveNotesToLocalStorage(notes);
      displayNotes();
    });

    notesContainer.appendChild(noteElement);
  });
};

console.log(loadNotes());
displayNotes();

document
  .querySelector('#note-filter')
  .addEventListener('input', (e) => filterNotes(e.target.value));

const filterNotes = (searchPhrase) => {
  if (!searchPhrase) {
    displayNotes();
    return;
  }

  const notes = loadNotes();
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
      note.content.toLowerCase().includes(searchPhrase.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchPhrase.toLowerCase())
      )
  );

  displayNotes(filteredNotes);
};
