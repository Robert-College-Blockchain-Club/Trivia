const express = require("express");

const app = express();

const {addUserDataPoint, deleteUserDataPoint, fetchUserDataPoint} = require("./firebaseSetup.js")

//to-do: deal with errors (status codes)
app.get("/add_user/:userID/:userScore/:userTime/:gameDay", async (req,res) => {
    await addUserDataPoint(req.params.gameDay,req.params.userID,req.params.userTime,req.params.userScore);
    res.status(200)
    res.send("Added user to database")
})

app.listen(3000)