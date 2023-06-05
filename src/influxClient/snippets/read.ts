#!./node_modules/.bin/esr
/* eslint-disable @typescript-eslint/no-unused-vars */
//////////////////////////////////////////
// Shows how to use InfluxDB query API. //
//////////////////////////////////////////
import { InfluxDB, FluxTableMetaData } from '@influxdata/influxdb-client'
import { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG } from '../../env'

const queryApi = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN }).getQueryApi(INFLUX_ORG)
const fluxQuery =
  `from(bucket:"4MN60H_pms") |> range(start: -1d, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "press_mon_data")
  |> filter(fn: (r) => r["_field"] == "rd_left_160" or r["_field"] == "rd_left_161" or r["_field"] == "rd_left_162" or r["_field"] == "rd_left_163" or r["_field"] == "rd_left_164" or r["_field"] == "rd_left_165" or r["_field"] == "rd_left_166" or r["_field"] == "rd_left_167" or r["_field"] == "rd_left_168" or r["_field"] == "rd_left_169" or r["_field"] == "rd_left_170" or r["_field"] == "rd_left_171" or r["_field"] == "rd_left_172" or r["_field"] == "rd_left_173" or r["_field"] == "rd_left_174" or r["_field"] == "rd_left_175" or r["_field"] == "rd_left_176" or r["_field"] == "rd_left_177" or r["_field"] == "rd_left_178" or r["_field"] == "rd_left_179" or r["_field"] == "rd_left_180" or r["_field"] == "rd_left_181" or r["_field"] == "rd_left_182" or r["_field"] == "rd_left_183" or r["_field"] == "rd_left_184" or r["_field"] == "rd_left_185" or r["_field"] == "rd_left_186" or r["_field"] == "rd_left_187" or r["_field"] == "rd_left_188" or r["_field"] == "rd_left_189" or r["_field"] == "rd_left_190" or r["_field"] == "rd_left_191" or r["_field"] == "rd_left_192" or r["_field"] == "rd_left_193" or r["_field"] == "rd_left_194" or r["_field"] == "rd_left_195" or r["_field"] == "rd_left_196" or r["_field"] == "rd_left_197" or r["_field"] == "rd_left_198" or r["_field"] == "rd_left_199" or r["_field"] == "rd_left_200")
  |> filter(fn: (r) => r["machine_code"] == "P1500050")`

// There are more ways of how to receive results,
// the essential ones are shown in functions below.
// Execution of a particular function follows
// its definition, comment/uncomment it at will.
// See also rxjs-query.ts and queryWithParams.mjs .

// Execute query and receive table metadata and table row values using async iterator.
async function iterateRows() {
  console.log('*** IterateRows ***')
  for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
    // the following line creates an object for each row
    const o = tableMeta.toObject(values)
    // console.log(JSON.stringify(o, null, 2))
    console.log(`${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`)

    // alternatively, you can get only a specific column value without
    // the need to create an object for every row
    // console.log(tableMeta.get(row, '_time'))
  }
  console.log('\nIterateRows SUCCESS')
}
iterateRows().catch((error) => console.error('IterateRows ERROR', error))

// Execute query and receive table metadata and rows in a result observer.
function queryRows() {
  console.log('*** QueryRows ***')
  queryApi.queryRows(fluxQuery, {
    next: (row: string[], tableMeta: FluxTableMetaData) => {
      // the following line creates an object for each row
      const o = tableMeta.toObject(row)
      // console.log(JSON.stringify(o, null, 2))
      console.log(`${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`)

      // alternatively, you can get only a specific column value without
      // the need to create an object for every row
      // console.log(tableMeta.get(row, '_time'))
    },
    error: (error: Error) => {
      console.error(error)
      console.log('\nQueryRows ERROR')
    },
    complete: () => {
      console.log('\nQueryRows SUCCESS')
    },
  })
}
queryRows()

// Execute query and collect result rows in a Promise.
// Use with caution, it copies the whole stream of results into memory.
async function collectRows() {
  console.log('\n*** CollectRows ***')
  const data = await queryApi.collectRows(
    fluxQuery, //, you can also specify a row mapper as a second argument
  )
  data.forEach((x) => console.log(JSON.stringify(x)))
  console.log('\nCollect ROWS SUCCESS')
}
// collectRows().catch((error) => console.error('CollectRows ERROR', error))

// Execute query and return the whole result as a string.
// Use with caution, it copies the whole stream of results into memory.
async function queryRaw() {
  const result = await queryApi.queryRaw(fluxQuery)
  console.log(result)
  console.log('\nQueryRaw SUCCESS')
}
// queryRaw().catch((error) => console.error('QueryRaw ERROR', error))

// Execute query and receive result CSV lines in an observer
function queryLines() {
  queryApi.queryLines(fluxQuery, {
    next: (line: string) => {
      console.log(line)
    },
    error: (error: Error) => {
      console.error(error)
      console.log('\nQueryLines ERROR')
    },
    complete: () => {
      console.log('\nQueryLines SUCCESS')
    },
  })
}
// queryLines()

// Execute query and receive result csv lines using async iterable
async function iterateLines() {
  for await (const line of queryApi.iterateLines(fluxQuery)) {
    console.log(line)
  }
  console.log('\nIterateLines SUCCESS')
}
// iterateLines().catch((error) => console.error('\nIterateLines ERROR', error))