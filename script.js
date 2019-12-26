const mainGrid = document.querySelector(".main-grid");
const addBtn = document.querySelector(".add");
const inputBox = document.querySelector(".input")
let removeBtns;

addBtn.addEventListener("click", addItem);
let itemsAdded = false;

function addItem(e) {
  mainGrid.innerHTML += `
    <div class="grid-item">
      <!-- content -->
      <div class="item-content">
        <p>${inputBox.value}</p>
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
  console.log(removeBtns);

}



function removeItem(e) {
  mainGrid.removeChild(e.target.parentElement.parentElement);
}
