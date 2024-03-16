const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(text, out) {
    if (out) {
      fs.writeFile(out, text, 'utf8', function(err) {
        if (err) {
          console.error(`Couldn't write ${out}: ${err}`);
          process.exit(1);
        }
      });
    } else {
      console.log(text);
    }
  }

function cat(path, out) {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
      } else {
        handleOutput(data, out);
      }
    });
  }

async function webCat(url, out) {
    try {
      let resp = await axios.get(url);
      console.log(resp.data, out);
    } catch (err) {
      console.error(`Error fetching ${url}: ${err}`);
      process.exit(1);
    }
  }

function handleInput(input) {
    if (input.startsWith('http://') || input.startsWith('https://')) {
      webCat(input, out);
    } else {
      cat(input, out);
    }
  }

handleInput(process.argv[2]);