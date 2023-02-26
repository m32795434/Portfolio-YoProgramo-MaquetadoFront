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
const speedTag = document.querySelector('input#speed');

let x = 0;
let y = 0;
let speed = 1;
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
const initPositionX = windowWidth / 2 - planeWidth / 2;
const initPositionY = windowHeight / 2 - planeHeight / 2;
plane.setAttribute(
  'style',
  `--initialY:${initPositionY}px; --initialX:${initPositionX}px`
);

async function detect() {
  let faces;
  try {
    faces = await faceDetector.detect(video); // this "detect" is a method from the faceDetector object, and throws an array of faces.
    for (const face of faces) {
      // when I move right-->x decrease, when I move up, y decrease
      const { width, height } = face.boundingBox;
      [x, y] = [face.boundingBox.x, face.boundingBox.y];
      plane.setAttribute(
        'style',
        `
        --x: ${(x + width / 2) * speed}px;
        --y: ${(y + height / 2) * speed}px;`
      );
      // --rotatey: ${flippedy ? '180deg' : '0'};
      /* if (xDetect > tempX) {
        handleMove('Left');
        move[0] = 'Left';
      } else if (xDetect < tempX) {
        handleMove('Right');
        move[0] = 'Right';
        // we recive the same value
      } else if (move[0] === 'Left') {
        handleMove('Left');
      } else {
        handleMove('Right');
      }
      if (yDetect > tempY) {
        handleMove('Down');
        move[1] = 'Down';
      } else if (yDetect < tempY) {
        handleMove('Up');
        move[1] = 'Up';
      } else if (move[1] === 'Down') {
        handleMove('Down');
      } else {
        handleMove('Up');
      }
      tempX = xDetect;
      tempY = yDetect; */
    }
  } catch (err) {
    console.log(err);
  }
  // ask the browser when the next animation frame is, and tell it to run "detect" for us.
  // await wait(2000);
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
speedTag.addEventListener('input', (e) => {
  speed = parseFloat(e.target.value);
  console.log('speed:..', speed);
});
export {
  // handleKeyDown,
  planeShowButton,
  planeCloseButton,
  videoControls,
  faceDPlaneAsyncinit,
};
/* Yes!You can learn the basics of this code, with the (Bos)=> WesBos.😄🎮 */
