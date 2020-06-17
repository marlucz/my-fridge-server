const { model, Schema } = require('mongoose');

// more detailed information about schema will be handled by graphql
const productSchema = new Schema({
    name: String,
    username: String,
    createdAt: String,
    expires: String,
    category: [
        {
            name: String,
            username: String,
            items: Number,
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

module.exports = model('Product', productSchema);
