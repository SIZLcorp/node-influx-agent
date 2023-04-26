/// <reference types="node" />
import { XGTClient } from '../xgtClient';
import { XGTAddressType, XGTClientConfig, XGTDataTypeChar } from 'XGTClient';
import { InfluxCamField, InfluxPressDataField } from 'InfluxClient';
import { EquipmentMemory, EquipmentScanResult } from 'SutechEquipment';
import { EventEmitter } from 'node:events';
export interface SutechConfigItem {
    plcAddress: XGTAddressType;
    bitIndex?: number;
    name: string;
    dataCode: InfluxCamField | InfluxPressDataField;
    dataType: XGTDataTypeChar;
}
export declare class SutechEquipment extends EventEmitter {
    xgtClient: XGTClient;
    memoryMap: SutechConfigItem[];
    startAt: Date | null;
    endAt: Date | null;
    isScanning: boolean;
    memory: EquipmentMemory;
    constructor(config: XGTClientConfig, memoryMap: SutechConfigItem[]);
    scan(): Promise<void>;
    getBitFromUInt16LE(data: number, bitIndex: number): number;
    reset(): void;
    getMemory(): Promise<EquipmentScanResult>;
}
