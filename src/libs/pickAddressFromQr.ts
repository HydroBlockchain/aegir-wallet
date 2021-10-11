import validate from 'bitcoin-address-validation';
import {ethers} from 'ethers';

export const pickAddressFromQr = (str: string): string => {
  const splittedData = str.split(':');
  let value = '';
  if (splittedData[0] === 'ethereum') {
    if (ethers.utils.isAddress(splittedData[1])) {
      value = splittedData[1];
    }
  } else if (splittedData[0] === 'bitcoin') {
    if (validate(splittedData[1].split('?')[0])) {
      value = splittedData[1].split('?')[0];
    }
  } else {
    if (ethers.utils.isAddress(splittedData[0])) {
      value = splittedData[0];
    }
  }
  return value;
};
