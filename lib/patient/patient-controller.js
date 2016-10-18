// import Patient  from './patient'
//
// export default const = {
//   addStrain(req, res) {
//
//     Patient.findOne({
//       'phoneNumber': phoneNumber
//     }, function(err, existingPatient) {
//       if (err) { return next(err); }
//
//       if (existingPatient) {
//         existingPatient.update({})
//         return res.status(422).send({ error: 'Phone number is in use' });
//       }
//       // All is good, create new patient
//       var newPatient = new Patient();
//       newPatient.phoneNumber = email;
//       newPatient.save(function(err) {
//         if (err) { return next(err); }
//         res.json({ token: tokenForPatient(newPatient) });
//       });
//     });
//   }
// }
