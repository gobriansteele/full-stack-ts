import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Favorite = {
  __typename?: 'Favorite';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  tweet: Tweet;
  updatedAt: Scalars['String'];
  user: User;
};

export type FavoriteInput = {
  tweetId: Scalars['String'];
  userId: Scalars['String'];
};

export type HashtagTrend = {
  __typename?: 'HashtagTrend';
  hashtag: Scalars['String'];
  tweetCount: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavorite: Favorite;
  createTweet: Tweet;
  removeFavorite: Favorite;
};


export type MutationAddFavoriteArgs = {
  favorite: FavoriteInput;
};


export type MutationCreateTweetArgs = {
  body: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationRemoveFavoriteArgs = {
  favorite: FavoriteInput;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  suggestions: Array<Suggestion>;
  trends: Array<Trend>;
  tweets: Array<Tweet>;
};

export type Suggestion = {
  __typename?: 'Suggestion';
  avatarUrl: Scalars['String'];
  handle: Scalars['String'];
  name: Scalars['String'];
  reason: Scalars['String'];
};

export type TopicTrend = {
  __typename?: 'TopicTrend';
  quote?: Maybe<TopicTrendQuote>;
  topic: Scalars['String'];
  tweetCount: Scalars['Int'];
};

export type TopicTrendQuote = {
  __typename?: 'TopicTrendQuote';
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  title: Scalars['String'];
};

export type Trend = HashtagTrend | TopicTrend;

export type Tweet = {
  __typename?: 'Tweet';
  author?: Maybe<User>;
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  stats?: Maybe<TweetStats>;
  updatedAt: Scalars['String'];
};

export type TweetStats = {
  __typename?: 'TweetStats';
  commentCount: Scalars['Int'];
  favoriteCount: Scalars['Int'];
  retweetCount: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String'];
  coverUrl: Scalars['String'];
  createdAt: Scalars['String'];
  favorites?: Maybe<Array<Favorite>>;
  handle: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  stats?: Maybe<UserStats>;
  updatedAt: Scalars['String'];
};

export type UserStats = {
  __typename?: 'UserStats';
  followerCount: Scalars['Int'];
  followingCount: Scalars['Int'];
  tweetCount: Scalars['Int'];
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, name: string, handle: string, avatarUrl: string, createdAt: string, coverUrl: string, stats?: { __typename?: 'UserStats', tweetCount: number, followingCount: number, followerCount: number } | null, favorites?: Array<{ __typename?: 'Favorite', tweet: { __typename?: 'Tweet', id: string } }> | null }, suggestions: Array<{ __typename?: 'Suggestion', name: string, handle: string, avatarUrl: string, reason: string }>, trends: Array<{ __typename?: 'HashtagTrend', tweetCount: number, hashtag: string } | { __typename?: 'TopicTrend', tweetCount: number, topic: string, quote?: { __typename?: 'TopicTrendQuote', title: string, imageUrl: string, description: string } | null }> };

