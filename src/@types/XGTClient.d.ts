// import { NetConnectOpts } from 'net';

declare module "XGTClient" {
  export enum XGTDataType {
    'bit',
    'byte',
    'word',
    'dword',
    'lword',
    'seq'
  }

  export type XGTArea = 'P' | 'M' | 'L' | 'F' | 'K' | 'C' | 'D' | 'T' | 'N' | 'R'
  export type XGTAddressType = `${XGTArea}${number}`

  export interface XGTClientConfig {
    port: number
    host: string
    equipmentName?: string
  }

}
