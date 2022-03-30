import AbstractView from "./abstract-view";
import SmartView from './smart-view';
import {generateNullComment} from '../mock/comment';
import {EMOTIONS} from '../constants';


// const checkSmileEmotion = (comment) => comment.emotion === EMOTIONS.SMILE ? ;
const createCommentsTemplate = (comments) => (
  `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
        </ul>
      </section>
    </div>`
);

export default class CommentsView extends AbstractView {
  #comments = null;
  constructor(comments) {
    super();
    this.#comments = comments;
  }

  get template () {
    return createCommentsTemplate(this.#comments);
  }
}
