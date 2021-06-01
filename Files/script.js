/* Actions */
const pHit = document.querySelector('.attack-action');
const mHit = document.querySelector('.spell-action');
const heal = document.querySelector('.heal-action');
/* Hp e MP */
const playerHp = document.querySelector('#player-hp');
const playerMp = document.querySelector('#player-mp');
const bossHp = document.querySelector('#boss-hp');
/* Status Buttons*/
const increaseHp = document.querySelector('.increase-health');
const increaseStr = document.querySelector('.increase-str');
const increaseInt = document.querySelector('.increase-int');
const increaseFaith = document.querySelector('.increase-faith');
/* Status Values */
const healthValue = document.querySelector('#health-value');
const strValue = document.querySelector('#str-value');
const intValue = document.querySelector('#int-value');
const faithValue = document.querySelector('#faith-value');
/* Level */
const bossLevel = document.querySelector('.boss-level');
/* Points */
const pointsDistribute = document.querySelector('.points-distribute');

/* Character Status */
const characterStatus = {
  strength: 1,
  intelligence: 1,
  faith: 1,
  health: 100,
}

/* BossStatus */
const bossStatus = {
  strength: 1,
  health: 50,
  level: 1,
}

/* Initial Values */
const initialValues = () => {
  playerHp.max = characterStatus.health;
  playerHp.value = playerHp.max;
  playerMp.max = 90 + characterStatus.intelligence * 10;
  playerMp.value = playerMp.max;
  healthValue.innerHTML = characterStatus.health;
  strValue.innerHTML = characterStatus.strength;
  intValue.innerHTML = characterStatus.intelligence;
  faithValue.innerHTML = characterStatus.faith;
  pointsDistribute.innerHTML = 0;

  bossHp.max = bossStatus.health;
  bossHp.value = bossHp.max;
}

initialValues();

const lockButtons = (points) => {
  if (points < 1) {
    increaseHp.disabled = true;
    increaseStr.disabled = true;
    increaseInt.disabled = true;
    increaseFaith.disabled = true;
  }
}

const unlockButtons = () => {
  increaseHp.disabled = false;
  increaseStr.disabled = false;
  increaseInt.disabled = false;
  increaseFaith.disabled = false;
}

const bossDead = () => {
  bossStatus.health += 10;
  bossStatus.strength += 1;
  bossHp.max = bossStatus.health;
  bossHp.value = bossHp.max;
  bossLevel.innerHTML = parseInt(bossLevel.innerHTML) + 1
  pointsDistribute.innerHTML = parseInt(pointsDistribute.innerHTML, 10) + 2;
  unlockButtons();
}

const bossAttack = () => {
  playerHp.value -= 5;
}

/* Player Actions */
pHit.addEventListener('click', () => {
  bossHp.value -= 5;
  setTimeout(bossAttack, 500);
  if (bossHp.value <= 0) {
    bossDead();
  }
});

mHit.addEventListener('click', () => {
  if (playerMp.value >= 5) {
    bossHp.value -= 10;
    playerMp.value -= 5;
    setTimeout(bossAttack, 500);
    if (bossHp.value <= 0) {
      bossDead();
    }
  }
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

/* Aumentar os status */
increaseHp.addEventListener('click', () => {
  const points = document.querySelector('.points-distribute');
  if (points.innerHTML > 0) {
    healthValue.innerHTML = parseInt(healthValue.innerHTML, 10) + 10;
    points.innerHTML = parseInt(points.innerHTML, 10) - 1;
    lockButtons(points.innerHTML);
  }
});
increaseStr.addEventListener('click', () => {
  const points = document.querySelector('.points-distribute');
  if (points.innerHTML > 0) {
    strValue.innerHTML = parseInt(strValue.innerHTML, 10) + 1;
    points.innerHTML = parseInt(points.innerHTML, 10) - 1;
    lockButtons(points.innerHTML);
  }
});
increaseInt.addEventListener('click', () => {
  const points = document.querySelector('.points-distribute');
  if (points.innerHTML > 0) {
    intValue.innerHTML = parseInt(intValue.innerHTML, 10) + 1;
    points.innerHTML = parseInt(points.innerHTML, 10) - 1;
    lockButtons(points.innerHTML);
  }
});
increaseFaith.addEventListener('click', () => {
  const points = document.querySelector('.points-distribute');
  if (points.innerHTML > 0) {
    faithValue.innerHTML = parseInt(faithValue.innerHTML, 10) + 1;
    points.innerHTML = parseInt(points.innerHTML, 10) - 1;
    lockButtons(points.innerHTML);
  }
});