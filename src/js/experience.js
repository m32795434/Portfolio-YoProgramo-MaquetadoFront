import 'bootstrap/js/dist/dropdown.js';
import { Slider1 } from './slider.js';
import { manageLogin } from './loguin.js';
import {
  cleanTooltipsFunct,
  imgEventHandler,
  restoreFromLStorage,
} from './utils';
import { write } from './typer';
import { imgClick } from './elements.js';

let myExperienceSlider;
let widthViewPort = window.visualViewport.width;

if (widthViewPort < 975.2) {
  myExperienceSlider = new Slider1(
    document.querySelector('.slider-experience')
  );
}
manageLogin();
restoreFromLStorage();

function checkForResize() {
  widthViewPort = window.visualViewport.width;
  if (widthViewPort > 975.2 && myExperienceSlider) {
    window.location.reload();
  } else if (widthViewPort < 975.2 && !myExperienceSlider) {
    window.location.reload();
  }
}
window.onresize = checkForResize;

// ------------------------Async Typer------------------------

document.querySelectorAll('[data-type]').forEach(write);

// --------------------------imgEventHandler--------------------------
imgClick.forEach((el) => {
  el.addEventListener('click', imgEventHandler);
  el.addEventListener('keyup', imgEventHandler);
});

// --------------------------TOOLTIPS--------------------------
cleanTooltipsFunct();
