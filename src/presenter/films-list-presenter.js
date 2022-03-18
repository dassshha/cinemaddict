import ShowMoreView from "../view/show-more-view";
import FilmsListEmptyView from "../view/films-list-empty-view";
import FilmsListAllView from "../view/films-list-all-view";
import FilmsView from "../view/films-view";
import {render, RENEDER_POSITION} from "../render";
import FilmCardView from "../view/film-card-view";
import PopupView from "../view/popup-view";
import {isEscapeKey} from "../utils";
import {CARDS_COUNT, CARDS_COUNT_PER_STEP} from "../constants";
import FilmPresenter from "./film-presenter";

export default class FilmsListPresenter {
  #filmsContainer = null; //main
  #filmsListAllContainer = null;

  #filmsComponent = new FilmsView();
  #filmsListAllComponent = new FilmsListAllView();
  #filmsListEmptyComponent = new FilmsListEmptyView('There are no films in our database');
  #showMoreComponent = new ShowMoreView();

  #films = [];
  #comments = [];

  #renderedCardsCount = CARDS_COUNT_PER_STEP;

  constructor(filmsContainer) {
    this.#filmsContainer = filmsContainer;
  }

  init = (films, comments) => {
    this.#films = [...films];
    this.#comments = [...comments];

    render(this.#filmsContainer, this.#filmsComponent, RENEDER_POSITION.BEFOREEND);

    this.#renderFilmsList();
  }

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsListAllContainer);
    filmPresenter.init(film, this.#comments);
  };

  #showMoreClickHandler = () => {
    this.#films
      .slice(this.#renderedCardsCount, this.#renderedCardsCount + CARDS_COUNT_PER_STEP)
      .forEach((film) =>  this.#renderFilm(film));

    this.#renderedCardsCount += CARDS_COUNT_PER_STEP;
    if (this.#renderedCardsCount >= this.#films.length) {
      this.#showMoreComponent.removeElement();
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
      this.#renderFilm(this.#films[i]);
    }

    if (this.#films.length > CARDS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderNoFilms = () => render(this.#filmsComponent, this.#filmsListEmptyComponent, RENEDER_POSITION.BEFOREEND);;

  #renderFilmsList = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }
    this.#renderFilms();
  };
}
