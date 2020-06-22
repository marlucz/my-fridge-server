const { model, Schema } = require('mongoose');

// more detailed information about schema will be handled by graphql
const productSchema = new Schema(
    {
        name: String,
        username: String,
        createdAt: String,
        expires: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        tag: {
            type: Schema.Types.ObjectId,
            ref: 'Tag',
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

module.exports = model('Product', productSchema);
