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
    apiKey: "AIzaSyACvyGUz4g4KbIFYCBJ8sXIgzTAMeBzex0",
    authDomain: "trivia-dapp.firebaseapp.com",
    projectId: "trivia-dapp",
    storageBucket: "trivia-dapp.appspot.com",
    messagingSenderId: "396046274473",
    appId: "1:396046274473:web:897f3f61b92fceec6bbeb8",
    measurementId: "G-S6VZCXS4YZ"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


const db = getFirestore(app)

//format: the day and wallet address parameters have type String, timeToComplete is a number (unit seconds) 
//and quizScore is the number of questions gotten correct
const addUserDataPoint = async (day,walletAddress,timeToComplete,quizScore) => {
    const docData = {
        address: walletAddress,
        time: timeToComplete,
        score: quizScore
    }
    const docRef = await setDoc(doc(db,day,walletAddress),docData);
};
const deleteUserDataPoint = async (day,walletAddress) => {
    await deleteDoc(doc(db,day,walletAddress))
}

const fetchUserDataPoint = async (day,walletAddress) => {
    const docRef = doc(db,day,walletAddress);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        const ret = await docSnap.data();
        return ret;
    }
    return "data point no exist";
}

module.exports = {
    addUserDataPoint,deleteUserDataPoint,fetchUserDataPoint
}


