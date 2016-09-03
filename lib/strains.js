/**
 * checkForStrains - checks an array of Strains against regex
 *
 * @param  {Object} userStrains regex of userStrains
 * @param  {Array} eazeStrains array of strains to match against
 * @return {Array}             array of strains found
 */
function checkForStrains(desiredStrains, eazeStrains) {
  const userStrains = new RegExp(desiredStrains.join("|"), 'gi')
  const strainsFound = []
  // Go through each strain on Eaze and see if there's a match
  eazeStrains.forEach((eazeStrain) => {
    if (eazeStrain.match(userStrains)) {
      strainsFound.push(eazeStrain)
    }
  })

  return strainsFound
}

export default checkForStrains
