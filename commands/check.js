const PortfolioAPI = require("../lib/PortfolioAPI");

const check = {
  async portfolio(cmd) {
    try {
      const api = new PortfolioAPI();
      if (cmd.token === undefined && cmd.date === undefined) {
        const portfolio = await api.getPortfolioNoParameter();
        console.log(portfolio);
      }
      if (cmd.token !== undefined && cmd.date === undefined) {
        const portfolio = await api.getPortfolioTokenOnly(cmd.token);
        console.log(portfolio);
      }
      if (cmd.token === undefined && cmd.date !== undefined) {
        const portfolio = await api.getPortfolioDateOnly(cmd.date);
        console.log(portfolio);
      }
    } catch (error) {
      console.error(error.message.red);
    }
  },
};

module.exports = check;
