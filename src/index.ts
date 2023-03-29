import { SutechEquipment } from "./sutechEquipment"

const sutechEquipment = new SutechEquipment({
  port: 2004,
  host: '192.168.100.110',
}, [{
  plcAddress: 'C10',
  name: "기계 전체 카운터",
  dataCode: "press_whole_counter",
  dataType: "B"
}
  //   , {
  //   plcAddress: 'C12',
  //   name: "전원 켜진 이후 토탈 카운터",
  //   dataCode: "press_total_counter",
  //   dataType: "B"
  // }, {
  //   plcAddress: 'D4020',
  //   name: "프리셋 카운터(셋팅 카운터)",
  //   dataCode: "press_preset_counter",
  //   dataType: "B"
  // }, {
  //   plcAddress: 'M60',
  //   name: "운전 준비 완료",
  //   dataCode: "press_run_ready",
  //   dataType: "B"
  // }
])

async function run() {
  await sutechEquipment.scan()

  console.log(sutechEquipment.getMemory())
}

run()