import { InfluxClientConfig } from "InfluxClient";
import { InfluxDB } from '@influxdata/influxdb-client';
import { EquipmentScanResult } from "SutechEquipment";
export declare class InfluxClient {
    influxConfig: InfluxClientConfig;
    influxInstance: InfluxDB;
    constructor(influxConfig: InfluxClientConfig);
    convert(data: EquipmentScanResult): EquipmentScanResult;
    mergeWord(lower: number, upper: number): number;
    write(inp: EquipmentScanResult): Promise<void>;
}
