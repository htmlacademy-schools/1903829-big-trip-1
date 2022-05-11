import AbstractObservable from '../utils/abstract-observable.js';
import { UpdateType } from '../const.js';
import { generateOffers, generateCities, createNewEvent } from '../utils/common.js';

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
    try {
      const offers = await this.#apiService.offers;
      generateOffers(offers);
      const cities = await this.#apiService.cities;
      generateCities(cities);
      const points = await this.#apiService.points;
      this.#points = points.map((point) => this.#adaptToClient(point));
      createNewEvent();
    } catch(err) {
      this.#points = [];
      createNewEvent();
    }

    this._notify(UpdateType.INIT);
  };

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#apiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [ ...this.#points.slice(0, index), update, ...this.#points.slice(index + 1), ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  };

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#apiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  };

  deletePoints = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      /*await*/ this.#apiService.deletePoints(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
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
