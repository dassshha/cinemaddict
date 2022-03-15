import {createElement} from "../render.js";

const createFilmsListAllTemplate = () => (
  `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>`
);

export default class FilmsListAllView {
  #element = null;

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template () {
    return createFilmsListAllTemplate();
  }

  removeElement () {
    this.#element.remove();
  }
}
