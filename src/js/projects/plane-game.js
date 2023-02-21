const plane = document.querySelector('.plane');
let x = 0;
let y = 0;
const speed = 50;
let flippedy = true;
let rotate = 0;

/* eslint-disable*/
    function handleKeyDown(event) {
      if (!event.key.includes('Arrow')) { return; }
      /* eslint-enable */
  switch (event.key) {
    case 'ArrowUp':
      y -= 1;
      //   rotate = 90;
      break;
    case 'ArrowDown':
      y += 1;
      //   rotate = -90;
      break;
    case 'ArrowLeft':
      x -= 1;
      flippedy = false;
      rotate = 0;
      break;
    case 'ArrowRight':
      x += 1;
      flippedy = true;
      rotate = 0;
      break;
    default:
      console.log('that is not valid');
      break;
  }
  plane.setAttribute(
    'style',
    `
      --rotatey: ${flippedy ? '180deg' : '0'};
      --rotate: ${rotate}deg;
      --x: ${x * speed}px; 
      --y: ${y * speed}px;`
  ); // at once, I can insert all the css code into ``.
  /* other way */
  // turtle.style.setProperty('--x', `${x}px`); // needs two arguments, and just for one property
  /*eslint-disable*/
      plane.style['background'] = `hsla(${x + 1 + y}, 100%, 50%, 1)`;
      /* eslint-enable */
  /* OTHER WAYS */
  // turtle.style.background = `hsla(${x + 50 + y}, 100%, 50%, 1)`;
  // turtle.style.setProperty('background', `hsla(${x + 50 + y}, 100%, 50%, 1)`);
  // turtle.setAttribute('style', `background: hsla(${x + 50 + y}, 100%, 50%, 1)`);
}
export { handleKeyDown };
/* Yes!You can learn the basics of this code, with the (Bos)=> WesBos.😄🎮 */
