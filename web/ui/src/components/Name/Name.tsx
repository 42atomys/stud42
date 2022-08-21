import classNames from 'classnames';
import type { ClassNameProps } from 'types/globals';
import type { NameProps } from './types';

export const Name = (props: NameProps & ClassNameProps): JSX.Element => {
  const {
    user: { firstName, lastName, usualFirstName, duoLogin, nickname } = {},
    displayLogin,
    className,
    ...rProps
  } = props;
  const hasNickname = nickname && nickname !== '';

  if (hasNickname || (firstName === null && lastName === null)) {
    return <span {...props}>{nickname || duoLogin}</span>;
  }

  if (displayLogin) {
    return (
      <span className={classNames('truncate', className)} {...rProps}>
        {usualFirstName || firstName} ({duoLogin}) {lastName}
      </span>
    );
  }

  return (
    <span className={classNames('truncate', className)} {...rProps}>
      {usualFirstName || firstName} {lastName}
    </span>
  );
};

export default Name;
