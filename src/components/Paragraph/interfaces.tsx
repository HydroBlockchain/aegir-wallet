export interface ParagraphProps {
  stylesCustom?: {};
  numberOfLines?: number;
  adjustsFontSizeToFit?: boolean;
  children: string | number | JSX.Element;
  ellipsizeMode?:
    | 'head'
    | 'tail'
    | 'clip'
    | 'middle';
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'srOnly'
    | 'button'
    | 'caption'
    | 'inherit'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
    | 'inputLabel1'
}