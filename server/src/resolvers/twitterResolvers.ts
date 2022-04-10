import Db from '../db';
import { TwitterResolverContext } from './resolvers';
import { QueryResolvers } from '../resolvers-types.generated';

export const twitterResolvers: QueryResolvers<TwitterResolverContext> = {
  currentUser: (_parent, _args, context) => {
    return context.db.getFirstUser();
  },
  suggestions: (_parent, _args, context) => {
    return context.db.getAllSuggestions();
  },
};
