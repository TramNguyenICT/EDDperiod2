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


  })

  const nextButton = document.querySelector('.next-button');
    nextButton.addEventListener('click', () => {
      goToPlayerNamePage();
    });
  function goToPlayerNamePage() {
    window.location.href = "../Player name page/player-name-page.html";
  }

  window.addEventListener('beforeunload', () => {
    SoundManager.saveMusicCurrentTime();
  });
})