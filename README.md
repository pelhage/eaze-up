# Eaze Up: Strain Notifier for Patients

## Dependencies
* MongoDB
* Ngrok
* Twilio Account (with SMS webhooks pointed to Ngrok URL)

## Install & Config
```bash
npm install
```
Export your Twilio settings in `./config/twilio.js`
## Running Eaze Up
You'll need to add a webhook to your Ngrok url in Twilio's Phone Numbers dashboard.
The POST endpoint being used in this app is `/message`

