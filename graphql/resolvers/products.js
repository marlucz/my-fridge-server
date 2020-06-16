const Product = require('../../models/Product');

module.exports = {
    Query: {
        async getProducts() {
            try {
                const products = await Product.find();
                return products;
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};
