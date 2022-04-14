import {
  faComment,
  faHeart as faHeartHollow,
} from '@fortawesome/free-regular-svg-icons';
import {
  faEllipsisH,
  faRetweet,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceToNow } from 'date-fns';
import * as React from 'react';
import { gql } from '@apollo/client';

import TweetMessage from './TweetMessage';
import { humanFriendlyNumber } from './utils/number';
import { GET_TIMELINE_TWEETS } from './Timeline';
import { GET_CURRENT_USER } from './App';
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from './generated/graphql';

export const CREATE_FAVORITE = gql`
  mutation AddFavorite($favorite: FavoriteInput!) {
    addFavorite(favorite: $favorite) {
      id
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($favorite: FavoriteInput!) {
    removeFavorite(favorite: $favorite) {
      id
    }
  }
`;

export interface TweetProps {
  currentUserId: string;
  tweet: {
    id: string;
    isFavorited: boolean;
    message: string;
    createdAt: Date;
    author: {
      name: string;
      handle: string;
      avatarUrl: string;
    };
    favoriteCount: number;
    retweetCount: number;
    commentCount: number;
  };
}

const Tweet: React.FC<TweetProps> = ({ tweet, currentUserId }) => {
  const {
    id,
    message,
    createdAt,
    favoriteCount,
    retweetCount,
    commentCount,
    isFavorited,
    author: { name, handle, avatarUrl },
  } = tweet;

  const [addFavorite, { error: addFavoriteError }] = useAddFavoriteMutation({
    variables: {
      favorite: {
        userId: currentUserId,
        tweetId: id,
      },
    },
    refetchQueries: [GET_TIMELINE_TWEETS, GET_CURRENT_USER],
  });

  const [removeFavorite, { error: removeFavoriteError }] =
    useRemoveFavoriteMutation({
      variables: {
        favorite: {
          userId: currentUserId,
          tweetId: id,
        },
      },
      refetchQueries: [GET_TIMELINE_TWEETS, GET_CURRENT_USER],
    });

  if (addFavoriteError) {
    return <p>Error adding favorite. Error: {addFavoriteError}</p>;
  }
  if (removeFavoriteError) {
    return <p>Error removing favorite. Error: {removeFavoriteError}</p>;
  }

  const handleFavoriteClick: React.MouseEventHandler<HTMLButtonElement> = (
    _evt
  ) => {
    if (isFavorited) {
      removeFavorite().catch((err: unknown) => {
        console.error(err);
      });
    } else {
      addFavorite().catch((err: unknown) => {
        console.error(err);
      });
    }
  };

  return (
    <div className="tweet">
      <div className="left">
        <img src={avatarUrl} />
      </div>
      <div className="right">
        <div className="info">
          <p>
            {name}
            <span>@{handle}</span>
          </p>
          <time>{formatDistanceToNow(createdAt)} ago</time>
        </div>
        <TweetMessage message={message} />
        <div className="btns">
          <button className="blue">
            <FontAwesomeIcon icon={faComment} />{' '}
            {humanFriendlyNumber(commentCount)}
          </button>
          <button className="green">
            <FontAwesomeIcon icon={faRetweet} />{' '}
            {humanFriendlyNumber(retweetCount)}
          </button>
          <button className="red" onClick={handleFavoriteClick}>
            <FontAwesomeIcon
              icon={isFavorited ? faHeartSolid : faHeartHollow}
            />{' '}
            {humanFriendlyNumber(favoriteCount)}
          </button>
          <button className="blue">
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Tweet;
