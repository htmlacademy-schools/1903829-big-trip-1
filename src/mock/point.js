import { wayPointTypes, destinations } from '../utils/informations.js';
import { generateOffers, getRandomInteger } from '../utils/common.js';
import { generateBeginEndDates, countDuration } from '../utils/functionsWithDayjs.js';
import { nanoid } from 'nanoid';

export const generatePoint = () => {
  const date = generateBeginEndDates();
  const time = countDuration(date);
  const dest = destinations();
  const types = wayPointTypes();
  const type = { currentType: types[getRandomInteger(0, 7)], arrayType: types };
  const allPrice = type.currentType.allPriceOffers + getRandomInteger(150, 300);

  return {
    id: nanoid(),
    date,
    type,
    city: {currentCity: dest[getRandomInteger(0, 2)], arrayCity: dest},
    time,
    allPrice,
    isFavorite: false,
    offers: generateOffers()
  };
};
