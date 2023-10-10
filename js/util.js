let getRandomInt = function (rangeStart, rangeEnd) {
    if (rangeStart < 0) {
      rangeStart = 0;
    }
    if (rangeEnd < 0) {
      rangeEnd = 0;
    }

    if (rangeStart > rangeEnd) {
      [rangeStart, rangeEnd] = [rangeEnd, rangeStart];
    }

    rangeStart = Math.ceil(rangeStart);
    rangeEnd = Math.floor(rangeEnd);

    return Math.floor(Math.random() * (rangeEnd - rangeStart + 1) + rangeStart);
  };

  let isValidStringLength = function (stringToCheck, stringLengthMax) {
    if (stringToCheck.length <= stringLengthMax) {
      return true;
    }
    return false;
  };

  let getUniqueIds = function (min, max, items) {
    const arr = new Array(items).fill(null);
    return arr.reduce((acc) => {
      let possibleId = getRandomInt(min, max);
      while (
        acc.some((id) => {
          return id === possibleId;
        })
      ) {
        possibleId = getRandomInt(min, max);
      }

      return [...acc, possibleId];
    }, []);
  };

export {getRandomInt};
export {getUniqueIds};
export {isValidStringLength};

