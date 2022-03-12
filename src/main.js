import { renderTemplate, RenderPosition } from './render.js';
import { createTripTabsTemplate } from './view/site-trip-tabs.js';
import { createTripSortTemplate } from './view/site-trip-sort.js';
import { createTripFiltersTemplate } from './view/site-trip-filter.js';
import { createTripEventsItemTemplate } from  './view/site-trip-event-item-view.js';
import { createAddNewPoint } from './view/site-add-new-point.js';
import { createEditNewPoint } from './view/site-edit-new-point.js';
import { createEventsListTemplate } from './view/site-list-view.js';
import { generatePoint } from './mock/point.js';

const POINT_COUNT = 3;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const TripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const TripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const TripEventsElement = document.querySelector('.trip-events');
const TripEventsListElement = TripEventsElement.querySelector('.trip-events__list');

renderTemplate(TripEventsElement, createEventsListTemplate(), RenderPosition.BEFOREEND);
renderTemplate(TripControlsNavigationElement, createTripTabsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(TripControlsFiltersElement, createTripFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(TripEventsElement, createTripSortTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(TripEventsListElement, createEditNewPoint(), RenderPosition.AFTERBEGIN);
renderTemplate(TripEventsListElement, createAddNewPoint(), RenderPosition.AFTERBEGIN);
for (let i = 0; i < POINT_COUNT; i++) {
  renderTemplate(TripEventsListElement, createTripEventsItemTemplate(points[i]), RenderPosition.BEFOREEND);
}
