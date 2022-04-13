import { TwitterResolverContext } from '../resolvers';
import { MutationResolvers } from '../resolvers-types.generated';
import { tweetTransform } from '../transforms';

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
  };
