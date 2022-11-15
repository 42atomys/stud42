import { ClassNameProps } from 'types/globals';

type SettingsCategoryFunc = (
  props: SettingsCategoryProps & ClassNameProps
) => JSX.Element;

type SettingsCategoryProps = {
  children: JSX.Element;
  title: string;
  description: string;
};

type SettingsTableFunc = (
  props: SettingsTableProps & ClassNameProps
) => JSX.Element;

type SettingsTableProps = {
  children: JSX.Element;
};

type SettingsTableRowFunc = (
  props: SettingsTableRowProps & ClassNameProps
) => JSX.Element;

type SettingsTableRowProps = {
  children: JSX.Element;
  title: string;
  description?: string;
};
