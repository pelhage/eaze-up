# Eaze Up: Strain Notifier for Patients

This project extends Eaze's functionality by providing patients with access to a strain watchlist, to be notified via SMS when their preferred strains are available for purchase

A Scraper scrapes the eaze homepage and collects the day's featured strains. If a patient's preferred strain is featured that day, they will receive an SMS notifying them which strains are available.

The patient can manage their strain watchlist from via SMS with the following SMS commands:

```
LIST - list all strains being watched
ADD <strain> - add a strain to watchlist
REMOVE <strain> - remove strain from watchlist
MORE - list commands available to user
```

## Table Of Contents
* [How It Works](#how-it-works]
* [Dependencies](#dependencies)
* [Install & Config](#install-&-config)
* [Running Eaze Up Notifier](#running-eaze-up-notifier)


## Dependencies
* MongoDB
* Redis (for Kue.js message queue)
* Ngrok
* Twilio Account (with SMS webhooks pointed to Ngrok URL)

## Install & Config
```bash
npm install
./ngrok http 3000
npm run start
```
Export your Twilio settings in `./config/twilio.js`

```javascript
// ./config/twilio.js
export const accountSid = 'YOUR_TWILIO_ACCOUNT_SID'
export const authToken = 'YOUR_TWILIO_AUTH_TOKEN'
export const sendingNumber = '+14155555555' // Your twilio sending number (with full area code)
```
MongoDB settings can be accessed and edited in `./config/database.js`

## Running Eaze Up Notifier
You'll need to add a webhook to your Ngrok url in Twilio's Phone Numbers dashboard.

The POST endpoint being used by Twilios webhook in this app is `http://<ngrokurl>/message`

## How It Works (Design Decisions)
A Scraper scrapes eaze for the day's featured strains

Each strain is added to a job queue where it is processed to be added to the strain DB if not already added.

Once the jobs are finished, Notifier queries the user table for all patients who are subscribed for notifications that also are watching strains that are featured (referred to as a cohort)

Each patient and their details are added to a SMS job queue, which is later processed to send an SMS to each one via Twilio's API.

The patient can also interact with a primitive chat bot, to add or remove strains from their watch list

