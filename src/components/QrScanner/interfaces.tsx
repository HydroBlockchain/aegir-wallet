export interface QrScannerProps {
  isShow: Boolean;
  onSuccess?: (value: string) => void | undefined;
  onClose?: () => void | undefined;
  onError?: () => void | undefined;
}
