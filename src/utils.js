const getRandomNumber = (min, max) => {
  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor(Math.max(Math.abs(min),Math.abs(max)));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
export {getRandomNumber, isEscapeKey};
