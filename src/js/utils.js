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
// function showFile(input) {
//   console.log(input);
//   console.log(input.files);
//   const file = input.files[0];
//   alert(`file name:  ${file.name}`);
//   alert(`file lastModified:  ${file.lastModified}`);

//   const reader = new FileReader();
//   reader.readAsText(file);
//   reader.onload = function () {
//     const { result } = reader;
//     console.log(result);
//     const h1Home = editableElements.find((el) => (el.id = 'h1Home'));
//     h1Home.innerText = result;
//   };
//   reader.onerror = function () {
//     console.log(reader.erorr);
//   };
// }
export { restoreFromLStorage, mirrorToLocalStorage };
