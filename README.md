# twitter-today-is

A Twitter robot to remind everyone what day it is today.

## Using Your Own Instance

To use your own instance of this bot, you need to fork this repo and add the following secrets (under settings > secrets).

```bash
TWITTER_CONSUMER_KEY="YOUR APP CONSUMER KEY"
TWITTER_CONSUMER_SECRET="YOUR APP CONSUMER SECRET"
TWITTER_ACCESS_TOKEN="YOUR USER ACCESS KEY"
TWITTER_ACCESS_SECRET="YOUR USER ACCESS SECRET"
```

## Usage

The bot will automatically tweet **everyday at 08:00 AM UTC-5** a randomly chosen image from inside the `assets` folder corresponding to that day. Images begin with the number of the day of the week (starting with `0` for `Sunday` and so on until `6` for `Saturday`).

Example:

```text
4-1.jpg -> First image for Thursday.
```

If you wish to change at which time the bot posts the image, you can edit the `.github/workflows/tweet.yml` file under:

```yml
on:
  schedule:
    - cron: 'CRON EXPRESSION'
```

> Keep in mind that the timezone set on GitHub Actions is UTC.

## Author

This bot was made by [moonstar-x](https://github.com/moonstar-x).
