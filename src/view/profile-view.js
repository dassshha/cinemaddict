import {createElement} from "../render.js";

const createProfileTemplate = (status) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${status}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export class ProfileView {
  #element = null;
  #status = null;
  constructor(status) {
    this.#status = status;
  }

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template () {
    return createProfileTemplate(this.#status);
  }

  removeElement () {
    this.#element = null;
  }
}
