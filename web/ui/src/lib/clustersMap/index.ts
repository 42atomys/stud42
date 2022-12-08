import { Helsinki } from './campus/helsinki';
import { Malaga } from './campus/malaga';
import { Paris } from './campus/paris';
import { Seoul } from './campus/seoul';
import { Vienna } from './campus/vienna';
import { CampusNames, ICampus } from './types';

/**
 * Campuses represents the list of campuses present in the application.
 * Particulary, used in the cluster map.
 *
 * It is a const, so it can be accessed from anywhere in the application.
 * You can add a new campus by adding it to the list of campuses.
 * And define the campus in the `campus` folder (see `campus/paris.ts` for
 * an example). Don't forget to add the campus to the `CampusNames` type in
 * `types.d.ts`.
 *
 */
export const Campuses: {
  [key in CampusNames]: ICampus;
} = {
  helsinki: new Helsinki(),
  malaga: new Malaga(),
  paris: new Paris(),
  seoul: new Seoul(),
  vienna: new Vienna(),
};

export type { CampusNames, ClusterMapEntity } from './types';
export default Campuses;
