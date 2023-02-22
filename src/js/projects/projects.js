import 'bootstrap/js/dist/dropdown.js';
import 'bootstrap/js/dist/offcanvas.js';
import { manageLogin } from '../loguin.js';
import {
  restoreFromLStorage,
  initConverter,
  imgEventHandler,
  checkForToasts,
  createInitTooltips,
} from '../utils';
import { write } from '../typer';
import { imgClick } from '../elements.js';
import {
  handleKeyDown,
  planeCloseButton,
  planeShowButton,
  videoTag,
} from './plane-game';
import { faceAsyncinit } from './faceDetector.js';

manageLogin();
restoreFromLStorage();
document.querySelectorAll('[data-type]').forEach(write);

// ------------------------------------MainNote----------------------------------------

const sumSpan = document.querySelector('#sum');
const noteForm = document.querySelector('.noteForm');
const list = document.querySelector('.list');

let items = [];

function handleSubmitNote(e) {
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
  const html = items.map(item => `<li class="note-item">
  <input 
  value="${item.id}"
  type="checkbox"
  ${item.complete && 'checked'}>
  <span class="itemName">${item.name}</span>
  <span class="itemPrice">$ ${item.price*item.units}</span>
  <button 
  aria-label="Remove ${item.name}"
  value="${item.id}"class="material-symbols-outlined delete"
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
noteForm.addEventListener('submit', handleSubmitNote);
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

// --------------------------Converter--------------------------

const form = document.querySelector('.app form');

form.addEventListener('mouseenter', initConverter, { once: true });

// --------------------------TOASTS--------------------------

checkForToasts();

// --------------------------imgEventHandler--------------------------
imgClick.forEach((el) => {
  el.addEventListener('click', imgEventHandler);
  el.addEventListener('keyup', imgEventHandler);
});

// --------------------------TOOLTIPS--------------------------
createInitTooltips();

// --------------------------SOME DAY A COMPLETE PLANEGAME--------------------------

if (planeShowButton && planeCloseButton) {
  planeShowButton.addEventListener('click', () => {
    window.addEventListener('keydown', handleKeyDown);
    videoTag.play();
  });
  planeCloseButton.addEventListener('click', () => {
    window.removeEventListener('keydown', handleKeyDown);
    videoTag.pause();
  });
}
// --------------------------FACE DETECTOR--------------------------
const faceDetectShowButton = document.querySelector(
  '[data-bs-target="#facedetector"]'
);
const faceDetectCloseButton = document.querySelector(
  '#facedetector [aria-label="Close"]'
);

if (faceDetectShowButton && faceDetectCloseButton) {
  faceDetectShowButton.addEventListener('click', () => {
    faceAsyncinit();
  });
  faceDetectCloseButton.addEventListener('click', () => {
    window.location.reload();
  });
  window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      faceDetectCloseButton.click();
      console.log(e.key);
    }
  });
}
