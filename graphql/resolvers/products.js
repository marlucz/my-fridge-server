const { AuthenticationError } = require('apollo-server');

const Product = require('../../models/Product');
const auth = require('../../utils/auth');

module.exports = {
    Query: {
        async getProducts() {
            try {
                const products = await Product.find().sort({ createdAt: -1 });
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
        async createProduct(_, { name, expires }, context) {
            const user = auth(context);

            const newProduct = new Product({
                name,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
                expires,
            });

            const product = await newProduct.save();
            return product;
        },

        async deleteProduct(_, { productId }, context) {
            const user = auth(context);

            try {
                const product = await Product.findById(productId);
                if (user.username === product.username) {
                    await product.delete();
                    return 'Product deleted successfully';
                }
                throw new AuthenticationError('Action not allowed');
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};
