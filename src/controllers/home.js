/* eslint-disable new-cap */

import express from 'express';
import Game from '../models/game';
import ActiveGameView from '../../views/viewModels/gameView';
const router = module.exports = express.Router();

router.get('/', (req, res) => {
  res.render('home/index');
});

router.get('/about', (req, res) => {
  res.render('home/about');
});

router.get('/faq', (req, res) => {
  res.render('home/faq');
});

router.post('/startGame', (req, res) => {
  const gameModel = new Game(req.body);
  // to-do put in model
  gameModel.word = 'HELLO';
  const activeGame = new ActiveGameView(gameModel);
  activeGame.addWord(gameModel.word);
  gameModel.save(() => {
    res.send(activeGame);
  });
});

router.post('/guess', (req, res) => {
  const guess = req.body.guess;
  const id = req.body.id;
  Game.findById(id, (err, gameModel) => {
    gameModel.guesses.push(guess);
    gameModel.numberOfGuesses += 1;
    gameModel.save(() => {
      //  do something on error
      const activeGameView = new ActiveGameView(gameModel);
      activeGameView.addGuess(guess, gameModel.word);
      console.log('activeGameView:', JSON.stringify(activeGameView));
      res.send(activeGameView);
    });
  });
});

router.post('/timeExpired', (req, res) => {
  const id = req.body.id;
  Game.findById(id, (err, gameModel) => {
    gameModel.gameOver = true;
    gameModel.timeleft = 0;
    gameModel.save(() => {
      //  do something on error
      const activeGameView = new ActiveGameView(gameModel);
      activeGameView.wordLength = gameModel.word.length;
      activeGameView.knownLetters=gameModel.word.split('');
      res.send(activeGameView);
    });
  });
});
