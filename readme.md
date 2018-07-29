## Following along Wes Bos' Learn Node Course

Course website can be found here https://learnnode.com/, Wes' code for the course can be found https://github.com/wesbos/Learn-Node.

## Installation

Make sure that you have the latest stable versions of node.js, npm, and mongodb installed on your machine.

Clone this repo into your working directory. 

Mongodb should be set to run locally on port 27017.

Rename file 'variables.env.sample' to 'variables.env'.

Run 'npm install' to install project. 

Run 'npm start' to start application. 

## Sample Data

To load sample data, run the following command in your terminal:

```bash
npm run sample
```

If you have previously loaded in this data, you can wipe your database 100% clean with:

```bash
npm run blowitallaway
```

That will populate 16 stores with 3 authors and 41 reviews. The logins for the authors are as follows:

|Name|Email (login)|Password|
|---|---|---|
|Wes Bos|wes@example.com|wes|
|Debbie Downer|debbie@example.com|debbie|
|Beau|beau@example.com|beau|


## Disclaimer

I do not own any of the images/fonts/assets that have been included. The project was created from the starter files given here https://github.com/wesbos/Learn-Node.

