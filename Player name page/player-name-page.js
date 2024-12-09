import {
  updateReindeerToPlayer,
  insertPlayer,
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

const input = document.getElementById('player-name');
const submit = document.querySelector('button[type="submit"]')
let playerName
submit.addEventListener('click',async function(evt){
  evt.preventDefault();
  playerName = input.value;
  insertPlayer(playerName);
  sessionStorage.setItem('backgroundMusicPlaying', 'true');
  window.location.href = '../Pick reindeer page/pick-reindeer-page.html';
})
})

