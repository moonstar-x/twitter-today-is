require('dotenv').config();
const Twitter = require('twitter');
const fs = require('fs');
const path = require('path');
const Toolkit = require('actions-toolkit');
const { createImagesObject, randomItemFromArray } = require('./utils');

const imagesByDay = createImagesObject();

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

Toolkit.run((tools) => {
  tools.log.info('Executing Action...');

  const file = randomItemFromArray(imagesByDay[new Date().getDay()]);
  const image = fs.readFileSync(path.join(__dirname, '../assets', file));

  client.post('media/upload', { media: image })
    .then((media) => {
      tools.log.info(`Uploaded image ${file}`);

      client.post('statuses/update', { status: '', media_ids: media.media_id_string, lat: process.env.COORD_LAT, long: process.env.COORD_LONG })
        .then((tweet) => {
          tools.log.info(`Posted tweet with ID: ${tweet.id_str}. Current number of tweets: ${tweet.user.statuses_count + 1}`);
        })
        .catch((error) => {
          tools.log.fatal(error);
        });
    })
    .catch((error) => {
      tools.log.fatal(error);
    });
}, {
  event: 'schedule',
  secrets: ['TWITTER_CONSUMER_KEY', 'TWITTER_CONSUMER_SECRET', 'TWITTER_ACCESS_TOKEN', 'TWITTER_ACCESS_SECRET']
});
