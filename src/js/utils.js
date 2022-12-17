import { editableElements } from './elements';

let reducedEditables;

function wait(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

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
async function selectImg(el) {
  await wait(5000);
  const file = el.files[0];
  console.log(file);
  // const reader = new FileReader();
  // reader.readAsText(file);
  // reader.onload = function () {
  // const { result } = reader;
  // console.log(result);
  // };
  // reader.onerror = function () {
  //   console.log(reader.erorr);
  // };
}
export { restoreFromLStorage, mirrorToLocalStorage, selectImg };
