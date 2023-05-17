import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvdEEq0jXJsDXn8lXdM2PPdCyfRYzP6-A",
  authDomain: "login-app-99050.firebaseapp.com",
  projectId: "login-app-99050",
  storageBucket: "login-app-99050.appspot.com",
  messagingSenderId: "107583499441",
  appId: "1:107583499441:web:e6abf7631dd2863082c690"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
