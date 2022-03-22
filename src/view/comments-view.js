import AbstractView from "./abstract-view";
import SmartView from './smart-view';
import {generateNullComment} from '../mock/comment';
import {EMOTIONS} from '../constants';

const createCommentListTemplate = (comments) => {
  let commentsList = '';
  for (let i=0;i<comments.length;i++) {
    commentsList += `<li class="film-details__comment">
                      <span class="film-details__comment-emoji">
                        <img src="./images/emoji/${comments[i].emotion}.png" width="55" height="55" alt="emoji-${comments[i].emotion}">
                      </span>
                      <div>
                        <p class="film-details__comment-text">${comments[i].text}</p>
                        <p class="film-details__comment-info">
                          <span class="film-details__comment-author">${comments[i].user}</span>
                          <span class="film-details__comment-day">${comments[i].date}</span>
                          <button class="film-details__comment-delete">Delete</button>
                        </p>
                      </div>
                    </li>`;
  }
  return commentsList;
};


// const checkSmileEmotion = (comment) => comment.emotion === EMOTIONS.SMILE ? ;
const createCommentsTemplate = (comments) => (
  `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${createCommentListTemplate(comments)}
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
