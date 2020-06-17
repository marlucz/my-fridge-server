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
        boughtAt: String!
        expires: String!
    }

    type Query {
        getProducts: [Product]
        getUsers: [User]
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
    }
`;
