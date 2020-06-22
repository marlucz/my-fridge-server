const { model, Schema } = require('mongoose');

const tagSchema = new Schema({
    name: String,
    username: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
});

module.exports = model('Tag', tagSchema);
