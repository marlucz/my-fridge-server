const { gql } = require('apollo-server');

module.exports = gql`
    type Product {
        id: ID!
        name: String!
        username: String!
        boughtAt: String!
        expires: String!
    }

    type Query {
        getProducts: [Product]
    }
`;
