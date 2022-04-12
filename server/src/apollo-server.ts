import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import * as express from 'express';
import { Server } from 'http';

import Db from './db';
import { resolvers } from './resolvers/index';
import { GRAPHQL_SCHEMA_PATH } from './constants';

const SCHEMA = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
  loaders: [new GraphQLFileLoader()],
});

export async function createApolloServer(
  db: Db,
  httpServer: Server,
  app: express.Application
): Promise<ApolloServer<ExpressContext>> {
  const server = new ApolloServer({
    schema: addResolversToSchema({
      schema: SCHEMA,
      resolvers,
    }),
    context: () => ({
      db,
      dbTweetCache: {},
      dbTweetToFavoriteCountMap: {},
      dbUserCache: {},
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app });
  return server;
}
