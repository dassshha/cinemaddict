import AbstractView from "./abstract-view";
import SmartView from './smart-view';
import {generateNullComment} from '../mock/comment';
import {EMOTIONS} from '../constants';
import he from 'he';

const createCommentTemplate = (comment) => (
  `<li class="film-details__comment">
                      <span class="film-details__comment-emoji">
                        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
                      </span>
                      <div>
                        <p class="film-details__comment-text">${he.encode(comment.text)}</p>
                        <p class="film-details__comment-info">
                          <span class="film-details__comment-author">${comment.user}</span>
                          <span class="film-details__comment-day">${comment.date}</span>
                          <button class="film-details__comment-delete">Delete</button>
                        </p>
                      </div>
                    </li>`
);

export default class CommentView extends AbstractView {
  #comment = null;
  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template () {
    return createCommentTemplate(this.#comment);
  }

  setDeleteCommentClickHandler (callback) {
    this._callback.deleteCommentClick = callback;
    this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#deleteCommentClickHandler);
  }

  #deleteCommentClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteCommentClick(this.#comment);
  };
}
