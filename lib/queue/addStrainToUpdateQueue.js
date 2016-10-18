import Queue from './Queue'

function addToStrainQueue(strain, cohortId) {
  Queue
    .create('update-strains', {
      title: strain,
      strainName: strain,
      cohort: cohortId,
    })
    .ttl(10000)
    .save()
}

export default addToStrainQueue
