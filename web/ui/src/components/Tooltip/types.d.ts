export type TooltipProps = {
  children: React.ReactNode;
  className?: string;
  text: string | React.ReactNode;
  subText?: string | React.ReactNode;
  showArrow?: boolean = true;
  size?: 'xs' | 'sm' | 'md' = 'md';
  color?: 'red' | 'orange' | 'green' | 'info' | 'black' = 'black';
  direction?: 'top' | 'bottom' | 'left' | 'right';
};

type TooltipComponent = (props: TooltipProps) => JSX.Element;
