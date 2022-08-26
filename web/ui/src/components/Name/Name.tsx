import ConditionalWrapper from '@components/ConditionalWrapper';
import Tooltip from '@components/Tooltip';
import classNames from 'classnames';
import type { NameComponent } from './types';

export const Name: NameComponent = (props) => {
  const {
    user: { firstName, lastName, usualFirstName, duoLogin, nickname } = {},
    displayLogin,
    displayNickname,
    className,
    tooltipClassName,
    ...rProps
  } = props;

  const hasNickname = nickname && nickname !== '';
  const formattedName = [
    displayNickname && hasNickname ? `@${nickname} |` : null,
    usualFirstName || firstName,
    displayLogin ? `(${duoLogin})` : null,
    lastName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ConditionalWrapper
      condition={formattedName.length > 20}
      trueWrapper={(children) => (
        <Tooltip
          className={classNames('w-full', tooltipClassName)}
          text={formattedName}
          color="black"
          size="xs"
          direction="top"
        >
          {children}
        </Tooltip>
      )}
    >
      <span className={classNames('truncate', className)} {...rProps}>
        {formattedName}
      </span>
    </ConditionalWrapper>
  );
};

export default Name;
