const express = require("express");

const app = express();

const cors = require("cors");

app.use(cors());

const { addUserDataPoint, deleteUserDataPoint, fetchUserDataPoint } = require("./firebaseSetup.js");
const { async } = require("@firebase/util");

//to-do: deal with errors (status codes)
app.get("/", async (req, res) => {
    res.send("Port correct. App responding.");
})
app.get("/add_user/:gameDay/:userID/:userTime/:userScore", async (req, res) => {
    await addUserDataPoint(req.params.gameDay, req.params.userID, req.params.userTime, req.params.userScore);
    res.status(200);
    res.json("Added user to database");
})

// /fetch_user/0_10_2022/0aw8372983edce03ce839613fffba74279579268
app.get("/leaderboard/:gameDay", async (req, res) => {
    res.json(await fetchUserDataPoint(req.params.gameDay));

})

/*app.get("/fetch_user/:gameDay", async (req,res) => {
    await getDataFromDay(req.params.gameDay)
    res.json("fetched")
})*/
app.listen(3000);