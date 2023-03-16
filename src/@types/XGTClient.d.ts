// import { NetConnectOpts } from 'net';

declare module "XGTClient" {
  export type XGTDataType = 'bit' | 'byte' | 'word' | 'dword' | 'lword' | 'seq'
  export type XGTArea = 'P' | 'M' | 'L' | 'F' | 'K' | 'C' | 'D' | 'T' | 'N' | 'R'

  export type XGTAddressType = `${XGTArea}${number}`
  export type XGTDataTypeChar = 'X' | 'B' | 'W' | 'D' | 'L'
  export type XGTProtocolAddressType = `%${XGTArea}${XGTDataTypeChar}${number}`
  export interface XGTClientConfig {
    port: number
    host: string
    equipmentName?: string
  }

}
