const axios = require("axios");
const colors = require("colors");
const { formatter } = require("../utils/currency");
const { readCSVDateOnly, readCSVDateAndToken } = require("../utils/csvparse");

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

      let output = "\nLATEST PORTFOLIO VALUE \n\n".green;

      output += `${"BTC".yellow} : ${
        formatter.format(res.data.BTC.USD).green
      }\n`;
      output += `${"ETH".yellow} : ${
        formatter.format(res.data.ETH.USD).green
      }\n`;
      output += `${"XRP".yellow} : ${
        formatter.format(res.data.XRP.USD).green
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

      let output = "\nLATEST PORTFOLIO VALUE \n\n".green;

      output += `${tokenOption.yellow} : ${
        formatter.format(res.data.USD).green
      }\n`;

      return output;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getPortfolioDateOnly(dateOption) {
    try {
      let output = "\nPORTFOLIO VALUE ON DATE \n".green;
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
