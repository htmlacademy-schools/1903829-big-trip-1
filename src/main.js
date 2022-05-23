import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import { MenuItem } from './const.js';
import TripTabsTemplate from './view/site-trip-tabs.js';
import { render, RenderPosition, remove } from './utils/render.js';
import StatisticsView from './view/statistics-view.js';
import { clearStatistics, counting } from './utils/statistics.js';
import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic ffg7e433kkd9fOps';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const siteMenuComponent = new TripTabsTemplate();
const tripEventsElement = document.querySelector('.trip-events');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main').querySelector('.page-body__container');
const tripAddButton = document.querySelector('.trip-main__event-add-btn');

tripAddButton.disabled = true;

const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFiltersElement, filterModel, pointsModel);

tripPresenter.init();

let statsView = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.POINTS:
      tripEventsElement.classList.add('trip-events');
      filterPresenter.destroy();
      tripPresenter.destroy();
      filterPresenter.init(pointsModel.points);
      tripPresenter.init();
      remove(statsView);
      statsView = null;
      clearStatistics();
      break;
    case MenuItem.STATISTICS:
      tripEventsElement.classList.remove('trip-events');
      counting(pointsModel.points);
      statsView = new StatisticsView();
      render(siteMainElement, statsView, RenderPosition.BEFOREEND);
      filterPresenter.destroy();
      tripPresenter.destroy();
      tripPresenter.renderTrip();
      break;
  }
};

pointsModel.init().finally(() => {
  filterPresenter.init(pointsModel.points);
  render(tripControlsNavigationElement, siteMenuComponent, RenderPosition.BEFOREEND);
  tripAddButton.disabled = false;
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});

tripAddButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  evt.target.disabled = true;
  tripEventsElement.classList.add('trip-events');
  const tableLink = document.querySelector('#POINTS');
  const statsLink = document.querySelector('#STATISTICS');
  tableLink.classList.add('trip-tabs__btn--active');
  statsLink.classList.remove('trip-tabs__btn--active');
  filterPresenter.destroy();
  filterPresenter.init(pointsModel.points);
  tripPresenter.destroy();
  if(statsView) {
    remove(statsView);
  }
  clearStatistics();
  tripPresenter.createPoint();
  tripPresenter.init();
});
