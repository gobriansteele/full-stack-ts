import { TwitterResolverContext } from '../resolvers';
import { TrendResolvers } from '../resolvers-types.generated';

export const trendResolvers: TrendResolvers<TwitterResolverContext> = {
  __resolveType(obj, _context, _info) {
    // Only Author has a name field
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,
    if (typeof (obj as any).hashtag === 'string') {
      return 'HashtagTrend';
    } else return 'TopicTrend';
    return null;
  },
};
