import kue from 'kue'
const Queue = kue.createQueue()

import updateStrains from '../strain-catalogue/updateStrains'
import composeAndSendSMS from '../sms-notify/composeAndSendSMS'
// After scrape, we update the DB of strains
// and create the scrape cohot
Queue.process('update-strains', (job, done) => {
  const { strainName, cohort } = job.data
  updateStrains(strainName, cohort, done)
})
// Send an SMS to the patient if their strain
// is available on eaze
Queue.process('send-sms', (job, done) => {
  composeAndSendSMS(job.data, done)
})

kue.app.listen(1337)

export default Queue
