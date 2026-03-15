import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBeTvjpy_2qASJGkeDaUZ7w5p_bCEAxPAE",
    authDomain: "react-proyect-fcac9.firebaseapp.com",
    projectId: "react-proyect-fcac9",
    storageBucket: "react-proyect-fcac9.firebasestorage.app",
    messagingSenderId: "3039883045",
    appId: "1:3039883045:web:b58370f776442bbf19b4cc",
    measurementId: "G-72VCZP4RLH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);