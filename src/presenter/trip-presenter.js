import AddFirstPoint from '../view/site-add-first-point';
import EventsListTemplate from '../view/site-list-view';
import TripSortTemplate from '../view/site-trip-sort';
import TripFiltersTemplate from '../view/site-trip-filter';
import PointPresenter from './point-presenter';
import TripTabsTemplate from '../view/site-trip-tabs';
import { render, RenderPosition} from '../utils/render';
import { updateItem } from '../utils/common';
import { SortType } from '../utils/informations';
import { sortPointUp, sortPointDown } from '../utils/functionsWithDayjs';

export default class TripPresenter {
  #tripContainer = null;
  #tabsContainer = null;
  #filterContainer = null;
  #currentSortType = null;

  #sortComponent = new TripSortTemplate();
  #tabsComponent = new TripTabsTemplate();
  #filterComponent = new TripFiltersTemplate();
  #listPointComponent = new EventsListTemplate();
  #noComponent = new AddFirstPoint();

  #tripPoints = [];
  #pointsPresenter = new Map();

  constructor(tripContainer, tabsContainer, filterContainer) {
    this.#tripContainer = tripContainer;
    this.#tabsContainer = tabsContainer;
    this.#filterContainer = filterContainer;
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];
    render(this.#tabsContainer, this.#tabsComponent, RenderPosition.BEFOREEND);
    render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND );
    this.#renderTripStart();
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
    this.#renderPoints();
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DATE_UP:
        this.#tripPoints.sort(sortPointUp);
        break;
      case SortType.DATE_DOWN:
        this.#tripPoints.sort(sortPointDown);
        break;
    }

    this.#currentSortType = sortType;
  };

  #renderSort = () => {
    render(this.#tripContainer, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPointList = () => {
    render(this.#tripContainer, this.#listPointComponent, RenderPosition.BEFOREEND);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listPointComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.#tripPoints.forEach((tripPoint) => this.#renderPoint(tripPoint) );
  };

  #clearPointList = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  };

  #renderNoPoint = () => {
    render(this.#tripContainer, this.#noComponent, RenderPosition.BEFOREEND);
    this.#listPointComponent.element.remove();
    this.#sortComponent.element.remove();
  };

  #renderTripStart = () => {
    if (this.#tripPoints.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints();
    this.#handleSortTypeChange('day');
  };
}
