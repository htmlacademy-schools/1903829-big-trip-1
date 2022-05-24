export const createOffer = (offer) => {
  const { title, type, price } = offer;
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" value="${type}">
  <label class="event__offer-label" for="event-offer-${type}-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
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

export const createPhoto = (photo) => `<img class="event__photo" src="${ photo.src }" alt="Event photo">`;

export const createphotoContainer = (photo) => (
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

export const sortPrice = (a, b) => a.startPrice - b.startPrice;
