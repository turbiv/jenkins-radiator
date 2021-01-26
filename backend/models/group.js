const mongo = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongo.set('useNewUrlParser', true);
mongo.set('useFindAndModify', false);
mongo.set('useCreateIndex', true);
mongo.set('useUnifiedTopology', true);

const groupSchema = new mongo.Schema({
  title: {type: String},
  jobs: [{type: mongo.Schema.Types.Mixed, ref: "jobs"}],
});

groupSchema.plugin(uniqueValidator);
groupSchema.set('validateBeforeSave', false) // TODO: validate 2d jobs array

groupSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const groups = mongo.model('groups', groupSchema);

module.exports = groups;