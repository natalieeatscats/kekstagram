const renderMessage = (template, t) => {
  const message = template.cloneNode(true);
  const fragment = new DocumentFragment();
  const target = document.querySelector('#main');
  fragment.append(message);
  target.append(fragment);
  setTimeout(t);
  target.removeChild(target.lastChild);
};

export { renderMessage };