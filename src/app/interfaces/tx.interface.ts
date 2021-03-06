export interface Tag {
  key: string,
  value: string
}


export interface Tx {
  hash?: string;
  height?: number;
  gasWanted?: number;
  gasUsed?: number;
  txBase64?: string;
  txDecod?: string;
  tagsBase64?: Array<Tag>;
  tagsDecod?: Array<Tag>;
  details?: Object;
  status?: string;
  tags?: Object;
  error?: any;
  fee?: any;
  memo?: string;
  msg?: any;
  action?: any[];
}

export function decodeTag (tagsBase64) {
  return ({
    key: atob(tagsBase64.key),
    value: atob(tagsBase64.value).replace(/_/g, ' ')
  })
}