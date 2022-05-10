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
const filterPresenter = new FilterPresenter(tripControlsFiltersElement, filterModel);

filterPresenter.init();
tripPresenter.init();

let statsView = null;

const handleTaskNewFormClose = () => {
  siteMenuComponent.element.querySelector(`[value=${MenuItem.POINTS}]`).disabled = false;
  siteMenuComponent.element.querySelector(`[value=${MenuItem.STATISTICS}]`).disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TASKS);
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      // Скрыть статистику
      // Показать фильтры
      // Показать доску
      tripPresenter.createTask(handleTaskNewFormClose);
      siteMenuComponent.element.querySelector(`[value=${MenuItem.POINTS}]`).disabled = true;
      siteMenuComponent.element.querySelector(`[value=${MenuItem.STATISTICS}]`).disabled = true;
      break;
    case MenuItem.POINTS:
      filterPresenter.destroy();
      tripPresenter.destroy();
      filterPresenter.init();
      tripPresenter.init();
      remove(statsView);
      statsView = null;
      clearStatistics();
      break;
    case MenuItem.STATISTICS:
      counting(pointsModel.points);
      statsView = new StatisticsView();
      render(siteMainElement, statsView, RenderPosition.BEFOREEND);
      filterPresenter.destroy();
      tripPresenter.destroy();
      //
      break;
  }
};

pointsModel.init().finally(() => {
  render(tripControlsNavigationElement, siteMenuComponent, RenderPosition.BEFOREEND);
  tripAddButton.disabled = false;
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});

tripAddButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  evt.target.disabled = true;
  const tableLink = document.querySelector('#POINTS');
  const statsLink = document.querySelector('#STATISTICS');
  tableLink.classList.add('trip-tabs__btn--active');
  statsLink.classList.remove('trip-tabs__btn--active');
  filterPresenter.destroy();
  filterPresenter.init();
  tripPresenter.destroy();
  if(statsView) {
    remove(statsView);
  }
  clearStatistics();
  tripPresenter.createPoint();
  tripPresenter.init();
});


