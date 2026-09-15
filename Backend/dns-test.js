const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dns.resolveSrv(
  "_mongodb._tcp.cluster0.wf1giln.mongodb.net",
  (err, records) => {
    console.log("ERR:", err);
    console.log("RECORDS:", records);
  }
);