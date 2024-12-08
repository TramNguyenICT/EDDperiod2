document.addEventListener("DOMContentLoaded", function() {
    // Data for each airport
    const airports = [
        { name: "Keflavík International Airport", src: "Main page pics/Iceland/iceland1.png", top: "15.62%", left: "26.77%", id: "1024" },
        { name: "Vestmannaeyjar Airport", src: "Main page pics/Iceland/iceland2.png", top: "12.47%", left: "31.69%", id: "1035" },
        { name: "Hornafjörður Airport", src: "Main page pics/Iceland/iceland3.png", top: "10.82%", left: "21.73%", id: "1034" },
        { name: "Egilsstaðir Airport", src: "Main page pics/Iceland/iceland4.png", top: "6.15%", left: "27.48%", id: "1026" },
        { name: "Vopnafjörður Airport", src: "Main page pics/Iceland/iceland5.png", top: "4.66%", left: "34.14%", id: "1038" },
        { name: "Akureyri Airport", src: "Main page pics/Iceland/iceland6.png", top: "3.30%", left: "20.20%", id: "1025" },
        { name: "Malmö Airport", src: "Main page pics/Sweden/sweden1.png", top: "81.41%", left: "52.31%", id: "1017" },
        { name: "Gothenburg-Landvetter Airport", src: "Main page pics/Sweden/sweden2.png", top: "73.15%", left: "48.88%", id: "1014" },
        { name: "Växjö Airport", src: "Main page pics/Sweden/sweden3.png", top: "67.44%", left: "56.07%", id: "1022" },
        { name: "Kalmar Airport", src: "Main page pics/Sweden/sweden4.png", top: "59.78%", left: "53.20%", id: "1023" },
        { name: "Visby Airport", src: "Main page pics/Sweden/sweden5.png", top: "49.16%", left: "51.98%", id: "1019" },
        { name: "Stockholm-Bromma Airport", src: "Main page pics/Sweden/sweden6.png", top: "44.44%", left: "59.39%", id: "1015" },
        { name: "Stockholm-Arlanda Airport", src: "Main page pics/Sweden/sweden7.png", top: "35.59%", left: "63.48%", id: "1013" },
        { name: "Östersund Airport", src: "Main page pics/Sweden/sweden8.png", top: "33.82%", left: "56.52%", id: "1020" },
        { name: "Skellefteå Airport", src: "Main page pics/Sweden/sweden9.png", top: "25.37%", left: "67.90%", id: "1018" },
        { name: "Luleå Airport", src: "Main page pics/Sweden/sweden10.png", top: "23.20%", left: "58.61%", id: "1016" },
        { name: "Kiruna Airportt", src: "Main page pics/Sweden/sweden11.png", top: "18.48%", left: "64.25%", id: "1021" },
        { name: "Kristiansand Airport", src: "Main page pics/Norway/norway1.png", top: "73.75%", left: "36.93%", id: "1027" },
        { name: "Oslo Airport", src: "Main page pics/Norway/norway2.png", top: "59.93%", left: "36.08%", id: "1012" },
        { name: "Bergen Airport", src: "Main page pics/Norway/norway3.png", top: "56.18%", left: "43.60%", id: "1031" },
        { name: "Florø Airport", src: "Main page pics/Norway/norway4.png", top: "40.26%", left: "46.74%", id: "1029" },
        { name: "Trondheim Airport", src: "Main page pics/Norway/norway5.png", top: "26.29%", left: "51.22%", id: "1033" },
        { name: "Bodø Airport", src: "Main page pics/Norway/norway6.png", top: "8.71%", left: "60.75%", id: "1030" },
        { name: "Bardufoss Airport", src: "Main page pics/Norway/norway7.png", top: "6.76%", left: "72.85%", id: "1032" },
        { name: "Harstad Airport", src: "Main page pics/Norway/norway8.png", top: "4.96%", left: "67.29%", id: "1028" },
        { name: "Helsinki-Vantaa Airport", src: "Main page pics/Finland/finland1.png", top: "64.84%", left: "72.50%", id: "1001" },
        { name: "Lappeenranta Airport", src: "Main page pics/Finland/finland2.png", top: "60.93%", left: "78.40%", id: "1008" },
        { name: "Tampere-Pirkkala Airport", src: "Main page pics/Finland/finland3.png", top: "56.69%", left: "68.86%", id: "1011" },
        { name: "Jyväskylä Airport", src: "Main page pics/Finland/finland4.png", top: "55.02%", left: "74.16%", id: "1003" },
        { name: "Kuopio Airport", src: "Main page pics/Finland/finland5.png", top: "51.11%", left: "81.16%", id: "1006" },
        { name: "Oulu Airport", src: "Main page pics/Finland/finland6.png", top: "44.77%", left: "74.88%", id: "1009" },
        { name: "Kajaani Airport", src: "Main page pics/Finland/finland7.png", top: "36.38%", left: "79.53%", id: "1004" },
        { name: "Kuusamo Airport", src: "Main page pics/Finland/finland8.png", top: "20.31%", left: "80.15%", id: "1007" },
        { name: "Kittilä Airport", src: "Main page pics/Finland/finland9.png", top: "19.10%", left: "73.75%", id: "1005" },
        { name: "Ivalo Airport", src: "Main page pics/Finland/finland10.png", top: "7.81%", left: "78.40%", id: "1002" },
        { name: "Copenhagen Airport", src: "Main page pics/Denmark/denmark1.png", top: "93.13%", left: "46.00%", id: "1036" },
        { name: "Vojens Airport", src: "Main page pics/Denmark/denmark2.png", top: "92.08%", left: "40.05%", id: "1010" },
        { name: "Karup Airport", src: "Main page pics/Denmark/denmark3.png", top: "85.50%", left: "40.03%", id: "1037" }
    ];

    // Container for the airport icons
    const container = document.getElementById("airport-container");

    // Loop through each airport and create HTML elements
    airports.forEach(airport => {
        // div each airport
        const airportDiv = document.createElement("div");
        airportDiv.classList.add("airport");
        airportDiv.id = airport.id; // Tram add

        // img element for the airport icon
        const airportImg = document.createElement("img");
        airportImg.src = airport.src;
        airportImg.alt = airport.name;
        airportImg.classList.add("airport-icon");

        // top and left positioning
        airportDiv.style.top = airport.top;
        airportDiv.style.left = airport.left;

        // Create a tooltip element for the name
        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.textContent = airport.name;

        // Append the airport icon to the div
        airportDiv.appendChild(airportImg);
        airportDiv.appendChild(tooltip);

        // Append the airport div to the container
        container.appendChild(airportDiv);
    });
});

