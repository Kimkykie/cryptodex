const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

module.exports = { formatter };
