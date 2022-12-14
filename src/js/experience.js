import dropdown from 'bootstrap/js/dist/dropdown.js';
import { Slider1 } from './libraries.js';

let myExperienceSlider;

if (window.visualViewport.width < 992) {
  myExperienceSlider = new Slider1(
    document.querySelector('.slider-experience')
  );
}
