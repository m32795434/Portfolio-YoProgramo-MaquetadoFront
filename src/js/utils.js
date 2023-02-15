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
import { ratesByBaseBkUp, ratesDate } from './ratesBackUp';
import { shouldEnableContentEditable, prevTimeCleared } from './loguin';

let reducedEditables;
let prevTime;
let elapsTime;
let LocalRatesByBaseBkUp = ratesByBaseBkUp;
let utilsModuleRatesDate = ratesDate;
let ratesByBase;

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
      contentObj[currentEl.id] = currentEl.innerHTML;
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
  restoreFromLocalStorageConvert();
  const shouldEnable = JSON.parse(localStorage.getItem('login'));
  console.log('shouldEnable contenteditable?', shouldEnable);
  if (shouldEnable) shouldEnableContentEditable(true);
  const { title } = document;
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
        el.innerHTML = elsContent[el.id];
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
  if (!prevTime) {
    prevTime = JSON.parse(localStorage.getItem('prevTime'));
    console.log('prevTime from Ls', prevTime);
  }
  // if (!prevTime) prevTime = Date.now();
  // localStorage.setItem('prevTime', JSON.stringify(prevTime));
  elapsTime = Date.now() - prevTime;
  if (elapsTime < 1200000) {
    showWarningToast(
      `Pleasy🙏 wait ${Math.floor(
        (1200000 - elapsTime) / 60000
      )} minutes and ${Math.floor(
        ((1200000 - elapsTime) % 60000) / 1000
      )} seconds to refresh the rates again`
    );
  } else {
    console.log('auth to refresh rates...');
    // THE ONLY PLACE WHERE WE FETCH THE CURRENCIES

    const res = await fetch(`${endPoint}/latest?base=${base}`, {
      headers: { apikey: ak },
    });

    const result = await res.json();
    console.log('result..', result);

    if (result.rates) {
      ratesByBase = result.rates;
      console.log('ratesByBase updated..', ratesByBase);
      if (ratesByBase) {
        LocalRatesByBaseBkUp = ratesByBase;
        console.log('LocalRatesByBaseBkUp updated...', LocalRatesByBaseBkUp);
        utilsModuleRatesDate = result.date;
        console.log('LocalRatesDate updated?', utilsModuleRatesDate);
        mirrorToLocalStorageConvert(ratesByBase);
        localStorage.setItem('ratesDate', JSON.stringify(utilsModuleRatesDate));
        prevTime = Date.now();
        localStorage.setItem('prevTime', JSON.stringify(prevTime));
      }
    } else {
      mirrorToLocalStorageConvert(LocalRatesByBaseBkUp);
      const ratesDateRestored = JSON.parse(localStorage.getItem('ratesDate'));
      console.log('ratesDateRestored', ratesDateRestored);
      ratesDateRestored ? (utilsModuleRatesDate = ratesDateRestored) : null;
      console.log(ratesDateRestored, utilsModuleRatesDate);
      localStorage.setItem('ratesDate', JSON.stringify(utilsModuleRatesDate));
      ratesByBase = LocalRatesByBaseBkUp;
      showWarningToast(
        `Refresh rate error: \n"${result.message}". \nUsing a rate from MM/DD/AA: ${utilsModuleRatesDate}`
      );
    }
  }
}
function restoreFromLocalStorageConvert() {
  const prevTimeLocal = localStorage.getItem('prevTime');
  if (prevTimeLocal) prevTime = JSON.parse(prevTimeLocal);
  console.log('restoring prevTime exchange refresh from Ls...', prevTime);
  const ratesDateLocal = localStorage.getItem('ratesDate');
  if (ratesDateLocal) utilsModuleRatesDate = JSON.parse(ratesDateLocal);
  console.log('restoring rates date from Ls...', ratesDateLocal);
  const exchangeRates = localStorage.getItem('exchangeRates');
  if (exchangeRates) {
    ratesByBase = JSON.parse(exchangeRates);
  }
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

  if (!toastTimes || (toastTimes && toastTimes < 4)) {
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
  if (tooltipTriggerList) {
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    );
    // if it needs to be showed manually
    await wait(500);

    tooltipList.forEach((el) => {
      if (el._config.trigger === 'manual') {
        el.show();
      }
    });
    return tooltipList;
  }
  return undefined;
}

async function createTooltipsFunct() {
  // cleaner tooltips
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
      saveClean('cleanLsButtonClick');
    },
    // because we refresh the page. IMPORTANT!
    { once: true }
  );
  // commingSoon tooltips
  const commingSoonTooltips = await createTooltips('.commingSoon');
}
// ---------------------------SAVE CLEAN-------------------------
function saveClean(str) {
  localStorage.clear();

  // call from login?
  if (str === 'login') {
    console.log(
      'LocalStorage cleared automatically so you can stay aware of new content😎'
    );
    localStorage.setItem('prevTimeCleared', JSON.stringify(Date.now()));
  }
  // exists some currency rates?
  if (prevTime) localStorage.setItem('prevTime', JSON.stringify(prevTime));
  if (ratesByBase) {
    mirrorToLocalStorageConvert(ratesByBase);
    localStorage.setItem('ratesDate', JSON.stringify(utilsModuleRatesDate));
  }

  // call from cleanLsButton click event handler
  if (str === 'cleanLsButtonClick') {
    // to backup prevTimeCleared wich is a variable from another scope.
    localStorage.setItem('prevTimeCleared', JSON.stringify(prevTimeCleared));
    alert('Local Storage Cleared manually');
  }
  // anyway
  window.location.reload();
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
  createTooltipsFunct,
  prevTime,
  ratesByBase,
  utilsModuleRatesDate as localRatesDate,
  mirrorToLocalStorageConvert,
  saveClean,
};
