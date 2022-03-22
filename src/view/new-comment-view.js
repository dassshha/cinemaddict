import AbstractView from './abstract-view';
import {generateNullComment} from '../mock/comment';
import SmartView from './smart-view';

const NEW_COMMENT = generateNullComment();

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

export default class NewCommentView extends SmartView {
  constructor(comment = NEW_COMMENT) {
    super();
    this._data = NewCommentView.parseCommentToData(comment);

    this.#setInnerHandlers();
  }

  get template () {
    return createNewCommentViewTemplate(this._data);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
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

  static parseCommentToData = (comment) => ({
    ...comment,
    isEmotion: comment.emotion !== null,
    isText: comment.text !== null,
  });

  reset = (comment = NEW_COMMENT) => {
    this.updateData(
      NewCommentView.parseCommentToData(comment),
     false);
  };
}
