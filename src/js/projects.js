import 'bootstrap/js/dist/dropdown.js';
import Toast from 'bootstrap/js/dist/toast.js';
import { manageLogin } from './loguin.js';
import { restoreFromLStorage, initConverter, imgEventHandler } from './utils';
import { write } from './typer';
import { imgClick } from './elements.js';

manageLogin();
restoreFromLStorage();
document.querySelectorAll('[data-type]').forEach(write);

// Shopping List
const sumSpan = document.querySelector('#sum');
const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

let items = [];

function handleSubmitShop(e) {
  e.preventDefault();
  const [name, price, units] = [
    e.currentTarget.item.value,
    e.currentTarget.price.value,
    e.currentTarget.units.value,
  ];
  if (!name) return;
  const item = {
    name,
    id: Date.now(),
    price,
    units,
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
  <span class="itemPrice">$ ${item.price*item.units}</span>
  <button 
  aria-label="Remove ${item.name}"
  value="${item.id}"class="material-symbols-outlined"
  >delete</button>
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
      sum();
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
function sum() {
  let suma = 0;
  items.forEach((item) => {
    if (item.price && item.units) {
      suma += parseInt(item.price) * parseInt(item.units);
    }
  });
  sumSpan.textContent = `$${suma.toFixed(2)}`;
}
shoppingForm.addEventListener('submit', handleSubmitShop);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorageList);
list.addEventListener('itemsUpdated', sum);

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

// toats
// I will limit the times people will see this toast
let toastTimes = JSON.parse(localStorage.getItem('toastTimes'));

if (!toastTimes || (toastTimes && toastTimes < 2)) {
  toastTimes = !toastTimes ? (toastTimes = 1) : (toastTimes += 1);
  localStorage.setItem('toastTimes', JSON.stringify(toastTimes));
  const welcomeToast = document.getElementById('welcomeToast');
  if (welcomeToast) {
    const myToast = new Toast(welcomeToast);
    myToast.show();
  }
}

// --------------------------imgEventHandler--------------------------
imgClick.forEach((el) => {
  el.addEventListener('click', imgEventHandler);
  el.addEventListener('keyup', imgEventHandler);
});
