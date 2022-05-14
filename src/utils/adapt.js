import { countDuration } from '../utils/functionsWithDayjs.js';
import { wayPointTypes } from '../utils/informations.js';
import dayjs from 'dayjs';

let arrayCities = null;
const arrayTypes = [];
const listTypes = wayPointTypes();

export const generateCities = (cities) => {
  arrayCities = cities.map((city) => ({ ...city }));
};

export const adaptToClient = (point) => {
  const adaptedPoint = {
    id: point.id,
    isCreateEvent: false,
    favorite: point.is_favorite,
    city: {
      currentCity: {
        titleCity: point.destination.titleCity,
        description: point.destination.description,
        photos: point.destination.photos
      },
      arrayCity: arrayCities
    },
    date: {
      start: point.date_from,
      end: point.date_to
    },
    startPrice: point.base_price,
    price: null,
    type: {
      currentType: {
        title: point.type,
        img: listTypes[point.type].img,
        allOffer: listTypes[point.type].allOffer,
        selectedOffer: point.offers,
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
        photos: [],
        titleCity: ''
      },
      arrayCity: arrayCities
    },
    date: {
      start: dayjs(),
      end: dayjs().add(1, 'hour')
    },
    startPrice: 0,
    price: null,
    type: {
      currentType: {
        title: 'taxi',
        img: 'img/icons/taxi.png',
        allOffer: [],
        selectedOffer: [],
      },
      arrayType: arrayTypes
    },
    time: countDuration(dayjs(), dayjs().add(1, 'hour')),
    isDisabled: false,
    isDeleting: false,
    isSaving: false,
  };
};
