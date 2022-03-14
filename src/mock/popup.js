import {
  generateTitle,
  generatePoster,
  generateRating,
  generateAgeRelease,
  generateRuntime,
  getRandomNumber
} from "../utils.js";

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

const generateAge = () => getRandomNumber(0, 21);

const generatePopup = () => {
  const title = generateTitle();
  return {
    poster: generatePoster(),
    title: title,
    originalTitle: title,
    rating: generateRating(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    dateRelease: generateAgeRelease(),
    runtime: generateRuntime(),
    country: generateCountry(),
    genres: generateGenres(),
    fullDescription: generateFullDescription(),
    age: generateAge()
  };
};

export {generatePopup};
