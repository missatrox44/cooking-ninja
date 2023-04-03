import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbR-ycLuXU-6MBZW0gE68gdgPHdYTuQ2M",
  authDomain: "cooking-ninja-site-4c73d.firebaseapp.com",
  projectId: "cooking-ninja-site-4c73d",
  storageBucket: "cooking-ninja-site-4c73d.appspot.com",
  messagingSenderId: "275535176458",
  appId: "1:275535176458:web:efc057118d8b33b4d990f3",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
