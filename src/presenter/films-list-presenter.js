import ShowMoreView from "../view/show-more-view";
import FilmsListEmptyView from "../view/films-list-empty-view";
import FilmsListAllView from "../view/films-list-all-view";
import FilmsView from "../view/films-view";
import {render, RENEDER_POSITION, remove} from "../render";
import {
  CARDS_COUNT,
  CARDS_COUNT_PER_STEP,
  EMPTY_LIST_MESSAGES,
  FILTER_TYPE,
  SORT_TYPE,
  UPDATE_TYPE,
  USER_ACTION
} from '../constants';
import FilmPresenter from "./film-presenter";
import {filter, sortFilmsByDateDown, sortFilmsByRatingDown} from '../utils';
import SortView from '../view/sort-view';

export default class FilmsListPresenter {
  #filmsContainer = null; //main
  #filmsListAllContainer = null;
  #filmsModel = null;
  #filterModel = null;
  #commentsModel = null;
  #sortComponent = null;

  #filmsComponent = new FilmsView();
  #filmsListAllComponent = new FilmsListAllView();
  #filmsListEmptyComponent = null;
  #showMoreComponent = new ShowMoreView();

  // #films = [];
  // #defaultSortedFilms = [];
  // #comments = [];

  #sortType = SORT_TYPE.DEFAULT;
  #filterType = FILTER_TYPE.ALL;
  #renderedCardsCount = CARDS_COUNT_PER_STEP;

  #filmPresenter = new Map();

  constructor(filmsContainer, filmsModel, filterModel, commentsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;
    this.#commentsModel = commentsModel;

    this.#filmsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  init = () => {
    // this.#films = [...films];
    // this.#comments = [...comments];
    // this.#defaultSortedFilms = [...films];

    render(this.#filmsContainer, this.#filmsComponent, RENEDER_POSITION.BEFOREEND);

    this.#renderFilmsList();
  }

  get films () {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter(films, this.#filterType);

    switch (this.#sortType) {
      case SORT_TYPE.DATE:
        return [...filteredFilms].sort(sortFilmsByDateDown);
      case SORT_TYPE.RATING:
        return [...filteredFilms].sort(sortFilmsByRatingDown);
      default:
      {
        return [...filteredFilms];
      }

    }
  }

  get comments () {
    return this.#commentsModel.comments;
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
    this.#clearFilmsList(true);
    this.#renderFilmsList();
  };

  // #filmUpdateHandler = (updatedFilm) => {
  //   // this.#films = updateItem(this.#films, updatedFilm);
  //   // this.#defaultSortedFilms = updateItem(this.#defaultSortedFilms, updatedFilm);
  //   this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  //   console.log(this.films[0].addToWatchlist);
  // };

  #viewActionHandler = (actionType, updateType, update) => {
    // console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case USER_ACTION.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  #modelEventHandler = (updateType, data) => {
    // console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        // - обновить часть списка (например, когда поменялось значения кнопок или комментарии)
        this.#filmPresenter.get(data.id).init(data);
        // console.log(this.#filmsModel.films(data.id));
        break;
      case UPDATE_TYPE.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearFilmsList();
        this.#renderFilmsList();
        break;
      case UPDATE_TYPE.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearFilmsList(true, true);
        this.#renderFilmsList();
        break;
    }
  }

  // для регулирования открытия только одного попапа
  #modeUpdateHandler = (currentFilm) => {
    this.#filmPresenter.forEach((presenter) => {
      if (presenter !== this.#filmPresenter.get(currentFilm.id)) {
        presenter.resetView();
      }
    });
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsListAllContainer, this.#viewActionHandler, this.#modeUpdateHandler);
    const comments = this.comments.filter((comment) => film.comments.includes(comment.id));
    filmPresenter.init(film, comments);
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
      // console.log(i);
      // console.log(this.films[i]);

    }

    if (this.films.length > CARDS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderNoFilms = () => {
    this.#filmsListEmptyComponent = new FilmsListEmptyView(EMPTY_LIST_MESSAGES[this.#filterType]);
    render(this.#filmsComponent, this.#filmsListEmptyComponent, RENEDER_POSITION.BEFOREEND);
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#sortType);
    this.#sortComponent.setUpdateSortTypeClickHandler(this.#sortFilmsHandler);
    render(this.#filmsContainer, this.#sortComponent, RENEDER_POSITION.AFTERBEGIN);
  };

  #clearFilmsList = (resetRenderedCardsCount = false, resetSortType = false) => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#showMoreComponent);
    remove(this.#sortComponent);
    remove(this.#filmsListAllComponent);
    if (this.#filmsListEmptyComponent) {
      remove(this.#filmsListEmptyComponent);
    }

    if (resetRenderedCardsCount) {
      this.#renderedCardsCount = CARDS_COUNT_PER_STEP;
    } else {
      // если перерисовка вызвана удалением карточки;
      this.#renderedCardsCount = Math.min(this.films.length, this.#renderedCardsCount);
    }

    if (resetSortType) {
      this.#sortType = SORT_TYPE.DEFAULT;
    }
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

