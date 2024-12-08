import {
  updateReindeerToPlayer,
  insertPlayer,
} from '../utils.js';

const input = document.getElementById('player-name');
const submit = document.querySelector('button[type="submit"]')
let playerName
submit.addEventListener('click',async function(evt){
  evt.preventDefault()
  playerName = input.value
  insertPlayer(playerName)
  window.location.href = '../Pick reindeer page/pick-reindeer-page.html';
})

