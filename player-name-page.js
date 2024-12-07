document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('player-name-form').addEventListener('submit', async function insertPlayerName(event){
   event.preventDefault();

  const playerName = document.getElementById('player-name').value;
  try {
    const response = await fetch('http://127.0.0.1:5000/insert_player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        player_name: playerName
      }),
    });

    const data = await response.json();

    if (data.status === 'success') {
      console.log("Player inserted successfully!");

      window.location.href = '../Pick reindeer page/pick-reindeer-page.html';
    }
    else {
      console.log("Error inserting player:", data.message);
    }
  }
    catch(error){
      console.log("Fetch error:", error.message);
    }
});

});