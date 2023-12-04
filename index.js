const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

// ! local imports
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const MONGODB_URL = `mongodb+srv://snoopyhassan007:XiqbaIn9nQTFOrdC@cluster0.unrltmf.mongodb.net/?retryWrites=true&w=majority`;

// ! ApolloServer get two things
// ! 1) typeDefs ==> graphql type definitions
// ! 2) resolvers ==> resolve queries and mutations

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// ! interaction with MONGODB
mongoose
  .connect(MONGODB_URL
  //   , {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // }
  )
  .then(() => {
    console.log(`🚀 MONGODB Connection Successful`);
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`🚀 Server Running At ${res.url}`);
  });
