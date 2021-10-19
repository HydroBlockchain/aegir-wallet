import { TypeToast } from '../../components/ToastCustom/interfaces';

export interface ToastState {
  text: string;
  type: TypeToast;
  visible: boolean;
}