import Tooltip from '@components/Tooltip';
import { LocalStorageKeys } from '@lib/localStorageKeys';
import useLocalStorage from '@lib/useLocalStorage';

// To use the ping component, the parent of the component must be have the
// followings className: "relative flex items-stretch"
export const NewFeaturePing = ({ featureName }: { featureName: string }) => {
  const [visible, setVisible] = useLocalStorage(
    LocalStorageKeys.NewFeatureReadStatus(featureName),
    true
  );
  if (!visible) {
    // Return div to prevent mismatch error between server side component and
    // client side component
    return <div></div>;
  }

  return (
    <Tooltip
      text="New feature"
      subText="Your primary campus is now always at the top of the list!"
      showArrow={false}
      className="-top-5 -right-1"
    >
      <span
        className="absolute flex -top-1 -right-1 w-[10px] h-[10px] cursor-pointer"
        onClick={() => setVisible(false)}
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full w-[10px] h-[10px] bg-indigo-500"></span>
      </span>
    </Tooltip>
  );
};

export default NewFeaturePing;
