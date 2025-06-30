let isEditing = false;
let editTargetRow = null;

document.querySelector('#book-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const author = document.querySelector('#author').value.trim();
  const year = document.querySelector('#year').value.trim();

  if (!title || !author || !year) {
    alert("Please fill all fields.");
    return;
  }

  if (isEditing && editTargetRow) {
    updateBook(editTargetRow, title, author, year);
    isEditing = false;
    editTargetRow = null;
  } else {
    addBook(title, author, year);
  }

  document.querySelector('#book-form').reset();
});

function addBook(title, author, year) {
  const row = document.createElement('section');
  row.classList.add('table-section');

  row.innerHTML = `
    <div>${title}</div>
    <div>${author}</div>
    <div>${year}</div>
    <div class='action-cell'>
      <button class="editBtn"><i class="fa fa-edit"></i></button>
      <button class="deleteBtn"><i class="fa fa-trash"></i></button>
    </div>
  `;

  // Append to list
  document.querySelector('#book-list').appendChild(row);

  // Edit handler
  row.querySelector('.editBtn').addEventListener('click', () => {
    enterEditMode(row);
  });

  // Delete handler
  row.querySelector('.deleteBtn').addEventListener('click', () => {
    row.remove();
  });
}

function enterEditMode(row) {
  const cells = row.querySelectorAll('div');
  document.querySelector('#title').value = cells[0].textContent;
  document.querySelector('#author').value = cells[1].textContent;
  document.querySelector('#year').value = cells[2].textContent;

  isEditing = true;
  editTargetRow = row;
}

function updateBook(row, newTitle, newAuthor, newYear) {
  const cells = row.querySelectorAll('div');
  cells[0].textContent = newTitle;
  cells[1].textContent = newAuthor;
  cells[2].textContent = newYear;
}
