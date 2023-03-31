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

  export interface XGTReadResponse {
    header: {
      company_id: string,
      plc_info: number,
      cpu_info: string,
      frame_dir: string,
      InvokeID: number,
      data_length: number,
      fenetPos: string,
    },
    body: {
      command: number,
      type: number,
      error_status: number,
      value: number,
      data_size: number,
      data: number
    }
  }
}
