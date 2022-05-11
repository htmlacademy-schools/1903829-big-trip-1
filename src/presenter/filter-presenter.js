import TripFiltersTemplate from '../view/site-trip-filter.js';
import { render, RenderPosition, replace,remove } from '../utils/render.js';
import { FilterType, UpdateType } from '../const.js';
import { filter } from '../utils/common.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #filterComponent = null;

  constructor(filterContainer, filterModel, pointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
  }

  get filters() {
    const points = this.#pointsModel.points;

    return {
      [FilterType.EVERYTHING]: { name: 'Everything', count: filter[FilterType.EVERYTHING](points).length, },
      [FilterType.FUTURE]: { name: 'Future', count: filter[FilterType.FUTURE](points).length,  },
      [FilterType.PAST]: { name: 'Past', count: filter[FilterType.PAST](points).length, },
    };
  }

  destroy = () => {
    remove(this.#filterComponent);
    this.#filterComponent = null;

    this.#filterModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  };

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new TripFiltersTemplate( this.#filterModel.filter, filters);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    this.#filterModel.addObserver(this.#handleModelEvent);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
