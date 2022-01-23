const axios = require("axios");
const colors = require("colors");
const { formatter } = require("../utils/currency");

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
}

module.exports = PortfolioAPI;
