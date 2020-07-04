const { AuthenticationError, UserInputError } = require('apollo-server');

const Product = require('../../models/Product');
const Tag = require('../../models/Tag');
const auth = require('../../utils/auth');

module.exports = {
    Query: {
        // eslint-disable-next-line no-empty-pattern
        async getProducts(_, {}, context) {
            const { username } = auth(context);

            try {
                const products = await Product.find({ username }).sort({
                    createdAt: -1,
                });
                return products;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getProduct(_, { productId }) {
            try {
                const product = await Product.findById(productId);
                if (product) {
                    return product;
                }
                throw new Error('Product not found');
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        async createProduct(
            _,
            { productInput: { name, quantity, unit, expires, tag } },
            context,
        ) {
            const user = auth(context);

            const existingTag = await Tag.findOne({ name: tag });

            if (existingTag) {
                const tagId = existingTag._id;

                const newProduct = new Product({
                    name,
                    quantity,
                    unit,
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                    expires,
                    tag: tagId,
                });

                const product = await newProduct.save();
                return product;
            }
            throw new UserInputError(`This tag does not exits`);
        },

        async deleteProduct(_, { productId, quantity }, context) {
            const user = auth(context);

            try {
                const product = await Product.findById(productId);
                if (user.username === product.username) {
                    if (quantity >= product.quantity) {
                        await product.delete();
                        return 'Product deleted successfully';
                    }
                    const newQuantity = product.quantity - quantity;
                    await product.update({ quantity: newQuantity });

                    return 'Product updated successfully';
                }
                throw new AuthenticationError('Action not allowed');
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};
