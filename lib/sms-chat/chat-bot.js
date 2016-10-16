/**
 *
 */
export default function composeResponse(userMessage, { desiredStrains }, twiml) {
  var userCommand = userMessage.slice(0, 1).join(" ").toUpperCase()
  var userStrain = userMessage.slice(1).join(" ")
  // List all of the user's strains
  switch (userCommand) {
    case 'LIST':
      if (desiredStrains.length) {
        twiml.message('The following strains are being watched: \n'
          + desiredStrains.map(strain => {
            return '- ' + strain
          })
          .join('\n')
        )
      } else {
        twiml.message('You don\'t have any strains being watched.\n\nTo add a strain, reply with "ADD <strain>". For more info, reply with MORE')
      }
      break
    // User adds a strain to their watch list
    case 'ADD':
      if (isValidStrain(userStrain) && desiredStrains.indexOf(userStrain) === -1) {
        desiredStrains.push(userStrain)
        twiml.message('Adding [' + userStrain + '] to your watch list')
      } else {
        twiml.message('Invalid request. Reply with MORE for more commands')
      }
      break
    // User removes a strain from their watch list
    case 'REMOVE':
      if (isValidStrain(userStrain) && desiredStrains.indexOf(userStrain) > -1) {
        desiredStrains.splice(desiredStrains.indexOf(userStrain), 1)
        twiml.message('Removing [' + userStrain + '] to your watch list')
      } else {
        twiml.message('Invalid request. Reply with MORE for more commands')
      }
      break
    // User asks for help
    case 'MORE':
      twiml.message('Reply with: \n' +
        'LIST to list all strains being watched\n' +
        'ADD <strain> to add a strain to your watch list\n' +
        'REMOVE <strain>. For more information about')
      break
    default:
      twiml.message('Sorry, I couldn\'t understand that. Reply with MORE to get an overview of what I understand.')
  }
}
