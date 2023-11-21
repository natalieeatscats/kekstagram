/* global noUiSlider:readonly */
import { getRandomData } from './data.js';
import { renderPictureList } from './render-minis.js';
import { renderFullscreen } from './render-fullscreen.js';
import { renderUploadWindow } from './upload-window-handler.js';
import { closeUploadWindow } from './upload-window-handler.js';
import { valueController } from './util.js';
import { applyFilter } from './apply-filter.js';
import { isValidHashtagField } from './validate-hashtags.js';
import { createFetch } from './api.js';
import { renderMessage } from './render-message.js';


const picturesData = createFetch(renderPictureList)

// let picturesData = getRandomData(15);

// const fetchData = createFetch(
//   (data) => {
//     picturesData = data;
//     renderPictureList(picturesData);
//   },
//   (err) => {
//     console.warn(err);
//   },
//   'GET'
// );
// fetchData();

window.addEventListener('click', (evt) => {
  if (evt.target.parentElement.className === 'picture') {
    renderFullscreen(picturesData[evt.target.parentElement.id]);
  }
  window.addEventListener('click', (evt) => {
    if (
      evt.target.id === 'picture-cancel' ||
      evt.target.classList.contains('overlay')
    ) {
      const view = document.querySelector('.big-picture');
      const socialCommentsCount = view.querySelector('.social__comment-count');
      const commentsLoader = view.querySelector('.comments-loader');
      const body = document.querySelector('body');
      view.classList.add('hidden');
      socialCommentsCount.classList.remove('hidden');
      commentsLoader.classList.remove('hidden');
      body.classList.remove('modal-open');
    }
  });
});

window.addEventListener('change', (evt) => {
  if (evt.target.id === 'upload-file') {
    renderUploadWindow();
    window.addEventListener('click', (evt) => {
      if (
        evt.target.id === 'upload-cancel' ||
        evt.target.classList.contains('img-upload__overlay')
      ) {
        closeUploadWindow();
      }
    });
  }
});

const scalePlus = document.querySelector('#scale-plus');
const scaleMinus = document.querySelector('#scale-minus');
const imagePreview = document.querySelector('#img-preview');

scalePlus.addEventListener('click', () => {
  const step = 25;
  const scaleValue = document.querySelector('.scale__control--value');
  scaleValue.value = valueController(scaleValue.value, step, 25, 100);
  let setScale = scaleValue.value / 100;
  const imagePreview = document.querySelector('#img-preview');
  let styleValue = 'transform: scale(' + setScale + ')';
  imagePreview.setAttribute('style', styleValue);
});

scaleMinus.addEventListener('click', () => {
  const step = 25;
  const scaleValue = document.querySelector('.scale__control--value');
  scaleValue.value = valueController(scaleValue.value, -step, 25, 100);
  let setScale = scaleValue.value / 100;

  let styleValue = 'transform: scale(' + setScale + ')';
  imagePreview.setAttribute('style', styleValue);
});

const sliderElement = document.querySelector('#effect-slider');
noUiSlider.create(sliderElement, {
  start: [20],
  connect: 'lower',
  range: {
    min: 0,
    max: 100,
  },
});

window.addEventListener('click', (evt) => {
  if (evt.target.name === 'effect') {
    let selectedEffect = document.querySelector(
      'input[name="effect"]:checked'
    ).value;
    if (selectedEffect != 'none') {
      let effectClass = 'effects__preview--' + selectedEffect;
      switch (selectedEffect) {
        case 'grayscale':
          sliderElement.noUiSlider.destroy();
          noUiSlider.create(sliderElement, {
            start: 0,

            range: {
              min: 0,
              max: 1,
            },

            step: 0.1,
          });
          break;
        case 'sepia':
          sliderElement.noUiSlider.destroy();
          noUiSlider.create(sliderElement, {
            start: 0,

            range: {
              min: 0,
              max: 1,
            },

            step: 0.1,
          });
          break;
        case 'invert':
          sliderElement.noUiSlider.destroy();
          noUiSlider.create(sliderElement, {
            start: 0,

            range: {
              min: 0,
              max: 100,
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
              min: 0,
              max: 3,
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
              min: 1,
              max: 3,
            },

            step: 0.1,
          });
          break;
      }
      sliderElement.noUiSlider.on('update', () => {
        let sliderValue = sliderElement.noUiSlider.get();
        imagePreview.setAttribute(
          'style',
          `filter: ${selectedEffect}(${sliderValue})`
        );
      });
      applyFilter(imagePreview, effectClass);
    } else {
      imagePreview.className = '';
      sliderElement.noUiSlider.destroy();
    }
  }
});

const uploadHashtags = document.querySelector('#hashtags');

uploadHashtags.addEventListener('input', () => {
  let hashtags = uploadHashtags.value;
  if (isValidHashtagField(hashtags) != '') {
    uploadHashtags.setAttribute('style', 'border: 2px red solid');
  } else {
    uploadHashtags.setAttribute('style', '');
  }
  uploadHashtags.setCustomValidity(isValidHashtagField(hashtags));
  uploadHashtags.reportValidity();
});

const uploadForm = document.querySelector('#upload-select-image');
const uploadButton = document.querySelector('#upload-submit');
const successMessage = document.querySelector('#success');
const errorMessage = document.querySelector('#error');

const onSuccess = () => {
  uploadForm.reset();
  closeUploadWindow();
  renderMessage(successMessage, 2000);
};

const onError = () => {
  uploadForm.reset();
  closeUploadWindow();
  renderMessage(errorMessage, 2000);
}

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let formData = new FormData(uploadForm)
  switch (formData.get('effect')) {
    case 'grayscale':
      formData.set('effect', 'chrome');
      break;
    case 'sepia':
      break;
    case 'invert':
      formData.set('effect', 'marvin');
      break;
    case 'blur':
      formData.set('effect', 'phobos');
      break;
    case 'brightness':
      formData.set('effect', 'heat');
  };
  console.log(formData);
  createFetch(onSuccess, onError, 'POST', formData);
});
