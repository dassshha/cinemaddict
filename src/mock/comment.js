import {getRandomNumber} from "../utils.js";

const generateEmotion = () => {
  const emotions = ['smile', 'sleeping', 'puke', 'angry'];
  return emotions[getRandomNumber(0, emotions.length - 1)];
};

const generateUser = () => {
  const users = ['dassshha', 'brambort', 'vsenespim36', 'vatanchik', 'psiccho'];
  return users[getRandomNumber(0, users.length - 1)];
};

const generateText = () => {
  const sentences = [
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
  let text = '';
  const sentencesCount = getRandomNumber(1, 3);
  for (let i = 0; i < sentencesCount; i++) {
    const sentence = sentences[getRandomNumber(0, sentences.length - 1)];
    if (!text.includes(sentence)) {
      text += sentence;
    }
  }
  return text;
};
const generateComment = () => ({
  text: generateText(),
  emotion: generateEmotion(),
  user: generateUser(),
  date: '2019/12/31 23:59'
});

export {generateComment};
