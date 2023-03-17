import { XGTAddressType, XGTArea, XGTDataTypeChar, XGTProtocolAddressType } from "XGTClient"

export function printHEXPretty(str: Buffer): string | undefined {
  if (!str) {
    return ''
  }
  return str.toString('hex').match(/.{2}/g)?.join(' ')
}

export class BufferSlicer {
  pointer = 0
  constructor() {
    this.pointer = 0
  }
  getSlice(buf: Buffer, size: number) {
    const ret = buf.subarray(0 + this.pointer, size + this.pointer)
    this.pointer += ret.length
    return ret
  }
  getPointer(): number {
    return this.pointer
  }
}

export function XGTAddressGenerator(inp: XGTAddressType, dataType: XGTDataTypeChar): XGTProtocolAddressType {

  // inp에서 숫자와, 글자 분리
  const num = inp.match(/\d+/g)?.join('')
  const str: XGTArea = inp.match(/[a-zA-Z]/)?.join('') as XGTArea

  // 숫자는 multiplied by 2, 6자리 leftPad 0 인 문자로 변환
  const numStr = (Number(num) * 2).toString().padStart(6, '0') as `${number}`

  return `%${str}${dataType}${numStr}`
}