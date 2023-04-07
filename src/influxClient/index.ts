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
    if (data.press_run_ready !== null && data.press_run_ready !== undefined) {
      result.press_run_ready = data.press_run_ready ? 1 : 0
    }
    if (data.press_run_ok !== null && data.press_run_ok !== undefined) {
      result.press_run_ok = data.press_run_ok ? 1 : 0
    }
    if (data.press_motor_state !== null && data.press_motor_state !== undefined) {
      result.press_motor_state = data.press_motor_state ? 1 : 0
    }
    if (data.press_run_state !== null && data.press_run_state !== undefined) {
      result.press_run_state = data.press_run_state ? 1 : 0
    }

    data.press_whole_counter = this.mergeWord(data.press_whole_counter_lower || 0, data.press_whole_counter_upper || 0)

    return result
  }

  mergeWord(lower: number, upper: number): number {
    const buf = Buffer.allocUnsafe(4);

    buf.writeUInt16LE(lower, 0);
    // Writing the value to the buffer from 4 offset
    buf.writeUInt16LE(upper, 2);

    return buf.readUInt32LE(0)
  }

  // 데이터 입력
  async write(inp: EquipmentScanResult): Promise<void> {
    const data = this.convert(inp)

    const writeApi = this.influxInstance.getWriteApi(INFLUX_ORG, INFLUX_BUCKET, 'ns')
    console.log("write", data);

    const point1 = new Point('param_data')
      .tag('company', COMPANY_CODE)
      .tag('machine_code', MACHINE_CODE)
      .intField('version', 1)
      .stringField('manufacturer', 'sutech')

    if (data.press_spm !== null && data.press_spm !== undefined) {
      point1.floatField('press_spm', data.press_spm)
    }
    if (data.press_angle !== null && data.press_angle !== undefined) {
      point1.floatField('press_angle', data.press_angle)
    }
    if (data.press_main_motor_current !== null && data.press_main_motor_current !== undefined) {
      point1.floatField('press_main_motor_current', data.press_main_motor_current)
    }
    if (data.press_slide_motor_current !== null && data.press_slide_motor_current !== undefined) {
      point1.floatField('press_slide_motor_current', data.press_slide_motor_current)
    }
    // 'press_inverter_spm'
    if (data.press_inverter_spm !== null && data.press_inverter_spm !== undefined) {
      point1.floatField('press_inverter_spm', data.press_inverter_spm)
    }
    // 'press_preset_counter'
    if (data.press_preset_counter !== null && data.press_preset_counter !== undefined) {
      point1.floatField('press_preset_counter', data.press_preset_counter)
    }
    // 'press_total_counter'
    if (data.press_total_counter !== null && data.press_total_counter !== undefined) {
      point1.floatField('press_total_counter', data.press_total_counter)
    }
    // 'press_whole_counter'
    if (data.press_whole_counter !== null && data.press_whole_counter !== undefined) {
      point1.floatField('press_whole_counter', data.press_whole_counter)
    }
    // 'press_preset_limit_counter'
    if (data.press_preset_limit_counter !== null && data.press_preset_limit_counter !== undefined) {
      point1.floatField('press_preset_limit_counter', data.press_preset_limit_counter)
    }
    // 'cycle_index'
    if (data.cycle_index !== null && data.cycle_index !== undefined) {
      point1.floatField('cycle_index', data.cycle_index)
    }
    // 'press_safety_one_cycle_stop_angle'
    if (data.press_safety_one_cycle_stop_angle !== null && data.press_safety_one_cycle_stop_angle !== undefined) {
      point1.floatField('press_safety_one_cycle_stop_angle', data.press_safety_one_cycle_stop_angle)
    }
    // 'press_safety_one_cycle_slip_angle'
    if (data.press_safety_one_cycle_slip_angle !== null && data.press_safety_one_cycle_slip_angle !== undefined) {
      point1.floatField('press_safety_one_cycle_slip_angle', data.press_safety_one_cycle_slip_angle)
    }
    // 'press_key_cam'
    if (data.press_key_cam !== null && data.press_key_cam !== undefined) {
      point1.floatField('press_key_cam', data.press_key_cam)
    }
    // 'press_run_ready'
    if (data.press_run_ready !== null && data.press_run_ready !== undefined) {
      point1.floatField('press_run_ready', data.press_run_ready)
    }
    // 'press_run_ok'
    if (data.press_run_ok !== null && data.press_run_ok !== undefined) {
      point1.floatField('press_run_ok', data.press_run_ok)
    }
    // 'press_motor_state'
    if (data.press_motor_state !== null && data.press_motor_state !== undefined) {
      point1.floatField('press_motor_state', data.press_motor_state)
    }
    // 'press_motor_vector'
    if (data.press_motor_vector !== null && data.press_motor_vector !== undefined) {
      point1.floatField('press_motor_vector', data.press_motor_vector)
    }
    // 'press_run_state'
    if (data.press_run_state !== null && data.press_run_state !== undefined) {
      point1.floatField('press_run_state', data.press_run_state)
    }
    // 'press_error_number'
    if (data.press_error_number !== null && data.press_error_number !== undefined) {
      point1.floatField('press_error_number', data.press_error_number)
    }
    // 'press_slide_top_position'
    if (data.press_slide_top_position !== null && data.press_slide_top_position !== undefined) {
      point1.floatField('press_slide_top_position', data.press_slide_top_position)
    }
    // 'press_operator_run_time'
    if (data.press_operator_run_time !== null && data.press_operator_run_time !== undefined) {
      point1.stringField('press_operator_run_time', data.press_operator_run_time)
    }
    // 'press_operator_stop_time'
    if (data.press_operator_stop_time !== null && data.press_operator_stop_time !== undefined) {
      point1.stringField('press_operator_stop_time', data.press_operator_stop_time)
    }


    writeApi.writePoint(point1)
    await writeApi.flush()
  }

}
