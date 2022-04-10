import Db from '../db';

export const twitterResolvers = {
  currentUser: (_parent: undefined, _args: undefined, context: { db: Db }) => {
    // return context.db.getFirstUser();
    return null;
  },
  suggestions: () => [],
};
