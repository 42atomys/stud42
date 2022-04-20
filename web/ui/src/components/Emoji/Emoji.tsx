import Image from 'next/image';
import { Props } from './types';

/**
 * Emoji is a component that renders an emoji from unicode to
 * Twitter's emoji SVG file.
 */
export const Emoji = ({ emoji, size = 16, ...props }: Props) => {
  const emojiCode = emoji.codePointAt(0)?.toString(16);

  if (!emojiCode) return null;

  return (
    <Image
      src={`https://twemoji.maxcdn.com/v/latest/svg/${emojiCode}.svg`}
      height={size}
      width={size}
      alt={emoji}
      {...props}
    />
  );
};
