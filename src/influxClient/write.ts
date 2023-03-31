#!/usr/bin/env node
//////////////////////////////////////////
// Shows how to use InfluxDB write API. //
//////////////////////////////////////////
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import { InfluxDB, Point, HttpError } from '@influxdata/influxdb-client'
import { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET } from '../env'

import { hostname } from 'node:os'

console.log('*** WRITE POINTS ***')
// create a write API, expecting point timestamps in nanoseconds (can be also 's', 'ms', 'us')
const writeApi = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN }).getWriteApi(INFLUX_ORG, INFLUX_BUCKET, 'ns')
// setup default tags for all writes through this API
writeApi.useDefaultTags({ location: hostname() })

// 일단 기존 제스텍에서 넣는거랑 똑같은 모양으로 param_data 넣을 수 있어야함!
// 그다음 데이터 바인딩해서 넣자

// write point with the current (client-side) timestamp
const point1 = new Point('param_data')
  .tag('company', 'taeyeong')
  .tag('machine_code', 'E1')
  .floatField('press_parameter_101', 20 + Math.round(100 * Math.random()) / 10)
  .floatField('press_parameter_102', 20 + Math.round(100 * Math.random()) / 10)
writeApi.writePoint(point1)
console.log(` ${point1}`)
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

async function run() {
  try {
    await writeApi.close()
    console.log('FINISHED ... now try ./query.ts')
  } catch (e) {
    console.error(e)
    if (e instanceof HttpError && e.statusCode === 401) {
      console.log('Run ./onboarding.js to setup a new InfluxDB database.')
    }
    console.log('\nFinished ERROR')
  }
}

run()
