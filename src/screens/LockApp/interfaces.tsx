import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../interfaces/RootStackParams";

export interface IlockApp extends StackScreenProps<RootStackParams, 'LockApp'>{};

export type IauthType = 'password' | 'fingerprint';