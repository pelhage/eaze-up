/**
 *
 */
export default function composeResponse(patientMessage, { desiredStrains }, twiml) {
  var patientCommand = patientMessage.slice(0, 1).join(" ").toUpperCase()
  var patientStrain = patientMessage.slice(1).join(" ")
  // List all of the patient's strains
  switch (patientCommand) {
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
    // Patient adds a strain to their watch list
    case 'ADD':
      if (isValidStrain(patientStrain) && desiredStrains.indexOf(patientStrain) === -1) {
        desiredStrains.push(patientStrain)
        twiml.message('Adding [' + patientStrain + '] to your watch list')
      } else {
        twiml.message('Invalid request. Reply with MORE for more commands')
      }
      break
    // Patient removes a strain from their watch list
    case 'REMOVE':
      if (isValidStrain(patientStrain) && desiredStrains.indexOf(patientStrain) > -1) {
        desiredStrains.splice(desiredStrains.indexOf(patientStrain), 1)
        twiml.message('Removing [' + patientStrain + '] to your watch list')
      } else {
        twiml.message('Invalid request. Reply with MORE for more commands')
      }
      break
    // Patient asks for help
    case 'MORE':
      twiml.message('Reply with: \n\n' +
        'LIST - list all strains being watched\n\n' +
        'ADD <strain> - add a strain to your watch list\n\n' +
        'REMOVE <strain> - remove strain from your watch list')
      break
    default:
      twiml.message('Sorry, I couldn\'t understand that. Reply with MORE to get an overview of what I understand.')
  }
}
