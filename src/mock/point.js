import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateType = () => {
  const types = [
    'Taxi', 'Bus', 'Train', 'Ship',
    'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant',
  ];
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const generateDestination = () => {
  const destinations = [
    'Podgorica', 'Moscow', 'New York',
    'Bratislava', 'Oslo', 'Ottawa', 'Prague'
  ];
  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex];
};

const generateBeginEndDates = () => {
  const maxGap = 10;
  const startDate = dayjs()
    .add(getRandomInteger(-maxGap, maxGap), 'day')
    .add(getRandomInteger(-maxGap, maxGap), 'hour')
    .add(getRandomInteger(-maxGap, maxGap), 'minute');
  const endDate = startDate
    .clone()
    .add(getRandomInteger(0, 14), 'day')
    .add(getRandomInteger(0, 59), 'hour')
    .add(getRandomInteger(0, 59), 'minute');

  return {
    start: startDate.toDate(),
    end: endDate.toDate()
  };
};

const getDuration = () => ' ';

export const generateDescription = () => {
  const description = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];
  const randomIndex = getRandomInteger(0, description.length - 1);
  return description[randomIndex];
};

const generateCost = () => getRandomInteger(1, 100) * 10;

const generateOffers = () => {
  const offers = [
    {
      name: 'Add luggage',
      price: 30,
      isChosen: Boolean(getRandomInteger(0,1)),
      type: 'luggage'
    },
    {
      name: 'Switch to comfort class',
      price: 100,
      isChosen: Boolean(getRandomInteger(0,1)),
      type: 'flight'
    },
    {
      name: 'Add meal',
      price: 15,
      isChosen: Boolean(getRandomInteger(0,1)),
      type: 'meal'
    },
    {
      name: 'Travel by train',
      price: 40,
      isChosen: Boolean(getRandomInteger(0,1)),
      type: 'transport'
    },
    {
      name: 'Rent a car',
      price: 200,
      isChosen: Boolean(getRandomInteger(0,1)),
      type: 'car'
    },
    {
      name: 'Add breakfast',
      price: 40,
      isChosen: Boolean(getRandomInteger(0,1)),
      type: 'meal'
    },
  ];
  let count = getRandomInteger(0, 5);
  let len = offers.length;
  const result = new Array(count);
  const taken = new Array(len);
  if (count > len)
  {
    throw new RangeError('getRandom: more elements taken than available');
  }
  while (count--) {
    const x = Math.floor(Math.random() * len);
    result[count] = offers[x in taken ? taken[x] : x];
    taken[x] = --len;
  }
  return result;
};

export const generateImages = () => {
  const arrayOfImages = [];

  for (let i = 0; i < 3; i++) {
    arrayOfImages[i] = `http://picsum.photos/248/152?${ getRandomInteger(0, 99).toString() }`;
  }

  return arrayOfImages;
};

export const generatePoint = () => {
  const date = generateBeginEndDates();

  return {
    waypointType: generateType(),
    destination: generateDestination(),
    startDate: date.start,
    endDate: date.end,
    duration: getDuration(),
    description: generateDescription(),
    images: generateImages(),
    cost: generateCost(),
    offers: generateOffers(),
    isArchive: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
