import { generatePoint} from './mock/point.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import { MenuItem } from './const.js';
import TripTabsTemplate from './view/site-trip-tabs.js';
import { render, RenderPosition, remove } from './utils/render.js';
import StatisticsView from './view/statistics-view.js';
import { clearStatistics, counting } from './utils/statistics.js';

const POINT_COUNT = 10;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const siteMenuComponent = new TripTabsTemplate();
const tripEventsElement = document.querySelector('.trip-events');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main').querySelector('.page-body__container');

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterModel = new FilterModel();

render(tripControlsNavigationElement, siteMenuComponent, RenderPosition.BEFOREEND);
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
      filterPresenter.init();
      tripPresenter.init();
      remove(statsView);
      clearStatistics();
      break;
    case MenuItem.STATISTICS:
      counting(pointsModel.points);
      statsView = new StatisticsView();
      render(siteMainElement, statsView, RenderPosition.BEFOREEND);
      filterPresenter.destroy();
      tripPresenter.destroy();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  const tableLink = document.querySelector('#POINTS');
  const statsLink = document.querySelector('#STATISTICS');
  tableLink.classList.add('trip-tabs__btn--active');
  statsLink.classList.remove('trip-tabs__btn--active');
  filterPresenter.destroy();
  filterPresenter.init();
  tripPresenter.destroy();
  tripPresenter.init();
  tripPresenter.createPoint();
});
