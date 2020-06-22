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

    type Tag {
        id: ID!
        name: String!
        username: String!
        products: [Product]!
    }

    type Product {
        id: ID!
        name: String!
        username: String!
        createdAt: String!
        expires: String!
        tag: String!
    }

    type Query {
        getUsers: [User]
        getProducts: [Product]
        getProduct(productId: ID!): Product!
        getTags: [Tag]
        getProductsByTag(tagId: ID!): [Product]
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createTag(name: String!): Tag!
        deleteTag(tagId: ID!): String!
        createProduct(name: String!, expires: String!, tag: String!): Product!
        deleteProduct(productId: ID!, tag: String!): String!
    }
`;
