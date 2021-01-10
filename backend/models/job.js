const mongo = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongo.set('useNewUrlParser', true);
mongo.set('useFindAndModify', false);
mongo.set('useCreateIndex', true);
mongo.set('useUnifiedTopology', true);

const jobSchema = mongo.Schema({
  text: {type: String},
  order: {type: String},
  grow: {type: String}
});

jobSchema.plugin(uniqueValidator);

jobSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const jobs = mongo.model('jobs', jobSchema);

module.exports = jobs;