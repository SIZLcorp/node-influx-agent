#!./node_modules/.bin/esr
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
//////////////////////////////////////////
// Shows how to use InfluxDB query API. //
//////////////////////////////////////////
const influxdb_client_1 = require("@influxdata/influxdb-client");
const env_1 = require("../../env");
const queryApi = new influxdb_client_1.InfluxDB({ url: env_1.INFLUX_URL, token: env_1.INFLUX_TOKEN }).getQueryApi(env_1.INFLUX_ORG);
const fluxQuery = `from(bucket:"4MN60H_pms") |> range(start: -1d, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "press_mon_data")
  |> filter(fn: (r) => r["_field"] == "rd_left_160" or r["_field"] == "rd_left_161" or r["_field"] == "rd_left_162" or r["_field"] == "rd_left_163" or r["_field"] == "rd_left_164" or r["_field"] == "rd_left_165" or r["_field"] == "rd_left_166" or r["_field"] == "rd_left_167" or r["_field"] == "rd_left_168" or r["_field"] == "rd_left_169" or r["_field"] == "rd_left_170" or r["_field"] == "rd_left_171" or r["_field"] == "rd_left_172" or r["_field"] == "rd_left_173" or r["_field"] == "rd_left_174" or r["_field"] == "rd_left_175" or r["_field"] == "rd_left_176" or r["_field"] == "rd_left_177" or r["_field"] == "rd_left_178" or r["_field"] == "rd_left_179" or r["_field"] == "rd_left_180" or r["_field"] == "rd_left_181" or r["_field"] == "rd_left_182" or r["_field"] == "rd_left_183" or r["_field"] == "rd_left_184" or r["_field"] == "rd_left_185" or r["_field"] == "rd_left_186" or r["_field"] == "rd_left_187" or r["_field"] == "rd_left_188" or r["_field"] == "rd_left_189" or r["_field"] == "rd_left_190" or r["_field"] == "rd_left_191" or r["_field"] == "rd_left_192" or r["_field"] == "rd_left_193" or r["_field"] == "rd_left_194" or r["_field"] == "rd_left_195" or r["_field"] == "rd_left_196" or r["_field"] == "rd_left_197" or r["_field"] == "rd_left_198" or r["_field"] == "rd_left_199" or r["_field"] == "rd_left_200")
  |> filter(fn: (r) => r["machine_code"] == "P1500050")`;
// There are more ways of how to receive results,
// the essential ones are shown in functions below.
// Execution of a particular function follows
// its definition, comment/uncomment it at will.
// See also rxjs-query.ts and queryWithParams.mjs .
// Execute query and receive table metadata and table row values using async iterator.
function iterateRows() {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        console.log('*** IterateRows ***');
        try {
            for (var _d = true, _e = __asyncValues(queryApi.iterateRows(fluxQuery)), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                _c = _f.value;
                _d = false;
                try {
                    const { values, tableMeta } = _c;
                    // the following line creates an object for each row
                    const o = tableMeta.toObject(values);
                    // console.log(JSON.stringify(o, null, 2))
                    console.log(`${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`);
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        console.log('\nIterateRows SUCCESS');
    });
}
iterateRows().catch((error) => console.error('IterateRows ERROR', error));
// Execute query and receive table metadata and rows in a result observer.
function queryRows() {
    console.log('*** QueryRows ***');
    queryApi.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
            // the following line creates an object for each row
            const o = tableMeta.toObject(row);
            // console.log(JSON.stringify(o, null, 2))
            console.log(`${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`);
            // alternatively, you can get only a specific column value without
            // the need to create an object for every row
            // console.log(tableMeta.get(row, '_time'))
        },
        error: (error) => {
            console.error(error);
            console.log('\nQueryRows ERROR');
        },
        complete: () => {
            console.log('\nQueryRows SUCCESS');
        },
    });
}
queryRows();
// Execute query and collect result rows in a Promise.
// Use with caution, it copies the whole stream of results into memory.
function collectRows() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n*** CollectRows ***');
        const data = yield queryApi.collectRows(fluxQuery //, you can also specify a row mapper as a second argument
        );
        data.forEach((x) => console.log(JSON.stringify(x)));
        console.log('\nCollect ROWS SUCCESS');
    });
}
// collectRows().catch((error) => console.error('CollectRows ERROR', error))
// Execute query and return the whole result as a string.
// Use with caution, it copies the whole stream of results into memory.
function queryRaw() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield queryApi.queryRaw(fluxQuery);
        console.log(result);
        console.log('\nQueryRaw SUCCESS');
    });
}
// queryRaw().catch((error) => console.error('QueryRaw ERROR', error))
// Execute query and receive result CSV lines in an observer
function queryLines() {
    queryApi.queryLines(fluxQuery, {
        next: (line) => {
            console.log(line);
        },
        error: (error) => {
            console.error(error);
            console.log('\nQueryLines ERROR');
        },
        complete: () => {
            console.log('\nQueryLines SUCCESS');
        },
    });
}
// queryLines()
// Execute query and receive result csv lines using async iterable
function iterateLines() {
    var _a, e_2, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (var _d = true, _e = __asyncValues(queryApi.iterateLines(fluxQuery)), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                _c = _f.value;
                _d = false;
                try {
                    const line = _c;
                    console.log(line);
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        console.log('\nIterateLines SUCCESS');
    });
}
// iterateLines().catch((error) => console.error('\nIterateLines ERROR', error))
//# sourceMappingURL=read.js.map