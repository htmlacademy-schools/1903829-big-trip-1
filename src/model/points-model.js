import AbstractObservable from '../utils/abstract-observable.js';
import { UpdateType } from '../const.js';
import { generateOffers, generateCities, createNewEvent } from '../utils/common.js';
import { countDuration } from '../utils/functionsWithDayjs.js';
import { wayPointTypes } from '../utils/informations.js';

const arrayCities = null;
const arrayTypes = [];
const listTypes = wayPointTypes();

const adaptToClient = (point) => {
  const adaptedPoint = {
    id: point.id,
    isCreateEvent: false,
    favorite: point.is_favorite,
    city: {
      currentCity: {
        titleCity: point.destination.titleCity,
        description: point.destination.description,
        photos: point.destination.photos
      },
      arrayCity: arrayCities
    },
    date: {
      start: point.date_from,
      end: point.date_to
    },
    startPrice: point.base_price,
    price: null,
    type: {
      currentType: {
        title: point.type,
        img: listTypes[point.type].img,
        allOffer: listTypes[point.type].allOffer,
        selectedOffer: point.offers,
      },
      arrayType: arrayTypes
    },
    time: countDuration(point.date_from, point.date_to),
    isDisabled: false,
    isDeleting: false,
    isSaving: false,
  };
  return adaptedPoint;
};

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
      this.#points = points.map((point) => adaptToClient(point));
      createNewEvent();
    } catch(err) {
      this.#points = [];
      createNewEvent();
    }

    this._notify(UpdateType.INIT);
  };

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#apiService.updatePoint(update);
      const updatedPoint = adaptToClient(response);
      this.#points = [ ...this.#points.slice(0, index), update, ...this.#points.slice(index + 1) ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  };

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#apiService.addPoint(update);
      const newPoint = adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  };

  deletePoints = async (updateType, update) => {
    const index = this.#points.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#apiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
  };
}
