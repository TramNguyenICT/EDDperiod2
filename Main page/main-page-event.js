
import {
  appearGreeting,
  displayCharacterAndQuizBox,
  fetchQuestionsByGroup,
  getAirportData,
  airportClick,
} from '../utils.js';

let questionDone = 0

/*
// Initialize Game
async function initializeGame() {
  questionDone = 0;
  await updateAirportDone(1001); // Set Helsinki's is_finished to 1
  setupMap(); // Set up initial map
}

// Start Game
initializeGame();
  */
// initialization + set is_finished of Helsinki to 1
//updateAirportDone(1001)

//while (questionDone <7){


document.addEventListener("DOMContentLoaded", function() {
  const airportDivs = document.querySelectorAll(".airport");
  console.log(airportDivs)
  airportDivs.forEach((div) => {
    div.addEventListener('click', airportClick)
    questionDone++
  });
})

/*
part 2: random 1 airport
   random 1 question id
   add event to left + right arrow to display question

    if (availableQuestions.length > 0) {
      const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      await updateQuestionDone(randomQuestion.id);
      await displayQuestion(randomQuestion.id);
      questionDone++;
    } else {
      alert('No available questions for this airport.');
    }

    await updateAirportDone(selectedAirportId);
  }

  const playerId = 1; // Replace with actual player ID
  const letterCount = await getLetterCount(playerId);

  if (letterCount < 100) {
    window.location.href = '/losing.html';
  } else {
    window.location.href = '/winning.html';
  }
}
*/


