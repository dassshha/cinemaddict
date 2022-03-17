import ShowMoreView from "../view/show-more-view";
import FilmsListEmptyView from "../view/films-list-empty-view";
import FilmsListAllView from "../view/films-list-all-view";

export default class FilmsListPresenter {
  #filmsComponent = null;
  #showMoreComponent = new ShowMoreView();
  #filmsListAllComponent = new FilmsListAllView();
  #FilmsListEmptyComponent = new FilmsListEmptyView('There are no films in our database');

  #films = [];

  constructor(filmsComponent) {
    this.#filmsComponent = filmsComponent;
  }

  init = (films) => {
    this.#films = [...films];
  }

  #renderFilm = () => {};

  #renderFilms = () => {};

  #renderNoFilms = () => {};

  #renderShowMoreButton = () => {};

  #renderFilmsList = () => {};
}

