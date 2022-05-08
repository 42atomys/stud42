import Image from 'next/image';
import { Props } from './types';

const codepoints = (char: string): string | undefined => {
  return char.codePointAt(0)?.toString(16);
};

/**
 * Emoji is a component that renders an emoji from unicode to
 * Twitter's emoji SVG file.
 */
export const Emoji = ({ emoji, size = 16, ...props }: Props) => {
  var emojiCode: string[] = [];
  for (let c of emoji) {
    let code = codepoints(c);
    if (code) emojiCode.push(code);
  }

  if (emojiCode.length < 1) return null;

  return (
    <Image
      src={`https://twemoji.maxcdn.com/v/latest/svg/${emojiCode.join('-')}.svg`}
      height={size}
      width={size}
      alt={emoji}
      {...props}
    />
  );
};
