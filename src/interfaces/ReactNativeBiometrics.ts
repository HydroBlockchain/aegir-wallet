export type BiometryType = 'TouchID' | 'FaceID' | 'Biometrics';

export interface IsSensorAvailableResult {
  error?: string;
  available: boolean;
  biometryType?: BiometryType;
}

export interface SimplePromptOptions {
  promptMessage?: string;
  cancelButtonText?: string;
  promptDescription?: string;
}

export interface SimplePromptResult {
  success: boolean
  error?: string
}