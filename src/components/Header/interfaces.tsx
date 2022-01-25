export interface HeaderProps {
  title?: string,
  variant?:
    | 'back'
    | 'default'
}

type headerOptionType = {} | JSX.Element;

export interface headerOptionsType {
  containerStyle: {},
  leftComponent: headerOptionType,
  rightComponent: headerOptionType,
  centerComponent: headerOptionType,
  statusBarProps: object,
}
