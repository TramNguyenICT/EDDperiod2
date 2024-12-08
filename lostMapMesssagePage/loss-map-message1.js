import SoundManager from '../sound-manager.js';

document.addEventListener('DOMContentLoaded', () => {

  const sharedMusicSource = '../audio/lost-map-audio.mp3';

  if (sessionStorage.getItem('backgroundMusicPlaying') === 'true') {
    SoundManager.playBackgroundMusic(sharedMusicSource);
  }

  const nextButton = document.querySelector('.next-button');

  nextButton.addEventListener('click', () => {
    SoundManager.initializeBackgroundMusic();
    SoundManager.playBackgroundMusic(sharedMusicSource);
    sessionStorage.setItem('backgroundMusicPlaying', 'true');
    goToLostMapMainPage();
  });

});

function goToLostMapMainPage() {
      window.location.href = "../Lost map page/Lost-map-page.html";
    }

window.addEventListener('beforeunload', () => {
    SoundManager.saveMusicCurrentTime();
});