export type KeyBoardTypeOption = 
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad';

  export interface TextInputCustomProps {
    icon?: string;
    iconStyle?: {};
    propsIcon?: {};
    value?: string;
    label?: string;
    editable?: boolean;
    multiline?: boolean;
    placeholder?: string;
    autoCorrect?: boolean;
    secureTextEntry?: boolean;
    keyboardType?: KeyBoardTypeOption;
    stylesCustom?: {
      input?: {};
      wrapper?: {};
      wrapperInput?: {}
    };
    onBlur?: () => void | undefined;
    onChangeText?: (value: string) => void | undefined;
  }