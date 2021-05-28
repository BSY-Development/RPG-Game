const pHit = document.querySelector('.attack-action');
const mHit = document.querySelector('.spell-action');
const heal = document.querySelector('.heal-action');
const playerHp = document.querySelector('#player-hp');
const playerMp = document.querySelector('#player-mp');
const bossHp = document.querySelector('#boss-hp');

const bossAttack = () => {
  playerHp.value -= 5;
}

pHit.addEventListener('click', () => {
  bossHp.value -= 5;
  setTimeout(bossAttack, 500);
});

mHit.addEventListener('click', () => {
  bossHp.value -= 10;
  playerMp.value -= 5;
  setTimeout(bossAttack, 500);
});

heal.addEventListener('click', () => {
  if (playerHp.value < playerHp.max && playerMp.value >= 5) {
    playerMp.value -= 5;
    if ((playerHp.value + 6) >= playerHp.max) {
      playerHp.value = playerHp.max;
    } else {
      playerHp.value += 6;
    }
    setTimeout(bossAttack, 500);
  }
});
