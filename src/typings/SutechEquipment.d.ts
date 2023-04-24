declare module "SutechEquipment" {

  export interface EquipmentMemory {
    'press_spm'?: number, // 분당 회전 수
    'press_angle'?: number, // 각도
    'press_main_motor_current'?: number, // 메인 모터 전류, f
    'press_slide_motor_current'?: number, // 슬라이드 모터 전류, f
    'press_inverter_spm'?: number, // 인버터
    'press_preset_counter'?: number, // 프리셋 카운터(셋팅 카운터)
    'press_total_counter'?: number, // 전원 켜진 이후 토탈 카운터
    'press_whole_counter_1'?: number, // 기계 전체 카운터(lower word - 2bytes LE)
    'press_whole_counter_2'?: number, // 기계 전체 카운터(upper word - 2bytes LE)
    'press_whole_counter_3'?: number, // 기계 전체 카운터(lower word - 2bytes LE)
    'press_whole_counter_4'?: number, // 기계 전체 카운터(upper word - 2bytes LE)
    'press_whole_counter_5'?: number, // 기계 전체 카운터(lower word - 2bytes LE)
    'press_whole_counter'?: bigint, // 기계 전체 카운터(4bytes)
    'press_preset_limit_counter'?: number, // 셋팅 최대 카운터
    'cycle_index'?: number, // 행정 인덱스
    'press_safety_one_cycle_stop_angle'?: number, // 클러치 정지 각도, f
    'press_safety_one_cycle_slip_angle'?: number, // 클러치 밀림 각도, f
    'press_key_cam'?: number, // 키캠 상태
    'press_run_ready'?: number, // 운전 준비 완료
    'press_run_ok'?: number, // 가동 준비 완료
    'press_motor_state'?: number, // 모터 상태
    'press_motor_vector'?: number, // 모터 방향
    'press_run_state'?: number, // 운전 중 상태
    'press_error_number'?: number, //에러 값 (코드)
    'press_slide_top_position'?: number, // 슬라이드 최대 높이, f
    'press_operator_run_time'?: string, // 가동시간 "01:00:01"
    'press_operator_stop_time'?: string, // 비가동시간
  }

  export interface EquipmentScanResult extends EquipmentMemory {
    startAt: Date | null
    endAt: Date | null
  }
}