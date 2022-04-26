import EditNewPoint from '../view/site-edit-point';
import TripEventsView from '../view/site-trip-events-view';
import { RenderPosition, render, replace, remove } from '../utils/render';
import { UpdateType, UserAction } from '../const';
import { chackedDate } from '../utils/functionsWithDayjs';

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
    const prevItemComponent = this.#itemTemplateComponent;
    const prevEditComponent = this.#editPointComponent;
    this.#itemTemplateComponent = new TripEventsView(this.#wayPoint);
    this.#editPointComponent = new EditNewPoint(this.#wayPoint);

    this.#itemTemplateComponent.setEditClickHandler(this.#editClickHandler);
    this.#itemTemplateComponent.setFavoriteClickHandler(this.#favoriteClickHandler);
    this.#editPointComponent.setEventRollupBtnHandler(this.#eventRollupHandler);
    this.#editPointComponent.setFormSubmitHandler(this.#formSubmitHandler);
    this.#editPointComponent.setDeleteClickHandler(this.#handleDeleteClick);

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
    this.#editPointComponent.reset(this.#wayPoint);
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
    this.#changeData({ ...this.#wayPoint, isFavorite: !this.#wayPoint.isFavorite });
    this.#changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      { ...this.#wayPoint, favorite: !this.#wayPoint.favorite },
    );
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !chackedDate(this.#wayPoint.date.dataBeginEvent, update.date.dataBeginEvent) ||
      !chackedDate(this.#wayPoint.date.dataEndEvent, update.date.dataEndEvent);

    this.#changeData(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceFormToWaypoint();
  };

  #handleDeleteClick = (event) => {
    this.#changeData(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  };
}
