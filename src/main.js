import {RENEDER_POSITION, renderTemplate, render} from "./render.js";
import ProfileView from "./view/profile-view.js";
import MainMenuView from "./view/main-menu-view.js";
import SortView from "./view/sort-view.js";
import FilmsView from "./view/films-view.js";
import FilmCardView from "./view/film-card-view.js";
import ShowMoreView from "./view/show-more-view.js";
import FilmsCountView from "./view/films-count-view.js";
import PopupView from "./view/popup-view.js";
import {generateFilm} from "./mock/film.js";
import {generatePopup} from "./mock/popup.js";
import {generateComment} from "./mock/comment.js";
import {getRandomNumber} from "./utils";
import CommentsView from "./view/comments-view.JS";

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
render(main, new SortView().element, RENEDER_POSITION.BEFOREEND);

// контейнер с тремя списками: для всех фильмов, для комментируемых и тех, что в рейтинге
const filmsComponent = new FilmsView();
render(main, filmsComponent.element, RENEDER_POSITION.BEFOREEND);

// контейнер для всех фильмов
const allFilmsListContainer = filmsComponent.element.querySelector('.films-list:nth-of-type(1)').querySelector('.films-list__container');
for (let i=0;i < Math.min(CARDS_COUNT, CARDS_COUNT_PER_STEP); i++) {
  render(allFilmsListContainer, new FilmCardView(filmsData[i]).element, RENEDER_POSITION.BEFOREEND);
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
      .forEach((film) =>  render(allFilmsListContainer, new FilmCardView(film).element, RENEDER_POSITION.BEFOREEND));

    renderedCardsCount += CARDS_COUNT_PER_STEP;
    if (renderedCardsCount >= filmsData.length) {
      showMoreComponent.removeElement();
    }
  });
}

// топ фильмов с высоким рейтингом
const ratedFilmsListContainer = filmsComponent.element.querySelector('.films-list:nth-of-type(2)').querySelector('.films-list__container');
for (let i=0;i < CARDS_TOP_COUNT; i++) {
  render(ratedFilmsListContainer, new FilmCardView(filmsData[i]).element, RENEDER_POSITION.BEFOREEND);
}

// топ комментируемых фильмов
const commentedFilmsListContainer = filmsComponent.element.querySelector('.films-list:nth-of-type(3)').querySelector('.films-list__container');
for (let i=0;i < CARDS_TOP_COUNT; i++) {
  render(commentedFilmsListContainer, new FilmCardView(filmsData[i]).element, RENEDER_POSITION.BEFOREEND);
}

// общее кол-во фильмов (в подвале)
const footerStatistics = document.querySelector('.footer__statistics');
render(footerStatistics, new FilmsCountView(0).element, RENEDER_POSITION.BEFOREEND);

// попап с подробной инфой о фильме
const body = document.querySelector('body');
render(body, new PopupView(generatePopup(), commentsData).element, RENEDER_POSITION.BEFOREEND);

