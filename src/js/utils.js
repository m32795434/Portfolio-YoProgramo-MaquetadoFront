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

let reducedEditables;

function wait(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

function editableContentsReducer(arr) {
  const reduced = arr.reduce((contentObj, currentEl) => {
    if (currentEl.tagName === 'IMG') {
      console.log(`saving the content of an IMG`);
      contentObj[currentEl.id] = currentEl.src;
    } else if (currentEl.tagName === 'P' || currentEl.tagName.includes('H')) {
      console.log(`saving the content of a ${currentEl.tagName}`);
      contentObj[currentEl.id] = currentEl.innerText;
    }
    return contentObj;
  }, {});
  return reduced;
}

function mirrorToLocalStorage() {
  const { title } = document;
  reducedEditables = editableContentsReducer(editableElements);
  console.log(title);
  switch (title) {
    case 'Home':
      localStorage.setItem('Home', JSON.stringify(reducedEditables));
      break;
    case 'Experience':
      localStorage.setItem('Experience', JSON.stringify(reducedEditables));
      break;
    default:
      break;
  }
}
function restoreFromLStorage() {
  const { title } = document;
  const elsContent = JSON.parse(localStorage.getItem(title));
  if (!elsContent) {
    mirrorToLocalStorage();
  } else {
    editableElements.forEach((el) => {
      if (el.tagName === 'IMG') {
        console.log(`restoring the content of an IMG`);
        el.src = elsContent[el.id];
      } else if (el.tagName === 'P' || el.tagName.includes('H')) {
        console.log(`restoring the content of a ${el.tagName}`);
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
};
