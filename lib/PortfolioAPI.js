const axios = require("axios");
const colors = require("colors");
const { formatter } = require("../utils/currency");
const {
  readCSVDateOnly,
  readCSVDateAndToken,
  readCSVLatest,
} = require("../utils/csvparse");

class PortfolioAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://min-api.cryptocompare.com/data/";
  }

  async getPortfolioNoParameter() {
    try {
      const res = await axios.get(
        `${this.baseUrl}pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD`
      );
      let btcLatestPorfolioValue;
      let ethLatestPorfolioValue;
      let xrpLatestPorfolioValue;
      await readCSVLatest().then((result) => {
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
      const res = await axios.get(
        `${this.baseUrl}price?fsym=${tokenOption}&tsyms=USD`
      );

      let tokenLatestPorfolioValue;
      await readCSVLatest().then((result) => {
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
    try {
      let output = `\nPORTFOLIO VALUE ON ${dateOption} \n`.green;
      output += `----------------------------------------\n`.green;

      await readCSVDateOnly(dateOption).then((result) => {
        if (result) {
          result.forEach((token) => {
            output += `${token.token.yellow} : ${
              formatter.format(token.amount).green
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
      let output = `\nPORTFOLIO VALUE FOR ${tokenOption} ON ${dateOption} \n`
        .green;
      output += `----------------------------------------\n`.green;

      await readCSVDateAndToken(tokenOption, dateOption).then((result) => {
        if (result) {
          result.forEach((token) => {
            output += `${token.token.yellow} : ${
              formatter.format(token.amount).green
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
