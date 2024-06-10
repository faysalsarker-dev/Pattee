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

import useAxiosSecure from './../Hook/useAxiosSecure';
import useAxios from "../Hook/useAxiosCommon";

const auth = getAuth(app);

export const ContextData = createContext(null);

const AuthContext = ({ children }) => {
  const axiosCommon = useAxios();
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const GoogleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();

  // Create user with email and password
  const createUser = async (email, password) => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await saveUser(userCredential.user);
    return userCredential;
  };

  // Sign user in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await saveUser(userCredential.user);
    return userCredential;
  };

  // Update user profile name and photo
  const profileUpdate = async (name, photo) => {
    setLoading(true);
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    const updatedUser = {
      ...auth.currentUser,
      displayName: name,
      photoURL: photo
    };
    setUser(updatedUser);
    await saveUser(updatedUser);
  };

  // Log out
  const logOut = () => {
    setLoading(true); // Set loading to true while logging out
    return signOut(auth);
  };

  // Google login
  const googleLogin = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, GoogleProvider);
    await saveUser(result.user);
    return result;
  };

  // Github login
  const githubLogin = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, GithubProvider);
    await saveUser(result.user);
    return result;
  };

  // Save user
  const saveUser = async (neWuser) => {
    const currentUser = {
      name: neWuser?.displayName,
      email: neWuser?.email,
      profile: neWuser?.photoURL,
      role: "user",
    };
    const { data } = await axiosCommon.post("/users", currentUser);
    return data;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setLoading(false);
        await saveUser(currentUser);
        console.log(currentUser);
        console.log('user access');
        const loggedEmail = { email: currentUser.email };
        axiosSecure.post('/jwt', loggedEmail)
          .then(res => {
            console.log('token response', res.data);
          });
      } else {
        setLoading(false);
        setUser(null);
        axiosSecure.post('/logout')
          .then(res => {
            console.log(res.data);
          });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [axiosSecure, user?.email]);

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
    githubLogin,
  };

  return (
    <ContextData.Provider value={contextData}>
      {children}
    </ContextData.Provider>
  );
};

export default AuthContext;
