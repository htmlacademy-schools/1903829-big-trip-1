import { renderTemplate, RenderPosition } from './render.js';
import { createTripTabsTemplate } from './view/site-trip-tabs.js';
import { createTripSortTemplate } from './view/site-trip-sort.js';
import { createTripFiltersTemplate } from './view/site-trip-filter.js';
import { createTripEventsItemTemplate } from './view/site-trip-event-item-view.js';
import { createAddNewPoint } from './view/site-add-new-point.js';
import { createEditNewPoint } from './view/site-edit-new-point.js';
import { createEventsListTemplate } from './view/site-list-view.js';
import { generatePoint } from './mock/point.js';

const POINT_COUNT = 15;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

renderTemplate(tripEventsElement, createEventsListTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripControlsNavigationElement, createTripTabsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripControlsFiltersElement, createTripFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createTripSortTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(tripEventsListElement, createEditNewPoint(), RenderPosition.AFTERBEGIN);
renderTemplate(tripEventsListElement, createAddNewPoint(), RenderPosition.AFTERBEGIN);
for (let i = 0; i < POINT_COUNT; i++) {
  renderTemplate(tripEventsListElement, createTripEventsItemTemplate(points[i]), RenderPosition.BEFOREEND);
}
