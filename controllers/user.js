var User = require('../models/user');

module.exports = {
  addStrain: function(req, res) {

    User.findOne({
      'phoneNumber': phoneNumber
    }, function(err, existingUser) {
      if (err) { return next(err); }

      if (existingUser) {

        existingUser.update({})
        return res.status(422).send({ error: 'Email is in use' });
      }
      // All is good, create new user
      var newUser = new User();
      newUser.phoneNumber = email;
      newUser.libraries = {};
      newUser.save(function(err) {
        if (err) { return next(err); }
        res.json({ token: tokenForUser(newUser) });
      });
    });
  }

}
