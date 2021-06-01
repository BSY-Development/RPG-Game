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
const playerDeath = document.querySelector('.player-deaths');
/* Points */
const pointsDistribute = document.querySelector('.points-distribute');
/* Saving */
const saveButton = document.querySelector('#save-file');

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

let characterStatus;
let bossStatus;

if (localStorage.getItem('character')) {
  let characterSave = localStorage.getItem('character');
  characterStatus = JSON.parse(characterSave);

  let bossSave = localStorage.getItem('boss');
  bossStatus = JSON.parse(bossSave);
  if (characterStatus.points > 0) {
    unlockButtons();
  }
} else {
  /* Character Status */
  characterStatus = {
    strength: 1,
    intelligence: 1,
    faith: 1,
    health: 100,
    points: 0,
    deathPoints: 0,
    deaths: 0,
  }
  /* BossStatus */
  bossStatus = {
    strength: 1,
    health: 50,
    level: 1,
  }
}

/* Initial Values */
const initialValues = (dead = undefined) => {
  healthValue.innerHTML = characterStatus.health;
  strValue.innerHTML = characterStatus.strength;
  intValue.innerHTML = characterStatus.intelligence;
  faithValue.innerHTML = characterStatus.faith;
  pointsDistribute.innerHTML = characterStatus.points;
  playerDeath.innerHTML = characterStatus.deaths;
  bossLevel.innerHTML = bossStatus.level;
  playerHp.max = characterStatus.health;
  playerMp.max = 90 + characterStatus.intelligence * 10;
  bossHp.max = bossStatus.health;
  if (dead === 'dead') {
    playerHp.value = playerHp.max;
    playerMp.value = playerMp.max;
    bossHp.value = bossHp.max;
  } else if (localStorage.getItem('characterHpNow')) {
    playerHp.value = parseInt(localStorage.getItem('characterHpNow'), 10);
    playerMp.value = parseInt(localStorage.getItem('characterMpNow'), 10)
    bossHp.value = parseInt(localStorage.getItem('bossHpNow'), 10);
  } else {
    playerHp.value = playerHp.max;
    playerMp.value = playerMp.max;
    bossHp.value = bossHp.max;
  }
  
}

initialValues();

const bossDead = () => {
  bossStatus.health += 10;
  bossStatus.strength += 1;
  bossHp.max = bossStatus.health;
  bossHp.value = bossHp.max;
  bossLevel.innerHTML = parseInt(bossLevel.innerHTML) + 1;
  bossStatus.level += 1;
  pointsDistribute.innerHTML = parseInt(pointsDistribute.innerHTML, 10) + 2;
  characterStatus.points += 2;
  playerMp.value += characterStatus.intelligence + characterStatus.faith;
  playerHp.value += Math.floor(characterStatus.health / 10);
  unlockButtons();
}

const playerDead = () => {
  characterStatus.deathPoints += 1 + Math.ceil(bossLevel.innerHTML / 10);
  characterStatus.points = characterStatus.deathPoints;
  characterStatus.health = 100;
  characterStatus.strength = 1;
  characterStatus.faith = 1;
  characterStatus.intelligence = 1;
  playerDeath.innerHTML = parseInt(playerDeath.innerHTML, 10) + 1;
  characterStatus.deaths += 1;
  unlockButtons();
  bossStatus.health = 50;
  bossStatus.level = 1;
  bossStatus.strength = 1;
  playerHp.value = playerHp.max;
  playerMp.value = playerMp.max;
  bossHp.value = bossHp.max;
}

const bossAttack = () => {
  playerHp.value -= 5 + bossStatus.level + bossStatus.strength;
  if (playerHp.value <= 0) {
    alert('You are dead.');
    playerDead();
    initialValues('dead');
  }
}

/* Player Actions */
pHit.addEventListener('click', () => {
  bossHp.value -= 5 + characterStatus.strength;
  if (bossHp.value <= 0) {
    bossDead();
  } else {
    setTimeout(bossAttack, 500);
  }
});

mHit.addEventListener('click', () => {
  if (playerMp.value >= 5) {
    bossHp.value -= 10 + characterStatus.intelligence * 2;
    playerMp.value -= 5;
    if (bossHp.value <= 0) {
      bossDead();
    } else {
      setTimeout(bossAttack, 500);
    }
  }
});

heal.addEventListener('click', () => {
  if (playerHp.value < playerHp.max && playerMp.value >= 5) {
    playerMp.value -= 5;
    if ((playerHp.value + 10 + characterStatus.faith * 3) >= playerHp.max) {
      playerHp.value = playerHp.max;
    } else {
      playerHp.value += 10 + characterStatus.faith * 3;
    }
    setTimeout(bossAttack, 500);
  }
});

/* Aumentar os status */
increaseHp.addEventListener('click', () => {
  const points = document.querySelector('.points-distribute');
  if (points.innerHTML > 0) {
    characterStatus.health += 10;
    playerHp.max += 10;
    playerHp.value += 10;
    healthValue.innerHTML = parseInt(healthValue.innerHTML, 10) + 10;
    points.innerHTML = parseInt(points.innerHTML, 10) - 1;
    lockButtons(points.innerHTML);

  }
});
increaseStr.addEventListener('click', () => {
  const points = document.querySelector('.points-distribute');
  if (points.innerHTML > 0) {
    characterStatus.strength += 1;
    strValue.innerHTML = parseInt(strValue.innerHTML, 10) + 1;
    points.innerHTML = parseInt(points.innerHTML, 10) - 1;
    characterStatus.points -= 1;
    lockButtons(points.innerHTML);
  }
});
increaseInt.addEventListener('click', () => {
  const points = document.querySelector('.points-distribute');
  if (points.innerHTML > 0) {
    characterStatus.intelligence += 1;
    playerMp.max += 10;
    playerMp.value += 10;
    intValue.innerHTML = parseInt(intValue.innerHTML, 10) + 1;
    points.innerHTML = parseInt(points.innerHTML, 10) - 1;
    characterStatus.points -= 1;
    lockButtons(points.innerHTML);
  }
});
increaseFaith.addEventListener('click', () => {
  const points = document.querySelector('.points-distribute');
  if (points.innerHTML > 0) {
    characterStatus.faith += 1;
    faithValue.innerHTML = parseInt(faithValue.innerHTML, 10) + 1;
    points.innerHTML = parseInt(points.innerHTML, 10) - 1;
    characterStatus.points -= 1;
    lockButtons(points.innerHTML);
  }
});

saveButton.addEventListener('click', () => {
  localStorage.setItem('character', JSON.stringify(characterStatus));
  localStorage.setItem('boss', JSON.stringify(bossStatus))
  localStorage.setItem('characterHpNow', playerHp.value);
  localStorage.setItem('characterMpNow', playerMp.value);
  localStorage.setItem('bossHpNow', bossHp.value);
});