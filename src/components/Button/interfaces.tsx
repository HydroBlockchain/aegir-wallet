export interface ButtonProps {
  variant?:
    | 'grey'
    | 'default'
    | 'outlined';
  text: string;
  styleText?: {};
  styleCustom?: {};
  onPress?: () => void;
}