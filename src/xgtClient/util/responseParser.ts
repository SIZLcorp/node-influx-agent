/** 
 * 응답 값을 분석하는 용도의 유틸리티 함수
 * 
 * 들어온 응답값을 규칙에 따라 파싱해보고 파싱된 결과를 로깅함으로써 빨리 파악할 수 있도록
 * */

import { XGTReadResponse } from 'XGTClient'
import { printHEXPretty, BufferSlicer } from '.'

export function parseReadResponse(buf: Buffer): XGTReadResponse {
  console.log('read response')
  const slicer = new BufferSlicer()

  console.warn(`<< PARSED RESPONSE`)
  // HEADER
  const company_id: Buffer = slicer.getSlice(buf, 10)
  const plc_info: Buffer = slicer.getSlice(buf, 2)
  const cpu_info: Buffer = slicer.getSlice(buf, 1)
  const frame_dir: Buffer = slicer.getSlice(buf, 1)
  const InvokeID: Buffer = slicer.getSlice(buf, 2)
  const data_length: Buffer = slicer.getSlice(buf, 2)
  const fenetPos: Buffer = slicer.getSlice(buf, 1)
  const reserved2: Buffer = slicer.getSlice(buf, 1)

  console.warn(`====HEADER====
COMPANY_ID\t\t${printHEXPretty(company_id)}\t ${company_id}
PLC_INFO\t\t${printHEXPretty(plc_info)}
CPU_INFO\t\t${printHEXPretty(cpu_info)}
FRAME_DIR\t\t${printHEXPretty(frame_dir)}
INVOKE_ID\t\t${printHEXPretty(InvokeID)}
LENGTH\t\t\t${printHEXPretty(data_length)} \t${data_length.readIntLE(0, data_length.length)}
FENET_POS\t\t${printHEXPretty(fenetPos)}
RESERVED2\t\t${printHEXPretty(reserved2)}`)


  // BODY
  const command: Buffer = slicer.getSlice(buf, 2)
  const type: Buffer = slicer.getSlice(buf, 2)
  const block: Buffer = slicer.getSlice(buf, 2)
  const error_status: Buffer = slicer.getSlice(buf, 2)
  const value: Buffer = slicer.getSlice(buf, 2)
  const data_size: Buffer = slicer.getSlice(buf, 2)
  const data: Buffer = buf.subarray(slicer.getPointer())

  console.warn(`====BODY====
명령어\t\t\t${printHEXPretty(command)}
데이터타입\t\t${printHEXPretty(type)}
예약영역\t\t${printHEXPretty(block)}
에러상태\t\t${printHEXPretty(error_status)}
에러정보\t\t${printHEXPretty(value)}`)
  if (data_size) {
    console.warn(`데이터크기\t\t${printHEXPretty(data_size)} \t${data_size.readIntLE(0, data_size.length)}
데이터\t\t\t${printHEXPretty(data)} \t${data.readIntLE(0, data.length)}`)
  }
  return {
    header: {
      company_id: company_id.toString(),
      plc_info: plc_info.readIntLE(0, plc_info.length),
      cpu_info: cpu_info.toString(),
      frame_dir: frame_dir.toString(),
      InvokeID: InvokeID.readIntLE(0, InvokeID.length),
      data_length: data_length.readIntLE(0, data_length.length),
      fenetPos: fenetPos.toString(),
      // reserved2: reserved2.toString()
    },
    body: {
      command: command.readIntLE(0, command.length),
      type: type.readIntLE(0, type.length),
      // block,
      error_status: error_status.readIntLE(0, error_status.length),
      value: value.readIntLE(0, value.length),
      ...(data_size && {
        data_size: data_size.readIntLE(0, data_size.length),
      }),
      ...(data && {
        data: data.readIntLE(0, data.length)
      })
    }
  }
}

export function parseWriteResponse(buf: Buffer): void {
  console.log('write response')
  const slicer = new BufferSlicer()


  console.warn(`<< PARSED RESPONSE`)
  // HEADER
  const company_id = slicer.getSlice(buf, 10)
  const plc_info = slicer.getSlice(buf, 2)
  const cpu_info = slicer.getSlice(buf, 1)
  const frame_dir = slicer.getSlice(buf, 1)
  const InvokeID = slicer.getSlice(buf, 2)
  const data_length = slicer.getSlice(buf, 2)
  const fenetPos = slicer.getSlice(buf, 1)
  const reserved2 = slicer.getSlice(buf, 1)

  console.warn(`====HEADER====
COMPANY_ID\t\t${printHEXPretty(company_id)}\t ${company_id}
PLC_INFO\t\t${printHEXPretty(plc_info)}
CPU_INFO\t\t${printHEXPretty(cpu_info)}
FRAME_DIR\t\t${printHEXPretty(frame_dir)}
INVOKE_ID\t\t${printHEXPretty(InvokeID)}
LENGTH\t\t\t${printHEXPretty(data_length)} \t${data_length.readIntLE(0, data_length.length)}
FENET_POS\t\t${printHEXPretty(fenetPos)}
RESERVED2\t\t${printHEXPretty(reserved2)}`)


  // BODY
  const command = slicer.getSlice(buf, 2)
  const type = slicer.getSlice(buf, 2)
  const block = slicer.getSlice(buf, 2)
  const error_status = slicer.getSlice(buf, 2)
  const value = slicer.getSlice(buf, 2)


  console.warn(`====BODY====
명령어\t\t\t${printHEXPretty(command)}
데이터타입\t\t${printHEXPretty(type)}
예약영역\t\t${printHEXPretty(block)}
에러상태\t\t${printHEXPretty(error_status)}
에러정보/변수개수\t\t${printHEXPretty(value)}
`)
}
