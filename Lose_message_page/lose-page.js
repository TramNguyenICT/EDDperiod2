import SoundManager from '../sound-manager.js';

document.addEventListener("DOMContentLoaded", function() {

  const winPageMusicSource = '../audio/win-page-audio.mp3';

    if (sessionStorage.getItem('backgroundMusicPlaying') === 'true') {
        SoundManager.playBackgroundMusic(winPageMusicSource);
    }

    const musicButton = document.querySelector('#music-button');
    const speakerIcon = document.querySelector('#speaker-icon');

    musicButton.addEventListener('click', () => {
        SoundManager.turnOnOffBackgroundMusic(winPageMusicSource);

        if (SoundManager.backgroundMusic.paused) {
            speakerIcon.src = '../img/music-button-off.png';
            sessionStorage.setItem('backgroundMusicPlaying', 'false');
        } else {
            speakerIcon.src = '../img/music-button-on.png';
            sessionStorage.setItem('backgroundMusicPlaying', 'true');
        }
        goToStartPage();

    });

  window.addEventListener('beforeunload', () => {
    SoundManager.saveMusicCurrentTime();
  });
  function goToStartPage(){
        window.location.href = "../Start page/start-page.html";
    }
})