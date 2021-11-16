export type Children =
| null
| string
| boolean
| JSX.Element

export interface IfullWidthImage {
  ratio?: number;
  style?: object;
  widthWrapper?: number;
  source: { uri: string };
}