import validate from 'bitcoin-address-validation';
import {ethers} from 'ethers';

export function validateQrAddress(str: string) {
  return ethers.utils.isAddress(str) || validate(str);
}
