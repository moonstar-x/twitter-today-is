const fs = require('fs');
const path = require('path');

const createImagesObject = () => {
  const images = fs.readdirSync(path.join(__dirname, '../../assets')).filter((file) => file.endsWith('.jpg') || file.endsWith('.png'));
  const initial = {};

  for (let i = 0; i < 7; i++) {
    initial[i] = [];
  }

  return images.reduce((obj, file) => {
    const day = file[0];
    const dayNum = Number(day);
    if (dayNum >= 0 && dayNum < 7) {
      obj[day].push(file);
    }
    return obj;
  }, initial);
};

const randomItemFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

module.exports = {
  createImagesObject,
  randomItemFromArray
};
