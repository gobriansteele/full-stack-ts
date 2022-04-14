import { Favorite, Tweet } from './resolvers-types.generated';
import { DbTweet, DbFavorite } from './db';

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
