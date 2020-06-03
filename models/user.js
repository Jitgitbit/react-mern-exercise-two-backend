const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;


const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 6},
  image: {type: String, required: true},
  places: {type: String, required: true},
});

userSchema.plugin(uniqueValidator);                   //---> this way a user can only be created in case the email has not been used yet !

module.exports = mongoose.model('User', userSchema);