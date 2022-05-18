import AbstractView from './Abstract-view';
import { sortDate } from '../utils/informations.js';
import { dateRend } from '../utils/functionsWithDayjs';

const createTripInfo = (points) => {
  points.sort(sortDate);
  const cities = points.map((point)=> point.city.currentCity.titleCity);
  let allPrice = null;
  points.forEach((point) => { allPrice += Number(point.startPrice); });
  const dateBegin = dateRend(points[0].date.start,'MMM D');
  const dateEnd = dateRend(points[points.length - 1].date.end, 'MMM DD');

  let tripTitles = '';

  if(cities.length <= 3) {
    cities.forEach((nameCity, index) => {
      if(index === cities.length - 1) {
        tripTitles += `${ nameCity }`;
      }
      else {
        tripTitles += `${ nameCity } &mdash; `;
      }
    });
  } else if(cities.length > 3) {
    tripTitles = `${ cities[0] } &mdash; ... &mdash; ${ cities[cities.length - 1] }`;
  }

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${ tripTitles }</h1>
              <p class="trip-info__dates">${ dateBegin }&nbsp;&mdash;&nbsp;${ dateEnd }</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp; <span class="trip-info__cost-value">${ allPrice }</span>
            </p>
          </section>`;
};

export default class PointsInfoView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createTripInfo(this.#points);
  }
}
