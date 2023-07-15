import { AccountProvider } from '@graphql.d';
import { thirdPartySorted } from '../utils';

describe('thirdPartySorted', () => {
  it('should sort accounts based on predefined order', () => {
    const accounts = [
      {
        provider: AccountProvider.DUO,
        username: 'user3',
        providerAccountId: '3',
      },
      {
        provider: AccountProvider.DISCORD,
        username: 'user1',
        providerAccountId: '1',
      },
      {
        provider: AccountProvider.GITHUB,
        username: 'user2',
        providerAccountId: '2',
      },
    ];

    const sortedAccounts = thirdPartySorted(accounts);

    expect(sortedAccounts).toEqual([
      {
        provider: AccountProvider.DUO,
        username: 'user3',
        providerAccountId: '3',
      },
      {
        provider: AccountProvider.DISCORD,
        username: 'user1',
        providerAccountId: '1',
      },
      {
        provider: AccountProvider.GITHUB,
        username: 'user2',
        providerAccountId: '2',
      },
    ]);
  });

  it('should add DUO account if missing and duoLogin is provided', () => {
    const accounts = [
      {
        provider: AccountProvider.DISCORD,
        username: 'user1',
        providerAccountId: '1',
      },
      {
        provider: AccountProvider.GITHUB,
        username: 'user2',
        providerAccountId: '2',
      },
    ];

    const duoLogin = 'user-duo';

    const sortedAccounts = thirdPartySorted(accounts, duoLogin);

    expect(sortedAccounts).toEqual([
      {
        provider: AccountProvider.DUO,
        username: duoLogin,
        providerAccountId: '',
      },
      {
        provider: 'SLACK',
        username: duoLogin,
        providerAccountId: '',
      },
      {
        provider: AccountProvider.DISCORD,
        username: 'user1',
        providerAccountId: '1',
      },
      {
        provider: AccountProvider.GITHUB,
        username: 'user2',
        providerAccountId: '2',
      },
    ]);
  });

  it('should always add Slack account with DUO username', () => {
    const accounts = [
      {
        provider: AccountProvider.DISCORD,
        username: 'user1',
        providerAccountId: '1',
      },
      {
        provider: AccountProvider.GITHUB,
        username: 'user2',
        providerAccountId: '2',
      },
    ];

    const duoLogin = 'user-duo';

    const sortedAccounts = thirdPartySorted(accounts, duoLogin);

    expect(sortedAccounts).toEqual([
      {
        provider: AccountProvider.DUO,
        username: duoLogin,
        providerAccountId: '',
      },
      {
        provider: 'SLACK',
        username: duoLogin,
        providerAccountId: '',
      },
      {
        provider: AccountProvider.DISCORD,
        username: 'user1',
        providerAccountId: '1',
      },
      {
        provider: AccountProvider.GITHUB,
        username: 'user2',
        providerAccountId: '2',
      },
    ]);
  });
});
