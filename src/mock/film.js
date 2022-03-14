import {
  generateTitle,
  generatePoster,
  generateRating,
  generateAgeRelease,
  generateRuntime,
  getRandomNumber
} from "../utils.js";

const generateGenre = () => {
  const genres = [
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon'
  ];
  return genres[getRandomNumber(0, genres.length - 1)];
};

const generateShortDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.'
  ];
  let shortDescription = '';
  const sentencesCount = getRandomNumber(1, 5);
  for (let i = 0; i < sentencesCount; i++) {
    const description = descriptions[getRandomNumber(0, descriptions.length - 1)];
    if (!shortDescription.includes(description)) {
      shortDescription += description;
    }
  }
  return shortDescription.slice(0, 140);
};

const generateFilm = () => ({
  poster: generatePoster(),
  title: generateTitle(),
  rating: generateRating(),
  ageRelease: generateAgeRelease(),
  runtime: generateRuntime(),
  genre: generateGenre(),
  shortDescription: generateShortDescription(),
  commentsCount: '5 comments'
});

export {generateFilm, generateShortDescription};
