import 'bootstrap/js/dist/dropdown.js';
import { manageLogin } from './loguin.js';
import { restoreFromLStorage, initConverter } from './utils';
import { write } from './typer';

manageLogin();
restoreFromLStorage();
document.querySelectorAll('[data-type]').forEach(write);

// Shopping List

const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

let items = [];

function handleSubmitShop(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  if (!name) return;
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };
  items.push(item);

  e.currentTarget.reset();

  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  /* eslint-disable*/
  const html = items.map(item => `<li class="shopping-item">
  <input 
  value="${item.id}"
  type="checkbox"
  ${item.complete && 'checked'}>
  <span class="itemName">${item.name}</span>
  <button 
  aria-label="Remove ${item.name}"
  value="${item.id}"
  >&times;</button>
    </li>`).join('');
  /* eslint-enable */

  list.innerHTML = html;
}

function mirrorToLocalStorageList() {
  console.log('mirroringggg...');
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorageList() {
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems) {
    console.log('restoring from local storage');
    if (lsItems.length) {
      items.push(...lsItems);
      displayItems();
    }
  }
}

function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}
function markAsComplete(id) {
  const itemRef = items.find((item) => item.id === id);
  itemRef.complete = !itemRef.complete;
  mirrorToLocalStorageList();
}

shoppingForm.addEventListener('submit', handleSubmitShop);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorageList);

list.addEventListener('click', (event) => {
  const id = parseInt(event.target.value);
  if (event.target.matches('button')) {
    deleteItem(id);
  }
  if (event.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

restoreFromLocalStorageList();

// Converter

const form = document.querySelector('.app form');

form.addEventListener('mouseenter', initConverter, { once: true });
