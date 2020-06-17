const productsResolvers = require('./products');
const usersResolvers = require('./users');

module.exports = {
    Query: {
        ...productsResolvers.Query,
        ...usersResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
    },
};
