// Initialize variables
const mainGrid = document.querySelector(".main-grid");
const addBtn = document.querySelector(".add");
const inputBox = document.querySelector(".input")
let removeBtns;
let editBtns;
let noteList = [];
let i = 0;

addBtn.addEventListener("click", addItem);

/* Add an item
 * Take the text value from the inputBox
 * Insert a note on the grid which will by styled in CSS
 */

function addItem(e) {

  let noteObj = {
    note: inputBox.value,
    id: i
  }

  mainGrid.innerHTML += `
    <div class="grid-item" data-id="${noteObj.id}">
      <!-- content -->
      <div class="item-content"><p>${noteObj.note}</p><textarea class="editInput hide" rows="3" maxlength="64"></textarea></div>
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

  editBtns = document.querySelectorAll(".edit");
  editBtns.forEach(button => button.addEventListener("click", editItem));

  noteList.push(noteObj);
  Storage.setList();
  Storage.setIndex();
  i++;
}

/* Localstorage functions:
 * List getter and setter
 * Current index getter and setter
 */

class Storage {
  static setList() {
    localStorage.setItem("noteList", JSON.stringify(noteList));
  }
  static getList() {
    return JSON.parse(localStorage.getItem("noteList"));
  }
  static setIndex() {
    localStorage.setItem("index", i);
  }
  static getIndex() {
    return localStorage.getItem("index");
  }
}

/* Remove an item
 * Target parent element and remove child
 * Remove note from noteList, saved in localstorage
 */

function removeItem(e) {
  console.log(`data-id: ${e.target.parentElement.parentElement.dataset.id}`);
  let id = e.target.parentElement.parentElement.dataset.id;
  noteList = noteList.filter(item => item.id != id);
  Storage.setList();

  mainGrid.removeChild(e.target.parentElement.parentElement);
}

/* Edit an item
 * Either show or hide the edit box through the "show" class in styles.css
 * If a note has been edited, target innerText of current grid-item and change
 * Also change the note value in the noteList saved in localstorage
 */

let showEdit = false;

function editItem(e) {
  if (!showEdit) {
    console.log(e.target.parentElement.previousElementSibling.previousElementSibling);

    e.target.parentElement.previousElementSibling.previousElementSibling.lastChild.classList.add("show");
    showEdit = true;
  } else {
    console.log(e.target);

    let id = e.target.parentElement.parentElement.dataset.id;
    console.log(id);
    let editMsg = e.target.parentElement.previousElementSibling.previousElementSibling.lastChild.value;
    e.target.parentElement.previousElementSibling.previousElementSibling.firstChild.innerText = editMsg;
    e.target.parentElement.previousElementSibling.previousElementSibling.lastChild.classList.remove("show");
    noteList.forEach(item => {
      if (item.id == id) {
        item.note = editMsg;
      }
    });
    Storage.setList();
    showEdit = false;
  }

}

/* On document load
 * Display all previous notes saved in Localstorage
 * Set current index to previously saved index + 1
 * Add click listeners to all interactive buttons
 */

document.addEventListener("DOMContentLoaded", e => {
  showEdit = false;
  if (Storage.getIndex()) {
    i = parseInt(Storage.getIndex()) + 1;
  }
  if (Storage.getList()) {
    let load = Storage.getList();
    load.forEach(item => {
      mainGrid.innerHTML += `
        <div class="grid-item" data-id="${item.id}">
          <!-- content -->
          <div class="item-content"><p>${item.note}</p><textarea class="editInput hide" rows="3" maxlength="64"></textarea></div>
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

      editBtns = document.querySelectorAll(".edit");
      editBtns.forEach(button => button.addEventListener("click", editItem));

      noteList.push(item);
      Storage.setList();

    });
  }

});
