/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");
const util = require('util');


const generateText = (text) =>{
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

const makeText = path => {
    const readFile = util.promisify(fs.readFile)
    readFile(path, "utf8").then((data) => {
        generateText(data);
    }).catch((err) => {
        console.error(`Error: cannot read file: ${path}: ${err}`);
        process.exit(1);
    })
}

const makeURLText = async url => {
    axios.get(url).then((res) => {
        generateText(res.data)
    }).catch((err) => {
        console.error(`Error: cannot read URL: ${path}: ${err}`);
        process.exit(1);
    });
}

if (process.argv[2] === "file") {
  makeText(process.argv[3]);
}
else if (process.argv[2] === "url") {
  makeURLText(process.argv[3]);
}
else {
  console.error(`Unexpected output: ${process.argv[2]}`);
  process.exit(1);
}