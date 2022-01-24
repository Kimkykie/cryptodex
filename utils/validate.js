const isValidToken = (token) => {
  return token === "BTC" || token === "ETH" || token === "XRP";
};

const isValidDate = (date) => {
  const dateRegex = /[0-9]{1,2}(\/)[0-9]{1,2}(\/)[0-9]{4}/;
  return date.match(dateRegex);
};
module.exports = { isValidToken, isValidDate };
