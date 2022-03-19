import {getRandomNumber} from "../utils.js";
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';

const generateTitle = () => {
  const titles = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor'
  ];
  return titles[getRandomNumber(0, titles.length - 1)];
};

const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'sagebrush-trail.jpg',
    'popeye-meets-sinbad.png',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg'
  ];
  return `./images/posters/${posters[getRandomNumber(0, posters.length - 1)]}`;
};

const generateRating = () => getRandomNumber(0, 10);

const generateDateRelease = () => {
  const yearGap = getRandomNumber(-60, 0);
  const monthGap = getRandomNumber(-12, 12);
  const dayGap = getRandomNumber(-28, 28);
  const hourGap = getRandomNumber(-24, 24);
  const minuteGap = getRandomNumber(-60, 60);

  return dayjs()
    .add(yearGap, 'year')
    .add(monthGap, 'month')
    .add(dayGap, 'day')
    .add(hourGap, 'hour')
    .add(minuteGap, 'minute');
};

const generateRuntime = () => generateDateRelease();

const generateDirector = () => {
  const directors = [
    'Anthony Mann',
    'Christopher Nolan',
    'Steven Spielberg',
    'Quentin Tarantino',
    'Martin Scorsese'
  ];
  return directors[getRandomNumber(0, directors.length - 1)];
};

const generateWriters = () => {
  const writers = [
    'Billy Wilder',
    'Ethan Coen and Joel Coen',
    'Robert Towne',
    'Quentin Tarantino',
    'Francis Ford Coppola',
    'William Goldman'
  ];
  const generatedWriters = [];
  const writesCount = getRandomNumber(2, 4);
  for (let i = 0; i < writesCount; i++) {
    const writer = writers[getRandomNumber(0, writers.length - 1)];
    if (!generatedWriters.includes(writer)) {
      generatedWriters.push(writer);
    }
  }
  return generatedWriters;
};

const generateActors = () => {
  const actors = [
    'Robert De Niro',
    'Leonardo DiCaprio',
    'Cate Blanchett',
    'Audrey Hepburn',
    'Kate Winslet',
    'Julia Roberts'
  ];
  const generatedActors = [];
  const actorsCount = getRandomNumber(2, 4);
  for (let i = 0; i < actorsCount; i++) {
    const actor = actors[getRandomNumber(0, actors.length - 1)];
    if (!generatedActors.includes(actor)) {
      generatedActors.push(actor);
    }
  }
  return generatedActors;
};

const generateCountry = () => {
  const countries = [
    'Russia',
    'France',
    'Italy',
    'Germany',
    'USA'
  ];
  return countries[getRandomNumber(0, countries.length - 1)];
};

const generateGenres = () => {
  const genres = [
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon'
  ];
  const generatedGenres = [];
  const genresCount = getRandomNumber(1, 3);
  for (let i = 0; i < genresCount; i++) {
    const genre = genres[getRandomNumber(0, genres.length - 1)];
    if (!generatedGenres.includes(genre)) {
      generatedGenres.push(genre);
    }
  }
  return generatedGenres;
};

const generateFullDescription = () => {
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
  let fullDescription = '';
  const sentencesCount = getRandomNumber(5, 10);
  for (let i = 0; i < sentencesCount; i++) {
    const description = descriptions[getRandomNumber(0, descriptions.length - 1)];
    if (!fullDescription.includes(description)) {
      fullDescription += description;
    }
  }
  return fullDescription;
};

const generateShortDescription = () => generateFullDescription().slice(0, 140);

const generateAge = () => getRandomNumber(0, 21);

const generateBoolean = () => {
  const boolean = [true, false];
  return boolean[getRandomNumber(0, 1)];
};

const generateFilm = () => {
  const title = generateTitle();
  return {
    id: nanoid(),
    poster: generatePoster(),
    title: title,
    originalTitle: title,
    rating: generateRating(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    dateRelease: generateDateRelease(),
    runtime: generateRuntime(),
    country: generateCountry(),
    genres: generateGenres(),
    fullDescription: generateFullDescription(),
    shortDescription: generateShortDescription(),
    age: generateAge(),
    commentsCount: '0 comments',
    addToWatchlist: generateBoolean(),
    alreadyWatched: generateBoolean(),
    isFavorite: generateBoolean()
  };
};

export {generateFilm};
