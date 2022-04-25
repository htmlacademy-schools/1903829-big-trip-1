import AddFirstPoint from '../view/site-add-first-point';
import EventsListTemplate from '../view/site-list-view';
import PointPresenter from './point-presenter';
import TripTabsTemplate from '../view/site-trip-tabs';
import { render, RenderPosition, remove } from '../utils/render';
import { SortType, sortDate, sortTime, sortPrice } from '../utils/informations';
import { UpdateType } from '../const';
import { generatePoint } from '../mock/point';
import { FilterType, UserAction } from '../const';
import EventNewPresenter from './event-new-presenter';
import TripSortTemplate from '../view/site-trip-sort';
import { filter } from '../utils/filter';

export default class TripPresenter {
  #tripContainer = null;
  #tabsContainer = null;
  #currentSortType = SortType.DAY.text;
  #filterType = FilterType.EVERYTHING;

  #sortComponent = null;
  #tabsComponent = new TripTabsTemplate();
  #listPointComponent = new EventsListTemplate();
  #noComponent = null;

  #pointsPresenter = new Map();
  #pointNewPresenter = null;

  #pointsModel = null;
  #filterModel = null;

  constructor(tripContainer, tabsContainer, pointsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#tabsContainer = tabsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointNewPresenter = new EventNewPresenter(this.#listPointComponent, this.#handleViewAction);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filtered = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY.text:
        return filtered.sort(sortDate);
      case SortType.TIME.text:
        return filtered.sort(sortTime);
      case SortType.PRICE.text:
        return filtered.sort(sortPrice);
    }

    return filtered;
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#pointsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#pointsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#pointsModel.deleteEvents(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderTripStart();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList({ resetSortType: true });
        this.#renderTripStart();
        break;
    }
  };

  init = () => {
    render(this.#tabsContainer, this.#tabsComponent, RenderPosition.BEFOREEND);
    this.#renderTripStart();
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderTripStart();
  };

  #renderPointList = () => {
    render(this.#tripContainer, this.#listPointComponent, RenderPosition.BEFOREEND);
  };

  createPoint = () => {
    const point = generatePoint();
    const createPointData = {...point, isCreateEvent : true};
    this.#handleModeChange();
    this.#pointNewPresenter.init(createPointData);
  };

  #renderSort = () => {
    this.#sortComponent = new TripSortTemplate(this.#currentSortType);
    render(this.#tripContainer, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listPointComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((tripEvent) => this.#renderPoint(tripEvent));
  };

  #renderNoPoint = () => {
    this.#noComponent = new AddFirstPoint(this.#filterType);
    render(this.#tripContainer, this.#noComponent, RenderPosition.BEFOREEND);
    this.#listPointComponent.element.remove();
    this.#sortComponent.element.remove();
  };

  #clearPointList = ( { resetSortType = false } = {} ) => {
    this.#pointNewPresenter.destroy();
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
    remove(this.#sortComponent);
    remove(this.#noComponent);

    if (this.#noComponent) {
      remove(this.#noComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY.text;
    }
  };

  #renderTripStart = () => {
    if (this.points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    const points = this.points.slice();

    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints(points);
    this.#handleSortTypeChange(this.#currentSortType);
  };
}
