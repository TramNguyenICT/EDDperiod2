
import {
  resetAirport,
  appearGreeting,
  displayCharacterAndQuizBox,
  fetchQuestionsByGroup,
  getAirportData,
  airportClick,
  updateAirportDone,
} from '../utils.js';


/*
// Start Game
initializeGame();
  */
let questionDone = 0
resetAirport()
let letterCount = 100
//set is_finished of Helsinki to 1
updateAirportDone(1001)

//while (questionDone <7){


document.addEventListener("DOMContentLoaded", function() {
  const airportDivs = document.querySelectorAll(".airport");
  console.log(airportDivs)
  airportDivs.forEach((div) => {
    div.addEventListener('click', function(evt) {
      airportClick()
      questionDone++;
      if (questionDone >= 7) {
        window.location.href = "../Lost map page/Lost-map-page.html";
      }
    });
  });
});




