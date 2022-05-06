import AbstractObservable from '../utils/abstract-observable.js';

export default class PointsModel extends AbstractObservable {
  #points = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get points() {
    return this.#points;
  }

  init = async () => {
    const points = await this.#apiService.tasks;
    this.#points = points.map(this.#adaptToClient);
  };

  updateEvent = (updateType, update) => {
    const index = this.#points.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addEvent = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  };

  deleteEvents = (updateType, update) => {
    const index = this.#points.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  };

  #adaptToClient = (point) => {
    const adaptedTask = {...point,
      dueDate: point['due_date'] !== null ? new Date(point['due_date']) : point['due_date'],
      isArchive: point['is_archived'],
      isFavorite: point['is_favorite'],
      repeating: point['repeating_days'],
    };

    delete adaptedTask['due_date'];
    delete adaptedTask['is_archived'];
    delete adaptedTask['is_favorite'];
    delete adaptedTask['repeating_days'];

    return adaptedTask;
  };
}
