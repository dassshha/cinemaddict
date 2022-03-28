import ShowMoreView from "../view/show-more-view";
import FilmsListEmptyView from "../view/films-list-empty-view";
import FilmsListAllView from "../view/films-list-all-view";
import FilmsView from "../view/films-view";
import {render, RENEDER_POSITION, remove} from "../render";
import {CARDS_COUNT, CARDS_COUNT_PER_STEP, SORT_TYPE} from '../constants';
import FilmPresenter from "./film-presenter";
import {sortFilmsByDateDown, sortFilmsByRatingDown, updateItem} from '../utils';
import SortView from '../view/sort-view';

export default class FilmsListPresenter {
  #filmsContainer = null; //main
  #filmsListAllContainer = null;
  #filmsModel = null;

  #filmsComponent = new FilmsView();
  #filmsListAllComponent = new FilmsListAllView();
  #filmsListEmptyComponent = new FilmsListEmptyView('There are no films in our database');
  #showMoreComponent = new ShowMoreView();

  // #films = [];
  // #defaultSortedFilms = [];
  // #comments = [];

  #sortType = SORT_TYPE.DEFAULT;
  #renderedCardsCount = CARDS_COUNT_PER_STEP;

  #filmPresenter = new Map();

  constructor(filmsContainer, filmsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    // this.#films = [...films];
    // this.#comments = [...comments];
    // this.#defaultSortedFilms = [...films];

    render(this.#filmsContainer, this.#filmsComponent, RENEDER_POSITION.BEFOREEND);

    this.#renderFilmsList();
  }

  get films () {
    switch (this.#sortType) {
      case SORT_TYPE.DATE:
        return [...this.#filmsModel.films].sort(sortFilmsByDateDown);
      case SORT_TYPE.RATING:
        return [...this.#filmsModel.films].sort(sortFilmsByRatingDown);
    }
    return this.#filmsModel.films;
  }

  // #sortFilms = (sortType) => {
  //   switch (sortType) {
  //     case SORT_TYPE.RATING:
  //       this.#films.sort(sortFilmsByRatingDown);
  //       break;
  //     case SORT_TYPE.DATE:
  //       this.#films.sort(sortFilmsByDate);
  //       break;
  //     default:
  //       this.#films = [...this.#defaultSortedFilms];
  //   }
  //
  //   this.#sortType = sortType;
  // };

  #sortFilmsHandler = (sortType) => {
    if (this.#sortType === sortType) {
      return;
    }
    // this.#sortFilms(sortType);
    this.#sortType = sortType;
    this.#clearFilmsList();
    this.#renderFilms();
  };

  #filmUpdateHandler = (updatedFilm) => {
    // this.#films = updateItem(this.#films, updatedFilm);
    // this.#defaultSortedFilms = updateItem(this.#defaultSortedFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  // для регулирования открытия только одного попапа
  #modeUpdateHandler = (currentFilm) => {
    this.#filmPresenter.forEach((presenter) => {
      if (presenter !== this.#filmPresenter.get(currentFilm.id)) {
        presenter.resetView();
      }
    });
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsListAllContainer, this.#filmUpdateHandler, this.#modeUpdateHandler);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #showMoreClickHandler = () => {
    this.films
      .slice(this.#renderedCardsCount, this.#renderedCardsCount + CARDS_COUNT_PER_STEP)
      .forEach((film) =>  this.#renderFilm(film));

    this.#renderedCardsCount += CARDS_COUNT_PER_STEP;
    if (this.#renderedCardsCount >= this.films.length) {
      remove(this.#showMoreComponent);
    }
  };

  #renderShowMoreButton = () => {
    render(this.#filmsListAllComponent, this.#showMoreComponent, RENEDER_POSITION.BEFOREEND);
    this.#showMoreComponent.setShowMoreClickHandler(this.#showMoreClickHandler);
  };

  #renderFilms = () => {
    render(this.#filmsComponent, this.#filmsListAllComponent, RENEDER_POSITION.BEFOREEND);
    this.#filmsListAllContainer = this.#filmsListAllComponent.element.querySelector('.films-list__container');
    for (let i=0;i < Math.min(CARDS_COUNT, CARDS_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.films[i]);
    }

    if (this.films.length > CARDS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderNoFilms = () => render(this.#filmsComponent, this.#filmsListEmptyComponent, RENEDER_POSITION.BEFOREEND);

  #renderSort = () => {
    const sortComponent = new SortView();
    sortComponent.setUpdateSortTypeClickHandler(this.#sortFilmsHandler);
    render(this.#filmsContainer, sortComponent, RENEDER_POSITION.AFTERBEGIN);
  };

  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedCardsCount = CARDS_COUNT_PER_STEP;
    remove(this.#showMoreComponent);
  }

  #renderFilmsList = () => {
    if (this.films.length === 0) {
      this.#renderNoFilms();
      return;
    }
    this.#renderSort();
    this.#renderFilms();
  };
}

