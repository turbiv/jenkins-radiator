const mongo = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongo.Schema({
  username: {type: String, unique: true,},
  name: String,
  passwordHash: String,
  permissions: {
    write_jobs: {type: Number, default: 1}, // 0 = None, 1 = Own, 2 = All
    write_groups: {type: Number, default: 1},
    write_radiators: {type: Number, default: 1},

    read_jobs: {type: Number, default: 1}, // 0 = None, 1 = Own, 2 = All
    read_groups: {type: Number, default: 1},
    read_radiators: {type: Number, default: 1},

    modify_users: {type: Number, default: 0}, // 0 = None, 1 = Delete, 2 = Change details
    administrator: {type: Number, default: 0}, // 0 = None, 1 = Administrator (All rights), 2 = System account (Cant be deleted or changed)
  }
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
});

const User = mongo.model('user', userSchema);
module.exports = User;