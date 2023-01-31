/* eslint-disable import/no-mutable-exports */
import Toast from 'bootstrap/js/dist/toast';
import Tooltip from 'bootstrap/js/dist/tooltip';

import {
  editableElements,
  imgsToChange,
  refresh,
  formCurrency,
  fromCurrecy,
  toCurrency,
  fromAmount,
  toAmount,
} from './elements';
import currencies from './currencies.js';
import { ak } from '../../gitignore/ak';
import { shouldEnableContentEditable } from './loguin';

let reducedEditables;

function wait(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

function editableContentsReducer(arr) {
  const reduced = arr.reduce((contentObj, currentEl) => {
    if (currentEl.tagName === 'IMG') {
      // console.log(`saving the content of an IMG`);
      contentObj[currentEl.id] = currentEl.src;
    } else if (currentEl.tagName === 'P' || currentEl.tagName.includes('H')) {
      // console.log(`saving the content of a ${currentEl.tagName}`);
      contentObj[currentEl.id] = currentEl.innerText;
    }
    return contentObj;
  }, {});
  return reduced;
}

function mirrorToLocalStorage() {
  const { title } = document;
  console.log(title);
  reducedEditables = editableContentsReducer(editableElements);
  localStorage.setItem(title, JSON.stringify(reducedEditables));
}

function restoreFromLStorage() {
  const shouldEnable = JSON.parse(localStorage.getItem('login'));
  if (shouldEnable) shouldEnableContentEditable(true);
  const { title } = document;
  console.log(title);
  const elsContent = JSON.parse(localStorage.getItem(title));
  if (!elsContent) {
    mirrorToLocalStorage();
  } else {
    editableElements.forEach((el) => {
      if (el.tagName === 'IMG') {
        // console.log(`restoring the content of an IMG`);
        el.src = elsContent[el.id];
      } else if (el.tagName === 'P' || el.tagName.includes('H')) {
        // console.log(`restoring the content of a ${el.tagName}`);
        el.innerText = elsContent[el.id];
      }
    });
  }
}

async function selectImg(el) {
  const file = el.files[0];
  let img;
  console.log(file); // the File object
  // select the img element
  if (window.visualViewport.width >= 992) {
    img = imgsToChange.find((elm) => elm.matches('.desktop'));
  } else {
    img = imgsToChange.find((elm) => elm.matches('.mobile'));
  }
  console.log(img);
  // work on the reader
  const reader = new FileReader();
  reader.onload = function (e) {
    const { result } = reader;
    console.log(e); // the ProgressEvent, type = "load"// we have loadstart, load, loadend, progress, error, abort
    console.log(e.target); // reader --> FileReader
    console.log(e.target.result); // the data
    img.src = result;
    // reducedEditables[img.id] = result;
  };
  reader.readAsDataURL(file);
  reader.onerror = function () {
    console.log(reader.erorr);
  };
}

// --------------------------AsyncTyper--------------------------

function getRandomBetween(min = 20, max = 200) {
  const randomNumber = Math.random();
  return Math.floor(randomNumber * (max - min) + min);
}

// --------------------------Converter--------------------------

let ratesByBase = {};
const endPoint = 'https://api.apilayer.com/exchangerates_data';

function generateOptions(options) {
  return Object.entries(options)
    .map(
      ([currencyCode, currencyName]) =>
        `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`
    )
    .join('');
}
function formatCurrency(amount, currency) {
  return Intl.NumberFormat('es-ar', { style: 'currency', currency }).format(
    amount
  );
}

function initConverter() {
  refresh.addEventListener('click', () => {
    fetchRates();
  });
  formCurrency.addEventListener('input', convert);

  const optionsHTML = generateOptions(currencies);

  // populate the options elements
  fromCurrecy.innerHTML = optionsHTML;
  toCurrency.innerHTML = optionsHTML;

  restoreFromLocalStorageConvert();
}

function mirrorToLocalStorageConvert(object) {
  localStorage.setItem('exchangeRates', JSON.stringify(object));
}

async function fetchRates(base = 'USD') {
  const res = await fetch(`${endPoint}/latest?base=${base}`, {
    headers: { apikey: ak },
  });
  ratesByBase = (await res.json()).rates;
  mirrorToLocalStorageConvert(ratesByBase);
}
function restoreFromLocalStorageConvert() {
  const exchangeRates = localStorage.getItem('exchangeRates');
  if (exchangeRates) {
    ratesByBase = JSON.parse(exchangeRates);
    return;
  }
  fetchRates();
}

function convert() {
  const amount = fromAmount.value;
  const from = fromCurrecy.value;
  const to = toCurrency.value;
  const calcAmount = (amount * ratesByBase[to]) / ratesByBase[from];
  toAmount.textContent = formatCurrency(calcAmount, to);
}
// --------------------------imgEventHandler--------------------------
function imgEventHandler(e) {
  console.log(e);
  if (e.key === 'Enter' || e.type === 'click') {
    console.log(e.target.al);
    switch (e.target.alt) {
      case 'Instagram':
        window.location = 'https://www.instagram.com/augustox86/';
        break;
      case 'Linkedin':
        window.location =
          'https://www.linkedin.com/in/manuel-augusto-bravard-642034204/';
        break;
      case 'Whatsapp':
        window.location = 'https://api.whatsapp.com/send?phone=+5493454093473';
        break;
      case 'Argentina Programa':
        window.location =
          'https://www.argentina.gob.ar/economia/conocimiento/argentina-programa';
        break;
      default:
        window.location = 'https://api.whatsapp.com/send?phone=+5493454093473';
        break;
    }
  }
}

// -------------------------------------TOASTS----------------------------
function checkForToasts() {
  // I will limit the times people will see this toast
  const { title } = document;
  let toastTimes = JSON.parse(localStorage.getItem(`toastTimes${title}`));

  if (!toastTimes || (toastTimes && toastTimes < 2)) {
    toastTimes = !toastTimes ? (toastTimes = 1) : (toastTimes += 1);
    localStorage.setItem(`toastTimes${title}`, JSON.stringify(toastTimes));
    const welcomeToast = document.getElementById('welcomeToast');
    if (welcomeToast) {
      const myToast = new Toast(welcomeToast);
      myToast.show();
    }
  }
}
function checkForLoginToasts() {
  // I will limit the times people will see this toast
  let toastTimes = JSON.parse(localStorage.getItem(`loginToastTimes`));

  if (!toastTimes || (toastTimes && toastTimes < 2)) {
    toastTimes = !toastTimes ? (toastTimes = 1) : (toastTimes += 1);
    localStorage.setItem(`loginToastTimes`, JSON.stringify(toastTimes));
    const loginToast = document.getElementById('loginToast');
    if (loginToast) {
      const myToast = new Toast(loginToast);
      myToast.show();
    }
  }
}

// --------------------------------TOOLTIPS---------------------------
async function createTooltips(tools) {
  const tooltipTriggerList = document.querySelectorAll(tools);
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
  );
  // if it needs to be showed manually
  await wait(500);
  tooltipList.forEach((el) => {
    if (el._config.trigger === 'manual') {
      // console.log(el);
      el.show();
    }
  });
  return tooltipList;
}

export {
  restoreFromLStorage,
  mirrorToLocalStorage,
  selectImg,
  wait,
  getRandomBetween,
  generateOptions,
  formatCurrency,
  initConverter,
  fetchRates,
  restoreFromLocalStorageConvert,
  convert,
  imgEventHandler,
  checkForToasts,
  createTooltips,
  checkForLoginToasts,
};
