import { StyleProp, TextProps, TextStyle } from "react-native";
import { IconObject } from "react-native-elements/dist/icons/Icon";

export interface HeaderIcon extends IconObject {
  icon?: string;
  text?: string;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export type HeaderSubComponent = React.ReactElement<{}> | TextProps | HeaderIcon | undefined;

export interface HeaderProps {
  title?: string,
  variant?:
    | 'back'
    | 'default'
}