
import {
  resetAirport,
  appearGreeting,
  displayCharacterAndQuizBox,
  fetchQuestionsByGroup,
  getAirportData,
  airportClick,
  updateAirportDone,
  updateLetterCount, getLetterCount, getPlayerId
} from '../utils.js';


/*
// Start Game
initializeGame();
  */
let questionDone = 0
resetAirport()
let letterCount = 100
async function updateData() {
  try {
    const playerId = await getPlayerId();
    console.log("Player ID:", playerId);

    await updateLetterCount(playerId, letterCount);
    const letterCountData = await getLetterCount(playerId);
    console.log("Letter count data:", letterCountData);

    updateAirportDone(1001);

  } catch (error) {
    console.log("Error:", error);
  }
}

updateData();

//while (questionDone <7){
document.addEventListener("DOMContentLoaded", function() {
  const airportDivs = document.querySelectorAll(".airport");
  console.log(airportDivs)
  airportDivs.forEach((div) => {
    div.addEventListener('click', function(evt) {
      airportClick()
      questionDone++;
      if (questionDone >= 30) {
        window.location.href = "../lostMapMesssagePage/lost-map-message1.html";
      }
    });
  });
});




