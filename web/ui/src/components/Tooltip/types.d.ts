export type TooltipProps = {
  children: React.ReactNode;
  className?: string;
  tooltipClassName?: string;
  text: string | React.ReactNode;
  subText?: string | React.ReactNode;
  showArrow?: boolean;
  size?: 'xs' | 'sm' | 'md';
  color?: 'red' | 'orange' | 'green' | 'info' | 'black' | 'fuchsia';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  allowInteractions?: boolean;
};

type TooltipComponent = (props: TooltipProps) => JSX.Element;
