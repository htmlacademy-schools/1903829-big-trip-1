import EditNewPoint from '../view/site-edit-point';
import TripEventsView from '../view/site-trip-events-view';
import { RenderPosition, render, replace, remove } from '../utils/render';
import { UpdateType, UserAction, State, Mode } from '../const';
import { checkedDate } from '../utils/functionsWithDayjs';

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

    this.#itemTemplateComponent.setClickRollupHandler(this.#replacePointToEditPoint);
    this.#editPointComponent.setClickRollupHandler(this.#replaceEditPointToPoint);
    this.#editPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#itemTemplateComponent.setFavoriteClickHandler(this.#favoriteClickHandler);
    this.#editPointComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevItemComponent === null || prevEditComponent === null) {
      render(this.#pointCointainer, this.#itemTemplateComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#itemTemplateComponent, prevItemComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#itemTemplateComponent, prevEditComponent);
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
      this.#replaceEditPointToPoint();
    }
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditPointToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #replaceEditPointToPoint = () => {
    this.#editPointComponent.reset(this.#wayPoint);
    replace(this.#itemTemplateComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #replacePointToEditPoint = () => {
    replace(this.#editPointComponent, this.#itemTemplateComponent);
    this.#changeMode();
    this.#mode = Mode.EDITING;
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #favoriteClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { ...this.#wayPoint, favorite: !this.#wayPoint.favorite },
    );
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !checkedDate(this.#wayPoint.date.start, update.date.start) ||
      !checkedDate(this.#wayPoint.date.end, update.date.end);

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  setViewState = (state) => {
    if (this.#mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this.#editPointComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this.#editPointComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this.#editPointComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this.#itemTemplateComponent.shake(resetFormState);
        this.#editPointComponent.shake(resetFormState);
        break;
    }
  };
}
