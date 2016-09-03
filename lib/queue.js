// Helper functions
import { composeTextMessage, sendTextMessage } from './textMessage'
import checkForStrains from './strains'

/**
 * createQueue - Adds users to the SMS queue if their strains are ready
 *
 * @param  {Array} queue
 * @param  {Object} stoner
 * @return {Array} queue the queue
 */
function addToQueue(eazeStrains) {
  return function(queue, stoner) {
    const { firstName, phoneNumber, desiredStrains } = stoner
    const strainsFound = checkForStrains(desiredStrains, eazeStrains)
    // If the user's strains are available, add user to queue
    if (strainsFound) {
      const textMessage = composeTextMessage(firstName, strainsFound)
      queue.push({ firstName, phoneNumber, textMessage, strainsFound })
    }
    return queue
  }
}

export default addToQueue
