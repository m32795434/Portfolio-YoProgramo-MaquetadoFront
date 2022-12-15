import { editableElements } from './elements';

let reducedEditables;

function editableTextsReducer(arr) {
  const reduced = arr.reduce((textObj, currentEl) => {
    textObj[currentEl.id] = currentEl.innerText;
    return textObj;
  }, {});
  return reduced;
}

function mirrorToLocalStorage() {
  const { title } = document;
  reducedEditables = editableTextsReducer(editableElements);
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
  const elsInnerText = JSON.parse(localStorage.getItem(title));
  if (!elsInnerText) {
    mirrorToLocalStorage();
  } else {
    editableElements.forEach((el) => {
      el.innerText = elsInnerText[el.id];
    });
  }
}
export { restoreFromLStorage, mirrorToLocalStorage };
