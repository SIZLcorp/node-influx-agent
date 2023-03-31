import { InfluxClientConfig } from "InfluxClient";
import { InfluxDB, Point, HttpError } from '@influxdata/influxdb-client'
import { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET, COMPANY_CODE, MACHINE_CODE } from '../env'
import { EquipmentScanResult } from "SutechEquipment";

export class InfluxClient {
  influxConfig: InfluxClientConfig;
  influxInstance: InfluxDB;
  constructor(influxConfig: InfluxClientConfig) {
    this.influxConfig = influxConfig;
    this.influxInstance = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN })
  }


  convert(data: EquipmentScanResult): EquipmentScanResult {
    let result = data
    // true, false 로 받는것 0, 1 로 변환해야함
    return result
  }

  // 데이터 입력
  write(inp: EquipmentScanResult): void {
    const data = this.convert(inp)

    const writeApi = this.influxInstance.getWriteApi(INFLUX_ORG, INFLUX_BUCKET, 'ns')
    console.log("write", data);

    // const point1 = new Point('param_data')
    //   .tag('version', '1.0')
    //   .tag('manufacturer', 'sutech')
    //   .tag('company', COMPANY_CODE)
    //   .tag('machine_code', MACHINE_CODE)

    // if (data.press_spm) {
    //   point1.floatField('press_spm', data.press_spm)
    // }
    // if (data.press_angle) {
    //   point1.floatField('press_angle', data.press_angle)
    // }
    // if (data.press_main_motor_current) {
    //   point1.floatField('press_main_motor_current', data.press_main_motor_current)
    // }
    // if (data.press_slide_motor_current) {
    //   point1.floatField('press_slide_motor_current', data.press_slide_motor_current)
    // }



    // writeApi.writePoint(point1)
  }

}
