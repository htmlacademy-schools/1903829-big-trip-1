import { RenderPosition, render } from './utils/render.js';
import TripTabsTemplate from './view/site-trip-tabs.js';
import TripSortTemplate from './view/site-trip-sort.js';
import TripFiltersTemplate from './view/site-trip-filter.js';
import TripEventsItemTemplate from './view/site-trip-event-item-view.js';
import AddNewPoint from './view/site-add-new-point.js';
import EditNewPoint from './view/site-edit-new-point.js';
import EventsListTemplate from './view/site-list-view.js';
import { generatePoint} from './mock/point.js';
import AddFirstPoint from './view/site-add-first-point.js';

const POINT_COUNT = 15;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripEventsListElement = new EventsListTemplate();

render(tripControlsNavigationElement, TripTabsTemplate, RenderPosition.BEFOREEND);
render(tripControlsFiltersElement, TripFiltersTemplate, RenderPosition.BEFOREEND);

if (points.length === 0) {
  render(tripEventsElement, AddFirstPoint(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new TripSortTemplate(), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, tripEventsListElement, RenderPosition.BEFOREEND);
  const pnt1 = points[0];
  render(tripEventsListElement, AddNewPoint(pnt1), RenderPosition.BEFOREEND);
}

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

  render(elementsList, itemTemplate, RenderPosition.BEFOREEND);
};

for (let i = 1; i < POINT_COUNT; i++) {
  renderPoint(tripEventsListElement, points[i]);
}
