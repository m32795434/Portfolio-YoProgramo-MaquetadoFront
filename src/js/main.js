import bootstrap from 'bootstrap/dist/js/bootstrap.min';
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

const imgHome = document.querySelector('main>img');
if (window.visualViewport.width >= 768) {
  imgHome.src = './home-md-1920.c416b6a5.png';
}
function handleResize(e) {
  if (e.currentTarget.visualViewport.width >= 768) {
    imgHome.src = './home-md-1920.c416b6a5.png';
  } else {
    imgHome.src = '/home-mobile.41469544.png';
  }
}
window.addEventListener('resize', handleResize);