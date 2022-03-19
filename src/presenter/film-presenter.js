import FilmCardView from "../view/film-card-view.js";
import PopupView from "../view/popup-view";
import {isEscapeKey} from "../utils";
import {render, RENEDER_POSITION, remove, replace} from "../render";

const MODE = {
  CARD: 'CARD',
  POPUP: 'POPUP'
};

export default class FilmPresenter {
  #filmsListContainer = null;
  #filmUpdateHandler = null;
  #modeUpdateHandler = null;

  #filmCard = null;
  #filmPopup = null;
  #body = document.querySelector('body');

  #film = null;
  #comments = [];
  #mode = MODE.CARD;

  constructor(filmsListContainer, filmUpdateHandler, modeUpdateHandler) {
    this.#filmsListContainer = filmsListContainer;
    this.#filmUpdateHandler = filmUpdateHandler;
    this.#modeUpdateHandler = modeUpdateHandler;
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
    this.#filmCard.setAddToWatchListClickHandler(this.#addToWatchListClickHandler);
    this.#filmPopup.setAddToWatchListClickHandler(this.#addToWatchListClickHandler);
    this.#filmCard.setMarkAsWatchedClickHandler(this.#markAsWatchedClickHandler);
    this.#filmPopup.setMarkAsWatchedClickHandler(this.#markAsWatchedClickHandler);
    this.#filmCard.setAddToFavoritesClickHandler(this.#addToFavoritesClickHandler);
    this.#filmPopup.setAddToFavoritesClickHandler(this.#addToFavoritesClickHandler);

    if (prevFilmCard === null || prevFilmPopup === null) {
      render(this.#filmsListContainer, this.#filmCard, RENEDER_POSITION.BEFOREEND);
      return;
    }

    if (this.#mode === MODE.CARD) {
      replace(this.#filmCard, prevFilmCard);
    }

    if (this.#mode === MODE.POPUP) {
      replace(this.#filmPopup, prevFilmPopup);
    }

    remove(prevFilmCard);
    remove(prevFilmPopup);
  }

  destroy = () => {
    remove(this.#filmCard);
    remove(this.#filmPopup);
  }

  resetView = () => {
    if (this.#mode !== MODE.CARD) {
      this.#closePopupClickHandler();
    }
  };

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
    this.#modeUpdateHandler(this.#film);
    this.#mode = MODE.POPUP;
  };

  #closePopupClickHandler = () => {
    this.#hidePopup();
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#mode = MODE.CARD;
  };

  #addToWatchListClickHandler = () => {
    this.#film.addToWatchlist = !this.#film.addToWatchlist;
    this.#filmUpdateHandler(this.#film);
  };

  #markAsWatchedClickHandler = () => {
    this.#film.alreadyWatched = !this.#film.alreadyWatched;
    this.#filmUpdateHandler(this.#film);
  };

  #addToFavoritesClickHandler = () => {
    this.#film.isFavorite = !this.#film.isFavorite;
    this.#filmUpdateHandler(this.#film);
  };
}
