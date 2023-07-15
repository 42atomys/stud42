import classNames from 'classnames';
import { PropsWithClassName } from 'types/globals';

/**
 * Badgy is a small badge that can be used to indicate a status or a label
 */
export const Badgy: React.FC<PropsWithClassName<{ text: string }>> = ({
  text,
  className,
}) => (
  <span
    className={classNames(
      'uppercase rounded-full py-0.5 px-2 text-xs font-bold',
      className,
    )}
  >
    {text}
  </span>
);

/**
 * NewBadgy is a small badge that can be used to indicate a status or a label
 * for new features
 */
export const NewBadgy = Badgy.bind(null, {
  text: 'New',
  className: 'bg-indigo-400 dark:bg-indigo-600 text-white',
});

/**
 * BetaBadgy is a small badge that can be used to indicate a status or a label
 * for beta features
 */
export const BetaBadgy = Badgy.bind(null, {
  text: 'Beta',
  className: 'bg-yellow-400 dark:bg-yellow-600 text-white',
});

/**
 * DeprecatedBadgy is a small badge that can be used to indicate a status or a
 * label for deprecated features or features that are going to be removed
 * soon
 */
export const DeprecatedBadgy = Badgy.bind(null, {
  text: 'Deprecated',
  className: 'bg-red-400 dark:bg-red-600 text-white',
});

/**
 * AkaBadgy is a small badge that can be used to indicate a status or a label
 * for anything that are "also known as" something else
 */
export const AkaBadgy = Badgy.bind(null, {
  text: 'Aka',
  className: 'bg-slate-400 dark:bg-slate-700 text-white',
});
