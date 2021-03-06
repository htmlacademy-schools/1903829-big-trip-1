import { dateRend } from '../utils/functionsWithDayjs.js';
import AbstractView from './Abstract-view';
import { createOffers } from '../utils/common.js';

const createTripEventsView = (point) => {
  const {
    date,
    type,
    city,
    basePrice,
    time,
    favorite
  } = point;

  const startDate = dateRend(date.start, 'DD MMM');
  const startDayMonth = dateRend(date.start, 'HH:mm');
  const endDayMonth = dateRend(date.end, 'hh:mm');

  let favoriteClass = '';
  if (favorite === true) {
    favoriteClass = 'event__favorite-btn--active';
  }

  let offers = '';
  if(type.currentType.selectedOffers) {
    type.currentType.selectedOffers.forEach((offer) => {
      const offerCurrent = createOffers(offer);
      offers += offerCurrent;
    });
  }

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="">${ startDate } </time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="${ type.currentType.img }" alt="Event type icon">
                </div>
                <h3 class="event__title">${ type.currentType.title } ${ city.currentCity.name }</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="">${ startDayMonth }</time>
                    &mdash;
                    <time class="event__end-time" datetime="">${ endDayMonth }</time>
                  </p>
                  <p class="event__duration">${ time.duration } </p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${ basePrice }</span>
                </p>
                  <h4 class="visually-hidden">Offers:</h4>
                  <ul class="event__selected-offers">
                    ${ offers }
                  </ul>
                  <button class="event__favorite-btn ${ favoriteClass }" type="button">
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

  setClickRollupHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}

