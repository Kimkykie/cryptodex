#!/usr/bin/env node

const program = require("commander");
const pkg = require("../package.json");

program
  .version(pkg.version)
  .command("check", "Check portfolio value for tokens")
  .parse(process.argv);
