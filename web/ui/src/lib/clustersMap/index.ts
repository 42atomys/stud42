import { Helsinki } from './campus/helsinki';
import { Lausanne } from './campus/lausanne';
import { Madrid } from './campus/madrid';
import { Malaga } from './campus/malaga';
import { Mulhouse } from './campus/mulhouse';
import { Paris } from './campus/paris';
import { Seoul } from './campus/seoul';
import { Tokyo } from './campus/tokyo';
import { Urduliz } from './campus/urduliz';
import { Vienna } from './campus/vienna';
import { Wolfsburg } from './campus/wolfsburg';
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
  lausanne: new Lausanne(),
  madrid: new Madrid(),
  malaga: new Malaga(),
	urduliz: new Urduliz(),
  paris: new Paris(),
  mulhouse: new Mulhouse(),
  seoul: new Seoul(),
  tokyo: new Tokyo(),
  vienna: new Vienna(),
  wolfsburg: new Wolfsburg(),
};

export { countryEmoji } from './countryEmoji';
export type { CampusNames, ClusterMapEntity } from './types';
export default Campuses;
