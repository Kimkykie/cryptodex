const readCSVLatest = () => {
  return new Promise(function (resolve) {
    let csvOutput = [];
    let btcPortfolio = { token: "BTC", amount: 0, timestamp: 0 };
    let ethPortfolio = { token: "ETH", amount: 0, timestamp: 0 };
    let xrpPortfolio = { token: "XRP", amount: 0, timestamp: 0 };

    const lineReader = require("readline").createInterface({
      input: require("fs").createReadStream("./assets/transactions.csv"),
    });

    lineReader.on("line", function (line) {
      var jsonFromLine = {};
      var lineSplit = line.split(",");

      jsonFromLine.timestamp = lineSplit[0];
      jsonFromLine.transaction_type = lineSplit[1];
      jsonFromLine.token = lineSplit[2];
      jsonFromLine.amount = lineSplit[3];

      switch (jsonFromLine.token.toUpperCase()) {
        case "BTC":
          if (jsonFromLine.timestamp > btcPortfolio.timestamp) {
            btcPortfolio.amount = jsonFromLine.amount;
            btcPortfolio.timestamp = jsonFromLine.timestamp;
          }
          break;
        case "ETH":
          if (jsonFromLine.timestamp > ethPortfolio.timestamp) {
            ethPortfolio.amount = jsonFromLine.amount;
            ethPortfolio.timestamp = jsonFromLine.timestamp;
          }
          break;
        case "XRP":
          if (jsonFromLine.timestamp > xrpPortfolio.timestamp) {
            xrpPortfolio.amount = jsonFromLine.amount;
            xrpPortfolio.timestamp = jsonFromLine.timestamp;
          }
          break;
        default:
          break;
      }
    });

    lineReader.on("close", function (line) {
      csvOutput.push(btcPortfolio);
      csvOutput.push(ethPortfolio);
      csvOutput.push(xrpPortfolio);
      resolve(csvOutput);
    });
  });
};

const readCSVDateOnly = (dateFromOption) => {
  return new Promise(function (resolve) {
    let csvOutput = [];
    const lineReader = require("readline").createInterface({
      input: require("fs").createReadStream("./assets/transactions.csv"),
    });

    lineReader.on("line", function (line) {
      var jsonFromLine = {};
      var lineSplit = line.split(",");

      jsonFromLine.timestamp = lineSplit[0];
      jsonFromLine.transaction_type = lineSplit[1];
      jsonFromLine.token = lineSplit[2];
      jsonFromLine.amount = lineSplit[3];

      const d = new Date(jsonFromLine.timestamp * 1000);
      const dateFromCSV =
        d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

      if (dateFromCSV === dateFromOption) {
        csvOutput.push(jsonFromLine);
      }
    });

    lineReader.on("close", function (line) {
      resolve(csvOutput);
    });
  });
};

const readCSVDateAndToken = (tokenOption, dateFromOption) => {
  return new Promise(function (resolve) {
    let csvOutput = [];
    const lineReader = require("readline").createInterface({
      input: require("fs").createReadStream("./assets/transactions.csv"),
    });

    lineReader.on("line", function (line) {
      var jsonFromLine = {};
      var lineSplit = line.split(",");

      jsonFromLine.timestamp = lineSplit[0];
      jsonFromLine.transaction_type = lineSplit[1];
      jsonFromLine.token = lineSplit[2];
      jsonFromLine.amount = lineSplit[3];

      const d = new Date(jsonFromLine.timestamp * 1000);
      const dateFromCSV =
        d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

      if (
        dateFromCSV === dateFromOption &&
        jsonFromLine.token.toUpperCase() === tokenOption
      ) {
        csvOutput.push(jsonFromLine);
      }
    });

    lineReader.on("close", function (line) {
      resolve(csvOutput);
    });
  });
};

module.exports = { readCSVDateOnly, readCSVDateAndToken, readCSVLatest };
