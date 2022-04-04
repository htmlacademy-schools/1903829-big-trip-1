import EditNewPoint from '../view/site-edit-new-point';
import TripEventsItemTemplate from '../view/site-trip-event-item-view';
import { RenderPosition, render, replace } from '../utils/render';

export default class PointPresenter {
  #pointCointainer = null;

  #itemTemplateComponent = null;
  #editPointComponent = null;
  #wayPoint = null;

  constructor(pointContainer) {
    this.#pointCointainer = pointContainer;
  }

  init = (wayPoint) => {
    this.#wayPoint = wayPoint;
    this.#itemTemplateComponent = new TripEventsItemTemplate(wayPoint);
    this.#editPointComponent = new EditNewPoint(wayPoint);

    this.#itemTemplateComponent.setEditClickHandler(this.#editClickHandler);
    this.#editPointComponent.setEventRollupBtnHandler(this.#eventRollupHandler);
    this.#editPointComponent.setFormSubmitHandler(this.#formSubmitHandler);

    render(this.#pointCointainer, this.#itemTemplateComponent, RenderPosition.BEFOREEND);
  };

  #replaceWaypointToForm = () => {
    replace(this.#editPointComponent, this.#itemTemplateComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToWaypoint = () => {
    replace(this.#itemTemplateComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToWaypoint();
    }
  };

  #eventRollupHandler = () => {
    this.#replaceFormToWaypoint();
  };

  #formSubmitHandler = () => {
    this.#replaceFormToWaypoint();
  };

  #editClickHandler = () => {
    this.#replaceWaypointToForm();
  };
}
