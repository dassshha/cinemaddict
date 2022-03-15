import {RENEDER_POSITION, renderTemplate, render} from "./render.js";
import ProfileView from "./view/profile-view.js";
import MainMenuView from "./view/main-menu-view.js";
import SortView from "./view/sort-view.js";
import {createFilmsTemplate} from "./view/films-view.js";
import {createFilmCardTemplate} from "./view/film-card-view.js";
import {createShowMoreTemplate} from "./view/show-more-view.js";
import {createFilmsCountTemplate} from "./view/films-count-view.js";
import {generateFilm} from "./mock/film.js";
import {createPopupTemplate} from "./view/popup-view.js";
import {generatePopup} from "./mock/popup.js";
import {generateComment} from "./mock/comment.js";
import {getRandomNumber} from "./utils";

const CARDS_COUNT_PER_STEP = 5;
const CARDS_COUNT = 23;
const CARDS_TOP_COUNT = 2;

// значок профиля
const header = document.querySelector('.header');
render(header, new ProfileView('Movie buff').element, RENEDER_POSITION.BEFOREEND);

// фильтры и сортировка
const main = document.querySelector('.main');
render(main, new MainMenuView(0, 0, 0).element, RENEDER_POSITION.BEFOREEND);
render(main, new SortView().element, RENEDER_POSITION.BEFOREEND);

renderTemplate(main, createFilmsTemplate(), RENEDER_POSITION.BEFOREEND);
const films = document.querySelector('.films');
const filmsList = films.querySelector('.films-list:nth-of-type(1)');
const filmsListContainer = filmsList.querySelector('.films-list__container');
const filmsData = Array.from({length: CARDS_COUNT}, generateFilm);
for (let i=0;i < Math.min(CARDS_COUNT, CARDS_COUNT_PER_STEP); i++) {
  renderTemplate(filmsListContainer, createFilmCardTemplate(filmsData[i]), RENEDER_POSITION.BEFOREEND);
}

if (filmsData.length > CARDS_COUNT_PER_STEP) {
  let renderedCardsCount = CARDS_COUNT_PER_STEP;

  renderTemplate(filmsList, createShowMoreTemplate(), RENEDER_POSITION.BEFOREEND);
  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', () => {
    filmsData
      .slice(renderedCardsCount, renderedCardsCount + CARDS_COUNT_PER_STEP)
      .forEach((film) =>  renderTemplate(filmsListContainer, createFilmCardTemplate(film), RENEDER_POSITION.BEFOREEND));

    renderedCardsCount += CARDS_COUNT_PER_STEP;
    if (renderedCardsCount >= filmsData.length) {
      showMoreButton.remove();
    }
  });
}

const filmsListRated = films.querySelector('.films-list:nth-of-type(2)').querySelector('.films-list__container');
for (let i=0;i < CARDS_TOP_COUNT; i++) {
  renderTemplate(filmsListRated, createFilmCardTemplate(generateFilm()), RENEDER_POSITION.BEFOREEND);
}

const filmsListCommented = films.querySelector('.films-list:nth-of-type(3)').querySelector('.films-list__container');
for (let i=0;i < CARDS_TOP_COUNT; i++) {
  renderTemplate(filmsListCommented, createFilmCardTemplate(generateFilm()), RENEDER_POSITION.BEFOREEND);
}


const footerStatistics = document.querySelector('.footer__statistics');
renderTemplate(footerStatistics, createFilmsCountTemplate(), RENEDER_POSITION.BEFOREEND);


// const body = document.querySelector('body');
// const comments = Array.from({length: getRandomNumber(0, 5)}, generateComment);
// renderTemplate(body, createPopupTemplate(generatePopup(), comments), RENEDER_POSITION.BEFOREEND);

