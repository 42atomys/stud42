import { ImageProps } from 'next/image';

// Props of EmojiWrapper
interface Props extends Omit<ImageProps, 'alt' | 'src' | 'width' | 'height'> {
  // The emoji to display
  emoji: string;
  // Size of the svg rendered
  size?: number;
  // Container Class applied to the wrapper element. It's optional because it's
  // not needed by default. It's useful to add a class to the wrapper element
  // to style it. Exemple: Add margin arround the Emoji
  containerClassName?: string;
}
