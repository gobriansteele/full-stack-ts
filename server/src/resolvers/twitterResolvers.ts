import Db from '../db';
import { TwitterResolverContext } from './resolvers';
import { QueryResolvers } from '../resolvers-types.generated';

export const twitterResolvers: QueryResolvers<TwitterResolverContext> = {
  currentUser: (_parent, _args, { db }) => {
    const firstUser = db.getFirstUser();
    if (!firstUser) {
      throw new Error(
        `A user was requested, but there are no users in the database`
      );
    }
    return firstUser;
  },
  suggestions: (_parent, _args, { db }) => {
    return db.getAllSuggestions();
  },
};
