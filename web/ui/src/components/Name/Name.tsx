import ConditionalWrapper from '@components/ConditionalWrapper';
import Tooltip from '@components/Tooltip';
import classNames from 'classnames';
import { PropsWithClassName } from 'types/globals';
import type { NameProps } from './types';
import { formatName } from './utils';

export const Name: React.FC<PropsWithClassName<NameProps>> = (props) => {
  const {
    user = {},
    displayLogin = false,
    displayNickname = false,
    className,
    tooltip = true,
    tooltipClassName,
    ...rProps
  } = props;

  const formattedName = formatName(user, { displayLogin, displayNickname });

  return (
    <ConditionalWrapper
      condition={tooltip && formattedName.length > 20}
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
