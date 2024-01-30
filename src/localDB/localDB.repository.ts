import Log, { LogInput } from './models/log.model'


export async function createLog(data: LogInput) {
  const created = await Log.create(data)
  console.log(created)
}

export async function getNotSyncedData(): Promise<Log[]> {
  const data = await Log.findAll({
    where: {
      isTransferred: false,
    },
  })
  return data
}

export async function updateLog(data: Log) {
  const updated = await Log.update(data, {
    where: {
      id: data.id,
    },
  })
  console.log(updated)
}

export async function deleteLog(logId: number | number[]) {
  const deleted = await Log.destroy({
    where: {
      id: logId,
    },
  })
  console.log(deleted)
}