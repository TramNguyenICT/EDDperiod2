'use strict';

async function getTopPlayers() {
    try {
        const response = await fetch('http://localhost:5000/get_top_players');  // Gọi API từ Flask

        if (response.ok) {
            const data = await response.json();

            if (data.top_players && Array.isArray(data.top_players)) {
                displayTopPlayers(data.top_players);
            } else {
                console.error('No players found.');
            }
        } else {
            console.error('Failed to fetch top players');
        }
    } catch (error) {
        console.error('Error fetching top players:', error);
    }
}

function displayTopPlayers(players) {
    const rankingTable = document.getElementById('ranking-data');  // Lấy phần tử HTML nơi sẽ hiển thị bảng xếp hạng

    rankingTable.innerHTML = '';
    players.forEach((player, index) => {
        const row = document.createElement('tr');

        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1;

        const nameCell = document.createElement('td');
        nameCell.textContent = player.player_name;

        const letterCountCell = document.createElement('td');
        letterCountCell.textContent = player.letter_count;

        row.appendChild(rankCell);
        row.appendChild(nameCell);
        row.appendChild(letterCountCell);

        rankingTable.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getTopPlayers();
});

function goToStartPage() {
        window.location.href = "../Start page/start-page.html";
    }