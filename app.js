require("babel-core").transform("code");

// Dependencies
var Nightmare = require('nightmare');
var axios = require('axios');
var moment = require('moment');

// Instances
var nightmare = Nightmare({ show: true })

var Strains = new RegExp(['Blue Dream', 'Sage'].join("|"), 'gi')

var Clients = [
  {
    firstName: 'Patrick',
    phoneNumber: 4159365087,
    strains: ['Blue Dream', 'Sage'],
  },
  // {
  //   name: 'Steve',
  //   phoneNumber: 6508087017,
  //   strains: ['Blue Dream', 'Sage']
  // }
]


// Begin Scraping
nightmare
  .goto('https://www.eazeup.com/menu')
  .wait('button')
  .click('button + button')
  .wait('form')
  .type('form > input', '930 Pine Street, San Francisco, CA')
  .click('place-group > place-item')
  // .type('form > input', '\u000d') // hit enter button
  .wait('.product h2')
  .evaluate(function () {
    return [].slice.call(document.querySelectorAll('.product')).map(function(el) {
      return el.querySelector('h2').innerText
    })
  })
  .end()
  .then(function(eazeStrains) {
    console.log(eazeStrains);
    var messageQueue = []
    // Check to see if each subscriber's strains are available
    Clients.forEach(function(client) {
      // Regex for the client's strains
      var userStrains = new RegExp(client.strains.join("|"), 'gi')
      var strainsFound = []
      // Go through each strain on Eaze and see if there's a match
      eazeStrains.forEach(function(eazeStrain) {
        if (eazeStrain.match(userStrains)) {
          strainsFound.push(eazeStrain)
        }
      })
      // If the user's strains are available, add user to queue
      if (strainsFound.length) {
        messageQueue.push({
          firstName: client.firstName,
          phoneNumber: client.phoneNumber,
          strains: strainsFound
        })
      }
    })
    console.log('messageQueue', messageQueue)
    if (messageQueue.length) {
      var date = moment().format('MM/DD/YY')
      messageQueue.forEach(function(user) {
        var message = '\nHi '+ user.firstName +
        ', the following strains are available today (' +
        date +') on eazeup.com: \n'
        user.strains.forEach(function(strain) {
          message += '\n' + strain
        })
        axios.post('http://textbelt.com/text', {
          'number': user.phoneNumber,
          'message': message
        }).then(function(response) {
          console.log(response.data);
        }).catch(function(error) {
          console.log(error);
        });

      })
    }
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
