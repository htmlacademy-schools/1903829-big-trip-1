import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import { dateRend } from '../utils/functionsWithDayjs.js';
import SmartView from './Smart-view.js';

const createEditPoint = (point = {}) => {
  const  { date = null, type = null, city = null, allPrice = null, offers = null} = point;
  const startDateRend  = dateRend(date.start, 'DD/MM/YY HH:mm');
  const endDateRend  = dateRend(date.end, 'DD/MM/YY HH:mm');

  type.arrayType.forEach((element) => {
    if (element.title === type.currentType.title) {
      type.currentType = element;
    }
  });

  city.arrayCity.forEach((arrayCityElement) => {
    if(arrayCityElement.titleCity === city.currentCity.titleCity){
      if(city.currentCity.isShowPhoto) {
        city.currentCity = arrayCityElement;
        city.currentCity.isShowPhoto = true;
      }
      else {
        city.currentCity = arrayCityElement;
      }
    }
  });

  const createphotoContainer = (photo) => (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${photo}
      </div>
    </div>`
  );
  const photos = createphotoContainer(city.currentCity.photos);

  return `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="${ type.currentType.img }" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type.currentType.title === 'taxi' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type.currentType.title === 'bus' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>
                <div class="event__type-item">                 
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type.currentType.title === 'train' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type.currentType.title === 'ship' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type.currentType.title === 'drive' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type.currentType.title === 'flight' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type.currentType.title === 'check-in' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type.currentType.title === 'sightseeing' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type.currentType.title === 'restaurant' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>
    
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${ type.currentType.title }
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city.currentCity.titleCity}" list="destination-list-1">
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
              ${ allPrice } &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>
    
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${ offers.join('') }
            </div>
            </div>
         </section>
    
         <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Description</h3>
          <p class="event__destination-description">${ city.currentCity.description }</p>
          ${ photos }
        </section>
      </section>
    </form>
  </li> `;
};

export default class EditNewPoint extends SmartView {
  #datepicker = null;

  constructor(point) {
    super();
    this._data = { ...point };
    this.#findTags();
    this.#setBeginData();
    this.#setEndData();
  }

  restoreHandlers = () => {
    this.#findTags();
    this.#setBeginData();
    this.#setEndData();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEventRollupBtnHandler(this._callback.click);
  };

  get template() {
    return createEditPoint(this._data);
  }

  removeElement = () => {
    super.removeElement();

    this.#datepicker.destroy();
    this.#datepicker = null;
  };

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
    this.updateData({
      type: { currentType: { title: evt.target.value },
        arrayType: this._data.type.arrayType } });
  };

  #citiesToggleHandler = (evt) => {
    this.updateData({
      currentCity: { titleCity: evt.target.value },
      arrayCity: this._data.city.arrayCity
    });
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
  };

  setEventRollupBtnHandler = (callback) => {
    this._callback.rollupClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#eventRollupBtnClickHandler);
  };

  #eventRollupBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #setBeginData = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'DD/MM/YYYY HH:mm',
        defaultDate: this._data.date.begin,
        onChange: this.#beginDateChangeHandler,
      },
    );
  };

  #setEndData = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'DD/MM/YYYY HH:mm',
        defaultDate: this._data.date.end,
        onChange: this.#endDateChangeHandler,
      },
    );
  };

  #beginDateChangeHandler = ([userDate]) => {
    this.updateData({
      date: { start: userDate, end: this._data.date.end },
    });
  };

  #endDateChangeHandler = ([userDate]) => {
    this.updateData({
      date: { begin: this._data.date.begin, endt: userDate },
    });
  };
}
