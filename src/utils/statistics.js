import { MONEY, COUNTTYPE, TIME } from './informations.js';
import { TYPEPOINT } from '../const.js';

export const clearStatistics = () => {
  const typeEventValue =  Object.values(TYPEPOINT);
  typeEventValue.forEach((eventValue) => {
    MONEY[eventValue] = 0;
    TIME[eventValue] = 0;
    COUNTTYPE[eventValue] = 0;
  });
};

export const counting = (points) => {
  points.forEach((point) => {
    MONEY[point.type.currentType.title] += point.allPrice;
    TIME[point.type.currentType.title] += point.time.arrayDurationFormat.unix;
    COUNTTYPE[point.type.currentType.title] += 1;
  });
};
