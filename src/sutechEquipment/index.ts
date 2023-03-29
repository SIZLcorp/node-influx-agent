// 수테크 장비를 모킹함, 장비 내의 메모리맵들 최신값 유지할 수 있도록

// 메모리 맵 설정


// f) 데이터 취득 시작 함수
//  데이터 취득 시작 시각 기록
//  루프돌면서, 각 메모리 값들 읽어오기
//  루프 끝나면 데이터 취득 종료

//  q:아직 작동중에 다시 데이터 취득 요청한다면?
//    a:일단 무시..

// f) 리셋 함수
// f) 모아진 데이터 출력 함수
// 인플럭스쪽에서 데이터 출력값 가지고 인플럭스 입력값 만들어야 한다.

// const memoryMap = {
//   PRODUCT_NUM: {
//     describe: '생산량',
//     type: 'int',
//     address: 'c10'
//   }
// }
import { XGTClient } from '../xgtClient'
import { XGTAddressType, XGTClientConfig, XGTDataTypeChar } from 'XGTClient'
import { InfluxCamField, InfluxPressDataField, InfluxDataType } from 'InfluxClient'
// import { SutechConfigItem } from "SutechAgent"

export interface SutechConfigItem {
  plcAddress: XGTAddressType
  name: string
  dataCode: InfluxCamField | InfluxPressDataField
  dataType: XGTDataTypeChar
}

export class SutechEquipment {
  xgtClient: XGTClient
  memoryMap: SutechConfigItem[]
  memory: any
  constructor(config: XGTClientConfig, memoryMap: SutechConfigItem[]) {
    this.xgtClient = XGTClient.getInstance(config)
    this.memoryMap = memoryMap
    this.reset()
  }
  async scan() {
    // TODO: 메모리 맵 보고 하나씩 읽어오기

    // memoryMap iteration (Async)
    await this.memoryMap.forEach(async (item) => {
      const data = await this.xgtClient.readData(item.plcAddress, item.dataType)
      this.memory = {
        ...this.memory,
        [item.dataCode]: data
      }
    })
  }
  reset() {
    this.memory = {
    }
    // 메모리 맵 보고 초기화
    this.memoryMap.forEach((item) => {
      this.memory = {
        ...this.memory,
        [item.dataCode]: null
      }
    })
  }
  getMemory() {
    return this.memory
  }
}

const xgtClient = XGTClient.getInstance({
  port: 2004,
  host: '192.168.100.110'
})

async function run() {
  const total_count = await xgtClient.readData('C12', 'B')
  const press_acc_count = await xgtClient.readData('C10', 'B')
  const preset_count = await xgtClient.readData('D4020', 'B')
  const ready_status = await xgtClient.readData('M60', 'B')

  console.log({
    total_count,
    press_acc_count,
    preset_count,
    ready_status
  })
}


run()