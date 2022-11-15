// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
//import { getAnalytics } from "firebase/analytics";
const { getFirestore } = require("firebase/firestore");
const { doc, setDoc, deleteDoc, getDoc } = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDbMdpRMBvFVPwRMyp7-B11b39Qq79z27I",
    authDomain: "trivia-test-9b9b5.firebaseapp.com",
    projectId: "trivia-test-9b9b5",
    storageBucket: "trivia-test-9b9b5.appspot.com",
    messagingSenderId: "221612426515",
    appId: "1:221612426515:web:fa6e0c144893c3cb0906e6",
    measurementId: "G-XP157QN3WP"
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

const fetchUserDataPoint = async (day, walletAddress) => {
    const docRef = doc(db, day, walletAddress);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const ret = await docSnap.data();
        return ret;
    }
    return "data point no exist";
}

async function getDataFromDay(day) {
    const querySnapshot = await getDocs(collection(db, day));
    const player_list = [];
    const accounts_list = [];

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        player_list.push([doc.data().address, doc.data().time, doc.data().score]);
        accounts_list.push(doc.data().address);
        //console.log(player_list);
        console.log(doc.id, " => ", doc.data());
    });

    // address - time - score

    //sorting

    player_list.sort(compare);
    console.log(player_list);
    return player_list;

}

// t = 110 score = 31

//await addUserDataPoint("0_10_2022", "0xb8372983edce03ce839613fffba74279579268", 32, 100);
//await addUserDataPoint("0_10_2022", "0aw8372983edce03ce839613fffba74279579268", 45, 100);

//await getDataFromDay("0_10_2022");

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


