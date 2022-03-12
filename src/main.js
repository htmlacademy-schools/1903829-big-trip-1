import { renderTemplate, RenderPosition } from './render.js';
import { createTripTabsTemplate } from './view/site-trip-tabs.js';
import { createTripSortTemplate } from './view/site-trip-sort.js';
import { createTripFiltersTemplate } from './view/site-trip-filter.js';
import { createTripEventsItemTemplate } from  './view/site-point.js';
import { createAddNewPoint } from './view/site-add-new-point.js';

const TripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const TripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const TripEventsElement = document.querySelector('.trip-events');
const TripEventsListElement = TripEventsElement.querySelector('.trip-events__list');

renderTemplate(TripEventsElement, createAddNewPoint(), RenderPosition.BEFOREEND);
renderTemplate(TripControlsNavigationElement, createTripTabsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(TripControlsFiltersElement, createTripFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(TripEventsElement, createTripSortTemplate(), RenderPosition.AFTERBEGIN);
for (let i = 0; i < 3; i++) {
  renderTemplate(TripEventsListElement, createTripEventsItemTemplate(), RenderPosition.BEFOREEND);
}

