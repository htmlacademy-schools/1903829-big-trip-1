import dayjs from 'dayjs';
import { getRandomInteger } from './common';

export const generateBeginEndDates = () => {
  const maxDaysGag = 7;
  const daysGap = getRandomInteger(-7, maxDaysGag);
  const daysAddition = daysGap + getRandomInteger(0, 2);
  const startHoursAddition = getRandomInteger(1, 6);
  const endHoursAddition = getRandomInteger(startHoursAddition, startHoursAddition + 10);
  const startMinutesAddition = getRandomInteger(0, 59);
  const endMinutesAddition = getRandomInteger(startMinutesAddition, startMinutesAddition + 59);
  return {
    start: dayjs().add(daysGap, 'day').add(startHoursAddition, 'hour').add(startMinutesAddition, 'minute').toDate(),
    end: dayjs().add(daysAddition, 'day').add(endHoursAddition, 'hour').add(endMinutesAddition, 'minute').toDate()
  };
};

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

export const countDuration = (date) => {
  const duration = getDifferentDates(date.start, date.end);
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
    'startTime': `${dayjs(date.dataBeginEvent).format('HH')}:${dayjs(date.dataBeginEvent).format('mm')}`,
    'endTime': `${dayjs(date.dataEndEvent).format('HH')}:${dayjs(date.dataEndEvent).format('mm')}`,
    'duration': durationFormat,
    'arrayDurationFormat': duration
  };
};
