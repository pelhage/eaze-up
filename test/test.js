import chai, { expect, assert } from 'chai'
chai.should()
import moment from 'moment'

import createTextMessage from '../lib/textMessage'
import checkForStrains from '../lib/strains'

describe('Text Message', () => {

  describe('Message Creation', () => {
    const message = createTextMessage('Patrick', ['Blue Dream', 'Cherry AK'])
    const dateTime = moment().format('MM/DD/YY')

    it('should be a string', () => {
      message.should.be.a('string')
    })

    it('should generate a complete message', () => {
      message.should.equal('\nHi Patrick, the following strains are available today (' +
      dateTime + ') on eazeup.com:\n\nBlue Dream\nCherry AK')
    })
  })

})

describe('Strain Identifying', () => {
  const userStrains = ['Blue Dream', 'OG Kush', 'OG Mama']
  const retailerStrains = ['Blue Cat', 'OG Kush', 'Purple Haze']
  const foundStrains = checkForStrains(userStrains, retailerStrains)

  it('should return an array', () => {
    foundStrains.should.be.an('array')
  })

  it ('should return an empty array if param arrays are empty', () => {
    checkForStrains([],[]).should.be.an('array')
  })

  it('should identify exact matches', () => {
    foundStrains.should.have.length(1)
    foundStrains.should.eql(['OG Kush'])
  })
})
