import CryptoJS from 'crypto-js';
import gatewaysIPFS from "./gatewaysIPFS";
import { timeoutFetch } from "../general";
import { IContacts } from '../../interfaces/IContacts';
import { ICollectibles } from '../../interfaces/Icollectibles';
import { IgetByCidAndFilenameProps } from "../../interfaces/IIPFS";

async function resolveGateway({ cid, filename, gateway }) {
  try {
    const URL_IPFS = `${gateway.value}${cid}/${filename}`;

    const res = await timeoutFetch({
      options: {
        method: 'GET',
        url: URL_IPFS,
      },
      timeout: 2000
    });

    return (res.status === 200) ? {
      gateway,
      data: res.data,
    } : null;

  } catch(e) {
    return null;
  }
}

function decrypDataIPFS(data: string, passphrase: string) {
  const decryptData = CryptoJS.AES.decrypt(data, passphrase)
  .toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptData) || [];
}

export async function getContactBookIPFS(
  { cid, filename, passphrase }: IgetByCidAndFilenameProps
): Promise<IContacts> {
  let result: IContacts = [];

  const ipfsGatewaysPromises = gatewaysIPFS.map(async (gateway) => {
    return resolveGateway({ gateway, filename, cid });
  });

  try {
    const ipfsGatewaysResolved = await Promise.all(ipfsGatewaysPromises);
    const encryptedData = (ipfsGatewaysResolved.find((el) => {
      return Boolean(el?.data?.data);
    }))?.data?.data ?? null;

    if(!encryptedData) return result;

    result = decrypDataIPFS(encryptedData, passphrase);

  } catch(error) {
    console.log('error in getContactBookIPFS', error);
  }

  return result;
}

export async function getCollectiblesIPFS(
  { cid, filename, passphrase }: IgetByCidAndFilenameProps
): Promise<ICollectibles> {
  let result: ICollectibles = [];

  const ipfsGatewaysPromises = gatewaysIPFS.map(async (gateway) => {
    return resolveGateway({ gateway, filename, cid });
  });

  try {
    const ipfsGatewaysResolved = await Promise.all(ipfsGatewaysPromises);
    const encryptedData = (ipfsGatewaysResolved.find((el) => {
      return Boolean(el?.data?.data);
    }))?.data?.data ?? null;

    if(!encryptedData) return result;

    result = decrypDataIPFS(encryptedData, passphrase);

  } catch(error) {
    console.log('error in getContactBookIPFS', error);
  }

  return result;
}

export async function serializeTokenURI(uri: string | null) {
  if(!uri || !isValidTokenURI(uri)) return null;
  let result: string | null = null;

  try {
    const [ cid, filename ] = uri.replace('ipfs://', '').split('/');

    const ipfsGatewaysPromises = gatewaysIPFS.map(async (gateway) => {
      return resolveGateway({ gateway, filename, cid });
    });

    const ipfsGatewaysResolved = await Promise.all(ipfsGatewaysPromises);
    const metadata = ipfsGatewaysResolved.find(el => {
      try {
        return (!!el && typeof el === 'object');
      } catch(error) {
        return false;
      }
    });

    if(!metadata) return result;

    if(metadata?.data?.image) {
      result = metadata.data.image.replace('ipfs://', metadata.gateway.value);
    }

  } catch(error) {
    console.log('error in serializeTokenURI', error);
  }

  return result;
}

export function isValidTokenURI(uri: string) {
  // he URI scheme for IPFS is simply ipfs://
  // An NFT smart contract should return an IPFS URI
  // to the assets and metadata associated with each token.
  return Boolean(uri?.startsWith('ipfs://') && uri?.endsWith('.json'))
}