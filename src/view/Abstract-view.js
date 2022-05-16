import { createElement } from '../utils/render.js';

const timeOut = 600;

export default class AbstractView {
  #element = null;
  _callback = {};

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error('Abstract method not impleted: get template');
  }

  removeElement() {
    this.#element = null;
  }

  shake(callback) {
    this.element.style.animation = `shake ${ timeOut / 1000 }s`;
    setTimeout(() => {
      this.element.style.animation = '';
      callback();
    },
    timeOut);
  }
}
