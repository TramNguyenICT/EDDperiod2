import {
  airportClick, appearGreeting, displayCharacterAndQuizBox,
  fetchQuestionsByGroup,
  getAirportData,
  updateAirportDone, getRemainedAirport,
  getLetterCount, updateFinalResult
} from '../utils.js';
import {getPlayerId} from '../utils.js';

import SoundManager from '../sound-manager.js';

let questionDone = 0
document.addEventListener("DOMContentLoaded", function() {

  const lostMapMusicSource = '../audio/lost-map-audio.mp3';

    if (sessionStorage.getItem('backgroundMusicPlaying') === 'true') {
        SoundManager.playBackgroundMusic(lostMapMusicSource);
    }

    const musicButton = document.querySelector('#music-button');
    const speakerIcon = document.querySelector('#speaker-icon');

    musicButton.addEventListener('click', () => {
        SoundManager.turnOnOffBackgroundMusic(lostMapMusicSource);

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
  })
  const buttonDivs = document.querySelectorAll(".button");
  console.log(buttonDivs)
  buttonDivs.forEach((div) => {
    div.addEventListener('click', async function(evt){
    if (questionDone >= 3){
      const playerId = await getPlayerId('player_id')
      const letter_count_data = await getLetterCount(playerId)
      console.log("letter_count_data:", letter_count_data)
      let letter_count = letter_count_data.letter_count
      if (letter_count >= 100){
        let result = "win"
      }
      else{
        let result = "lose"
      }
      updateFinalResult(playerId,randomIndex)
      if (result === "win") {
        window.location.href = "../Win_message_page/win.html";
      }
      else{
        window.location.href = "../Lose_message_page/lose.html";
      }
    }
    const remainedAirports = await getRemainedAirport()
    console.log(remainedAirports)
    const randomIndex = Math.floor(Math.random() * remainedAirports.length);
    console.log(randomIndex)
    const airportId = remainedAirports[randomIndex][0];
    console.log(airportId);
    updateAirportDone(airportId)
    getAirportData(airportId).then(async (airportData) => {
      const countryGroup = airportData.country_group;
      const questions = await fetchQuestionsByGroup(countryGroup);
      const randomQuestion = questions[Math.floor(
          Math.random() * questions.length)];
      const questionId = randomQuestion.question_id;

      displayCharacterAndQuizBox('snowman', 'img/snowman.png', 'SNOWMAN:');
      await appearGreeting(airportId, questionId);
      questionDone++
      });
    })

  });
})
