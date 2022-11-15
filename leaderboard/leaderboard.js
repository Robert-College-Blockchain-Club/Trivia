
// Sample data set for the code without the backend
/*let player_list = [
    ["0x1c4F628498299159B5Ce8EB43fA7a27b59A08BE79259A8a58", 31, 6969],
    ["0x1c4F628498299159B5Ce8EB43fA7a27b59A08BE79259A8a58", 33, 6969],
    ["0x1c4F628498299159B5Ce8EB43fA7a27b59A08BE79259A8a58", 33, 5000],
    ["0x1c4F628498299159B5Ce8EB43fA7a27b59A08BE79259A8a58", 33, 5000],
    ["0x1c4F628498299159B5Ce8EB43fA7a27b59A08BE79259A8a58", 33, 5000]
]
*/
let current_player;

for (let i = 0; i < player_list.length; i++) {
    current_player = player_list[i];
    addPlayer(current_player);
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
    ranking.innerText = player_list.indexOf(attributes) + 1;

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

