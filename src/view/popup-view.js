import CommentsView from "./comments-view.js";
import AbstractView from "./abstract-view.js";
import {generateNullComment} from '../mock/comment';
import SmartView from './smart-view';

const createGenreTemplate = (genres) => {
  if (genres.length === 1) {
    return  `<td class="film-details__term">Genre</td>
               <td class="film-details__cell">
               <span class="film-details__genre">${genres[0]}</span>
            </td>`;
  }
  let genreTemplate = '<td class="film-details__term">Genres</td><td class="film-details__cell">';
  for (let i=0; i < genres.length; i++) {
    genreTemplate += `<span class="film-details__genre">${genres[i]}</span>`;
  }
  genreTemplate += '</td>';
  return genreTemplate;
};

const createDetailsButtonsTemplate = (film) => {
  const inWatchListClassName = film.addToWatchlist
    ? 'film-details__control-button--active film-details__control-button--watchlist'
    : 'film-details__control-button--watchlist';

  const ifWatchedClassName = film.alreadyWatched
    ? 'film-details__control-button--active film-details__control-button--watched'
    : 'film-details__control-button--watched';

  const isFavoriteClassName = film.isFavorite
    ? 'film-details__control-button--active film-details__control-button--favorite'
    : 'film-details__control-button--favorite';

  return `<section class="film-details__controls">
        <button type="button" class="film-details__control-button ${inWatchListClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${ifWatchedClassName}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${isFavoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
      </section>`
};

const createInfoTemplate = (popup) => {
  const dateRelease = popup.dateRelease.format('DD MMMM YYYY');

  const runtime = () => {
    const hours = popup.runtime.hours() > 0 ? 'H[h]' : '';
    const minutes = popup.runtime.minutes() > 0 ? 'm[m]' : '';
    return popup.runtime.format(`${hours} ${minutes}`);
  };

  return `<div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${popup.poster}" alt="">

          <p class="film-details__age">${popup.age}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${popup.title}</h3>
              <p class="film-details__title-original">Original: ${popup.originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${popup.rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${popup.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${popup.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${popup.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dateRelease}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${popup.country}</td>
            </tr>
            <tr class="film-details__row">
<!--              <td class="film-details__term">Genres</td>-->
<!--              <td class="film-details__cell">-->
<!--                <span class="film-details__genre">Drama</span>-->
<!--                <span class="film-details__genre">Film-Noir</span>-->
<!--                <span class="film-details__genre">Mystery</span></td>-->
                ${createGenreTemplate(popup.genres)}
            </tr>
          </table>

          <p class="film-details__film-description">
          ${popup.fullDescription}
          </p>
        </div>
      </div>

      ${createDetailsButtonsTemplate(popup)}
    </div>`
};

// const NEW_COMMENT = generateNullComment();

const createBigEmotionTemplate = (comment) => (
  `<img src="images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">`
);

const createNewCommentViewTemplate = (comment) => (
  `<div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${comment.isEmotion ? createBigEmotionTemplate(comment) : ''}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment.isText ? comment.text : ''}</textarea>
          </label>
          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
</div>
        </div>`
);

const createCommentsTemplate = (comments,nullComment) => (
  `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list"></ul>
        ${createNewCommentViewTemplate(nullComment)}
      </section>
    </div>`
);

const createPopupTemplate = (popup, nullComment) => (
  `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    ${createInfoTemplate(popup)}
    ${createCommentsTemplate(popup.comments, nullComment)}
  </form>
</section>`
);

export default class PopupView extends SmartView {
  #popup = null;
  #scrollPosition = 0;

  constructor(popup, nullComment = generateNullComment()) {
    super();
    this.#popup = popup;
    this._data = PopupView.parseCommentToData(nullComment);

    this.#setLeaveStateScrollHandler();
    this.#setInnerHandlers();
  }

  get template () {
    return createPopupTemplate(this.#popup, this._data);
  }

  static parseCommentToData = (comment) => ({
    ...comment,
    isEmotion: comment.emotion !== null,
    isText: comment.text !== null,
  });

  static parseDataToComment = (data) => {
    if (!data.isEmotion) {
      data.emotion = null;
    }

    if (!data.text) {
      data.text = null;
    }

    delete data.isEmotion;
    delete data.isText;

    return data;
  };

  setRenderCommentsListHandler (callback) {
    this._callback.renderCommentsList = callback;
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this._callback.renderCommentsList();
    this.setClosePopupClickHandler(this._callback.closePopupClick);
    this.setAddToWatchListClickHandler(this._callback.addToWatchListClick);
    this.setMarkAsWatchedClickHandler(this._callback.markAsWatchedClick);
    this.setAddToFavoritesClickHandler(this._callback.addToFavoritesClick);
    this.saveScrollPosition(this.#scrollPosition);
    // this.setFormSubmitHandler(this._callback.formSubmit);
  };

  #emotionUpdateHandler = (evt) => {
    this.updateData({
      emotion: evt.target.value,
      isEmotion: true,
    }, false);
    this.element.querySelector(`#${evt.target.id}`).checked = true;
  };

  #textInputHandler = (evt) => {
    this.updateData({
      text: evt.target.value,
      isText: evt.target.value.length > 0,
    }, true);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('change', this.#emotionUpdateHandler);
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#textInputHandler);
  };

  reset = (comment = generateNullComment()) => {
    this.updateData(
      PopupView.parseCommentToData(comment),
      false);
  };

  get newComment () {
    return PopupView.parseDataToComment(this._data);
  }

  setClosePopupClickHandler (callback) {
    this._callback.closePopupClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closePopupClickHandler);
  }

  #closePopupClickHandler = () => {
    this._callback.closePopupClick();
  };

  setAddToWatchListClickHandler (callback) {
    this._callback.addToWatchListClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#addToWatchListClickHandler);
  }

  #addToWatchListClickHandler = () => {
    this._callback.addToWatchListClick();
  };

  setMarkAsWatchedClickHandler (callback) {
    this._callback.markAsWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#markAsWatchedClickHandler);
  }

  #markAsWatchedClickHandler = () => {
    this._callback.markAsWatchedClick();
  };

  setAddToFavoritesClickHandler (callback) {
    this._callback.addToFavoritesClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#addToFavoritesClickHandler);
  }

  #addToFavoritesClickHandler = () => {
    this._callback.addToFavoritesClick();
  };

  #setLeaveStateScrollHandler = () => {
    this.element.addEventListener('scroll', this.#leaveStateScrollHandler);
  }

  #leaveStateScrollHandler = () => {
    this.#scrollPosition = this.element.scrollTop;
  };

  get scrollPosition () {
    return this.#scrollPosition;
  }

  saveScrollPosition = (y) => {
    this.element.scroll(0, y);
  };


}
