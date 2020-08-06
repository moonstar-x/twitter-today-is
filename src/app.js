require('dotenv').config();
const Twitter = require('twitter');
const logger = require('@greencoast/logger');
const fs = require('fs');
const path = require('path');
const { CronJob } = require('cron');
const { CRON_EVERYDAY_AT_TEN, MOMENT_DATE_FORMAT } = require('./constants');
const { createImagesObject, randomItemFromArray } = require('./utils');

const imagesByDay = createImagesObject();

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

const dailyJob = new CronJob(CRON_EVERYDAY_AT_TEN, function() {
  logger.info('Executing CronJob...');

  const file = randomItemFromArray(imagesByDay[new Date().getDay()]);
  const image = fs.readFileSync(path.join(__dirname, '../assets', file));

  client.post('media/upload', { media: image })
    .then((media) => {
      logger.info(`Uploaded image ${file}`);

      client.post('statuses/update', { status: '', media_ids: media.media_id_string, lat: process.env.COORD_LAT, long: process.env.COORD_LONG })
        .then((tweet) => {
          logger.info(`Posted tweet with ID: ${tweet.id_str}. Current number of tweets: ${tweet.user.statuses_count + 1}`);
          this.onComplete();
        })
        .catch((error) => {
          logger.error(error);
          this.onComplete();
        });
    })
    .catch((error) => {
      logger.error(error);
      this.onComplete();
    });
}, function() {
  logger.info('CronJob completed.');
  logger.info(`Next execution is scheduled for: ${this.nextDate().format(MOMENT_DATE_FORMAT)}`);
}, true, process.env.TIMEZONE);

dailyJob.start();
logger.info('CronJob initialized.');
logger.info(`Next execution is scheduled for: ${dailyJob.nextDate().format(MOMENT_DATE_FORMAT)}`);
