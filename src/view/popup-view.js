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

const createInfoTemplate = (popup) => (
  `<div class="film-details__top-container">
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
              <td class="film-details__cell">${popup.dateRelease}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${popup.runtime}</td>
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

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>`
);

const createPopupTemplate = (popup, comments) => (
  `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    ${createInfoTemplate(popup)}

    ${new CommentsView(comments).template}
  </form>
</section>`
);

export default class PopupView extends AbstractView{
  #popup = null;
  #comments = null;
  constructor(popup, comments) {
    super();
    this.#popup = popup;
    this.#comments = comments;
  }

  get template () {
    return createPopupTemplate(this.#popup, this.#comments);
  }

  setClosePopupClickHandler (callback) {
    this._callback.closePopupClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closePopupClickHandler);
  }

  #closePopupClickHandler = () => {
    this._callback.closePopupClick();
  };
}
