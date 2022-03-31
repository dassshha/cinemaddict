import AbstractObservable from '../abstract-observable';

export default class CommentsModel extends AbstractObservable {
  #comments = [];

  set comments(comments) {
    this.#comments = [...comments];
  }

  get comments() {
    return this.#comments;
  }

  deleteComment = (updateType, update, film) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    // console.log(film.comments);
    const commentIndex = film.comments.indexOf(update.id);
    film.comments.splice(commentIndex, 1);
    // console.log(film.comments);
    this._notify(updateType, film);
  };

  addComment = (updateType, update, film) => {
      this.#comments = [...this.#comments, update];

      film.comments.push(update.id);
      this._notify(updateType, film);
  }
}
