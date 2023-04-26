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
const { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, REPEAT_INTERVAL, EQUIPMENT_PORT, EQUIPMENT_HOST } = require('./env');
const env = __importStar(require("./env"));
const influxClient_1 = require("./influxClient");
const setting_1 = require("./setting");
const sutechEquipment_1 = require("./sutechEquipment");
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("su-agent");
const sutechEquipment = new sutechEquipment_1.SutechEquipment({
    port: EQUIPMENT_PORT,
    host: EQUIPMENT_HOST,
}, setting_1.mappingSetting);
const influxClient = new influxClient_1.InfluxClient({
    url: INFLUX_URL,
    token: INFLUX_TOKEN,
    org: INFLUX_ORG
});
debug(env);
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sutechEquipment.scan();
    const scanResult = yield sutechEquipment.getMemory();
    yield influxClient.write(scanResult);
}), REPEAT_INTERVAL);
//# sourceMappingURL=index.js.map