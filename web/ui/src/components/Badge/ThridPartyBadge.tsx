import { ConditionalWrapper } from '@components/ConditionalWrapper';
import { Tooltip } from '@components/Tooltip';
import classNames from 'classnames';
import Link from 'next/link';
import { thridPartyData } from './data';
import { ThridPartyBadgeProps } from './types';

/**
 * ThridPartyUnkwownError is thrown when the provider specified in the props is
 * not supported by the thridPartyData object.
 *
 * When this error is thrown, check the thridPartyData object to see if the
 * provider is supported. If it is, make sure that the provider is spelled
 * correctly in the thridPartyData object. If it is not, add the provider to
 * the thridPartyData object.
 */
export const ThridPartyUnkwownError = new Error('Unknown thrid party provider');

/**
 * This is a UI component called ThridPartyBadge that displays an icon
 * representing a third-party account provider, such as Twitter or GitHub, along
 * with a tooltip containing the name of the provider.
 *
 * The component uses a data object called thridPartyData to determine how to
 * display the badge.
 * If the provider specified in the props is not supported by the thridPartyData
 * object, the component throws the `ThridPartyUnkwownError` error.
 *
 * If a link property exists for the provider in the thridPartyData object,
 * the icon will be wrapped in a Link component that opens the link in a new tab
 * when clicked and redirects the user to the user's profile on that provider's
 * website.
 */
export const ThridPartyBadge: React.FC<ThridPartyBadgeProps> = ({
  provider,
  username,
  providerAccountId,
}) => {
  const data = thridPartyData[provider];
  if (!data) throw ThridPartyUnkwownError;

  return (
    <Tooltip
      text={data.name}
      direction="bottom"
      size="sm"
      color="black"
      allowInteractions={false}
    >
      <ConditionalWrapper
        condition={!!data.link}
        trueWrapper={(children) => (
          <Link
            role="link"
            className="hover:bg-slate-950 rounded-lg p-2"
            key={`user-profile-acount-tooltip-${providerAccountId}`}
            href={data.link?.(username) as URL}
          >
            {children}
          </Link>
        )}
      >
        <i
          data-testid={`thrid-party-${provider}`}
          className={classNames('fa-fw', data.className)}
        />
      </ConditionalWrapper>
    </Tooltip>
  );
};
