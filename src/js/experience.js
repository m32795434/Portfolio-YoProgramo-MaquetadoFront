import 'bootstrap/js/dist/dropdown.js';
import { Slider1 } from './slider.js';
import { manageLogin } from './loguin.js';
import { restoreFromLStorage } from './utils';
import { write } from './typer';

let myExperienceSlider;

if (window.visualViewport.width < 992) {
  myExperienceSlider = new Slider1(
    document.querySelector('.slider-experience')
  );
}
manageLogin();
restoreFromLStorage();
document.querySelectorAll('[data-type]').forEach(write);
function checkForResize() {
  if (window.visualViewport.width > 992 && myExperienceSlider) {
    myExperienceSlider = null;
    window.location.reload();
    console.log('null and reloaded!');
  } else if (window.visualViewport.width < 992 && !myExperienceSlider) {
    myExperienceSlider = new Slider1(
      document.querySelector('.slider-experience')
    );
  }
}
window.onresize = checkForResize;
