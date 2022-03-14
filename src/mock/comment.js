import {generateShortDescription} from "./film.js";
import {getRandomNumber} from "../utils.js";

const generateEmotion = () => {
  const emotions = ['smile', 'sleeping', 'puke', 'angry'];
  return emotions[getRandomNumber(0, emotions.length - 1)];
};

const generateUser = () => {
  const users = ['dassshha', 'brambort', 'vsenespim36', 'vatanchik', 'psiccho'];
  return users[getRandomNumber(0, users.length - 1)];
};
const generateComment = () => ({
  text: generateShortDescription(),
  emotion: generateEmotion(),
  user: generateUser(),
  date: '2019/12/31 23:59'
});

export {generateComment};
