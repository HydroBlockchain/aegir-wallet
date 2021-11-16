export interface ButtonProps {
  variant?:
    | 'grey'
    | 'default'
    | 'outlined';
  text: string;
  styleText?: {};
  styleCustom?: {};
  disable?: boolean;
  onPress?: () => void;
}