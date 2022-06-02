import AbstractView from './Abstract-view';
import { FilterType } from '../const.js';

const PointsType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no events now',
  [FilterType.PAST]: 'There are no events now'
};

const createFirstPoint = (filterType) => {
  const eventsEmptyText = PointsType[filterType];
  return `<p class="trip-events__msg">
            ${eventsEmptyText}
          </p>`;
};

export default class AddFirstPoint extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createFirstPoint(this._data);
  }
}
