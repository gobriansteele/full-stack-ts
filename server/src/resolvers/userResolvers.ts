import { TwitterResolverContext } from './resolvers';
import { UserResolvers } from '../resolvers-types.generated';

export const userResolvers: UserResolvers<TwitterResolverContext> = {
  stats: (user, _args, { db }) => {
    return {
      followingCount: 347,
      followerCount: 25432,
      tweetCount: db.getUserTweets(user.id).length,
    };
  },
};
