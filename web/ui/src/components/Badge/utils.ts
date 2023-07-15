import { AccountProvider } from '@graphql.d';
import { thridPartyData } from './data';
import { ThridPartySortable } from './types';

/**
 * Sort the accounts by the order of the thridPartyData object.
 * This is used to display all thrid party accounts in the same order.
 */
export const thirdPartySorted = <T extends ThridPartySortable>(
  accounts: T[],
  duoLogin?: string,
) => {
  let accs: T[] = [];
  accounts?.forEach((a) => (a !== null ? a && accs.push(a) : null));

  if (duoLogin) {
    /**
     * If the user don't have a duo account in database due to the fact that
     * the user didn't login yet to the application, we add it to the user
     * object to be able to display it in the user profile.
     */
    if (!accs.some((a) => a?.provider === AccountProvider.DUO)) {
      accs.push({
        provider: AccountProvider.DUO,
        username: duoLogin,
        providerAccountId: '',
      } as T);
    }

    /**
     * Push the slack account to the accounts array without required to have
     * a slack account in database. This is due to the fact that the slack
     * account is not linked and is not required to be linked. The slack
     * username is the duo login by design.
     */
    accs.push({
      provider: 'SLACK' as AccountProvider,
      username: duoLogin,
      providerAccountId: '',
    } as T);
  }

  const sortedKeys = Object.keys(thridPartyData);
  return accs.sort(
    (a, b) => sortedKeys.indexOf(a.provider) - sortedKeys.indexOf(b.provider),
  );
};
