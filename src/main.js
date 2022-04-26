import { generatePoint} from './mock/point.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const POINT_COUNT = 10;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const tripEventsElement = document.querySelector('.trip-events');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripEventsElement, tripControlsNavigationElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFiltersElement, filterModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
