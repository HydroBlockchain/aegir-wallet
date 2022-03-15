import { ethers } from "ethers";
import Web3Service from '../Web3Service';
import { toLowerCaseEquals } from "../general";
import abiERC721 from "../../contracts/abiERC721";
import { ERC721Validator } from "@0xcert/erc721-validator";
import { IvalidateOwnership, validateContractNFTAddressProps } from '../../interfaces/IvalidateContractNFT';

const _0xcertAddress = '0xf176d7bcdD07f8e474877095870685Ef0CCcCb2D';

export async function validateContractNFTAddress(props: validateContractNFTAddressProps) {
  let result = false;
  const { address, network } = props;

  try {
    const web3Service = new Web3Service();
    if(!web3Service.web3 || !web3Service.web3BSC) return result;

    const web3 = network === 'ETH'
      ? web3Service.web3 : web3Service.web3BSC;

    if(network === 'BSC') {
      // TODO: Implement a validator for BSC
      return result;
    }

    if(!ethers.utils.isAddress(address)) return result;

    const validator = new ERC721Validator(web3, _0xcertAddress);
    const validationResult = await validator.basic(2, address);

    result = validationResult.result;
  } catch(error) {
    console.log('error in validateContractNFTAddress', error)
  }

  return result;
}

export async function validateOwnership({
  tokenId, contractAddres, address, network
}: IvalidateOwnership) {
  try {
    const web3 = new Web3Service();

    if(!web3.providerETH || !web3.providerBSC) return false;

    const provider = network === 'ETH' ? web3.providerETH : web3.providerBSC;

    const contract = new ethers.Contract(contractAddres, abiERC721, provider);

    const owner = await contract.ownerOf(parseInt(tokenId));
    const isOwner = toLowerCaseEquals(owner, address);
    return isOwner;
  } catch(error) {
    return false;
  }
}