/// <reference types="node" />
import { XGTClientConfig, XGTAddressType, XGTDataTypeChar } from "XGTClient";
import * as net from 'net';
type SocketStatus = 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'CONNECTING';
export declare class XGTClient {
    private static instance;
    socket: net.Socket | null;
    status: SocketStatus;
    config: XGTClientConfig;
    private constructor();
    static getInstance(config: XGTClientConfig): XGTClient;
    connect(): Promise<net.Socket>;
    disconnect(): void;
    readData(address: XGTAddressType, dataType: XGTDataTypeChar): Promise<number>;
    private request_data;
}
export {};
