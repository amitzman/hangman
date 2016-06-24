/* eslint-disable func-names */
function ActiveGameView(o) {
  this.name = o.name;
  this.timeleft = o.timeleft;
  this.wordLength = 0;
  this.victory = o.victory;
  this.guesses = o.guesses;
  this.numberOfGuesses = o.numberOfGuesses;
  this.knownLetters = [];
  this.id = o._id;
}

ActiveGameView.prototype.addGuess = function (guess, word) {
  this.wordLength = word.length;
  for (let i = 0; i < this.wordLength; i++) {
    const letter = word.charAt(i).toUpperCase();
    if (this.guesses.includes(letter)) {
      this.knownLetters[i] = letter;
    } else {
      this.knownLetters[i] = '.';
    }
  }
  if (this.knownLetters.includes('.') === false) {
    this.victory = true;
    this.gameOver = true;
  } else if (this.numberOfGuesses >= 5) {
    this.knownLetters = word.split('');
    this.gameOver = true;
  }
};

ActiveGameView.prototype.addWord = function (w) {
  this.wordLength = w.length;
  for (let i = 0; i < w.length; i++) {
    this.knownLetters.push('.');
  }
};

module.exports = ActiveGameView;
