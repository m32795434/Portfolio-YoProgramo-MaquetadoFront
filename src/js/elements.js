const modalInner = document.querySelector('.modal-inner');
const modalOuter = document.querySelector('.modal-outer');
const editableElements = Array.from(document.querySelectorAll('.edit-content'));
const editButtons = Array.from(document.querySelectorAll('.edit-button'));
const loginButtons = Array.from(document.querySelectorAll('.login'));
const changeImgInput = document.querySelector('#changeImg');
const imgsToChange = Array.from(document.querySelectorAll('.imgsToChange'));
export {
  modalInner,
  modalOuter,
  editableElements,
  editButtons,
  loginButtons,
  changeImgInput,
  imgsToChange,
};
