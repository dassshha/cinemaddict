// включены min и max; работает с отриц и положит
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

const sortFilmsByRatingDown = (film1, film2) => film2.rating - film1.rating;

const sortFilmsByDate = (film1, film2) => film1.dateRelease.isBefore(film2.dateRelease) ? 1 : -1;

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
export {getRandomNumber, isEscapeKey, updateItem, sortFilmsByRatingDown, sortFilmsByDate};
