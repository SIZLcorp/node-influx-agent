import { XGTClient } from './xgtClient'

const xgtClient = XGTClient.getInstance({
  port: 2004,
  host: '192.168.100.110'
})

async function run() {
  const total_count = await xgtClient.readData('C12', 'B')
  const press_acc_count = await xgtClient.readData('C10', 'B')
  const preset_count = await xgtClient.readData('D4020', 'B')
  const ready_status = await xgtClient.readData('M60', 'B')

  console.log({
    total_count,
    press_acc_count,
    preset_count,
    ready_status
  })
}


run()