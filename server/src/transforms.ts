import { Favorite, Tweet, Trend } from './resolvers-types.generated';
import { DbTweet, DbFavorite, DbTrend } from './db';

export const tweetTransform = (dbTweet: DbTweet): Omit<Tweet, 'author'> => {
  return {
    id: dbTweet.id,
    body: dbTweet.message,
    createdAt: dbTweet.createdAt,
    updatedAt: dbTweet.updatedAt,
  };
};

export const favoriteTransform = (
  favorite: DbFavorite
): Omit<Favorite, 'user' | 'tweet'> => {
  return {
    createdAt: favorite.createdAt,
    id: favorite.id,
    updatedAt: favorite.updatedAt,
  };
};

export const trendTransform = (trend: DbTrend): Trend => {
  const { tweetCount } = trend;
  if (trend.kind === 'topic') {
    const { quote, topic } = trend;
    return {
      tweetCount,
      quote,
      topic,
    };
  }
  const { hashtag } = trend;
  return {
    hashtag,
    tweetCount,
  };
};
