const mongoose = require('mongoose');

//Create a sauce schema
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: {type: [String]},
    userDisliked: {type: [String]},
});

//exports schema into model
module.exports = mongoose.model('Sauce', sauceSchema);