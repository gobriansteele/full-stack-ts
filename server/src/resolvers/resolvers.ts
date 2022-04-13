import { twitterResolvers } from './twitterResolvers';
import { Resolvers } from '../resolvers-types.generated';
import Db, { DbTweet, DbUser } from '../db';
import { userResolvers } from './userResolvers';
import { tweetResolvers } from './tweetResolvers';
import { mutationTweetResolvers } from './mutationTweetResolvers';

export interface TwitterResolverContext {
  db: Db;
  dbTweetCache: Record<string, DbTweet>;
  dbUserCache: Record<string, DbUser>;
  dbTweetToFavoriteCountMap: Record<string, number>;
}

export const resolvers: Resolvers<TwitterResolverContext> = {
  Query: {
    ...twitterResolvers,
  },
  User: {
    ...userResolvers,
  },
  Tweet: {
    ...tweetResolvers,
  },
  Mutation: {
    ...mutationTweetResolvers,
  },
};
