/**
 * checkForStrains - checks an array of Strains against regex
 *
 * @param  {Object} userStrains regex of userStrains
 * @param {Array} desiredStrains array of strains
 * @param  {Array} eazeStrains array of strains to match against
 * @return {Array}             array of strains found
 */
function checkForStrains(desiredStrains, eazeStrains) {
  const userStrains = new RegExp(desiredStrains.join("|"), 'gi')
  const strainsFound = eazeStrains.filter((strain) => {
    return strain.match(userStrains)
  })

  return strainsFound.length ? strainsFound : false
}

export default checkForStrains
