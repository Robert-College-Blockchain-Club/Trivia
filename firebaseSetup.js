// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore"; 
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


