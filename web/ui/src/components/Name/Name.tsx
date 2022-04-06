import type { ClassNameProps } from "types/globals";
import type { NameProps, NameUserProps } from "./types";

export const Name = (props:  NameProps | NameUserProps | ClassNameProps = {}) : JSX.Element => {
  const { firstName, lastName, usualFirstName, login, hasNickname, nickname } = (props as NameUserProps).user || props;

  if (hasNickname || (firstName === null && lastName === null)) {
    return <span {...props}>{nickname || login}</span>;
  }

  return <span {...props}>{usualFirstName || firstName} {lastName}</span>
}

export default Name;