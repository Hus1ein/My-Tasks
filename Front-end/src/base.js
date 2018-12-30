import firebase from "firebase";

const app = firebase.initializeApp({
    apiKey: "AIzaSyAUrWOuUij_SW85IK5D8F087xOaL3aio7k",
    authDomain: "mytasks-eb7b1.firebaseapp.com",
    databaseURL: "https://mytasks-eb7b1.firebaseio.com",
    projectId: "mytasks-eb7b1",
    storageBucket: "mytasks-eb7b1.appspot.com",
    messagingSenderId: "850290436771"
});

export default app;