import validate from 'bitcoin-address-validation';
import { ethers } from 'ethers';
import { IvalidateContractAddress } from '../../interfaces/Ivalidations';
import Web3Service from '../Web3Service';

export function validateQrAddress(str: string) {
  return ethers.utils.isAddress(str) || validate(str);
}


export function validateAddress(address: string) {
  return (address && ethers.utils.isAddress(address));
}

export async function validateContractAddress({ address, network }: IvalidateContractAddress) {
  try {
    if (!validateAddress(address)) return false;

    const web3Service = new Web3Service();

    let byteCode = '0x';

    if (network === 'ETH' && web3Service.web3) {
      byteCode = await web3Service.web3.eth.getCode(address);
    }

    if (network === 'BSC' && web3Service.web3BSC) {
      byteCode = await web3Service.web3BSC.eth.getCode(address);
    }

    console.log('byteCode', byteCode);
    if(byteCode !== '0x') return true;

  } catch (error) {
    console.log('error in validateContractAddress: ', error);
  }
  return false;
}