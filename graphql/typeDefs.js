const { gql } = require('apollo-server');

module.exports = gql`
    input RegisterInput {
        username: String!
        password: String!
        passwordConfirm: String!
        email: String!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        createdAt: String!
        token: String!
    }

    type Product {
        id: ID!
        name: String!
        username: String!
        createdAt: String!
        expires: String!
    }

    type Query {
        getProducts: [Product]
        getProduct(productId: ID!): Product!
        getUsers: [User]
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createProduct(name: String!, expires: String!): Product!
        deleteProduct(productId: ID!): String!
    }
`;
