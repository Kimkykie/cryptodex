# CRYPTODEX

Return portfolio value for tokens from transactions in csv file.

## Packages installed

- [Commander](https://tj.github.io/commander.js/) - A light-weight, expressive, and powerful command-line framework for nodejs
- [Colors](https://www.npmjs.com/package/colors) - Add color and style to nodejs console
- [Axios](https://github.com/axios/axios) - A Promise based HTTP client for the browser and node.js

## Installation

### Prerequisite

The project runs on nodejs so make sure you have nodejs installed before installation and running it.

You can find instructions on how to install Nodejs and npm [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

On your terminal

```bash
git clone https://github.com/Kimkykie/cryptodex
cd cryptodex
npm install
```

The csv file containing our transactions can be downloaded from here [CSV file](https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip).

Once downloaded, extract the zip file and copy the csv file to our assets folder.

![](/assets/assets.png)

### Initializing cryptodex command

We are going to be using the **cryptodex** command and this can be achieved by running **npm link** command

```
npm link
```

Check to see if cryptodex command is working by running cryptodex on your terminal. You should see this:

![](/assets/command check.png)

## Usage

The program has the capability to check the following from the transactions csv:

- Given no parameters, return the latest portfolio value per token in USD
- Given a token, return the latest portfolio value for that token in USD
- Given a date, return the portfolio value per token in USD on that date
- Given a date and a token, return the portfolio value of that token in USD on that date

The commands used to check for these conditions are;

1. #### No parameter provided

   ```bash
   cryptodex check portfolio
   ```

2. #### Token only provided

   ```bash
   cryptodex check portfolio --token BTC
   ```

3. #### Date only provided

   ```bash
   cryptodex check portfolio --date 18/6/2018
   ```

4. #### Date and token provided

   ```bash
   cryptodex check portfolio --date 18/6/2018 --token BTC
   ```

## Example

Let us check the first scenario where no token or date is provided

We run the command

```bash
cryptodex check portfolio
```

This is the output we get showing the latest portfolio values for BTC,ETH,XRP

![noparam](/assets/noparam.png)

## Project Structure

### bin

This folder contains the executables. Our main command file is **cryptodex.js**.

To add any other commands like **check** in our case, we add a **cryptodex-check.js** file

### commands

This folder contains the root files for our commands to parse our inputs and return results.

We currently have **check.js**, if we wanted to add more commands like adding/removing api keys, I would separate this into a **key.js** file.

### lib

This folder contains our PortfolioAPI file which contains a class of the same name;

- We have a constructor with our api base_url.
- Functions to handle our 4 different scenarios.

### utils

This folder contains the different utility files for reusability.

- **csvparse.js** - This file has 2 functions;

  **readCSVLatestPortfolio** which reads the csv and returns the latest portfolio value for tokens, if no token is specified it returns latest portfolio for all tokens.

  **readCSVDatePortfolio** which reads the csv with date provided and returns the portfolio value for tokens on the specified date for all tokens if no token is specified.

- **currency.js** - Simple utility function to format our amount values in **USD**.

- **validate.js** - This file contains our validations for date and tokens entered.

## Error handling

I generally thought about two cases to handle errors:

1. Invalid token input provided; User will be notified of the valid tokens expected

![invalidtoken](/assets/invalidtoken.png)

2. Invalid date provided; User will be notified of the valid date format which is **mm/dd/yy** example 24/1/2021

![](/assets/invaliddate.png)

## Unlinking

To remove cryptodex from your recognized commands you can run:

```bash
npm unlink
```

## Version

1.0.0
