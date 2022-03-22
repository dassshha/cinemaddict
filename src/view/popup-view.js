import CommentsView from "./comments-view.js";
import AbstractView from "./abstract-view.js";

const createGenreTemplate = (genres) => {
  if (genres.length === 1) {
    return  `<td class="film-details__term">Genre</td>
               <td class="film-details__cell">
               <span class="film-details__genre">${genres[0]}</span>
            </td>`;
  }
  let genreTemplate = '<td class="film-details__term">Genres</td><td class="film-details__cell">';
  for (let i=0; i < genres.length; i++) {
    genreTemplate += `<span class="film-details__genre">${genres[i]}</span>`;
  }
  genreTemplate += '</td>';
  return genreTemplate;
};

const createDetailsButtonsTemplate = (film) => {
  const inWatchListClassName = film.addToWatchlist
    ? 'film-details__control-button--active film-details__control-button--watchlist'
    : 'film-details__control-button--watchlist';

  const ifWatchedClassName = film.alreadyWatched
    ? 'film-details__control-button--active film-details__control-button--watched'
    : 'film-details__control-button--watched';

  const isFavoriteClassName = film.isFavorite
    ? 'film-details__control-button--active film-details__control-button--favorite'
    : 'film-details__control-button--favorite';

  return `<section class="film-details__controls">
        <button type="button" class="film-details__control-button ${inWatchListClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${ifWatchedClassName}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${isFavoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
      </section>`
};

const createInfoTemplate = (popup) => {
  const dateRelease = popup.dateRelease.format('DD MMMM YYYY');

  const runtime = popup.runtime.format('HH[h] mm[m]');

  return `<div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${popup.poster}" alt="">

          <p class="film-details__age">${popup.age}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${popup.title}</h3>
              <p class="film-details__title-original">Original: ${popup.originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${popup.rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${popup.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${popup.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${popup.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dateRelease}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${popup.country}</td>
            </tr>
            <tr class="film-details__row">
<!--              <td class="film-details__term">Genres</td>-->
<!--              <td class="film-details__cell">-->
<!--                <span class="film-details__genre">Drama</span>-->
<!--                <span class="film-details__genre">Film-Noir</span>-->
<!--                <span class="film-details__genre">Mystery</span></td>-->
                ${createGenreTemplate(popup.genres)}
            </tr>
          </table>

          <p class="film-details__film-description">
          ${popup.fullDescription}
          </p>
        </div>
      </div>

      ${createDetailsButtonsTemplate(popup)}
    </div>`
};

const createPopupTemplate = (popup) => (
  `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    ${createInfoTemplate(popup)}
  </form>
</section>`
);

export default class PopupView extends AbstractView{
  #popup = null;
  #scrollPosition = 0;

  constructor(popup) {
    super();
    this.#popup = popup;

    this.#setLeaveStateScrollHandler();
  }

  get template () {
    return createPopupTemplate(this.#popup);
  }

  setClosePopupClickHandler (callback) {
    this._callback.closePopupClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closePopupClickHandler);
  }

  #closePopupClickHandler = () => {
    this._callback.closePopupClick();
  };

  setAddToWatchListClickHandler (callback) {
    this._callback.addToWatchListClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#addToWatchListClickHandler);
  }

  #addToWatchListClickHandler = () => {
    this._callback.addToWatchListClick();
  };

  setMarkAsWatchedClickHandler (callback) {
    this._callback.markAsWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#markAsWatchedClickHandler);
  }

  #markAsWatchedClickHandler = () => {
    this._callback.markAsWatchedClick();
  };

  setAddToFavoritesClickHandler (callback) {
    this._callback.addToFavoritesClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#addToFavoritesClickHandler);
  }

  #addToFavoritesClickHandler = () => {
    this._callback.addToFavoritesClick();
  };

  #setLeaveStateScrollHandler = () => {
    this.element.addEventListener('scroll', this.#leaveStateScrollHandler);
  }

  #leaveStateScrollHandler = () => {
    this.#scrollPosition = this.element.scrollTop;
  };

  get scrollPosition () {
    return this.#scrollPosition;
  }

  saveScrollPosition = (y) => {
    this.element.scroll(0, y);
  };


}
