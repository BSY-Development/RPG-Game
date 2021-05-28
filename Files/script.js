const pHit = document.querySelector('.attack-action');
const mHit = document.querySelector('.spell-action');
const heal = document.querySelector('.heal-action');
const playerHp = document.querySelector('#player-hp');
const playerMp = document.querySelector('#player-mp');
const bossHp = document.querySelector('#boss-hp');

pHit.addEventListener('click', () => {
  bossHp.value -= 5;
});

mHit.addEventListener('click', () => {
  bossHp.value -= 10;
  playerMp.value -= 5;
});

heal.addEventListener('click', () => {
  if (bossHp.value < bossHp.max) {
    bossHp.value += 5;
    playerMp.value -= 5;
  }
});
