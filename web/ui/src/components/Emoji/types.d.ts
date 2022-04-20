import { ImageProps } from 'next/image';

// Props of EmojiWrapper
interface Props extends Omit<ImageProps, 'src' | 'width' | 'height' | 'alt'> {
  emoji: string;
  // Size of the svg rendered
  size?: number = '1em';
  className?: string;
}
