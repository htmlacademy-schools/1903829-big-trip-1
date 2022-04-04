import AddFirstPoint from '../view/site-add-first-point';
import EventsListTemplate from '../view/site-list-view';
import TripSortTemplate from '../view/site-trip-sort';
import PointPresenter from './point-presenter';
import { render, RenderPosition } from '../utils/render';

export default class TripPresenter {
  #tripContainer = null;
  wayPointElement = null;

  #tripEventsElement = null;

  #sortComponent = new TripSortTemplate();
  #noComponent = new AddFirstPoint();
  #tripEventsListElement = new EventsListTemplate();

  #tripPoints = [];

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
    this.#tripEventsElement = this.#tripContainer.querySelector('.trip-events');
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];

    this.#renderPoint();
  };

  #renderNoPoint = () => {
    render(this.#tripEventsElement, this.#noComponent, RenderPosition.BEFOREEND);
  };

  #renderPointsListElements = () => {
    render(this.#tripEventsElement, this.#tripEventsListElement, RenderPosition.BEFOREEND);
  };

  #renderSort = () => {
    render(this.#tripEventsElement, this.#sortComponent, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripEventsListElement);
    pointPresenter.init(point);
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
}
