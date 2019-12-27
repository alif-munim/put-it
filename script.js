const mainGrid = document.querySelector(".main-grid");
const addBtn = document.querySelector(".add");
const inputBox = document.querySelector(".input")
let removeBtns;

addBtn.addEventListener("click", addItem);
let itemsAdded = false;
let noteList = [];
let i = 0;

function addItem(e) {

  let noteObj = {
    note: inputBox.value,
    id: i
  }

  mainGrid.innerHTML += `
    <div class="grid-item" data-id="${noteObj.id}">
      <!-- content -->
      <div class="item-content">
        <p>${noteObj.note}</p>
      </div>
      <!-- buttons -->
      <div class="item-actions archive">
        <i class="fas fa-history"></i>
      </div>
      <div class="item-actions edit">
        <i class="fas fa-edit"></i>
      </div>
      <div class="item-actions remove">
        <i class="fas fa-trash-alt"></i>
      </div>
    </div>
  `;

  removeBtns = document.querySelectorAll(".remove");
  removeBtns.forEach(button => button.addEventListener("click", removeItem));

  noteList.push(noteObj);
  Storage.setList();
  i++;
}

class Storage {
  static setList() {
    localStorage.setItem("noteList", JSON.stringify(noteList));
  }
  static getList() {
    return JSON.parse(localStorage.getItem("noteList"));
  }
}


function removeItem(e) {
  console.log(`data-id: ${e.target.parentElement.parentElement.dataset.id}`)
  let id = e.target.parentElement.parentElement.dataset.id;
  noteList = noteList.filter(item => item.id != id);
  Storage.setList();

  mainGrid.removeChild(e.target.parentElement.parentElement);
}

document.addEventListener("DOMContentLoaded", e => {
  let load = Storage.getList();
  load.forEach(item => {
    mainGrid.innerHTML += `
      <div class="grid-item" data-id="${item.id}">
        <!-- content -->
        <div class="item-content">
          <p>${item.note}</p>
        </div>
        <!-- buttons -->
        <div class="item-actions archive">
          <i class="fas fa-history"></i>
        </div>
        <div class="item-actions edit">
          <i class="fas fa-edit"></i>
        </div>
        <div class="item-actions remove">
          <i class="fas fa-trash-alt"></i>
        </div>
      </div>
    `;

    removeBtns = document.querySelectorAll(".remove");
    removeBtns.forEach(button => button.addEventListener("click", removeItem));

    noteList.push(item);
    Storage.setList();

  });
});
