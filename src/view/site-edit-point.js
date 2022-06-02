import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import { dateRend, countDuration } from '../utils/functionsWithDayjs.js';
import SmartView from './Smart-view';
import { createOffer, createPhoto, createPhotoContainer } from '../utils/common';
import { createType } from '../utils/common';

const buttonAddPoint = document.querySelector('.trip-main__event-add-btn');

const createEditPoint = (point) => {
  const  { date, type, city, basePrice, isDisabled,  isDeleting, isSaving, } = point;

  let startDateRend = '';
  let endDateRend = '';
  startDateRend = dateRend(date.start, 'DD/MM/YY HH:mm');
  endDateRend = dateRend(date.end, 'DD/MM/YY HH:mm');

  let offers = '';
  let allCitiesTemplate = '';

  type.arrayType.forEach((element) => {
    if (element.title === type.currentType.title) {
      type.currentType = { ...element, selectedOffers: type.currentType.selectedOffers ? type.currentType.selectedOffers : [] };
    }
  });

  type.currentType.allOffer.forEach((offer) => {
    let checked = false;
    type.currentType.selectedOffers.forEach((selectedOffer) => {
      if (selectedOffer.id === offer.id) {
        checked = true;
      }
    });
    const offerCurrent = createOffer(offer, checked);
    offers += offerCurrent;
  });

  let flag = false;
  city.arrayCity.forEach((cityElement) => {
    if (cityElement.name === city.currentCity.name) {
      flag = true;
      city.currentCity = cityElement;
    }
  });

  if (!flag) {
    city.currentCity = {
      ...city.currentCity,
      description: '',
      pictures: []
    };
  }

  if (city.arrayCity) {
    city.arrayCity.forEach((cityName) => {
      allCitiesTemplate += `<option value="${ cityName.name }"></option>`;
    });
  }

  let photos = '';
  city.currentCity.pictures.forEach((picture) => {
    const xPhoto = createPhoto(picture);
    photos += xPhoto;
  });
  photos = createPhotoContainer(photos);

  const buttonDeleteText = (isDeleting ? 'Deleting...' : 'Delete');

  const finType = createType(type.currentType.title);

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
                  ${finType}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${ type.currentType.title }
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${ city.currentCity.name }" list="destination-list-1">
            <datalist id="destination-list-1">
              ${ allCitiesTemplate }
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
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${ !point.isCreateEvent ? basePrice : 0 }">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit"${ isDisabled ? 'disabled' : '' }>
            ${ isSaving ? 'Saving...' : 'Save' }
          </button>
          <button class="event__reset-btn" type="reset" ${ isDisabled ? 'disabled' : '' }>
            ${ !point.isCreateEvent ? buttonDeleteText : 'Cancel' }
          </button>
          ${ !point.isCreateEvent ? `
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>` : '' }
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${ offers }
            </div>
        </section>
        ${ city.currentCity.description === '' && photos.length === 0 ? '' :
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Description</h3>
      <p class="event__destination-description">${ city.currentCity.description }</p>
      ${ photos }
    </section>` }
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
    this.setClickRollupHandler(this._callback.click);
    this.setDeleteClickHandler(this._callback.deleteClick);
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
      city: {
        currentCity: { name: evt.target.value },
        arrayCity: this._data.city.arrayCity }
    });
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    buttonAddPoint.disabled = false;
    this._data.isDisabled = false;
    this._data.isSaving = false;
    this._data.isDeleting = false;
    const priceValue = this.element.querySelector('#event-price-1').value;
    this._data.basePrice = Number(priceValue);
    this._data.isCreateEvent = false;
    const offers = document.querySelectorAll('.event__offer-checkbox');
    const filteredOffersChecked = Array.from(offers).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value.split('-').join(' '));
    const filteredOffersData = Array.from(this._data.type.currentType.allOffer)
      .filter((offer) =>
        filteredOffersChecked
          .some((filteredOfferChecked) => filteredOfferChecked === offer.title.toLowerCase()));
    this._data.type.currentType.selectedOffers = filteredOffersData;
    this._callback.formSubmit(this._data);
  };

  setClickRollupHandler = (callback) => {
    this._callback.click = callback;
    const rollupButtonTemplate = this.element.querySelector('.event__rollup-btn');
    if (rollupButtonTemplate) {
      rollupButtonTemplate.addEventListener('click', this.#eventRollupBtnClickHandler);
    }
  };

  #eventRollupBtnClickHandler = (evt) => {
    evt.preventDefault();
    buttonAddPoint.disabled = false;
    this._data.isDisabled = false;
    this._data.isSaving = false;
    this._data.isDeleting = false;
    this._callback.click();
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    buttonAddPoint.disabled = false;
    this._callback.deleteClick(this._data);
  };

  #setBeginData = () => {
    const currentDate = this._data.date ? this._data.date.start : '';
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: currentDate,
        enableTime: true,
        onChange: this.#beginDateChangeHandler,
      },
    );
  };

  #setEndData = () => {
    const currentDate = this._data.date ? this._data.date.end : '';
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: currentDate,
        enableTime: true,
        onChange: this.#endDateChangeHandler,
      },
    );
  };

  #beginDateChangeHandler = ([userDate]) => {
    this.updateData({
      date: { start: userDate, end: this._data.date.end },
    });
    this._data.time =  countDuration({ start: userDate, end: this._data.date.end });
  };

  #endDateChangeHandler = ([userDate]) => {
    this.updateData({
      date: { start: this._data.date.start, end: userDate },
    });
    this._data.time = countDuration({ start: this._data.date.start, end: userDate });
  };
}
