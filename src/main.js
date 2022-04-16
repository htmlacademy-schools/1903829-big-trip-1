import { generatePoint} from './mock/point.js';
import TripPresenter from './presenter/trip-presenter.js';

const POINT_COUNT = 15;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const tripEventsElement = document.querySelector('.trip-events');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');

const tripPresenter = new TripPresenter(tripEventsElement, tripControlsNavigationElement, tripControlsFiltersElement);
tripPresenter.init(points);
