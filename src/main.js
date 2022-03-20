import { RenderPosition, render } from './render.js';
import TripTabsTemplate from './view/site-trip-tabs.js';
import TripSortTemplate from './view/site-trip-sort.js';
import TripFiltersTemplate from './view/site-trip-filter.js';
import TripEventsItemTemplate from './view/site-trip-event-item-view.js';
import AddNewPoint from './view/site-add-new-point.js';
import EditNewPoint from './view/site-edit-new-point.js';
import EventsListTemplate from './view/site-list-view.js';
import { generatePoint} from './mock/point.js';

const POINT_COUNT = 15;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripEventsListElement = new EventsListTemplate();

render(tripEventsElement, new EventsListTemplate().element, RenderPosition.BEFOREEND);
render(tripControlsNavigationElement, new TripTabsTemplate().element, RenderPosition.BEFOREEND);
render(tripControlsFiltersElement, new TripFiltersTemplate().element, RenderPosition.BEFOREEND);
render(tripEventsElement, new TripSortTemplate().element, RenderPosition.AFTERBEGIN);
render(tripEventsListElement.element, new AddNewPoint(points[1]).element, RenderPosition.BEFOREEND);

const renderPoint = (elementsList, point) => {
  const itemTemplate = new TripEventsItemTemplate(point);
  const editPoint = new EditNewPoint(point);

  const replaceWaypointToForm = () => {
    elementsList.replaceChild(editPoint.element, itemTemplate.element);
  };
  const replaceFormToWaypoint = () => {
    elementsList.replaceChild(itemTemplate.element, editPoint.element);
  };
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToWaypoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  itemTemplate.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceWaypointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });
  editPoint.element.querySelector('form').addEventListener('submit', (p) => {
    p.preventDefault();
    replaceFormToWaypoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(elementsList, itemTemplate.element, RenderPosition.BEFOREEND);
};

for (let i = 1; i < POINT_COUNT; i++) {
  renderPoint(tripEventsListElement.element, points[i]);
}
