import {createElement} from "../render.js";

const createFilmCardTemplate = (film) => (
  `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${film.title}</h3>
            <p class="film-card__rating">${film.rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${film.ageRelease}</span>
              <span class="film-card__duration">${film.runtime}m</span>
              <span class="film-card__genre">${film.genre}</span>
            </p>
            <img src="${film.poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${film.shortDescription}…</p>
            <span class="film-card__comments">${film.commentsCount}</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`
);

export default class FilmCardView {
  #element = null;
  #film = null;
  constructor(film) {
    this.#film = film;
  }

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template () {
    return createFilmCardTemplate(this.#film);
  }

  removeElement () {
    this.#element = null;
  }
}
