export interface IvalidateOwnership {
  tokenId: string;
  address: string;
  network: 'ETH' | 'BSC';
  contractAddres: string;
}

export interface validateContractNFTAddressProps {
  address: string;
  network: 'ETH' | 'BSC';
}