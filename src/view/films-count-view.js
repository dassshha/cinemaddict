import {createElement} from "../render.js";

const createFilmsCountTemplate = (filmsCount) => (
  `<p>${filmsCount} movies inside</p>`
);

export default class FilmsCountView {
  #element = null;
  #filmsCount = null;
  constructor(filmsCount) {
    this.#filmsCount = filmsCount;
  }

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template () {
    return createFilmsCountTemplate(this.#filmsCount);
  }

  removeElement () {
    this.#element.remove();
  }
}
