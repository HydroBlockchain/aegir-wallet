export interface PreviewNFTProps {
  id: string;
  title?: string;
  hiddenButton?: boolean;
  imageUrl?: string | null;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}