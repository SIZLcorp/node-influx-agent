var modbus = require("modbus-stream");

const PORT = 2004
const HOST = "192.168.0.110"

// readHoldingRegisters (address = 0, quantity = 1)

const memoryMap = {
  PRODUCT_NUM: {
    describe: '생산량',
    type: 'int',
    address: 'c10'
  }
}

// P, C, T, M, D

modbus.tcp.connect(PORT, HOST, { debug: "client" }, (err, connection) => {
  if (err) {
    console.error(err)
    return;
  }

  // connection.on("read-coils", (request, reply) => {
  //   console.warn(request.request.address, request.request.quantity)
  //   reply(null, [1, 0, 1, 0, 1, 1, 0, 1]);
  // });

  connection.readCoils({ address: 10, quantity: 10 }, (err, res) => {
    console.warn(res)
  })

});
