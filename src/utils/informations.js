import dayjs from 'dayjs';

export const SortType = {
  DAY: {text: 'day', checked: true},
  TIME: {text: 'time', checked: false},
  PRICE: {text: 'price', checked: false},
};

export const sortDate = (a, b) => dayjs(a.date.start).diff(dayjs(b.date.start));

export const sortTime = (a, b) => {
  const timeOne = dayjs(a.date.end).diff(dayjs(a.date.start));
  const timeTwo = dayjs(b.date.end).diff(dayjs(b.date.start));
  return timeOne - timeTwo;
};

export const sortPrice = (a, b) => a.startPrice - b.startPrice;
