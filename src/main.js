import {RENEDER_POSITION, render} from "./render.js";
import ProfileView from "./view/profile-view.js";
import MainMenuView from "./view/main-menu-view.js";
import FilmsCountView from "./view/films-count-view.js";
import {generateFilm} from "./mock/film.js";
import {generateComment} from "./mock/comment.js";
import {getRandomNumber} from "./utils";
import FilmsListPresenter from "./presenter/films-list-presenter";
import {CARDS_COUNT} from "./constants";
import FilmsModel from './model/films-model';
import FilterModel from './model/filters-model';
import FilterPresenter from './presenter/filter-presenter';


const filmsData = Array.from({length: CARDS_COUNT}, generateFilm);
const commentsData = Array.from({length: getRandomNumber(0, 5)}, generateComment);

// значок профиля
const header = document.querySelector('.header');
render(header, new ProfileView('Movie buff'), RENEDER_POSITION.BEFOREEND);

// фильтры и сортировка
const main = document.querySelector('.main');
const filterModel = new FilterModel();
const filmsModel = new FilmsModel();
filmsModel.films = filmsData;
const filterPresenter = new FilterPresenter(main, filterModel, filmsModel);
// render(main, new MainMenuView(0, 0, 0, 'ALL'), RENEDER_POSITION.AFTERBEGIN);
filterPresenter.init();

const content = main.querySelector('.content');
const presenter = new FilmsListPresenter(content, filmsModel, filterModel);
presenter.init();


// общее кол-во фильмов (в подвале)
const footerStatistics = document.querySelector('.footer__statistics');
render(footerStatistics, new FilmsCountView(0), RENEDER_POSITION.BEFOREEND);

