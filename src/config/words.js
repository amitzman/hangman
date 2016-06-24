const fs = require('fs');
const path = require('path');
const fileName = path.join(__dirname, '../../static/wordlist.txt');
const allWords = fs.readFileSync(fileName, 'utf8').split('\n');
const allWordLength = allWords.length;

function WordList() {
}

WordList.getRandomWord = () => {
  const wordNumber = Math.floor(Math.random() * allWordLength);
  return (allWords[wordNumber]).toUpperCase();
};

module.exports = WordList;
