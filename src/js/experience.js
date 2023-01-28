import 'bootstrap/js/dist/dropdown.js';
import { Slider1 } from './slider.js';
import { manageLogin } from './loguin.js';
import { restoreFromLStorage } from './utils';
import { write } from './typer';

let myExperienceSlider;
let widthViewPort = window.visualViewport.width;

if (widthViewPort < 992) {
  myExperienceSlider = new Slider1(
    document.querySelector('.slider-experience')
  );
}
manageLogin();
restoreFromLStorage();
document.querySelectorAll('[data-type]').forEach(write);
function checkForResize() {
  widthViewPort = window.visualViewport.width;
  if (widthViewPort > 992 && myExperienceSlider) {
    window.location.reload();
  } else if (widthViewPort < 992 && !myExperienceSlider) {
    window.location.reload();
  }
}
window.onresize = checkForResize;
