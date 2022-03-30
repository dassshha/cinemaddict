import AbstractView from "./abstract-view";


const createFilmCardTemplate = (film) => {
  const inWatchListClassName = film.addToWatchlist
    ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active'
    : 'film-card__controls-item--add-to-watchlist';

  const ifWatchedClassName = film.alreadyWatched
    ? 'film-card__controls-item--mark-as-watched film-card__controls-item--active'
    : 'film-card__controls-item--mark-as-watched';

  const isFavoriteClassName = film.isFavorite
    ? 'film-card__controls-item--favorite film-card__controls-item--active'
    : 'film-card__controls-item--favorite';

  const ageRelease = film.dateRelease.format('YYYY');

  const runtime = () => {
    const hours = film.runtime.hours() > 0 ? 'H[h]' : '';
    const minutes = film.runtime.minutes() > 0 ? 'm[m]' : '';
    return film.runtime.format(`${hours} ${minutes}`);
  };

  return `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${film.title}</h3>
            <p class="film-card__rating">${film.rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${ageRelease}</span>
              <span class="film-card__duration">${runtime()}</span>
              <span class="film-card__genre">${film.genres[0]}</span>
            </p>
            <img src="${film.poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${film.shortDescription}…</p>
            <span class="film-card__comments">${film.comments.length} comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item ${inWatchListClassName}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item ${ifWatchedClassName}" type="button">Mark as watched</button>
            <button class="film-card__controls-item ${isFavoriteClassName}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};


export default class FilmCardView extends AbstractView {
  #film = null;
  constructor(film) {
    super();
    this.#film = film;
  }

  get template () {
    return createFilmCardTemplate(this.#film);
  }

  setOpenPopupClickHandler (callback) {
    this._callback.openPopupClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#openPopupClickHandler);
  }

  #openPopupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.openPopupClick();
  };

  setAddToWatchListClickHandler (callback) {
    this._callback.addToWatchListClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#addToWatchListClickHandler);
  }

  #addToWatchListClickHandler = () => {
    this._callback.addToWatchListClick();
  };

  setMarkAsWatchedClickHandler (callback) {
    this._callback.markAsWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#markAsWatchedClickHandler);
  }

  #markAsWatchedClickHandler = () => {
    this._callback.markAsWatchedClick();
  };

  setAddToFavoritesClickHandler (callback) {
    this._callback.addToFavoritesClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#addToFavoritesClickHandler);
  }

  #addToFavoritesClickHandler = () => {
    this._callback.addToFavoritesClick();
  };

}
