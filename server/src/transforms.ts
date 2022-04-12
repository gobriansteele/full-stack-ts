import { Tweet } from './resolvers-types.generated';
import { DbTweet } from './db';

export const tweetTransform = (dbTweet: DbTweet): Omit<Tweet, 'author'> => {
  return {
    id: dbTweet.id,
    body: dbTweet.message,
    createdAt: dbTweet.createdAt,
    updatedAt: dbTweet.updatedAt,
  };
};
