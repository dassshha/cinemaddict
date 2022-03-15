import {createElement} from "../render.js";

const createFilmsListEmptyTemplate = (message) => (
  `<section class="films-list">
      <h2 class="films-list__title">${message}</h2>

      <!--
        Значение отображаемого текста зависит от выбранного фильтра:
          * All movies – 'There are no movies in our database'
          * Watchlist — 'There are no movies to watch now';
          * History — 'There are no watched movies now';
          * Favorites — 'There are no favorite movies now'.
      -->
    </section>`
);

export default class FilmsListEmptyView {
  #element = null;
  #message = null;
  constructor(message) {
    this.#message = message;
  }

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template () {
    return createFilmsListEmptyTemplate(this.#message);
  }

  removeElement () {
    this.#element.remove();
  }
}
