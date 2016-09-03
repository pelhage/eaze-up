import moment from 'moment'

/**
 * createTextMessage - generates the text message string sent
 * to users
 *
 * @param  {String} firstName       recipients first name
 * @param  {Array} availableStrains requested strains available on eaze
 * @return {String} message         message for recipient
 */
function createTextMessage(firstName, availableStrains) {
  const dateTime = moment().format('MM/DD/YY')

  let message = '\nHi ' + firstName +
  ', the following strains are available today (' +
  dateTime + ') on eazeup.com:\n'
  availableStrains.forEach((strain) => {
    message += '\n' + strain
  })
  return message
}

export default createTextMessage
