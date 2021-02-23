const mongo = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const jenkinsSchema = mongo.Schema({
  name: {type: String, unique: true},
  url: {type: String, unique: true},
  token: {type: String}
});

jenkinsSchema.plugin(uniqueValidator);

jenkinsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const jenkins = mongo.model('jenkins', jenkinsSchema);
module.exports = jenkins;