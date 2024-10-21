import { Tooltip } from '@components/Tooltip';
import classNames from 'classnames';
import Link from 'next/link';
import { PropsWithClassName } from 'types/globals';

export const SponsorIcon: React.FC<PropsWithClassName> = ({ className }) => (
  <i
    className={classNames(
      className,
      'fa-solid fa-user-astronaut text-fuchsia-400 dark:text-fuchsia-600',
    )}
  ></i>
);

export const SponsorHint: React.FC<PropsWithClassName> = ({ className }) => (
  <Tooltip
    text="Sponsors Only"
    subText="This feature is only available to sponsors."
    color="fuchsia"
    direction="top"
    size="sm"
    showArrow
  >
    <Link
      href="https://github.com/sponsors/42atomys"
      target="_blank"
      rel="noreferrer"
      className="text-white font-bold hover:underline"
    >
      <SponsorIcon className={className} />
    </Link>
  </Tooltip>
);
