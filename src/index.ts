import { SutechEquipment } from "./sutechEquipment"
const { INFLUX_URL, INFLUX_TOKEN, REPEAT_INTERVAL, EQUIPMENT_PORT, EQUIPMENT_HOST } = require('./env')

const sutechEquipment = new SutechEquipment({
  port: EQUIPMENT_PORT,
  host: EQUIPMENT_HOST,
}, [
  {
    "dataCode": "press_spm",
    "plcAddress": "L58",
    "name": "분당 회전수(SPM)",
    "dataType": "B"
  },
  {
    "dataCode": "press_main_motor_current",
    "plcAddress": "L59",
    "name": "메인 모터 전류",
    "dataType": "B"
  },
  {
    "dataCode": "press_slide_motor_current",
    "plcAddress": "L60",
    "name": "슬라이드 모터 전류",
    "dataType": "B"
  },
  {
    "dataCode": "press_inverter_spm",
    "plcAddress": "L58",
    "name": "인버터 분당 회전수",
    "dataType": "B"
  },
  {
    "dataCode": "press_preset_counter",
    "plcAddress": "D4020",
    "name": "프레스 프리셋 카운트",
    "dataType": "B"
  },
  {
    "dataCode": "press_total_counter",
    "plcAddress": "C12",
    "name": "프레스 토탈 카운트",
    "dataType": "B"
  },
  {
    "dataCode": "press_whole_counter",
    "plcAddress": "C10",
    "name": "프레스 누적 카운트",
    "dataType": "B"
  },
  {
    "dataCode": "press_preset_limit_counter",
    "plcAddress": "L35",
    // 3번째 비트를 써야함
    "bitIndex": 3,
    "name": "프레스 프리셋 리밋",
    "dataType": "B"
  },
  {
    "dataCode": "press_safety_one_cycle_slip_angle",
    "plcAddress": "L33",
    "name": "크랭크 슬립각",
    "dataType": "B"
  },
  {
    "dataCode": "press_key_cam",
    "plcAddress": "M75",
    // TODO: 별도 Parser가 필요함 제스텍과 형식 맞추기 위해
    "name": "키캠값",
    "dataType": "B"
  },
  {
    "dataCode": "press_run_ready",
    "plcAddress": "M60",
    "name": "운전 준비 상태 여부",
    "dataType": "B"
  },
  {
    "dataCode": "press_run_ok",
    "plcAddress": "M70",
    "name": "운전 가능 상태 여부",
    "dataType": "B"
  },
  {
    "dataCode": "press_motor_vector",
    "plcAddress": "D4521",
    "name": "모터 방향",
    "dataType": "B"
  },
  {
    "dataCode": "press_error_number",
    "plcAddress": "F50",
    // TODO: 별도 Parser가 필요함 제스텍과 형식 맞추기 위해
    "name": "에러 번호",
    "dataType": "B"
  }
])

// async function run() {
setInterval(async () => {
  await sutechEquipment.scan()
  console.log(sutechEquipment.getMemory())
  // writeInflux(sutechEquipment.getMemory())
}, REPEAT_INTERVAL)
