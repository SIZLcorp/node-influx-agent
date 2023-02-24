var modbus = require("modbus-stream");

modbus.tcp.server({ debug: "server" }, (connection) => {
  connection.readCoils({ address: 5, quantity: 8 }, (err, info) => {
    console.log("response", info.response.data);
  });

  connection.on("read-coils", (request, reply) => {
    console.warn(request)
    // if (address === 52 && quantity === 8) {
    reply(null, [1, 1, 1, 1, 0, 0, 0, 0]);
    // }
  });


}).listen(12345, () => {
  console.log("server is running");
});