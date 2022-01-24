const axios = require("axios");
const colors = require("colors");
const { formatter } = require("../utils/currency");
const {
  readCSVLatestPortfolio,
  readCSVDatePortfolio,
} = require("../utils/csvparse");
const { isValidToken, isValidDate } = require("../utils/validate");

class PortfolioAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://min-api.cryptocompare.com/data/";
  }

  async getPortfolioNoParameter() {
    try {
      console.log("\nFetching latest portfolio value for BTC,ETH,XRP...".green);
      const res = await axios.get(
        `${this.baseUrl}pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD`
      );
      let btcLatestPorfolioValue;
      let ethLatestPorfolioValue;
      let xrpLatestPorfolioValue;
      await readCSVLatestPortfolio().then((result) => {
        if (result) {
          btcLatestPorfolioValue = result.find(
            (token) => token.token === "BTC"
          );
          btcLatestPorfolioValue.amount =
            btcLatestPorfolioValue.amount * res.data.BTC.USD;
          ethLatestPorfolioValue = result.find(
            (token) => token.token === "ETH"
          );
          ethLatestPorfolioValue.amount =
            ethLatestPorfolioValue.amount * res.data.ETH.USD;
          xrpLatestPorfolioValue = result.find(
            (token) => token.token === "XRP"
          );
          xrpLatestPorfolioValue.amount =
            xrpLatestPorfolioValue.amount * res.data.XRP.USD;
        }
      });

      let output = "\nLATEST PORTFOLIO VALUE FOR BTC,ETH,XRP  \n".green;
      output += `----------------------------------------\n`.green;

      output += `${"BTC".yellow} : ${
        formatter.format(btcLatestPorfolioValue.amount).green
      }\n`;
      output += `${"ETH".yellow} : ${
        formatter.format(ethLatestPorfolioValue.amount).green
      }\n`;
      output += `${"XRP".yellow} : ${
        formatter.format(xrpLatestPorfolioValue.amount).green
      }\n`;

      return output;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getPortfolioTokenOnly(tokenOption) {
    try {
      if (!isValidToken(tokenOption)) {
        throw new Error(`${tokenOption} is not a valid token`);
      }
      console.log(
        `\nFetching latest portfolio value for ${tokenOption}...`.green
      );
      const res = await axios.get(
        `${this.baseUrl}price?fsym=${tokenOption}&tsyms=USD`
      );

      let tokenLatestPorfolioValue;
      await readCSVLatestPortfolio().then((result) => {
        if (result) {
          tokenLatestPorfolioValue = result.find(
            (token) => token.token === tokenOption
          );
          tokenLatestPorfolioValue.amount =
            tokenLatestPorfolioValue.amount * res.data.USD;
        }
      });

      let output = `\nLATEST PORTFOLIO VALUE FOR ${tokenOption} \n`.green;
      output += `----------------------------------------\n`.green;

      output += `${tokenOption} : ${
        formatter.format(tokenLatestPorfolioValue.amount).green
      }\n`;
      return output;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getPortfolioDateOnly(dateOption) {
    if (!isValidDate(dateOption)) {
      throw new Error(
        `${dateOption} is not a valid date, Please use MM/DD/YYYY format`
      );
    }

    console.log(
      `\nFetching portfolio value for BTC,ETH,XRP on ${dateOption}...`.green
    );

    const res = await axios.get(
      `${this.baseUrl}pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD`
    );
    try {
      let output = `\nPORTFOLIO VALUE ON ${dateOption} \n`.green;
      output += `----------------------------------------\n`.green;

      await readCSVDatePortfolio(dateOption).then((result) => {
        if (result) {
          result.forEach((transaction) => {
            if (transaction.token === "BTC") {
              transaction.amount = transaction.amount * res.data.BTC.USD;
            }
            if (transaction.token === "ETH") {
              transaction.amount = transaction.amount * res.data.ETH.USD;
            }
            if (transaction.token === "XRP") {
              transaction.amount = transaction.amount * res.data.XRP.USD;
            }
            output += `${transaction.token.yellow} : ${
              formatter.format(transaction.amount).green
            }\n`;
          });
        }
      });

      return output;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getPortfolioDateAndToken(tokenOption, dateOption) {
    try {
      if (!isValidToken(tokenOption)) {
        throw new Error(`${tokenOption} is not a valid token`);
      }

      if (!isValidDate(dateOption)) {
        throw new Error(
          `${dateOption} is not a valid date, Please use MM/DD/YYYY format`
        );
      }

      console.log(
        `\nFetching portfolio value for ${tokenOption} on ${dateOption}...`
          .green
      );

      const res = await axios.get(
        `${this.baseUrl}price?fsym=${tokenOption}&tsyms=USD`
      );

      let output = `\nPORTFOLIO VALUE FOR ${tokenOption} ON ${dateOption} \n`
        .green;
      output += `----------------------------------------\n`.green;

      await readCSVDatePortfolio(dateOption).then((result) => {
        if (result) {
          let tokenResult = result.filter((token) => {
            return token.token === tokenOption;
          });
          tokenResult.forEach((token) => {
            output += `${token.token.yellow} : ${
              formatter.format(token.amount * res.data.USD).green
            }\n`;
          });
        }
      });

      return output;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = PortfolioAPI;
