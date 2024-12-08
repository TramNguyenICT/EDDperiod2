import SoundManager from '../sound-manager.js';

document.addEventListener('DOMContentLoaded', () => {

  const sharedMusicSource = '../audio/christmas-background-music-1.mp3';

  if (sessionStorage.getItem('backgroundMusicPlaying') === 'true') {
    SoundManager.playBackgroundMusic(sharedMusicSource);
  }

  const startButton = document.querySelector('.start-button');

  startButton.addEventListener('click', () => {
    SoundManager.initializeBackgroundMusic();
    SoundManager.playBackgroundMusic();
    sessionStorage.setItem('backgroundMusicPlaying', 'true');
    goToTutorialPage();
  });

});

function goToTutorialPage() {
    window.location.href = "../Tutorial page/tutorial-page.html";
}

window.addEventListener('beforeunload', () => {
    SoundManager.saveMusicCurrentTime();
});