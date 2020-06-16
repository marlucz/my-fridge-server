const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`;

const resolvers = {
    Query: {
        sayHi: () => 'Hello World!',
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
