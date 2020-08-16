const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors'); // const cors
const path = require('path');

const app = express();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
});

const dir = path.join(process.cwd(), 'images');
app.use('/images', express.static(dir)); // serve all files in the /images directory
app.use(cors('*')); // All Cross-origin resource sharing from any network
server.applyMiddleware({ app }); // apply express as a graphql middleware
// server.listen(4000, () => {

mongoose
    .connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('MongoDB Connected');
        return app.listen({ port: process.env.PORT });
    })
    .then(() => {
        console.log(
            `Server running at http://localhost:${process.env.PORT}${server.graphqlPath}`,
        );
    })
    .catch(err => {
        console.error(err);
    });
