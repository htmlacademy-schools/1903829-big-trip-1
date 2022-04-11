import AddFirstPoint from '../view/site-add-first-point';
import EventsListTemplate from '../view/site-list-view';
import TripSortTemplate from '../view/site-trip-sort';
import PointPresenter from './point-presenter';
import { render, RenderPosition, remove } from '../utils/render';
import { updateItem } from '../utils/common';
import { SortType } from '../utils/informations';
import { sortPointUp, sortPointDown } from '../utils/functionsWithDayjs';
import BoardView from '../view/site-board-view';
import LoadMoreButtonView from '../view/site-load-more-button-view';

const POINT_COUNT_PER_STEP = 8;

export default class TripPresenter {
  #tripContainer = null;
  wayPointElement = null;
  #renderedPointCount = POINT_COUNT_PER_STEP;

  #tripEventsElement = null;

  #sortComponent = new TripSortTemplate();
  #noComponent = new AddFirstPoint();
  #tripEventsListElement = new EventsListTemplate();
  #boardComponent = new BoardView();
  #loadMoreButtonComponent = new LoadMoreButtonView();

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #tripPoints = [];
  #sourcedPoints = [];

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
    this.#tripEventsElement = this.#tripContainer.querySelector('.trip-events');
  }

  init = (tripPoints) => {
    this.#sourcedPoints = [...tripPoints];
    this.#tripPoints = [...tripPoints];
    this.#renderPoint();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderNoPoint = () => {
    render(this.#tripEventsElement, this.#noComponent, RenderPosition.BEFOREEND);
  };

  #renderPointsListElements = () => {
    render(this.#tripEventsElement, this.#tripEventsListElement, RenderPosition.BEFOREEND);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DATE_UP:
        this.#tripPoints.sort(sortPointUp);
        break;
      case SortType.DATE_DOWN:
        this.#tripPoints.sort(sortPointDown);
        break;
      default:
        this.#tripPoints = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  };

  #renderSort = () => {
    render(this.#tripEventsElement, this.#sortComponent, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripEventsListElement, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    for (let i = 1; i < this.#tripPoints.length; i++) {
      this.renderPoint(this.#tripPoints[i]);
    }
  };

  #renderTripStart = () => {
    if (this.#tripPoints.length === 0) {
      this.#renderNoPoint();
    } else {
      this.#renderSort();
      this.#renderPointsListElements();
      this.#renderPoints();
    }
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPointList = () => {
    this.#renderPoints(0, Math.min(this.#tripPoints.length, POINT_COUNT_PER_STEP));
    if (this.#tripPoints.length > POINT_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  };

  #renderLoadMoreButton = () => {
    render(this.#boardComponent, this.#loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this.#loadMoreButtonComponent.setClickHandler(this.#handleLoadMoreButtonClick);
  };

  #handleLoadMoreButtonClick = () => {
    this.#renderPoints(this.#renderedPointCount, this.#renderedPointCount + POINT_COUNT_PER_STEP);
    this.#renderedPointCount += POINT_COUNT_PER_STEP;
    if (this.#renderedPointCount >= this.#tripPoints.length) {
      remove(this.#loadMoreButtonComponent);
    }
  };
}
