import AbstractView from "./abstract-view.js";
import {FILTER_TYPE} from '../constants';

const createMainMenuTemplate = (inWatchlistCount, inHistoryCount, inFavoritesCount, filterType) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${filterType === FILTER_TYPE.ALL ? 'main-navigation__item--active' : ''}" data-filter-type="${FILTER_TYPE.ALL}">All movies</a>
      <a href="#watchlist" class="main-navigation__item ${filterType === FILTER_TYPE.WATCHLIST ? 'main-navigation__item--active' : ''}" data-filter-type="${FILTER_TYPE.WATCHLIST}">Watchlist <span class="main-navigation__item-count">${inWatchlistCount}</span></a>
      <a href="#history" class="main-navigation__item ${filterType === FILTER_TYPE.HISTORY ? 'main-navigation__item--active' : ''}" data-filter-type="${FILTER_TYPE.HISTORY}">History <span class="main-navigation__item-count">${inHistoryCount}</span></a>
      <a href="#favorites" class="main-navigation__item ${filterType === FILTER_TYPE.FAVORITES ? 'main-navigation__item--active' : ''}" data-filter-type="${FILTER_TYPE.FAVORITES}">Favorites <span class="main-navigation__item-count">${inFavoritesCount}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);

export default class MainMenuView extends AbstractView{
  #inWatchlistCount = null;
  #inHistoryCount = null;
  #inFavoritesCount = null;

  #filterType = null;
  constructor(inWatchlistCount, inHistoryCount, inFavoritesCount, filterType) {
    super();
    this.#inWatchlistCount = inWatchlistCount;
    this.#inHistoryCount = inHistoryCount;
    this.#inFavoritesCount = inFavoritesCount;
    this.#filterType = filterType;
  }

  get template () {
    return createMainMenuTemplate(this.#inWatchlistCount, this.#inHistoryCount, this.#inFavoritesCount, this.#filterType);
  }

  setUpdateFilterTypeClickHandler (callback) {
    this._callback.updateFilterTypeClick = callback;
    this.element.querySelector('.main-navigation__items').addEventListener('click', this.#updateFilterTypeClickHandler);
  }

  #updateFilterTypeClickHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.updateFilterTypeClick(evt.target.dataset.filterType);
  };
}
