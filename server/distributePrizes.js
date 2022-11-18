const { ethers } = require("ethers");
const { getDataFromDay } = require("./firebaseSetup.js");
const { ABI } = require("./ABI.js")
const contractAddressERC20 = "0x5395207Da038a094325946df9495e61766754e92";
const privateKey = process.env.PRIVATE_KEY;
console.log(privateKey);

const provider = new ethers.providers.InfuraProvider("sepolia", "6d0487f989c24331b317f7be72e17056");


const signer = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddressERC20, ABI, signer);

const rightNow = new Date();
const distributionTimeToday = new Date();
const triviaHour = 19;
const triviaMinute = 0;
distributionTimeToday.setHours(triviaHour);
distributionTimeToday.setMinutes(triviaMinute);
distributionTimeToday.setSeconds(0);
distributionTimeToday.setUTCMilliseconds(0);

//console.log("initial _date: "+ _date)
while (rightNow.getTime() > distributionTimeToday.getTime()) {
    distributionTimeToday.setDate(trivia_time_today.getDate() + 1);
}
distributionTimeToday.setMinutes(3);
//console.log("im here man");
const distributeRewards = async (playerList, totalPrizeAmount) => {
    const inputs = distributeRewardsListGenerator(playerList, totalPrizeAmount);

    for (let i = 0; i < inputs[1].length; i++) {
        inputs[1][i] = ethers.BigNumber.from(inputs[1][i].toString() + "000000000000000000");
    }

    //console.log(inputs[0],inputs[1][0].toString());
    await contract.addPrizeBalance(inputs[0], inputs[1]);

    /*
    if ((await contract.getReward(inputs[0][0])).toNumber()== inputs[1][0].toNumber())
    {
        console.log("IT FUCKING WORKS");
    }
    */
};

const distributeRewardsListGenerator = (playerList, totalPrizeAmount) => {
    //console.log("im here too man");
    const totPlayers = playerList.length;
    const addressesList = [];
    const rewardList = [];
    for (let i = 0; i < totPlayers; i++) {
        rewardI = 2 * (totPlayers - i) / (totPlayers * (totPlayers + 1)) * totalPrizeAmount;
        addressesList.push(playerList[0][0]);
        rewardList.push(rewardI);
        //console.log("rewardI",rewardI)
    }
    //console.log("rewardList",rewardList)
    return [addressesList, rewardList];
}

const func = () => {
    const now = new Date();

    const distance = now.getTime() - distributionTimeToday.getTime();

    if (distance > 0) {
        let playerList = getDataFromDay();
        let totalPrize = playerList.length * 3 * 10 ** 18;
        distributeRewards(playerList, totalPrize);
        distributionTimeToday.setDate(distributionTimeToday.getDate() + 1);
    }

}

const disTimer = setInterval(func, (120 * 1000));

