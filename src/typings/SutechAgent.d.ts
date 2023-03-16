import { XGTClientConfig, XGTAddressType } from "XGTClient";
import { InfluxClientConfig, InfluxDataType, InfluxCamField, InfluxPressField } from "InfluxClient";

declare module "SutechAgent" {
  interface SutechEquipmentConfig extends XGTClientConfig {
    equipmentCode: string
  }

  interface SutechAgentConfig {
    equipmentConfig: SutechEquipmentConfig
    influxConfig: InfluxClientConfig
  }

  interface SutechConfigItem {
    plcAddress: XGTAddressType
    name: string
    dataCode: InfluxCamField | InfluxPressField
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