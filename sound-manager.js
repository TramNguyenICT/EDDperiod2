const SoundManager = {
  backgroundMusic: null,

  // initialize the background music for the html (i will put music source argument so we can change for different page)
  initializeBackgroundMusic(musicSource) {
    if (!this.backgroundMusic) {
      this.backgroundMusic = new Audio(musicSource);
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = 0.5;
    }
  },

  // Play background music
  playBackgroundMusic(musicSource) {

    if (!this.backgroundMusic) {
      this.initializeBackgroundMusic(musicSource);
    }

    if (this.backgroundMusic.paused || this.backgroundMusic.src !== musicSource) {
      this.backgroundMusic.src = musicSource;
      this.backgroundMusic.play().catch((error) => {
        console.error("Error playing background music:", error);
      });
    }

    const savedTime = sessionStorage.getItem('musicCurrentTime');
    if (savedTime) {
      this.backgroundMusic.currentTime = parseFloat(savedTime);
    }

    if (this.backgroundMusic.paused) {
      this.backgroundMusic.play().catch((error) => {
        console.error('Error playing background music:', error);
      });
    }
  },

  // Save current music time to sessionStorage
  saveMusicCurrentTime() {
    if (this.backgroundMusic) {
      sessionStorage.setItem('musicCurrentTime', this.backgroundMusic.currentTime);
    }
  },

  // Stop background music
  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      sessionStorage.setItem('musicCurrentTime', this.backgroundMusic.currentTime);
    }
  },

  turnOnOffBackgroundMusic(musicSource) {
    if (this.backgroundMusic.paused) {
      this.playBackgroundMusic(musicSource);
    } else {
      this.stopBackgroundMusic();
    }
  },


};

//export to use in other js file of each html page!!
export default SoundManager;
