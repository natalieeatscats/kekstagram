const uploadWindow = document.querySelector('.img-upload__overlay');

const renderUploadWindow = function () {
  uploadWindow.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const closeUploadWindow = function () {
  uploadWindow.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

export { renderUploadWindow }
export { closeUploadWindow }
