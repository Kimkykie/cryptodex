const { epoch } = require("./date");

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

module.exports = { readCSVDateOnly };
