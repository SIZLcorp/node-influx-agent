"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XGTClient = void 0;
const net = __importStar(require("net"));
const util_1 = require("./util");
const requestParser_1 = require("./util/requestParser");
const responseParser_1 = require("./util/responseParser");
const header_1 = __importDefault(require("./generator/header"));
const read_1 = __importDefault(require("./generator/read"));
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("su-agent:xgtClient");
class XGTClient {
    constructor(config) {
        this.socket = null;
        this.status = 'DISCONNECTED';
        const self = this;
        this.config = config;
        // Gracefully.. 프로세스 종료 감지시 disconnect 요청함
        process.on('SIGINT', () => {
            self.disconnect();
            process.exit();
        });
    }
    static getInstance(config) {
        if (!this.instance) {
            this.instance = new XGTClient(config);
        }
        return this.instance;
    }
    // 명시적으로 접속을 요청해야함 connect
    connect() {
        const self = this;
        if (this.status !== 'DISCONNECTED') {
            return Promise.reject(new Error('Already connected'));
        }
        const socket = net.createConnection(this.config);
        this.socket = socket;
        this.status = 'CONNECTING';
        debug('소켓 접속', this.config);
        return new Promise((resolve, reject) => {
            socket.once('connect', () => {
                self.status = 'CONNECTED';
                debug('소켓 접속됨');
                resolve(socket);
            });
            socket.once("error", (err) => {
                self.status = 'ERROR';
                debug('소켓 에러', err);
                self.disconnect();
                reject(err);
            });
            socket.once('close', () => {
                self.status = 'DISCONNECTED';
            });
        });
    }
    // 명시적으로 접속 해제를 요청해야함, 프로그램 종료 감지시 disconnect 요청함
    disconnect() {
        if (this.socket) {
            this.socket.destroy();
            this.socket = null;
            this.status = 'DISCONNECTED';
        }
    }
    readData(address, dataType) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataAddr = (0, util_1.XGTAddressGenerator)(address, dataType);
            let temp = (0, read_1.default)(dataAddr, 'seq');
            let header = (0, header_1.default)(temp);
            let total_length = temp.length + header.length;
            let reqData = Buffer.concat([header, temp], total_length);
            // debug(reqData)
            return this.request_data(reqData);
        });
    }
    request_data(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            // TODO: 요청을 동시에 보내는걸 막아야 한다. 그렇다면 queue처럼 동작해야 할까?
            // 일단은 그렇게까지는 하지 말고, 내부적으로만 여러 요청이 동시에 가지 않는다고 가정만 하자..
            if (this.status == 'DISCONNECTED') {
                yield this.connect();
            }
            debug('[server] request from client: \n', (0, util_1.printHEXPretty)(reqData));
            (0, requestParser_1.parseReadRequest)(reqData);
            return new Promise((resolve, reject) => {
                self.socket.once('data', serverData => {
                    debug(`[client] received data from server: 
      ${(0, util_1.printHEXPretty)(serverData)}`);
                    const parsedResponse = (0, responseParser_1.parseReadResponse)(serverData);
                    //TODO: 값 해석해서 결과만 돌려줘야함
                    resolve(parsedResponse === null || parsedResponse === void 0 ? void 0 : parsedResponse.body.data);
                });
                self.socket.write(reqData);
            });
        });
    }
}
exports.XGTClient = XGTClient;
// export {
//   readData,
//   writeData,
//   seqWriteData,
//   reqReadData
// }
//# sourceMappingURL=index.js.map