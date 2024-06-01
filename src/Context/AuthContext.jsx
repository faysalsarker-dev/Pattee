/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";
// import useAxios from "../hook/useAxios";

const auth = getAuth(app);

export const ContextData = createContext(null);

const AuthContext = ({ children }) => {
  //   const axiosSecure = useAxios();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState([]);

  const GoogleProvider = new GoogleAuthProvider();
  const GithubeProvider = new GithubAuthProvider();

  //create user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign user with email and password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //  user profile name and photo
  const profileUpdate = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //  Log Out
  const logOut = () => {
    setLoading(false);
    return signOut(auth);
  };

  // Google
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };

  // Githube
  const githubeLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, GithubeProvider);
  };

  const saveUser = async (user) => {
    const currentUser = {
      email: user?.email,
      role: "user",
     
    };
    const { data } = await axios.post(
      `http://localhost:5000/users`,
      currentUser
    );
    console.log('user database');
    return data;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
       
        setLoading(false);
        saveUser(currentUser)
        console.log('user access');


      } else {
        setLoading(false);
        setUser(null);
  
      }
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, auth]);

  const contextData = {
    createUser,
    signIn,
    profileUpdate,
    user,
    logOut,
    loading,
    setLoading,
    googleLogin,
    setUser,
    favorite,
    setFavorite,
    githubeLogin,
  };

  return (
    <ContextData.Provider value={contextData}>{children}</ContextData.Provider>
  );
};

export default AuthContext;
