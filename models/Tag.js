const { model, Schema } = require('mongoose');

const tagSchema = new Schema(
    {
        name: String,
        username: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

// VIRTUAL POPULATE reviews - thanks to that you don't have to embed reviews to tour
tagSchema.virtual('products', {
    ref: 'Product',
    localField: '_id', // field in this model which connects this model with the referenced model (in this case TOUR ID)
    foreignField: 'tag', // field in reference model (review) that shows connection to this model (tour)
});

module.exports = model('Tag', tagSchema);
