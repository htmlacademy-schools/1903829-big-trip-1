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

export const destinations = () => ([
  { titleCity: 'Podgorica', description: '', photos: [], isShowPhoto: false },
  { titleCity: 'Moscow', description: '', photos: [], isShowPhoto: false },
  { titleCity: 'New York', description: '', photos: [], isShowPhoto: false },
  { titleCity: 'Bratislava', description: '', photos: [], isShowPhoto: false },
  { titleCity: 'Oslo', description: '', photos: [], isShowPhoto: false },
  { titleCity: 'Ottawa', description: '', photos: [], isShowPhoto: false },
  { titleCity: 'Prague', description: '', photos: [], isShowPhoto: false }
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

export const SortType = {
  DEFAULT: 'default',
  DATE_DOWN: 'date-down',
  DATE_UP: 'date-up',
};

export const offers = () => ([
  { 'text': 'Add luggage', 'type': 'luggage', 'price': '30'},
  { 'text': 'Switch to comfort class', 'type': 'flight', 'price': '100'},
  { 'text': 'Add meal', 'type': 'meal', 'price': '15'},
  { 'text': 'Travel by train', 'type': 'transport', 'price': '40'},
  { 'text': 'Rent a car', 'type': 'car', 'price': '200'},
  { 'text': 'Add breakfast', 'type': 'meal', 'price': '40'},
]);
