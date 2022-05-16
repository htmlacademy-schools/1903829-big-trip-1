import { TYPEPOINT } from '../const.js';

export const TIME = {
  [TYPEPOINT.TAXI]: 0,
  [TYPEPOINT.BUS]: 0,
  [TYPEPOINT.DRIVE]: 0,
  [TYPEPOINT.CHECKIN]: 0,
  [TYPEPOINT.FLIGHT]: 0,
  [TYPEPOINT.RESTAURANT]: 0,
  [TYPEPOINT.SIGHTSEEING]: 0,
  [TYPEPOINT.TRAIN]: 0,
  [TYPEPOINT.SHIP]: 0,
};

export const MONEY = {
  [TYPEPOINT.TAXI]: 0,
  [TYPEPOINT.BUS]: 0,
  [TYPEPOINT.DRIVE]: 0,
  [TYPEPOINT.CHECKIN]: 0,
  [TYPEPOINT.FLIGHT]: 0,
  [TYPEPOINT.RESTAURANT]: 0,
  [TYPEPOINT.SIGHTSEEING]: 0,
  [TYPEPOINT.TRAIN]: 0,
  [TYPEPOINT.SHIP]: 0,
};

export const COUNTTYPE = {
  [TYPEPOINT.TAXI]: 0,
  [TYPEPOINT.BUS]: 0,
  [TYPEPOINT.DRIVE]: 0,
  [TYPEPOINT.CHECKIN]: 0,
  [TYPEPOINT.FLIGHT]: 0,
  [TYPEPOINT.RESTAURANT]: 0,
  [TYPEPOINT.SIGHTSEEING]: 0,
  [TYPEPOINT.TRAIN]: 0,
  [TYPEPOINT.SHIP]: 0,
};

export const clearStatistics = () => {
  const typeEventValue =  Object.values(TYPEPOINT);
  typeEventValue.forEach((value) => {
    MONEY[value] = 0;
    TIME[value] = 0;
    COUNTTYPE[value] = 0;
  });
};

export const counting = (points) => {
  points.forEach((point) => {
    MONEY[point.type.currentType.title] += Number(point.startPrice);
    TIME[point.type.currentType.title] += point.time.arrayDurationFormat.unix;
    COUNTTYPE[point.type.currentType.title] += 1;
  });
};
