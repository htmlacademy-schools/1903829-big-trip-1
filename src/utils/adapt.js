import { countDuration } from '../utils/functionsWithDayjs.js';
import dayjs from 'dayjs';

let arrayCities = null;
const arrayTypes = [];

const typeArray = {
  ['taxi']: { img: 'img/icons/taxi.png', allOffer: [] },
  ['bus']: { img: 'img/icons/bus.png', allOffer: [] },
  ['drive']: { img: 'img/icons/drive.png', allOffer: [] },
  ['check-in']: { img: 'img/icons/check-in.png', allOffer: [] },
  ['flight']: { img: 'img/icons/flight.png', allOffer: [] },
  ['restaurant']: { img: 'img/icons/restaurant.png', allOffer: [] },
  ['sightseeing']: { img: 'img/icons/sightseeing.png', allOffer: [] },
  ['train']: { img: 'img/icons/train.png', allOffer: [] },
  ['ship']: {img: 'img/icons/ship.png', allOffer: [] }
};

export const generateOffers = (offers) => {
  offers.forEach((allOffer) => {
    typeArray[allOffer.type].allOffer = allOffer.offers;
    const offer = {
      allOffer: typeArray[allOffer.type].allOffer,
      img: typeArray[allOffer.type].img,
      selectedOffers: [],
      title: allOffer.type
    };
    arrayTypes.push(offer);
  });
};

export const generateCities = (cities) => {
  arrayCities = cities.map((city) => ({ ...city, }));
};

export const adaptToClient = (point) => {
  const adaptedPoint = {
    id: point.id,
    isCreateEvent: false,
    favorite: point.is_favorite,
    city: {
      currentCity: {
        name: point.destination.name,
        description: point.destination.description,
        pictures: point.destination.pictures,
      },
      arrayCity: arrayCities
    },
    date: {
      start: point.date_from,
      end: point.date_to
    },
    basePrice: point.base_price,
    type: {
      currentType: {
        allOffer: typeArray[point.type].allOffer,
        img: typeArray[point.type].img,
        selectedOffers: point.offers,
        title: point.type
      },
      arrayType: arrayTypes
    },
    time: countDuration(point.date_from, point.date_to),
    isDisabled: false,
    isDeleting: false,
    isSaving: false,
  };
  return adaptedPoint;
};

export let newEvent = null;
export const createNewEvent = () => {
  newEvent = {
    favorite: false,
    isCreateEvent: true,
    city: {
      currentCity: {
        description: 's',
        pictures: [],
        name: ''
      },
      arrayCity: arrayCities
    },
    date: {
      start: dayjs(),
      end: dayjs().add(1, 'hour')
    },
    basePrice: 0,
    type: {
      currentType: {
        allOffer: typeArray['taxi'].allOffer,
        img: typeArray['taxi'].img,
        selectedOffers: [],
        title: 'taxi'
      },
      arrayType: arrayTypes
    },
    time: countDuration(dayjs(), dayjs().add(1, 'hour')),
    isDisabled: false,
    isDeleting: false,
    isSaving: false,
  };
};
