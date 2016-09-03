import chai, { expect, assert } from 'chai'
chai.should()
import moment from 'moment'

import { composeTextMessage, sendTextMessage } from '../lib/textMessage'
import checkForStrains from '../lib/strains'
import addToQueue from '../lib/queue'

describe('Text Message', () => {

  describe('Message Creation', () => {
    const message = composeTextMessage('Patrick', ['Blue Dream', 'Cherry AK'])
    const dateTime = moment().format('MM/DD/YY')

    it('should be a string', () => {
      message.should.be.a('string')
    })

    it('should generate a complete message', () => {
      message.should.equal('\nHi Patrick, the following strains are available today (' +
      dateTime + ') via eazeup.com:\n\nBlue Dream\nCherry AK')
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

  it ('should return false if there are no matches', () => {
    let strains1 = ['Blue Dream', 'OG Dream']
    let strains2 = ['Black Dream', 'OG Black']
    checkForStrains([],[]).should.equal(false)
    checkForStrains(strains1, strains2).should.equal(false)
  })

  it('should identify exact matches', () => {
    foundStrains.should.have.length(1)
    foundStrains.should.eql(['OG Kush'])
  })
})

describe('SMS Queue', () => {
  let queue = []
  let eazeStrains = ['Blue Crush', 'Host It', 'Blue Dream']

  it('should add someone who has a matching strain', () => {
    let user = { firstName: 'Patrick', phoneNumber: 4159365087,
                  desiredStrains: ['Blue Dream', 'Sage'] }

    addToQueue(eazeStrains)(queue, user)
    queue.should.have.length(1)
    queue[0].should.have.all.keys(['firstName', 'textMessage', 'strainsFound', 'phoneNumber'])
    queue[0].strainsFound[0].should.equal('Blue Dream')
  })

  it('should not add someone who doesn\'t have a matching strain to the queue', () => {
    let user2 = { firstName: 'John', phoneNumber: 2813308004, desiredStrains: ['None'] }
    addToQueue(eazeStrains)(queue, user2)
    queue.should.have.length(1)
  })
})
