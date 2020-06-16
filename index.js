const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Product = require('./models/Product');

dotenv.config();

const typeDefs = gql`
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

const resolvers = {
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

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

mongoose
    .connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: process.env.PORT });
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    });
