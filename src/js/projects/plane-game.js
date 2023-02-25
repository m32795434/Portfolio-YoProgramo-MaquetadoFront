// ---------------------------------------FACE-DETECTOR VARIABLES--------------------------

const video = document.querySelector('.webcamPlane');
// const videoCanvas = document.querySelector('.videoCanvasPlane');
// const ctx = videoCanvas.getContext('2d');
// const faceCanvas = document.querySelector('.facePlane'); // it will store the DRAW of the small face, and then draw it in a normal size
// const faceCtx = faceCanvas.getContext('2d');

// const optionsInputs = document.querySelectorAll(
//   '.controls input[type="range"]'
// );
// const options = {
//   SIZE: 10,
//   SCALE: 1.35,
// };
let stream;
let faceDetector;

// -----------------------------------PLANEGAME VARIABLES

const plane = document.querySelector('.plane');
const planeShowButton = document.querySelector('[data-bs-target="#plane"]');
const planeCloseButton = document.querySelector('#plane [aria-label="Close"]');
const videoControls = document.querySelector('video');
// const x = 0;
// const y = 0;
// const speed = 50;
// const flippedy = true;
// const rotate = 0;
let topPlane;
let leftPlane;

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

// function handleOption(event) {
//   const { name, value } = event.currentTarget; // the NAME and the VALUE of the input
//   // console.log(name, value);
//   options[name] = parseFloat(value);
// }
// optionsInputs.forEach((input) => {
//   input.addEventListener('input', handleOption);
// });

async function createFaceDetector() {
  try {
    faceDetector = new window.FaceDetector();
    // console.log(faceDetector);
  } catch (err) {
    alert(
      'You have to enable the Experimental Web Platform features to use the detection function. Go to "yourBrowser://flags" and enable!'
    );
  }
}
async function populateVideo() {
  video.srcObject = stream;
  await video.play();
  // size the canvases to be the same size as the video
  // console.log(video.videoWidth, video.videoHeight);
  // videoCanvas.height = video.videoHeight;
  // videoCanvas.width = video.videoWidth;
  // faceCanvas.height = video.videoHeight;
  // faceCanvas.width = video.videoWidth;
}

// function drawFace(face) {
//   const { width, height, top, left } = face.boundingBox;
//   [leftPlane, topPlane] = [left, top];
//   console.log(leftPlane, topPlane);
//   // console.log({ width, height, top, left });
//   ctx.clearRect(0, 0, videoCanvas.width, videoCanvas.height);
//   ctx.strokeStyle = '#ffc600';
//   ctx.lineWidth = 2;
//   ctx.strokeRect(left, top, width, height); // paint the rectangle
// }
function censor({ boundingBox: face }) {
  // faceCtx.imageSmoothingEnabled = false;
  // faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  // draw the small face
  // faceCtx.drawImage(
  //   // 5 source args
  //   video, // source image
  //   face.x, // where do we start to pull from
  //   face.y,
  //   face.width,
  //   face.height,
  //   // 4 draw args
  //   face.x, // where do we start to draw
  //   face.y,
  //   options.SIZE,
  //   options.SIZE
  // );
  // const width = face.width * options.SCALE;
  // const height = face.height * options.SCALE;
  // take that face back out and draw it back at normal size
  // faceCtx.drawImage(
  //   faceCanvas, // the source image is in the canvas, not in the context
  //   face.x, // where we start
  //   face.y,
  //   options.SIZE, // width and height
  //   options.SIZE,
  //   // DRAWING ARGS
  //   face.x - (width - face.width) / 2,
  //   face.y - (height - face.height) / 2,
  //   width,
  //   height
  // );
}
async function detect() {
  let faces;
  try {
    faces = await faceDetector.detect(video); // this "detect" is a method from the faceDetector object, and throws an array of faces.
    faces.forEach((face) => {
      const { top, left } = face.boundingBox;
      [leftPlane, topPlane] = [left, top];
      console.log('leftPlane', leftPlane, 'topPlane', topPlane);
      plane.setAttribute(
        'style',
        `
          --x: ${leftPlane}px;
          --y: ${topPlane}px;`
      );
    });
    // faces.forEach(drawFace);
    // faces.forEach(censor);
  } catch (err) {
    console.log(err);
  }
  // ask the browser when the next animation frame is, and tell it to run "detect" for us.
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
/*
    function handleKeyDown(event) {
      // if (!event.key.includes('Arrow')) { return; }
      /* eslint-enable *//*
  switch (event.key) {
    case 'Escape':
      planeCloseButton.click();
      break;
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
  } // y * speed x * speed
  plane.setAttribute(
    'style',
    `
      --rotatey: ${flippedy ? '180deg' : '0'};
      --rotate: ${rotate}deg;
      --x: ${topPlane}px;
      --y: ${leftPlane}px;`
  );
}*/


export {
  // handleKeyDown,
  planeShowButton,
  planeCloseButton,
  videoControls,
  faceDPlaneAsyncinit,
};
/* Yes!You can learn the basics of this code, with the (Bos)=> WesBos.😄🎮 */
