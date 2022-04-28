import AbstractView from './Abstract-view';
import { MenuItem } from '../const';

export const createTripTabsTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" " id="${ MenuItem.POINTS }" data-value="${ MenuItem.POINTS }">Table</a>
    <a class="trip-tabs__btn" href="#"  id="${ MenuItem.STATISTICS }"  data-value="${ MenuItem.STATISTICS }">Stats</a>
  </nav>`
);

export default class TripTabsTemplate extends AbstractView {
  get template() {
    return createTripTabsTemplate();
  }

  setMenuClickHandler = (callback) => {
    const tripTabs = document.querySelector('.trip-controls__trip-tabs');
    this._callback.menuClick = callback;
    tripTabs.addEventListener('click', this.#menuClickHandler);
  };

  #menuClickHandler = (evt) => {
    const target = document.querySelector(`#${ evt.target.dataset.value }`);
    const btnActive = document.querySelector('.trip-tabs__btn--active');
    target.classList.add('trip-tabs__btn--active');
    btnActive.classList.remove('trip-tabs__btn--active');

    this._callback.menuClick(evt.target.dataset.value);
  };
}
