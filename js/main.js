import { getRandomData } from "./data.js";
import { renderPictureList } from "./render-minis.js";
import { renderFullscreen } from "./render-fullscreen.js";
import { renderUploadWindow } from "./upload-window-handler.js";
import { closeUploadWindow } from "./upload-window-handler.js";

const data = getRandomData(125);
renderPictureList(data);

window.addEventListener("click", (evt) => {
  console.log(evt.target.parentElement);
  if (evt.target.parentElement.className === 'picture') {
    renderFullscreen(data[evt.target.parentElement.id]);
  };
  window.addEventListener("click", (evt) => {
    console.log(evt.target);
    if (evt.target.id === 'picture-cancel' || evt.target.classList.contains('overlay')) {
      console.log('cancel');
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
