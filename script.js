'use strict';

//API request function
//update current airport
async function updateAirport(playerId, currentAirport) {
    try {
      const response = await fetch('/update_airport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player_id: playerId,
          current_airport: currentAirport,
        }),
      });
      const data = await response.json();

      if (data.status === 'success') {
        console.log("Airport updated successfully!");
      }
      else{
       console.log("Error updating airport:", data.message)
      }
    }
    catch(error){
      console.log("Fetch error:", error.message)
    }
}

async function updateAirportDone(currentAirport) {
    try {
      const response = await fetch('/update_airport_done', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_airport: currentAirport,
        }),
      });
      const data = await response.json();

      if (data.status === 'success') {
        console.log("Airport", currentAirport,"updated successfully!");
      }
      else{
       console.log("Error updating airport:", data.message)
      }
    }
    catch(error){
      console.log("Fetch error:", error.message)
    }
}
//get airport greeting
async function getAirportGreeting(airportId){
  try {
    const response = await fetch(`/airport_greeting?airport_id=${airportId}`)
    const responseJson = await response.json()
    return responseJson  //print out and check how the json -> point to the goal data
  }
  catch(error){
    console.log(error.message)
  }
}

//get airport reindeer id
async function getAirportReindeerId(airportId){
  try {
    const response = await fetch(`/get_airport_reindeer_id?airport_id=${airportId}`)
    const responseJson = await response.json()
    return responseJson  //print out and check how the json -> point to the goal data
  }
  catch(error){
    console.log(error.message)
  }
}

//get letter count
async function getLetterCount(playerId){
  try {
    const response = await fetch(`/get_letter_count?player_id=${playerId}`)
    const responseJson = await response.json()
    return responseJson  //print out and check how the json -> point to the goal data
  }
  catch(error){
    console.log(error.message)
  }
}

//update letter count
async function updateLetterCount(playerId, letterCount) {
    try {
      const response = await fetch('/update_letter_count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player_id: playerId,
          letter_count: letterCount,
        }),
      });
      const data = await response.json();

      if (data.status === 'success') {
        console.log("Letters updated successfully!");
      }
      else{
       console.log("Error updating letter:", data.message)
      }
    }
    catch(error){
      console.log("Fetch error:", error.message)
    }
}


//get letter of grinch quiz
async function getLetterChangeGrinch(grinchChallenge){
  try {
    const response = await fetch(`/get_letter_change_grinch?grinch_challenge=${grinchChallenge}`)
    const responseJson = await response.json()
    return responseJson  //print out and check how the json -> point to the goal data
  }
  catch(error){
    console.log(error.message)
  }
}

