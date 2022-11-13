const express = require("express");

const app = express();

const {addUserDataPoint, deleteUserDataPoint, fetchUserDataPoint} = require("./firebaseSetup.js")


app.get("/add_user/:userID/:userScore/:userTime/:gameDay", async (req,res) => {
    const userTime = req.params.time
    const userScore = req.params.score
    const userID = req.params.account
    const gameDay = req.params.day
    console.log(userTime)
    //await addUserDataPoint(gameDay,userID,userTime,userScore);
    res.status(200)
    res.send("Added user to database")
})

app.listen(3000)

