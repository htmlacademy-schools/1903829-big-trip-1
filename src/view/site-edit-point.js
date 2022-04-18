import { dateRend } from '../utils/functionsWithDayjs.js';
import SmartView from './Smart-view.js';

const createEditPoint = (point = {}) => {
  const  { date = null, waypointType = null, waypoint = null } = point;
  const startDateRend  = dateRend(date.start, 'D MMMM YYYY');
  const endDateRend  = dateRend(date.end, 'D MMMM YYYY');

  const createOffer = (offer) => {
    const isChecked = offer.isChosen ? ' checked=""' : '';
    const name = offer.name;
    const price = offer.price;
    const type = offer.type;
    return `<div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${ type }-1" type="checkbox" name="event-offer-${ type }"${ isChecked }>
                        <label class="event__offer-label" for="event-offer-name-1">
                          <span class="event__offer-title">${ name }</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${ price }</span>
                        </label>
                      </div>
    `;
  };

  waypointType.arrayType.forEach((element) => {
    if (element.title === waypointType.currentType.title) {
      waypointType.currentType = element;
    }
  });

  let offers = '';
  waypointType.currentType.allOffer.forEach((offer) => {
    const offerCurrent = createOffer(offer);
    offers += offerCurrent;
  });

  waypoint.arrayCity.forEach((arrayCityElement) => {
    if(arrayCityElement.titleCity === waypoint.currentCity.titleCity){
      if(waypoint.currentCity.isShowPhoto) {
        waypoint.currentCity = arrayCityElement;
        waypoint.currentCity.isShowPhoto = true;
      }
      else {
        waypoint.currentCity = arrayCityElement;
      }
    }
  });

  return `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${ waypointType }}" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${waypointType.currentType.title === 'taxi' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${waypointType.currentType.title === 'bus' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>
                <div class="event__type-item">                 
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${waypointType.currentType.title === 'train' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${waypointType.currentType.title === 'ship' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${waypointType.currentType.title === 'drive' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${waypointType.currentType.title === 'flight' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${waypointType.currentType.title === 'check-in' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${waypointType.currentType.title === 'sightseeing' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${waypointType.currentType.title === 'restaurant' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>
    
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${ waypointType.currentType.title }
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${waypoint.currentCity.titleCity}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Podgorica"></option>
              <option value="Moscow"></option>
              <option value="New York"></option>
              <option value="Bratislava"></option>
              <option value="Oslo"></option>
              <option value="Ottawa"></option>
              <option value="Prague"></option>
            </datalist>
          </div>
    
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${ startDateRend }">
              &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${ endDateRend }">
          </div>
    
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>
    
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">${ offers }
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    
              </div>
            </div>
         </section>
    
         <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description"></p>
        </section>
      </section>
    </form>
  </li> `;
};

export default class EditNewPoint extends SmartView {
  constructor(point) {
    super();
    this._data = { ...point };
    this.#findTags();
  }

  restoreHandlers = () => {
    this.#findTags();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEventRollupBtnHandler(this._callback.click);
  };

  get template() {
    return createEditPoint(this._data);
  }

  reset = (point) => {
    this.updateData(
      point,
    );
  };

  #findTags = () => {
    this.element.querySelector('.event__type-group').addEventListener('change',  this.#typesPointToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change',  this.#citiesToggleHandler);
  };

  #typesPointToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      currentType: { title: evt.target.value }
    });
  };

  #citiesToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      currentCity: { titleCity: evt.target.value, isShowPhoto: true },
      arrayCity: this._data.city.arrayCity
    });
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this._data.city.currentCity.isShowPhoto = false;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditNewPoint.parseDataToPoint(this._data));
  };

  setEventRollupBtnHandler = (callback) => {
    this._callback.rollupClick = callback;
    this._data.city.currentCity.isShowPhoto = false;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#eventRollupBtnClickHandler);
  };

  #eventRollupBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupClick();
  };
}
