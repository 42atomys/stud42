import { ConditionalWrapperFn } from './types';

/**
 * ConditionalWrapper will render a `trueWrapper` when the condition is true
 * and a `falseWrapper` when the condition is false. When no falseWrapper
 * is given, no wrapper is applied
 */
export const ConditionalWrapper: ConditionalWrapperFn = ({
  condition,
  trueWrapper,
  falseWrapper = null,
  children,
}) => {
  if (condition) return trueWrapper(children);
  else return falseWrapper ? falseWrapper(children) : children;
};
