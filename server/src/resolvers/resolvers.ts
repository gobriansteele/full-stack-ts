import { twitterResolvers } from './twitterResolvers';
import { Resolvers } from '../resolvers-types.generated';
import Db from '../db';

export interface TwitterResolverContext {
  db: Db;
}

export const resolvers: Resolvers<TwitterResolverContext> = {
  Query: {
    ...twitterResolvers,
  },
};
