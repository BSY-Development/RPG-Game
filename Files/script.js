const hit = document.querySelector('button');
const hpBar = document.querySelector('#boss-hp');

hit.addEventListener('click', () => {
  hpBar.value -= 5;
});