import {
   createUserWithEmailAndPassword,
   getAuth,
   getIdToken,
   GoogleAuthProvider,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
   updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { initAuthentication } from "../Firebase/firebase.init";

initAuthentication();

const useFirebase = () => {
   const [user, setUser] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const [authError, setAuthError] = useState("");
   const [admin, setAdmin] = useState(false);
   const [token, setToken] = useState("");

   const auth = getAuth();

   const googleProvider = new GoogleAuthProvider();

   const signInWithGoogle = (location, history) => {
      setIsLoading(true);
      signInWithPopup(auth, googleProvider)
         .then((result) => {
            // setUser(result.user);
            const user = result.user;
            saveUser(user.email, user.displayName, "PUT");
            setAuthError("");
            const destination = location?.state?.from || "/";
            history.replace(destination);
         })
         .catch((error) => {
            console.log(error.message);
            setAuthError(error.message);
         })
         .finally(() => setIsLoading(false));
   };

   const registerUser = (email, password, name, history) => {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            const newUser = { email, displayName: name };
            setUser(newUser);
            // save user to the database
            saveUser(email, name, "POST");

            // send name to firebase after creation
            updateProfile(auth.currentUser, {
               displayName: name,
            })
               .then(() => {
                  setAuthError("");
               })
               .catch((error) => {
                  setAuthError(error.message);
               });

            history.replace("/");
            setAuthError("");
         })
         .catch((error) => {
            setAuthError(error.message);
         })
         .finally(() => setIsLoading(false));
   };
   const loginUser = (email, password, location, history) => {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            // const user = userCredential.user;
            const destination = location?.state?.from || "/home";
            history.replace(destination);
            setAuthError("");
         })
         .catch((error) => {
            setAuthError(error.message);
         })
         .finally(() => setIsLoading(false));
   };

   // observer user state
   useEffect(() => {
      const unsubscribed = onAuthStateChanged(auth, (user) => {
         if (user) {
            setUser(user);
            getIdToken(user).then((idToken) => {
               setToken(idToken);
            });
         } else {
            setUser({});
         }
         setIsLoading(false);
      });
      return () => unsubscribed;
   }, [auth]);

   useEffect(() => {
      const url = `https://vast-plains-74884.herokuapp.com/users/${user.email}`;
      fetch(url)
         .then((res) => res.json())
         .then((data) => setAdmin(data.admin));
   }, [user.email]);

   const logout = () => {
      signOut(auth)
         .then(() => {
            setAuthError("");
         })
         .catch((error) => {
            setAuthError(error.message);
         })
         .finally(() => setIsLoading(false));
   };

   const saveUser = (email, displayName, method) => {
      const user = { email, displayName };
      const url = `https://vast-plains-74884.herokuapp.com/users`;
      fetch(url, {
         method: method,
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(user),
      }).then();
   };

   return {
      user,
      admin,
      token,
      registerUser,
      loginUser,
      signInWithGoogle,
      isLoading,
      authError,
      setAuthError,
      setIsLoading,
      logout,
   };
};

export default useFirebase;
