import type { FlagDataMap, ThridPartyAccountDataMap } from './types';

/**
 * countryNameToEmoji is a map to convert country name to emoji flag
 * @example countryNameToEmoji['France'] => '🇫🇷'
 */
export const countryNameToEmoji: { [key: string]: string } = {
  Turkey: '🇹🇷',
  Switzerland: '🇨🇭',
  Italy: '🇮🇹',
  Luxembourg: '🇱🇺',
  'Czech Republic': '🇨🇿',
  Armenia: '🇦🇲',
  'Russian Federation': '🇷🇺',
  'United Kingdom': '🇬🇧',
  Netherlands: '🇳🇱',
  Romania: '🇷🇴',
  Brazil: '🇧🇷',
  Jordan: '🇯🇴',
  Austria: '🇦🇹',
  Australia: '🇦🇺',
  Germany: '🇩🇪',
  Canada: '🇨🇦',
  Finland: '🇫🇮',
  Portugal: '🇵🇹',
  Ukraine: '🇺🇦',
  'Moldova, Republic of': '🇲🇩',
  Spain: '🇪🇸',
  'United Arab Emirates': '🇦🇪',
  Belgium: '🇧🇪',
  Morocco: '🇲🇦',
  France: '🇫🇷',
  'Korea, Republic of': '🇰🇷',
  'South Africa': '🇿🇦',
  Malaysia: '🇲🇾',
  Japan: '🇯🇵',
  Thailand: '🇹🇭',
  'United States': '🇺🇸',
};

/**
 * flagData is a map how contains data about UserFlag and how to display it
 * @example flagData[UserFlag.STAFF] => { ...  }
 */
export const flagData: FlagDataMap = {
  STAFF: {
    name: 'Staff',
    description: 'S42 staff member',
    className: 'fa-duotone fa-hat-wizard text-indigo-500',
  },
  BETA: {
    name: 'Beta Tester',
    description: 'Present during the beta phase',
    className: 'fa-duotone fa-flask-potion text-orange-500',
  },
  COLLABORATOR: {
    name: 'Collaborator',
    description: 'Collaborator on Github',
    className: 'fa-duotone fa-code-compare text-cyan-500',
    link: () => new URL('https://github.com/42Atomys/stud42/collaborators'),
  },
  CONTRIBUTOR: {
    name: 'Contributor',
    description: 'Contributed on Github',
    className: 'fa-duotone fa-code-pull-request text-green-500',
    link: () => new URL('https://github.com/42Atomys/stud42'),
  },
  DISCORD: {
    name: 'Discord',
    description: 'Member of the Discord server',
    className: 'fa-brands fa-discord text-slate-500',
    link: () => new URL('https://discord.gg/5f864c6hyj'),
  },
  SPONSOR: {
    name: 'Sponsor',
    description: 'Sponsor of the project',
    className: 'fa-duotone fa-user-astronaut text-pink-500',
    link: () => new URL('https://github.com/sponsors/42Atomys'),
  },
};

/**
 * thridPartyData is a map how contains data about ThridPartyAccount
 * (also called `Account` on API) and how to display it.
 * @example thridPartyData[AccountProvider.DISCORD] => { ...  }
 */
export const thridPartyData: ThridPartyAccountDataMap = {
  DUO: {
    name: 'Intra 42',
    className: 'fa-kit fa-duoquadra',
    link: ({ username }) =>
      new URL(`https://profile.intra.42.fr/users/${username}`),
  },
  SLACK: {
    name: 'Slack',
    className: 'fab fa-slack',
    link: ({ username }) =>
      new URL(`https://42born2code.slack.com/messages/@${username}`),
  },
  DISCORD: {
    name: 'Discord',
    className: 'fab fa-discord',
    link: ({ username }) => new URL(`https://discord.com/users/${username}`),
  },
  GITHUB: {
    name: 'Github',
    className: 'fab fa-github',
    link: ({ username }) => new URL(`https://github.com/${username}`),
  },
  GITLAB: {
    name: 'Gitlab',
    className: 'fab fa-gitlab',
    link: ({ username }) => new URL(`https://gitlab.com/${username}`),
  },
  LINKEDIN: {
    name: 'LinkedIn',
    className: 'fab fa-linkedin',
    link: ({ providerAccountId }) =>
      new URL(`https://www.linkedin.com/in/${providerAccountId}`),
  },
  TWITTER: {
    name: 'Twitter',
    className: 'fab fa-twitter',
    link: ({ username }) => new URL(`https://twitter.com/${username}`),
  },
  INSTAGRAM: {
    name: 'Instagram',
    className: 'fab fa-instagram',
    link: ({ username }) => new URL(`https://www.instagram.com/${username}`),
  },
  REDDIT: {
    name: 'Reddit',
    className: 'fab fa-reddit',
    link: ({ username }) => new URL(`https://www.reddit.com/user/${username}`),
  },
  SPOTIFY: {
    name: 'Spotify',
    className: 'fab fa-spotify',
    link: ({ providerAccountId }) =>
      new URL(`https://open.spotify.com/user/${providerAccountId}`),
  },
  TWITCH: {
    name: 'Twitch',
    className: 'fab fa-twitch',
    link: ({ username }) => new URL(`https://www.twitch.tv/${username}`),
  },
};
