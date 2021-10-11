import React, { useEffect, useState } from 'react';

import CryptoJS from 'crypto-js';
import { v5 as uuidV5 } from 'uuid';
import * as SecureStore from 'expo-secure-store';

/* utils */
import { httpClient } from '../api';
import { getCollectiblesIPFS, serializeTokenURI } from '../libs/IPFS';
import {IupdateCollectibleResponse } from '../interfaces/Icollectibles';

import {
  PASSPHRASE_IPFS,
  COLLECTIBLES_CID,
  COLLECTIBLES_FILENAME,
} from '../../constants';
import {
  ICollectibles,
  IupdateCollectibleReturn,
  IupdateCollectiblePostData,
} from '../interfaces/Icollectibles';


const useCollectible = () => {
  const [ collectibles, setCollectibles ] = useState<ICollectibles>([]);

  useEffect(() => {
    (getCollectibles()).then(data => {
      data && setCollectibles(data);
    })
    .catch(error => {})
  }, [])

  const getCollectibles = async () => {
    let result: ICollectibles = [];
    try {
      const cid =  await SecureStore.getItemAsync(COLLECTIBLES_CID);
      const filename =  await SecureStore.getItemAsync(COLLECTIBLES_FILENAME);
      const passphrase =  await SecureStore.getItemAsync(PASSPHRASE_IPFS);

      // If the passphrase or collectibles (cid and filename) does not exist,
      // it is becauseit has not yet re-registered any contact
      if(!passphrase || !cid || !filename) return;

      const rawData = await getCollectiblesIPFS({ cid, passphrase, filename });

      if(rawData) {
        result = await serealizeCollectibles(rawData);
      }

    } catch(error) {
      console.log('error in getContactBook', error);
    }
    return result;
  }

  const refresCollectiblesUri = async () => {
    try {
      const result = await serealizeCollectibles(collectibles);
      setCollectibles(result);
    } catch(e) {}
  }

  const serealizeCollectibles = async (rawData: ICollectibles) => {
    let result: ICollectibles = [];

    try {
      const collectiblesPromises = rawData.map(async (nft) => {
        try {
          if(nft.tokenURI?.startsWith('http')) return nft;

          const tokenURI = await serializeTokenURI(nft.tokenURI);
          return {
            ...nft,
            tokenURI
          }
        } catch(error) {
          console.log('error in useCoolectible rawData.map', error);
          return {
            ...nft,
            tokenURI: null
          };
        }
      });

      result = await Promise.all(collectiblesPromises)
    } catch(error) {}
    return result;
  }

  const updateCollectibles = async (
    data: IupdateCollectiblePostData
  ): Promise<IupdateCollectibleReturn> => {
    try {
      let passphrase =  await SecureStore.getItemAsync(PASSPHRASE_IPFS);

      if(!passphrase) {
        passphrase = uuidV5(data.address, uuidV5.URL);
        SecureStore.setItemAsync(PASSPHRASE_IPFS, passphrase);
      }

      const collectiblesEncrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data.collectibles), passphrase
      ).toString();

      const resp = await httpClient.post<IupdateCollectibleResponse>('/user/collectibles', {
        address: data.address,
        collectibles: collectiblesEncrypted,
      });

      const responseData = resp.data;

      if(responseData.status) {
        const { filename, cid } = responseData.data;
        SecureStore.setItemAsync(COLLECTIBLES_CID, cid);
        SecureStore.setItemAsync(COLLECTIBLES_FILENAME, filename);
      }

      setCollectibles(await serealizeCollectibles(data.collectibles));

      return {
        status: responseData.status,
        message: responseData.message
      };
    } catch(error: any) {
      console.log('error in useCollectible', error);
      let message = error?.response?.data?.message ||
        'An unexpected error occurred. Please try again later'

      return {
        message,
        status: false
      }
    }
  }

  return {
    collectibles,
    updateCollectibles,
    refresCollectiblesUri,
  }
}

export default useCollectible;
