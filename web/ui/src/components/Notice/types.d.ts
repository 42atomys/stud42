import { Notice } from '@graphql.d';

export type NoticeProps = {
  notice: Omit<Notice, '__typename' | 'isActive'>;
};
