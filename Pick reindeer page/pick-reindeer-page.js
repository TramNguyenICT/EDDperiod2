import {
  updateReindeerToPlayer,
  insertPlayer,
  getPlayerId,
} from '../utils.js';

 //window.location.href = "../Main page/main-page.html?reindeer_id=" + reindeerId;
(async function(){
  const playerId = await getPlayerId()
  console.log(playerId)
  document.querySelectorAll('.reindeer').forEach(reindeer => {
    reindeer.addEventListener('click', () => {
        const reindeerId = reindeer.id; // Get the ID of the clicked reindeer
        console.log(`Selected Reindeer ID: ${reindeerId}`);
        updateReindeerToPlayer(playerId, reindeerId)
        window.location.href = "../Main page/main-page.html";
    });
});
})()
