const program = require("commander");
const check = require("../commands/check");

program
  .command("portfolio")
  .description("Check portfolio value for tokens")
  .option("--token <type>", "Add specific coin type", "BTC,ETH,XRP")
  .option(
    "--date <date>",
    "Specify the date to check portfolio value",
    Date.now()
  )
  .action((cmd) => check.portfolio(cmd));

program.parse(process.argv);

// If no args, output help
if (!process.argv[2]) {
  program.outputHelp();
}
