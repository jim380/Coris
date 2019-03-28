export interface Tag {
  key: string,
  value: string
}


export interface Tx {
  hash: string;
  height: number;
  gasWanted: number;
  gasUsed: number;
  txBase64: string;
  txDecod: string;
  tagsBase64: Array<Tag>;
  tagsDecod: Array<Tag>;
}