import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { default as schemaDirectives } from "./directives";

// pulling env variables
const { NODE_ENV, PORT } = process.env;

const app = express();

//cors options for production
const corsOptions = {
  origin: "http://whatever.url",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//applying cors
NODE_ENV === "Production" ? app.use(cors(corsOptions)) : app.use(cors());

app.disable("x-powered-by"); // being responsible

// initializing apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives, // if you don't use directives remove this line
  playground: true, // enables graphql playground
  introspection: true
});

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: PORT || 4000 }, () =>
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);
