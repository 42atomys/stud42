import type { ClassNameProps } from 'types/globals';
import type { NameProps, NameUserProps } from './types';

export const Name = (
  props: NameProps | NameUserProps | ClassNameProps = {}
): JSX.Element => {
  const { firstName, lastName, usualFirstName, duoLogin } =
    (props as NameUserProps).user || props;
  const { displayLogin } = props as NameProps;
  // TODO implement the nickname feature
  const hasNickname = false;
  const nickname = '';

  if (hasNickname || (firstName === null && lastName === null)) {
    return <span {...props}>{nickname || duoLogin}</span>;
  }

  if (displayLogin) {
    return (
      <span {...props}>
        {usualFirstName || firstName} ({duoLogin}) {lastName}
      </span>
    );
  }

  return (
    <span {...props}>
      {usualFirstName || firstName} {lastName}
    </span>
  );
};

export default Name;
