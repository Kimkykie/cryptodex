const program = require("commander");
const check = require("../commands/check");

program
  .command("portfolio")
  .description("Check portfolio value for tokens")
  .option("--token <type>", "Add specific coin type")
  .option("--date <date>", "Specify the date to check portfolio value")
  .action((cmd) => check.portfolio(cmd));

program.parse(process.argv);

// If no args, output help
if (!process.argv[2]) {
  program.outputHelp();
}
