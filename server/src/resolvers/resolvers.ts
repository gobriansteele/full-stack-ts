import { twitterResolvers } from './twitterResolvers';

export const resolvers = {
  Query: {
    ...twitterResolvers,
  },
};
