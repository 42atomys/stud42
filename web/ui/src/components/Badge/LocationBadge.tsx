import ConditionalWrapper from '@components/ConditionalWrapper';
import Emoji from '@components/Emoji';
import Tooltip from '@components/Tooltip';
import { Location } from '@graphql.d';
import { countryEmoji } from '@lib/clustersMap';
import { clusterURL } from '@lib/searchEngine';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { NestedPartial } from 'types/utils';
import { Badge } from './Badge';

dayjs.extend(relativeTime);

export const LocationBadge = ({
  location,
}: {
  location: NestedPartial<Location> | null | undefined;
}) => {
  const isConnected = location?.endAt === null ? true : false;
  const dayJsObject = location?.endAt
    ? dayjs(location.endAt as Date, { locale: '' })
    : null;
  return (
    <ConditionalWrapper
      // `? true : false` mysterious workaround to prevent ts error
      condition={isConnected}
      trueWrapper={(children) => {
        const url = clusterURL(
          location?.campus?.name as string,
          location?.identifier as string
        );
        if (!url) {
          return <>{children}</>;
        }

        return (
          <Link data-testid="location-badge-link" href={url}>
            {children}
          </Link>
        );
      }}
      falseWrapper={(children) => {
        return dayJsObject ? (
          <Tooltip
            text={dayJsObject?.format('MMMM D, YYYY HH:mm')}
            direction="bottom"
            size="sm"
          >
            {children}
          </Tooltip>
        ) : (
          <>{children}</>
        );
      }}
    >
      <Badge color={isConnected ? 'green' : 'gray'} className="max-w-full">
        <span
          className={classNames(
            'inline-flex rounded-full w-2 h-2',
            isConnected ? 'bg-emerald-500' : 'bg-slate-500'
          )}
        ></span>
        <span className="text-sm mx-1 flex-1 truncate">
          {isConnected
            ? location?.identifier
            : dayJsObject?.fromNow() || 'offline'}
        </span>
        {isConnected && (
          <Emoji
            emoji={countryEmoji[location?.campus?.country || '']}
            size={14}
            title={location?.campus?.name}
            className={classNames('mx-1', isConnected ? 'visible' : 'hidden')}
          />
        )}
      </Badge>
    </ConditionalWrapper>
  );
};
