import AbstractView from './Abstract-view.js';

const createFirstPoint = () => (
  `<p class="trip-events__msg">
  Click New Event to create your first point
  </p>`
);

export default class AddFirstPoint extends AbstractView {
  get template() {
    return createFirstPoint();
  }
}
