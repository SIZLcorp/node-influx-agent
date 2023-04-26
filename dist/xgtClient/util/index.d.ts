/// <reference types="node" />
import { XGTAddressType, XGTDataTypeChar, XGTProtocolAddressType } from "XGTClient";
export declare function printHEXPretty(str: Buffer): string | undefined;
export declare class BufferSlicer {
    pointer: number;
    constructor();
    getSlice(buf: Buffer, size: number): Buffer;
    getPointer(): number;
}
export declare function XGTAddressGenerator(inp: XGTAddressType, dataType: XGTDataTypeChar): XGTProtocolAddressType;