export type CreateNewTweetMutationVariables = Exact<{
  userId: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreateNewTweetMutation = { __typename?: 'Mutation', createTweet: { __typename?: 'Tweet', id: string } };

export type GetTimelineTweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTimelineTweetsQuery = { __typename?: 'Query', tweets: Array<{ __typename?: 'Tweet', id: string, updatedAt: string, createdAt: string, body: string, stats?: { __typename?: 'TweetStats', commentCount: number, retweetCount: number, favoriteCount: number } | null, author?: { __typename?: 'User', name: string, handle: string, avatarUrl: string, coverUrl: string, createdAt: string, updatedAt: string, id: string } | null }> };

export type AddFavoriteMutationVariables = Exact<{
  favorite: FavoriteInput;
}>;


export type AddFavoriteMutation = { __typename?: 'Mutation', addFavorite: { __typename?: 'Favorite', id: string } };

export type RemoveFavoriteMutationVariables = Exact<{
  favorite: FavoriteInput;
}>;


export type RemoveFavoriteMutation = { __typename?: 'Mutation', removeFavorite: { __typename?: 'Favorite', id: string } };


export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  currentUser {
    id
    name
    handle
    avatarUrl
    createdAt
    coverUrl
    stats {
      tweetCount
      followingCount
      followerCount
    }
    favorites {
      tweet {
        id
      }
    }
  }
  suggestions {
    name
    handle
    avatarUrl
    reason
  }
  trends {
    ... on TopicTrend {
      tweetCount
      topic
      quote {
        title
        imageUrl
        description
      }
    }
    ... on HashtagTrend {
      tweetCount
      hashtag
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const CreateNewTweetDocument = gql`
    mutation CreateNewTweet($userId: String!, $body: String!) {
  createTweet(userId: $userId, body: $body) {
    id
  }
}
    `;
export type CreateNewTweetMutationFn = Apollo.MutationFunction<CreateNewTweetMutation, CreateNewTweetMutationVariables>;

/**
 * __useCreateNewTweetMutation__
 *
 * To run a mutation, you first call `useCreateNewTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewTweetMutation, { data, loading, error }] = useCreateNewTweetMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateNewTweetMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewTweetMutation, CreateNewTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewTweetMutation, CreateNewTweetMutationVariables>(CreateNewTweetDocument, options);
      }
export type CreateNewTweetMutationHookResult = ReturnType<typeof useCreateNewTweetMutation>;
export type CreateNewTweetMutationResult = Apollo.MutationResult<CreateNewTweetMutation>;
export type CreateNewTweetMutationOptions = Apollo.BaseMutationOptions<CreateNewTweetMutation, CreateNewTweetMutationVariables>;
export const GetTimelineTweetsDocument = gql`
    query GetTimelineTweets {
  tweets {
    id
    updatedAt
    createdAt
    body
    stats {
      commentCount
      retweetCount
      favoriteCount
    }
    author {
      name
      handle
      avatarUrl
      coverUrl
      createdAt
      updatedAt
      id
    }
  }
}
    `;

/**
 * __useGetTimelineTweetsQuery__
 *
 * To run a query within a React component, call `useGetTimelineTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimelineTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimelineTweetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTimelineTweetsQuery(baseOptions?: Apollo.QueryHookOptions<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>(GetTimelineTweetsDocument, options);
      }
export function useGetTimelineTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>(GetTimelineTweetsDocument, options);
        }
export type GetTimelineTweetsQueryHookResult = ReturnType<typeof useGetTimelineTweetsQuery>;
export type GetTimelineTweetsLazyQueryHookResult = ReturnType<typeof useGetTimelineTweetsLazyQuery>;
export type GetTimelineTweetsQueryResult = Apollo.QueryResult<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>;
export const AddFavoriteDocument = gql`
    mutation AddFavorite($favorite: FavoriteInput!) {
  addFavorite(favorite: $favorite) {
    id
  }
}
    `;
export type AddFavoriteMutationFn = Apollo.MutationFunction<AddFavoriteMutation, AddFavoriteMutationVariables>;

/**
 * __useAddFavoriteMutation__
 *
 * To run a mutation, you first call `useAddFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFavoriteMutation, { data, loading, error }] = useAddFavoriteMutation({
 *   variables: {
 *      favorite: // value for 'favorite'
 *   },
 * });
 */
export function useAddFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<AddFavoriteMutation, AddFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFavoriteMutation, AddFavoriteMutationVariables>(AddFavoriteDocument, options);
      }
export type AddFavoriteMutationHookResult = ReturnType<typeof useAddFavoriteMutation>;
export type AddFavoriteMutationResult = Apollo.MutationResult<AddFavoriteMutation>;
export type AddFavoriteMutationOptions = Apollo.BaseMutationOptions<AddFavoriteMutation, AddFavoriteMutationVariables>;
export const RemoveFavoriteDocument = gql`
    mutation RemoveFavorite($favorite: FavoriteInput!) {
  removeFavorite(favorite: $favorite) {
    id
  }
}
    `;
export type RemoveFavoriteMutationFn = Apollo.MutationFunction<RemoveFavoriteMutation, RemoveFavoriteMutationVariables>;

/**
 * __useRemoveFavoriteMutation__
 *
 * To run a mutation, you first call `useRemoveFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFavoriteMutation, { data, loading, error }] = useRemoveFavoriteMutation({
 *   variables: {
 *      favorite: // value for 'favorite'
 *   },
 * });
 */
export function useRemoveFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFavoriteMutation, RemoveFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFavoriteMutation, RemoveFavoriteMutationVariables>(RemoveFavoriteDocument, options);
      }
export type RemoveFavoriteMutationHookResult = ReturnType<typeof useRemoveFavoriteMutation>;
export type RemoveFavoriteMutationResult = Apollo.MutationResult<RemoveFavoriteMutation>;
export type RemoveFavoriteMutationOptions = Apollo.BaseMutationOptions<RemoveFavoriteMutation, RemoveFavoriteMutationVariables>;