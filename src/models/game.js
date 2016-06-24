import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: String,
  timeleft: { type: Number, default: 300 },
  word: String,
  guesses: [{ type: String }],
  numberOfGuesses: { type: Number, default: 0 },
  victory: { type: Boolean, default: false },
  gameOver: { type: Boolean, default: false },
});

module.exports = mongoose.model('Game', gameSchema);
