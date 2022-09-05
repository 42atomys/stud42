export type TooltipProps = {
  children: React.ReactNode;
  className?: string;
  text: string | React.ReactNode;
  subText?: string | React.ReactNode;
  showArrow?: boolean = true;
  size?: 'xs' | 'sm' | 'md' = 'md';
  color?: 'red' | 'orange' | 'green' | 'info' | 'black' | 'fuchsia' = 'black';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  allowInteractions?: boolean = false;
};

type TooltipComponent = (props: TooltipProps) => JSX.Element;
