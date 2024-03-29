const fs = require('fs');
const path = require('path');
const c = require('console');
require('../src/lib/prototypes/string');

// Generic warning to add at the top of each the generated files
const GeneratedWarning = `// DO NOT EDIT THIS FILE MANUALLY - IT IS GENERATED FROM THE CONTENT OF THE CAMPUS FOLDER\n// RUN \`yarn generate:campus\` TO REGENERATE IT\n\n`;

// Paths to the files used in the generation
const rootPath = path.join(__dirname, '../src/lib/clustersMap');
const directoryPath = path.join(rootPath, './campus');

/**
 * generateCampusTypes generates the types.generated.ts file containing the
 * CampusIdentifier enum. This enum is used to identify the campus in the
 * interface.
 * @param campusIdentifiers list of campus identifiers (e.g. ['helsinki', 'paris', ...])
 */
const generateCampusTypes = (campusIdentifiers: any[]): void => {
  c.log('⠙ Generate campus types...');

  const enumContent = `${GeneratedWarning}/**
 * List of all campus names present in the interface as their identifier.
 * Identifier must be in camelCase without spaces or special characters. It
 * must be unique in the list.
 */
export type CampusIdentifier =
${campusIdentifiers.map((id) => `  | '${id}'`).join('\n')};
`;

  fs.writeFileSync(path.join(rootPath, 'types.generated.d.ts'), enumContent);

  c.log('✔ Generated campus types.generated.ts file successfully!');
};

/**
 * generateCampusClasses generates the campuses.generated.ts file containing the
 * CampusIdentifier enum. This enum is used to identify the campus in the
 * interface.
 * @param campusIdentifiers list of campus identifiers (e.g. ['helsinki', 'paris', ...])
 */
const generateCampusClasses = (campusIdentifiers: any[]): void => {
  c.log('⠙ Generate campus types...');

  const campusesContent = `${GeneratedWarning}import { ICampus } from './types';
import { CampusIdentifier } from './types.generated';

${campusIdentifiers
  .map((id) => `import { ${id.toTitleCase()} } from './campus/${id}';`)
  .join('\n')}

/**
 * Campuses represents the list of campuses present in the application.
 * Particulary, used in the cluster map.
 *
 * It is a const, so it can be accessed from anywhere in the application.
 * You can add a new campus by define the campus in the \`campus\` folder
 * (see \`campus/paris.ts\` for an example) and run \`yarn generate:campus\`
 */
export const Campuses: Record<CampusIdentifier, ICampus> = {
${campusIdentifiers
  .map((id) => `  ${id}: new ${id.toTitleCase()}(),`)
  .join('\n')}
};
`;

  fs.writeFileSync(
    path.join(rootPath, 'campuses.generated.ts'),
    campusesContent,
  );

  c.log('✔ Generated campuses.generated.ts file successfully!');
};

/**
 * Read the campus directory and generate the types and classes files.
 * The campus directory contains a file for each campus. The file name is the
 * campus identifier. The file contains the class definition of the campus.
 * The class must implement the ICampus interface.
 * The campus identifier is used to identify the campus in the interface.
 * The campus identifier must be in camelCase without spaces or special
 * characters. It must be unique in the list.
 */
c.log('⠙ Read campus directory...');
fs.readdir(directoryPath, (err: any, files: any[]) => {
  if (err) {
    c.error('cannot read directory:', err);
    return;
  }

  const campusIdentifiers = files
    .filter((file) => path.extname(file) === '.ts')
    .map((file) => path.basename(file, path.extname(file)));

  generateCampusTypes(campusIdentifiers);
  generateCampusClasses(campusIdentifiers);
});

c.log('✔ Generated campus successfully!');
