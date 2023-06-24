import { useMe } from '@ctx/currentUser';
import { Notice } from './Notice';

/**
 * Get the current user and all the notices that he/she has not read yet
 * and display them in the top of the page. Notices are fetched from the API.
 */
export const RemoteNotices: React.FC = () => {
  const {
    me: { activesNotices = [] },
  } = useMe();

  if (activesNotices.length === 0) {
    return null;
  }

  return (
    <div>
      {activesNotices.map((notice) => (
        <Notice key={notice.id} notice={notice} />
      ))}
    </div>
  );
};
