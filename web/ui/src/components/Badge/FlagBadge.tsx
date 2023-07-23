import { ConditionalWrapper } from '@components/ConditionalWrapper';
import { Tooltip } from '@components/Tooltip';
import { UserFlag } from '@graphql.d';
import classNames from 'classnames';
import Link from 'next/link';
import { flagData } from './data';

/**
 * The FlagBadge component is a UI component that displays an icon representing
 * a particular flag along with a tooltip containing more information about that
 * flag.
 *
 * It takes in a flag props, which specifies the type of flag to display.
 * The component uses a data object: `flagData`, to determine how to display it.
 * If the flagData object also contains a link property for the flag,
 * the icon will be wrapped in a Link component that opens the link in a
 * new tab when clicked.
 */
export const FlagBadge: React.FC<{ flag: UserFlag }> = ({ flag }) => {
  const data = flagData[flag];

  return (
    <Tooltip
      text={data.name}
      subText={data.description}
      color="black"
      direction="bottom"
      size="sm"
      allowInteractions={false}
      showArrow
      className="![--tooltip-mb:1rem]"
    >
      <ConditionalWrapper
        condition={data.link !== undefined}
        trueWrapper={(children) => (
          <Link
            role="link"
            href={data.link?.(null) as URL}
            className="flex"
            target="_blank"
          >
            {children}
          </Link>
        )}
      >
        <i
          data-testid={`flag-${flag}`}
          className={classNames('fa-fw cursor-pointer p-1', data.className)}
        />
      </ConditionalWrapper>
    </Tooltip>
  );
};
