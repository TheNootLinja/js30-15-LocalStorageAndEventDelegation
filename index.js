const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = [];

function addItem(e) {
  e.preventDefault();
  const name = (this.querySelector('[name=item]')).value;
  const item = {
    name,
    done: false
  }
  items.push(item)
  this.reset();
  console.table(items);
  populateList(items, itemsList)
}

function populateList(items = [], itemsList) {
  const itemsHtml = items.map((item, i) => {
    return `
      <li>
      <label for="">${item.name}</label>
      </li>
    `;
  }).join('');
  itemsList.innerHTML = itemsHtml;
}

addItems.addEventListener('submit', addItem)