import EditNewPoint from '../view/site-edit-new-point';
import TripEventsItemTemplate from '../view/site-trip-event-item-view';
import { RenderPosition, render, replace, remove } from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointCointainer = null;
  #changeData = null;
  #changeMode = null;

  #itemTemplateComponent = null;
  #editPointComponent = null;
  #wayPoint = null;
  #mode = Mode.DEFAULT;

  constructor(pointContainer, changeData, changeMode) {
    this.#pointCointainer = pointContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (wayPoint) => {
    this.#wayPoint = wayPoint;
    this.#itemTemplateComponent = new TripEventsItemTemplate(wayPoint);
    this.#editPointComponent = new EditNewPoint(wayPoint);

    const prevItemComponent = this.#itemTemplateComponent;
    const prevEditComponent = this.#editPointComponent;

    this.#itemTemplateComponent.setEditClickHandler(this.#editClickHandler);
    this.#itemTemplateComponent.setFavoriteClickHandler(this.#favoriteClickHandler);
    this.#editPointComponent.setEventRollupBtnHandler(this.#eventRollupHandler);
    this.#editPointComponent.setFormSubmitHandler(this.#formSubmitHandler);

    if (prevItemComponent === null || prevEditComponent === null) {
      render(this.#pointCointainer, this.#itemTemplateComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#itemTemplateComponent, prevItemComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditComponent);
    }

    remove(prevItemComponent);
    remove(prevEditComponent);
  };

  destroy = () => {
    remove(this.#itemTemplateComponent);
    remove(this.#editPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToWaypoint();
    }
  };

  #replaceWaypointToForm = () => {
    replace(this.#editPointComponent, this.#itemTemplateComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToWaypoint = () => {
    replace(this.#itemTemplateComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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

  #formSubmitHandler = (pnt) => {
    this.#changeData(pnt);
    this.#replaceFormToWaypoint();
  };

  #editClickHandler = () => {
    this.#replaceWaypointToForm();
  };

  #favoriteClickHandler = () => {
    this.#changeData({...this.#wayPoint, isFavorite: !this.#wayPoint.isFavorite});
  };
}
