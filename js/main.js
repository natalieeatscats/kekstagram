/* global noUiSlider:readonly */
import { getRandomData } from "./data.js";
import { renderPictureList } from "./render-minis.js";
import { renderFullscreen } from "./render-fullscreen.js";
import { renderUploadWindow } from "./upload-window-handler.js";
import { closeUploadWindow } from "./upload-window-handler.js";
import { valueController } from "./util.js";
import { applyFilter } from "./apply-filter.js";


console.log(noUiSlider);

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
const imagePreview = document.querySelector('#img-preview');
console.log(imagePreview);

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

  let styleValue = ('transform: scale(' + setScale + ')');
  imagePreview.setAttribute('style', styleValue);

})

const sliderElement = document.querySelector('#effect-slider');
console.log(sliderElement);
noUiSlider.create(sliderElement, {
  start: [20],
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  },
});

window.addEventListener('click', (evt) => {
  if (evt.target.name === 'effect') {
    let selectedEffect = document.querySelector('input[name="effect"]:checked').value;
    if (selectedEffect != 'none') {
      let effectClass = ('effects__preview--' + selectedEffect);
      switch (selectedEffect) {
        case 'grayscale':
          sliderElement.noUiSlider.destroy();
          noUiSlider.create(sliderElement, {

            start: 0,

            range: {
              'min': 0,
              'max': 1
            },

            step: 0.1

          });
          break;
        case 'sepia':
          sliderElement.noUiSlider.destroy();
          noUiSlider.create(sliderElement, {

            start: 0,

            range: {
              'min': 0,
              'max': 1
            },

            step: 0.1

          });
          break;
        case 'invert':
          sliderElement.noUiSlider.destroy();
          noUiSlider.create(sliderElement, {

            start: 0,

            range: {
              'min': 0,
              'max': 100
            },

            step: 1,

            format: {
              to: function (value) {
                return value + '%';
              },
              from: function (value) {
                return value;
              },
            },

          });
          break;
        case 'blur':
          sliderElement.noUiSlider.destroy();
          noUiSlider.create(sliderElement, {

            start: 0,

            range: {
              'min': 0,
              'max': 3
            },

            step: 0.1,

            format: {
              to: function (value) {
                return value + 'px';
              },
              from: function (value) {
                return value;
              },
            },

          });
          break;
        case 'brightness':
          sliderElement.noUiSlider.destroy();
          noUiSlider.create(sliderElement, {

            start: 1,

            range: {
              'min': 1,
              'max': 3
            },

            step: 0.1

          });
          break;
      }
      sliderElement.noUiSlider.on('update', () => {
        let sliderValue = sliderElement.noUiSlider.get();
        imagePreview.setAttribute('style', `filter: ${selectedEffect}(${sliderValue})`);
      })
      console.log(effectClass);
      applyFilter(imagePreview, effectClass);
    } else {
      console.log('return');
      imagePreview.className = '';
      sliderElement.noUiSlider.destroy();
    }
  }
})

