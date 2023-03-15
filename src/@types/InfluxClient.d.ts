declare module "InfluxClient" {
  export interface InfluxClientConfig {
    url: string
    token: string
    org: string
    bucket: string
    username: string
    password: string
  }

  export enum InfluxDataType {
    'integer', 'float', 'string'
  }



  export enum InfluxCamField {
    'press_out_cam_6_enable_state',
  }

  export enum InfluxPressField {
    'manufacturer',
    'version',
    'protocol_type',
    'machine_code',
    'press_spm',
    'press_angle',
    'press_main_motor_current',
    'press_slide_motor_current',
    'press_inverter_spm',
    'press_preset_counter',
    'press_total_counter',
    'press_whole_counter',
    'press_preset_limit_counter',
    'press_temperature_value_1',
    'press_temperature_value_2',
    'press_temperature_value_3',
    'press_temperature_value_4',
    'press_temperature_value_5',
    'press_temperature_value_6',
    'press_temperature_value_7',
    'press_temperature_value_8',
    'press_safety_one_cycle_stop_angle',
    'press_safety_one_cycle_slip_angle',
    'press_key_cam',
    'press_run_ready',
    'press_run_ok',
    'press_motor_state',
    'press_motor_vector',
    'press_run_state',
    'press_error_number',
    'press_operator_run_',
    'press_operator_stop_',
    'press_in_1',
    'press_in_2',
    'press_in_3',
    'press_in_4',
    'press_in_5',
    'press_in_6',
    'press_in_7',
    'press_in_8',
    'press_in_9',
    'press_in_10',
    'press_in_11',
    'press_in_12',
    'press_in_13',
    'press_in_14',
    'press_in_15',
    'press_in_16',
    'press_in_17',
    'press_in_18',
    'press_in_19',
    'press_in_20',
    'press_in_21',
    'press_in_22',
    'press_in_23',
    'press_in_24',
    'press_in_25',
    'press_in_26',
    'press_in_27',
    'press_in_28',
    'press_in_29',
    'press_in_30',
    'press_in_31',
    'press_in_32',
    'press_in_33',
    'press_in_34',
    'press_in_35'
  }

  export interface InfluxCamData {
    // [InfluxCamField]: InfluxDataType
    manufacturer: string,
    press_out_cam_6_enable_state: number // 출력 캠 6번 on/off 상태
  }
}