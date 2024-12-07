import {
  airportClick, appearGreeting, displayCharacterAndQuizBox,
  fetchQuestionsByGroup,
  getAirportData,
  updateAirportDone, getRemainedAirport
} from '../utils.js';

let questionDone = 0
document.addEventListener("DOMContentLoaded", function() {
  const buttonDivs = document.querySelectorAll(".button");
  console.log(buttonDivs)
  buttonDivs.forEach((div) => {
    div.addEventListener('click', async function(evt){
    if (questionDone >= 3){
      window.location.href = "../Win_message_page/win.html";
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
