import { NetConnectOpts } from 'net';

declare module "XGTClient" {
  export enum XGTDataType {
    'bit',
    'byte',
    'word',
    'dword',
    'lword',
    'seq'
  }

  export type XGTArea = 'c' | 'd' | 'w' | 'x' | 'y' | 'z' | 't' | 's' | 'm' | 'l' | 'f' | 'v' | 'b' | 'r'
  export type XGTAddressType = `${XGTArea}${number}`

  interface XGTClientConfig extends NetConnectOpts {

  }

}
