// ---------------------------------------FACE-DETECTOR VARIABLES--------------------------
import { wait } from '../utils';

const video = document.querySelector('.webcamPlane');

let stream;
let faceDetector;

// -----------------------------------PLANEGAME VARIABLES

const plane = document.querySelector('#planeImg');
const planeShowButton = document.querySelector('[data-bs-target="#plane"]');
const planeCloseButton = document.querySelector('#plane [aria-label="Close"]');
const videoControls = document.querySelector('video');
const planeSpeedRange = Array.from(
  document.querySelectorAll('.planeSpeedRange')
);

let x = 0;
let y = 0;
const options = {
  positionX: 1,
  positionY: 1,
};
const flippedy = true;
// let rotate = 0;

// ----------------------------------FACE DETECTOR FUNCTIONS
async function streamFunction() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 360 },
    });
  } catch (err) {
    alert('You have to authorize the camera recording to use this app😄');
  }
}

async function createFaceDetector() {
  try {
    faceDetector = new window.FaceDetector();
  } catch (err) {
    alert(
      'You have to enable the Experimental Web Platform features to use the detection function. Go to "yourBrowser://flags" and enable!'
    );
  }
}
async function populateVideo() {
  video.srcObject = stream;
  await video.play();
}
/*
const move = ['Right', 'Up'];
let [tempX, tempY] = [0, 0];
*/
const planeHeight = plane.height;
const planeWidth = plane.width;
const windowHeight = window.visualViewport.height;
const windowWidth = window.visualViewport.width;
// const initPositionX = windowWidth / 2 - planeWidth / 2;
// const initPositionY = windowHeight / 2 - planeHeight / 2;
const initialY = 2500;
const initialX = 5000;

// plane.setAttribute('style', ``);
function handleOptions(e) {
  const { name } = e.target;
  const value = parseFloat(e.target.value);
  options[name] = value;
  // console.log('name', name, 'value', value);
}

async function detect() {
  let faces;
  try {
    faces = await faceDetector.detect(video); // this "detect" is a method from the faceDetector object, and throws an array of faces.
    for (const face of faces) {
      // when I move right-->x decrease, when I move up, y decrease
      const { width, height } = face.boundingBox;
      [x, y] = [face.boundingBox.x, face.boundingBox.y];
      const moveY = -(y + height / 2) * options.positionY;
      const moveX = -(x + width / 2) * options.positionX;
      // console.log('moveX', moveX);
      if (initialY + moveY > 1 && initialY + moveY < windowHeight - 1) {
        //  plane.setAttribute('style', `top:${initialY}px;--y:${moveY}px;`);
        plane.style.setProperty('top', `${initialY}px`);
        plane.style.setProperty('--y', `${moveY}px`);
      }
      if (initialX + moveX > 1 && initialX + moveX < windowWidth - 1) {
        // plane.setAttribute('style', `left:${initialX}px;--x:${moveX}px;`);
        plane.style.setProperty('left', `${initialX}px`);
        plane.style.setProperty('--x', `${moveX}px`);
      }
    }
  } catch (err) {
    console.log(err);
  }
  // ask the browser when the next animation frame is, and tell it to run "detect" for us.
  await wait(150);
  requestAnimationFrame(detect); // this performs better, but it could be just "detect();"
}

async function faceDPlaneAsyncinit() {
  await createFaceDetector();
  await streamFunction();
  await populateVideo();
  await detect();
}
// Yes! you can learn to codding this app with the (BOS)=>'WESBOS'😄🫡

// --------------------------------------------PLANEGAME FUNCTIONS

/* eslint-disable*/


// function handleMove(str) {
//       // if (!event.key.includes('Arrow')) { return; }
//       /* eslint-enable */
//   switch (str) {
//     case 'Up':
//       y -= 1;
//       console.log('Up');
//       //   rotate = 90;
//       break;
//     case 'Down':
//       y += 1;
//       console.log('Down');

//       //   rotate = -90;
//       break;
//     case 'Left':
//       x -= 1;
//       flippedy = false;
//       console.log('Left');
//       // rotate = 0;
//       break;
//     case 'Right':
//       x += 1;
//       flippedy = true;
//       console.log('Right');
//       // rotate = 0;
//       break;
//     default:
//       console.log('ups!🤔💭');
//       break;
//   }
//   plane.setAttribute(
//     'style',
//     `
//       --rotatey: ${flippedy ? '180deg' : '0'};
//       --x: ${x * speed}px;
//     --y: ${y * speed}px;`
//   );
// }
planeSpeedRange.forEach((el)=>el.addEventListener('input',handleOptions))
export {
  // handleKeyDown,
  planeShowButton,
  planeCloseButton,
  videoControls,
  faceDPlaneAsyncinit,
};
/* Yes!You can learn the basics of this code, with the (Bos)=> WesBos.😄🎮 */
