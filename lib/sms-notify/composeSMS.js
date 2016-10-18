/**
 * composeSMS - generates the text message string sent
 * to patients
 *
 * @param  {String} firstName       recipients first name
 * @param  {Array} availableStrains requested strains available on eaze
 * @return {String} message         message for recipient
 */
function composeSMS(firstName, availableStrains) {
  const dateTime = moment().format('MM/DD/YY')

  let message = '\nHi ' + firstName +
  ', the following strains are available today (' +
  dateTime + ') via eazeup.com:\n'
  availableStrains.forEach((strain) => {
    message += '\n' + strain
  })
  return message
}

export default composeSMS
