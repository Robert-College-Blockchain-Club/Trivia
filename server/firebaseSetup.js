// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
//import { getAnalytics } from "firebase/analytics";
const { getFirestore } = require("firebase/firestore");
const { doc, setDoc, deleteDoc, getDoc } = require("firebase/firestore");
const { collection, getDocs } = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAfLwx_P5QR0vAxKUEIbL9IWhSviOnh87c",
    authDomain: "trivia-2-80403.firebaseapp.com",
    projectId: "trivia-2-80403",
    storageBucket: "trivia-2-80403.appspot.com",
    messagingSenderId: "196141378908",
    appId: "1:196141378908:web:5990f4fc16809422586599",
    measurementId: "G-TZ6D26YB4S"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


const db = getFirestore(app)

//format: the day and wallet address parameters have type String, timeToComplete is a number (unit seconds) 
//and quizScore is the number of questions gotten correct
const addUserDataPoint = async (day, walletAddress, timeToComplete, quizScore) => {
    const docData = {
        address: walletAddress,
        time: timeToComplete,
        score: quizScore
    }
    const docRef = await setDoc(doc(db, day, walletAddress), docData);

};
const deleteUserDataPoint = async (day, walletAddress) => {
    await deleteDoc(doc(db, day, walletAddress))
}

//await fetchUserDataPoint("0_10_2022", "0xb8372983edce03ce839613fffba74279579268")

const fetchUserDataPoint = async (day) => {
    return await getDataFromDay(day)
}

async function getDataFromDay(day) {
    // address - time - score3
    const querySnapshot = await getDocs(collection(db, day));
    const accounts_list = [];
    const player_list = [];

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        player_list.push([doc.data().address, Number(doc.data().time), Number(doc.data().score)]);
        accounts_list.push(doc.data().address);
        //console.log(player_list);
        //console.log(doc.id, " => ", doc.data());
    });

    //sorting
    player_list.sort(compare);
    console.log(player_list);
    return player_list;

}

// t = 110 score = 31

// if we assume the data is in address, time, score order
function compare(player1, player2) {
    // player 1 stats > player 2 stats = return -1
    if (player1[2] > player2[2]) {
        return -1;
    }

    else if ((player1[2] == player2[2]) && (player1[1] < player2[1])) {
        return -1;
    }

    return 1;

    // no condition for if they are equal
}


module.exports = {
    addUserDataPoint, deleteUserDataPoint, fetchUserDataPoint
}


