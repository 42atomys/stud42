import Image from 'next/image';
import React from 'react';
import { Props } from './types';

const codepoints = (char: string): string | undefined => {
  return char.codePointAt(0)?.toString(16);
};

/**
 * Emoji is a component that renders an emoji from unicode to
 * Twitter's emoji SVG file.
 *
 * @param {string} emoji - The emoji to render
 * @param {number} size - The size of the emoji in pixels
 * @param {string} containerClassName - The class name to apply to the container
 */
export const Emoji = ({
  emoji = '',
  size = 16,
  containerClassName,
  ...props
}: Props) => {
  var emojiCode: string[] = [];
  for (let c of emoji) {
    let code = codepoints(c);
    if (code) emojiCode.push(code);
  }

  if (emojiCode.length < 1) return null;

  const hasContainer = containerClassName ? true : false;
  const containerProps = hasContainer
    ? { className: containerClassName }
    : null;

  return React.createElement(
    hasContainer ? 'span' : React.Fragment,
    // @ts-ignore
    containerProps,
    <Image
      src={`https://twemoji.maxcdn.com/v/latest/svg/${emojiCode.join('-')}.svg`}
      height={size}
      width={size}
      alt={emoji}
      {...props}
    />
  );
};
