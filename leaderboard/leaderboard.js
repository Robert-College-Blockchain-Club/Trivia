/*let player_list = [
    ["0x1c4F628498299159B5Ce8EB43fA7a27b59A08BE79259A8a58", 31, 6969],
    ["0x1c4F628498299159B5Ce8EB43fA7a27b59A08BE79259A8a58", 33, 6969],
    ["0x1c4F628498299159B5Ce8EB43fA7a27b59A08BE79259A8a58", 33, 5000],
    ["0x1c4F628498299159B5Ce8EB43fA7a27b59A08BE79259A8a58", 33, 5000],
    ["0x1c4F628498299159B5Ce8EB43fA7a27b59A08BE79259A8a58", 33, 5000]
]
*/
//import { currentAccount, connectButton, connect } from "./walletConnect.js";
const leaderboardButton = document.getElementById("leaderboard-btn")

let current_player;
let player_list;

leaderboardButton.addEventListener("click", showLeaderboard)

async function showLeaderboard() {
    await getPlayerListInfo(getTodayDate())
    sortforPlayerlength()
}

function getTodayDate() {
    const date = new Date();
    const formattedDate = date.getDate() + "_" + (date.getMonth()+1) + "_" + date.getFullYear();
    return formattedDate;
}

async function getPlayerListInfo(day) {
    const baseDomain = "http://localhost:3000/leaderboard/";
    const extention = day;
    let response = await fetch(baseDomain+extention);
    player_list = await response.json();
    console.log(player_list)
    return player_list;
}

function sortforPlayerlength() {
    for (let i = 0; i < player_list.length; i++) {
        current_player = player_list[i];
        addPlayer(current_player);
    }
}

function addPlayer(attributes) {
    // attributes = [
    //     "wallet_address",
    //     time,
    //     score
    // ]

    const player = document.createElement("tr");
    player.classList.add("player");

    const ranking = document.createElement("td");

    if (player_list.indexOf(attributes) == 0) {
        ranking.id = "winner";
    }
    else if (player_list.indexOf(attributes) == 1) {
        ranking.id = "runner-up";

    }
    else if (player_list.indexOf(attributes) == 2) {
        ranking.id = "second-runner-up";
    }
    else {
        ranking.id = "ranking";
        
    }
    ranking.innerText = player_list.indexOf(attributes)+1;

    player.appendChild(ranking);

    const address = document.createElement("td");
    address.id = "address";
    address.innerText = attributes[0];
    player.appendChild(address);

    const time = document.createElement("td");
    time.id = "time";
    time.innerText = attributes[1];
    player.appendChild(time);

    const score = document.createElement("td");
    score.id = "score";
    score.innerText = attributes[2];
    player.appendChild(score);

    console.log(player)

    document.getElementById("leaderboard").appendChild(player);


}

