import EditNewPoint from '../view/site-edit-point.js';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType } from '../const.js';
import { RenderPosition, render, remove } from '../utils/render';

export default class EventNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #waypoint = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = (waypoint) => {
    this.#waypoint = waypoint;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditNewPoint(this.#waypoint);
    this.#pointEditComponent.setClickRollupHandler(this.#handleDeleteClick);
    this.#pointEditComponent.setFormSubmitHadler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointListContainer, this.#pointEditComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      { id: nanoid(), ...point },
    );
    this.destroy();
  };
}
