export interface HeaderProps {
  title?: string,
  variant?:
    | 'back'
    | 'defuault'
}

type headerOptionType = {} | JSX.Element;

export interface headerOptionsType {
  containerStyle: {},
  leftComponent: headerOptionType,
  rightComponent: headerOptionType,
  centerComponent: headerOptionType,
  statusBarProps: object,
}
