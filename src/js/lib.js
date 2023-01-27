import { fromAmount, toAmount, fromCurrecy, toCurrency } from './elements.js';
import { formatCurrency } from './utils.js';

let ratesByBase = {};
const endPoint = 'https://api.apilayer.com/exchangerates_data';

function mirrorToLocalStorageConvert(object) {
  localStorage.setItem('exchangeRates', JSON.stringify(object));
}

export async function fetchRates(base = 'USD') {
  const res = await fetch(`${endPoint}/latest?base=${base}`, {
    headers: { apikey: 'your api key😁' },
  });
  ratesByBase = (await res.json()).rates;
  mirrorToLocalStorageConvert(ratesByBase);
}
export function restoreFromLocalStorageConvert() {
  const exchangeRates = localStorage.getItem('exchangeRates');
  if (exchangeRates) {
    ratesByBase = JSON.parse(exchangeRates);
    return;
  }
  fetchRates();
}

export function convert() {
  const amount = fromAmount.value;
  const from = fromCurrecy.value;
  const to = toCurrency.value;
  const calcAmount = (amount * ratesByBase[to]) / ratesByBase[from];
  toAmount.textContent = formatCurrency(calcAmount, to);
}
