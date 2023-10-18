import { isValidStringLength } from "./util.js";

const isValidHashtagField = function (str) {
  console.log(str);
  let validationPassed = true;

  let validationMessages = [];

  function containsForbiddenChars(str) {
    const forbiddenChars = /[ `!@$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const emojis = /\p{Extended_Pictographic}/u;
    if (emojis.test(str)) {
      return true;
    }
    return forbiddenChars.test(str);
  }


  if (str != '') {
    const hashtagArray = str.split(' ');
    console.log(hashtagArray);

    const validationState = {
      hashtagFormat: { message: 'Хэш-теги должны начинаться с символа решётки "#" и разделяться пробелами.', validationPassed: true },
      forbiddenCharacters: { message: 'Хэш-тег не может содержать спецсимволы и пробел.', validationPassed: true },
      hashtagLength: { message: 'Хэш-тег не может превышать длину в 20 символов и не может состоять из одной решётки.', validationPassed: true },
      hashtagRepetition: { message: 'Хэш-теги не могут повторяться', validationPassed: true },
      hashtagCount: { message: 'Хэш-тегов не может быть более пяти', validationPassed: true },
    };

    if (hashtagArray.hashtagLength > 5) {
      validationState.hashtagCount.validationPassed = false;
      validationMessages.push(validationState.hashtagCount.message);
      validationPassed = false;
    };

    let checkedHashtags = [];

    for (let i = 0; i < hashtagArray.length; i++) {
      let hashtag = hashtagArray[i].toLowerCase();

      console.log(checkedHashtags);

      if (validationState.hashtagFormat.validationPassed === true && Array.from(hashtag)[0] !== '#') {
        validationState.hashtagFormat.validationPassed = false;
        validationMessages.push(validationState.hashtagFormat.message);
        validationPassed = false;
      };

      if (validationState.forbiddenCharacters.validationPassed === true && containsForbiddenChars(hashtag)) {
        validationState.forbiddenCharacters.validationPassed = false;
        validationMessages.push(validationState.forbiddenCharacters.message);
        validationPassed = false;
      };

      if (validationState.hashtagLength.validationPassed === true && !isValidStringLength(hashtag, 2, 20)) {
        validationState.hashtagLength.validationPassed = false;
        validationMessages.push(validationState.hashtagLength.message);
        validationPassed = false;
      };

      if (validationState.hashtagRepetition.validationPassed === true && checkedHashtags.includes(hashtag)) {
        validationState.hashtagRepetition.validationPassed = false;
        validationMessages.push(validationState.hashtagRepetition.message);
        validationPassed = false;
      };

      checkedHashtags.push(hashtag);

    }
  };

  if (validationPassed) {
    return ('');
  }

  return validationMessages.join('\n');

}

export { isValidHashtagField };
//Завести массив, в который будут с каждой проверкой записываться причины невалидности
//Склеить массив в одно итоговое сообщение, которое возвращает функция
//Если валидация проходит успешно, функция возвращает true
