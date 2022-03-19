import AbstractView from "./abstract-view.js";
import {SORT_TYPE} from '../constants';

const createSortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SORT_TYPE.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPE.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPE.RATING}">Sort by rating</a></li>
  </ul>`
);

export default class SortView extends AbstractView {
  #sortType = null;

  get template () {
    return createSortTemplate();
  }

  setUpdateSortTypeClickHandler (callback) {
    this._callback.updateSortTypeClick = callback;
    this.element.addEventListener('click', this.#updateSortTypeClickHandler);
  }

  #updateSortTypeClickHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();

    const links = this.element.querySelectorAll('a');
    links.forEach((link) => {
      if (link.classList.contains('sort__button--active')) {
        link.classList.remove('sort__button--active');
      }
    });
    evt.target.classList.add('sort__button--active');
    this.#sortType = evt.target.dataset.sortType;
    this._callback.updateSortTypeClick(this.#sortType);
  };
}
