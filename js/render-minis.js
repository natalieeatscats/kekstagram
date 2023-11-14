// const renderPicture = function (picture) {
//   let post = document.createElement('article');
//   post.classList.add('picture');
//   let image = document.createElement('img');
//   image.src = picture.url;
//   image.classList.add('picture__img');
//   post.appendChild(image);
//   let likes = document.createElement('span');
//   likes.textContent = picture.likes;
//   likes.classList.add('picture__likes');
//   post.appendChild(likes);
//   let comments = document.createElement('span');
//   comments.textContent = picture.comments.length;
//   comments.classList.add('picture__comments');
//   post.appendChild(comments);
//   return post;
// };

const renderPicture = function (picture) {
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const post = template.cloneNode(true);
  post.querySelector('.picture__img').src = picture.url;
  post.querySelector('.picture__likes').textContent = picture.likes;
  post.querySelector('.picture__comments').textContent = picture.comments.length;
  return post;
};

const renderPictureList = function (data) {
  console.log(data)
  const fragment = new DocumentFragment();
  for (let i = 0; i < data.length; i++) {
    let picture = renderPicture(data[i]);
    picture.id = i;
    fragment.append(picture);
  };
  let target = document.querySelector('.pictures');
  target.append(fragment);
};

export { renderPictureList };
