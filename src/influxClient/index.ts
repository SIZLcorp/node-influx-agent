import {InfluxClientConfig} from "InfluxClient";
import {InfluxDB, Point} from '@influxdata/influxdb-client'
import {COMPANY_CODE, INFLUX_BUCKET, INFLUX_ORG, INFLUX_TOKEN, INFLUX_URL, MACHINE_CODE} from '../env'
import {EquipmentScanResult} from "SutechEquipment";
import Debug from "debug"

const debug = Debug("su-agent:influx")

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
    if (data.press_operator_run_time !== null && data.press_operator_run_time !== undefined) {
      result.press_operator_run_time = this.convertSecondToHms(data.press_operator_run_time)
    }
    if (data.press_operator_stop_time !== null && data.press_operator_stop_time !== undefined) {
      result.press_operator_stop_time = this.convertSecondToHms(data.press_operator_stop_time)
    }

    result.press_key_cam = this.getKeyCam(data.press_key_cam_inching || 0, data.press_key_cam_one_cycle || 0,
        data.press_key_cam_continue || 0, data.press_key_cam_slide || 0)
    result.press_whole_counter = this.mergeWord(data.press_whole_counter_1 || 0, data.press_whole_counter_2 || 0,
        data.press_whole_counter_3 || 0,data.press_whole_counter_4 || 0)
    return result
  }

  mergeWord(first: number, second: number, third: number, last: number): bigint {
    const buf = Buffer.allocUnsafe(8);

    buf.writeUint16LE(first, 0);
    buf.writeUInt16LE(second, 2);
    buf.writeUInt16LE(third, 4);
    buf.writeUInt16LE(last, 6);

    return buf.readBigUInt64LE(0)
  }

  convertSecondToHms(second:string): string {
    const seconds = parseInt(second);
    const [mins, secs] = [Math.floor(seconds / 60), seconds % 60];
    const [hrs, mins2] = [Math.floor(mins / 60), mins % 60];
    return `${hrs.toString().padStart(2, '0')}:${mins2.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  getKeyCam(inching: number, oneCycle: number, camContinue: number, slide: number) {
    if (inching == 1)
      return 1;
    if (oneCycle == 1)
      return 2;
    if (camContinue == 1)
      return 3;
    if (slide == 1)
      return 4;
    return 0;
  }

  // 데이터 입력
  async write(inp: EquipmentScanResult): Promise<void> {
    const data = this.convert(inp)
    const writeDebug = debug.extend("write")
    const writeApi = this.influxInstance.getWriteApi(INFLUX_ORG, INFLUX_BUCKET, 'ns')
    // writeDebug("write", data);

    const point1 = new Point('press_data')
      .tag('company', COMPANY_CODE)
      .tag('machine_code', MACHINE_CODE)
      .intField('version', 1)
      .stringField('manufacturer', 'sutech')

    if (data.press_spm !== null && data.press_spm !== undefined) {
      point1.intField('press_spm', data.press_spm)
    }
    if (data.press_angle !== null && data.press_angle !== undefined) {
      point1.intField('press_angle', data.press_angle)
    }
    if (data.press_main_motor_current !== null && data.press_main_motor_current !== undefined) {
      point1.floatField('press_main_motor_current', data.press_main_motor_current)
    }
    if (data.press_slide_motor_current !== null && data.press_slide_motor_current !== undefined) {
      point1.floatField('press_slide_motor_current', data.press_slide_motor_current)
    }
    // 'press_inverter_spm'
    if (data.press_inverter_spm !== null && data.press_inverter_spm !== undefined) {
      point1.intField('press_inverter_spm', data.press_inverter_spm)
    }
    // 'press_preset_counter'
    if (data.press_preset_counter !== null && data.press_preset_counter !== undefined) {
      point1.intField('press_preset_counter', data.press_preset_counter)
    }
    // 'press_total_counter'
    if (data.press_total_counter !== null && data.press_total_counter !== undefined) {
      point1.intField('press_total_counter', data.press_total_counter)
    }
    // 'press_whole_counter'
    if (data.press_whole_counter !== null && data.press_whole_counter !== undefined) {
      point1.intField('press_whole_counter', data.press_whole_counter)
    }
    // 'press_preset_limit_counter'
    if (data.press_preset_limit_counter !== null && data.press_preset_limit_counter !== undefined) {
      point1.intField('press_preset_limit_counter', data.press_preset_limit_counter)
    }
    // 'cycle_index'
    if (data.cycle_index !== null && data.cycle_index !== undefined) {
      point1.floatField('cycle_index', data.cycle_index)
    }
    // 'press_safety_one_cycle_stop_angle'
    if (data.press_safety_one_cycle_stop_angle !== null && data.press_safety_one_cycle_stop_angle !== undefined) {
      point1.intField('press_safety_one_cycle_stop_angle', data.press_safety_one_cycle_stop_angle)
    }
    // 'press_safety_one_cycle_slip_angle'
    if (data.press_safety_one_cycle_slip_angle !== null && data.press_safety_one_cycle_slip_angle !== undefined) {
      point1.intField('press_safety_one_cycle_slip_angle', data.press_safety_one_cycle_slip_angle)
    }
    // 'press_key_cam'
    if (data.press_key_cam !== null && data.press_key_cam !== undefined) {
      point1.intField('press_key_cam', data.press_key_cam)
    }
    // 'press_run_ready'
    if (data.press_run_ready !== null && data.press_run_ready !== undefined) {
      point1.intField('press_run_ready', data.press_run_ready)
    }
    // 'press_run_ok'
    if (data.press_run_ok !== null && data.press_run_ok !== undefined) {
      point1.intField('press_run_ok', data.press_run_ok)
    }
    // 'press_motor_state'
    if (data.press_motor_state !== null && data.press_motor_state !== undefined) {
      point1.intField('press_motor_state', data.press_motor_state)
    }
    // 'press_motor_vector'
    if (data.press_motor_vector !== null && data.press_motor_vector !== undefined) {
      point1.intField('press_motor_vector', data.press_motor_vector)
    }
    // 'press_run_state'
    if (data.press_run_state !== null && data.press_run_state !== undefined) {
      point1.intField('press_run_state', data.press_run_state)
    }
    // 'press_error_number'
    if (data.press_error_number !== null && data.press_error_number !== undefined) {
      point1.intField('press_error_number', data.press_error_number)
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
    writeDebug("write", point1);

    writeApi.writePoint(point1)
    await writeApi.flush()
  }

}
