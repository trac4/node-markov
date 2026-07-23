/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  // object is made by taking the one word during the loop, making it the key, and having its value be a list of any word that comes after it in an array. The last word in the loop will have null be inserted into its corresponding key as a null in its array
  makeChains() {
    const chain = {}
    for ( let i = 0; i<=this.words.length -1; i++) {
      let toBeInserted = (this.words[i+1] === undefined) ? null : this.words[i+1];

      if (Array.isArray(chain[this.words[i]]) === false) chain[this.words[i]] = [toBeInserted];
      else (chain[this.words[i]].push(toBeInserted));
    }
    return chain;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    //get the keys the chain object and pick a random one that is put into an array
    const chain = this.makeChains();
    const allWords = Object.keys(chain)
    let beginningWord = allWords[Math.floor(Math.random() * allWords.length)]
    // console.log(beginningWord)
    // console.log(allWords)
    const text = [beginningWord]
    // console.log(chain[beginningWord])

    //taking the newest value from the text array, it is used as a key to find its array value and picks a random word from that array which gets added to text array. process continues until a null is selected or until text length equals the the numWords variable (default 100)
    while (text.length < numWords) {
      // console.log(text);
      const newestWord = text[text.length - 1];
      // console.log(newestWord)
      // console.log(chain)
      // console.log(chain[newestWord]);
      const nextWord = chain[newestWord][Math.floor(Math.random() * chain[newestWord].length)];
      if (!nextWord) break;
      else text.push(nextWord);
    }

    return text.join(' ');
  }
}

let sample = new MarkovMachine(`I have to get my money at the bank and my clothes at my aunt's dry cleaner's. I have a suit that I would like to wear for today's interview at this new company`)
// console.log(sample.makeChains())

module.exports = MarkovMachine;