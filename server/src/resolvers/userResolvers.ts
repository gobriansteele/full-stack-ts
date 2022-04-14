import { TwitterResolverContext } from './resolvers';
import { UserResolvers } from '../resolvers-types.generated';
import { favoriteTransform, tweetTransform } from '../transforms';

export const userResolvers: UserResolvers<TwitterResolverContext> = {
  stats: (user, _args, { db }) => {
    return {
      followingCount: 347,
      followerCount: 25432,
      tweetCount: db.getUserTweets(user.id).length,
    };
  },
  favorites: (user, __args, { db }) => {
    const userFavorites = db.getUserFavorites(user.id);
    return userFavorites.map((fav) => {
      return {
        ...favoriteTransform(fav),
        tweet: tweetTransform(db.getTweetById(fav.tweetId)),
        user,
      };
    });
  },
};
