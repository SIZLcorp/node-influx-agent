import { XGTClientConfig, XGTAddressType } from "XGTClient";
import { InfluxClientConfig, InfluxDataType, InfluxCamField, InfluxPressDataField } from "InfluxClient";

declare module "SutechAgent" {
  export interface SutechEquipmentConfig extends XGTClientConfig {
    equipmentCode: string
  }

  export interface SutechAgentConfig {
    equipmentConfig: SutechEquipmentConfig
    influxConfig: InfluxClientConfig
  }

  export interface SutechConfigItem {
    plcAddress: XGTAddressType
    name: string
    dataCode: InfluxCamField | InfluxPressDataField
    dataType: InfluxDataType
  }

}

// [
//   {
//     "plcAddress": "P0",
//     "name": "출력 캠 6번 on/off 상태",
//     "dataCode": "press_out_cam_6_enable_state",
//     "dataType": "integer"
//   }
// ]