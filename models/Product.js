const { model, Schema } = require('mongoose');

// more detailed information about schema will be handled by graphql
const productSchema = new Schema(
    {
        name: String,
        quantity: Number,
        unit: String,
        username: String,
        createdAt: String,
        expires: String,
        photo: {
            filename: String,
            mimetype: String,
            path: String,
        },
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
