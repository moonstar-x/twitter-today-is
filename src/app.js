const Twitter = require('twitter');
const Toolkit = require('actions-toolkit');
const fs = require('fs');
const path = require('path');
const { createImagesObject, randomItemFromArray } = require('./utils');

const imagesByDay = createImagesObject();

Toolkit.run((tools) => {
  tools.log.info('Executing Action...');

  const client = new Twitter({
    consumer_key: tools.inputs.TWITTER_CONSUMER_KEY,
    consumer_secret: tools.inputs.TWITTER_CONSUMER_SECRET,
    access_token_key: tools.inputs.TWITTER_ACCESS_TOKEN,
    access_token_secret: tools.inputs.TWITTER_ACCESS_SECRET
  });

  const file = randomItemFromArray(imagesByDay[new Date().getDay()]);
  const image = fs.readFileSync(path.join(__dirname, '../assets', file));

  client.post('media/upload', { media: image })
    .then((media) => {
      tools.log.info(`Uploaded image ${file}`);

      client.post('statuses/update', { status: '', media_ids: media.media_id_string, lat: tools.inputs.COORD_LAT, long: tools.inputs.COORD_LONG })
        .then((tweet) => {
          tools.log.info(`Posted tweet with ID: ${tweet.id_str}. Current number of tweets: ${tweet.user.statuses_count + 1}`);
          tools.exit.success('Finished job.');
        })
        .catch((error) => {
          tools.log.fatal('There was an error on tweet!');
          tools.exit.failure(error);
        });
    })
    .catch((error) => {
      tools.log.fatal('There was an error on image upload!');
      tools.exit.failure(error);
    });
}, {
  event: 'schedule',
  secrets: ['TWITTER_CONSUMER_KEY', 'TWITTER_CONSUMER_SECRET', 'TWITTER_ACCESS_TOKEN', 'TWITTER_ACCESS_SECRET']
});
