// Get DOM elements
const noteForm = document.getElementById('noteForm');
const noteInput = document.getElementById('noteInput');
const notesContainer = document.getElementById('notesContainer');

// Load notes from local storage when the page loads
window.onload = function() {
  loadNotes();
}

// Add event listener to form submission
noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const noteText = noteInput.value.trim();
  
  if (noteText !== '') {
    addNoteToLocalStorage(noteText);
    displayNotes();
    noteInput.value = ''; // Clear the input field after adding the note
  }
});

// Function to add a note to local storage
function addNoteToLocalStorage(note) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load and display notes
function loadNotes() {
  displayNotes();
}

// Function to display notes in the container
function displayNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notesContainer.innerHTML = ''; // Clear the container

  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');

    const noteText = document.createElement('p');
    noteText.textContent = note;
    noteDiv.appendChild(noteText);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function() {
      deleteNoteFromLocalStorage(index);
      displayNotes();
    };

    noteDiv.appendChild(deleteBtn);
    notesContainer.appendChild(noteDiv);
  });
}

// Function to delete a note from local storage
function deleteNoteFromLocalStorage(noteIndex) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.splice(noteIndex, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
}