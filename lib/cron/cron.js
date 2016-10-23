import { CronJob }  from 'cron'
import Scraper from '../scraper'

const Cron = new CronJob({
  cronTime: '00 15 10 * * *',
  onTick: function() {
    /*
     * Runs every day (Monday through Sunday)
     * at 10:30 AM
     */
     console.log('Running Cron Job')
     Scraper()
  },
  start: false,
  timeZone: 'America/Los_Angeles'
})

export default Cron
