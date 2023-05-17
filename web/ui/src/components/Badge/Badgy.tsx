import classNames from 'classnames';
import { PropsWithClassName } from 'types/globals';

export const LittleBadgy: React.FC<PropsWithClassName<{ text: string }>> = ({
  text,
  className,
}) => (
  <span
    className={classNames(
      'uppercase rounded-full py-0.5 px-2 text-xs font-bold',
      className
    )}
  >
    {text}
  </span>
);

export const NewBadgy = LittleBadgy.bind(null, {
  text: 'New',
  className: 'bg-indigo-400 dark:bg-indigo-600 text-white',
});
export const BetaBadgy = LittleBadgy.bind(null, {
  text: 'Beta',
  className: 'bg-yellow-400 dark:bg-yellow-600 text-white',
});
export const DeprecatedBadgy = LittleBadgy.bind(null, {
  text: 'Deprecated',
  className: 'bg-red-400 dark:bg-red-600 text-white',
});
export const AkaBadgy = LittleBadgy.bind(null, {
  text: 'Aka',
  className: 'bg-slate-400 dark:bg-slate-700 text-white',
});
