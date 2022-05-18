import Emoji from '@components/Emoji';
import { Location } from '@graphql.d';
import classNames from 'classnames';
import { Badge } from './Badge';

export const LocationBadge = ({ location }: { location: Partial<Location> | null | undefined }) => {
  const isConnected = location?.identifier ? true : false;

  return (
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
      <Emoji
        emoji="🇫🇷"
        size={14}
        className={classNames('mx-1', isConnected ? 'visible' : 'hidden')}
      />
    </Badge>
  );
};
