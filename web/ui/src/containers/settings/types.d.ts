const SettingsPages =
  'profile' |
  'apparence' |
  'awesomeness' |
  'accounts' |
  'about' |
  'help' |
  'terms' |
  'privacy';

export type SettingsLayoutProps = {
  page: (typeof SettingsPages)[number];
};

export type SettingsCategoryProps = {
  title: string;
  description: string;
};

export type SettingsTableRowProps = {
  children: React.ReactNode[] | React.ReactNode;
  title: string;
  description?: string;
  isSponsorOnly?: boolean;
};
