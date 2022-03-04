const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];
const clearButton = document.querySelector('.clear-button');
const checkButton = document.querySelector('.check-button');
const uncheckButton = document.querySelector('.uncheck-button');

// Function that handles when a user is adding a new item
function addItem(e) {
  e.preventDefault();
  const name = (this.querySelector('[name=item]')).value;
  const item = {
    name,
    done: false
  }
  items.push(item)
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

// Function that repaints the itemsList everytime it is called
function populateList(items = [], itemsList) {
  const itemsHtml = items.map((item, i) => {
    return `
      <li>
      <input type="checkbox" data-index="${i}" id="item${i}" ${item.done ? 'checked' : ''}/>
      <label for="item${i}">${item.name}</label>
      </li>
    `;
  }).join('');
  itemsList.innerHTML = itemsHtml;
}

// Function for handling what happens when an item is clicked to check/uncheck
function toggleDone(e) {
  if(!e.target.matches('input')) return;
  const el = e.target;
  const elIndex = el.dataset.index;
  items[elIndex].done = !items[elIndex].done;
  localStorage.setItem('items', JSON.stringify(items));
};

// Function to clear all items from list and localstorage
const clearAll = () => {
  items = [];
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
};

// Function to check all items
const checkAll = () => {
  items.map(item => {
    item.done = true;
  });
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
};

// Function to uncheck all items
const uncheckAll = () => {
  items.map(item => {
    item.done = false;
  });
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
};

// Adding event listeners to required elements
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
clearButton.addEventListener('click', clearAll);
uncheckButton.addEventListener('click', uncheckAll);
checkButton.addEventListener('click', checkAll);

populateList(items, itemsList);