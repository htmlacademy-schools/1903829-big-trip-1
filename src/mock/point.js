import { descriptions, wayPointTypes, destinations, offers } from '../utils/informations.js';
import { getRandomInteger, generateImages } from '../utils/common.js';
import { generateBeginEndDates, countDuration } from '../utils/functionsWithDayjs.js';
import { nanoid } from 'nanoid';

export const generateDescription = () => {
  const points = destinations();
  points.forEach((city) => {
    const descriptionArray = descriptions();
    const countDescription = getRandomInteger(1, descriptionArray.length);
    for (let i = 0; i < countDescription; i++) {
      const elementNumber = getRandomInteger(0, descriptionArray.length - 1);
      const descriptionArrayElement = descriptionArray[elementNumber];
      descriptionArray.splice(elementNumber, 1);
      city.description += descriptionArrayElement;
    }
  });
};

const generateOffers = () => {
  let count = getRandomInteger(0, 5);
  const off = offers();
  let len = off.length;
  const result = new Array(count);
  const taken = new Array(len);
  if (count > len)
  {
    throw new RangeError('getRandom: more elements taken than available');
  }
  while (count--) {
    const x = Math.floor(Math.random() * len);
    result[count] = off[x in taken ? taken[x] : x];
    taken[x] = --len;
  }
  return result;
};

generateOffers();
generateDescription();
generateImages();

export const generatePoint = () => {
  const date = generateBeginEndDates();
  const time = countDuration(date);
  const dest = destinations();
  const t = wayPointTypes();
  const type = { currentType: t[getRandomInteger(0, 7)], arrayType: t };
  const allPrice = type.currentType.allPriceOffers + getRandomInteger(10, 30);

  return {
    id: nanoid(),
    date,
    type,
    city: {currentCity: dest[getRandomInteger(0, 2)], arrayCity: dest},
    time,
    allPrice,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
