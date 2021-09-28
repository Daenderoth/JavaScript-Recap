const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require ('fs');
const mongoose = require('mongoose');
const { DateTimeResolver, DateTimeTypeDefinition } = require('graphql-scalars')

// Server config
const PORT = 4000;
const path = '/graphql';
const app = express();

// Loading the GraphQL schema
const typeDefs = [DateTimeTypeDefinition, gql(fs.readFileSync('./schema/employeeSchema.graphql', {encoding: 'utf8'}))];

// And the resolver
const resolvers = require('./resolvers/employeeResolver');

const server = new ApolloServer({typeDefs, resolvers});

const startServer = async () => {
    await server.start();

    server.applyMiddleware({app, path});
};

startServer();

// Establishing MongoDB connection via Mongoose and starting the server
const dbPath = 'mongodb+srv://admin:admin@cluster0.vvtr9.mongodb.net/AQUASoftInternship?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);

mongo.then(() => {

    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.info(`Server started on port ${PORT}`));

}, error => {
    console.log(error, 'error');
});