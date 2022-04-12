import { TwitterResolverContext } from './resolvers';
import { QueryResolvers } from '../resolvers-types.generated';
import { tweetTransform } from '../transforms';

export const twitterResolvers: QueryResolvers<TwitterResolverContext> = {
  currentUser: (_parent, _args, { db }) => {
    return db.getFirstUser();
  },
  suggestions: (_parent, _args, { db }) => {
    return db.getAllSuggestions();
  },
  tweets: (
    _parent,
    _args,
    { db, dbTweetCache, dbTweetToFavoriteCountMap, dbUserCache }
  ) => {
    db.getAllUsers().forEach((user) => {
      dbUserCache[user.id] = user;
    });
    db.getAllFavorites().forEach((fav) => {
      const count = dbTweetToFavoriteCountMap[fav.tweetId] || 0;
      dbTweetToFavoriteCountMap[fav.tweetId] = count + 1;
    });
    return db.getAllTweets().map((dbTweet) => {
      dbTweetCache[dbTweet.id] = dbTweet;
      return tweetTransform(dbTweet);
    });
  },
};
