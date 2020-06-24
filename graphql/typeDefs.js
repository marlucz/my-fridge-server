const { gql } = require('apollo-server');

module.exports = gql`
    input RegisterInput {
        username: String!
        password: String!
        passwordConfirm: String!
        email: String!
    }

    input ProductInput {
        name: String!
        quantity: Float!
        unit: String!
        expires: String!
        tag: String!
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
        quantity: Float!
        unit: String!
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
        createProduct(productInput: ProductInput): Product!
        deleteProduct(productId: ID!, quantity: Float!): String!
    }
`;
