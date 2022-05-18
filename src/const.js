export const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'overdue',
  FUTURE: 'future',
};

export const MenuItem = {
  ADD_NEW_POINT: 'ADD_NEW_POINT',
  POINTS: 'POINTS',
  STATISTICS: 'STATISTICS',
};

export const Color = {
  BLACK: 'black',
  YELLOW: 'yellow',
  BLUE: 'blue',
  GREEN: 'green',
  PINK: 'pink',
};

export const COLORS = Object.values(Color);

export const TYPEPOINT = {
  TAXI: 'taxi',
  BUS: 'bus',
  DRIVE: 'drive',
  CHECKIN: 'check-in',
  FLIGHT: 'flight',
  RESTAURANT: 'restaurant',
  SIGHTSEEING: 'sightseeing',
  TRAIN: 'train',
  SHIP: 'ship',
};
