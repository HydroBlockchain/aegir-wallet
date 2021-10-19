export type KeyBoardTypeOption =
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad';

export interface InputBase {
  label?: string;
  placeholder?: string;
}

export interface IOption {
  id: string;
  title: string;
  onPress?: () => void;
}

export interface ISelectInput extends InputBase {
  options?: IOption[];
  selectedDefault?: IOption | null;
  onChange?: (item: IOption) => any;
}

export interface TextInputCustomProps extends InputBase {
  icon?: string;
  iconStyle?: {};
  propsIcon?: {};
  value?: string;
  editable?: boolean;
  multiline?: boolean;
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyBoardTypeOption;
  stylesCustom?: {
    input?: {};
    wrapper?: {};
    wrapperInput?: {};
  };
  errorMsg?: string;
  onBlur?: () => void | undefined;
  onChangeText?: (value: string) => void | undefined;
  onIconClick?: () => void | undefined;
}