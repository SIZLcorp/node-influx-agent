import { SutechConfigItem } from './sutechEquipment'

export const mappingSetting: SutechConfigItem[] = [
  {
    'dataCode': 'press_key_cam_inching',
    'plcAddress': 'M21',
    'bitIndex': 1,
    'name': '키캠값',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_key_cam_one_cycle',
    'plcAddress': 'M21',
    'bitIndex': 2,
    'name': '키캠값',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_key_cam_continue',
    'plcAddress': 'M21',
    'bitIndex': 3,
    'name': '키캠값',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_key_cam_slide',
    'plcAddress': 'M21',
    'bitIndex': 0,
    'name': '키캠값',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_spm',
    'plcAddress': 'L67',
    'name': '분당 회전수(SPM)',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_main_motor_current',
    'plcAddress': 'L59',
    'name': '메인 모터 전류',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_slide_motor_current',
    'plcAddress': 'L60',
    'name': '슬라이드 모터 전류',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_inverter_spm',
    'plcAddress': 'L67',
    'name': '인버터 분당 회전수',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_preset_counter',
    'plcAddress': 'C10',
    'name': '프레스 프리셋 카운트',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_total_counter',
    'plcAddress': 'C12',
    'name': '프레스 토탈 카운트',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_whole_counter_1',
    'plcAddress': 'C14',
    'name': '프레스 누적 카운트(lower)',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_whole_counter_2',
    'plcAddress': 'C15',
    'name': '프레스 누적 카운트(upper)',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_whole_counter_3',
    'plcAddress': 'C16',
    'name': '프레스 누적 카운트(lower)',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_whole_counter_4',
    'plcAddress': 'C17',
    'name': '프레스 누적 카운트(upper)',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_preset_limit_counter',
    'plcAddress': 'D4020',
    'name': '프레스 프리셋 리밋',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_safety_one_cycle_slip_angle',
    'plcAddress': 'L33',
    'name': '크랭크 슬립각',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_run_ready',
    'plcAddress': 'M006',
    'bitIndex': 0,
    'name': '운전 준비 상태 여부',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_run_ok',
    'plcAddress': 'M007',
    'bitIndex': 0,
    'name': '운전 가능 상태 여부',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_motor_vector',
    'plcAddress': 'D4521',
    'name': '모터 방향',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_error_number',
    'plcAddress': 'F50',
    // TODO: 별도 Parser가 필요함 제스텍과 형식 맞추기 위해
    'name': '에러 번호',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_motor_state',
    'plcAddress': 'M000',
    'bitIndex': 0,
    'name': '모터 상태값',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_run_state',
    'plcAddress': 'M10',
    'bitIndex': 0,
    'name': '운전 상태',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_safety_one_cycle_stop_angle',
    'plcAddress': 'L31',
    'name': '크랭크 멈춤각',
    'dataType': 'B',
  },
  // {
  //   "dataCode": "press_temperature_value_1",
  //   "plcAddress": "",
  //   "name": "온도(6개)",
  //   "dataType": "B"
  // },
  {
    'dataCode': 'press_angle',
    'plcAddress': 'L61',
    'name': '크랭크 각도',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_operator_run_time',
    'plcAddress': 'C25',
    // TODO: 시간 형식 읽을 수 있어야 함
    'name': '프레스 크랭크 가동시간',
    'dataType': 'B',
  },
  {
    'dataCode': 'press_operator_stop_time',
    'plcAddress': 'C28',
    // TODO: 시간 형식 읽을 수 있어야 함
    'name': '유휴시간',
    'dataType': 'B',
  },
]
