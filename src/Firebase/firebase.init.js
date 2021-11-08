import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";

export const initAuthentication = () => {
   initializeApp(firebaseConfig);
};
