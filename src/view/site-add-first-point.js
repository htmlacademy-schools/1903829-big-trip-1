import AbstractView from './Abstract-view.js';
import { FilterType } from '../const.js';

const PointsType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no events future',
  [FilterType.PAST]: 'There are no events past'
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
