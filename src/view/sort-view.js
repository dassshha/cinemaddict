import AbstractView from "./abstract-view.js";
import {SORT_TYPE} from '../constants';

const createSortTemplate = (sortType) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button ${sortType === SORT_TYPE.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPE.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${sortType === SORT_TYPE.DATE ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPE.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${sortType === SORT_TYPE.RATING ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPE.RATING}">Sort by rating</a></li>
  </ul>`
);

export default class SortView extends AbstractView {
  #sortType = null;

  constructor(sortType) {
    super();
    this.#sortType = sortType;
  }

  get template () {
    return createSortTemplate(this.#sortType);
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
    this._callback.updateSortTypeClick(evt.target.dataset.sortType);
  };
}
