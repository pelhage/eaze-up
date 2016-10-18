/**
 * checkForStrains - checks an array of Strains against regex
 *
 * @param  {Object} patientStrains regex of patientStrains
 * @param {Array} desiredStrains array of strains
 * @param  {Array} eazeStrains array of strains to match against
 * @return {Array}             array of strains found
 */
function checkForStrains(desiredStrains, eazeStrains) {
  const patientStrains = new RegExp(desiredStrains.join("|"), 'gi')
  const strainsFound = eazeStrains.filter((strain) => {
    return strain.match(patientStrains)
  })

  return strainsFound.length ? strainsFound : false
}

export default checkForStrains
