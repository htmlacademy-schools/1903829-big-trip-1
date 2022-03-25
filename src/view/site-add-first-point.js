import { createElement } from '../render.js';

const createFirstPoint = () => {
    `<p class="trip-events__msg">
    Click New Event to create your first point
    </p>`
}

export default class AddFirstPoint {
  #element = null;
  
  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      }
  
      return this.#element;
    }
  
    get template() {
      return createFirstPoint();
    }
  
    removeElement() {
      this.#element = null;
    }
}
