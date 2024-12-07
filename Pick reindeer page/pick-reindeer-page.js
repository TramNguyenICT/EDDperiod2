import {
  updateReindeerToPlayer,
  insertPlayer,
} from '../utils.js';

 //window.location.href = "../Main page/main-page.html?reindeer_id=" + reindeerId;

const playerId = sessionStorage.getItem('player_id');
document.querySelectorAll('.reindeer').forEach(reindeer => {
    reindeer.addEventListener('click', () => {
        const reindeerId = reindeer.id; // Get the ID of the clicked reindeer
        console.log(`Selected Reindeer ID: ${reindeerId}`);
        updateReindeerToPlayer(playerId, reindeerId)
        window.location.href = "../Main page/main-page.html";
    });
});

