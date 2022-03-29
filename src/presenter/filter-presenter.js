import {FILTER_TYPE, UPDATE_TYPE} from '../constants';
import {filter} from '../utils';
import {RENEDER_POSITION, render, remove, replace} from '../render';
import MainMenuView from '../view/main-menu-view';

export default class FilterPresenter {
  #filterContainer = null;

  #filterComponent = null;

  #filterModel = null;
  #filmsModel = null;

  constructor(filterContainer, filterModel, filmsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get filters() {
    const films = this.#filmsModel.films;

    return {
      [FILTER_TYPE.ALL] : filter(films, FILTER_TYPE.ALL).length,
      [FILTER_TYPE.WATCHLIST] : filter(films, FILTER_TYPE.WATCHLIST).length,
      [FILTER_TYPE.HISTORY] : filter(films, FILTER_TYPE.HISTORY).length,
      [FILTER_TYPE.FAVORITES] : filter(films, FILTER_TYPE.FAVORITES).length,
      };
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new MainMenuView(filters, this.#filterModel.filter);
    this.#filterComponent.setUpdateFilterTypeClickHandler(this.#filterUpdateHandler);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RENEDER_POSITION.AFTERBEGIN);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #modelEventHandler = () => {
    this.init();
  }

  #filterUpdateHandler = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  }
}
