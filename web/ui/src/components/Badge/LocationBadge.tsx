import ConditionalWrapper from '@components/ConditionalWrapper';
import Emoji from '@components/Emoji';
import { Location } from '@graphql.d';
import classNames from 'classnames';
import Link from 'next/link';
import { NestedPartial } from 'types/utils';
import { Badge } from './Badge';
import { countryNameToEmoji } from './countryMap';

export const LocationBadge = ({
  location,
}: {
  location: NestedPartial<Location> | null | undefined;
}) => {
  const isConnected = location?.identifier ? true : false;

  return (
    <ConditionalWrapper
      // `? true : false` mysterious workaround to prevent ts error
      condition={location?.campus?.name && location?.identifier ? true : false}
      trueWrapper={(children) => (
        <Link
          href={`/clusters?campus=${location?.campus?.name?.toLowerCase()}&identifier=${location?.identifier
            }`}
        >
          <a>{children}</a>
        </Link>
      )}
    >
      <Badge color={isConnected ? 'green' : 'gray'}>
        <span
          className={classNames(
            'inline-flex rounded-full w-2 h-2',
            isConnected ? 'bg-emerald-500' : 'bg-slate-500'
          )}
        ></span>
        <span className="flex flex-row justify-center items-center text-sm mx-1">
          {isConnected ? location?.identifier : 'Offline'}
        </span>
        {isConnected && (
          <Emoji
            emoji={countryNameToEmoji[location?.campus?.country || '']}
            size={14}
            title={location?.campus?.name}
            className={classNames('mx-1', isConnected ? 'visible' : 'hidden')}
          />
        )}
      </Badge>
    </ConditionalWrapper>
  );
};
