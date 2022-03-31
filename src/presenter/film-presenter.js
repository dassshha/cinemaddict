import FilmCardView from "../view/film-card-view.js";
import PopupView from "../view/popup-view";
import {isEscapeKey} from "../utils";
import {render, RENEDER_POSITION, remove, replace} from "../render";
import {EMOTIONS, UPDATE_TYPE, USER_ACTION, KEY_CODES} from '../constants';
import CommentView from '../view/comment-view';

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
  //#commentsComponent = null;
  #newCommentComponent = null;
  #body = document.querySelector('body');

  #film = null;
  #commentsModel = null;
  #mode = MODE.CARD;


  constructor(filmsListContainer, filmUpdateHandler, modeUpdateHandler, commentsModel) {
    this.#filmsListContainer = filmsListContainer;
    this.#filmUpdateHandler = filmUpdateHandler;
    this.#modeUpdateHandler = modeUpdateHandler;
    this.#commentsModel = commentsModel;

    // this.#commentsModel.addObserver(this.#updateFilmsModelEvent);
    // this.#commentsModel.addObserver(() => console.log('kak je suka becit'));
  }

  init = (film) => {
    this.#film = film;
    // this.#commentsComponent = [...comments];

    const prevFilmCard = this.#filmCardComponent;
    const prevFilmPopup = this.#filmPopupComponent;
    // console.log(prevFilmPopup);
    // const prevCommentsComponent = this.#commentsComponent;

    this.#filmCardComponent = new FilmCardView(film);
    //this.#commentsComponent = new CommentsView(this.comments);
    this.#filmPopupComponent = new PopupView(film);

    //render(this.#filmPopupComponent.element.querySelector('form'), this.#commentsComponent, RENEDER_POSITION.BEFOREEND);
    this.#renderCommentsList();
    //this.#renderNewCommentComponent();

    this.#filmCardComponent.setOpenPopupClickHandler(this.#openPopupClickHandler);
    this.#filmPopupComponent.setClosePopupClickHandler(this.#closePopupClickHandler);
    this.#filmCardComponent.setAddToWatchListClickHandler(this.#addToWatchListClickHandler);
    this.#filmPopupComponent.setAddToWatchListClickHandler(this.#addToWatchListClickHandler);
    this.#filmCardComponent.setMarkAsWatchedClickHandler(this.#markAsWatchedClickHandler);
    this.#filmPopupComponent.setMarkAsWatchedClickHandler(this.#markAsWatchedClickHandler);
    this.#filmCardComponent.setAddToFavoritesClickHandler(this.#addToFavoritesClickHandler);
    this.#filmPopupComponent.setAddToFavoritesClickHandler(this.#addToFavoritesClickHandler);
    this.#filmPopupComponent.setRenderCommentsListHandler(this.#renderCommentsList);
    // this.#filmPopupComponent.setFormSubmitHandler(() => alert('finally submit!'));


    if (prevFilmCard === null || prevFilmPopup === null) {
      render(this.#filmsListContainer, this.#filmCardComponent, RENEDER_POSITION.BEFOREEND);
      return;
    }
    console.log(1);

    replace(this.#filmCardComponent, prevFilmCard);
    if (this.#mode === MODE.POPUP) {
      replace(this.#filmPopupComponent, prevFilmPopup);
    }

    this.#filmPopupComponent.saveScrollPosition(prevFilmPopup.scrollPosition);

    remove(prevFilmCard);
    remove(prevFilmPopup);
  }

  get comments() {
    return this.#commentsModel.comments.filter((comment) => this.#film.comments.includes(comment.id));

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

  #addNewCommentHandler = (comment) => {
    this.#commentsModel.addComment(UPDATE_TYPE.PATCH, comment, this.#film);
  };

  #pressKeysToSubmitFormHandler = (evt) => {
    if ((evt.code === 'Enter') && (evt.ctrlKey || evt.metaKey) ) {
      this.#addNewCommentHandler(this.#filmPopupComponent.newComment);
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
      this.#filmPopupComponent.reset();
      this.#hidePopup();
      document.removeEventListener('keydown', this.#onEscKeydown);
      document.removeEventListener('keydown', this.#pressKeysToSubmitFormHandler);
      this.#mode = MODE.CARD;
    }
  };

  #openPopupClickHandler = () => {
    this.#showPopup();
    document.addEventListener('keydown', this.#onEscKeydown);
    document.addEventListener('keydown', this.#pressKeysToSubmitFormHandler);
    this.#modeUpdateHandler(this.#film);
    this.#mode = MODE.POPUP;
  };

  #closePopupClickHandler = () => {
    this.#filmPopupComponent.reset();
    this.#hidePopup();
    document.removeEventListener('keydown', this.#onEscKeydown);
    document.removeEventListener('keydown', this.#pressKeysToSubmitFormHandler);
    this.#mode = MODE.CARD;
  };

  #addToWatchListClickHandler = () => {
    this.#film.addToWatchlist = !this.#film.addToWatchlist;
    this.#filmUpdateHandler(
      // USER_ACTION.UPDATE_FILM,
      UPDATE_TYPE.PATCH,
      this.#film
    );
  };

  #markAsWatchedClickHandler = () => {
    this.#film.alreadyWatched = !this.#film.alreadyWatched;
    this.#filmUpdateHandler(
      // USER_ACTION.UPDATE_FILM,
      UPDATE_TYPE.PATCH,
      this.#film
    );
  };

  #addToFavoritesClickHandler = () => {
    this.#film.isFavorite = !this.#film.isFavorite;
    this.#filmUpdateHandler(
      // USER_ACTION.UPDATE_FILM,
      UPDATE_TYPE.PATCH,
      this.#film);
  };


  #deleteClickHandler = (comment) => {
    this.#commentsModel.deleteComment(UPDATE_TYPE.PATCH, comment, this.#film);
  };

  #renderCommentsList = () => {
    // console.log(this.#commentsModel.comments);
    // console.log(this.#film.comments);
    for (let i = 0; i < this.comments.length; i++) {
      const comment = new CommentView(this.comments[i]);
      render(this.#filmPopupComponent.element.querySelector('.film-details__comments-list'), comment, RENEDER_POSITION.BEFOREEND);
      comment.setDeleteCommentClickHandler(this.#deleteClickHandler);
    }
  };


}
