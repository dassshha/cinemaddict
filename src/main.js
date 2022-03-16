import {RENEDER_POSITION, render} from "./render.js";
import ProfileView from "./view/profile-view.js";
import MainMenuView from "./view/main-menu-view.js";
import SortView from "./view/sort-view.js";
import FilmsView from "./view/films-view.js";
import FilmsListAllView from "./view/films-list-all-view.js"
import FilmsListEmptyView from "./view/films-list-empty-view.js"
import FilmCardView from "./view/film-card-view.js";
import ShowMoreView from "./view/show-more-view.js";
import FilmsCountView from "./view/films-count-view.js";
import PopupView from "./view/popup-view.js";
// import {generateFilm} from "./mock/film.js";
import {generateFilm} from "./mock/film.js";
import {generateComment} from "./mock/comment.js";
import {getRandomNumber} from "./utils";

const CARDS_COUNT_PER_STEP = 5;
const CARDS_COUNT = 23;
const CARDS_TOP_COUNT = 2;
const filmsData = Array.from({length: CARDS_COUNT}, generateFilm);
const commentsData = Array.from({length: getRandomNumber(0, 5)}, generateComment);

// значок профиля
const header = document.querySelector('.header');
render(header, new ProfileView('Movie buff').element, RENEDER_POSITION.BEFOREEND);

// фильтры и сортировка
const main = document.querySelector('.main');
render(main, new MainMenuView(0, 0, 0).element, RENEDER_POSITION.BEFOREEND);
// при отсутствии фильмов сортировка не отображается
if (filmsData.length !== 0) {
  render(main, new SortView().element, RENEDER_POSITION.BEFOREEND);
}

// контейнер с тремя списками: для всех фильмов, для комментируемых и тех, что в рейтинге
const filmsComponent = new FilmsView();
render(main, filmsComponent.element, RENEDER_POSITION.BEFOREEND);

if (filmsData.length === 0) {
  render(filmsComponent.element, new FilmsListEmptyView('There are no films in our database').element, RENEDER_POSITION.BEFOREEND);
} else {
  renderAllFilms();
}

// топ фильмов с высоким рейтингом
// const ratedFilmsListContainer = filmsComponent.element.querySelector('.films-list:nth-of-type(2)').querySelector('.films-list__container');
// for (let i=0;i < CARDS_TOP_COUNT; i++) {
//   render(ratedFilmsListContainer, new FilmCardView(filmsData[i]).element, RENEDER_POSITION.BEFOREEND);
// }

// топ комментируемых фильмов
// const commentedFilmsListContainer = filmsComponent.element.querySelector('.films-list:nth-of-type(3)').querySelector('.films-list__container');
// for (let i=0;i < CARDS_TOP_COUNT; i++) {
//   render(commentedFilmsListContainer, new FilmCardView(filmsData[i]).element, RENEDER_POSITION.BEFOREEND);
// }

// общее кол-во фильмов (в подвале)
const footerStatistics = document.querySelector('.footer__statistics');
render(footerStatistics, new FilmsCountView(0).element, RENEDER_POSITION.BEFOREEND);


function renderAllFilms () {
  // контейнер для всех фильмов
  const filmsListAllComponent = new FilmsListAllView();
  render(filmsComponent.element, filmsListAllComponent.element, RENEDER_POSITION.BEFOREEND);
  const filmsListAllContainer = filmsListAllComponent.element.querySelector('.films-list__container');
  for (let i=0;i < Math.min(CARDS_COUNT, CARDS_COUNT_PER_STEP); i++) {
    renderFilm(filmsListAllContainer, filmsData[i]);
  }

  // обработка логики show-more-btn
  if (filmsData.length > CARDS_COUNT_PER_STEP) {
    let renderedCardsCount = CARDS_COUNT_PER_STEP;

    const allFilmsList = filmsComponent.element.querySelector('.films-list:nth-of-type(1)');
    const showMoreComponent = new ShowMoreView();
    render(allFilmsList, showMoreComponent.element, RENEDER_POSITION.BEFOREEND);

    showMoreComponent.element.addEventListener('click', () => {
      filmsData
        .slice(renderedCardsCount, renderedCardsCount + CARDS_COUNT_PER_STEP)
        .forEach((film) =>  renderFilm(filmsListAllContainer, film));

      renderedCardsCount += CARDS_COUNT_PER_STEP;
      if (renderedCardsCount >= filmsData.length) {
        showMoreComponent.removeElement();
      }
    });
  }
}

function renderFilm (container, film) {
  const filmCard = new FilmCardView(film);
  const filmPopup = new PopupView(film, commentsData);
  const body = document.querySelector('body');

  const filmLink = filmCard.element.querySelector('.film-card__link');
  const closePopupButton = filmPopup.element.querySelector('.film-details__close-btn');

  filmLink.addEventListener('click', (evt) => {
    evt.preventDefault();
    body.appendChild(filmPopup.element);
    body.classList.add('hide-overflow');
  });

  closePopupButton.addEventListener('click', () => {
    body.removeChild(filmPopup.element);
    body.classList.remove('hide-overflow');
  });


  render(container, filmCard.element, RENEDER_POSITION.BEFOREEND);
}


