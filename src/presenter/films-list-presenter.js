import ShowMoreView from "../view/show-more-view";
import FilmsListEmptyView from "../view/films-list-empty-view";
import FilmsListAllView from "../view/films-list-all-view";
import FilmsView from "../view/films-view";
import {render, RENEDER_POSITION} from "../render";
import FilmCardView from "../view/film-card-view";
import PopupView from "../view/popup-view";
import {isEscapeKey} from "../utils";
import {CARDS_COUNT, CARDS_COUNT_PER_STEP} from "../constants";

export default class FilmsListPresenter {
  #filmsContainer = null; //main
  #filmsListAllContainer = null;

  #filmsComponent = new FilmsView();
  #filmsListAllComponent = new FilmsListAllView();
  #filmsListEmptyComponent = new FilmsListEmptyView('There are no films in our database');

  #films = [];
  #comments = [];

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
    const filmCard = new FilmCardView(film);
    const filmPopup = new PopupView(film, this.#comments);
    const body = document.querySelector('body');

    const showPopup = () => {
      body.appendChild(filmPopup.element);
      body.classList.add('hide-overflow');
    };

    const hidePopup = () => {
      body.removeChild(filmPopup.element);
      body.classList.remove('hide-overflow');
    };

    const onEscKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        hidePopup();
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

    filmCard.setOpenPopupClickHandler(() => {
      showPopup();
      document.addEventListener('keydown', onEscKeydown);
    });

    filmPopup.setClosePopupClickHandler(() => {
      hidePopup();
      document.removeEventListener('keydown', onEscKeydown);
    });


    render(this.#filmsListAllContainer, filmCard, RENEDER_POSITION.BEFOREEND);
  };

  #renderShowMoreButton = () => {
    let renderedCardsCount = CARDS_COUNT_PER_STEP;
    const showMoreComponent = new ShowMoreView();

    render(this.#filmsListAllComponent, showMoreComponent, RENEDER_POSITION.BEFOREEND);

    showMoreComponent.setLoadMoreClickHandler(() => {
      this.#films
        .slice(renderedCardsCount, renderedCardsCount + CARDS_COUNT_PER_STEP)
        .forEach((film) =>  this.#renderFilm(film));

      renderedCardsCount += CARDS_COUNT_PER_STEP;
      if (renderedCardsCount >= this.#films.length) {
        showMoreComponent.removeElement();
      }
    });
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

