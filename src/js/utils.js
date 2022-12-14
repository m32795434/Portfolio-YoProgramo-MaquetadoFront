import { editableElements, imgsToChange } from './elements';

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
export { restoreFromLStorage, mirrorToLocalStorage, selectImg };
