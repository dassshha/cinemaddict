import {createElement} from "../render.js";

const createFilmsListCommentedTemplate = () => (
  `    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>`
);

export default class FilmsView {
  #element = null;

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template () {
    return createFilmsListCommentedTemplate();
  }

  removeElement () {
    this.#element.remove();
  }
}
