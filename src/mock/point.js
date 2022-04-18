import { descriptions, destinations, offers } from '../utils/informations.js';
import { getRandomInteger, generateImages } from '../utils/common.js';
import { generateBeginEndDates, countDuration } from '../utils/functionsWithDayjs.js';
import { nanoid } from 'nanoid';

const types = [
  { title: 'taxi', img: 'img/icons/taxi.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'bus', img: 'img/icons/bus.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'drive', img: 'img/icons/drive.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'check-in', img: 'img/icons/check-in.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'flight', img: 'img/icons/flight.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'restaurant', img: 'img/icons/restaurant.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'sightseeing', img: 'img/icons/sightseeing.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'train', img: 'img/icons/train.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 }
];

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
  const type = { currentType: types[getRandomInteger(0, 7)], arrayType: types };
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
