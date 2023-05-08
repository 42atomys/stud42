import { NameFormatable } from './types';

export const formatName = (
  obj: NameFormatable,
  opts: { displayLogin: boolean; displayNickname: boolean } = {
    displayLogin: false,
    displayNickname: false,
  }
) => {
  const formattedName = [
    opts.displayNickname && obj.nickname ? `@${obj.nickname} |` : null,
    obj.usualFirstName || obj.firstName,
    opts.displayLogin ? `(${obj.duoLogin})` : null,
    obj.lastName,
  ];

  return formattedName.filter(Boolean).join(' ');
};
