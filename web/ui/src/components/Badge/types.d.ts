export type BadgeProps = {
  color: BadgeColor;
  text?: string;
};

export type BadgeColor =
  | 'purple'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'red'
  | 'orange'
  | 'gray'
  | 'white'
  | 'black'
  | 'transparent';

export default BadgeProps;
