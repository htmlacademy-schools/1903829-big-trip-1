import AbstractView from './abstract-view';

const createNoTaskTemplate = () => (
  `<p class="trip-events__msg">
      Loading...
  </p>`
);

export default class LoadingView extends AbstractView {
  get template() {
    return createNoTaskTemplate();
  }
}
