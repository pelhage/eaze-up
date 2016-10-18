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

