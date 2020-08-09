const Twitter = require('twitter');
const logger = require('@greencoast/logger');
const fs = require('fs');
const path = require('path');
const { createImagesObject, randomItemFromArray } = require('./utils');

const imagesByDay = createImagesObject();

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

logger.info('Executing Action...');

const file = randomItemFromArray(imagesByDay[new Date().getDay()]);
const image = fs.readFileSync(path.join(__dirname, '../assets', file));

client.post('media/upload', { media: image })
  .then((media) => {
    logger.info(`Uploaded image ${file}`);

    client.post('statuses/update', { status: '', media_ids: media.media_id_string, lat: process.env.COORD_LAT, long: process.env.COORD_LONG })
      .then((tweet) => {
        logger.info(`Posted tweet with ID: ${tweet.id_str}. Current number of tweets: ${tweet.user.statuses_count + 1}`);
      })
      .catch((error) => {
        logger.fatal('There was an error on tweet!');
        logger.fatal(error);
        process.exit(1);
      });
  })
  .catch((error) => {
    logger.fatal('There was an error on image upload!');
    logger.fatal(error);
    process.exit(1);
  });
