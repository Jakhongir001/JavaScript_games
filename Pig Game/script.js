'use strict';
// DOM manipulation
const active0El = document.querySelector('.player--0');
const active1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const current0 =document.querySelector('.current0');
const current1 =document.querySelector('.current1');
// starting points
let scores, activePlayer, playing, currentScore;
const init = function(){
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  current0.classList.remove('current-winner');
  current1.classList.remove('current-winner');
};
init();


// switching players function

const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // generating a random number bewtween 1 to 6
    let dice = Math.trunc(Math.random() * 6) + 1;
    // displaying that random number
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    // checking for dice number 1
    if (dice !== 1) {
      // add dice to the current number
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // switch to the next player
      switchPlayers();
    }
  }
});

// Hold button manipulation
btnHold.addEventListener('click', function () {
  if (playing) {
    // adding the current value to score
    scores[activePlayer] += currentScore;
    document.getElementById('score--' + activePlayer).textContent =
      scores[activePlayer];

    // if score >= 100 game stops
    if (scores[activePlayer] >= 20) {
      // All features stop working
      playing = false;
      // dice becomes invisible
      diceEl.classList.add('hidden');
      // background and some other css values change in winner's box
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // green color is added
      document
        .querySelector(`.current${activePlayer}`)
        .classList.add('current-winner');
      // current number becomes 0
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      // active player facilities are removed
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // scores will be set to zero
      if (activePlayer === 0) {
        score1El.textContent = 0;
      } else {
        score0El.textContent = 0;
      }
    } else {
      // switches players place
      switchPlayers();
    }
  }
});

btnNew.addEventListener('click', init);
