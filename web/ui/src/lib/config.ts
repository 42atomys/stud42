import { readFileSync } from 'fs';
import YAML from 'yaml';

export const getConfig = (): Configuration => {
  if (!process.env.CONFIG_PATH) throw new Error('No CONFIG_PATH env var set.');

  const fileContent = readFileSync(process.env.CONFIG_PATH, 'utf8');
  return YAML.parse(fileContent) as Configuration;
};
