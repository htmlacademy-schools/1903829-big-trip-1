import { RenderPosition, render } from './utils/render.js';
import TripTabsTemplate from './view/site-trip-tabs.js';
import TripFiltersTemplate from './view/site-trip-filter.js';
import { generatePoint} from './mock/point.js';
import TripPresenter from './presenter/trip-presenter.js';

const POINT_COUNT = 15;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const pageBodyElement = document.querySelector('.page-body');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');

render(tripControlsNavigationElement, TripTabsTemplate, RenderPosition.BEFOREEND);
render(tripControlsFiltersElement, TripFiltersTemplate, RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(pageBodyElement);
tripPresenter.init(points);
