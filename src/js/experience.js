import dropdown from 'bootstrap/js/dist/dropdown.js';
import { Slider1 } from './slider.js';
import { manageLogin } from './loguin.js';

let myExperienceSlider;

if (window.visualViewport.width < 992) {
  myExperienceSlider = new Slider1(
    document.querySelector('.slider-experience')
  );
}
manageLogin();
