import { dateRend } from '../utils/functionsWithDayjs.js';
import AbstractView from './Abstract-view.js';

const createTripEventsItemTemplate = (point) => {
  const {waypointType, destination, startD, endD, cost, duration, offers, favor} = point;
  const startDayMonth = dateRend(startD, 'MMM D');
  const startDate = dateRend(startD, 'YYYY-MM-D');
  const startDatetime = dateRend(startD, 'YYYY-MM-DDTHH:mm');
  const startTime = dateRend(startD, 'HH:mm');
  const endDatetime = dateRend(endD, 'YYYY-MM-DDTHH:mm');
  const endTime = dateRend(endD, 'HH:mm');

  const getDuration = (dur) => {
    const result = [];
    if (dur.days !== 0) {
      result[0] = `${String(dur.days).padStart(2,'0')}D`;
    }
    if (dur.hours !== 0) {
      result[1] = `${String(dur.hours).padStart(2,'0')}H`;
    }
    if (dur.minutes !== 0) {
      result[2] = `${String(dur.minutes).padStart(2,'0')}M`;
    }
    return result.join(' ');
  };

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

  const isFavorite = favor ? ' event__favorite-btn--active' : '';

  const listOffers = offers.map(createListOffers).join('');
  const durat = getDuration(duration);

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${ startDate }">${ startDayMonth }</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${ waypointType }.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${ waypointType } ${ destination }</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${ startDatetime}">${ startTime }</time>
                    &mdash;
                    <time class="event__end-time" datetime="${ endDatetime }">${ endTime }</time>
                  </p>
                  <p class="event__duration">${ durat }</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${ cost }</span>
                </p>
                  <h4 class="visually-hidden">Offers:</h4>
                  <ul class="event__selected-offers">
                    ${ listOffers }
                  </ul>
                  <button class="event__favorite-btn event__favorite-btn--${ isFavorite }}" type="button">
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

export default class TripEventsItemTemplate extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createTripEventsItemTemplate(this.#point);
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

