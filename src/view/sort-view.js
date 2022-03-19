import AbstractView from "./abstract-view.js";
import {SORT_TYPE} from '../constants';

const createSortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPE.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPE.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPE.RATING}">Sort by rating</a></li>
  </ul>`
);

export default class SortView extends AbstractView {
  get template () {
    return createSortTemplate();
  }
}
