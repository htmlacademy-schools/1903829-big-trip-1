import { dateRend } from '../utils/functionsWithDayjs.js';
import AbstractView from './Abstract-view.js';

const createTripEventsView = (point) => {
  const { date, type, allPrice, time, isFavorite} = point;
  const startDayMonth = dateRend(date.start, 'MMM D');
  const startDate = dateRend(date.start, 'YYYY-MM-D');
  const startDatetime = dateRend(date.start, 'YYYY-MM-DDTHH:mm');
  const startTime = dateRend(date.start, 'HH:mm');
  const endDatetime = dateRend(date.end, 'YYYY-MM-DDTHH:mm');
  const endTime = dateRend(date.end, 'HH:mm');

  const createListOffers = (offer) => {
    if (offer.isChosen) {
      const name = offer.name;
      const price = offer.price;
      return `<li class="event__offer">
                    <span class="event__offer-title">${ name }</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${ price }</span>
                  </li>`;
    }
  };

  const fav = isFavorite ? ' event__favorite-btn--active' : '';

  let listOffers = '';
  if(type.currentType.selectedOffer) {
    type.currentType.selectedOffer.forEach((offer) => {
      const offerCurrent = createListOffers(offer);
      listOffers += offerCurrent;
    });
  }

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${ startDate }">${ startDayMonth }</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${ type }.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${ type } </h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${ startDatetime}">${ startTime }</time>
                    &mdash;
                    <time class="event__end-time" datetime="${ endDatetime }">${ endTime }</time>
                  </p>
                  <p class="event__duration">${ time.duration }</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${ allPrice }</span>
                </p>
                  <h4 class="visually-hidden">Offers:</h4>
                  <ul class="event__selected-offers">
                    ${ listOffers }
                  </ul>
                  <button class="event__favorite-btn event__favorite-btn--${ fav }}" type="button">
                    <span class="visually-hidden">Add to favorite</span>
                    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                    </svg>
                  </button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </div>
              </li>`;
};

export default class TripEventsView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createTripEventsView(this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}

