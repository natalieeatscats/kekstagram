const getDataFromMini = function (id) {
  return data[id];
}


const renderFullscreen = function (data) {
  const view = document.querySelector('.big-picture');
  view.classList.remove('hidden');
  const image = view.querySelector('.big-picture__img');
  image.querySelector('img').src = data.url;
  const likes = view.querySelector('.likes-count');
  likes.textContent = data.likes;
  const commentsCount = view.querySelector('.comments-count');
  commentsCount.textContent = data.comments.length;
  const comments = view.querySelector('.social__comments');
  const fragment = new DocumentFragment();
  for (let i = 0; i < data.comments.length; i++) {

    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    const commentPfp = document.createElement('img');
    commentPfp.classList.add('social__picture');
    commentPfp.src = data.comments[i].avatar;
    commentPfp.alt = data.comments[i].name;
    commentPfp.width = 35;
    commentPfp.height = 35;
    comment.appendChild(commentPfp);
    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = data.comments[i].message;
    comment.appendChild(commentText);
    fragment.append(comment);
  };
  comments.replaceChildren(fragment);
  const desc = view.querySelector('.social__caption');
  desc.textContent = data.description;
  console.log(data.description);
  const socialCommentsCount = view.querySelector('.social__comment-count');
  socialCommentsCount.classList.add('hidden');
  const commentsLoader = view.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');
  const body = document.querySelector('body');
  body.classList.add('modal-open');
};

export { renderFullscreen };
export { getDataFromMini };
