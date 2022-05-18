import AddFirstPoint from '../view/site-add-first-point';
import EventsListTemplate from '../view/site-list-view';
import PointPresenter from './point-presenter';
import { render, RenderPosition, remove } from '../utils/render';
import { SortType, sortDate, sortTime, sortPrice } from '../utils/informations';
import { UpdateType } from '../const';
import { FilterType, UserAction } from '../const';
import EventNewPresenter from './point-new-presenter';
import TripSortTemplate from '../view/site-trip-sort';
import { filter } from '../utils/filter';
import { clearStatistics } from '../utils/statistics.js';
import LoadingView from '../view/loading-view';
import { State } from './point-presenter';
import PointsInfoView from '../view/site-trip-info-view';
import { newEvent } from '../utils/adapt';

const tripMainContainer = document.querySelector('.trip-main');

export default class TripPresenter {
  #tripContainer = null;
  #currentSortType = SortType.DAY.text;
  #filterType = FilterType.EVERYTHING;

  #sortComponent = null;
  #listPointComponent = new EventsListTemplate();
  #noComponent = null;
  #loadingComponent = new LoadingView();

  #pointsPresenter = new Map();
  #pointNewPresenter = null;
  #infoTrip = null;

  #pointsModel = null;
  #filterModel = null;
  #isLoading = true;

  constructor(tripContainer, pointsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointNewPresenter = new EventNewPresenter(this.#listPointComponent, this.#handleViewAction);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY.text:
        return filteredPoints.sort(sortDate);
      case SortType.TIME.text:
        return filteredPoints.sort(sortTime);
      case SortType.PRICE.text:
        return filteredPoints.sort(sortPrice);
    }

    return filteredPoints;
  }

  destroy = () => {
    this.#clearPointList({ resetSortType: true });

    remove(this.#listPointComponent);

    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointsPresenter.get(update.id).setViewState(State.SAVING);
        this.#pointsModel.updateEvent(updateType, update);
        try {
          await this.#pointsModel.updateEvent(updateType, update);
        } catch(err) {
          this.#pointsPresenter.get(update.id).setViewState(State.ABORTING);
        }
        break;
      case UserAction.ADD_TASK:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addEvent(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_TASK:
        this.#pointsPresenter.get(update.id).setViewState(State.DELETING);
        this.#pointsModel.deleteEvents(updateType, update);
        try {
          await this.#pointsModel.deleteEvents(updateType, update);
        } catch(err) {
          this.#pointsPresenter.get(update.id).setViewState(State.ABORTING);
        }
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTripStart();
        break;
    }
  };

  init = () => {
    this.#renderTripStart();
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
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
    this.#handleModeChange();
    this.#currentSortType = SortType.DAY.text;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    clearStatistics();
    newEvent.type.currentType.selectedOffers = [];
    this.#pointNewPresenter.init(newEvent);
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

  #renderLoading = () => {
    render(this.#tripContainer, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  };

  #renderNoPoint = () => {
    this.#noComponent = new AddFirstPoint(this.#filterType);
    render(this.#tripContainer, this.#noComponent, RenderPosition.BEFOREEND);
    this.#listPointComponent.element.remove();
  };

  #clearPointList = ( { resetSortType = false } = {} ) => {
    this.#pointNewPresenter.destroy();
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
    remove(this.#sortComponent);
    remove(this.#noComponent);
    remove(this.#loadingComponent);
    remove(this.#infoTrip);

    if (this.#noComponent) {
      remove(this.#noComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY.text;
    }
  };

  renderTrip = () => {
    if (this.points.length > 0 ) {
      this.#infoTrip = new PointsInfoView(this.points);
      render(tripMainContainer, this.#infoTrip, RenderPosition.AFTERBEGIN);
    }
  };

  #renderTripStart = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    const points = this.points.slice();

    this.#renderSort();
    this.#renderPointList();
    this.renderTrip();
    this.#renderPoints(points);
    this.#handleSortTypeChange(this.#currentSortType);
  };
}
