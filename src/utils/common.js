import { listTypes } from '../const';

export const createOffer = (offer, isCheckedOffer) => {
  const { title, price } = offer;
  const id = title.split(' ').join('-').toLowerCase();
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${ id }-1" type="checkbox" name="event-offer-${ id }" value="${ id }" ${ isCheckedOffer ? 'checked' : '' }>
  <label class="event__offer-label" for="event-offer-${id}-1">
    <span class="event__offer-title">${ title }</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${ price }</span>
  </label>
</div>`;
};

export const createOffers = (offer) => {
  const { title, price } = offer;
  return `<li class="event__offer">
    <span class="event__offer-title">${ title }</span>
      &plus;&euro;&nbsp;
    <span class="event__offer-price">${ price }</span>
  </li>`;
};

export const sortStatistics = (a, b) => b[1] - a[1];

export const createPhoto = (picture) => `<img class="event__photo" src="${ picture.src }" alt="${ picture.description }">`;

export const createPhotoContainer = (photo) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${ photo }
    </div>
  </div>`
);

export const SortType = {
  DAY: {text: 'day', checked: true},
  TIME: {text: 'time', checked: false},
  PRICE: {text: 'price', checked: false},
};

export const sortPrice = (a, b) => b.basePrice - a.basePrice;

export const createType = (typePoint) => {
  const typeOne = listTypes.typePoint;
  return `<div class="event__type-item">
    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typePoint}" ${ 'checked' }>
    <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">${ typeOne }</label>
   </div>`;
};

export const validatePrice = (price) => Math.sign(price) === 1;

export const validateDate = (dateStart, dateEnd) => dateEnd > dateStart;

export const validateCity = (city, listCities) => listCities.includes(city);
