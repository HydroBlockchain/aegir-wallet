import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../interfaces/RootStackParams';

export interface AddNFTParam extends StackScreenProps<RootStackParams, 'AddNFT'>{};
export interface SendNFTParam extends StackScreenProps<RootStackParams, 'SendNFT'>{};
export interface ListNFTParam extends StackScreenProps<RootStackParams, 'ListNFT'>{};
export interface ViewNFTParam extends StackScreenProps<RootStackParams, 'ViewNFT'>{};