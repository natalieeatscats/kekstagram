import { getRandomData } from "./data.js";
import { renderPictureList } from "./render-minis.js";
import { renderFullscreen } from "./render-fullscreen.js";
import { renderUploadWindow } from "./upload-window-handler.js";
import { closeUploadWindow } from "./upload-window-handler.js";
import { valueController } from "./util.js";

const data = getRandomData(125);
renderPictureList(data);

window.addEventListener('click', (evt) => {
  // console.log(evt.target.parentElement);
  if (evt.target.parentElement.className === 'picture') {
    renderFullscreen(data[evt.target.parentElement.id]);
  };
  window.addEventListener('click', (evt) => {
    // console.log(evt.target);
    if (evt.target.id === 'picture-cancel' || evt.target.classList.contains('overlay')) {
      // console.log('cancel');
      const view = document.querySelector('.big-picture');
      const socialCommentsCount = view.querySelector('.social__comment-count');
      const commentsLoader = view.querySelector('.comments-loader');
      const body = document.querySelector('body');
      view.classList.add('hidden');
      socialCommentsCount.classList.remove('hidden');
      commentsLoader.classList.remove('hidden');
      body.classList.remove('modal-open');
    }
  })
});

window.addEventListener('change', (evt) => {
  if (evt.target.id === 'upload-file') {
    renderUploadWindow();
    window.addEventListener('click', (evt) => {
      if (evt.target.id === 'upload-cancel' || evt.target.classList.contains('img-upload__overlay')) {
        closeUploadWindow();
      }
    })
  }
});

const scalePlus = document.querySelector('#scale-plus');
const scaleMinus = document.querySelector('#scale-minus');
const scaleDefault = 55;

scalePlus.addEventListener('click', (evt) => {
  const step = 25;
  const scaleValue = document.querySelector('.scale__control--value');
  console.log(scaleValue.value);
  scaleValue.value = valueController(scaleValue.value, step, 25, 100);
  console.log(scaleValue.value);
  let setScale = scaleValue.value / 100;
  const imagePreview = document.querySelector('#img-preview');
  console.log(imagePreview);
  let styleValue = ('transform: scale(' + setScale + ')');
  imagePreview.setAttribute('style', styleValue);

})

scaleMinus.addEventListener('click', (evt) => {
  const step = 25;
  const scaleValue = document.querySelector('.scale__control--value');
  console.log(scaleValue.value);
  scaleValue.value = valueController(scaleValue.value, -step, 25, 100);
  console.log(scaleValue.value);
  let setScale = scaleValue.value / 100;
  const imagePreview = document.querySelector('#img-preview');
  console.log(imagePreview);
  let styleValue = ('transform: scale(' + setScale + ')');
  imagePreview.setAttribute('style', styleValue);

})

