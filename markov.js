/** Textual markov chain generator */
// Really struggled with this, in retrospect it wasn't so difficult but I had to reference the solution a lot.
// Also getting used to Javascript again was weird.

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

  makeChains() {
    let chains = new Map();

    for (const [i, word] of this.words.entries()){
      let next = this.words[ i + 1 ] || null;
      (chains.has(word)) ? chains.get(word).push(this.words[next]) : chains.set(word, [next]);
    }

    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    console.log("Here");
    let keys = Array.from(this.chains.keys());
    let key = keys[Math.floor(Math.random() * keys.length)];
    let out = [];

    while (out.length < numWords && key !== null) {  
      out.push(key);
      console.log(out);
      key = keys[Math.floor(Math.random() * this.chains.get(key).length)];
    }

    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine
};