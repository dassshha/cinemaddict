import FilmCardView from "../view/film-card-view";
import PopupView from "../view/popup-view";
import {isEscapeKey} from "../utils";
import {render, RENEDER_POSITION} from "../render";

export default class FilmPresenter {
  #filmsListContainer = null;

  #filmCard = null;
  #filmPopup = null;
  #body = document.querySelector('body');

  #film = null;
  #comments = [];

  constructor(filmsListContainer) {
    this.#filmsListContainer = filmsListContainer;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = [...comments];

    this.#filmCard = new FilmCardView(film);
    this.#filmPopup =  new PopupView(film, this.#comments);

    this.#filmCard.setOpenPopupClickHandler(this.#openPopupClickHandler);
    this.#filmPopup.setClosePopupClickHandler(this.#closePopupClickHandler);

    render(this.#filmsListContainer, this.#filmCard, RENEDER_POSITION.BEFOREEND);
  }

  #showPopup = () => {
    this.#body.appendChild(this.#filmPopup.element);
    this.#body.classList.add('hide-overflow');
  };

  #hidePopup = () => {
    this.#body.removeChild(this.#filmPopup.element);
    this.#body.classList.remove('hide-overflow');
  };

  #onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#hidePopup();
      document.removeEventListener('keydown', this.#onEscKeydown);
    }
  };

  #openPopupClickHandler = () => {
    this.#showPopup();
    document.addEventListener('keydown', this.#onEscKeydown);
  };

  #closePopupClickHandler = () => {
    this.#hidePopup();
    document.removeEventListener('keydown', this.#onEscKeydown);
  };
}
