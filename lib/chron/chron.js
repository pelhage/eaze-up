var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 30 11 * * 1-5',
  onTick: function() {
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();
