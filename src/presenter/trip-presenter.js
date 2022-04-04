// класс для презентера маршрута
import AddFirstPoint from '../view/site-add-first-point';
import EventsListTemplate from '../view/site-list-view';
import TripFiltersTemplate from '../view/site-trip-filter';
import TripSortTemplate from '../view/site-trip-sort';
import TripTabsTemplate from './view/site-trip-tabs.js';
import { RenderPosition, render } from './utils/render.js';
import TripEventsItemTemplate from '../view/site-trip-event-item-view';
import EditNewPoint from '../view/site-edit-new-point';

export default class TripPresenter {
  #tripContainer = null;
  wayPointElement = null;

  #tripControlsNavigationElement = null;
  #tripControlsFiltersElement = null;
  #tripEventsElement = null;

  #tabsComponent = new TripTabsTemplate();
  #sortComponent = new TripSortTemplate();
  #filterComponent = new TripFiltersTemplate();
  #noComponent = new AddFirstPoint();
  #tripEventsListElement = new EventsListTemplate();

  #tripPoints = [];

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;

    this.#tripControlsNavigationElement = this.#tripContainer.querySelector('.trip-controls__navigation');
    this.#tripControlsFiltersElement = this.#tripContainer.querySelector('.trip-controls__filters');
    this.#tripEventsElement = this.#tripContainer.querySelector('.trip-events');
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];

    this.#renderPoint();
  };

  #renderTabs = () => {
    render(this.#tripControlsNavigationElement, this.#tabsComponent, RenderPosition.BEFOREEND);
  };

  #renderFilters = () => {
    render(this.#tripControlsFiltersElement, this.#filterComponent, RenderPosition.BEFOREEND);
  };

  #renderNoPoint = () => {
    render(this.#tripEventsElement, this.#noComponent, RenderPosition.BEFOREEND);
  };

  #renderPointsListElements = () => {
    render(this.#tripEventsElement, this.#tripEventsListElement, RenderPosition.BEFOREEND);
  };

  #renderSort = () => {
    render(this.#tripEventsElement, this.#sortComponent, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const itemTemplate = new TripEventsItemTemplate(point);
    const editPoint = new EditNewPoint(point);

    const replaceWaypointToForm = () => {
      this.#tripEventsListElement.replaceChild(editPoint.element, itemTemplate.element);
    };
    const replaceFormToWaypoint = () => {
      this.#tripEventsListElement.replaceChild(itemTemplate.element, editPoint.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToWaypoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    itemTemplate.setEditClickHandler(() => {
      replaceWaypointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });
    editPoint.setEventRollupBtnHandler(() => {
      replaceFormToWaypoint();
      document.addEventListener('keydown', onEscKeyDown);
    });
    editPoint.setFormSubmitHandler(() => {
      replaceFormToWaypoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this.#tripEventsListElement, itemTemplate, RenderPosition.BEFOREEND);
  };

  #renderPoints = () => {
    for (let i = 1; i < this.#tripPoints.length; i++) {
      this.renderPoint(this.#tripPoints[i]);
    }
  };

  #renderTripStart = () => {
    if (this.#tripPoints.length === 0) {
      this.#renderNoPoint();
    } else {
      this.#renderSort();
      this.#renderPointsListElements();
      this.#renderPoints();
    }
  };
}
