/* eslint-disable import/no-mutable-exports, no-unused-expressions */
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
  cleanLsButton,
} from './elements';
import currencies from './currencies.js';
import { ak } from '../../gitignore/ak';
import { ratesByBaseBkUp, ratesDate } from './ratesBAckUp';
import { shouldEnableContentEditable } from './loguin';

let reducedEditables;
let prevTime;
let elapsTime;
let LocalRatesByBaseBkUp = ratesByBaseBkUp;
let localRatesDate = ratesDate;

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
  console.log('mirroring from:', title);
  reducedEditables = editableContentsReducer(editableElements);
  localStorage.setItem(title, JSON.stringify(reducedEditables));
}

function restoreFromLStorage() {
  const shouldEnable = JSON.parse(localStorage.getItem('login'));
  console.log('shouldEnable?', shouldEnable);
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
  if (window.visualViewport.width >= 975.2) {
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

function showWarningToast(text) {
  const warningToast = document.getElementById('warningToast');
  if (warningToast) {
    warningToast.querySelector('div.toast-body').innerText = text;
    const myToast = new Toast(warningToast);
    myToast.show();
  }
}

async function fetchRates(base = 'USD') {
  prevTime = JSON.parse(localStorage.getItem('prevTime')); // no hay
  console.log('prevTime from Ls', prevTime); // null
  // if (!prevTime) prevTime = Date.now();
  // localStorage.setItem('prevTime', JSON.stringify(prevTime));
  elapsTime = Date.now() - prevTime;
  if (elapsTime < 1200000) {
    // no entra
    showWarningToast(
      `Pleasy🙏 wait ${((1200000 - elapsTime) / 60000).toFixed(
        2
      )} minutes to refresh the rates again`
    );
  } else {
    console.log('auth to refresh rates...');
    // THE ONLY PLACE WHERE WE FETCH THE CURRENCIES

    const res = await fetch(`${endPoint}/latest?base=${base}`, {
      headers: { apikey: ak }, // err
    });

    const result = await res.json();
    console.log(result);

    console.log('y esto debería correr..');
    if (result.rates) {
      ratesByBase = result.rates;
      console.log(ratesByBase); // err
      if (ratesByBase) {
        // etra - sig err
        LocalRatesByBaseBkUp = ratesByBase; // ok
        console.log('LocalRatesByBaseBkUp updated...', LocalRatesByBaseBkUp);
        localRatesDate = result.date; // ok
        console.log('LocalRatesDate updated?', localRatesDate);
        mirrorToLocalStorageConvert(ratesByBase); // mirror
        localStorage.setItem('ratesDate', JSON.stringify(localRatesDate));
        prevTime = Date.now();
        localStorage.setItem('prevTime', JSON.stringify(prevTime)); // mirror
      }
    } else {
      console.log('no result');
      mirrorToLocalStorageConvert(LocalRatesByBaseBkUp); //
      const ratesDateRestored = JSON.parse(localStorage.getItem('ratesDate'));
      console.log('ratesDateRestored', ratesDateRestored);
      ratesDateRestored ? (localRatesDate = ratesDateRestored) : null;
      console.log(ratesDateRestored, localRatesDate);
      localStorage.setItem('ratesDate', JSON.stringify(localRatesDate));
      ratesByBase = LocalRatesByBaseBkUp; //
      showWarningToast(
        `Refresh rate error: \n"${result.message}". \nUsing a rate from MM/DD/AA: ${localRatesDate}`
      );
    }
  }
}
function restoreFromLocalStorageConvert() {
  const exchangeRates = localStorage.getItem('exchangeRates'); // no hay
  if (exchangeRates) {
    // no setea
    ratesByBase = JSON.parse(exchangeRates);
    return;
  }
  fetchRates(); // ingresa
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
        window.location = 'https://api.whatsapp.com/send?phone=5493454093473';
        break;
      case 'Argentina Programa':
        window.location =
          'https://www.argentina.gob.ar/economia/conocimiento/argentina-programa';
        break;
      default:
        window.location = 'https://api.whatsapp.com/send?phone=5493454093473';
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

async function cleanTooltipsFunct() {
  const cleanTooltips = await createTooltips('.cleanLs');
  cleanTooltips.forEach((el) => {
    el.tip.addEventListener(
      'click',
      () => {
        el.hide();
      },
      { once: true }
    );
  });
  cleanLsButton.addEventListener(
    'click',
    () => {
      localStorage.clear();
      alert('Local Storage Cleared');
      if (prevTime) localStorage.setItem('prevTime', JSON.stringify(prevTime));
      window.location.reload();
    },
    { once: true }
  );
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
  cleanTooltipsFunct,
};
