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
async function getAirportData(airportId){
  try {
    const response = await fetch(`http://localhost:5000//get_airport_data?airport_id=${airportId}`)
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
    const response = await fetch(`http://localhost:5000/get_question?question_id=${questionId}`);
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
    const responseJson = await response.json()
    return responseJson
  }
  catch (error){
    console.log(error)
  }
}


async function fetchQuestionsByGroup(countryGroup){
  try{
    const response = await fetch(`http://127.0.0.1:5000/get_question_bank_country_group?country_group=${countryGroup}`)
    const responseJson = await response.json()
    return resposneJson
  }
  catch (error){
    console.log(error)
  }
}
// Logic and HTML part

function createElement(tag, attributes, styles) {
  const element = document.createElement(tag);

  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
    }
  }

  if (styles) {
    for (const [key, value] of Object.entries(styles)) {
      element.style[key] = value;
    }
  }
  return element;
}


//Test to appear the question
function displaySnowmanAndQuizBox() {
  // Main container
  const snowmanAndQuizBox = createElement('div', {
    class: "snowman_and_quiz_box",
  }, {
    position: 'absolute',
    bottom: '1rem',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: '1rem',
    zIndex: '1',
  });
  document.body.appendChild(snowmanAndQuizBox);

  // Snowman div
  const snowmanDiv = createElement('div', {
    class: 'snowman'
  }, {
    position: 'absolute',
    width: '20%',
    left: '13%',
    zIndex: '2',
    marginLeft: '-10%',
    marginBottom: '2rem',
  });
  snowmanAndQuizBox.appendChild(snowmanDiv);

  // Snowman image
  const snowmanImg = createElement('img', {
    src: 'img/snowman.png',
    alt: 'Smiling snowman',
    class: 'snowman_img'
  }, {
    width: '100%',
    height: 'auto',
    backgroundColor: 'transparent',
  });
  snowmanDiv.appendChild(snowmanImg);

  // Quiz box
  const quizDivision = createElement('div', {
    class: 'quiz_division'
  }, {
    width: '70%',
    height: '25rem',
    minHeight: '20rem',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    marginLeft: '19.7%',
    zIndex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  });
  snowmanAndQuizBox.appendChild(quizDivision);

  // Snowman heading
  const snowmanHeading = createElement('h2', {
    class: 'snowman-heading'
  });
  snowmanHeading.innerText = 'SNOWMAN:';
  quizDivision.appendChild(snowmanHeading);

  // Quiz paragraph
  const quizParagraph = createElement('p', {
    class: 'quiz_paragraph'
  },{
    color: '#1F2937',
    fontSize: '2.5rem',
    fontWeight: '600',
    marginBottom: '2rem',
    textAlign: 'center',
  });
  quizDivision.appendChild(quizParagraph);

  // Flex div
  const flexDiv = createElement('div', {
    class: 'flex'
  }, {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 'auto',
    width: '100%',
  });
  quizDivision.appendChild(flexDiv);

  // Text input
  const textInput = createElement('input', {
    type: 'text',
    class: 'query',
    placeholder: 'Type your answer here',
  }, {
    flex: '1',
    border: '1px solid #D1D5DB',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    marginRight: '1rem',
    fontSize: '2rem',
  });
  flexDiv.appendChild(textInput);

  // Submit button
  const submitButton = createElement('button', {
    type: 'button',
    class: 'submit',
  }, {
    backgroundColor: '#3B82F6',
    color: 'white',
    fontWeight: '700',
    fontSize: '1.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
  });
  submitButton.innerText = 'Submit';
  flexDiv.appendChild(submitButton);

  // Style for hover and focus
  const style = document.createElement('style');
  style.innerHTML = `
    .submit:hover {
      background-color: #1D4ED8;
    }
    .submit:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
    }
  `;
  document.head.appendChild(style);
}

async function appearQuestion(questionId){
  const questionData =await getQuestion(questionId)
  console.log(questionData)
  const question_content = questionData.question_content;
  const right_answer = questionData.right_answer;
  const win_message = questionData.win_message;
  const lose_message = questionData.lose_message;
  const questionField = document.querySelector('.quiz_paragraph')
  questionField.innerHTML = question_content
  let isCorrect;
  const input = document.querySelector('.query')
  const submit = document.querySelector('.submit')
  submit.addEventListener('click',function handleSubmit() {
    const answer = input.value.trim().toLowerCase();
    console.log(answer)
    let isCorrect;
    if (answer === right_answer) {
      isCorrect = true
    } else {
      isCorrect = false
    }
    if (isCorrect) {
      questionField.innerHTML = win_message
    } else {
      questionField.innerHTML = lose_message
    }
    input.remove();
    submit.removeEventListener('click', handleSubmit);
    submit.remove();
    questionDone++
  });
}
async function afterQuestion(questionId){
    const nextButton = createElement('button', {
      type: 'button',
      class: 'next',
      }, {
      backgroundColor: '#3B82F6',
      color: 'white',
      fontWeight: '700',
      fontSize: '1.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      transition: 'background-color 0.2s ease',
      cursor: 'pointer',
    });
    nextButton.innerText = 'Next'
    const flexDiv = document.querySelector('.flex')
    flexDiv.appendChild(nextButton);
    const next = document.querySelector('.next')
    nextButton.addEventListener('click',async function(evt) {
    const snowman_and_quiz_box = document.querySelector('.snowman_and_quiz_box')
    snowman_and_quiz_box.remove()
    });
}

async function appearGreeting(airportId){
  const airportData = await getAirportData(airportId)
  const greeting = airportData.greeting
}

let questionDone = 0

//while (questionDone <7){


document.addEventListener("DOMContentLoaded", function() {
  const airportDivs = document.querySelectorAll(".airport");
  console.log(airportDivs)
  airportDivs.forEach((div) => {
    div.addEventListener('click', async function() {
      console.log("Airport clicked:", div.id);
      const airportId = div.id
      const airportData = await getAirportData(airportId)
      const countryGroup = airportData.country_group
      const questions = await fetchQuestionsByGroup(countryGroup);
      const randomQuestion = questions[Math.floor(
          Math.random() * questions.length)];
      const questionId = randomQuestion.question_id;
      appearQuestion(questionId)
    });
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
getQuestion(1017)
while (questionDone < 7) {
  document.body.innerHTML = ''; // Clear current elements
  setupMap();
  } else {
  setupPart2();
      }
    });
  } else {
    console.log('No question data available for airport:', airportId);
  }
  */


