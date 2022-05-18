import dayjs from 'dayjs';
import { FilterType } from '../const';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(dayjs(point.date.start))),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().isAfter(dayjs(point.date.start))),
};
