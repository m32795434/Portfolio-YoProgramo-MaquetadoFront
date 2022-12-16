import 'bootstrap/js/dist/dropdown.js';
// import popover from 'bootstrap/js/dist/popover.js';
import { Slider1 } from './slider.js';
import { manageLogin } from './loguin.js';
import { restoreFromLStorage } from './utils';
import { editableElements } from './elements.js';
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
