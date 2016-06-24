/* eslint-disable */
$(document).ready(init);

let timer;

function init(){
  $('#startBtn').click(startGame);
  $('#guessBtn').click(guess);
}

function startGame(){
  const name = $('#name').val();
  countDownTimer();
  $.ajax({
    url: '/startGame',
    method: 'post',
    dataType: 'json',
    data: { name },
    success: function(rsp){
      $('#gameArea').removeClass();
      updateDebug(rsp);
      updateGameArea(rsp);
      disableGameArea(false);
      $('#gameMsg').empty()
      $('#attempts').empty();
      // set default image
    }
  });
}

function countDownTimer() {
  let sec = 300;
  timer = setInterval(function() {
     $('#timer').text(sec--);
     if (sec == -1) {
       const id = $('#id').val();
       $.ajax({
         url: '/timeExpired',
         method: 'post',
         dataType: 'json',
         data: { id },
         success: function(rsp){
           updateDebug(rsp);
           updateGameArea(rsp);
           updateGameOverMessage('Out of Time!');
           clearInterval(timer);
         }
       });
     }
  }, 1000);
  return timer;
}

function guess() {
  const guess = $('#guess').val();
  const id = $('#id').val();
  $.ajax({
    url: '/guess',
    method: 'post',
    dataType: 'json',
    data: {id, guess },
    success: function(rsp){
      //debugger;
      updateDebug(rsp);
      updateGameArea(rsp);
      $('#guess').val('');
      // set default image
    }
  });
}
function disableGameArea(bool) {

  $('#timer').prop('disabled', bool);
  $('#graphic').prop('disabled', bool);
  $('#letters').prop('disabled', bool);
  $('#guess').prop('disabled', bool);
  $('#guessBtn').prop('disabled', bool);
}

function updateDebug(activeGameView) {
  //  let debugStr = `DEBUG: ${JSON.stringify(activeGameView)}`;
  //  $('#debug').text(debugStr);
}

function updateGameArea(activeGameView) {
    buildLetters(activeGameView);
    buildAttempts(activeGameView)
    $('#id').val(activeGameView.id);
    if (activeGameView.victory === true) {
      updateGameOverMessage('You won!');
    } else if (activeGameView.gameOver === true) {
      updateGameOverMessage('Sorry.  Please try again.');
    }
  }

function updateGameOverMessage(msg)
{
  $('#gameMsg').text(msg);
  disableGameArea(true);
  clearInterval(timer);
  $('#timer').empty();
}

function buildLetters(activeGameView) {
  $('#letters').empty();
  for (let i = 0; i < activeGameView.wordLength; i++) {
    let knownLetter = activeGameView.knownLetters[i];
    $('#letters').append(`<div class="letterChoice">${knownLetter}</div>`)
  }
}

function buildAttempts(activeGameView) {
  const attemptString = `Attempt ${activeGameView.numberOfGuesses} of 10`;
  $('#attmpts').text(attemptString);
}
