import 'bootstrap/js/dist/dropdown.js';
import Toast from 'bootstrap/js/dist/toast.js';

// import popover from 'bootstrap/js/dist/popover.js';
import { Slider1 } from './slider.js';
import { manageLogin } from './loguin.js';
import {
  restoreFromLStorage,
  imgEventHandler,
  checkForToasts,
  createTooltips,
} from './utils';
import { write } from './typer';
import { imgClick } from './elements';

/*
const popers = document.querySelectorAll('[data-bs-toggle="popover"]');
Array.from(popers).forEach((pop)=>new bootstrap.Popover(pop));

/*
import '../../node_modules/bootstrap/js/dist/button';

import popover from '../../node_modules/bootstrap/js/dist/popover.js';
const popers = document.querySelectorAll('[data-bs-toggle="popover"]');
Array.from(popers).forEach((pop)=>new popover(pop));
*/

/*
import {Popover} from 'bootstrap';
const popers = document.querySelectorAll('[data-bs-toggle="popover"]');
Array.from(popers).forEach((pop)=>{
    new Popover(pop)
})
*/
/*
const imgHome = document.querySelector('main>img');
if (window.visualViewport.width >= 768) {
  imgHome.src = '/home-md-1920.png';
}
function handleResize(e) {
  if (e.currentTarget.visualViewport.width >= 768) {
    imgHome.src = '/home-md-1920.png';
  } else {
    imgHome.src = '/home-mobile.41469544.png';
  }
}
window.addEventListener('resize', handleResize);
*/

// -------------------------SLIDER!---------------------------

const myHomeSlider = new Slider1(document.querySelector('.home-slider'));
manageLogin();
restoreFromLStorage();
document.querySelectorAll('[data-type]').forEach(write);

// --------------------------imgEventHandler--------------------------
imgClick.forEach((el) => {
  el.addEventListener('click', imgEventHandler);
  el.addEventListener('keyup', imgEventHandler);
});

// --------------------------TOASTS--------------------------

checkForToasts();

// --------------------------TOOLTIPS--------------------------
(async function cleanTooltipsFunct() {
  const cleanTooltips = await createTooltips('.cleanLs');
  cleanTooltips.forEach((el) => {
    el.tip.addEventListener('click', () => {
      el.hide();
    });
  });
})();

document.querySelector('.cleanLs').addEventListener('click', () => {
  localStorage.clear();
  alert('Local Storage Cleared');
  window.location.reload();
});
