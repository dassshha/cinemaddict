import AbstractObservable from '../abstract-observable.js';
import {FILTER_TYPE, FilterType} from '../constants';

export default class FilterModel extends AbstractObservable {
  #filter = FILTER_TYPE.ALL;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
