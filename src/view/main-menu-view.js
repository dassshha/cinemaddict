import {createElement} from "../render.js";

const createMainMenuTemplate = (inWatchlistCount, inHistoryCount, inFavoritesCount) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${inWatchlistCount}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${inHistoryCount}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${inFavoritesCount}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);

export default class MainMenuView {
  #element = null;
  #inWatchlistCount = null;
  #inHistoryCount = null;
  #inFavoritesCount = null;
  constructor(inWatchlistCount, inHistoryCount, inFavoritesCount) {
    this.#inWatchlistCount = inWatchlistCount;
    this.#inHistoryCount = inHistoryCount;
    this.#inFavoritesCount = inFavoritesCount;
  }

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template () {
    return createMainMenuTemplate(this.#inWatchlistCount, this.#inHistoryCount, this.#inFavoritesCount);
  }

  removeElement () {
    this.#element.remove();
  }
}
