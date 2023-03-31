import { XGTClient } from '../xgtClient'
import { XGTAddressType, XGTClientConfig, XGTDataTypeChar } from 'XGTClient'
import { InfluxCamField, InfluxPressDataField } from 'InfluxClient'
import { EquipmentMemory, EquipmentScanResult } from 'SutechEquipment'
// import { SutechConfigItem } from "SutechAgent"
import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter { }

// 수테크 장비를 모킹함, 장비 내의 메모리맵들 최신값 유지할 수 있도록
export interface SutechConfigItem {
  plcAddress: XGTAddressType
  bitIndex?: number
  name: string
  dataCode: InfluxCamField | InfluxPressDataField
  dataType: XGTDataTypeChar
}

export class SutechEquipment {
  xgtClient: XGTClient
  memoryMap: SutechConfigItem[]
  startAt: Date | null = null
  endAt: Date | null = null
  isScanning: boolean = false
  memory: EquipmentMemory = {}
  myEmitter: MyEmitter;

  constructor(config: XGTClientConfig, memoryMap: SutechConfigItem[]) {
    this.xgtClient = XGTClient.getInstance(config)
    this.memoryMap = memoryMap
    this.reset()
    this.myEmitter = new MyEmitter();

  }
  async scan(): Promise<void> {
    //  q:아직 작동중에 다시 데이터 취득 요청한다면?
    //    a:일단 무시..
    if (this.isScanning) {
      return
    }

    // f) 데이터 취득 시작 함수
    //  데이터 취득 시작 시각 기록
    //  루프돌면서, 각 메모리 값들 읽어오기
    //  루프 끝나면 데이터 취득 종료

    this.startAt = new Date()
    this.isScanning = true
    // memoryMap iteration (Async)
    for (const item of this.memoryMap) {
      const data = await this.xgtClient.readData(item.plcAddress, item.dataType)

      let parsedData: number | boolean | string = data
      if (item.bitIndex !== undefined) {
        parsedData = data.toString(2).charAt(item.bitIndex) === '1'
      }
      this.memory = {
        ...this.memory,
        [item.dataCode]: parsedData
      }
    }
    this.isScanning = false
    this.myEmitter.emit('scanEnd', this.memory)
    this.endAt = new Date()
  }
  // f) 리셋 함수
  reset(): void {
    this.memory = {
    }
    this.isScanning = false
    this.startAt = null
    this.endAt = null
    // 메모리 맵 보고 초기화
    this.memoryMap.forEach((item) => {
      this.memory = {
        ...this.memory,
        [item.dataCode]: null
      }
    })
  }
  // f) 모아진 데이터 출력 함수
  // 인플럭스쪽에서 데이터 출력값 가지고 인플럭스 입력값 만들어야 한다.
  async getMemory(): Promise<EquipmentScanResult> {
    const self = this

    // 아직 스캔중이라면..?
    if (this.isScanning) {
      // 기달림..
      await new Promise((resolve, reject) => {
        self.myEmitter.once('scanEnd', (result: unknown) => {
          resolve(result)
        })
        // TODO: 타임아웃 처리
      })
    }

    return ({
      ...this.memory,
      startAt: this.startAt,
      endAt: this.endAt
    })

  }
}
