/** Command-line tool to generate Markov text. */
const Markov = require('./markov');
const fs = require('fs');
const axios = require('axios');
const { deflate } = require('zlib');

// console.log(Markov);
 
//will only take in two arguments, other arguments are ignored
const args = process.argv.slice(2);

//generates a string based on the words of the file
function randomTxtFromFile(filename) {
    fs.readFile(filename, (err, data) =>{
        if (err) console.log(err)
        const fileText = data.toString();
        let output = new Markov(fileText);
        console.log(output.makeText());
    })
}

//generates a string based on the txt of a url
function randomTxtFromURL(url) {
  axios.get(url)
    .then((res) => {
      let output = new Markov(res.data);
      console.log(output.makeText());
    })
    .catch((err) => console.log(err.message));
}

// text genearator will call one of two functions depending on what the first array value is
function textGenerator(arr) {
    if (arr.length !== 2) return 'ERROR: Two arguments must be passed in';

    switch (arr[0].toLowerCase()) {
        case ('file'):
            randomTxtFromFile(arr[1]);
            break;
        case('url'):
            randomTxtFromURL(arr[1]);
            break;
        default:
            return 'ERROR: the first argument must be "file" or "url"'
    }
    
}

console.log (textGenerator(args))