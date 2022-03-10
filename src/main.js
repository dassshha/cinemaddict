import {RENEDER_POSITION, renderTemplate} from "./render.js";
import {createProfileTemplate} from "./view/profile-view.js";
import {createMainMenuTemplate} from "./view/main-menu-view.js";
import {createSortTemplate} from "./view/sort-view.js";
import {createFilmsTemplate} from "./view/films-view.js";
import {createFilmCardTemplate} from "./view/film-card-view.js";
import {createShowMoreTemplate} from "./view/show-more-view.js";
import {createFilmsCountTemplate} from "./view/films-count-view.js";

const CARDS_COUNT = 5;
const CARDS_TOP_COUNT = 2;

const header = document.querySelector('.header');
renderTemplate(header, createProfileTemplate(), RENEDER_POSITION.BEFOREEND);

const main = document.querySelector('.main');
renderTemplate(main, createMainMenuTemplate(), RENEDER_POSITION.BEFOREEND);
renderTemplate(main, createSortTemplate(), RENEDER_POSITION.BEFOREEND);

renderTemplate(main, createFilmsTemplate(), RENEDER_POSITION.BEFOREEND);
const films = document.querySelector('.films');
const filmsList = films.querySelector('.films-list:nth-of-type(1)');
const filmsListContainer = filmsList.querySelector('.films-list__container');
for (let i=0;i < CARDS_COUNT; i++) {
  renderTemplate(filmsListContainer, createFilmCardTemplate(), RENEDER_POSITION.BEFOREEND);
}
renderTemplate(filmsList, createShowMoreTemplate(), RENEDER_POSITION.BEFOREEND);


const filmsListRated = films.querySelector('.films-list:nth-of-type(2)').querySelector('.films-list__container');
for (let i=0;i < CARDS_TOP_COUNT; i++) {
  renderTemplate(filmsListRated, createFilmCardTemplate(), RENEDER_POSITION.BEFOREEND);
}
const filmsListCommented = films.querySelector('.films-list:nth-of-type(3)').querySelector('.films-list__container');
for (let i=0;i < CARDS_TOP_COUNT; i++) {
  renderTemplate(filmsListCommented, createFilmCardTemplate(), RENEDER_POSITION.BEFOREEND);
}

const footerStatistics = document.querySelector('.footer__statistics');
renderTemplate(footerStatistics, createFilmsCountTemplate(), RENEDER_POSITION.BEFOREEND);
