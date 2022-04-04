import EditNewPoint from '../view/site-edit-new-point';
import TripEventsItemTemplate from '../view/site-trip-event-item-view';
import { RenderPosition, render, replace, remove } from '../utils/render';

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

    const prevItemComponent = this.#itemTemplateComponent;
    const prevEditComponent = this.#editPointComponent;

    this.#itemTemplateComponent.setEditClickHandler(this.#editClickHandler);
    this.#editPointComponent.setEventRollupBtnHandler(this.#eventRollupHandler);
    this.#editPointComponent.setFormSubmitHandler(this.#formSubmitHandler);

    if (prevItemComponent === null || prevEditComponent === null) {
      render(this.#pointCointainer, this.#itemTemplateComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#pointCointainer.element.contains(prevItemComponent.element)) {
      replace(this.#itemTemplateComponent, prevItemComponent);
    }

    if (this.#pointCointainer.element.contains(prevEditComponent.element)) {
      replace(this.#editPointComponent, prevEditComponent);
    }

    remove(prevItemComponent);
    remove(prevEditComponent);
  };

  destroy = () => {
    remove(this.#itemTemplateComponent);
    remove(this.#editPointComponent);
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
