const applyFilter = function (target, filter) {
  const image = target;
  image.className = '';
  image.classList.add(filter);
};

export { applyFilter };
