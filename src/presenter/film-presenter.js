import FilmCardView from "../view/film-card-view.js";
import PopupView from "../view/popup-view";
import {isEscapeKey} from "../utils";
import {render, RENEDER_POSITION, remove, replace} from "../render";
import CommentsView from '../view/comments-view';
import {EMOTIONS, UPDATE_TYPE, USER_ACTION} from '../constants';
import NewCommentView from '../view/new-comment-view';

const MODE = {
  CARD: 'CARD',
  POPUP: 'POPUP'
};

export default class FilmPresenter {
  #filmsListContainer = null;
  #filmUpdateHandler = null;
  #modeUpdateHandler = null;

  #filmCardComponent = null;
  #filmPopupComponent = null;
  #commentsComponent = null;
  #newCommentComponent = null;
  #body = document.querySelector('body');

  #film = null;
  #mode = MODE.CARD;

  constructor(filmsListContainer, filmUpdateHandler, modeUpdateHandler) {
    this.#filmsListContainer = filmsListContainer;
    this.#filmUpdateHandler = filmUpdateHandler;
    this.#modeUpdateHandler = modeUpdateHandler;
  }

  init = (film) => {
    this.#film = film;
    // this.#commentsComponent = [...comments];

    const prevFilmCard = this.#filmCardComponent;
    const prevFilmPopup = this.#filmPopupComponent;

    this.#filmCardComponent = new FilmCardView(film);
    this.#filmPopupComponent =  new PopupView(film);
    this.#commentsComponent = new CommentsView([]);

    render(this.#filmPopupComponent.element.querySelector('form'), this.#commentsComponent, RENEDER_POSITION.BEFOREEND);

    this.#renderNewCommentComponent();

    this.#filmCardComponent.setOpenPopupClickHandler(this.#openPopupClickHandler);
    this.#filmPopupComponent.setClosePopupClickHandler(this.#closePopupClickHandler);
    this.#filmCardComponent.setAddToWatchListClickHandler(this.#addToWatchListClickHandler);
    this.#filmPopupComponent.setAddToWatchListClickHandler(this.#addToWatchListClickHandler);
    this.#filmCardComponent.setMarkAsWatchedClickHandler(this.#markAsWatchedClickHandler);
    this.#filmPopupComponent.setMarkAsWatchedClickHandler(this.#markAsWatchedClickHandler);
    this.#filmCardComponent.setAddToFavoritesClickHandler(this.#addToFavoritesClickHandler);
    this.#filmPopupComponent.setAddToFavoritesClickHandler(this.#addToFavoritesClickHandler);

    if (prevFilmCard === null || prevFilmPopup === null) {
      render(this.#filmsListContainer, this.#filmCardComponent, RENEDER_POSITION.BEFOREEND);
      return;
    }


    replace(this.#filmCardComponent, prevFilmCard);
    replace(this.#filmPopupComponent, prevFilmPopup);

    this.#filmPopupComponent.saveScrollPosition(prevFilmPopup.scrollPosition);

    remove(prevFilmCard);
    remove(prevFilmPopup);
  }

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmPopupComponent);
  }

  resetView = () => {
    if (this.#mode !== MODE.CARD) {
      this.#closePopupClickHandler();
    }
  };

  #showPopup = () => {
    this.#body.appendChild(this.#filmPopupComponent.element);
    this.#body.classList.add('hide-overflow');
  };

  #hidePopup = () => {
    this.#body.removeChild(this.#filmPopupComponent.element);
    this.#body.classList.remove('hide-overflow');
  };

  #onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#newCommentComponent.reset();
      this.#hidePopup();
      document.removeEventListener('keydown', this.#onEscKeydown);
      this.#mode = MODE.CARD;
    }
  };

  #openPopupClickHandler = () => {
    this.#showPopup();
    document.addEventListener('keydown', this.#onEscKeydown);
    this.#modeUpdateHandler(this.#film);
    this.#mode = MODE.POPUP;
  };

  #closePopupClickHandler = () => {
    this.#newCommentComponent.reset();
    this.#hidePopup();
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#mode = MODE.CARD;
  };

  #addToWatchListClickHandler = () => {
    this.#film.addToWatchlist = !this.#film.addToWatchlist;
    this.#filmUpdateHandler(
      USER_ACTION.UPDATE_FILM,
      UPDATE_TYPE.PATCH,
      this.#film
    );
  };

  #markAsWatchedClickHandler = () => {
    this.#film.alreadyWatched = !this.#film.alreadyWatched;
    this.#filmUpdateHandler(
      USER_ACTION.UPDATE_FILM,
      UPDATE_TYPE.PATCH,
      this.#film
    );
  };

  #addToFavoritesClickHandler = () => {
    this.#film.isFavorite = !this.#film.isFavorite;
    this.#filmUpdateHandler(
      USER_ACTION.UPDATE_FILM,
      UPDATE_TYPE.PATCH,
      this.#film);
  };

  #renderNewCommentComponent = () => {
    this.#newCommentComponent = new NewCommentView();
    render(this.#commentsComponent.element.querySelector('.film-details__comments-wrap'), this.#newCommentComponent, RENEDER_POSITION.BEFOREEND);
  };

}
