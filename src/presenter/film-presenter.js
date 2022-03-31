import FilmCardView from "../view/film-card-view.js";
import PopupView from "../view/popup-view";
import {isEscapeKey} from "../utils";
import {render, RENEDER_POSITION, remove, replace} from "../render";
import CommentsView from '../view/comments-view';
import {EMOTIONS, UPDATE_TYPE, USER_ACTION} from '../constants';
import NewCommentView from '../view/new-comment-view';
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

    if (prevFilmCard === null || prevFilmPopup === null) {
      render(this.#filmsListContainer, this.#filmCardComponent, RENEDER_POSITION.BEFOREEND);
      return;
    }


    replace(this.#filmCardComponent, prevFilmCard);
    // replace(this.#commentsComponent, prevCommentsComponent);
    replace(this.#filmPopupComponent, prevFilmPopup);

    this.#filmPopupComponent.saveScrollPosition(prevFilmPopup.scrollPosition);

    remove(prevFilmCard);
    // remove(prevCommentsComponent);
    remove(prevFilmPopup);
  }

  get comments() {
    // this.#commentsModel.comments.forEach((comment, i) => {
    //   // console.log(this.#film.comments[i]);
    //   // console.log(comment.id);
    // });
    // this.#commentsModel.comments.forEach( (comment, i) => {
    //   console.log(i);
    //     console.log(this.#film.comments[i]);
    // });
    // return this.#commentsModel.comments;
    // console.log(this.#film.comments);
    return this.#commentsModel.comments.filter((comment) => this.#film.comments.includes(comment.id));
    // return this.#commentsModel.comments;

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
      this.#filmPopupComponent.reset();
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
    this.#filmPopupComponent.reset();
    this.#hidePopup();
    document.removeEventListener('keydown', this.#onEscKeydown);
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

  // #renderNewCommentComponent = () => {
  //   this.#newCommentComponent = new NewCommentView();
  //   render(this.#commentsComponent.element.querySelector('.film-details__comments-wrap'), this.#newCommentComponent, RENEDER_POSITION.BEFOREEND);
  // };

  #deleteClickHandler = (comment) => {
    // console.log('before deleting');
    // console.log(this.#commentsModel.comments);
    this.#commentsModel.deleteComment(UPDATE_TYPE.PATCH, comment, this.#film);
    // console.log('after deleting');
    // console.log(this.#commentsModel.comments);
  };

  // updateFilmsModelEvent = (userAction, updateType) => {
  //   console.log(userAction, updateType);
  //   // console.log(1);
  //   // console.log(this.comments);
  //   // console.log(this.#commentsModel.comments);
  //   // this.#film.comments = [...this.comments.map((comment) => comment.id)];
  //   // // console.log(this.comments);
  //   // this.#filmUpdateHandler(
  //   //   USER_ACTION.UPDATE_FILM,
  //   //   UPDATE_TYPE.PATCH,
  //   //   this.#film);
  // };

  #renderCommentsList = () => {
    // console.log(this.#commentsModel.comments);
    // console.log(this.#film.comments);
    for (let i = 0; i < this.comments.length; i++) {
      const comment = new CommentView(this.comments[i]);
      render(this.#filmPopupComponent.element.querySelector('.film-details__comments-list'), comment, RENEDER_POSITION.BEFOREEND);
      comment.setDeleteCommentClickHandler(this.#deleteClickHandler);
    }
  };

  #testCallback = () => console.log('test');

}
