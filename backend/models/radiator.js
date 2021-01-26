const mongo = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongo.set('useNewUrlParser', true);
mongo.set('useFindAndModify', false);
mongo.set('useCreateIndex', true);
mongo.set('useUnifiedTopology', true);

const radiatorSchema = new mongo.Schema({
  owner: {type: mongo.Schema.Types.ObjectId},
  name: {type: String},
  groups: [{type: mongo.Schema.Types.ObjectId, ref: "groups"}]
});

radiatorSchema.plugin(uniqueValidator);

radiatorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const radiators = mongo.model('radiators', radiatorSchema);

module.exports = radiators;