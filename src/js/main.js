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
class Slider {
  constructor(slider) {
    if (!slider || !(slider instanceof Element)) {
      throw new Error('Sldier not found or not an Element');
    }
    /*eslint-disable*/
    this.slider = slider;
    this.slides = this.slider.querySelector('.slides');
    this.play = this.slider.querySelector('#play_pause');
    const prevButton = this.slider.querySelector('#skip_previous');
    const nextButton = this.slider.querySelector('#skip_next');
    this.current =
    (this.slider.querySelector('.current') || this.slides.firstElementChild);
    this.next =
    (this.current.nextElementSibling || this.slides.firstElementChild);
    this.prev =
    (this.current.previousElementSibling || this.slides.lastElementChild);
    /* eslint-enable */
    // bindings
    this.move = this.move.bind(this);
    this.playPauseFunction = this.playPauseFunction.bind(this);

    prevButton.addEventListener('click', () => this.move('back'));
    nextButton.addEventListener('click', this.move);
    this.play.addEventListener('click', (e) =>
      this.playPauseFunction(e.target)
    );

    this.applyClasses();
    this.playPauseFunction(this.play);
  }

  applyClasses() {
    this.current.classList.add('current');
    this.prev.classList.add('prev');
    this.next.classList.add('next');
  }

  move(direction = '') {
    const classesToRemove = ['current', 'prev', 'next'];
    [this.current, this.prev, this.next].forEach((el) => {
      el.classList.remove(...classesToRemove);
    });
    if (direction === 'back') {
      [this.prev, this.current, this.next] = [
        this.prev.previousElementSibling || this.slides.lastElementChild,
        this.prev,
        this.current,
      ];
    } else {
      [this.prev, this.current, this.next] = [
        this.current,
        this.next,
        this.next.nextElementSibling || this.slides.firstElementChild,
      ];
    }
    this.applyClasses();
  }

  playPauseFunction(t) {
    t.classList.toggle('open1');
    if (t.matches('.open1')) {
      this.running = setInterval(() => {
        this.move();
      }, 4000);
    } else {
      clearInterval(this.running);
    }
  }
}
const mySlider = new Slider(document.querySelector('.slider-experience'));
