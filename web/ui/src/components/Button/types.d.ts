export type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  color?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info'
    | 'black';
  size?: 'sm' | 'md' | 'lg' | 'xl';
};
