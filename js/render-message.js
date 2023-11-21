const renderMessage = (template, t) => {
  const message = template.content.cloneNode(true);
  const fragment = new DocumentFragment();
  const target = document.querySelector('#main');
  fragment.append(message);
  target.append(fragment);
  setTimeout(() => {
    target.removeChild(document.querySelector('#upload-message'));
  }, (t));

};

export { renderMessage };