//get question data
async function getQuestion(questionId){
  try {
    const response = await fetch(`/get_question?question_id=${questionId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseJson = await response.json()
    console.log(responseJson)
    return responseJson  //print out and check how the json -> point to the goal data
  }
  catch(error){
    console.log(error.message)
  }
}

//get reindeer id
async function getReindeerId(playerId){
  try {
    const response = await fetch(`/get_reindeer_id?player_id=${playerId}`)
    const responseJson = await response.json()
    return responseJson  //print out and check how the json -> point to the goal data
  }
  catch(error){
    console.log(error.message)
  }
}

//#update final result to player table
async function updateFinalResult(playerId, result) {
    try {
      const response = await fetch('/update_final_result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player_id: playerId,
          result: result,
        }),
      });
      const data = await response.json();

      if (data.status === 'success') {
        console.log("Result updated successfully!");
      }
      else{
       console.log("Error updating result:", data.message)
      }
    }
    catch(error){
      console.log("Fetch error:", error.message)
    }
}

async function getWeatherData(airportId){
  try{
    const response = await fetch(`/get_weather_data?airport_id=${airportId}`)
    const resposneJson = await response.json()
    return resposneJson
  }
  catch (error){
    console.log(error)
  }
}
// Logic and HTML part

function createElement(type, attributes, styles) {
  const element = document.createElement(type);
  for (const key in attributes) element[key] = attributes[key];
  for (const key in styles) element.style.setProperty(key, styles[key]);
  return element;
}
/*
//Test to appear the question
function displaySnowman() {
  const snowman = createElement('img', {
    src: 'img/snowman.png',
    alt: "I'm a snowman"
  }, {
    padding: '10% 70% 5% 5%',
    width: '50px',
    height: 'auto'
  });
  document.body.appendChild(snowman);
}
function displayGrayFrame() {
  const grayFrame = createElement('img', {
    src: 'img/grayframe.png',
    alt: 'grayFrame'
  }, {
    padding: '50% 5% 5% 30%',
    width: '800px',
    height: 'auto'
  });
  document.body.appendChild(grayFrame);
}

async function appearQuestion(airportId){
  displaySnowman()
  displayGrayFrame()
  if (questionData && questionData.question) {
    const questionText = createElement('p', { innerText: questionData.question });
    document.body.appendChild(questionText);

    const answerForm = createElement('form', { action: '#' });
    const inputField = createElement('input', { id: 'query', name: 'answer', type: 'text' });
    const submitButton = createElement('input', { id: 'submit', type: 'submit', value: 'Submit' });

    answerForm.appendChild(inputField);
    answerForm.appendChild(submitButton);
    document.body.appendChild(answerForm);

    answerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userAnswer = inputField.value;
      const isCorrect = userAnswer === questionData.answer;

      if (isCorrect) {
        alert(questionData.win_message);
      } else {
        alert(questionData.lose_message);
      }
      questionDone++;
      if (questionDone < 7) {
        document.body.innerHTML = ''; // Clear current elements
        setupMap();
      } else {
        alert('Moving to Part 2...');
        setupPart2();
      }
    });
  } else {
    console.log('No question data available for airport:', airportId);
  }
}

function setupMap() {
  const airportImages = document.querySelectorAll('.airport-image');
  airportImages.forEach((image) => {
    image.addEventListener('click', async () => {
      const airportId = image.dataset.airportId; // Example: 1017
      const countryGroup = image.dataset.countryGroup;

      const questions = await fetchQuestionsByGroup(countryGroup);
      const availableQuestions = questions.filter(q => q.done === 0);

      if (availableQuestions.length > 0) {
        const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
        await updateQuestionDone(randomQuestion.id);
        displayQuestion(randomQuestion.id);
      } else {
        alert('No available questions for this group.');
      }
      await updateAirportDone(airportId);
    });
  });
}

async function setupPart2() {
  alert('Starting Part 2!');

  while (questionDone < 10) {
    const airports = await fetchTwoRandomAirports();
    if (!airports || airports.length < 2) {
      console.log('Error fetching random airports.');
      break;
    }

    const leftAirport = airports[0];
    const rightAirport = airports[1];
    displayAirportChoices(leftAirport, rightAirport);

    // Wait for user choice
    const selectedAirportId = await handleAirportChoice(leftAirport, rightAirport);
    if (!selectedAirportId) {
      console.log('Error in user selection.');
      break;
    }

    const questions = await fetchQuestionsByAirport(selectedAirportId);
    const availableQuestions = questions.filter(q => q.done === 0);

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


async function fetchTwoRandomAirports() {
  try {
    const response = await fetch('/get_two_random_airports');
    const data = await response.json();
    return data.airports || [];
  } catch (error) {
    console.log('Error fetching random airports:', error.message);
    return [];
  }
}

function displayAirportChoices(leftAirport, rightAirport) {
  document.body.innerHTML = ''; // Clear current content

  const leftButton = createElement('button', {
    innerText: `Left: ${leftAirport.name}`,
    id: 'left-airport',
  });

  const rightButton = createElement('button', {
    innerText: `Right: ${rightAirport.name}`,
    id: 'right-airport',
  });

  document.body.appendChild(leftButton);
  document.body.appendChild(rightButton);
}

function handleAirportChoice(leftAirport, rightAirport) {
  return new Promise((resolve) => {
    document.getElementById('left-airport').addEventListener('click', () => {
      resolve(leftAirport.id);
    });
    document.getElementById('right-airport').addEventListener('click', () => {
      resolve(rightAirport.id);
    });
  });
}

async function fetchQuestionsByAirport(airportId) {
  try {
    const response = await fetch(`/get_questions_by_airport?airport_id=${airportId}`);
    const data = await response.json();
    return data.questions || [];
  } catch (error) {
    console.log('Error fetching questions by airport:', error.message);
    return [];
  }
}

// Initialize Game
async function initializeGame() {
  questionDone = 0;
  await updateAirportDone(1001); // Set Helsinki's is_finished to 1
  setupMap(); // Set up initial map
}

// Start Game
initializeGame();

// initialization + set is_finished of Helsinki to 1
questionDone = 0
updateAirportDone(1001)
*/
getQuestion(1017)
