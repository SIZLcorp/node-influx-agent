"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SutechEquipment = void 0;
const xgtClient_1 = require("../xgtClient");
// import { SutechConfigItem } from "SutechAgent"
const node_events_1 = require("node:events");
class SutechEquipment extends node_events_1.EventEmitter {
    constructor(config, memoryMap) {
        super();
        this.startAt = null;
        this.endAt = null;
        this.isScanning = false;
        this.memory = {};
        this.xgtClient = xgtClient_1.XGTClient.getInstance(config);
        this.memoryMap = memoryMap;
        this.reset();
    }
    scan() {
        return __awaiter(this, void 0, void 0, function* () {
            //  q:아직 작동중에 다시 데이터 취득 요청한다면?
            //    a:일단 무시..
            if (this.isScanning) {
                return;
            }
            // f) 데이터 취득 시작 함수
            //  데이터 취득 시작 시각 기록
            //  루프돌면서, 각 메모리 값들 읽어오기
            //  루프 끝나면 데이터 취득 종료
            this.startAt = new Date();
            this.isScanning = true;
            // memoryMap iteration (Async)
            for (const item of this.memoryMap) {
                const data = yield this.xgtClient.readData(item.plcAddress, item.dataType);
                let parsedData = data;
                if (item.bitIndex !== undefined) {
                    parsedData = this.getBitFromUInt16LE(data, item.bitIndex);
                }
                this.memory = Object.assign(Object.assign({}, this.memory), { [item.dataCode]: parsedData });
            }
            this.isScanning = false;
            this.emit('scanEnd', this.memory);
            this.endAt = new Date();
        });
    }
    getBitFromUInt16LE(data, bitIndex) {
        const byteIndex = Math.floor(bitIndex / 8);
        const localBitIndex = bitIndex % 8;
        const buf = Buffer.alloc(2);
        buf.writeUInt16LE(data, 0);
        return (buf[byteIndex] >> localBitIndex) & 1;
    }
    // f) 리셋 함수
    reset() {
        this.memory = {};
        this.isScanning = false;
        this.startAt = null;
        this.endAt = null;
        // 메모리 맵 보고 초기화
        this.memoryMap.forEach((item) => {
            this.memory = Object.assign(Object.assign({}, this.memory), { [item.dataCode]: null });
        });
    }
    // f) 모아진 데이터 출력 함수
    // 인플럭스쪽에서 데이터 출력값 가지고 인플럭스 입력값 만들어야 한다.
    getMemory() {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            // 접속되었고, 아직 스캔중이라면..?
            if (this.isScanning && this.xgtClient.status === 'CONNECTED') {
                // 기달림..
                yield new Promise((resolve, reject) => {
                    self.once('scanEnd', (result) => {
                        resolve(result);
                    });
                    // TODO: 타임아웃 처리
                });
            }
            return (Object.assign(Object.assign({}, this.memory), { startAt: this.startAt, endAt: this.endAt }));
        });
    }
}
exports.SutechEquipment = SutechEquipment;
//# sourceMappingURL=index.js.map