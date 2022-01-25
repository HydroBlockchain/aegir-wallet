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
  title: string;
  id: string | number;
  onPress?: () => void;
}

export interface ISelectInput extends InputBase {
  options?: IOption[];
  selectedDefault?: IOption | null;
  onChange?: (item: IOption) => any;
}

type IautoCapitalize =
  | 'none'
  | 'words'
  | 'sentences'
  | 'characters'

export interface TextInputCustomProps extends InputBase {
  icon?: string;
  iconStyle?: {};
  propsIcon?: {};
  value?: string;
  editable?: boolean;
  multiline?: boolean;
  iconType?: IiconType;
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: IautoCapitalize;
  keyboardType?: KeyBoardTypeOption;
  stylesCustom?: {
    input?: {};
    wrapper?: {};
    wrapperInput?: {};
  };
  errorMsg?: string;
  onBlur?: () => void | undefined;
  onChangeText?: (value: string) => void | undefined;
  onIconClick?: () => void | Promise<void> | undefined;
}

export type IiconType =
  | 'default'
  | 'MaterialCommunityIcons';

export interface ItextInputIcon {
  icon: string;
  iconStyle: {};
  propsIcon: {};
  iconType: IiconType;
  onIconClick: () => void | undefined;
}