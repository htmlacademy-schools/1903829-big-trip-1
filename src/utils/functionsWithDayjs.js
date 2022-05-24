import dayjs from 'dayjs';

export const dateRend = (date, format) => dayjs(date).format(format);

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortPointUp = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dueDate, pointB.dueDate);

  return weight ?? dayjs(pointA.dueDate).diff(dayjs(pointB.dueDate));
};

export const sortPointDown = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dueDate, pointB.dueDate);

  return weight ?? dayjs(pointB.dueDate).diff(dayjs(pointA.dueDate));
};

export const getDifferentDates = (dayOne, dayTwo) => {
  const diffDateUnix = Math.abs(dayjs(dayOne).diff(dayjs(dayTwo)));

  const days = Math.floor(diffDateUnix / (24 * 60 * 60 * 1000));

  const hours = Math.floor(diffDateUnix / (60 * 60 * 1000) - (24 * days));

  const minuts = diffDateUnix / (60 * 1000) - (days * 24 * 60) - (hours * 60);
  return { 'days': days, 'hours': hours, 'minuts': minuts, 'unix': diffDateUnix };
};

export const countDuration = (dateStart, dateEnd) => {
  const duration = getDifferentDates(dateStart, dateEnd);
  let durationFormat = '';
  if (duration.days !== 0) {
    durationFormat += `${(`0${duration.days}`).slice(-2)}D ${(`0${duration.hours}`).slice(-2)}H ${(`0${duration.minuts}`).slice(-2)}M`;
  }
  else if (duration.hours !== 0) {
    durationFormat += `${(`0${duration.hours}`).slice(-2)}H ${(`0${duration.minuts}`).slice(-2)}M`;
  }
  else {
    durationFormat += `${(`0${duration.minuts}`).slice(-2)}M`;
  }

  return {
    'startTime': `${dayjs(dateStart).format('HH')}:${dayjs(dateStart).format('mm')}`,
    'endTime': `${dayjs(dateEnd).format('HH')}:${dayjs(dateEnd).format('mm')}`,
    'duration': durationFormat,
    'arrayDurationFormat': duration
  };
};

export const chackedDate = (d1, d2) => (d1 === null && d2 === null) || dayjs(d1).isSame(d2, 'D');

export const getFormatDates = (time) => {
  const days = Math.floor(time / (24 * 60 * 60 * 1000));
  const hours = Math.floor(time / (60 * 60 * 1000) - (24 * days));
  const minuts =Math.floor( time / (60 * 1000) - (days * 24 * 60) - (hours * 60));
  let durationFormat = '';
  if (days !== 0) {
    durationFormat += `${(`0${days}`).slice(-2)}D ${(`0${hours}`).slice(-2)}H ${(`0${minuts}`).slice(-2)}M`;
  } else if (hours !== 0) {
    durationFormat += `${(`0${hours}`).slice(-2)}H ${(`0${minuts}`).slice(-2)}M`;
  } else {
    durationFormat += `${(`0${minuts}`).slice(-2)}M`;
  }
  return durationFormat;
};
