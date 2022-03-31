const CARDS_COUNT_PER_STEP = 5;
const CARDS_COUNT = 3;
const CARDS_TOP_COUNT = 2;

const SORT_TYPE = {
  DEFAULT: 'DEFAULT',
  DATE: 'DATE',
  RATING: 'RATING',
};

const EMOTIONS = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE:'puke',
  ANGRY: 'angry',
};

const USER_ACTION = {
  UPDATE_FILM: 'UPDATE_FILM',
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FILTER_TYPE = {
  ALL: 'ALL',
  WATCHLIST: 'WATCHLIST',
  HISTORY: 'HISTORY',
  FAVORITES: 'FAVORITES',
};

const EMPTY_LIST_MESSAGES = {
  ALL: 'There are no movies in our database',
  WATCHLIST: 'There are no movies to watch now',
  HISTORY: 'There are no watched movies now',
  FAVORITES: 'There are no favorite movies now',
};

export {CARDS_COUNT_PER_STEP, CARDS_COUNT, SORT_TYPE, EMOTIONS, USER_ACTION, UPDATE_TYPE, FILTER_TYPE, EMPTY_LIST_MESSAGES};
