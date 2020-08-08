# twitter-today-is
A Twitter robot to remind everyone what day it is today.

## Requirements

To install this bot you will need [Node.js](https://nodejs.org/en/), [git-lfs](https://github.com/git-lfs/git-lfs/wiki/Installation) to properly clone the repo with all the images in the `assets` folder, and a [Twitter Developer Account](https://developer.twitter.com/en).

## Installation

Run the following command to install this bot:

```text
git clone https://github.com/moonstar-x/twitter-today-is.git
```

And finally, to install the dependencies, run inside the `twitter-today-is` folder:

```text
npm install
```

You will need to create an `.env` file in this folder with the following information:

```bash
TWITTER_CONSUMER_KEY="YOUR APP CONSUMER KEY"
TWITTER_CONSUMER_SECRET="YOUR APP CONSUMER SECRET"
TWITTER_ACCESS_TOKEN="YOUR USER ACCESS KEY"
TWITTER_ACCESS_SECRET="YOUR USER ACCESS SECRET"
TIMEZONE="YOUR TIMEZONE"
COORD_LAT="TWEET COORDINATES LATITUDE AS NUMBER"
COORD_LONG="TWEET COORDINATES LONGITUDE AS NUMBER"
NODE_ENV=production
```

> The `NODE_ENV` variable should be set to `production` to make the bot tweet everyday at 10:00 AM, otherwise, the bot will tweet every minute.

## Usage

Start the bot with:

```text
npm start
```

The bot will automatically tweet **everyday at 10:00 AM** a randomly chosen image from inside the `assets` folder corresponding to that day. Images begin with the number of the day of the week (starting with `0` for `Sunday` and so on until `6` for `Saturday`).

Example:

```text
4-1.jpg -> First image for Thursday.
```

## Author

This bot was made by [moonstar-x](https://github.com/moonstar-x).
