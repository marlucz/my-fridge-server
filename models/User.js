const { model, Schema } = require('mongoose');

// more detailed information about schema will be handled by graphql
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
});

module.exports = model('User', userSchema);
