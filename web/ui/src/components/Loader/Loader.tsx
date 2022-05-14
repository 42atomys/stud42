import { useEffect, useState } from 'react';

const funPicks: Array<string> = [
  'Just a few seconds ago, you click something',
  "Mhhhh.. I'm not sure what you clicked",
  "In long time ago, this loading page don't exist",
  "I'm sorry but, this loader is very nice",
  'This spinner is very impressive, such rotation',
  "You spin me right 'round, baby, right 'round",
  'This API is slow, but faster than Intranet. No offense',
  'When you sponsor project, this spinner spin faster. This is not true',
  'If you see that, you are a good person, you wait',
  '[...] Add more hints by yourself on Github',
];

/**
 * Loader is a component that shows a loading animation with some fun hints
 */
export const Loader = () => {
  const pickRandomHint = () =>
    funPicks[Math.floor(Math.random() * funPicks.length)];
  const [hint, setHint] = useState<string | null>(pickRandomHint());

  useEffect(() => {
    setInterval(() => {
      setHint(pickRandomHint());
    }, 3000);
  }, [setHint]);

  return (
    <div className="text-4xl flex flex-col justify-center items-center">
      <h1 className="flex font-extrabold justify-center items-center mb-2">
        <i
          className="fa-duotone fa-spinner-third fa-spin"
          style={
            {
              '--fa-animation-duration': '500ms',
              '--fa-primary-color': '#6366f1',
              '--fa-secondary-color': '#6366f1',
            } as React.CSSProperties
          }
        ></i>
        <span className="ml-4 text-indigo-500/50">Loading</span>
      </h1>
      {hint && <small className="text-sm text-slate-500/50">{hint}</small>}
    </div>
  );
};
