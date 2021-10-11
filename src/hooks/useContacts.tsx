import React, { useEffect, useState } from 'react';

import CryptoJS from 'crypto-js';
import { v5 as uuidV5 } from 'uuid';
import * as SecureStore from 'expo-secure-store';

/* utils */
import { httpClient } from '../api';
import {
  IContacts,
  IupdateContactsReturn,
  IupdateContactsPostData,
  IupdateContactsResponse,
} from '../interfaces/IContacts';
import { getContactBookIPFS } from '../libs/IPFS';

import {
  PASSPHRASE_IPFS,
  CONTACT_BOOK_CID,
  CONTACT_BOOK_FILENAME,
} from '../../constants';


const useContacts = () => {
  const [ contacts, setContacts ] = useState<IContacts>([]);

  useEffect(() => {
    (getContactBook()).then(contactBook => {
      contactBook && setContacts(contactBook);
    })
    .catch(error => {})
  }, [])

  const getContactBook = async () => {
    let result: IContacts = [];
    try {
      const cid =  await SecureStore.getItemAsync(CONTACT_BOOK_CID);
      const passphrase =  await SecureStore.getItemAsync(PASSPHRASE_IPFS);
      const filename =  await SecureStore.getItemAsync(CONTACT_BOOK_FILENAME);

      // If the passphrase or contact book (cid and filename) does not exist,
      // it is becauseit has not yet re-registered any contact
      if(!passphrase || !cid || !filename) return;

      result = await getContactBookIPFS({ cid, passphrase, filename });
    } catch(error) {
      console.log('error in getContactBook', error);
    }
    return result;
  }

  const updateContacts = async (data: IupdateContactsPostData): Promise<IupdateContactsReturn> => {
    try {
      let passphrase =  await SecureStore.getItemAsync(PASSPHRASE_IPFS);

      if(!passphrase) {
        passphrase = uuidV5(data.address, uuidV5.URL);
        SecureStore.setItemAsync(PASSPHRASE_IPFS, passphrase);
      }

      const contactBookEncrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data.contactBook), passphrase
      ).toString();

      const resp = await httpClient.post<IupdateContactsResponse>('/user/contacts', {
        address: data.address,
        contactBook: contactBookEncrypted,
      });

      const responseData = resp.data;

      if(responseData.status) {
        const { filename, cid } = responseData.data;
        SecureStore.setItemAsync(CONTACT_BOOK_CID, cid);
        SecureStore.setItemAsync(CONTACT_BOOK_FILENAME, filename);
      }

      setContacts(data.contactBook);

      return {
        status: responseData.status,
        message: responseData.message
      };
    } catch(error: any) {
      console.log('error in updateContacts', error);
      let message = error?.response?.data?.message ||
        'An unexpected error occurred. Please try again later'

      return {
        message,
        status: false
      }
    }
  }

  return {
    contacts,
    updateContacts
  }
}

export default useContacts;
