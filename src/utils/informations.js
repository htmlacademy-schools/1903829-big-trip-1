import dayjs from 'dayjs';
import { getRandomInteger } from './common';
import { generateListLinkImages } from './common';

export const descriptions = () => ([
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
]);

function getRandomElement(arr, n) {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result.join(' ');
}

export const generateDescription = () => {
  const description = descriptions();
  const randomIndex = getRandomInteger(2, 6);
  const answer = getRandomElement(description, randomIndex);
  return answer;
};

const generateImages = () => {
  const links = generateListLinkImages();
  const length = links.length;
  const answer = new Array(length);
  for (let i = 0; i < length; i++) {
    answer[i] = `<img class="event__photo" src="${ links[i] }" alt="Event photo">`;
  }
  return answer;
};

export const destinations = () => ([
  { titleCity: 'Podgorica', description: generateDescription(), photos: generateImages() },
  { titleCity: 'Moscow', description: generateDescription(), photos: generateImages() },
  { titleCity: 'New York', description: generateDescription(), photos: generateImages() },
  { titleCity: 'Bratislava', description: generateDescription(), photos: generateImages() },
  { titleCity: 'Oslo', description: generateDescription(), photos: generateImages() },
  { titleCity: 'Ottawa', description: generateDescription(), photos: generateImages() },
  { titleCity: 'Prague', description: generateDescription(), photos: generateImages() }
]);

export const wayPointTypes = () => ([
  { title: 'taxi', img: 'img/icons/taxi.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'bus', img: 'img/icons/bus.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'drive', img: 'img/icons/drive.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'check-in', img: 'img/icons/check-in.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'flight', img: 'img/icons/flight.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'restaurant', img: 'img/icons/restaurant.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'sightseeing', img: 'img/icons/sightseeing.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'train', img: 'img/icons/train.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 }
]);

export const offers = () => ([
  { 'title': 'Add luggage', 'type': 'luggage', 'price': '4'},
  { 'title': 'Switch to comfort class', 'type': 'flight', 'price': '10'},
  { 'title': 'Add meal', 'type': 'meal', 'price': '10'},
  { 'title': 'Rent a car', 'type': 'car', 'price': '10'},
  { 'title': 'Add breakfast', 'type': 'meal', 'price': '5'},
  { 'title': 'Add a shower', 'type': 'flight', 'price': '5'},
]);

export const SortType = {
  DAY: {text: 'day', checked: true},
  TIME: {text: 'time', checked: false},
  PRICE: {text: 'price', checked: false},
};

export const sortDate = (a, b) => dayjs(a.date.dataBeginEvent).diff(dayjs(b.date.dataBeginEvent));

export const sortTime = (a, b) => {
  const timeOne = dayjs(a.date.dataEndEvent).diff(dayjs(a.date.dataBeginEvent));
  const timeTwo = dayjs(b.date.dataEndEvent).diff(dayjs(b.date.dataBeginEvent));
  return timeOne - timeTwo;
};

export const sortPrice = (a, b) => a.allPrice - b.allPrice;
