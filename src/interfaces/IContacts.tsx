export interface IupdateContactsResponse {
  data: {
    cid: string;
    filename: string;
  };
  status: boolean;
  message: string;
}

export interface IupdateContactsReturn {
  status: boolean;
  message: string;
}


export interface IupdateContactsPostData {
  CID?: string;
  address: string;
  contactBook: IContacts;
}

export interface IContactData {
  name: string;
  note: string;
  address: string;
}

export type IContacts = IContactData[];

export interface IcontactsModal {
  data: IContacts,
  onChange?: (data: IContactData) => void;
}