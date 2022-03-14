const getRandomNumber = (min, max) => {
  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor(Math.max(Math.abs(min),Math.abs(max)));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

const generateAgeRelease = () => getRandomNumber(1950, 2022);

const generateRuntime = () => getRandomNumber(10, 180);

export {getRandomNumber, generateRuntime, generateAgeRelease, generateRating, generatePoster, generateTitle};
