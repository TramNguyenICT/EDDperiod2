import {
  updateReindeerToPlayer,
  insertPlayer,
  getPlayerId,
} from '../utils.js';

import SoundManager from '../sound-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  const sharedMusicSource = '../audio/christmas-background-music-1.mp3';

  if (sessionStorage.getItem('backgroundMusicPlaying') === 'true') {
    SoundManager.playBackgroundMusic(sharedMusicSource);
  }

  const musicButton = document.querySelector('#music-button');
  const speakerIcon = document.querySelector('#speaker-icon');


  musicButton.addEventListener('click', () => {
    SoundManager.turnOnOffBackgroundMusic(sharedMusicSource);

    if (SoundManager.backgroundMusic.paused) {
      speakerIcon.src = '../img/music-button-off.png';
      sessionStorage.setItem('backgroundMusicPlaying', 'false');
    } else {
      speakerIcon.src = '../img/music-button-on.png';
      sessionStorage.setItem('backgroundMusicPlaying', 'true');
    }
});

window.addEventListener('beforeunload', () => {
    SoundManager.saveMusicCurrentTime();
});

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
})()})
