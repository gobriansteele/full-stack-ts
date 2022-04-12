import { TwitterResolverContext } from '../resolvers';
import { TweetResolvers } from '../resolvers-types.generated';

export const tweetResolvers: TweetResolvers<TwitterResolverContext> = {
  author(tweet, _args, { dbUserCache, dbTweetCache }) {
    const cachedTweet = dbTweetCache[tweet.id];
    if (!cachedTweet)
      throw new Error(
        'Attempted to find Tweet.author, but the tweet was not found in dbTweetCache'
      );
    const cachedUser = dbUserCache[cachedTweet.userId];
    if (!cachedUser)
      throw new Error(
        "Attempted to find Tweet.author, but the tweet's author (a User) was not found in dbUserCache"
      );
    return cachedUser;
  },
  stats(tweet, _args, { dbTweetToFavoriteCountMap }) {
    return {
      commentCount: 99,
      retweetCount: 1,
      favoriteCount: dbTweetToFavoriteCountMap[tweet.id] || 0,
    };
  },
};
