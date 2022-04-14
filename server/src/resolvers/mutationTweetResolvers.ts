import { TwitterResolverContext } from '../resolvers';
import { MutationResolvers } from '../resolvers-types.generated';
import { tweetTransform, favoriteTransform } from '../transforms';

export const mutationTweetResolvers: MutationResolvers<TwitterResolverContext> =
  {
    async createTweet(_parent, args, { db, dbTweetCache }) {
      const { body, userId } = args;
      const dbTweet = await db.createTweet({
        userId,
        message: body,
      });
      const dbTweetMap = (dbTweetCache ||= {});
      dbTweetMap[dbTweet.id] = dbTweet;

      return tweetTransform(dbTweet);
    },
    async addFavorite(_parent, { favorite }, { db }) {
      const { userId, tweetId } = favorite;
      const response = await db.createFavorite({ userId, tweetId });
      return {
        ...favoriteTransform(response),
        tweet: tweetTransform(db.getTweetById(tweetId)),
        user: db.getUserById(userId),
      };
    },
    async removeFavorite(_parent, { favorite }, { db }) {
      const { userId, tweetId } = favorite;
      const response = await db.deleteFavorite({ userId, tweetId });
      return {
        ...favoriteTransform(response),
        tweet: tweetTransform(db.getTweetById(tweetId)),
        user: db.getUserById(userId),
      };
    },
  };
