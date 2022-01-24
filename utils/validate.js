const isValidToken = (token) => {
  return token === "BTC" || token === "ETH" || token === "XRP";
};

const isValidDate = (date) => {
  return date.match(
    /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
  );
};
module.exports = { isValidToken, isValidDate };
