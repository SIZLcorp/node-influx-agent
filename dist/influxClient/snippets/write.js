#!/usr/bin/env node
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
//////////////////////////////////////////
// Shows how to use InfluxDB write API. //
//////////////////////////////////////////
const influxdb_client_1 = require("@influxdata/influxdb-client");
const env_1 = require("../../env");
const node_os_1 = require("node:os");
console.log('*** WRITE POINTS ***');
// create a write API, expecting point timestamps in nanoseconds (can be also 's', 'ms', 'us')
const writeApi = new influxdb_client_1.InfluxDB({ url: env_1.INFLUX_URL, token: env_1.INFLUX_TOKEN }).getWriteApi(env_1.INFLUX_ORG, env_1.INFLUX_BUCKET, 'ns');
// setup default tags for all writes through this API
writeApi.useDefaultTags({ location: (0, node_os_1.hostname)() });
// 일단 기존 제스텍에서 넣는거랑 똑같은 모양으로 param_data 넣을 수 있어야함!
// 그다음 데이터 바인딩해서 넣자
// write point with the current (client-side) timestamp
const point1 = new influxdb_client_1.Point('param_data')
    .tag('company', 'taeyeong')
    .tag('machine_code', 'E1')
    .floatField('press_parameter_101', 20 + Math.round(100 * Math.random()) / 10)
    .floatField('press_parameter_102', 20 + Math.round(100 * Math.random()) / 10);
writeApi.writePoint(point1);
console.log(` ${point1}`);
// // write point with a custom timestamp
// const point2 = new Point('temperature')
//   .tag('example', 'write.ts')
//   .floatField('value', 10 + Math.round(100 * Math.random()) / 10)
//   .timestamp(new Date()) // can be also a number, but in writeApi's precision units (s, ms, us, ns)!
// writeApi.writePoint(point2)
// console.log(` ${point2.toLineProtocol(writeApi)}`)
// WriteApi always buffer data into batches to optimize data transfer to InfluxDB server.
// writeApi.flush() can be called to flush the buffered data. The data is always written
// asynchronously, Moreover, a failed write (caused by a temporary networking or server failure)
// is retried automatically. Read `writeAdvanced.js` for better explanation and details.
//
// close() flushes the remaining buffered data and then cancels pending retries.
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield writeApi.close();
            console.log('FINISHED ... now try ./query.ts');
        }
        catch (e) {
            console.error(e);
            if (e instanceof influxdb_client_1.HttpError && e.statusCode === 401) {
                console.log('Run ./onboarding.js to setup a new InfluxDB database.');
            }
            console.log('\nFinished ERROR');
        }
    });
}
run();
//# sourceMappingURL=write.js.map