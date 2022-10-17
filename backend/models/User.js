const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Create a user schema
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

//plugin which adds pre-save validation for unique fields within a Mongoose schema
userSchema.plugin(uniqueValidator);

//exports schema into model
module.exports = mongoose.model('User', userSchema);