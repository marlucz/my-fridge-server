const productsResolvers = require('./products');
const usersResolvers = require('./users');
const tagsResolvers = require('./tags');

module.exports = {
    Query: {
        ...productsResolvers.Query,
        ...usersResolvers.Query,
    },
    Mutation: {
        ...productsResolvers.Mutation,
        ...usersResolvers.Mutation,
        ...tagsResolvers.Mutation,
    },
};
