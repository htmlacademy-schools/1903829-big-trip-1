import AbstractView from './Abstract-view';

const createTripFiltersTemplate = (currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">
          <div class="trip-filters__filter">
            <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${'everything' === currentFilterType ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
          </div>
          <div class="trip-filters__filter">
            <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${'future' === currentFilterType ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-future">Future</label>
          </div>
          <div class="trip-filters__filter">
            <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${'past' === currentFilterType ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-past">Past</label>
          </div>
          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>`
);

export default class TripFiltersTemplate extends AbstractView {
  #currentFilter = null;

  constructor( currentFilterType) {
    super();
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createTripFiltersTemplate(this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
