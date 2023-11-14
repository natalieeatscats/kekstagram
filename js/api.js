import { getRandomData } from './data.js';

const DEFAULT_VALUES = getRandomData(15);

const Urls = {
  GET: 'https://23.javascript.pages.academy/kekstagram/data',
  POST: 'https://23.javascript.pages.academy/kekstagram',
};
const createFetch = async (onSuccess, onError, method = 'GET', data) => {
  console.log(data)
  const res = await fetch(Urls[method], {
    method,
    data,
    credentials: 'same-origin',
  })
  if (res.ok) {
    const data = await res.json()
    onSuccess(data)
    return data
  }
  console.error(`${res.status} ${res.statusText}`);
  if (typeof onError === 'function') {
    onError()
  }
  return DEFAULT_VALUES

  // .then((response) => {
  //   if (response.ok) {
  //     return response.json();
  //   }

  //   throw new Error(`${response.status} ${response.statusText}`);
  // })
  // // .then((json) => {
  // //   onSuccess(json);
  // // })
  // .catch((err) => {
  //   onError(err);
  // });
};

export { createFetch };
