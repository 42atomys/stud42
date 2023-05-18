import { NameFormatable } from './types';

export const formatName = (
  obj: NameFormatable,
  opts: { displayLogin: boolean } = {
    displayLogin: false,
  }
) => {
  const formattedName = [
    obj.usualFirstName || obj.firstName,
    opts.displayLogin ? `(@${obj.duoLogin})` : null,
    obj.lastName,
  ];

  return formattedName.filter(Boolean).join(' ');
};
