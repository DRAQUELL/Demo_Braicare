// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAW5BxgW9koEKU7tZlqI0RIC5v4qKx7yNg",
  authDomain: "brain-care-29e1e.firebaseapp.com",
  projectId: "brain-care-29e1e",
  storageBucket: "brain-care-29e1e.appspot.com",
  messagingSenderId: "682029044098",
  appId: "1:682029044098:web:334a8e1b8be6a2e732bf9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
