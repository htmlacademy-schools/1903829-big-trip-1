import { RenderPosition, renderElement } from './render.js';
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

renderElement(tripEventsElement, new EventsListTemplate().element, RenderPosition.BEFOREEND);
renderElement(tripControlsNavigationElement, new TripTabsTemplate().element, RenderPosition.BEFOREEND);
renderElement(tripControlsFiltersElement, new TripFiltersTemplate().element, RenderPosition.BEFOREEND);
renderElement(tripEventsElement, new TripSortTemplate().element, RenderPosition.AFTERBEGIN);
renderElement(tripEventsListElement.element, new AddNewPoint(points[1]).element, RenderPosition.BEFOREEND);
renderElement(tripEventsListElement.element, new EditNewPoint(points[0]).element, RenderPosition.BEFOREEND);
for (let i = 2; i < POINT_COUNT; i++) {
  renderElement(tripEventsListElement.element, new TripEventsItemTemplate(points[i]).element, RenderPosition.BEFOREEND);
}
