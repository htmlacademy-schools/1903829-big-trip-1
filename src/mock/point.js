import { descriptions } from '../utils/informations.js';
import { wayPointTypes } from '../utils/informations.js';
import { destinations } from '../utils/informations.js';
import { getRandomInteger } from '../utils/common.js';
import { generateImages } from '../utils/common.js';
import { generateBeginEndDates } from '../utils/functionsWithDayjs.js';

const generateType = () => {
  const types = wayPointTypes;
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const generateDestination = () => {
  const dest = destinations;
  const randomIndex = getRandomInteger(0, dest.length - 1);
  return dest[randomIndex];
};

const getDuration = () => ' ';

export const generateDescription = () => {
  const description = descriptions;
  const randomIndex = getRandomInteger(0, description.length - 1);
  return description[randomIndex];
};

const generateCost = () => getRandomInteger(1, 100) * 10;

const generateOffers = () => {
  const offers = [
    {
      name: 'Add luggage',
      price: 30,
      isChosen: Boolean(getRandomInteger(0,1)),
      type: 'luggage'
    },
    {
      name: 'Switch to comfort class',
      price: 100,
      isChosen: Boolean(getRandomInteger(0,1)),
      type: 'flight'
    },
    {
      name: 'Add meal',
      price: 15,
      isChosen: Boolean(getRandomInteger(0,1)),
      type: 'meal'
    },
    {
      name: 'Travel by train',
      price: 40,
      isChosen: Boolean(getRandomInteger(0,1)),
      type: 'transport'
    },
    {
      name: 'Rent a car',
      price: 200,
      isChosen: Boolean(getRandomInteger(0,1)),
      type: 'car'
    },
    {
      name: 'Add breakfast',
      price: 40,
      isChosen: Boolean(getRandomInteger(0,1)),
      type: 'meal'
    },
  ];
  let count = getRandomInteger(0, 5);
  let len = offers.length;
  const result = new Array(count);
  const taken = new Array(len);
  if (count > len)
  {
    throw new RangeError('getRandom: more elements taken than available');
  }
  while (count--) {
    const x = Math.floor(Math.random() * len);
    result[count] = offers[x in taken ? taken[x] : x];
    taken[x] = --len;
  }
  return result;
};


export const generatePoint = () => {
  const date = generateBeginEndDates();

  return {
    waypointType: generateType(),
    destination: generateDestination(),
    startDate: date.start,
    endDate: date.end,
    duration: getDuration(),
    description: generateDescription(),
    images: generateImages(),
    cost: generateCost(),
    offers: generateOffers(),
    isArchive: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
