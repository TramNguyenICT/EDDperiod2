'use strict';
/* List function 06/12/2024
resetAirport (new)
updateAirport(playerId, currentAirport)
updateAirportDone(currentAirport)
getAirportData(airportId)
insertPlayer(playerName)
updateReindeerToPlayer(playerId,reindeerId)
getLetterCount(playerId)
updateLetterCount(playerId, letterCount)
getLetterChangeGrinch(grinchChallenge)
getQuestion(questionId)
getReindeerId(playerId)
updateFinalResult(playerId, result)
getWeatherData(airportId)
fetchQuestionsByGroup(countryGroup)
createElement(tag, attributes, styles)
displayCharacterAndQuizBox(characterName, imgSrc, headingText)
appearQuestion(questionId)
afterQuestion()
appearGreeting(airportId, questionId)
 */

//reset all airport to 0
export async function resetAirport() {
    try {
        const response = await fetch('http://127.0.0.1:5000/reset_airport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (result.status === "success") {
            console.log("Airport successfully reset!");
        } else {
            console.error("Failed to reset airport:", result.error || "Unknown error");
        }
    } catch (error) {
        console.error("Error resetting airport:", error.message);
    }
}

//update current airport
export async function updateAirport(playerId, currentAirport) {
    try {
      const response = await fetch('http://127.0.0.1:5000/update_airport', {
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

export async function updateAirportDone(currentAirport) {
    try {
      const response = await fetch('http://127.0.0.1:5000/update_airport_done', {
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
export async function getAirportData(airportId){
  try {
    const response = await fetch(`http://127.0.0.1:5000/get_airport_data?airport_id=${airportId}`)
    const responseJson = await response.json()
    return responseJson  //print out and check how the json -> point to the goal data
  }
  catch(error){
    console.log(error.message)
  }
}

//get remain airports
export async function getRemainedAirport(){
  try{
    const response = await fetch(`http://127.0.0.1:5000/get_remain_airports`)
    const responseJson = await response.json()
    return responseJson  //print out and check how the json -> point to the goal data
  }
  catch(error){
    console.log(error.message)
  }
}

//insert player
export async function insertPlayer(playerName) {
    try {
      const response = await fetch('http://127.0.0.1:5000/insert_player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player_name: playerName,
        }),
      });
      const data = await response.json();

      if (data.status === 'success') {
        const playerId = data.player_id;
        console.log("Player inserted successfully!");
        sessionStorage.setItem('player_id', playerId);
        return playerId;
      }
      else{
       console.log("Error inserting player:", data.message)
      }
    }
    catch(error){
      console.log("Fetch error:", error.message)
    }
}

//update reindeer to player
export async function updateReindeerToPlayer(playerId,reindeerId) {
    try {
      const response = await fetch('http://127.0.0.1:5000/update_reindeer_to_player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player_id: playerId,
          reindeer_id: reindeerId,
        }),
      });
      const data = await response.json();

      if (data.status === 'success') {
        console.log("Reindeer updated successfully!");
      }
      else{
       console.log("Error updating reindeer:", data.message)
      }
    }
    catch(error){
      console.log("Fetch error:", error.message)
    }
}


//get letter count
export async function getLetterCount(playerId){
  try {
    const response = await fetch(`http://127.0.0.1:5000/get_letter_count?player_id=${playerId}`)
    const responseJson = await response.json()
    return responseJson
  }
  catch(error){
    console.log(error.message)
  }
}

//update letter count
export async function updateLetterCount(playerId, letterCount) {
    try {
      const response = await fetch('http://127.0.0.1:5000/update_letter_count', {
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
export async function getLetterChangeGrinch(grinchChallenge){
  try {
    const response = await fetch(`http://127.0.0.1:5000/get_letter_change_grinch?grinch_challenge=${grinchChallenge}`)
    const responseJson = await response.json()
    return responseJson  //print out and check how the json -> point to the goal data
  }
  catch(error){
    console.log(error.message)
  }
}

//get question data
export async function getQuestion(questionId){
  try {
    const response = await fetch(`http://127.0.0.1:5000/get_question?question_id=${questionId}`);
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
export async function getReindeerId(playerId){
  try {
    const response = await fetch(`http://127.0.0.1:5000/get_reindeer_id?player_id=${playerId}`)
    const responseJson = await response.json()
    return responseJson  //print out and check how the json -> point to the goal data
  }
  catch(error){
    console.log(error.message)
  }
}

//#update final result to player table
export async function updateFinalResult(playerId, result) {
    try {
      const response = await fetch('http://127.0.0.1:5000/update_final_result', {
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

export async function getWeatherData(airportId){
  try{
    const response = await fetch(`http://127.0.0.1:5000/get_weather_data?airport_id=${airportId}`)
    const responseJson = await response.json()
    return responseJson
  }
  catch (error){
    console.log(error)
  }
}


export async function fetchQuestionsByGroup(countryGroup){
  try{
    const response = await fetch(`http://127.0.0.1:5000/get_question_bank_country_group?country_group=${countryGroup}`)
    const responseJson = await response.json()
    return responseJson
  }
  catch (error){
    console.log(error)
  }
}
// Logic and HTML part

export function createElement(tag, attributes, styles) {
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
export function displayCharacterAndQuizBox(characterName, imgSrc, headingText) {
  // Main container
  const characterAndQuizBox = createElement('div', {
    class: `${characterName}_and_quiz_box`,
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
  document.body.appendChild(characterAndQuizBox);

  // Snowman div
  const characterDiv = createElement('div', {
    class: characterName
  }, {
    position: 'absolute',
    width: '20%',
    left: '13%',
    zIndex: '2',
    marginLeft: '-10%',
    marginBottom: '2rem',
  });
  characterAndQuizBox.appendChild(characterDiv);

  // Snowman image
  const characterImg = createElement('img', {
    src: imgSrc,
    alt: `${characterName} image`,
    class: `${characterName}_img`
  }, {
    width: '100%',
    height: 'auto',
    backgroundColor: 'transparent',
  });
  characterDiv.appendChild(characterImg);

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
  characterAndQuizBox.appendChild(quizDivision);

  // Character heading
  const characterHeading = createElement('h2', {
    class: '${characterName}-heading'
  });
  characterHeading.innerText = headingText;
  quizDivision.appendChild(characterHeading);

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
}
//syntax to use the function
//displayCharacterAndQuizBox('snowman', 'img/snowman.png', 'SNOWMAN:');
//displayCharacterAndQuizBox('reindeer', 'img/reindeer.png', 'REINDEER:');
//displayCharacterAndQuizBox('grinch', 'img/grinch1.png', 'GRINCH:');

export async function appearQuestion(airportId, questionId){
  const questionData =await getQuestion(questionId)
  console.log(questionData)
  const question_content = questionData.question_content;
  const right_answer = questionData.right_answer;
  const win_message = questionData.win_message;
  const lose_message = questionData.lose_message;
  const letter_change = questionData.letter_change
  const questionField = document.querySelector('.quiz_paragraph')
  questionField.innerHTML = question_content
  const flexDiv = document.querySelector('.flex')
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
    const playerId = sessionStorage.getItem('player_id');
    const letter_count_data = getLetterCount(playerId)
    let letter_count = letter_count_data.letter_count
    if (isCorrect) {
      letter_count += letter_change
      questionField.innerHTML = win_message
      questionField.innerHTML += ' You got ' + letter_change + ' more letters.'
    } else {
      letter_count -= letter_change
      questionField.innerHTML = lose_message
      questionField.innerHTML += ' You lost ' + letter_change + ' letters.'
    }
    updateLetterCount(playerId,letter_count)
    input.remove();
    submit.remove();
    afterQuestion(airportId);
  });
}

export async function afterQuestion(airportId){
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
      nextButton.remove()
      const characterAndQuizBox = document.querySelector('.snowman_and_quiz_box')
      characterAndQuizBox.remove()
      changeAirportIconToElfIcon(airportId)
    });
}

export async function appearGreeting(airportId, questionId){
  const airportData = await getAirportData(airportId)
  const greeting = airportData.greeting
  const airport_name = airportData.airport_name
  const weatherData = await getWeatherData(airportId)
  const weathercontent = 'The current weather at '+ airport_name + ' is '+ weatherData.description + ' and the temperature is ' + weatherData.temperature + ' Celcius degree.'
  const flexDiv = document.querySelector('.flex')
  const greetingField = document.querySelector('.quiz_paragraph')
  greetingField.innerText = greeting;
  greetingField.innerText += weathercontent;
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
    flexDiv.appendChild(nextButton);
    nextButton.addEventListener('click',async function(evt) {
      greetingField.innerText = ''
      nextButton.remove()
      appearQuestion(airportId, questionId);
    });
}

export async function airportClick(){
    const div = event.currentTarget; // Get the div that was clicked
    console.log("Airport clicked:", div.id);
    const airportId = div.id;
    updateAirportDone(airportId)
    getAirportData(airportId).then(async (airportData) => {
      const countryGroup = airportData.country_group;
      const questions = await fetchQuestionsByGroup(countryGroup);
      const randomQuestion = questions[Math.floor(
          Math.random() * questions.length)];
      const questionId = randomQuestion.question_id;

      displayCharacterAndQuizBox('snowman', 'img/snowman.png', 'SNOWMAN:');
      await appearGreeting(airportId, questionId);
    });
}

export function changeAirportIconToElfIcon(airportId){
  const airportDiv = document.getElementById(airportId);
  const airportIcon = airportDiv.querySelector('.airport-icon');
  const airportToolTip = airportDiv.querySelector('.tooltip');
  airportIcon.src = "img/elficon.png"
  airportIcon.alt= "elf was here"
  airportToolTip.innerHTML += '<br>You were here already!'
  airportDiv.removeEventListener('click', airportClick);
  airportIcon.addEventListener('click', function(evt){
    evt.stopPropagation()
  })
}




