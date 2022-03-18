import FilmCardView from "../view/film-card-view";
import PopupView from "../view/popup-view";
import {isEscapeKey} from "../utils";
import {render, RENEDER_POSITION, remove, replace} from "../render";

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

    const prevFilmCard = this.#filmCard;
    const prevFilmPopup = this.#filmPopup;

    this.#filmCard = new FilmCardView(film);
    this.#filmPopup =  new PopupView(film, this.#comments);

    this.#filmCard.setOpenPopupClickHandler(this.#openPopupClickHandler);
    this.#filmPopup.setClosePopupClickHandler(this.#closePopupClickHandler);

    if (prevFilmCard === null || prevFilmPopup === null) {
      render(this.#filmsListContainer, this.#filmCard, RENEDER_POSITION.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#filmsListContainer.element.contains(prevFilmCard.element)) {
      replace(this.#filmCard, prevFilmCard);
    }

    if (this.#filmsListContainer.element.contains(prevFilmPopup.element)) {
      replace(this.#filmPopup, prevFilmPopup);
    }

    remove(prevFilmCard);
    remove(prevFilmPopup);
  }

  destroy = () => {
    remove(this.#filmCard);
    remove(this.#filmPopup);
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
