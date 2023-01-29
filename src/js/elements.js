const modalInner = document.querySelector('.modal-inner');
const modalOuter = document.querySelector('.modal-outer');
const editableElements = Array.from(document.querySelectorAll('.edit-content'));
const editButtons = Array.from(document.querySelectorAll('.edit-button'));
const loginButtons = Array.from(document.querySelectorAll('.login'));
const changeImgInput = document.querySelector('#changeImg');
const imgsToChange = Array.from(document.querySelectorAll('.imgsToChange'));
const fromAmount = document.querySelector('[name="from_amount"]');
const toAmount = document.querySelector('.to_amount');
const refresh = document.querySelector('[name="refresh_rates"]');
const fromCurrecy = document.querySelector('[name="from_currency"]');
const toCurrency = document.querySelector('[name="to_currency"]');
const formCurrency = document.querySelector('.app form');
const imgClick = Array.from(document.querySelectorAll('img[role="button"]'));

export {
  modalInner,
  modalOuter,
  editableElements,
  editButtons,
  loginButtons,
  changeImgInput,
  imgsToChange,
  fromAmount,
  toAmount,
  refresh,
  fromCurrecy,
  toCurrency,
  formCurrency,
  imgClick,
};
