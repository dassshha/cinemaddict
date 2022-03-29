// включены min и max; работает с отриц и положит
import {FILTER_TYPE} from './constants';

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

const sortFilmsByRatingDown = (film1, film2) => film2.rating - film1.rating;

const sortFilmsByDateDown = (film1, film2) => film1.dateRelease.isBefore(film2.dateRelease) ? 1 : -1;

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const filter = {
  [FILTER_TYPE.WATCHLIST]: (films) => films.filter((film) => film.addToWatchlist),
  [FILTER_TYPE.HISTORY]: (films) => films.filter((film) => film.alreadyWatched),
  [FILTER_TYPE.FAVORITES]: (films) => films.filter((film) => film.isFavorite)
};

export {getRandomNumber, isEscapeKey, sortFilmsByRatingDown, sortFilmsByDateDown, filter};
