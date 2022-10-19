import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD8XWXnoxGc2db6eWb991kQ9wdMYNnVLyQ",
    authDomain: "realtor-clone-react-5c696.firebaseapp.com",
    projectId: "realtor-clone-react-5c696",
    storageBucket: "realtor-clone-react-5c696.appspot.com",
    messagingSenderId: "294329947182",
    appId: "1:294329947182:web:3da3acf1acb6dbe27efbbf"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app)