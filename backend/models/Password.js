const passwordValidator = require('password-validator');

// Create a password schema
const passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
.is().min(8) // Minimum length 8
.is().max(20) // Maximum length 20
.has().uppercase(1) // Must have at least 1 uppercase letter
.has().lowercase() // Must have lowercase letters
.has().digits(1) // Must have at least 1 digits
.has().not().spaces() // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); //Values blacklisted

module.exports = passwordSchema;